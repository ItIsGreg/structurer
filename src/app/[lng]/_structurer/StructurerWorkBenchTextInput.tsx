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
    <div className="flex flex-col justify-center items-center gap-3 h-screen w-500">
      <button
        className="bg-blue-500 rounded-md text-white w-full transform hover:bg-blue-700 hover:scale-110"
        onClick={() => props.setMode(StructurerModes.annotateText)}
      >
        {t("Annotate Medical Text")}
      </button>
      <button
        className="bg-blue-500 rounded-md text-white w-full transform hover:bg-blue-700 hover:scale-110"
        onClick={() => props.setMode(StructurerModes.labelText)}
      >
        {t("Label Medical Entities")}
      </button>
      <button
        className="bg-blue-500 rounded-md text-white w-full transform hover:bg-blue-700 hover:scale-110"
        onClick={() => props.setMode(StructurerModes.segmentText)}
        id="joyride-segment-text"
      >
        {t("Segment Text")}
      </button>
      <Image
        src={structurerImg}
        alt="The shining hero that structures the medical texts"
        width={500}
        height={300}
        className="rounded-full"
      />
      <button
        className="bg-blue-500 rounded-md text-white w-full transform hover:bg-blue-700 hover:scale-110"
        onClick={() => setRunJoyride(!runJoyride)}
      >
        {!runJoyride ? t("Do the tutorial") : t("Stop the tutorial")}
      </button>
    </div>
  );
};

export default StructurerWorkBenchTextInput;
