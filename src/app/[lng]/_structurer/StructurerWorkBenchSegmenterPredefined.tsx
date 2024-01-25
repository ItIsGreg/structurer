import { SectionInfo, StructurerWorkBenchSegmenterProps } from "@/types";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/db";
import { toastError } from "@/toasts";
import { useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { dummyOutlineWithResources, structurerUrl } from "@/utils/constants";

const StructurerWorkBenchSegmenterPredefined = (
  props: StructurerWorkBenchSegmenterProps
) => {
  const { text, setOutline, outline, lng } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const activeAPIKey = useLiveQuery(() => {
    return db.apikeys.toArray();
  }, [])?.[0]?.key;

  const combineResponseWithRemainingText = (
    outline: SectionInfo[],
    text: string
  ): SectionInfo[] => {
    // the response from the API does only contain the sections that were found
    // I want to display the sections in the context of the whole text
    // for not found sections, I want to display them as unnamed sections
    const new_outline: SectionInfo[] = [];
    let last_end = 0;
    // sort outline
    outline.sort((a, b) => {
      return a.startIndex - b.endIndex;
    });
    let unnamedCounter = 0;
    for (const section of outline) {
      if (section.startIndex > last_end) {
        // add unnamed section
        new_outline.push({
          startIndex: last_end,
          endIndex: section.startIndex,
          key: `Unnamed section ${unnamedCounter++}`,
          text: text.substring(last_end, section.startIndex),
        });
      }
      new_outline.push(section);
      last_end = section.endIndex;
    }
    // add last unnamed section
    if (last_end < text.length) {
      new_outline.push({
        startIndex: last_end,
        endIndex: text.length,
        key: `Unnamed section ${unnamedCounter++}`,
        text: text.substring(last_end, text.length),
      });
    }

    return new_outline;
  };

  // fetch from APE
  const callApeAPI = async () => {
    try {
      console.log("callApeAPI");
      setIsLoading(true);
      const response = await fetch(
        `${structurerUrl}/structurer/text/?language=${lng}`,
        {
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
        }
      );
      if (!response.ok) {
        throw new Error("Error with APE API");
      }
      const data = await response.json();
      const outline = combineResponseWithRemainingText(data, text);
      setOutline(outline);
      console.log(data);
    } catch (error) {
      console.error(error);
      toastError("Error with APE API");
    } finally {
      setIsLoading(false);
    }
  };

  // const setDummyOutline = () => {
  //   console.log(dummyOutlineWithResources);
  //   setOutline(dummyOutlineWithResources);
  // };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="flex flex-row gap-1 text-5xl p-5 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
        onClick={callApeAPI}
        disabled={isLoading}
      >
        {isLoading ? <PuffLoader size={50} /> : "GO"}
      </button>
      {/* <button
        className="text-5xl p-5 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
        onClick={() => setDummyOutline()}
      >
        Set Dummy outline
      </button> */}
    </div>
  );
};

export default StructurerWorkBenchSegmenterPredefined;
