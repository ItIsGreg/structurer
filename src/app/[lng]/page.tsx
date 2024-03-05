"use client";

import { useState } from "react";
import { SectionInfo, StructurerModes } from "@/types";
import MainDisplay from "@/components/MainDisplay";
import WorkBench from "@/components/WorkBench";

interface Props {
  params: {
    lng: string;
  };
}

const MainPage = (props: Props) => {
  const { lng } = props.params;
  const [mainText, setMainText] = useState("");
  const [mode, setMode] = useState(StructurerModes.pipelineInput);
  const [model, setModel] = useState("gpt-4");
  const [apiKey, setApiKey] = useState("default");
  const [pipelineResult, setPipelineResult] = useState<
    SectionInfo[] | undefined
  >(undefined);

  return (
    <div className="flex w-full h-full">
      {/* Left Side Main Display */}
      <MainDisplay
        lng={lng}
        apiKey={apiKey}
        mode={mode}
        setMode={setMode}
        mainText={mainText}
        setMainText={setMainText}
        pipelineResult={pipelineResult}
        setPipelineResult={setPipelineResult}
      />
      {/* Right Side Work Bench */}
      <WorkBench
        apiKey={apiKey}
        setApiKey={setApiKey}
        model={model}
        setModel={setModel}
      />
    </div>
  );
};

export default MainPage;
