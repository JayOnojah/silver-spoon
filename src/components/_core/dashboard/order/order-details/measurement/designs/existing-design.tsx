"use client";

import { useState } from "react";
import Image from "next/image";
import { IconChevronLeft, IconPalette, IconX, IconCheck } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Pagination from "../../../pagination";
import { DUMMY_DESIGN_ITEMS } from "./dummy-data";

export type { DesignItem } from "./dummy-data";

export interface CatalogueInfo {
  id: string;
  title: string;
  description: string;
  designCount: number;
  lastUpdated: string;
}

interface ExistingDesignProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  catalogue: CatalogueInfo | null;
  designItems?: import("./dummy-data").DesignItem[];
  onBack?: () => void;
  onAddSelected?: (selectedIds: string[]) => void;
}

const TOTAL_PAGES = 10;

const ExistingDesign = ({
  open,
  onOpenChange,
  catalogue,
  designItems = DUMMY_DESIGN_ITEMS,
  onBack,
  onAddSelected,
}: ExistingDesignProps) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAddSelected = () => {
    onAddSelected?.(Array.from(selectedIds));
    onOpenChange(false);
    setSelectedIds(new Set());
    setCurrentPage(1);
  };

  const handleClose = () => {
    onOpenChange(false);
    setSelectedIds(new Set());
    setCurrentPage(1);
  };

  const selectedCount = selectedIds.size;

  if (!catalogue) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-130 max-h-[90vh] flex flex-col p-0 gap-0"
        showCloseButton={false}
      >
        {/* Header: Back | Title | Close */}
        <div className="flex items-center justify-between border-b border-[#E5E7EB] px-4 py-3 shrink-0">
          <button
            type="button"
            onClick={onBack ?? handleClose}
            className="flex items-center justify-center size-8 rounded-full text-[#4B5565] hover:bg-[#F9FAFB] transition-colors"
            aria-label="Back"
          >
            <IconChevronLeft className="size-5" />
          </button>
          <DialogHeader className="p-0">
            <DialogTitle className="text-base font-bold text-foreground">
              Select Designs
            </DialogTitle>
          </DialogHeader>
          <button
            type="button"
            onClick={handleClose}
            className="flex items-center justify-center size-8 rounded-full text-[#4B5565] hover:bg-[#F9FAFB] transition-colors"
            aria-label="Close"
          >
            <IconX className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Info card */}
          <div className="flex gap-3 p-4 rounded-xl bg-[#FFF1EC] border border-primary/20">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <IconPalette className="size-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground">
                {catalogue.title}
              </p>
              <p className="text-sm text-[#6B7280] mt-0.5">
                {catalogue.description}
              </p>
              <p className="text-xs text-[#9AA4B2] mt-1">
                {catalogue.designCount} Designs • Last updated{" "}
                {catalogue.lastUpdated}
              </p>
            </div>
          </div>

          {/* Design grid */}
          <div className="grid grid-cols-3 gap-3">
            {designItems.map((item) => {
              const isSelected = selectedIds.has(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleSelection(item.id)}
                  className="relative aspect-square rounded-lg overflow-hidden bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#CDD5DF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.alt ?? "Design"}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                  <span
                    className={cn(
                      "absolute top-2 right-2 size-6 rounded-full flex items-center justify-center transition-colors",
                      isSelected
                        ? "bg-primary text-white"
                        : "bg-white/90 border-2 border-[#9AA4B2]",
                    )}
                  >
                    {isSelected ? (
                      <IconCheck className="size-3.5 stroke-3" />
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={TOTAL_PAGES}
            handlePageChange={setCurrentPage}
          />
        </div>

        {/* Footer button */}
        <div className="p-4 border-t border-[#E5E7EB] shrink-0">
          <Button
            onClick={handleAddSelected}
            disabled={selectedCount === 0}
            className="w-full h-11 rounded-lg font-semibold bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
          >
            Add {selectedCount} Selected Design{selectedCount !== 1 ? "s" : ""}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExistingDesign;
