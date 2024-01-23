import {
  AnnotatorModes,
  EntityAttributes,
  StructurerWorkBenchLabelerProps,
} from "@/types";
import CategorySelector from "./CategorySelector";
import InputSelection from "./InputSelection";
import DisplayCategoriesBasic from "./DisplayCategoriesBasic";
import { useState } from "react";
import {
  defaultFocusSections,
  defaultResourceTypeAttributes,
  sectionTypeList,
} from "@/utils/constants";

const StructurerWorkBenchSectionLabeler = (
  props: StructurerWorkBenchLabelerProps
) => {
  const { focusedCategory, setFocusedCategory, colors, setColors, rng, lng } =
    props;

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    defaultFocusSections.map((option) => option.value)
  );

  const handleSelectCategory = (category: string) => {
    setSelectedCategories([...selectedCategories, category]);
  };
  const [entityAttributes, setEntityAttributes] = useState<EntityAttributes>(
    defaultResourceTypeAttributes
  );
  return (
    <div className="w-full flex flex-col gap-3">
      <CategorySelector
        InputComponent={InputSelection}
        DisplayComponent={DisplayCategoriesBasic}
        placeholder={"Select a Section"}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        onSelectCategory={handleSelectCategory}
        focusedCategory={focusedCategory}
        setFocusedCategory={setFocusedCategory}
        fetchCategories={() => Promise.resolve(sectionTypeList)}
        colors={colors}
        setColors={setColors}
        rng={rng}
        entityAttributes={entityAttributes}
        setEntityAttributes={setEntityAttributes}
        lng={lng}
      />
    </div>
  );
};

export default StructurerWorkBenchSectionLabeler;
