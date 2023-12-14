import {
  Entities,
  EntityAttributes,
  EntityElement,
  EntityElementAttributes,
  FocusResourceWithAttributes,
  LLMOutlineWithAttributes,
  OldOutline,
  SectionInfo,
  StructurerWorkBenchLabelerProps,
} from "@/types";
import CategorySelector from "./CategorySelector";
import { useState } from "react";
import {
  awsUrl,
  defaultResourceTypeAttributes,
  resourceOptions,
} from "@/utils/constants";
import { defaultFocusResources } from "@/utils/constants";
import InputSelection from "./InputSelection";
import DisplayCategoriesBasic from "./DisplayCategoriesBasic";
import { PuffLoader } from "react-spinners";
import {
  addMatches,
  transformOutline,
  transformOutlineWithAttributes,
} from "@/utils/annotator_utils";
import { toast } from "react-toastify";
import { handleUnmatchedEntities } from "@/utils/structurerUtils";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/db";
import ApiKeyAdmin from "./ApiKeyAdmin";
import GPTModelAdmin from "./GPTModelAdmin";
import { set } from "lodash";

const StructurerWorkBenchLabeler = (props: StructurerWorkBenchLabelerProps) => {
  const {
    outline,
    setOutline,
    focusedSection,
    focusedCategory,
    setFocusedCategory,
    colors,
    setColors,
    rng,
    gptModel,
    setGptModel,
    text,
  } = props;
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    defaultFocusResources.map((option) => option.value)
  );
  const [isLoading, setIslLoading] = useState<boolean>(false);

  const handleSelectCategory = (category: string) => {
    setSelectedCategories([...selectedCategories, category]);
  };
  const [entityAttributes, setEntityAttributes] = useState<EntityAttributes>(
    defaultResourceTypeAttributes
  );

  const activeAPIKey = useLiveQuery(() => {
    return db.apikeys.toArray();
  }, [])?.[0]?.key;

  const setOutlineFromLabeler = (matchedOutline: Entities) => {
    if (focusedSection) {
      setOutline(
        outline.map((section) => {
          if (section.key === focusedSection.key) {
            return {
              ...section,
              entities: matchedOutline,
            };
          } else {
            return section;
          }
        })
      );
    }
  };

  const handleLLMLabel = async (
    version: string = "2",
    extractAttributes: boolean = false
  ) => {
    if (!activeAPIKey || !focusedSection || !focusedSection.text) {
      toast.error("API key missing or no text");
      return;
    }
    try {
      setIslLoading(true);
      const response = await fetch(
        `${awsUrl}/structurer/bundleOutlineV${version}/?gptModel=${gptModel}`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: focusedSection?.text,
            focus_resources: selectedCategories,
            api_key: activeAPIKey,
          }),
        }
      );
      const data = await response.json();
      if (data && data.outline) {
        let matchedOutline = transformOutline(data.outline);
        addMatches(matchedOutline, focusedSection.text);
        await handleUnmatchedEntities(
          matchedOutline,
          focusedSection.text,
          activeAPIKey
        );
        if (extractAttributes) {
          await extractAttributesForOutline(
            matchedOutline,
            activeAPIKey,
            gptModel,
            focusedSection.text,
            entityAttributes
          );
        }
        setOutlineFromLabeler(matchedOutline);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIslLoading(false);
    }
  };

  // need a text excerpt around the entity to properly extract attributes
  // some context for the llm
  const getTextExcerpt = (
    text: string,
    entity: EntityElement
  ): string | undefined => {
    // get the text excerpt around the entity, 50 characters before and after
    if (entity.matches && entity.matches.length > 0) {
      const match = entity.matches[0];
      return text.substring(
        Math.min(match[0] - 50, 0),
        Math.max(match[1] + 50, text.length)
      );
    }
  };

  const extractAttributesForOutline = async (
    outline: Entities,
    apiKey: string,
    gptModel: string,
    sectionText: string,
    entityAttributes: EntityAttributes
  ) => {
    try {
      //collect all promises
      const promises: Promise<any>[] = [];
      for (const key in outline) {
        const entityElements = outline[key];
        for (const entityElement of entityElements) {
          const textExcerpt = getTextExcerpt(sectionText, entityElement);
          if (textExcerpt) {
            promises.push(
              fetch(
                `${awsUrl}/structurer/extractAttributesForConcept/?gptModel=${gptModel}`,
                {
                  method: "POST",
                  mode: "cors",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    text_excerpt: textExcerpt,
                    concept: entityElement.item,
                    api_key: apiKey,
                    attributes: entityAttributes[key],
                  }),
                }
              )
                .then((response) => response.json())
                .then((data) => {
                  data.item = entityElement.item;
                  data.resourceType = key;
                  return data;
                })
            );
          }
        }
      }
      //wait for all promises to resolve
      const responses = await Promise.all(promises);
      //add attributes to outline
      for (const response of responses) {
        const resourceType = response.resourceType;
        const item = response.item;
        const attributes = response.attributes;
        if (resourceType && item && attributes) {
          for (const entityElement of outline[resourceType]) {
            if (entityElement.item === item) {
              entityElement.attributes = attributes;
            }
          }
        }
      }
    } catch (error) {
      toast.error("Error extracting attributes");
    }
  };

  const buildFocusResourcesWithAttributes = (
    focusResources: string[],
    entityAttributes: EntityAttributes
  ) => {
    let focusResourcesWithAttributes: FocusResourceWithAttributes[] = [];
    focusResources.forEach((focusResource) => {
      focusResourcesWithAttributes.push({
        resource_type: focusResource,
        attributes: entityAttributes[focusResource],
      });
    });
    return focusResourcesWithAttributes;
  };
  // does not work that well can probably get rid of this call and respective endpoint in API
  const handleLLMLabelWithAttributes = async () => {
    if (!activeAPIKey || !focusedSection || !focusedSection.text) {
      toast.error("API key missing or no text");
      return;
    }
    try {
      setIslLoading(true);
      const focusResourcesWithAttributes = buildFocusResourcesWithAttributes(
        selectedCategories,
        entityAttributes
      );
      const response = await fetch(
        `${awsUrl}/structurer/bundleOutlineWithAttributes/?gptModel=${gptModel}`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: focusedSection?.text,
            focus_resources: focusResourcesWithAttributes,
            api_key: activeAPIKey,
          }),
        }
      );
      const data = await response.json();
      if (data && data.outline) {
        let matchedOutline = transformOutlineWithAttributes(data.outline);
        addMatches(matchedOutline, focusedSection.text);
        await handleUnmatchedEntities(
          matchedOutline,
          focusedSection.text,
          activeAPIKey,
          gptModel,
          true
        );
        setOutlineFromLabeler(matchedOutline);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIslLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <CategorySelector
        InputComponent={InputSelection}
        DisplayComponent={DisplayCategoriesBasic}
        placeholder="Select a resource"
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        onSelectCategory={handleSelectCategory}
        focusedCategory={focusedCategory}
        setFocusedCategory={setFocusedCategory}
        fetchCategories={() =>
          Promise.resolve(resourceOptions.map((option) => option.value))
        }
        colors={colors}
        setColors={setColors}
        rng={rng}
        entityAttributes={entityAttributes}
        setEntityAttributes={setEntityAttributes}
      />
      <button
        className={`${
          isLoading || !focusedSection ? "bg-gray-500" : "bg-blue-500"
        } rounded-md transform hover:scale-y-105 flex flex-row gap-2 p-2 justify-center items-center`}
        disabled={isLoading || !focusedSection}
        onClick={async () => await handleLLMLabel()}
      >
        {isLoading ? "Loading" : "LLM Label!"}
        {isLoading && <PuffLoader size={20} />}
      </button>
      <button
        className={`${
          isLoading || !focusedSection ? "bg-gray-500" : "bg-blue-500"
        } rounded-md transform hover:scale-y-105 flex flex-row gap-2 p-2 justify-center items-center`}
        disabled={isLoading || !focusedSection}
        onClick={async () => await handleLLMLabelWithAttributes()}
      >
        {isLoading ? "Loading" : "LLM Label with Attributes!"}
        {isLoading && <PuffLoader size={20} />}
      </button>
      <button
        className={`${
          isLoading || !focusedSection ? "bg-gray-500" : "bg-blue-500"
        } rounded-md transform hover:scale-y-105 flex flex-row gap-2 p-2 justify-center items-center`}
        disabled={isLoading || !focusedSection}
        onClick={async () => await handleLLMLabel("2", true)}
      >
        {isLoading ? "Loading" : "LLM Label with AttributesV2!"}
        {isLoading && <PuffLoader size={20} />}
      </button>
      <GPTModelAdmin gptModel={gptModel} setGptModel={setGptModel} />
      <ApiKeyAdmin />
    </div>
  );
};

export default StructurerWorkBenchLabeler;
