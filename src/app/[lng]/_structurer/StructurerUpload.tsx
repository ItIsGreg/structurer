import { useTranslation } from "@/app/i18n/client";
import { toastError } from "@/toasts";
import {
  SectionInfo,
  StructurerModes,
  StructurerUploadProps,
  TextExtractionApiEndpoints,
} from "@/types";
import { awsUrl } from "@/utils/constants";
import { isValidSectionInfoArray } from "@/utils/structurerUtils";
import { useRef, useState } from "react";
import { GrDocumentPdf, GrScan } from "react-icons/gr";
import { TiUpload } from "react-icons/ti";

interface JsonData {
  [key: string]: any; // Use a more specific type if you know the structure of your JSON
}

const StructurerUpload = (props: StructurerUploadProps) => {
  const { setText, lng, setOutline, setMode } = props;

  const [textExtractionLoading, setTextExtractionLoading] = useState(false);
  const { t } = useTranslation(lng, "StructurerUpload");

  const pdfInputRef = useRef<HTMLInputElement>(null);
  const scanInputRef = useRef<HTMLInputElement>(null);
  const outlineUploadRef = useRef<HTMLInputElement>(null);

  const handlePdfExtractClick = () => {
    pdfInputRef.current?.click();
  };

  const handleScanExtractClick = () => {
    scanInputRef.current?.click();
  };

  const handleUploadOutlineClick = () => {
    outlineUploadRef.current?.click();
  };

  const correctFileType = (
    file: File,
    apiEndpoint: TextExtractionApiEndpoints
  ): boolean => {
    if (apiEndpoint === TextExtractionApiEndpoints.extractPDFText) {
      return file.type === "application/pdf";
    } else if (apiEndpoint === TextExtractionApiEndpoints.extractScanText) {
      return file.type === "image/png" || file.type === "image/jpeg";
    } else return false;
  };

  const handleOutlineUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const text = e.target?.result;
        const json = JSON.parse(text as string);
        if (isValidSectionInfoArray(json)) {
          setOutline(json as SectionInfo[]);
        } else {
          toastError(
            t("The File provided does not conform to the Section DataFormat")
          );
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };
    reader.readAsText(file);
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    apiEndpoint: TextExtractionApiEndpoints
  ) => {
    setTextExtractionLoading(true);
    const file = e.target.files?.[0];
    if (file && correctFileType(file, apiEndpoint)) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch(`${awsUrl}/parse_input/${apiEndpoint}/`, {
          // const response = await fetch(`${awsUrl}/parse_input/${apiEndpoint}/`, {
          method: "POST",
          body: formData,
          mode: "cors",
        });
        if (!response.ok) {
          throw new Error("Error extracting text");
        }
        const data = await response.json();
        if (data.text) {
          setText(data.text);
        } else {
          throw new Error("Error extracting text");
        }
      } catch (error) {
        toastError("Error extracting text");
      } finally {
        setTextExtractionLoading(false);
      }
      if (e.target.files) {
        e.target.value = "";
      }
    } else {
      toastError("Invalid file type");
    }
  };

  return (
    <div className="flex flex-row gap-2 m-2">
      <input
        type="file"
        name="pdfupload"
        id=""
        className="hidden"
        onChange={(e) => {
          handleFileChange(e, TextExtractionApiEndpoints.extractPDFText);
        }}
        ref={pdfInputRef}
      />
      <button
        className={`${
          textExtractionLoading ? "bg-gray-500" : "bg-blue-500"
        } rounded-md flex flex-row gap-1 items-center p-1 transform hover:scale-105`}
        onClick={() => handlePdfExtractClick()}
        id="joyride-extract-text-pdf" // Used for testing, REMOVE
      >
        <GrDocumentPdf size={20} />
        {t("Extract Text from PDF")}
        <TiUpload size={20} />
      </button>
      <input
        type="file"
        name="scanupload"
        className="hidden"
        ref={scanInputRef}
        onChange={(e) => {
          handleFileChange(e, TextExtractionApiEndpoints.extractScanText);
        }}
      />
      <button
        className={`${
          textExtractionLoading ? "bg-gray-500" : "bg-blue-500"
        } rounded-md flex flex-row gap-1 items-center p-1 transform hover:scale-105`}
        onClick={() => handleScanExtractClick()}
        id="scan-upload-button" // Used for testing, REMOVE
      >
        <GrScan size={20} />
        {t("Extract Text from Scan")}
        <TiUpload size={20} />
      </button>
      <input
        type="file"
        name="outlineUpload"
        id=""
        className="hidden"
        ref={outlineUploadRef}
        onChange={(e) => {
          handleOutlineUpload(e);
        }}
      />
      <button
        className="bg-blue-500 rounded-md flex flex-row gap-1 items-center p-1 transform hover:scale-105"
        onClick={async () => handleUploadOutlineClick()}
      >
        {t("Upload Sections")}
        <TiUpload size={20} />
      </button>
    </div>
  );
};

export default StructurerUpload;
