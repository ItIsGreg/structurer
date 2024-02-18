import React, { Fragment, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { FileUp, Flame, Loader2 } from "lucide-react";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { t } from "i18next";
import { SectionInfo, StructurerModes } from "@/types";
import { fetchStructureText } from "@/lib/requests";
import { useToast } from "./ui/use-toast";
import { cn, sliceAnnotatedText } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import FhirDisplayDialog from "./FhirDisplayDialog";
import { flatMap } from "lodash";

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
  const { toast } = useToast();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const data = await fetchStructureText(mainText, lng, apiKey);
      setMode(StructurerModes.pipelineResult);
      setPipelineResult(data);
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
    <div className="flex flex-col h-full grow">
      <div className="flex">
        <Tabs defaultValue="pipeline" className="">
          <TabsList>
            <TabsTrigger
              value="pipeline"
              onClick={() => setMode(StructurerModes.pipelineInput)}
            >
              APE Pipeline
            </TabsTrigger>
            <TabsTrigger
              disabled
              value="annotator"
              onClick={() => setMode(StructurerModes.labelText)}
            >
              Annotator
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="ml-4">
          <Select>
            <SelectTrigger className="w-64">
              <SelectValue placeholder={t("Load an example text...")} />
            </SelectTrigger>
            <SelectContent></SelectContent>
          </Select>
        </div>
        <Button variant={"ghost"} className="ml-2">
          <FileUp strokeWidth={1} />
        </Button>
      </div>
      {mode === StructurerModes.pipelineInput && (
        <Fragment>
          <div className="mt-4 grow">
            <Textarea
              className="resize-none h-full"
              placeholder={t("Paste a medical text to be structured here...")}
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
              {t("Submit")}
            </Button>
          </div>
        </Fragment>
      )}
      {mode === StructurerModes.pipelineResult && (
        <Fragment>
          <div className="mt-4 h-full flex flex-col gap-4 overflow-y-auto">
            {pipelineResult?.map((section) => (
              <Card key={section.key} className="">
                <CardHeader className="bg-secondary p-4 rounded-t-lg">
                  <CardTitle className="text-xl font-semibold">
                    {section.key}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-row gap-4 p-0">
                  <div className="w-3/4 p-4 overflow-x-auto">
                    <h3 className="font-semibold">{t("Original Text")}</h3>
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
                    <h3 className="font-semibold">{t("Found Entities")}</h3>
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
          <div className="flex w-full justify-end">
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
              {t("Back to input")}
            </Button>
          </div>
        </Fragment>
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
