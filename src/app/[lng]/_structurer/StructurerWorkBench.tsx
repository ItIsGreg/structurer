import { StructurerModes, StructurerWorkBenchProps } from "@/types";
import StructurerWorkBenchTextInput from "./StructurerWorkBenchTextInput";
import StructurerWorkBenchSegmenter from "./StructurerWorkBenchSegmenter";
import StructurerWorkBenchLabeler from "./StructurerWorkBenchLabeler";
import { useEffect, useState } from "react";
import { defaultGPTModel, dummySections } from "@/utils/constants";
import StructurerWorkBenchAnnotator from "./StructurerWorkBenchAnnotator";
import StructurerTextDisplaySection from "./StructurerTextDisplaySection";

const StructurerWorkBench = (props: StructurerWorkBenchProps) => {
  const {
    mode,
    text,
    setOutline,
    setFocusedSection,
    matchedGtAndPred,
    currentMatchedGtAndPredIndex,
  } = props;
  const [gptModel, setGPTModel] = useState<string>(defaultGPTModel);

  const labelerSection = {
    key: "Text",
    startIndex: 0,
    endIndex: text.length,
    askedFor: true,
    text: text,
  };

  useEffect(() => {
    if (mode === StructurerModes.labelText) {
      setOutline([labelerSection]);
      setFocusedSection(labelerSection);
    } else if (mode === StructurerModes.segmentText) {
      // setOutline([]);
    }
  }, [mode]);

  return (
    <div
      className={`flex flex-col items-center ${
        mode === StructurerModes.verifyLLMAnnotations ? "w-6/12" : "w-4/12"
      } overflow-auto`}
    >
      {mode === StructurerModes.inputText ||
      mode === StructurerModes.verifyLLMAnnotationsSetup ? (
        <StructurerWorkBenchTextInput
          {...props}
          gptModel={gptModel}
          setGptModel={setGPTModel}
        />
      ) : mode === StructurerModes.segmentText ? (
        <StructurerWorkBenchSegmenter
          {...props}
          gptModel={gptModel}
          setGptModel={setGPTModel}
        />
      ) : mode === StructurerModes.labelText ? (
        <StructurerWorkBenchLabeler
          {...props}
          gptModel={gptModel}
          setGptModel={setGPTModel}
        />
      ) : mode === StructurerModes.annotateText ? (
        <StructurerWorkBenchAnnotator
          {...props}
          gptModel={gptModel}
          setGptModel={setGPTModel}
        />
      ) : mode === StructurerModes.verifyLLMAnnotations ? (
        <StructurerTextDisplaySection
          key={
            matchedGtAndPred[currentMatchedGtAndPredIndex].pred[0].startIndex
          }
          {...props}
          section={matchedGtAndPred[currentMatchedGtAndPredIndex].pred[0]}
          index={0}
          setRenameSection={() => {}}
          setShowSectionRenameModal={() => {}}
          setShowSplitSectionModal={() => {}}
          setSplitSection={() => {}}
        />
      ) : null}
    </div>
  );
};
export default StructurerWorkBench;
