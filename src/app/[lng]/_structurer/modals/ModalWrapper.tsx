import React from "react";

interface ModalWrapperProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  height?: string;
  size?: "sm" | "md" | "lg";
}

const ModalWrapper = (props: ModalWrapperProps) => {
  return (
    <div
      className="fixed flex justify-center items-center top-0 left-0 bg-black bg-opacity-40 w-screen h-screen z-50 overflow-scroll"
      onClick={() => {
        props.setShow(false);
      }}
    >
      <div
        className={`bg-white rounded-xl p-4 max-h-[80vh] overflow-y-auto ${
          props.height ? props.height : "auto"
        } ${
          props.size == "sm" ? "w-1/4" : props.size == "md" ? "w-1/3" : "w-1/2"
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default ModalWrapper;
