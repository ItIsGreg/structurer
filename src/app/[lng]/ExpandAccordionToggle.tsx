import React from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

interface ExpandAccordinoToggleProps {
  isOpen: boolean;
  onClick?: () => void;
  size?: number;
}

const ExpandAccordionToggle = (props: ExpandAccordinoToggleProps) => {
  return (
    <>
      {props.isOpen ? (
        <MdExpandLess
          size={props.size || 20}
          className="cursor-pointer shrink-0"
          onClick={props.onClick}
        />
      ) : (
        <MdExpandMore
          size={props.size || 20}
          className="cursor-pointer shrink-0"
          onClick={props.onClick}
        />
      )}
    </>
  );
};

export default ExpandAccordionToggle;
