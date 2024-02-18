import { StructurerModes, StructurerTextProps } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { t } from "i18next";
import StructurerTextDisplaySegmenter from "./StructurerTextDisplaySegmenter";
import StructurerTextDisplayLabeler from "./StructurerTextDisplayLabeler";
import ChangeTextButton from "./ChangeTextButton";

const StructurerText = (props: StructurerTextProps) => {
  const {
    mode,
    text,
    setMode,
    setText,
    llmResponse,
    setLlmResponse,
    setOutline,
    lng,
  } = props;

  if (mode === StructurerModes.pipelineInput) {
    return (
      <Textarea
        className="resize-none h-full"
        placeholder={t("Or, paste a medical text to be structured here")}
        onChange={(e) => setText(e.target.value)}
        value={text}
        id="joyride-textarea"
      />
    );
  } else {
    return (
      <div className="flex flex-col gap-3">
        <div className="border-blue-500 border rounded-md overflow-auto h-[85vh]">
          {mode === StructurerModes.segmentText ||
          mode === StructurerModes.segmentPredefined ? (
            <StructurerTextDisplaySegmenter {...props} />
          ) : mode === StructurerModes.labelText ? (
            <StructurerTextDisplayLabeler {...props} />
          ) : null}
        </div>
        <ChangeTextButton
          onClick={() => {
            setOutline([]);
            setMode(StructurerModes.pipelineInput);
          }}
          lng={lng}
        />
      </div>
    );
  }
};

export default StructurerText;
