import {
  ExpandedSections,
  SectionInfo,
  StructurerTextDisplayProps,
} from "@/types";
import { prepareIndexList } from "@/utils/structurerUtils";
import { useEffect, useState } from "react";
import StructurerSectionSplitModal from "./modals/StructurerSectionSplitModal";
import StructurerSectionRenameModal from "./modals/StructurerSectionRenameModal";
import StructurerTextDisplaySection from "./StructurerTextDisplaySection";
import ExpandAccordionToggle from "../ExpandAccordionToggle";
import { useTranslation } from "@/app/i18n/client";

const StructurerTextDisplaySegmenter = (props: StructurerTextDisplayProps) => {
  const {
    text,
    llmResponse,
    outline,
    setOutline,
    expandedSections,
    setExpandedSections,
    lng,
  } = props;

  const [showSplitSectionModal, setShowSplitSectionModal] = useState(false);
  const [splitSection, setSplitSection] = useState<SectionInfo | undefined>();
  const [showSectionRenameModal, setShowSectionRenameModal] = useState(false);
  const [renameSection, setRenameSection] = useState<SectionInfo | undefined>();

  const { t } = useTranslation(lng, "StructurerTextDisplaySegmenter");

  useEffect(() => {
    if (llmResponse) {
      try {
        const jsonData = JSON.parse(llmResponse);
        const llmSections = {
          sectionsAskedFor: jsonData.sections_asked_for,
          sectionsInferred: jsonData.sections_inferred,
        };
        const indexSections = prepareIndexList(llmSections, text);
        if (indexSections) {
          setOutline(indexSections);
        }
      } catch (error) {
        console.error("Error parsing llmResponse:", error);
      }
    }
  }, [llmResponse]);

  const checkAllClosed = () => {
    for (const key in expandedSections) {
      if (expandedSections[key]) {
        return false;
      }
    }
    return true;
  };

  const handleExpandAll = () => {
    // expected behaviour: if all sections are closed, open all sections
    // if at least one section is open, close all sections
    const newExpandedSections: ExpandedSections = {};
    if (checkAllClosed()) {
      for (const section of outline) {
        newExpandedSections[section.key] = true;
      }
    } else {
      for (const section of outline) {
        newExpandedSections[section.key] = false;
      }
    }
    setExpandedSections(newExpandedSections);
  };

  return (
    <div className="flex flex-col gap-1 whitespace-pre">
      {showSplitSectionModal && splitSection && (
        <StructurerSectionSplitModal
          setShowSplitSectionModal={setShowSplitSectionModal}
          setSpliceSection={setSplitSection}
          splitSection={splitSection}
          setOutline={setOutline}
          outline={outline}
          lng={lng}
        />
      )}
      {showSectionRenameModal && renameSection && (
        <StructurerSectionRenameModal
          outline={outline}
          renameSection={renameSection}
          setOutline={setOutline}
          setRenameSection={setRenameSection}
          setShowSectionRenameModal={setShowSectionRenameModal}
          lng={lng}
        />
      )}
      <button
        className="flex justify-center items-center p-1"
        onClick={() => handleExpandAll()}
        id="joyride-expand-all"
      >
        <ExpandAccordionToggle isOpen={!checkAllClosed()} size={26} />
        {checkAllClosed() ? t("Expand all") : t("Collapse all")}
      </button>
      {outline.length > 0
        ? outline.map((section, index) => (
            <StructurerTextDisplaySection
              key={section.startIndex}
              {...props}
              section={section}
              index={index}
              setRenameSection={setRenameSection}
              setShowSectionRenameModal={setShowSectionRenameModal}
              setShowSplitSectionModal={setShowSplitSectionModal}
              setSplitSection={setSplitSection}
              lng={lng}
            />
          ))
        : text}
    </div>
  );
};

export default StructurerTextDisplaySegmenter;
