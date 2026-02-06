"use client";

import { useState } from "react";
import { IconCloudUpload, IconPlus } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { cn } from "@/lib/utils";

export type AddMoodboardSource = "existing" | "new";

interface AddNewMoodboardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect?: (source: AddMoodboardSource) => void;
}

const SOURCE_OPTIONS: {
  id: AddMoodboardSource;
  title: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "existing",
    title: "From Existing Designs",
    description: "Upload your own pre-designed moodboard image",
    icon: <IconCloudUpload className="size-10 text-primary" />,
  },
  {
    id: "new",
    title: "Create New",
    description: "Build a new moodboard from scratch",
    icon: <IconPlus className="size-10 text-primary" />,
  },
];

const AddNewMoodboard = ({
  open,
  onOpenChange,
  onSelect,
}: AddNewMoodboardProps) => {
  const [selected, setSelected] = useState<AddMoodboardSource | null>(null);

  const handleContinue = () => {
    if (selected) {
      onSelect?.(selected);
      onOpenChange(false);
      setSelected(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-150">
        <DialogHeader>
          <DialogTitle className="text-left font-bold text-foreground">
            Add Moodboard
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <Label className="text-sm font-semibold text-[#4B5565]">
            Choose Source <span className="text-[#EF4444]">*</span>
          </Label>

          <div className="grid grid-cols-2 gap-4">
            {SOURCE_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelected(option.id)}
                className={cn(
                  "flex flex-col items-center text-center p-4 rounded-xl border-2 transition-colors",
                  selected === option.id
                    ? "border-primary bg-[#FFF1EC]/50"
                    : "border-[#E5E7EB] bg-white hover:border-[#CDD5DF]",
                )}
              >
                <span className="mb-3">{option.icon}</span>
                <span className="text-sm font-bold text-foreground block">
                  {option.title}
                </span>
                <span className="text-xs text-[#6B7280] mt-1 block">
                  {option.description}
                </span>
              </button>
            ))}
          </div>

          <Button
            onClick={handleContinue}
            disabled={!selected}
            className="w-full h-11 rounded-lg font-semibold bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewMoodboard;
