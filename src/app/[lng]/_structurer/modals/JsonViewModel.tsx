import { JsonViewModalProps } from "@/types";
import ModalWrapper from "./ModalWrapper";
import JsonView from "react18-json-view";

const JsonViewModal = (props: JsonViewModalProps) => {
  const { outlinePart, setShowJson } = props;
  return (
    <ModalWrapper setShow={setShowJson}>
      <JsonView src={outlinePart} />
    </ModalWrapper>
  );
};

export default JsonViewModal;
