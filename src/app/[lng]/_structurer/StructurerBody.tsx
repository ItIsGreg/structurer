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
import { colorSeed, defaultFocusResources } from "@/utils/constants";
import { setColorsForDefaultResources } from "@/utils/annotator_utils";
import dynamic from "next/dynamic";
import { Step, ACTIONS, EVENTS, STATUS, CallBackProps } from "react-joyride";
import { useTranslation } from "@/app/i18n/client";

const Joyride = dynamic(() => import("react-joyride"), { ssr: false });

interface StructurerBodyProps {
  params: {
    lng: string;
  };
}

const StructurerBody = (props: StructurerBodyProps) => {
  const lng = props.params.lng;
  const [text, setText] = useState("");
  const [mode, setMode] = useState<StructurerModes>(StructurerModes.inputText);
  const [llmResponse, setLlmResponse] = useState<string>();
  const [outline, setOutline] = useState<SectionInfo[]>([]);
  const [focusSection, setFocusSection] = useState<SectionInfo | undefined>();
  const [focusedCategory, setFocusedCategory] = useState<string>();
  const [rng, setRng] = useState<seedrandom.PRNG>(() => seedrandom(colorSeed));
  const [colors, setColors] = useState<ColorStore>(
    setColorsForDefaultResources(defaultFocusResources, rng)
  );
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>(
    {}
  );
  const [runJoyride, setRunJoyride] = useState<boolean>(false);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [steps, setSteps] = useState<Step[]>([]);
  useEffect(() => {
    const newExpandedSections: ExpandedSections = {};
    outline.forEach((section) => {
      if (section.key in expandedSections) {
        // If the key already exists, use its current state, otherwise initialize to false
        newExpandedSections[section.key] = expandedSections[section.key];
      } else {
        newExpandedSections[section.key] = false;
      }
    });
    setExpandedSections(newExpandedSections);
  }, [outline]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data;
    if (
      ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)
    ) {
      // Update state to advance the tour
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    } else if (
      ([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)
    ) {
      // Need to set our running state to false, so we can restart if we click start again.
      setRunJoyride(false);
    }
  };

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    if (mode === StructurerModes.inputText) {
      setSteps([
        {
          target: "#joyride-start",
          content: (
            <div>
              <p>
                Welcome to the structurer. Download the example file and let us
                get going.
              </p>
              <button className="bg-blue-500 rounded-md p-1">
                Download example file
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
          content: "This is the structurer view.",
          placement: "center",
          disableBeacon: true,
        },
        {
          target: "#joyride-add-sections",
          content:
            "Here you can set sections that you want to extract from the text. For now let's keep the default",
        },
        {
          target: "#joyride-find-sections",
          content:
            "Click here to start the extraction process. It might take a few seconds.",
          spotlightClicks: true,
          hideFooter: true,
        },
        {
          target: "#joyride-expand-all",
          content:
            "Click here to expand all Section that were extracted from the text. Take a look around. Then click on the beacon to continue",
          spotlightClicks: true,
          hideFooter: true,
        },
        {
          target: "#joyride-find-label-button",
          content: (
            <div>
              <p>
                There should be a section called previous illnesses. On the
                right it has a button that looks like this:
              </p>
              <button className="bg-blue-500 rounded-md p-1">
                <span className="text-white">+</span>
              </button>
              <p>
                Click on it so that the button is highlighted. Then click on the
                next beacon.
              </p>
            </div>
          ),
        },
        {
          target: "#joyride-entity-selection",
          content:
            "Here you can set which entities should be extracted from the text. For now let's keep the default",
          disableBeacon: false,
        },
        {
          target: "#joyride-find-entities",
          content:
            "Click here to start the extraction process. It might take a few seconds.",
          spotlightClicks: true,
          hideFooter: true,
        },
        {
          target: "#joyride-outline",
          content:
            "The outline provides an overview of the extracted sections and entities. You can also download the whole outline or individual sections",
          placement: "left",
        },
        {
          target: "#joyride-start",
          content:
            "That is the end of the tutorial. Play around a bit. Maybe try to extract Medication entities from the Discharge Medication section.",
          placement: "center",
          disableBeacon: true,
        },
      ]);
    }
  }, [mode]);

  const sectionRefs = outline.map(() => createRef<HTMLDivElement>());
  return (
    <div className="w-full p-2 flex flex-row gap-2" id="joyride-start">
      {mode === StructurerModes.inputText && (
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
      <StructurerWorkBench
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
      />
      <StructurerOutline
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
      />
    </div>
  );
};

export default StructurerBody;
