import { Button } from "@/components/ui/button";
import ModalWrapper from "./ModalWrapper";
import { AnnotationModeSelectModalProps } from "@/types";

const AnnotationModeSelectModal = (props: AnnotationModeSelectModalProps) => {
  const { setShowAnnotationModeSelectModal } = props;
  return (
    <ModalWrapper setShow={setShowAnnotationModeSelectModal}>
      <div>
        <Button>Entity Annotation</Button>
        <Button>Section Annotation</Button>
      </div>
    </ModalWrapper>
  );
};

export default AnnotationModeSelectModal;
