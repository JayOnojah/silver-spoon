"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { IconPlus } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { BinSvg } from "../../../svg";

export interface CostEntry {
  id: string;
  costTitle: string;
  description: string;
  amount: string;
  date: Date;
}

interface CostBlock {
  id: string;
  costTitle: string;
  description: string;
  amount: string;
  date: Date | undefined;
}

interface AddCostProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (costs: CostEntry[]) => void;
}

const createEmptyBlock = (): CostBlock => ({
  id: crypto.randomUUID(),
  costTitle: "",
  description: "",
  amount: "",
  date: undefined,
});

const CalendarIcon = () => (
  <svg
    className="mr-2 size-4 text-[#9AA4B2]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const AddCost = ({ open, onOpenChange, onSubmit }: AddCostProps) => {
  const [blocks, setBlocks] = useState<CostBlock[]>(() => [createEmptyBlock()]);

  useEffect(() => {
    if (!open) {
      setBlocks([createEmptyBlock()]);
    }
  }, [open]);

  const updateBlock = (
    id: string,
    field: keyof CostBlock,
    value: string | Date | undefined,
  ) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [field]: value } : b)),
    );
  };

  const addBlock = () => {
    setBlocks((prev) => [...prev, createEmptyBlock()]);
  };

  const removeBlock = (id: string) => {
    setBlocks((prev) =>
      prev.length > 1 ? prev.filter((b) => b.id !== id) : prev,
    );
  };

  const getValidEntries = (): CostEntry[] => {
    return blocks
      .filter((b) => b.costTitle.trim() && b.amount.trim() && b.date)
      .map((b) => ({
        id: b.id,
        costTitle: b.costTitle.trim(),
        description: b.description.trim(),
        amount: b.amount.trim(),
        date: b.date!,
      }));
  };

  const handleSubmit = () => {
    const valid = getValidEntries();
    if (valid.length > 0) {
      onSubmit?.(valid);
    }
    onOpenChange(false);
    setBlocks([createEmptyBlock()]);
  };

  const validCount = getValidEntries().length;
  const canSubmit = validCount > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-left font-black text-[#121926]">
            Add New Cost
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {blocks.map((block) => (
            <div
              key={block.id}
              className="relative space-y-4 p-4 border border-[#E5E7EB] rounded-xl"
            >
              {blocks.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeBlock(block.id)}
                  className="absolute top-3 right-3 text-[#9AA4B2] hover:text-foreground p-1"
                  aria-label="Remove cost"
                >
                  <BinSvg />
                </button>
              )}

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#4B5565]">
                  Cost Title <span className="text-[#EF4444]">*</span>
                </Label>
                <Input
                  placeholder="e.g., Sleeve_lenght"
                  value={block.costTitle}
                  onChange={(e) =>
                    updateBlock(block.id, "costTitle", e.target.value)
                  }
                  className="h-10 rounded-lg border-[#CDD5DF]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#4B5565]">
                  Description (Optional)
                </Label>
                <Textarea
                  placeholder="Enter Short Description..."
                  value={block.description}
                  onChange={(e) =>
                    updateBlock(block.id, "description", e.target.value)
                  }
                  className="min-h-20 rounded-lg border-[#CDD5DF] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-[#4B5565]">
                    Amount <span className="text-[#EF4444]">*</span>
                  </Label>
                  <Input
                    placeholder="Enter Amount"
                    value={block.amount}
                    onChange={(e) =>
                      updateBlock(block.id, "amount", e.target.value)
                    }
                    className="h-10 rounded-lg border-[#CDD5DF]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-[#4B5565]">
                    Date <span className="text-[#EF4444]">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-10 rounded-lg justify-start text-left font-normal border-[#CDD5DF]",
                          !block.date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon />
                        {block.date ? format(block.date, "PPP") : "Select"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={block.date}
                        onSelect={(d) => updateBlock(block.id, "date", d)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addBlock}
          className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <IconPlus className="size-4" />
          Add Another Cost
        </button>

        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="mt-6 w-full h-11 rounded-lg font-semibold bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
        >
          Add Expense{validCount > 0 ? ` (${validCount})` : ""}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddCost;
