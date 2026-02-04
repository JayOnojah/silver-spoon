"use client";

import { useState } from "react";
import { IconPalette, IconSearch } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import CustomCheckBox from "../../../../shared/custom-checkbox";
import NewDesigns from "./new-designs";
import { DUMMY_CATALOGUE, type CatalogueDesign } from "./dummy-data";

export type { CatalogueDesign };

interface SelectDesignTypeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceed?: (
    source: "existing" | "new",
    selectedCatalogue?: CatalogueDesign,
    newFiles?: File[],
  ) => void;
}

const SelectDesignType = ({
  open,
  onOpenChange,
  onProceed,
}: SelectDesignTypeProps) => {
  const [source, setSource] = useState<"existing" | "new">("existing");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(
    DUMMY_CATALOGUE[0]?.id ?? null,
  );
  const [newDesignFiles, setNewDesignFiles] = useState<File[]>([]);

  const handleProceed = () => {
    if (source === "existing" && selectedId) {
      const catalogue = DUMMY_CATALOGUE.find((c) => c.id === selectedId);
      if (catalogue) onProceed?.(source, catalogue);
    } else if (source === "new" && newDesignFiles.length > 0) {
      onProceed?.(source, undefined, newDesignFiles);
    }
    onOpenChange(false);
    setSearchQuery("");
    setSource("existing");
    setSelectedId(MOCK_CATALOGUE[0]?.id ?? null);
  };

  const canProceed =
    source === "new"
      ? newDesignFiles.length > 0
      : source === "existing" && selectedId != null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25 max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-left font-black text-[#121926]">
            Add Designs
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2 flex-1 overflow-hidden flex flex-col min-h-0">
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-[#4B5565]">
              Choose Source <span className="text-[#EF4444]">*</span>
            </Label>
            <RadioGroup
              value={source}
              onValueChange={(v) => setSource(v as "existing" | "new")}
              className="flex gap-6"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <span
                  className={cn(
                    "w-4 h-4 border rounded-full flex items-center justify-center shrink-0",
                    source === "existing"
                      ? "border-primary"
                      : "border-[#9AA4B2]",
                  )}
                >
                  <CustomCheckBox checked={source === "existing"} />
                </span>
                <RadioGroupItem
                  value="existing"
                  id="source-existing"
                  className="sr-only"
                />
                <span className="text-sm font-medium text-foreground">
                  From Existing
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <span
                  className={cn(
                    "w-4 h-4 border rounded-full flex items-center justify-center shrink-0",
                    source === "new" ? "border-primary" : "border-[#9AA4B2]",
                  )}
                >
                  <CustomCheckBox checked={source === "new"} />
                </span>
                <RadioGroupItem
                  value="new"
                  id="source-new"
                  className="sr-only"
                />
                <span className="text-sm font-medium text-foreground">
                  Create New
                </span>
              </label>
            </RadioGroup>
          </div>

          {source === "existing" && (
            <>
              <div className="relative">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9AA4B2]" />
                <Input
                  placeholder="Search Catalogue"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 rounded-lg border-[#CDD5DF]"
                />
              </div>

              <RadioGroup
                value={selectedId ?? ""}
                onValueChange={setSelectedId}
                className="flex-1 overflow-y-auto space-y-2 min-h-0 flex flex-col"
              >
                {DUMMY_CATALOGUE.map((design) => (
                  <label
                    key={design.id}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors",
                      selectedId === design.id
                        ? "border-primary bg-[#FFF1EC]/50"
                        : "border-[#E5E7EB] bg-[#F9FAFB] hover:border-[#CDD5DF]",
                    )}
                  >
                    <div className="shrink-0 mt-0.5">
                      <IconPalette className="size-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground">
                        {design.title}
                      </p>
                      <p className="text-sm text-[#6B7280] mt-0.5">
                        {design.description}
                      </p>
                      <p className="text-xs text-[#9AA4B2] mt-1">
                        {design.designCount} Designs • Last updated{" "}
                        {design.lastUpdated}
                      </p>
                    </div>
                    <span className="shrink-0 mt-1 flex items-center justify-center">
                      <span
                        className={cn(
                          "w-4 h-4 border rounded-full flex items-center justify-center",
                          selectedId === design.id
                            ? "border-primary"
                            : "border-[#9AA4B2]",
                        )}
                      >
                        <CustomCheckBox checked={selectedId === design.id} />
                      </span>
                      <RadioGroupItem
                        value={design.id}
                        id={`design-${design.id}`}
                        className="sr-only"
                      />
                    </span>
                  </label>
                ))}
              </RadioGroup>
            </>
          )}

          {source === "new" && (
            <NewDesigns
              onFilesChange={setNewDesignFiles}
              resetWhen={open}
            />
          )}
        </div>

        <Button
          onClick={handleProceed}
          disabled={!canProceed}
          className="mt-6 w-full h-11 rounded-lg font-semibold bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
        >
          {source === "new" ? "Add Designs" : "Proceed"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SelectDesignType;
