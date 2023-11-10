import { Entities, SectionInfo, StructurerOutlineSectionProps } from "@/types";
import StructuerOutlineEntity from "./StructurerOutlineEntity";
import { useState } from "react";
import StructurerOutlineDownloadButton from "./StructurerOutlineDownloadButton";
import ExpandAccordionToggle from "../ExpandAccordionToggle";

const StructurerOutlineSection = (props: StructurerOutlineSectionProps) => {
  const {
    outline,
    setOutline,
    section,
    sectionRefs,
    expandedSections,
    setExpandedSections,
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleSectionClick = () => {
    setExpandedSections({ ...expandedSections, [section.key]: true });
    const refIndex = outline.findIndex((s) => s.key === section.key);
    if (refIndex !== -1) {
      sectionRefs[refIndex].current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1 bg-blue-500 rounded-md p-1 items-center">
        {section.entities && (
          <div className="transform hover:bg-gray-700 rounded-md p-1 flex-shrink-0">
            <ExpandAccordionToggle
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        )}
        <button
          onClick={() => handleSectionClick()}
          className="text-left flex-grow transform hover:bg-gray-700 p-1 rounded-md"
        >
          {section.key}
        </button>
        <StructurerOutlineDownloadButton outlinePart={outline} />
      </div>
      <div
        className={`flex flex-col gap-1 transition-all overflow-hidden ${
          !isOpen ? "max-h-0" : ""
        }`}
      >
        {section.entities &&
          Object.keys(section.entities).map((key) => {
            return (
              <StructuerOutlineEntity
                entityName={key}
                key={key}
                {...props}
                entity={section.entities![key]}
              />
            );
          })}
      </div>
    </div>
  );
};

export default StructurerOutlineSection;
