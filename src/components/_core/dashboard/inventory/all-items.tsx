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
  { id: "1", imageUrl: "/images/pngs/sowing.png",name: "Premium Silk Fabric", price: 40_000, collection: "Ready-to-wear", stockCount: 20, status: "Live", hasVariant: true },
  { id: "2", imageUrl: "/images/pngs/sowing.png",name: "Premium Silk Fabric", price: 40_000, collection: "Custom dress", stockCount: 20, status: "Draft" },
  { id: "3", imageUrl: "/images/pngs/sowing.png",name: "Premium Silk Fabric", price: 40_000, collection: "Accessories", stockCount: 20, status: "Draft", hasVariant: true },
  { id: "4", imageUrl: "/images/pngs/sowing.png",name: "Premium Silk Fabric", price: 40_000, collection: "Ready-to-wear", stockCount: 20, status: "Live" },
  { id: "5", imageUrl: "/images/pngs/sowing.png",name: "Premium Silk Fabric", price: 40_000, collection: "Ready-to-wear", stockCount: 20, status: "Draft", hasVariant: true },
  { id: "6", imageUrl: "/images/pngs/sowing.png",name: "Premium Silk Fabric", price: 40_000, collection: "Ready-to-wear", stockCount: 20, status: "Live" },
];

const SORT_OPTIONS = ["Newest Item", "Oldest Item", "Price: Low to High", "Price: High to Low", "Name A-Z"];
const COLLECTIONS = ["All Collections", "Ready-to-wear", "Custom dress", "Accessories"];

const AllItems = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Newest Item");
  const [collectionFilter, setCollectionFilter] = useState("All Collections");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [items, setItems] = useState<InventoryItemRow[]>(DUMMY_ITEMS);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

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
    <div className="space-y-4">
      {/* Header: title + sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-lg font-bold text-[#121926]">All Items</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#6B7280]">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-45 h-9 rounded-lg border-[#D0D5DD]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search + filters + view toggle */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#9AA4B2]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, Collections..."
            className="pl-9 h-10 rounded-lg border-[#D0D5DD] bg-white"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={collectionFilter} onValueChange={setCollectionFilter}>
            <SelectTrigger className="w-[160px] h-10 rounded-lg border-[#D0D5DD]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COLLECTIONS.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex rounded-lg border border-[#E5E7EB] overflow-hidden">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2.5 border-r border-[#E5E7EB] transition-colors",
                viewMode === "list" ? "bg-primary/10 text-primary" : "text-[#9AA4B2] hover:bg-[#F9FAFB]",
              )}
              aria-label="List view"
            >
              <List className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2.5 transition-colors",
                viewMode === "grid" ? "bg-primary/10 text-primary" : "text-[#9AA4B2] hover:bg-[#F9FAFB]",
              )}
              aria-label="Grid view"
            >
              <LayoutGrid className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary/5 hover:bg-primary/5 border-[#E5E7EB]">
              <TableHead className="font-semibold text-[#121926]">Product</TableHead>
              <TableHead className="font-semibold text-[#121926]">Price</TableHead>
              <TableHead className="font-semibold text-[#121926]">Collection</TableHead>
              <TableHead className="font-semibold text-[#121926]">Stock Count</TableHead>
              <TableHead className="font-semibold text-[#121926]">Status</TableHead>
              <TableHead className="font-semibold text-[#121926] text-right w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((row) => (
              <TableRow key={row.id} className="border-[#E5E7EB]">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-lg bg-[#F3F4F6] shrink-0 flex items-center justify-center text-[10px] text-[#9AA4B2]">
                      Img
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-[#121926] truncate">{row.name}</p>
                        {row.hasVariant && (
                          <span className="size-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-bold text-white">V</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-[#121926]">
                  {FormatCurrency(row.price)}
                </TableCell>
                <TableCell className="text-sm text-[#6B7280]">{row.collection}</TableCell>
                <TableCell className="text-sm text-[#121926]">{row.stockCount}</TableCell>
                <TableCell>
                  <Switch
                    checked={row.status === "Live"}
                    onCheckedChange={(checked) => handleStatusChange(row.id, checked)}
                  />
                  <span className="ml-2 text-sm text-[#6B7280]">{row.status}</span>
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

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <p className="text-sm text-[#6B7280]">
          Page {currentPage} of {totalPages}
        </p>
        <Pagination>
          <PaginationContent className="gap-1">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((p) => Math.max(1, p - 1));
                }}
                className="size-9 rounded-full border border-[#E5E7EB]"
              />
            </PaginationItem>
            {[1, 2, 3, 4, 5].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                  isActive={currentPage === page}
                  className={cn(
                    "size-9 rounded-full",
                    currentPage === page && "bg-primary text-white border-primary hover:bg-primary hover:text-white",
                  )}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                }}
                className="size-9 rounded-full border border-[#E5E7EB]"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default AllItems;
