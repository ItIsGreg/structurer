import { GPTModelAdminProps, OptionType } from "@/types";
import { gptModelOptions } from "@/utils/constants";
import Select from "react-select";

const GPTModelAdmin = (props: GPTModelAdminProps) => {
  const { gptModel, setGptModel } = props;

  const handleSelect = (e: OptionType): void => {
    console.log("e", e);
    setGptModel(e.value);
  };

  return (
    <div>
      <h2 className="text-center border-t">GPT-Model</h2>
      <Select
        options={gptModelOptions}
        placeholder={gptModel}
        onChange={(e) => handleSelect(e as OptionType)}
      />
    </div>
  );
};

export default GPTModelAdmin;
