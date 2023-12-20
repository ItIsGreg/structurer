import { useTranslation } from "@/app/i18n/client";
import { StructurerSectionSplitButtonProps } from "@/types";
import { LuSplitSquareVertical } from "react-icons/lu";
import { Tooltip } from "react-tooltip";

const StructurerSectionSplitButton = (
  props: StructurerSectionSplitButtonProps
) => {
  const { setShowSplitSectionModal, setSplitSection, section, lng } = props;

  const { t } = useTranslation(lng, "StructurerSectionSplitButton");

  const handleSplitClick = () => {
    setSplitSection(section);
    setShowSplitSectionModal(true);
  };

  return (
    <div className="bg-blue-500 rounded-md p-1 flex items-center transform hover:scale-105">
      <button
        data-tooltip-id="unite-button"
        data-tooltip-content={t("Split Section")}
        onClick={handleSplitClick}
      >
        <LuSplitSquareVertical />
      </button>
      <Tooltip id="unite-button" place="left" />
    </div>
  );
};

export default StructurerSectionSplitButton;
