import { db } from "@/db/db";
import { useLiveQuery } from "dexie-react-hooks";
import SetApiKeyModal from "./SetApiKeyModal";
import { useState } from "react";
import { toastError } from "@/toasts";

const ApiKeyAdmin = () => {
  const apiKeys = useLiveQuery(() => db.apikeys.toArray(), []);
  const [showApiKeyModal, setShowApiKeyModal] = useState<boolean>(false);

  const handleClear = () => {
    try {
      db.apikeys.clear();
    } catch (error) {
      toastError("There was an error clearing the key");
    }
  };

  return (
    <div className="flex flex-col gap-1 items-center">
      {showApiKeyModal && (
        <SetApiKeyModal setShowSetApiKeyModal={setShowApiKeyModal} />
      )}
      <h1 className="text-center">API Key</h1>
      <ul>
        {apiKeys?.map((apiKey) => (
          <li key={apiKey.id}>
            <span className="bg-gray-400 rounded-md p-1">
              {apiKey.key.slice(0, 4)} ...{" "}
              {apiKey.key.slice(apiKey.key.length - 4, apiKey.key.length)}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex flex-row gap-1">
        <button
          className="bg-blue-500 p-1 rounded-md transform hover:scale-105"
          onClick={() => setShowApiKeyModal(true)}
        >
          Set Api Key
        </button>
        <button
          onClick={() => handleClear()}
          className="bg-blue-500 p-1 rounded-md transform hover:scale-105"
        >
          Clear API Key
        </button>
      </div>
    </div>
  );
};

export default ApiKeyAdmin;
