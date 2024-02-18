import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  json: any;
}

const FhirDisplayDialog = (props: Props) => {
  // PROPS
  const { open, onOpenChange, json } = props;
  // FETCH
  // STATE
  // EFFECTS
  // HANDLER

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-auto min-w-[60vw]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <JsonView
          src={json}
          displaySize={"expanded"}
          className="h-[60vh] overflow-y-auto"
          theme="atom"
        />
      </DialogContent>
    </Dialog>
  );
};

export default FhirDisplayDialog;
