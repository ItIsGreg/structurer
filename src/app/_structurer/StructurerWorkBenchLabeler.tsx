import {
  Entities,
  EntityAttributes,
  FocusResourceWithAttributes,
  LLMOutlineWithAttributes,
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
// DEV REMOVE
// import devOutlineWithAttributes from "@/../data/tmp/DevOutlineWithAttributes.json";

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

  const handleLLMLabel = async (version: string = "2") => {
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
        setOutlineFromLabeler(matchedOutline);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIslLoading(false);
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
          activeAPIKey
        );
        setOutlineFromLabeler(matchedOutline);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIslLoading(false);
    }
  };

  // const testOutline: LLMOutlineWithAttributes = devOutlineWithAttributes;

  // const handleTransformTestOutline = () => {
  //   const outline = transformOutlineWithAttributes(testOutline);
  //   console.log(outline);
  // };

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
      <GPTModelAdmin gptModel={gptModel} setGptModel={setGptModel} />
      <ApiKeyAdmin />
      {/* <button onClick={handleTransformTestOutline}>
        Transform TestOutline
      </button> */}
    </div>
  );
};

export default StructurerWorkBenchLabeler;
