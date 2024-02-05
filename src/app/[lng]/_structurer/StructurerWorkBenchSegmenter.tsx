import {
  StructurerWorkBenchSegmenterProps,
  structureTextWithTemplateAndInferResponse,
} from "@/types";
import CategorySelector from "./CategorySelector";
import { useState } from "react";
import InputText from "./InputText";
import DisplayCategoriesBasic from "./DisplayCategoriesBasic";
import {
  awsUrl,
  segmentationCategories,
  segmentationCategoriesGerman,
} from "@/utils/constants";
import { toastError } from "@/toasts";
import { PuffLoader } from "react-spinners";
import StructurerWorkBenchLabeler from "./StructurerWorkBenchLabeler";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/db";
import { useTranslation } from "@/app/i18n/client";
import { combineResponseWithRemainingText } from "@/utils/structurerUtils";

const StructurerWorkBenchSegmenter = (
  props: StructurerWorkBenchSegmenterProps
) => {
  const {
    text,
    setLlmResponse,
    setColors,
    rng,
    setFocusedCategory,
    gptModel,
    lng,
    setOutline,
  } = props;
  const { t } = useTranslation(lng, "StructurerWorkBenchSegmenter");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    lng === "de" ? segmentationCategoriesGerman : segmentationCategories
  );
  const [isLoading, setIslLoading] = useState<boolean>(false);

  const activeAPIKey = useLiveQuery(() => {
    return db.apikeys.toArray();
  }, [])?.[0]?.key;

  const handleSelectCategory = (category: string) => {
    setSelectedCategories([...selectedCategories, category]);
  };

  const buildSectionConfig = (selectedCategories: string[]) => {
    const section_config = [];

    for (let i = 0; i < selectedCategories.length; i++) {
      section_config.push({
        section_key: selectedCategories[i],
        entities: [],
      });
    }

    return section_config;
  };

  const handleLLMSegment = async () => {
    if (!activeAPIKey) {
      toastError("No API Key selected");
      return;
    }
    try {
      setIslLoading(true);
      const response = await fetch(
        `${awsUrl}/sections/segmentSectionsFromSpecific/?model=${gptModel}&language=${lng}`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
            api_key: activeAPIKey,
            section_config: buildSectionConfig(selectedCategories),
            patient_id: "patient_id",
          }),
        }
      );
      const data = await response.json();
      const outline = combineResponseWithRemainingText(data, text);
      setOutline(outline);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIslLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <CategorySelector
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        InputComponent={InputText}
        onSelectCategory={handleSelectCategory}
        placeholder={t(
          "Enter sections (e.g. Medication, History of Present Illness)"
        )}
        DisplayComponent={DisplayCategoriesBasic}
        setColors={setColors}
        rng={rng}
        setFocusedCategory={setFocusedCategory}
        lng={lng}
      />
      <button
        onClick={async () => await handleLLMSegment()}
        className={`${
          isLoading ? "bg-gray-500" : "bg-blue-500"
        } rounded-md transform hover:scale-y-105 flex flex-row gap-2 p-2 justify-center items-center`}
        disabled={isLoading}
        id="joyride-find-sections"
      >
        {isLoading ? t("Loading") : t("Find Sections")}
        {isLoading && <PuffLoader size={20} />}
      </button>
      <h2 className="border-y-2 border text-center">Labeler</h2>
      <StructurerWorkBenchLabeler {...props} />
    </div>
  );
};

export default StructurerWorkBenchSegmenter;
