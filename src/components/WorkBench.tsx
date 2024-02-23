import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

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
        <Label htmlFor="openAIKey">OpenAI Key</Label>
        <Input
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          id="openAIKey"
          type="password"
          placeholder=""
        />
      </div>
      <Button
        onClick={() => {
          setApiKey("default");
        }}
      >
        Set Default
      </Button>
    </div>
  );
};

export default WorkBench;
