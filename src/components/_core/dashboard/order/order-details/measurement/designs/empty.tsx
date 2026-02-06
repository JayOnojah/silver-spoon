import { Button } from "@/src/components/ui/button";
import { IconPalette, IconPlus } from "@tabler/icons-react";
import React from "react";

interface EmptyProps {
  onAddDesign?: () => void;
}

const Empty = ({ onAddDesign }: EmptyProps) => {
  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-12 flex flex-col items-center justify-center text-center">
        <IconPalette className="size-12 text-primary" strokeWidth={1.5} />
      <h3 className="text-lg font-bold text-foreground mb-2">
        No Design References Added Yet!
      </h3>
      <p className="text-sm text-[#6B7280] mb-6 max-w-sm">
        Add catalogue designs to capture the customer&apos;s vision.
      </p>
      <Button
        variant="ghost"
        className="font-semibold text-primary hover:bg-primary/10 hover:text-primary rounded-xl h-10 px-4"
        onClick={onAddDesign}
      >
        <IconPlus className="size-4 mr-2" />
        Add Design
      </Button>
    </div>
  );
};

export default Empty;
