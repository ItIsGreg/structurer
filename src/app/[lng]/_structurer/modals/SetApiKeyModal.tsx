import { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { toastError } from "@/toasts";
import { db } from "@/db/db";
import { SetApiKeyModalProps } from "@/types";

const SetApiKeyModal = (props: SetApiKeyModalProps) => {
  const [content, setContent] = useState<string>("");
  const { setShowSetApiKeyModal } = props;
  const handleAdd = () => {
    if (content === "") {
      toastError("Please enter a key");
      return;
    }
    try {
      db.apikeys.clear();
      db.apikeys.add({ key: content });
      setShowSetApiKeyModal(false);
    } catch (error) {
      toastError("There was an error adding the key");
    }
  };

  return (
    <ModalWrapper setShow={setShowSetApiKeyModal}>
      <div className="flex gap-2">
        <input
          type="text"
          onChange={(e) => setContent(e.target.value)}
          className="w-3/4"
        />
        <button
          className="bg-blue-500 rounded-md p-1 transform hover:scale-105"
          onClick={() => handleAdd()}
        >
          Add
        </button>
      </div>
    </ModalWrapper>
  );
};

export default SetApiKeyModal;
