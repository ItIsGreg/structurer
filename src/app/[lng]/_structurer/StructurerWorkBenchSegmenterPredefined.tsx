import { StructurerWorkBenchSegmenterProps } from "@/types";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/db";
import { toastError } from "@/toasts";
import { useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { dummyOutlineWithResources } from "@/utils/constants";

const StructurerWorkBenchSegmenterPredefined = (
  props: StructurerWorkBenchSegmenterProps
) => {
  const { text, setOutline, outline } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const activeAPIKey = useLiveQuery(() => {
    return db.apikeys.toArray();
  }, [])?.[0]?.key;

  const setOutlineFromResponse = (response: any) => {
    setOutline(response);
  };

  // fetch from APE
  const callApeAPI = async () => {
    try {
      console.log("callApeAPI");
      setIsLoading(true);
      const response = await fetch(`http://localhost:8002/structurer/text/`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          patient_id: "123",
          api_key: activeAPIKey,
        }),
      });
      if (!response.ok) {
        throw new Error("Error with APE API");
      }
      const data = await response.json();
      setOutline(data);
      // setOutlineFromResponse(response);
      console.log(data);
    } catch (error) {
      console.error(error);
      toastError("Error with APE API");
    } finally {
      setIsLoading(false);
    }
  };

  const setAskedForOutline = (data: Any) => {
    for (const section of data) {
      section.askedFor = true;
    }
  };

  const setDummyOutline = () => {
    console.log(dummyOutlineWithResources);
    // setAskedForOutline(dummyOutlineWithResources);
    setOutline(dummyOutlineWithResources);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="text-5xl p-5 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
        onClick={callApeAPI}
      >
        GO
        {isLoading && <PuffLoader size={20} />}
      </button>
      <button
        className="text-5xl p-5 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
        onClick={() => setDummyOutline()}
      >
        Set Dummy outline
      </button>
    </div>
  );
};

export default StructurerWorkBenchSegmenterPredefined;
