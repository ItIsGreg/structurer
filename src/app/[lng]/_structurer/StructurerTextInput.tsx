import { StructurerModes, StructurerTextInputProps } from "@/types";
import StructurerUpload from "./StructurerUpload";
import { useTranslation } from "@/app/i18n/client";
import { divide } from "lodash";

const StructurerTextInput = (props: StructurerTextInputProps) => {
  const {
    setText,
    text,
    lng,
    setOutline,
    setMode,
    entityAnnotationSections,
    setEntityAnnotationSections,
    mode,
  } = props;
  const { t } = useTranslation(lng, "StructurerTextInput");

  return (
    <div className="flex-flex-col gap-2">
      <StructurerUpload
        setText={setText}
        lng={lng}
        setOutline={setOutline}
        setMode={setMode}
        entityAnnotationSections={entityAnnotationSections}
        setEntityAnnotationSections={setEntityAnnotationSections}
      />
      {mode === StructurerModes.verifyLLMAnnotationsSetup ? (
        <div></div>
      ) : (
        <textarea
          className="rounded"
          rows={30}
          cols={60}
          placeholder={t("Or, paste a medical text to be structured here")}
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></textarea>
      )}
      {entityAnnotationSections.length > 0 && (
        <div>
          There are {entityAnnotationSections.length} texts uploaded for
          annotation.
        </div>
      )}
    </div>
  );
};

export default StructurerTextInput;
