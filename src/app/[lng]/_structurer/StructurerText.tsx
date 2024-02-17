import { StructurerModes, StructurerTextProps } from "@/types";
import StructurerTextInput from "./StructurerTextInput";
import StructurerTextDisplay from "./StructurerTextDisplay";

const StructurerText = (props: StructurerTextProps) => {
  const { mode, text, setMode, setText, llmResponse, setLlmResponse } = props;

  if (mode === StructurerModes.inputText) {
    return (
      <StructurerTextInput
        {...props}
        setText={setText}
        setMode={setMode}
        text={text}
      />
    );
  } else {
    return (
      <StructurerTextDisplay
        {...props}
        llmResponse={llmResponse}
        setLlmResponse={setLlmResponse}
      />
    );
  }
};

export default StructurerText;
