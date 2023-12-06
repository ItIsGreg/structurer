import { DisplayCategoriesProps } from "@/types";
import { TiDelete } from "react-icons/ti";
import { Tooltip } from "react-tooltip";
import SetEntityAttributesModal from "./modals/SetEntityAttributesModal";
import { useState } from "react";

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

  const [showSetEntityAttributesModal, setShowSetEntityAttributesModal] =
    useState<boolean>(false);
  const [setAttributesCategory, setSetAttributesCategory] =
    useState<string>("");
  const handleAttributeToolTipClick = (category: string) => {
    setSetAttributesCategory(category);
    setShowSetEntityAttributesModal(true);
  };

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
                <div onClick={() => handleAttributeToolTipClick(category)}>
                  <h2 className="font-bold">Attributes:</h2>
                  {entityAttributes[category].map((attribute) => (
                    <div key={attribute}>{attribute}</div>
                  ))}
                </div>
              </Tooltip>
            )}
          </div>
        </div>
      ))}
      {showSetEntityAttributesModal &&
        entityAttributes &&
        setEntityAttributes && (
          <SetEntityAttributesModal
            entity={setAttributesCategory}
            entityAttributes={entityAttributes}
            setEntityAttributes={setEntityAttributes}
            setShowSetEntityAttributesModal={setShowSetEntityAttributesModal}
          />
        )}
    </div>
  );
};

export default DisplayCategoriesBasic;
