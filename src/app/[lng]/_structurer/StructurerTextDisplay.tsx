import { StructurerModes, StructurerTextDisplayProps } from "@/types";
import ChangeTextButton from "./ChangeTextButton";
import StructurerTextDisplaySegmenter from "./StructurerTextDisplaySegmenter";
import StructurerTextDisplayLabeler from "./StructurerTextDisplayLabeler";
import StructurerTextDisplayAnnotator from "./StructurerTextDisplayAnnotator";
import MultTextAdmin from "./MutlTextAdmin";

const StructurerTextDisplay = (props: StructurerTextDisplayProps) => {
  const {
    mode,
    setMode,
    lng,
    setOutline,
    entityAnnotationSections,
    setEntityAnnotationSections,
    outline,
  } = props;

  return (
    <div className="flex flex-col gap-3">
      <div className="border-blue-500 border rounded-md overflow-auto h-[85vh]">
        {mode === StructurerModes.segmentText ? (
          <StructurerTextDisplaySegmenter {...props} />
        ) : mode === StructurerModes.labelText ? (
          <StructurerTextDisplayLabeler {...props} />
        ) : mode === StructurerModes.annotateText ? (
          <StructurerTextDisplayAnnotator {...props} />
        ) : null}
      </div>
      <ChangeTextButton
        onClick={() => {
          setOutline([]);
          setMode(StructurerModes.inputText);
        }}
        lng={lng}
      />
      <MultTextAdmin
        entityAnnotationSections={entityAnnotationSections}
        setEntityAnnotationSections={setEntityAnnotationSections}
        outline={outline}
        setOutline={setOutline}
      />
    </div>
  );
};

export default StructurerTextDisplay;
