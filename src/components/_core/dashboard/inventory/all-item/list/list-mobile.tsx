"use client";

import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FormatCurrency } from "@/src/components/_core/dashboard/shared/format-currency";
import { Pencil, Trash2 } from "lucide-react";
import type { InventoryItemRow } from ".";
import { DeleteSvg, EditSvg } from "../../../order/svg";

interface ListMobileProps {
  items: InventoryItemRow[];
  onStatusChange: (id: string, checked: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ListMobile({
  items,
  onStatusChange,
  onEdit,
  onDelete,
}: ListMobileProps) {
  return (
    <div className="space-y-4">
      {items.map((row) => (
        <div
          key={row.id}
          className="rounded-xl border border-[#E5E7EB] bg-white p-4"
        >
          {/* Top: image + name + badge */}
          <div className="flex items-center gap-3 mb-4 border-b pb-4">
            {row.imageUrl ? (
              <Image
                src={row.imageUrl}
                height={60}
                width={60}
                alt={row.name}
                className="size-15 rounded-lg object-cover shrink-0"
              />
            ) : (
              <div className="size-15 rounded-lg bg-[#F3F4F6] shrink-0 flex items-center justify-center text-[10px] text-[#9AA4B2]">
                Img
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-[#121926] truncate">
                  {row.name}
                </p>
                {row.hasVariant && (
                  <span className="size-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-white">V</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details: two-column label/value */}
          <div className="grid gap-x-4 gap-y-3 text-sm mb-4">
            <div className="flex justify-between gap-2">
              <span className="text-[#9AA4B2]">Price</span>
              <span className="text-[#121926] font-medium truncate">
                {FormatCurrency(row.price)}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[#9AA4B2]">Collection</span>
              <span className="text-[#121926] truncate">{row.collection}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[#9AA4B2]">Stock Count</span>
              <span className="text-[#121926]">{row.stockCount}</span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="text-[#9AA4B2]">Status</span>
              <div className="flex items-center gap-2">
                <span className="text-[#121926] text-sm">{row.status}</span>
                <Switch
                  checked={row.status === "Live"}
                  onCheckedChange={(checked) => onStatusChange(row.id, checked)}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t border-[#E5E7EB]">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1 h-9 gap-2 border-[#E5E7EB] text-[#9AA4B2] hover:bg-[#F9FAFB] font-bold"
              onClick={() => onEdit(row.id)}
            >
              <EditSvg />
              Edit
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1 h-9 gap-2 border-[#E5E7EB] text-[#9AA4B2] font-bold hover:bg-destructive/10 hover:text-destructive"
              onClick={() => onDelete(row.id)}
            >
              <DeleteSvg />
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
