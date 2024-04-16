import { StructurerModes, StructurerTextProps } from "@/types";
import StructurerTextInput from "./StructurerTextInput";
import StructurerTextDisplay from "./StructurerTextDisplay";
import StructurerLLMVerificationUpsetter from "./StructurerLLMVerificationUpsetter";
import StructurerTextDisplaySection from "./StructurerTextDisplaySection";
import LLMVerifivationAdmin from "./LLMVerificationAdmin";

const StructurerText = (props: StructurerTextProps) => {
  const {
    mode,
    text,
    setMode,
    setText,
    llmResponse,
    setLlmResponse,
    matchedGtAndPred,
    setMatchedGtAndPred,
    currentMatchedGtAndPredIndex,
    setCurrentMatchedGtAndPredIndex,
    setExpandedSections,
  } = props;

  return (
    <div className="w-6/12">
      {mode === StructurerModes.inputText ? (
        <StructurerTextInput {...props} />
      ) : mode === StructurerModes.verifyLLMAnnotationsSetup ? (
        <StructurerLLMVerificationUpsetter
          matchedGtAndPred={matchedGtAndPred}
          setMatchedGtAndPred={setMatchedGtAndPred}
        />
      ) : mode === StructurerModes.verifyLLMAnnotations ? (
        <div>
          <StructurerTextDisplaySection
            key={
              matchedGtAndPred[currentMatchedGtAndPredIndex].gt[0].startIndex
            }
            {...props}
            section={matchedGtAndPred[currentMatchedGtAndPredIndex].gt[0]}
            index={0}
            setRenameSection={() => {}}
            setShowSectionRenameModal={() => {}}
            setShowSplitSectionModal={() => {}}
            setSplitSection={() => {}}
          />
          <LLMVerifivationAdmin
            matchedGtAndPred={matchedGtAndPred}
            currentMatchedGtAndPredIndex={currentMatchedGtAndPredIndex}
            setCurrentMatchedGtAndPredIndex={setCurrentMatchedGtAndPredIndex}
            setExpandedSections={setExpandedSections}
          />
        </div>
      ) : (
        <StructurerTextDisplay {...props} />
      )}
    </div>
  );
};

export default StructurerText;
