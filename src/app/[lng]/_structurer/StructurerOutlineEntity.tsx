import { StructurerOutlineEntityProps } from "@/types";
import StructurerOutlineEntityElement from "./StructurerOutlineEntityElement";
import { useState } from "react";
import StructurerOutlineDownloadButton from "./StructurerOutlineDownloadButton";
import ExpandAccordionToggle from "../ExpandAccordionToggle";
import { TiDelete } from "react-icons/ti";

const StructuerOutlineEntity = (props: StructurerOutlineEntityProps) => {
  const { entity, entityName, colors, section } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleXClick = () => {
    // delete entity from section of outline
    props.setOutline(
      props.outline.map((outlineSection) => {
        if (outlineSection.key === section.key && outlineSection.entities) {
          // Create a new object without the entityName key
          const { [entityName]: _, ...remainingEntities } =
            outlineSection.entities;
          return {
            ...outlineSection,
            entities: remainingEntities,
          };
        } else {
          return outlineSection;
        }
      })
    );
  };

  return (
    <div
      className="flex flex-col ml-1 rounded-md p-1 gap-1"
      style={{ backgroundColor: colors[entityName] }}
    >
      <div className="flex flex-row items-center gap-1">
        {entity.length > 0 ? (
          <div className="transform hover:bg-gray-700 p-1 rounded-md flex-shrink-0">
            <ExpandAccordionToggle
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        ) : null}
        <div className="flex-grow">{entityName}</div>
        <TiDelete
          onClick={() => handleXClick()}
          className="flex-shrink-0 transform hover:bg-gray-700"
        />
        <StructurerOutlineDownloadButton
          outlinePart={{ [entityName]: entity }}
        />
      </div>
      <div className={`overflow-hidden ${!isOpen ? "max-h-0" : ""}`}>
        {entity.map((entityElement) => {
          return (
            <StructurerOutlineEntityElement
              key={entityElement.item}
              {...props}
              entityElement={entityElement}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StructuerOutlineEntity;
