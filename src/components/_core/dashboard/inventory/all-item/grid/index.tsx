"use client";

import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FormatCurrency } from "@/src/components/_core/dashboard/shared/format-currency";
import { cn } from "@/src/lib/utils";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import type { InventoryItemRow } from "../index";

interface GridViewProps {
  items: InventoryItemRow[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function GridView({
  items,
  onEdit,
  onDelete,
}: GridViewProps) {
  return (
    <>
      

      {/* Desktop: 2 or 4 columns above 600px */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {items.map((row) => (
        <div
          key={row.id}
          className="rounded overflow-hidden"
        >
          {/* Image with overlay menu */}
          <div className="relative aspect-square w-full bg-[#F3F4F6]">
            {row.imageUrl ? (
              <Image
                src={row.imageUrl}
                fill
                alt={row.name}
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-[#9AA4B2]">
                Img
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="absolute top-2 right-2 size-8 rounded-full bg-white/90 hover:bg-white border-0 shadow-sm"
                  aria-label="Options"
                >
                  <MoreHorizontal className="size-4 text-[#6B7280]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => onEdit(row.id)}>
                  <Pencil className="size-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(row.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="size-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Details */}
          <div className="p-3">
            <div className="flex items-center gap-2 min-w-0">
              <p className="text-sm font-bold text-[#121926] truncate flex-1">
                {row.name}
              </p>
              <span
                className={cn(
                  "size-2 rounded-full shrink-0",
                  row.status === "Live" ? "bg-[#DC2626]" : "bg-[#9CA3AF]",
                )}
                title={row.status}
                aria-hidden
              />
            </div>
            <p className="text-xs text-[#9AA4B2] mt-0.5 truncate">
              {row.collection}
            </p>
            <p className="text-sm font-semibold text-[#121926] mt-1">
              {FormatCurrency(row.price)}
            </p>
          </div>
        </div>
      ))}
      </div>
    </>
  );
}
