"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FormatCurrency } from "@/src/components/_core/dashboard/shared/format-currency";
import { cn } from "@/src/lib/utils";
import { Search, List, LayoutGrid, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

export interface InventoryItemRow {
  id: string;
  name: string;
  price: number;
  collection: string;
  stockCount: number;
  status: "Live" | "Draft";
  hasVariant?: boolean;
  imageUrl?: string;
}

const DUMMY_ITEMS: InventoryItemRow[] = [
  {
    id: "1",
    imageUrl: "/images/pngs/sowing.png",
    name: "Premium Silk Fabric",
    price: 40_000,
    collection: "Ready-to-wear",
    stockCount: 20,
    status: "Live",
    hasVariant: true,
  },
  {
    id: "2",
    imageUrl: "/images/pngs/sowing.png",
    name: "Premium Silk Fabric",
    price: 40_000,
    collection: "Custom dress",
    stockCount: 20,
    status: "Draft",
  },
  {
    id: "3",
    imageUrl: "/images/pngs/sowing.png",
    name: "Premium Silk Fabric",
    price: 40_000,
    collection: "Accessories",
    stockCount: 20,
    status: "Draft",
    hasVariant: true,
  },
  {
    id: "4",
    imageUrl: "/images/pngs/sowing.png",
    name: "Premium Silk Fabric",
    price: 40_000,
    collection: "Ready-to-wear",
    stockCount: 20,
    status: "Live",
  },
  {
    id: "5",
    imageUrl: "/images/pngs/sowing.png",
    name: "Premium Silk Fabric",
    price: 40_000,
    collection: "Ready-to-wear",
    stockCount: 20,
    status: "Draft",
    hasVariant: true,
  },
  {
    id: "6",
    imageUrl: "/images/pngs/sowing.png",
    name: "Premium Silk Fabric",
    price: 40_000,
    collection: "Ready-to-wear",
    stockCount: 20,
    status: "Live",
  },
];

const SORT_OPTIONS = [
  "Newest Item",
  "Oldest Item",
  "Price: Low to High",
  "Price: High to Low",
  "Name A-Z",
];
const COLLECTIONS = [
  "All Collections",
  "Ready-to-wear",
  "Custom dress",
  "Accessories",
];

const ListItems = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [items, setItems] = useState<InventoryItemRow[]>(DUMMY_ITEMS);


  const handleStatusChange = (id: string, checked: boolean) => {
    setItems((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, status: checked ? "Live" : "Draft" } : row,
      ),
    );
  };

  const handleEdit = (id: string) => {
    // TODO: open edit product
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary/5 hover:bg-primary/5 border-[#E5E7EB]">
            <TableHead className="font-semibold text-[#121926]">
              Product
            </TableHead>
            <TableHead className="font-semibold text-[#121926]">
              Price
            </TableHead>
            <TableHead className="font-semibold text-[#121926]">
              Collection
            </TableHead>
            <TableHead className="font-semibold text-[#121926]">
              Stock Count
            </TableHead>
            <TableHead className="font-semibold text-[#121926]">
              Status
            </TableHead>
            <TableHead className="font-semibold text-[#121926] text-right w-25">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((row) => (
            <TableRow key={row.id} className="border-[#E5E7EB]">
              <TableCell className="py-3">
                <div className="flex items-center gap-3">
                  <Image
                    src={row.imageUrl ?? "/images/pngs/sowing.png"}
                    height={60}
                    width={60}
                    alt={row.name}
                  />

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-[#121926] truncate">
                        {row.name}
                      </p>
                      {row.hasVariant && (
                        <span className="size-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-white">
                            V
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-sm text-[#121926]">
                {FormatCurrency(row.price)}
              </TableCell>
              <TableCell className="text-sm text-[#6B7280]">
                {row.collection}
              </TableCell>
              <TableCell className="text-sm text-[#121926]">
                {row.stockCount}
              </TableCell>
              <TableCell>
                <Switch
                  checked={row.status === "Live"}
                  onCheckedChange={(checked) =>
                    handleStatusChange(row.id, checked)
                  }
                />
                <span className="ml-2 text-sm text-[#6B7280]">
                  {row.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 text-[#9AA4B2] hover:text-foreground"
                    onClick={() => handleEdit(row.id)}
                    aria-label="Edit"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 text-[#9AA4B2] hover:text-destructive"
                    onClick={() => handleDelete(row.id)}
                    aria-label="Delete"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListItems;
