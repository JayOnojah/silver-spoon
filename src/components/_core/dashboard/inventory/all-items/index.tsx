"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/src/lib/utils";
import { Search, List, LayoutGrid } from "lucide-react";
import ListItems from "./list/list";
import Pagination from "../../order/pagination";

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

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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
            <SelectTrigger className="w-40 h-10 rounded-lg border-[#D0D5DD]">
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
                viewMode === "list"
                  ? "bg-primary/10 text-primary"
                  : "text-[#9AA4B2] hover:bg-[#F9FAFB]",
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
                viewMode === "grid"
                  ? "bg-primary/10 text-primary"
                  : "text-[#9AA4B2] hover:bg-[#F9FAFB]",
              )}
              aria-label="Grid view"
            >
              <LayoutGrid className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <ListItems />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default AllItems;
