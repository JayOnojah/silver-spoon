"use client";

import { cn } from "@/src/lib/utils";
import React from "react";
import { EmptyState } from "./empty-state";
import AllItems from "./all-item/index";
import Collections from "./collections";

interface IProps {
  isFilled: boolean;
  onAddProduct?: () => void;
}

const InventoryContent = ({ isFilled, onAddProduct }: IProps) => {
  const [activeTab, setActiveTab] = React.useState<"all" | "collections">("all");
  const tabs: { id: "all" | "collections"; label: string; count: number }[] = [
    { id: "all", label: "All Items", count: isFilled ? 30 : 0 },
    { id: "collections", label: "Collections", count: isFilled ? 30 : 0 },
  ];

  if (!isFilled) {
    return (
      <div className="mt-6">
        <EmptyState onAddProduct={onAddProduct} />
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="mb-4 bg-white rounded-xl border border-[#E5E7EB]/60">
        <div className="flex items-center gap-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative p-3 text-sm font-semibold transition-colors whitespace-nowrap",
                activeTab === tab.id
                  ? "text-foreground border-b-2 border-primary"
                  : "text-[#9AA4B2] font-normal",
              )}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {activeTab === "all" && <AllItems />}
      {activeTab === "collections" && <Collections />}
    </div>
  );
};

export default InventoryContent;
