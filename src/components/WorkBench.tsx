import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Props {
  apiKey: string;
  setApiKey: (key: string) => void;
  model: string;
  setModel: (model: string) => void;
}

const WorkBench = (props: Props) => {
  // PROPS
  const { apiKey, setApiKey, model, setModel } = props;
  // FETCH
  // STATE
  // EFFECTS
  // HANDLER

  return (
    <div className="flex flex-col px-4 gap-2 w-1/6 shrink-0">
      <div>
        <Label htmlFor="model">Model</Label>
        <Input value={model} id="model" type="text" placeholder="" disabled />
      </div>
      <div>
        <Label htmlFor="openAIKey">OpenAI Key</Label>
        <Input
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          id="openAIKey"
          type="password"
          placeholder=""
        />
      </div>
    </div>
  );
};

export default WorkBench;
