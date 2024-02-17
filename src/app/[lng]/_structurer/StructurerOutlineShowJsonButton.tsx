import { StructurerOutlineShowJsonButtonProps } from "@/types";
import { FaEye } from "react-icons/fa";

const StructurerOutlineShowJsonButton = (
  props: StructurerOutlineShowJsonButtonProps
) => {
  const { setShowJson, setOutlinePart, outlinePart } = props;

  const handleClick = () => {
    setShowJson(true);
    setOutlinePart(outlinePart);
  };
  return (
    <button
      className="rounded-md p-1 transform hover:scale-110 hover:bg-gray-700 flex-shrink-0"
      onClick={handleClick}
    >
      <FaEye />
    </button>
  );
};

export default StructurerOutlineShowJsonButton;
