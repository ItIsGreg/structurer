"use client";

import { createRef, useEffect, useState } from "react";
import {
  StructurerModes,
  SectionInfo,
  ColorStore,
  ExpandedSections,
  AnnotatorModes,
} from "@/types";
import StructurerText from "./StructurerText";
import StructurerWorkBench from "./StructurerWorkBench";
import StructurerOutline from "./StructurerOutline";
import seedrandom from "seedrandom";
import { awsUrl, colorSeed, resourcesToColor } from "@/utils/constants";
import { setColorsForDefaultResources } from "@/utils/annotator_utils";

interface StructurerBodyProps {
  params: {
    lng: string;
  };
}

const StructurerBody = (props: StructurerBodyProps) => {
  const lng = props.params.lng;
  const [text, setText] = useState("");
  const [mode, setMode] = useState<StructurerModes>(StructurerModes.inputText);
  const [llmResponse, setLlmResponse] = useState<string>();
  const [outline, setOutline] = useState<SectionInfo[]>([]);
  const [focusSection, setFocusSection] = useState<SectionInfo | undefined>();
  const [focusedCategory, setFocusedCategory] = useState<string>();
  const [rng, setRng] = useState<seedrandom.PRNG>(() => seedrandom(colorSeed));
  const [colors, setColors] = useState<ColorStore>(
    setColorsForDefaultResources(resourcesToColor, rng)
  );
  const [entityAnnotationSections, setEntityAnnotationSections] = useState<
    SectionInfo[][]
  >([]);
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>(
    {}
  );
  const [annotatorMode, setAnnotatorMode] = useState<AnnotatorModes>(
    AnnotatorModes.segmentText
  );

  useEffect(() => {
    const newExpandedSections: ExpandedSections = {};
    outline.forEach((section) => {
      if (section.key in expandedSections) {
        // If the key already exists, use its current state, otherwise initialize to false
        newExpandedSections[section.key] = expandedSections[section.key];
      } else {
        newExpandedSections[section.key] = true;
      }
    });
    setExpandedSections(newExpandedSections);
  }, [outline]);

  const handleDownloadExampleFile = async () => {
    // download example file from API endpoint
    try {
      const response = await fetch(`${awsUrl}/example/tutorial/`);
      if (!response.ok) {
        throw new Error("Could not download example file");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "example_discharge_summary.pdf";
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  const sectionRefs = outline.map(() => createRef<HTMLDivElement>());
  return (
    <div className="w-full p-2 flex flex-row gap-2">
      <StructurerText
        setMode={setMode}
        setText={setText}
        text={text}
        mode={mode}
        llmResponse={llmResponse}
        setLlmResponse={setLlmResponse}
        outline={outline}
        setOutline={setOutline}
        focusedSection={focusSection}
        setFocusedSection={setFocusSection}
        sectionRefs={sectionRefs}
        focusedCategory={focusedCategory}
        setFocusedCategory={setFocusedCategory}
        colors={colors}
        setColors={setColors}
        rng={rng}
        expandedSections={expandedSections}
        setExpandedSections={setExpandedSections}
        lng={lng}
        annotatorMode={annotatorMode}
        setAnnotatorMode={setAnnotatorMode}
        entityAnnotationSections={entityAnnotationSections}
        setEntityAnnotationSections={setEntityAnnotationSections}
      />
      <StructurerWorkBench
        mode={mode}
        setMode={setMode}
        text={text}
        setText={setText}
        llmResponse={llmResponse}
        setLlmResponse={setLlmResponse}
        outline={outline}
        setOutline={setOutline}
        focusedSection={focusSection}
        setFocusedSection={setFocusSection}
        sectionRefs={sectionRefs}
        focusedCategory={focusedCategory}
        setFocusedCategory={setFocusedCategory}
        colors={colors}
        setColors={setColors}
        rng={rng}
        expandedSections={expandedSections}
        setExpandedSections={setExpandedSections}
        lng={lng}
        annotatorMode={annotatorMode}
        setAnnotatorMode={setAnnotatorMode}
        entityAnnotationSections={entityAnnotationSections}
        setEntityAnnotationSections={setEntityAnnotationSections}
      />
      <StructurerOutline
        setMode={setMode}
        text={text}
        setText={setText}
        llmResponse={llmResponse}
        setLlmResponse={setLlmResponse}
        outline={outline}
        setOutline={setOutline}
        focusedSection={focusSection}
        setFocusedSection={setFocusSection}
        sectionRefs={sectionRefs}
        focusedCategory={focusedCategory}
        setFocusedCategory={setFocusedCategory}
        colors={colors}
        setColors={setColors}
        rng={rng}
        expandedSections={expandedSections}
        setExpandedSections={setExpandedSections}
        lng={lng}
        annotatorMode={annotatorMode}
        setAnnotatorMode={setAnnotatorMode}
        entityAnnotationSections={entityAnnotationSections}
        setEntityAnnotationSections={setEntityAnnotationSections}
      />
    </div>
  );
};

export default StructurerBody;
