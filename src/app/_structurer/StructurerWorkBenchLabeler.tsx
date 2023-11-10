import { Entities, StructurerWorkBenchLabelerProps } from "@/types";
import CategorySelector from "./CategorySelector";
import { useState } from "react";
import { resourceOptions } from "@/utils/constants";
import { defaultFocusResources } from "@/utils/constants";
import InputSelection from "./InputSelection";
import DisplayCategoriesBasic from "./DisplayCategoriesBasic";
// import { useStore } from "@/stores/useStore";
import { PuffLoader } from "react-spinners";
import { addMatches, transformOutline } from "@/utils/annotator_utils";
import { toast } from "react-toastify";
import { handleUnmatchedEntities } from "@/utils/structurerUtils";

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
  } = props;
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    defaultFocusResources.map((option) => option.value)
  );
  const [isLoading, setIslLoading] = useState<boolean>(false);

  const handleSelectCategory = (category: string) => {
    setSelectedCategories([...selectedCategories, category]);
  };
  // const { activeAPIKey } = useStore((state) => {
  //   return {
  //     activeAPIKey: state.activeAPIKey,
  //   };
  // });

  const activeAPIKey = ""; // need to handle this before I can move any further

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

  const handleLLMLabel = async (version: string = "2", gpt: string = "3") => {
    if (!activeAPIKey || !focusedSection || !focusedSection.text) {
      toast.error("API key missing or no text");
      return;
    }
    try {
      setIslLoading(true);
      const response = await fetch(
        `http://localhost:8000/structurer/bundleOutlineV${version}GPT${gpt}/`,
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
    </div>
  );
};

export default StructurerWorkBenchLabeler;
