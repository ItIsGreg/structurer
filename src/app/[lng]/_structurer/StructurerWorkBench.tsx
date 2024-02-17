import { StructurerModes, StructurerWorkBenchProps } from "@/types";
import StructurerWorkBenchTextInput from "./StructurerWorkBenchTextInput";
import StructurerWorkBenchSegmenter from "./StructurerWorkBenchSegmenter";
import StructurerWorkBenchLabeler from "./StructurerWorkBenchLabeler";
import { useEffect, useState } from "react";
import { defaultGPTModel, dummySections } from "@/utils/constants";
import StructurerWorkBenchSegmenterPredefined from "./StructurerWorkBenchSegmenterPredefined";

const StructurerWorkBench = (props: StructurerWorkBenchProps) => {
  const {
    mode,
    text,
    setOutline,
    setFocusedSection,
    runJoyride,
    setRunJoyride,
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
    <div className="flex flex-col items-center overflow-auto">
      {mode === StructurerModes.inputText ? (
        <StructurerWorkBenchTextInput
          {...props}
          gptModel={gptModel}
          setGptModel={setGPTModel}
          setRunJoyride={setRunJoyride}
          runJoyride={runJoyride}
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
      ) : mode === StructurerModes.segmentPredefined ? (
        <StructurerWorkBenchSegmenterPredefined
          {...props}
          gptModel={gptModel}
          setGptModel={setGPTModel}
        />
      ) : null}
    </div>
  );
};
export default StructurerWorkBench;
