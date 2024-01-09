import { StructurerTextInputProps } from "@/types";
import StructurerUpload from "./StructurerUpload";
import { useTranslation } from "@/app/i18n/client";

const StructurerTextInput = (props: StructurerTextInputProps) => {
  const { setText, text, lng, setOutline, setMode } = props;
  const { t } = useTranslation(lng, "StructurerTextInput");

  return (
    <div className="flex-flex-col gap-2">
      <StructurerUpload
        setText={setText}
        lng={lng}
        setOutline={setOutline}
        setMode={setMode}
      />
      <textarea
        className="rounded"
        rows={30}
        cols={60}
        placeholder={t("Or, paste a medical text to be structured here")}
        onChange={(e) => setText(e.target.value)}
        value={text}
        id="joyride-textarea"
      ></textarea>
    </div>
  );
};

export default StructurerTextInput;
