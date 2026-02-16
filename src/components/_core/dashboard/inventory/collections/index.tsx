"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Pagination from "../../order/pagination";
import { Search, Plus, ShoppingBag, MoreVertical, } from "lucide-react";

export interface CollectionCardItem {
  id: string;
  name: string;
  productCount: number;
}

const DUMMY_COLLECTIONS: CollectionCardItem[] = Array.from(
  { length: 12 },
  (_, i) => ({
    id: `c${i + 1}`,
    name: i === 2 ? "Collection Name is too long to display in one line" : "Collection Name",
    productCount: 10,
  }),
);

const Collections = () => {
  const [search, setSearch] = useState("");
  const [collections, setCollections] = useState<CollectionCardItem[]>(DUMMY_COLLECTIONS);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handleNewCollection = () => {
    // TODO: open New Collection modal
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleEdit = (id: string) => {
    // TODO: open edit collection
  };

  const handleDelete = (id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-4 sm:bg-white sm:p-5 rounded-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-lg font-bold text-[#121926]">All Collections</h2>
        <Button
          type="button"
          onClick={handleNewCollection}
          className="bg-primary text-white hover:bg-primary/90 rounded-xl h-10 px-4 gap-2 w-fit"
        >
          <Plus className="size-4" />
          New Collection
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#9AA4B2]" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Product name, Collections..."
          className="pl-9 h-10 rounded-lg border-[#D0D5DD] bg-white w-full"
        />
      </div>

      {/* Collection grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm hover:shadow-md transition-shadow relative"
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 size-8 text-[#9AA4B2] hover:text-foreground"
                  aria-label="Options"
                >
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => handleEdit(collection.id)}>
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDelete(collection.id)}
                  className="text-destructive focus:text-destructive"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <p className="text-sm font-bold text-[#121926] pr-8 truncate mt-0.5">
              {collection.name}
            </p>
            <div className="flex items-center gap-2 mt-2 text-[#9AA4B2]">
              <ShoppingBag className="size-4 text-primary shrink-0" strokeWidth={2} />
              <span className="text-sm">
                {collection.productCount} Product{collection.productCount !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Collections;
