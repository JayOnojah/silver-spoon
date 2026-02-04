"use client";

import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { DUMMY_REFERENCE_DESIGNS } from "./dummy-data";

export type { ReferenceDesign } from "./dummy-data";

interface FilledDesignProps {
  designs?: import("./dummy-data").ReferenceDesign[];
  onAddDesign?: () => void;
  onRemoveDesign?: (id: string) => void;
}

const FilledDesign = ({
  designs = DUMMY_REFERENCE_DESIGNS,
  onAddDesign,
  onRemoveDesign,
}: FilledDesignProps) => {
  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-foreground">Reference Designs</h3>
        <Button
          variant="ghost"
          className="font-semibold text-primary hover:bg-primary/10 hover:text-primary rounded-xl h-10 px-4"
          onClick={onAddDesign}
        >
          <IconPlus className="size-4 mr-2" />
          Add Design
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {designs.map((design) => (
          <div
            key={design.id}
            className="relative aspect-square rounded border border-[#CDD5DF] overflow-hidden bg-[#F9FAFB] group"
          >
            <Image
              src={design.imageUrl}
              alt={design.alt ?? "Reference design"}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            />
            <button
              type="button"
              onClick={() => onRemoveDesign?.(design.id)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[#1F181880] hover:bg-[#9AA4B2] flex items-center justify-center text-white transition-colors shadow-sm"
              aria-label="Remove design"
            >
              <IconTrash className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilledDesign;
