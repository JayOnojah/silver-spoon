"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, X, Trash2 } from "lucide-react";

export interface VariantTypeItem {
  id: string;
  name: string;
  values: string[];
  stock: string;
}

interface AddVariantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack?: () => void;
  onSave?: (variants: VariantTypeItem[]) => void;
}

function nextId() {
  return `v-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

const createEmptyVariant = (): VariantTypeItem => ({
  id: nextId(),
  name: "",
  values: [""],
  stock: "",
});

export default function AddVariant({
  open,
  onOpenChange,
  onBack,
  onSave,
}: AddVariantProps) {
  const [variantTypes, setVariantTypes] = useState<VariantTypeItem[]>([
    createEmptyVariant(),
  ]);

  const updateVariant = (id: string, updates: Partial<VariantTypeItem>) => {
    setVariantTypes((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updates } : v)),
    );
  };

  const setVariantValues = (id: string, values: string[]) => {
    updateVariant(id, { values });
  };

  const addValue = (variantId: string) => {
    setVariantTypes((prev) =>
      prev.map((v) =>
        v.id === variantId ? { ...v, values: [...v.values, ""] } : v,
      ),
    );
  };

  const removeValue = (variantId: string, index: number) => {
    setVariantTypes((prev) =>
      prev.map((v) =>
        v.id === variantId
          ? { ...v, values: v.values.filter((_, i) => i !== index) }
          : v,
      ),
    );
  };

  const addVariantType = () => {
    setVariantTypes((prev) => [...prev, createEmptyVariant()]);
  };

  const removeVariantType = (id: string) => {
    setVariantTypes((prev) => prev.filter((v) => v.id !== id));
  };

  const handleBack = () => {
    onOpenChange(false);
    onBack?.();
  };

  const handleSave = () => {
    onSave?.(variantTypes);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2 text-left space-y-3">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 text-sm font-medium text-[#374151] hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back
          </button>
          <DialogTitle className="text-xl font-bold text-[#121926]">
            Add Variants
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pt-2 pb-6 flex flex-col gap-4 overflow-y-auto">
          {variantTypes.map((variant, variantIndex) => (
            <div
              key={variant.id}
              className="rounded-xl border border-[#E5E7EB] bg-white p-4 relative"
            >
              {variantTypes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeVariantType(variant.id)}
                  className="absolute top-3 right-3 p-1.5 text-[#9AA4B2] hover:text-destructive"
                  aria-label="Remove variant type"
                >
                  <Trash2 className="size-4" />
                </button>
              )}

              <div className="space-y-4 pr-8">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#374151]">
                    Variant Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    value={variant.name}
                    onChange={(e) =>
                      updateVariant(variant.id, { name: e.target.value })
                    }
                    placeholder="e.g Size"
                    className="h-10 rounded-lg border-[#D0D5DD]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Label className="text-sm font-medium text-[#374151]">
                      Variant Value <span className="text-destructive">*</span>
                    </Label>
                    <button
                      type="button"
                      onClick={() => addValue(variant.id)}
                      className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                    >
                      <Plus className="size-3.5" />
                      Add Value
                    </button>
                  </div>
                  <div className="space-y-2">
                    {variant.values.map((val, valueIndex) => (
                      <div
                        key={`${variant.id}-${valueIndex}`}
                        className="flex gap-2"
                      >
                        <Input
                          value={val}
                          onChange={(e) => {
                            const next = [...variant.values];
                            next[valueIndex] = e.target.value;
                            setVariantValues(variant.id, next);
                          }}
                          placeholder={
                            valueIndex === 0
                              ? "e.g XXL"
                              : "Enter Variant Value"
                          }
                          className="h-10 rounded-lg border-[#D0D5DD] flex-1"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-10 shrink-0 text-[#9AA4B2] hover:text-destructive"
                          onClick={() =>
                            removeValue(variant.id, valueIndex)
                          }
                          aria-label="Remove value"
                        >
                          <X className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#374151]">
                    Stock
                  </Label>
                  <Input
                    value={variant.stock}
                    onChange={(e) =>
                      updateVariant(variant.id, { stock: e.target.value })
                    }
                    placeholder="Total Number In Stock"
                    type="number"
                    min={0}
                    className="h-10 rounded-lg border-[#D0D5DD]"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addVariantType}
            className="text-sm font-medium text-primary hover:underline flex items-center gap-1.5 w-fit"
          >
            <Plus className="size-4" />
            Another Variant type
          </button>

          <Button
            type="button"
            onClick={handleSave}
            className="w-full h-11 rounded-xl bg-primary text-white hover:bg-primary/90 font-bold"
          >
            Save Product Variant
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
