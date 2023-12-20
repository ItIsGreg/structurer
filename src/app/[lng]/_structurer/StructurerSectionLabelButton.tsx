import { useTranslation } from "@/app/i18n/client";
import { StructurerSectionLabelButtonProps } from "@/types";
import { LiaMarkerSolid } from "react-icons/lia";
import { Tooltip } from "react-tooltip";

const StructurerSectionLabelButton = (
  props: StructurerSectionLabelButtonProps
) => {
  const { focusedSection, section, setFocusedSection, lng } = props;

  const { t } = useTranslation(lng, "StructurerSectionLabelButton");

  return (
    <div
      data-tooltip-content={t("Label this section")}
      data-tooltip-id="label-tooltip"
    >
      <button
        className={`${
          focusedSection?.key === section.key ? "bg-gray-500" : "bg-blue-500"
        } text-right rounded-md p-1 transform hover:scale-105`}
        onClick={() => setFocusedSection(section)}
      >
        <LiaMarkerSolid />
      </button>
      <Tooltip id="label-tooltip" place="left" />
    </div>
  );
};

export default StructurerSectionLabelButton;
