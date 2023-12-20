import { useTranslation } from "@/app/i18n/client";
import {
  CombineSectionButtonState,
  StructurerSectionCombineButtonProps,
} from "@/types";
import { combineSections } from "@/utils/structurerUtils";
import { PiUniteFill } from "react-icons/pi";
import { Tooltip } from "react-tooltip";

const StructurerSectionCombineButton = (
  props: StructurerSectionCombineButtonProps
) => {
  const { state, outline, setOutline, section, lng } = props;

  const { t } = useTranslation(lng, "StructurerSectionCombineButton");

  const handleCombineClick = () => {
    const sectionIndex = outline.findIndex((sec) => sec.key === section.key);
    if (sectionIndex === 0 && state === CombineSectionButtonState.CombineAbove)
      return;
    if (
      sectionIndex === outline.length - 1 &&
      state === CombineSectionButtonState.CombineBelow
    )
      return;
    if (state === CombineSectionButtonState.CombineAbove) {
      const combinedSection = combineSections(
        outline[sectionIndex - 1],
        section
      );
      const newOutline = outline.filter(
        (sec) =>
          sec.key !== section.key && sec.key !== outline[sectionIndex - 1].key
      );
      newOutline.splice(sectionIndex - 1, 0, combinedSection);
      setOutline(newOutline);
    } else {
      const combinedSection = combineSections(
        section,
        outline[sectionIndex + 1]
      );
      const newOutline = outline.filter(
        (sec) =>
          sec.key !== section.key && sec.key !== outline[sectionIndex + 1].key
      );
      newOutline.splice(sectionIndex, 0, combinedSection);
      setOutline(newOutline);
    }
  };

  return (
    <div className="bg-blue-500 rounded-md p-1 flex items-center transform hover:scale-105">
      <button
        data-tooltip-id="unite-button"
        data-tooltip-content={`${
          state === CombineSectionButtonState.CombineAbove
            ? t("Combine with Section Above")
            : t("Combine with Section Below")
        }`}
        onClick={handleCombineClick}
      >
        <PiUniteFill />
      </button>
      <Tooltip id="unite-button" place="left" />
    </div>
  );
};

export default StructurerSectionCombineButton;
