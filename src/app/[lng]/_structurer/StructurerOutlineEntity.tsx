import { StructurerOutlineEntityProps } from "@/types";
import StructurerOutlineEntityElement from "./StructurerOutlineEntityElement";
import { useState } from "react";
import StructurerOutlineDownloadButton from "./StructurerOutlineDownloadButton";
import ExpandAccordionToggle from "../ExpandAccordionToggle";
import StructurerOutlineShowJsonButton from "./StructurerOutlineShowJsonButton";

const StructuerOutlineEntity = (props: StructurerOutlineEntityProps) => {
  const { entity, entityName, colors, setOutlinePart, setShowJson } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        <StructurerOutlineShowJsonButton
          outlinePart={{ [entityName]: entity }}
          setOutlinePart={setOutlinePart}
          setShowJson={setShowJson}
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
