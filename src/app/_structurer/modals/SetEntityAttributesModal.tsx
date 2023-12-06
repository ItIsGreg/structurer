import { SetEntityAttributesModalProps } from "@/types";
import ModalWrapper from "./ModalWrapper";
import CategorySelector from "../CategorySelector";
import InputSelection from "../InputSelection";
import DisplayCategoriesBasic from "../DisplayCategoriesBasic";

const SetEntityAttributesModal = (props: SetEntityAttributesModalProps) => {
  const {
    setShowSetEntityAttributesModal,
    entityAttributes,
    setEntityAttributes,
    entity,
  } = props;
  return (
    <div>
      <ModalWrapper setShow={setShowSetEntityAttributesModal}>
        <CategorySelector
          selectedCategories={entityAttributes[entity]}
          setSelectedCategories={(selectedCategories) =>
            setEntityAttributes({
              ...entityAttributes,
              [entity]: selectedCategories,
            })
          }
          placeholder="Select Attributes"
          InputComponent={InputSelection}
          DisplayComponent={DisplayCategoriesBasic}
          fetchCategories={() => Promise.resolve(["attribute1", "attribute2"])}
          onSelectCategory={() => {}}
          setFocusedCategory={() => {}}
          setColors={() => {}}
        />
      </ModalWrapper>
    </div>
  );
};

export default SetEntityAttributesModal;
