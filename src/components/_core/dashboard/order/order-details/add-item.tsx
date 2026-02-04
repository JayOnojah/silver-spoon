"use client";

import { useState, useEffect, useMemo } from "react";
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
import { BinSvg } from "../svg";

export interface OrderItemEntry {
  id: string;
  itemTitle: string;
  description: string;
  quantity: string;
  unitPrice: string;
}

interface ItemBlock {
  id: string;
  itemTitle: string;
  description: string;
  quantity: string;
  unitPrice: string;
}

interface AddItemProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (items: OrderItemEntry[]) => void;
}

const createEmptyBlock = (): ItemBlock => ({
  id: crypto.randomUUID(),
  itemTitle: "",
  description: "",
  quantity: "",
  unitPrice: "",
});

const parseNumber = (value: string): number => {
  const n = Number(String(value).replace(/[^\d.]/g, ""));
  return Number.isNaN(n) ? 0 : n;
};

const formatNaira = (value: number) =>
  `₦${value.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const AddItem = ({ open, onOpenChange, onSubmit }: AddItemProps) => {
  const [blocks, setBlocks] = useState<ItemBlock[]>(() => [createEmptyBlock()]);

  useEffect(() => {
    if (!open) {
      setBlocks([createEmptyBlock()]);
    }
  }, [open]);

  const updateBlock = (id: string, field: keyof ItemBlock, value: string) => {
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

  const { subtotal, total } = useMemo(() => {
    const sum = blocks.reduce((acc, b) => {
      const qty = parseNumber(b.quantity);
      const price = parseNumber(b.unitPrice);
      return acc + qty * price;
    }, 0);
    return { subtotal: sum, total: sum };
  }, [blocks]);

  const getValidEntries = (): OrderItemEntry[] => {
    return blocks
      .filter(
        (b) =>
          b.itemTitle.trim() &&
          b.description.trim() &&
          b.quantity.trim() &&
          b.unitPrice.trim(),
      )
      .map((b) => ({
        id: b.id,
        itemTitle: b.itemTitle.trim(),
        description: b.description.trim(),
        quantity: b.quantity.trim(),
        unitPrice: b.unitPrice.trim(),
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
      <DialogContent className="sm:max-w-120 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-left font-black text-[#121926]">
            Add Item(s)
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#4B5565]">
              Order Items
            </h3>
            <button
              type="button"
              onClick={addBlock}
              className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <IconPlus className="size-4" />
              Add Another Item
            </button>
          </div>

          {blocks.map((block, index) => (
            <div
              key={block.id}
              className="relative space-y-4 p-4 border border-[#E5E7EB] rounded-xl"
            >
              {blocks.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeBlock(block.id)}
                  className="absolute top-3 right-3 text-[#9AA4B2] hover:text-foreground p-1"
                  aria-label="Remove item"
                >
                  <BinSvg />
                </button>
              )}

              <p className="text-xs font-semibold text-[#9AA4B2]">
                Item {index + 1}
              </p>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#4B5565]">
                  Item Title <span className="text-[#EF4444]">*</span>
                </Label>
                <Input
                  placeholder="Enter Item Title"
                  value={block.itemTitle}
                  onChange={(e) =>
                    updateBlock(block.id, "itemTitle", e.target.value)
                  }
                  className="h-10 rounded-lg border-[#CDD5DF]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#4B5565]">
                  Description <span className="text-[#EF4444]">*</span>
                </Label>
                <Textarea
                  placeholder="Type here..."
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
                    Quantity <span className="text-[#EF4444]">*</span>
                  </Label>
                  <Input
                    placeholder="Enter Quantity"
                    value={block.quantity}
                    onChange={(e) =>
                      updateBlock(block.id, "quantity", e.target.value)
                    }
                    className="h-10 rounded-lg border-[#CDD5DF]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-[#4B5565]">
                    Unit Price <span className="text-[#EF4444]">*</span>
                  </Label>
                  <Input
                    placeholder="Enter Amount"
                    value={block.unitPrice}
                    onChange={(e) =>
                      updateBlock(block.id, "unitPrice", e.target.value)
                    }
                    className="h-10 rounded-lg border-[#CDD5DF]"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="space-y-2 bg-[#FBFBFD] border rounded-xl border-[#E5E7EB] p-4">
            <div className="flex justify-between text-sm border-b pb-2 border-[#CDD5DF]">
              <span className="text-[#9AA4B2]">Subtotal</span>
              <span className="text-foreground font-bold">{formatNaira(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#9AA4B2]">Total</span>
              <span className="text-foreground font-bold text-xl">{formatNaira(total)}</span>
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="mt-6 w-full h-11 rounded-lg font-semibold bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
        >
          Add Item(s)
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddItem;
