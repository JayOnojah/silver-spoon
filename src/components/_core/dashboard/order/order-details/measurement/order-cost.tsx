"use client";

import React, { useState, useMemo } from "react";
import { format } from "date-fns";
import { Button } from "@/src/components/ui/button";
import { EditSvg, BinSvg } from "../../svg";
import { IconPlus } from "@tabler/icons-react";
import AddCost, { type CostEntry } from "./add-cost";

type DisplayCost = {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: string;
};

const toDisplayCost = (c: CostEntry): DisplayCost => ({
  id: c.id,
  name: c.costTitle,
  category: c.description || "—",
  date: format(c.date, "MMM d, yyyy"),
  amount: c.amount.replace(/\D/g, "")
    ? `₦${Number(c.amount.replace(/\D/g, "")).toLocaleString()}`
    : c.amount,
});

const INITIAL_COSTS: DisplayCost[] = [
  { id: "1", name: "Button", category: "sewing", date: "Dec 20, 2025", amount: "₦120,000" },
  { id: "2", name: "Thread", category: "sewing", date: "Dec 20, 2025", amount: "₦120,000" },
];

const OrderCost = () => {
  const [addCostOpen, setAddCostOpen] = useState(false);
  const [costs, setCosts] = useState<DisplayCost[]>(INITIAL_COSTS);

  const { totalCost, profit } = useMemo(() => {
    const total = costs.reduce((sum, c) => {
      const n = Number(c.amount.replace(/[^\d.]/g, ""));
      return sum + (Number.isNaN(n) ? 0 : n);
    }, 0);
    return {
      totalCost: `₦${total.toLocaleString()}`,
      profit: "₦0.00", // could derive from order price - total
    };
  }, [costs]);

  const handleCostsSubmitted = (entries: CostEntry[]) => {
    setCosts((prev) => [...prev, ...entries.map(toDisplayCost)]);
  };

  return (
    <div className="mt-2">
      <AddCost
        open={addCostOpen}
        onOpenChange={setAddCostOpen}
        onSubmit={handleCostsSubmitted}
      />
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-foreground">Order Cost</h3>
        <Button
          variant="ghost"
          className="font-bold text-primary h-10 px-4 gap-2"
          onClick={() => setAddCostOpen(true)}
        >
          <IconPlus className="size-4" />
          New Cost
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 bg-[#F9F0EE] rounded-xl p-2 gap-2 mb-4">
        <div className="bg-white text-center rounded-xl p-4">
          <p className="text-sm text-[#6B7280] mb-1">Total Cost</p>
          <p className="text-xl font-bold text-foreground">{totalCost}</p>
        </div>
        <div className="bg-white text-center rounded-xl p-4">
          <p className="text-sm text-[#6B7280] mb-1">Profit</p>
          <p className="text-xl font-bold text-foreground">{profit}</p>
        </div>
      </div>

      <h4 className="text-xs font-bold text-[#9AA4B2] mb-2">All Costs</h4>
      <div className="space-y-2">
        {costs.map((cost) => (
          <div
            key={cost.id}
            className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <p className="font-bold text-[#121926]">{cost.name}</p>
              <p className="text-xs text-[#9AA4B2]">{cost.category}</p>
              <p className="text-xs text-[#9AA4B2]">{cost.date}</p>
            </div>
            <div className="space-y-1.5">
              <div className="font-bold text-[#121926]">{cost.amount}</div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="text-[#9AA4B2] hover:text-foreground transition-colors p-1"
                  aria-label="Edit cost"
                >
                  <EditSvg />
                </button>
                <button
                  type="button"
                  className="text-[#9AA4B2] hover:text-foreground transition-colors p-1"
                  aria-label="Delete cost"
                >
                  <BinSvg />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCost;
