import {
  AnnotatorModes,
  ExpandedSections,
  SectionInfo,
  StructurerTextDisplayProps,
  ValueState,
} from "@/types";
import {
  handleAnnotationChange,
  handleAnnotationChangeForSection,
} from "@/utils/structurerUtils";
import { useEffect, useState } from "react";
import StructurerSectionSplitModal from "./modals/StructurerSectionSplitModal";
import StructurerSectionRenameModal from "./modals/StructurerSectionRenameModal";
import StructurerTextDisplaySection from "./StructurerTextDisplaySection";
import ExpandAccordionToggle from "../ExpandAccordionToggle";
import { useTranslation } from "@/app/i18n/client";
import TextAnnotator from "@/utils/text-annotate/TextAnnotator";

const StructurerTextDisplayAnnotator = (props: StructurerTextDisplayProps) => {
  const {
    text,
    outline,
    setOutline,
    expandedSections,
    setExpandedSections,
    lng,
    annotatorMode,
    focusedSection,
    focusedCategory,
    colors,
  } = props;

  const [showSplitSectionModal, setShowSplitSectionModal] = useState(false);
  const [splitSection, setSplitSection] = useState<SectionInfo | undefined>();
  const [showSectionRenameModal, setShowSectionRenameModal] = useState(false);
  const [renameSection, setRenameSection] = useState<SectionInfo | undefined>();

  const { t } = useTranslation(lng, "StructurerTextDisplaySegmenter");
  let dummyValue: ValueState[] = [];
  const dummyOutline: SectionInfo[] = [
    {
      key: "dummy",
      startIndex: 0,
      endIndex: text.length,
      text: text,
      askedFor: true,
    },
  ];

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
    <div>
      {annotatorMode === AnnotatorModes.labelText ? (
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
      ) : annotatorMode === AnnotatorModes.segmentText ? (
        <div className="whitespace-pre">
          <TextAnnotator
            content={text}
            outline={dummyOutline[0].entities}
            onChange={(value) =>
              // handleAnnotationChange({
              handleAnnotationChangeForSection({
                value: value,
                outline: outline,
                setOutline: setOutline,
                focusedSection: focusedSection,
                focusedCategory: focusedCategory,
                text: text,
              })
            }
            value={dummyValue} // need this somehow so that the type in the TextAnnotator is not never... might be nice to get rid off for usability
            colors={colors}
            setOutline={() => {}}
          />
        </div>
      ) : null}
    </div>
  );
};

export default StructurerTextDisplayAnnotator;
