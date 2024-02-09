"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const IndexPage = () => {
  return (
    <div>
      <div className="h-full w-full gap-2 p-6">
        <Textarea
          placeholder="Paste your medical text."
          className="flex-1 resize-none h-5/6"
        />
        <Button className="w-full mt-2">Analyze</Button>
      </div>
    </div>
  );
};

export default IndexPage;
