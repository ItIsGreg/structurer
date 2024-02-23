import React, { Fragment, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { FileUp, Flame, Loader2, SlidersHorizontal } from "lucide-react";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { SectionInfo, StructurerModes } from "@/types";
import { fetchStructureText } from "@/lib/requests";
import { useToast } from "./ui/use-toast";
import {
  cn,
  combineResponseWithRemainingText,
  sliceAnnotatedText,
} from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import FhirDisplayDialog from "./FhirDisplayDialog";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { exampleDischargeSummaryDE } from "@/utils/constants";

interface Props {
  lng: string;
  apiKey: string;
  mode: StructurerModes;
  setMode: (mode: StructurerModes) => void;
  mainText: string;
  setMainText: (text: string) => void;
  pipelineResult?: SectionInfo[];
  setPipelineResult: (result: SectionInfo[] | undefined) => void;
}

const MainDisplay = (props: Props) => {
  const {
    mode,
    setMode,
    mainText,
    setMainText,
    lng,
    apiKey,
    pipelineResult,
    setPipelineResult,
  } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showFhirDialog, setShowFhirDialog] = useState<boolean>(false);
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const [selectedResource, setSelectedResource] = useState<any | null>(null);
  const [wholeTextSections, setWholeTextSections] = useState<SectionInfo[]>([]);
  const [displaySections, setDisplaySections] = useState<
    SectionInfo[] | undefined
  >(pipelineResult);
  const { toast } = useToast();

  const onWholeTextChange = (checked: boolean) => {
    if (checked) {
      setDisplaySections(wholeTextSections);
    } else {
      setDisplaySections(pipelineResult);
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const data = await fetchStructureText(mainText, lng, apiKey);
      setMode(StructurerModes.pipelineResult);

      // sort the sections by start index
      data.sort(
        (a: SectionInfo, b: SectionInfo) => a.startIndex - b.startIndex
      );

      // create sections with the remaining text
      const wholeTextSections: SectionInfo[] = combineResponseWithRemainingText(
        data,
        mainText
      );
      setWholeTextSections(wholeTextSections);

      setPipelineResult(data);
      setDisplaySections(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error with APE API",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToInput = () => {
    setMode(StructurerModes.pipelineInput);
    setPipelineResult(undefined);
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="flex gap-4 justify-between">
        <div className="ml-4">
          <Button
            onClick={() => {
              setMainText(exampleDischargeSummaryDE);
            }}
          >
            Load Example Text
          </Button>
        </div>
        <div className="flex gap-2 justify-between">
          <Label htmlFor="whole-text" className="text-md">
            {"Whole Text"}
          </Label>
          <Switch id="whole-text" onCheckedChange={onWholeTextChange} />
        </div>
      </div>
      {mode === StructurerModes.pipelineInput && (
        <div className="flex flex-col grow h-full">
          <div className="mt-4 h-full">
            <Textarea
              className="resize-none h-full"
              placeholder={"Paste a medical text to be structured here..."}
              onChange={(e) => setMainText(e.target.value)}
              value={mainText}
              id="joyride-textarea"
            />
          </div>
          <div className="flex w-full justify-end">
            <Button
              className="mt-4 w-64"
              onClick={onSubmit}
              disabled={isLoading}
            >
              <Loader2
                size={20}
                strokeWidth={2}
                className={cn("animate-spin mr-2", {
                  hidden: !isLoading,
                })}
              />
              {"Submit"}
            </Button>
          </div>
        </div>
      )}
      {mode === StructurerModes.pipelineResult && (
        <div className="flex flex-col grow h-full">
          <div className="mt-4 h-full flex flex-col gap-4 overflow-y-auto">
            {displaySections?.map((section) => (
              <Card key={section.key} className="">
                <CardHeader className="bg-secondary p-4 rounded-t-lg">
                  <CardTitle className="text-xl font-semibold">
                    {section.key}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-row gap-4 p-0">
                  <div className="w-3/4 p-4 overflow-x-auto">
                    <h3 className="font-semibold">{"Original Text"}</h3>
                    <div className="mt-2 p-2 rounded">
                      <pre className="p-2">
                        {section.entities
                          ? sliceAnnotatedText(
                              mainText.slice(
                                section.startIndex,
                                section.endIndex
                              ),
                              section.entities
                            ).map((slice, index) => (
                              <React.Fragment key={index}>
                                <span
                                  className={cn({
                                    "bg-primary/50 p-1 rounded": slice.isMatch,
                                    "p-1": slice.isMatch,
                                    "transition bg-primary text-primary-foreground":
                                      slice.entity?.item === selectedEntity,
                                  })}
                                  style={{ display: "inline" }} // Ensure spans are inline
                                >
                                  {slice.text}
                                </span>
                              </React.Fragment>
                            ))
                          : mainText.slice(
                              section.startIndex,
                              section.endIndex
                            )}
                      </pre>
                    </div>
                  </div>
                  <div className="shrink-0 w-1/4 bg-secondary p-4">
                    <h3 className="font-semibold">{"Found Entities"}</h3>
                    <div className="mt-2">
                      {section.entities &&
                        Object.entries(section.entities).map(
                          ([key, value], index) => (
                            <ul className="flex flex-col" key={key}>
                              {value.map((entity, entityIndex) => (
                                <li
                                  key={entity.item + entityIndex} // Ensuring a unique key
                                  className="mb-2 flex items-center justify-start gap-2"
                                >
                                  <Button
                                    variant={"ghost"}
                                    className="shrink-0"
                                    size={"icon"}
                                    onClick={() => {
                                      setShowFhirDialog(true);
                                      setSelectedResource(entity.resources);
                                    }}
                                  >
                                    <Flame size={24} color="orange" />
                                  </Button>
                                  <Badge
                                    onClick={() =>
                                      setSelectedEntity(entity.item)
                                    }
                                    variant="default"
                                    className="p-2 w-full cursor-pointer"
                                  >
                                    {entity.item}
                                  </Badge>
                                </li>
                              ))}
                            </ul>
                          )
                        )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex w-full justify-end"></div>
          <Button
            className="mt-4 w-64"
            onClick={handleBackToInput}
            disabled={isLoading}
            variant={"destructive"}
          >
            <Loader2
              size={20}
              strokeWidth={2}
              className={cn("animate-spin mr-2", {
                hidden: !isLoading,
              })}
            />
            {"Back to input"}
          </Button>
        </div>
      )}
      <FhirDisplayDialog
        open={showFhirDialog}
        onOpenChange={setShowFhirDialog}
        json={selectedResource}
      />
    </div>
  );
};

export default MainDisplay;
