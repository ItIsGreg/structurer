"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface StructurerProps {
  params: {
    lng: string;
  };
}

const IndexPage = (props: StructurerProps) => {
  return (
    <div className="h-full">
      <div className="h-full grid w-1/2 gap-2">
        <Textarea placeholder="Type your message here." className="h-full" />
        <Button>Send message</Button>
      </div>
    </div>
  );
};

export default IndexPage;
