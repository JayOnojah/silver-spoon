"use client";

import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { IconSearch } from "@tabler/icons-react";

export type MentionStaff = { id: string; name: string };

interface MentionPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  items: MentionStaff[];
  onSelect: (staff: MentionStaff) => void;
  children: ReactNode;
  searchPlaceholder?: string;
  emptyText?: string;
}

export function MentionPopover({
  open,
  onOpenChange,
  searchValue,
  onSearchValueChange,
  items,
  onSelect,
  children,
  searchPlaceholder = "Search staff...",
  emptyText = "No staff found",
}: MentionPopoverProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverAnchor asChild>{children}</PopoverAnchor>
      <PopoverContent
        align="start"
        side="top"
        sideOffset={8}
        className="w-(--radix-popover-trigger-width) max-h-64 overflow-hidden flex flex-col p-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="p-2 border-b border-[#E5E7EB]">
          <div className="relative">
            <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-[#9AA4B2]" />
            <Input
              value={searchValue}
              onChange={(e) => onSearchValueChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-9 pl-8 rounded-md border-[#D0D5DD] text-sm"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="overflow-y-auto max-h-48 p-1">
          {items.length === 0 ? (
            <p className="py-2 px-2 text-sm text-[#9AA4B2]">{emptyText}</p>
          ) : (
            items.map((staff) => (
              <button
                key={staff.id}
                type="button"
                onClick={() => onSelect(staff)}
                className="w-full text-left px-3 py-2 rounded-md text-sm text-[#121926] hover:bg-[#F3F4F6] transition-colors"
              >
                {staff.name}
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
