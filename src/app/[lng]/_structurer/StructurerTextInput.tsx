import { StructurerTextInputProps } from "@/types";
import StructurerUpload from "./StructurerUpload";
import { useTranslation } from "@/app/i18n/client";
import { Textarea } from "@/components/ui/textarea";

const StructurerTextInput = (props: StructurerTextInputProps) => {
  const { setText, text, lng, setOutline, setMode } = props;
  const { t } = useTranslation(lng, "StructurerTextInput");

  return (
    <div className="h-full w-full">
      {/* <StructurerUpload
        setText={setText}
        lng={lng}
        setOutline={setOutline}
        setMode={setMode}
      /> */}
      <Textarea
        className="resize-none"
        rows={30}
        cols={60}
        placeholder={t("Or, paste a medical text to be structured here")}
        onChange={(e) => setText(e.target.value)}
        value={text}
        id="joyride-textarea"
      />
    </div>
  );
};

export default StructurerTextInput;
