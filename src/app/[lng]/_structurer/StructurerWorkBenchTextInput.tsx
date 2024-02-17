import Image from "next/image";
import structurerImg from "@/../data/img/structurer.png";
import { StructurerModes, StructurerWorkBenchTextInputProps } from "@/types";
import { useTranslation } from "@/app/i18n/client";

const StructurerWorkBenchTextInput = (
  props: StructurerWorkBenchTextInputProps
) => {
  const { lng, runJoyride, setRunJoyride } = props;
  const { t } = useTranslation(lng, "StructurerWorkBenchTextInput");
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <button
        className="bg-blue-500 rounded-md text-white text-4xl w-full transform hover:bg-blue-700 p-4"
        onClick={() => setRunJoyride(!runJoyride)}
      >
        {!runJoyride ? t("Do the tutorial") : t("Stop the tutorial")}
      </button>
      <button
        className="bg-blue-500 rounded-md text-white text-4xl w-full transform hover:bg-blue-700 p-4"
        onClick={() => props.setMode(StructurerModes.labelText)}
      >
        {t("Label Medical Entities")}
      </button>
      <button
        className="bg-blue-500 rounded-md text-white text-4xl w-full transform hover:bg-blue-700 p-4"
        onClick={() => props.setMode(StructurerModes.segmentText)}
        id="joyride-segment-text"
      >
        {t("Segment Text")}
      </button>
    </div>
  );
};

export default StructurerWorkBenchTextInput;
