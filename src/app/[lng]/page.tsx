"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StructurerBody from "./_structurer/StructurerBody";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";
import { t } from "i18next";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
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
  const [apiKey, setApiKey] = useState("");
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
