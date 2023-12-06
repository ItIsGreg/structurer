import { DisplayCategoriesProps } from "@/types";
import { TiDelete } from "react-icons/ti";
import { Tooltip } from "react-tooltip";

const DisplayCategoriesBasic = (props: DisplayCategoriesProps) => {
  const {
    selectedCategories,
    setSelectedCategories,
    colors,
    focusedCategory,
    getColor,
    setColors,
    setFocusedCategory,
    rng,
    entityAttributes,
    setEntityAttributes,
  } = props;

  return (
    <div className="flex flex-row flex-wrap overflow-scroll h-full border border-black rounded-md p-2 gap-1">
      {selectedCategories.map((category) => (
        <div key={category}>
          <div
            id={category}
            className={`flex flex-row gap-1 border border-black p-1 rounded-md ${
              focusedCategory === category ? "border-4" : ""
            }`}
            style={colors && { backgroundColor: colors[category] }}
            onClick={() => setFocusedCategory(category)}
          >
            {category}
            <TiDelete
              className="transform hover:scale-110"
              onClick={() =>
                setSelectedCategories(
                  selectedCategories.filter(
                    (selectedCategory) => selectedCategory !== category
                  )
                )
              }
            />
            {entityAttributes && category in entityAttributes && (
              <Tooltip anchorSelect={`#${category}`} place="top" clickable>
                <h2 className="font-bold">Attributes:</h2>
                {entityAttributes[category].map((attribute) => (
                  <div
                    onClick={() => {
                      console.log(category, " clicked");
                    }}
                    key={attribute}
                  >
                    {attribute}
                  </div>
                ))}
              </Tooltip>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayCategoriesBasic;
