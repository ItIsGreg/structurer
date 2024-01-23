import { AnnotatorModes, StructurerWorkBenchLabelerProps } from "@/types";
import StructurerWorkBenchSectionLabeler from "./StructurerWorkBenchSectionLabeler";
import StructurerWorkBenchLabeler from "./StructurerWorkBenchLabeler";

const StructurerWorkBenchAnnotator = (
  props: StructurerWorkBenchLabelerProps
) => {
  const { annotatorMode, setAnnotatorMode } = props;

  const determineSwitchAnnotatorMode = (annotatorMode: AnnotatorModes) => {
    switch (annotatorMode) {
      case AnnotatorModes.segmentText:
        return AnnotatorModes.labelText;
      case AnnotatorModes.labelText:
        return AnnotatorModes.segmentText;
      default:
        return AnnotatorModes.segmentText;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {annotatorMode === AnnotatorModes.segmentText ? (
        <StructurerWorkBenchSectionLabeler {...props} />
      ) : annotatorMode === AnnotatorModes.labelText ? (
        <StructurerWorkBenchLabeler {...props} />
      ) : null}
      <button
        className="bg-blue-500 rounded-md"
        onClick={() =>
          setAnnotatorMode(determineSwitchAnnotatorMode(annotatorMode))
        }
      >
        Switch Mode
      </button>
    </div>
  );
};

export default StructurerWorkBenchAnnotator;
