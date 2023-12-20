import { useTranslation } from "@/app/i18n/client";
import { StructurerSectionRenameButtonProps } from "@/types";
import { AiOutlineEdit } from "react-icons/ai";
import { Tooltip } from "react-tooltip";

const StructurerSectionRenameButton = (
  props: StructurerSectionRenameButtonProps
) => {
  const { setShowSectionRenameModal, setRenameSection, section, lng } = props;

  const { t } = useTranslation(lng, "StructurerSectionRenameButton");
  return (
    <div
      data-tooltip-content={t("Rename section")}
      data-tooltip-id="rename-section"
      className="flex flex-row justify-center items-center gap-2 bg-blue-500 rounded-md px-1 transform hover:scale-105"
    >
      <button
        onClick={() => {
          setRenameSection(section);
          setShowSectionRenameModal(true);
        }}
      >
        <AiOutlineEdit />
      </button>
      <Tooltip id="rename-section" place="right" />
    </div>
  );
};

export default StructurerSectionRenameButton;
