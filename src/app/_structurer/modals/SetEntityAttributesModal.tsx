import { SetEntityAttributesModalProps } from "@/types";
import ModalWrapper from "./ModalWrapper";
import CategorySelector from "../CategorySelector";
import InputSelection from "../InputSelection";
import DisplayCategoriesBasic from "../DisplayCategoriesBasic";
import {
  ConditionAttributes,
  ResourceTypeAttributeOptions,
  defaultResourceTypeAttributes,
} from "@/utils/constants";

const SetEntityAttributesModal = (props: SetEntityAttributesModalProps) => {
  const {
    setShowSetEntityAttributesModal,
    entityAttributes,
    setEntityAttributes,
    entity,
  } = props;
  return (
    <ModalWrapper setShow={setShowSetEntityAttributesModal}>
      <div className="flex flex-col gap-2">
        <CategorySelector
          selectedCategories={entityAttributes[entity]}
          setSelectedCategories={(selectedCategories: string[]) =>
            setEntityAttributes({
              ...entityAttributes,
              [entity]: [...selectedCategories],
            })
          }
          placeholder="Select Attributes"
          InputComponent={InputSelection}
          DisplayComponent={DisplayCategoriesBasic}
          fetchCategories={() =>
            Promise.resolve(ResourceTypeAttributeOptions[entity])
          }
          onSelectCategory={(category: string) => {
            setEntityAttributes({
              ...entityAttributes,
              [entity]: [...entityAttributes[entity], category],
            });
          }}
          setFocusedCategory={() => {}}
          setColors={() => {}}
        />
        <button
          className="bg-blue-500 rounded-md transform hover:bg-blue-600 p-2"
          onClick={() => {
            setEntityAttributes({
              ...entityAttributes,
              [entity]: defaultResourceTypeAttributes[entity],
            });
          }}
        >
          Default
        </button>
      </div>
    </ModalWrapper>
  );
};

export default SetEntityAttributesModal;
