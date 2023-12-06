import {
  StructurerWorkBenchSegmenterProps,
  structureTextWithTemplateAndInferResponse,
} from "@/types";
import CategorySelector from "./CategorySelector";
import { useState } from "react";
import InputText from "./InputText";
import DisplayCategoriesBasic from "./DisplayCategoriesBasic";
import { awsUrl, segmentationCategories } from "@/utils/constants";
import { toastError } from "@/toasts";
import { PuffLoader } from "react-spinners";
import StructurerWorkBenchLabeler from "./StructurerWorkBenchLabeler";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/db";

const StructurerWorkBenchSegmenter = (
  props: StructurerWorkBenchSegmenterProps
) => {
  const { text, setLlmResponse, setColors, rng, setFocusedCategory, gptModel } =
    props;
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    segmentationCategories
  );
  const [isLoading, setIslLoading] = useState<boolean>(false);
  const activeAPIKey = useLiveQuery(() => {
    return db.apikeys.toArray();
  }, [])?.[0]?.key;

  const handleSelectCategory = (category: string) => {
    setSelectedCategories([...selectedCategories, category]);
  };

  const handleLLMSegment = async () => {
    if (!activeAPIKey) {
      toastError("No API Key selected");
      return;
    }
    try {
      setIslLoading(true);
      const response = await fetch(
        `${awsUrl}/structurer/structureTextWithTemplateAndInfer/?gptModel=${gptModel}`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
            sections_to_look_for: selectedCategories,
            api_key: activeAPIKey,
          }),
        }
      );
      const data: structureTextWithTemplateAndInferResponse =
        await response.json();
      setLlmResponse(data.text);
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
        placeholder="Enter categories to look for in the text (e.g. Medication, History of Present Illness)"
        DisplayComponent={DisplayCategoriesBasic}
        setColors={setColors}
        rng={rng}
        setFocusedCategory={setFocusedCategory}
      />
      <button
        onClick={async () => await handleLLMSegment()}
        className={`${
          isLoading ? "bg-gray-500" : "bg-blue-500"
        } rounded-md transform hover:scale-y-105 flex flex-row gap-2 p-2 justify-center items-center`}
        disabled={isLoading}
      >
        {isLoading ? "Loading" : "LLM Segment!"}
        {isLoading && <PuffLoader size={20} />}
      </button>
      <h2 className="border-y-2 border text-center">Labeler</h2>
      <StructurerWorkBenchLabeler {...props} />
    </div>
  );
};

export default StructurerWorkBenchSegmenter;
