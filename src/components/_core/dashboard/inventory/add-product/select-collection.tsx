"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, Plus, ShoppingBag } from "lucide-react";
import { cn } from "@/src/lib/utils";

export interface CollectionOption {
  id: string;
  name: string;
  productCount: number;
}

const DEFAULT_COLLECTIONS: CollectionOption[] = [
  { id: "1", name: "Collection Name", productCount: 10 },
  { id: "2", name: "Collection Name", productCount: 10 },
  { id: "3", name: "Collection Name", productCount: 10 },
  { id: "4", name: "Collection Name", productCount: 10 },
  { id: "5", name: "Collection Name", productCount: 10 },
];

interface SelectCollectionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collections?: CollectionOption[];
  onProceed?: (collectionId: string) => void;
  onAddNewCollection?: () => void;
}

export default function SelectCollection({
  open,
  onOpenChange,
  collections = DEFAULT_COLLECTIONS,
  onProceed,
  onAddNewCollection,
}: SelectCollectionProps) {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string>("");

  const filtered = useMemo(
    () =>
      collections.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [collections, search],
  );

  const handleProceed = () => {
    if (selectedId) {
      onProceed?.(selectedId);
      onOpenChange(false);
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setSearch("");
      setSelectedId("");
    }
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[28rem] max-h-[90vh] flex flex-col gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2 text-left space-y-1">
          <p className="text-xs font-medium text-[#9AA4B2]">
            Step 1 of 2 - Add New Product
          </p>
          <DialogTitle className="text-xl font-bold text-[#121926]">
            Select A Collection
          </DialogTitle>
          <p className="text-sm text-[#6B7280] pt-1">
            Choose an existing collection to place this item or create new
            collection.
          </p>
        </DialogHeader>

        <div className="px-6 pt-4 pb-6 flex flex-col gap-4 flex-1 min-h-0">
          <div className="relative shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#9AA4B2]" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Collection"
              className="pl-9 h-10 rounded-lg border-[#D0D5DD] bg-white"
            />
          </div>

          <RadioGroup
            value={selectedId}
            onValueChange={setSelectedId}
            className="flex flex-col gap-0 overflow-y-auto max-h-[240px] rounded-lg border border-[#E5E7EB] divide-y divide-[#E5E7EB]"
          >
            {filtered.map((collection) => (
              <label
                key={collection.id}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#F9FAFB] transition-colors",
                  selectedId === collection.id && "bg-primary/5",
                )}
              >
                <ShoppingBag className="size-5 text-primary shrink-0" strokeWidth={2} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#121926] truncate">
                    {collection.name}
                  </p>
                  <p className="text-xs text-[#9AA4B2]">
                    {collection.productCount} Product
                    {collection.productCount !== 1 ? "s" : ""}
                  </p>
                </div>
                <RadioGroupItem value={collection.id} className="shrink-0" />
              </label>
            ))}
          </RadioGroup>

          <Button
            type="button"
            variant="ghost"
            onClick={onAddNewCollection}
            className="w-full justify-start h-10 gap-2 text-primary hover:bg-primary/10 hover:text-primary font-medium"
          >
            <Plus className="size-4" />
            Add New Collection
          </Button>

          <Button
            type="button"
            onClick={handleProceed}
            disabled={!selectedId}
            className="w-full h-11 rounded-xl bg-primary text-white hover:bg-primary/90 font-bold disabled:opacity-50"
          >
            Proceed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
