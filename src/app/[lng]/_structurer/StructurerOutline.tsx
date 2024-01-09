import { StructurerOutlineProps } from "@/types";
import StructurerOutlineSection from "./StructurerOutlineSection";
import { useState } from "react";
import StructurerOutlineDownloadButton from "./StructurerOutlineDownloadButton";
import ExpandAccordionToggle from "../ExpandAccordionToggle";
import { useTranslation } from "@/app/i18n/client";

const StructurerOutline = (props: StructurerOutlineProps) => {
  const { outline, setOutline, lng } = props;
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { t } = useTranslation(lng, "StructurerOutline");

  return (
    <div className="flex flex-col w-2/12 gap-1 h-[90vh]">
      <div className="flex items-center" id="joyride-outline">
        {outline.length > 0 ? (
          <div className="flex-shrink-0 transform hover:bg-blue-500 p-1 rounded-md">
            <ExpandAccordionToggle
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        ) : null}
        <h2 className="text-center text-lg flex-grow mx-auto">
          {t("Sections")} ({outline.length})
        </h2>
        <StructurerOutlineDownloadButton outlinePart={outline} />
      </div>
      <div
        className={`${
          !isOpen ? "max-h-0 overflow-hidden" : "overflow-auto"
        }  flex flex-col`}
      >
        {outline.map((section) => {
          return (
            <StructurerOutlineSection
              key={section.key}
              {...props}
              section={section}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StructurerOutline;
