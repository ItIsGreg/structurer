import { useTranslation } from "@/app/i18n/client";
import { IoChevronBackCircleSharp } from "react-icons/io5";

export interface ChangeTextButtonProps {
  onClick: () => void;
  lng: string;
}

const ChangeTextButton = (props: ChangeTextButtonProps) => {
  const { lng, onClick } = props;

  const { t } = useTranslation(lng, "ChangeTextButton");

  return (
    <button
      className="flex flex-row bg-blue-500 text-white rounded-md transform hover:bg-blue-700 p-2 justify-center items-center"
      onClick={onClick}
    >
      <IoChevronBackCircleSharp size={24} />
      {t("Change Text")}
    </button>
  );
};

export default ChangeTextButton;
