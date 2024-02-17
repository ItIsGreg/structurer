import { StructurerOutlineEntityElementProps } from "@/types";
import { TiDelete } from "react-icons/ti";
import { Tooltip } from "react-tooltip";
import StructurerOutlineShowJsonButton from "./StructurerOutlineShowJsonButton";

const StructurerOutlineEntityElement = (
  props: StructurerOutlineEntityElementProps
) => {
  const {
    outline,
    setOutline,
    section,
    entity,
    entityElement,
    entityName,
    setOutlinePart,
    setShowJson,
  } = props;

  const handleXClick = () => {
    setOutline(
      outline.map((outlineSection) => {
        if (outlineSection.key === section.key) {
          return {
            ...outlineSection,
            entities: {
              ...outlineSection.entities,
              [entityName]: entity.filter((e) => e.item !== entityElement.item),
            },
          };
        } else {
          return outlineSection;
        }
      })
    );
  };

  // Function to create a valid ID
  // needed for the tooltip anchor, which can't have spaces or special characters
  const createValidId = (item: string) => {
    // Replace spaces with underscores and remove special characters
    return item.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "");
  };

  return (
    <div>
      <div
        id={createValidId(entityElement.item)}
        className={`${
          !entityElement.matches || entityElement.matches.length === 0
            ? "bg-red-500"
            : ""
        } border-t border-black ml-2 flex flex-row justify-between items-center p-1 gap-1`}
      >
        <div className="flex-grow">{entityElement.item}</div>
        <StructurerOutlineShowJsonButton
          setOutlinePart={setOutlinePart}
          setShowJson={setShowJson}
          outlinePart={entityElement}
        />
        <TiDelete onClick={() => handleXClick()} className="flex-shrink-0" />
      </div>

      {entityElement.attributes && (
        <Tooltip
          anchorSelect={`#${createValidId(entityElement.item)}`}
          place="left"
        >
          <div>
            {Object.keys(entityElement.attributes).map((key) => {
              return (
                <div key={key}>
                  {key}: {entityElement.attributes![key]}
                </div>
              );
            })}
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default StructurerOutlineEntityElement;
