import { Button } from "@/components/ui/button";
import { SectionInfo } from "@/types";
import { splitFilename } from "@/utils/structurerUtils";
import { useRef, useState } from "react";

interface CaseSectionMapping {
  case: string;
  sections: SectionInfo[];
}

interface PredGtMapping {
  case: string;
  pred: SectionInfo[];
  gt: SectionInfo[];
}

const StructurerLLMVerificationUpsetter = () => {
  const [gtSections, setGtSections] = useState<CaseSectionMapping[]>([]);
  const [predSections, setPredSections] = useState<CaseSectionMapping[]>([]);
  const [matchedGtAndPred, setMatchedGtAndPred] = useState<PredGtMapping[]>([]);

  const predUploadRef = useRef<HTMLInputElement>(null);
  const gtUploadRef = useRef<HTMLInputElement>(null);

  const matchPredAndGt = () => {
    const localMatchedGtAndPred: PredGtMapping[] = [];
    for (const gt of gtSections) {
      const correspondingPred = predSections.filter((pred) => {
        return pred.case === gt.case;
      });
      if (correspondingPred.length > 0) {
        // add text to pred
        correspondingPred[0].sections[0].text = gt.sections[0].text;

        const entry: PredGtMapping = {
          case: gt.case,
          pred: correspondingPred[0].sections,
          gt: gt.sections,
        };
        localMatchedGtAndPred.push(entry);
      }
    }
    setMatchedGtAndPred(localMatchedGtAndPred);
  };

  const handleMultSectionUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    gt: Boolean
  ) => {
    const files = e.target.files;
    if (files) {
      const fileReadPromises: Promise<{ name: string; data: any }>[] =
        Array.from(files).map((file) => {
          return new Promise<{ name: string; data: any }>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
              if (e.target?.result) {
                try {
                  const jsonData = JSON.parse(e.target.result as string);
                  resolve({ name: file.name, data: jsonData });
                } catch (error) {
                  console.error(
                    "Error parsing JSON from file:",
                    file.name,
                    error
                  );
                  resolve({ name: file.name, data: {} });
                }
              }
            };
            reader.readAsText(file);
          });
        });
      Promise.all(fileReadPromises).then((results) => {
        const caseSectionMappings: CaseSectionMapping[] = results.map(
          ({ name, data }) => {
            return {
              case: name,
              sections: data as SectionInfo[],
            };
          }
        );
        if (gt) {
          setGtSections(caseSectionMappings);
        } else {
          setPredSections(caseSectionMappings);
        }
      });
    }
  };

  const handleUploadGtClick = () => {
    gtUploadRef.current?.click();
  };
  const handleUploadPredClick = () => {
    predUploadRef.current?.click();
  };

  return (
    <div className="flex flex-col">
      <input
        type="file"
        multiple
        name="gtupload"
        className="hidden"
        ref={gtUploadRef}
        onChange={(e) => handleMultSectionUpload(e, true)}
      />

      <Button
        variant={"secondary"}
        className="border rounded-md"
        onClick={handleUploadGtClick}
      >
        GTs
      </Button>
      <input
        type="file"
        multiple
        name="predupload"
        className="hidden"
        ref={predUploadRef}
        onChange={(e) => handleMultSectionUpload(e, false)}
      />
      <Button
        variant={"secondary"}
        className="border rounded-md"
        onClick={handleUploadPredClick}
      >
        Preds
      </Button>
      <Button
        variant={"secondary"}
        className="border rounded-md"
        onClick={matchPredAndGt}
      >
        Match Preds and Gts
      </Button>
      <div className="flex flex-row">
        <div className="flex flex-col flex-wrap">
          {gtSections.map((section) => {
            return <div key={section.case}>{section.case}</div>;
          })}
        </div>
        <div className="flex flex-col">
          {predSections.map((section) => {
            return <div key={section.case}>{section.case}</div>;
          })}
        </div>
        <div className="flex flex-col">
          {matchedGtAndPred.map((section) => {
            return <div key={section.case}>{section.case}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default StructurerLLMVerificationUpsetter;
