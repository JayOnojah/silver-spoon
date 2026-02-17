"use client";

import { FormatCurrency } from "@/src/components/_core/dashboard/shared/format-currency";
import { FinanceIcon, InventoryIcon } from "../../layout/svg";
import { StockSvg } from "../svg";

interface InventoryMetricsProps {
  totalItems?: number;
  totalBalance?: number;
  outOfStock?: number;
  draft?: number;
}

const InventoryMetrics = ({
  totalItems = 0,
  totalBalance = 0,
  outOfStock = 0,
  draft = 0,
}: InventoryMetricsProps) => {
  const cards = [
    { id: "total-items", icon: InventoryIcon, value: String(totalItems), label: "Total Items" },
    { id: "total-balance", icon: FinanceIcon, value: FormatCurrency(totalBalance), label: "Total Inventory Balance" },
    { id: "out-of-stock", icon: StockSvg, value: String(outOfStock), label: "Out Of Stock" },
    { id: "draft", icon: StockSvg, value: String(draft), label: "Draft" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white rounded-xl p-4 border space-y-2 border-[#E5E7EB]/60"
          >
            <div className="text-primary">
              <Icon />
            </div>
            <p className="text-[#121926] text-2xl font-bold">{card.value}</p>
            <p className="text-sm text-[#9AA4B2] mt-1">{card.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default InventoryMetrics;
