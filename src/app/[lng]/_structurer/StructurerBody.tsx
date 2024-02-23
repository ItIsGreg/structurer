"use client";

import { createRef, useEffect, useState } from "react";
import {
  StructurerModes,
  SectionInfo,
  ColorStore,
  ExpandedSections,
} from "@/types";
import StructurerText from "./StructurerText";
import StructurerWorkBench from "./StructurerWorkBench";
import StructurerOutline from "./StructurerOutline";
import seedrandom from "seedrandom";
import {
  awsUrl,
  colorSeed,
  defaultFocusResources,
  resourcesToColor,
} from "@/utils/constants";
import { setColorsForDefaultResources } from "@/utils/annotator_utils";
import dynamic from "next/dynamic";
import { Step, ACTIONS, EVENTS, STATUS, CallBackProps } from "react-joyride";
import { useTranslation } from "@/app/i18n/client";
import { LiaMarkerSolid } from "react-icons/lia";
import { TiDownload } from "react-icons/ti";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileUp, Plus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { t } from "i18next";
import { Label } from "@/components/ui/label";
import StructurerTextDisplaySegmenter from "./StructurerTextDisplaySegmenter";
import StructurerWorkBenchSegmenter from "./StructurerWorkBenchSegmenter";

const Joyride = dynamic(() => import("react-joyride"), { ssr: false });

interface StructurerBodyProps {
  params: {
    lng: string;
  };
}

const StructurerBody = (props: StructurerBodyProps) => {
  const lng = props.params.lng;
  const [text, setText] = useState("");
  const [mode, setMode] = useState<StructurerModes>(
    StructurerModes.pipelineInput
  );
  const [llmResponse, setLlmResponse] = useState<string>();
  const [outline, setOutline] = useState<SectionInfo[]>([]);
  const [focusSection, setFocusSection] = useState<SectionInfo | undefined>();
  const [focusedCategory, setFocusedCategory] = useState<string>();
  const [rng, setRng] = useState<seedrandom.PRNG>(() => seedrandom(colorSeed));
  const [colors, setColors] = useState<ColorStore>(
    setColorsForDefaultResources(resourcesToColor, rng)
  );
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>(
    {}
  );
  const [runJoyride, setRunJoyride] = useState<boolean>(false);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [steps, setSteps] = useState<Step[]>([]);

  // ############ NEW
  const [sections, setSections] = useState<string[]>([
    "Discharge Medication",
    "Discharge Diagnosis",
    "Discharge Instructions",
    "Discharge Diet",
    "Discharge Condition",
    "Discharge Follow-up",
    "Discharge Reason",
    "Discharge Destination",
    "Discharge Disposition",
  ]);
  const [entities, setEntities] = useState<string[]>([
    "Condition",
    "Medication",
    "Procedure",
    "Observation",
  ]);

  useEffect(() => {
    const newExpandedSections: ExpandedSections = {};
    outline.forEach((section) => {
      if (section.key in expandedSections) {
        // If the key already exists, use its current state, otherwise initialize to false
        newExpandedSections[section.key] = expandedSections[section.key];
      } else {
        newExpandedSections[section.key] = true;
      }
    });
    setExpandedSections(newExpandedSections);
  }, [outline]);

  const handleDownloadExampleFile = async () => {
    // download example file from API endpoint
    try {
      const response = await fetch(`${awsUrl}/example/tutorial/`);
      if (!response.ok) {
        throw new Error("Could not download example file");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "example_discharge_summary.pdf";
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (mode === StructurerModes.pipelineInput) {
      setSteps([
        {
          target: "#joyride-start",
          content: (
            <div className="flex flex-col gap-2 justify-center items-center">
              <p>
                Welcome to the <b>Structurer</b>. The <b>Structurer</b> helps to
                extract structured data from medical texts. In this tutorial we
                will extract the <b>previous conditions</b> from a discharge
                summary. With the button below you can download an anonymized
                <b>example discharge summary</b>, that we will use for this
                tutorial.
              </p>
              <div></div>
              <button
                className="bg-blue-500 rounded-md p-1 m-1 flex flex-row gap-2 justify-center items-center transform hover:scale-105 "
                onClick={() => handleDownloadExampleFile()}
              >
                Download example file <TiDownload />
              </button>
            </div>
          ),
          placement: "center",
        },
        {
          target: "#joyride-extract-text-pdf",
          content:
            "Use this button to extract the text from the tutorial PDF file you just downloaded.",
          disableBeacon: true,
          disableOverlayClose: true,
          spotlightClicks: true,
        },
        {
          target: "#joyride-textarea",
          content: "This is the text extracted from the PDF file.",
          disableBeacon: true,
        },
        {
          target: "#joyride-segment-text",
          content: "Click here to start structuring the text.",
          disableBeacon: true,
          spotlightClicks: true,
          hideFooter: true,
        },
      ]);
    } else if (mode === StructurerModes.segmentText) {
      setSteps([
        {
          target: "#joyride-start",
          content: (
            <div>
              <p>
                This is the <b>structurer view</b>.
              </p>
            </div>
          ),

          placement: "center",
          disableBeacon: true,
        },
        {
          target: "#joyride-add-sections",
          content: (
            <div>
              <p>
                Here you can set <b>sections</b> that you want to extract from
                the text. For now let us keep the default
              </p>
            </div>
          ),
        },
        {
          target: "#joyride-find-sections",
          content: (
            <div>
              <p>
                Click here to start the <b>extraction process</b>. It might take
                a few seconds.
              </p>
            </div>
          ),
          spotlightClicks: true,
        },
        {
          target: "#joyride-expand-all",
          content: (
            <div>
              <p>
                Here you can see the <b>sections</b> that were extracted from
                the text. Take a look around. Then click on the beacon to
                continue
              </p>
            </div>
          ),
        },
        {
          target: "#joyride-find-label-button",
          content: (
            <div>
              <p>
                There should be a section called <b>previous illnesses</b>. On
                the right it has a button that looks like this:
              </p>
              <button
                className={
                  "bg-blue-500 text-right rounded-md p-1 transform hover:scale-105"
                }
              >
                <LiaMarkerSolid />
              </button>
              <p>
                Click on it so that the button is <b>highlighted</b>. Then click
                on the next beacon.
              </p>
            </div>
          ),
          placement: "top",
        },
        {
          target: "#joyride-entity-selection",
          content: (
            <div>
              <p>
                Here you can set <b>which entities</b> should be extracted from
                the text. For now let us keep the default
              </p>
            </div>
          ),
          disableBeacon: false,
        },
        {
          target: "#joyride-find-entities",
          content: (
            <div>
              <p>
                Click here to start <b>the extraction process</b>. It might take
                a few seconds.
              </p>
            </div>
          ),
          spotlightClicks: true,
          hideFooter: true,
        },
        {
          target: "#joyride-outline",
          content: (
            <div>
              <p>
                The <b>outline</b> provides an overview of the extracted
                sections and entities. You can also <b>download</b> the whole
                outline or individual sections
              </p>
            </div>
          ),
          placement: "left",
        },
        {
          target: "#joyride-start",
          content: (
            <div>
              <p>
                That is the end of the tutorial. Play around a bit. Maybe try to
                extract <b>Medication</b> entities from the{" "}
                <b>Discharge Medication</b> section.
              </p>
            </div>
          ),
          placement: "center",
          disableBeacon: true,
        },
      ]);
    }
  }, [mode]);

  const sectionRefs = outline.map(() => createRef<HTMLDivElement>());
  return (
    <div className="flex w-full h-full" id="joyride-start">
      {/* Left Side */}
      <div className="flex flex-col grow">
        <div className="flex">
          <Tabs defaultValue="pipeline" className="">
            <TabsList>
              <TabsTrigger
                value="pipeline"
                onClick={() => setMode(StructurerModes.pipelineInput)}
              >
                APE Pipeline
              </TabsTrigger>
              <TabsTrigger
                value="annotator"
                onClick={() => setMode(StructurerModes.labelText)}
              >
                Annotator
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="ml-4">
            <Select>
              <SelectTrigger className="w-64">
                <SelectValue placeholder={t("Load an example text...")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Example 1</SelectItem>
                <SelectItem value="2">Example 2</SelectItem>
                <SelectItem value="3">Example 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant={"ghost"} className="ml-2">
            <FileUp strokeWidth={1} />
          </Button>
        </div>
        {mode === StructurerModes.pipelineInput && (
          <Joyride
            steps={steps}
            run={runJoyride}
            continuous
            showSkipButton
            showProgress
            // stepIndex={stepIndex}
            // callback={handleJoyrideCallback}
          />
        )}
        {mode === StructurerModes.segmentText && (
          <Joyride
            steps={steps}
            run={runJoyride}
            showSkipButton
            showProgress
            // stepIndex={stepIndex}
            // callback={handleJoyrideCallback}
          />
        )}
        <div className="mt-4 grow">
          <StructurerText
            setMode={setMode}
            setText={setText}
            text={text}
            mode={mode}
            llmResponse={llmResponse}
            setLlmResponse={setLlmResponse}
            outline={outline}
            setOutline={setOutline}
            focusedSection={focusSection}
            setFocusedSection={setFocusSection}
            sectionRefs={sectionRefs}
            focusedCategory={focusedCategory}
            setFocusedCategory={setFocusedCategory}
            colors={colors}
            setColors={setColors}
            rng={rng}
            expandedSections={expandedSections}
            setExpandedSections={setExpandedSections}
            lng={lng}
            runJoyride={runJoyride}
            setRunJoyride={setRunJoyride}
          />
        </div>
        <div className="flex w-full justify-end">
          <Button className="mt-4 w-64">{t("Submit")}</Button>
        </div>
      </div>
      {/* Right Side */}
      <div className="w-1/4">
        <div className="flex flex-col px-4 gap-4">
          <div>
            <Select>
              <SelectTrigger className="w-64">
                <SelectValue placeholder={t("Load an example text...")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Example 1</SelectItem>
                <SelectItem value="2">Example 2</SelectItem>
                <SelectItem value="3">Example 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="" className="font-bold">
                {t("Sections")}
              </Label>
              <Button variant={"ghost"} size={"icon"}>
                <Plus size={20} />
              </Button>
            </div>
            <div className="flex flex-col rounded-xl gap-1 max-h-48 overflow-y-auto">
              {sections.map((section, index) => (
                <div className="flex items-center w-full" key={section}>
                  <Button
                    key={index}
                    className="grow"
                    variant={"outline"}
                    size={"sm"}
                  >
                    {section}
                  </Button>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="opacity-30"
                  >
                    <X />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="" className="font-bold">
                {t("Entities")}
              </Label>
              <Button variant={"ghost"} size={"icon"}>
                <Plus size={20} />
              </Button>
            </div>
            <div>
              <div className="flex flex-col rounded-xl gap-1 max-h-48 overflow-y-auto">
                {entities.map((entity, index) => (
                  <div className="flex items-center w-full" key={entity}>
                    <Button key={index} className="grow" variant={"outline"}>
                      {entity}
                    </Button>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      className="opacity-30"
                    >
                      <X />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* <StructurerWorkBench
          mode={mode}
          setMode={setMode}
          text={text}
          setText={setText}
          llmResponse={llmResponse}
          setLlmResponse={setLlmResponse}
          outline={outline}
          setOutline={setOutline}
          focusedSection={focusSection}
          setFocusedSection={setFocusSection}
          sectionRefs={sectionRefs}
          focusedCategory={focusedCategory}
          setFocusedCategory={setFocusedCategory}
          colors={colors}
          setColors={setColors}
          rng={rng}
          expandedSections={expandedSections}
          setExpandedSections={setExpandedSections}
          lng={lng}
          runJoyride={runJoyride}
          setRunJoyride={setRunJoyride}
        /> */}
        {/* <StructurerOutline
          setMode={setMode}
          text={text}
          setText={setText}
          llmResponse={llmResponse}
          setLlmResponse={setLlmResponse}
          outline={outline}
          setOutline={setOutline}
          focusedSection={focusSection}
          setFocusedSection={setFocusSection}
          sectionRefs={sectionRefs}
          focusedCategory={focusedCategory}
          setFocusedCategory={setFocusedCategory}
          colors={colors}
          setColors={setColors}
          rng={rng}
          expandedSections={expandedSections}
          setExpandedSections={setExpandedSections}
          lng={lng}
          runJoyride={runJoyride}
          setRunJoyride={setRunJoyride}
        /> */}
      </div>
    </div>
  );
};

export default StructurerBody;
