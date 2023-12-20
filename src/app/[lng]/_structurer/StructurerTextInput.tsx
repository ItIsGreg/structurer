import { StructurerTextInputProps } from "@/types";
import StructurerUpload from "./StructurerUpload";

const StructurerTextInput = (props: StructurerTextInputProps) => {
  const { setText, text } = props;

  return (
    <div className="flex-flex-col gap-2">
      <StructurerUpload setText={setText} />
      <textarea
        className="rounded"
        rows={30}
        cols={60}
        placeholder="Paste a medical text to be structured"
        onChange={(e) => setText(e.target.value)}
        value={text}
      ></textarea>
    </div>
  );
};

export default StructurerTextInput;
