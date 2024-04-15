import { StructurerModes, StructurerTextProps } from "@/types";
import StructurerTextInput from "./StructurerTextInput";
import StructurerTextDisplay from "./StructurerTextDisplay";
import StructurerLLMVerificationUpsetter from "./StructurerLLMVerificationUpsetter";
import { useRef } from "react";

const StructurerText = (props: StructurerTextProps) => {
  const { mode, text, setMode, setText, llmResponse, setLlmResponse } = props;

  return (
    <div className="w-6/12">
      {mode === StructurerModes.inputText ? (
        <StructurerTextInput {...props} />
      ) : StructurerModes.verifyLLMAnnotationsSetup ? (
        <StructurerLLMVerificationUpsetter />
      ) : (
        <StructurerTextDisplay {...props} />
      )}
    </div>
  );
};

export default StructurerText;
