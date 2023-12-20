import { CategorySelectorProps } from "@/types";

const CategorySelector = (props: CategorySelectorProps) => {
  const {
    selectedCategories,
    setSelectedCategories,
    placeholder,
    InputComponent,
    onSelectCategory,
    fetchCategories,
    DisplayComponent,
    colors,
    focusedCategory,
    setFocusedCategory,
    setColors,
    getColor,
    rng,
    entityAttributes,
    setEntityAttributes,
    lng,
  } = props;

  return (
    <div className="flex flex-col gap-4 w-full">
      <InputComponent
        onSelect={onSelectCategory}
        placeholder={placeholder}
        fetchCategories={fetchCategories}
        lng={lng}
      />
      <DisplayComponent
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        colors={colors} // set colors only if you want need them (currently only for labeler)
        setColors={setColors}
        getColor={getColor}
        focusedCategory={focusedCategory}
        setFocusedCategory={setFocusedCategory}
        rng={rng}
        entityAttributes={entityAttributes}
        setEntityAttributes={setEntityAttributes}
        lng={lng}
      />
    </div>
  );
};

export default CategorySelector;
