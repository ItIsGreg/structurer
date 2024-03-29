import { StructurerSectionRenameModalProps } from "@/types";
import { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { useTranslation } from "@/app/i18n/client";

const StructurerSectionRenameModal = (
  props: StructurerSectionRenameModalProps
) => {
  const {
    setShowSectionRenameModal,
    setRenameSection,
    renameSection,
    setOutline,
    outline,
    lng,
  } = props;

  const [newKey, setNewKey] = useState<string>(renameSection.key);

  const { t } = useTranslation(lng, "StructurerSectionRenameModal");

  const handleRenameClick = () => {
    if (renameSection && newKey && outline) {
      const newOutline = outline.map((section) => {
        if (section.key === renameSection.key) {
          return {
            ...section,
            key: newKey,
          };
        } else {
          return section;
        }
      });
      setOutline(newOutline);
    }
    setShowSectionRenameModal(false);
    setRenameSection(undefined);
  };

  return (
    <ModalWrapper setShow={setShowSectionRenameModal}>
      <div className="flex gap-2 justify-center">
        <input
          type="text"
          placeholder={renameSection.key}
          onChange={(e) => setNewKey(e.target.value)}
          className="rounded-md p-1"
        />
        <button
          onClick={handleRenameClick}
          className="bg-blue-500 rounded-md p-1"
        >
          {t("Rename")}
        </button>
      </div>
    </ModalWrapper>
  );
};

export default StructurerSectionRenameModal;
