"use client";

import Image from "next/image";
import { IconPalette } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DUMMY_DESIGN_ITEMS,
  DUMMY_REFERENCE_DESIGNS,
} from "../measurement/designs/dummy-data";

export interface MoodboardItem {
  id: string;
  title: string;
  description: string;
  designCount?: number;
  lastUpdated?: string;
  type?: string;
}

interface MoodboardPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moodboard: MoodboardItem | null;
  /** Optional design images; defaults based on moodboard type (6 for 3-col, 16 for 4-col) */
  designImages?: { id: string; imageUrl: string; alt?: string }[];
}

const IMAGES_3X2 = DUMMY_DESIGN_ITEMS.slice(0, 6);
const ALL_IMAGES = [...DUMMY_DESIGN_ITEMS, ...DUMMY_REFERENCE_DESIGNS];
/** Masonry layout: row1 = 3, row2 = 4, row3 = 3 (10 items total) */
const IMAGES_MANSORY = Array.from({ length: 10 }, (_, i) => ({
  ...ALL_IMAGES[i % ALL_IMAGES.length],
  id: `mansory-${i}`,
}));
const IMAGES_4X4 = Array.from({ length: 16 }, (_, i) => ({
  ...ALL_IMAGES[i % ALL_IMAGES.length],
  id: `4x4-${i}`,
}));

const ImageCell = ({
  item,
}: {
  item: { id: string; imageUrl: string; alt?: string };
}) => (
  <div className="relative aspect-square overflow-hidden bg-[#F9F0EE] rounded-xl border-2 border-primary">
    <Image
      src={item.imageUrl}
      alt={item.alt ?? "Design"}
      fill
      className="object-cover p-2 rounded-xl"
      sizes="160px"
    />
  </div>
);

const MoodboardPreview = ({
  open,
  onOpenChange,
  moodboard,
  designImages,
}: MoodboardPreviewProps) => {
  if (!moodboard) return null;

  const isMansory = moodboard.type === "mansory";
  const is4x4 = moodboard.type === "4";
  const images =
    designImages ??
    (is4x4 ? IMAGES_4X4 : isMansory ? IMAGES_MANSORY : IMAGES_3X2);
  const gridCols = is4x4 ? "grid-cols-4" : "grid-cols-3";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-130 max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-left font-bold text-foreground">
            Preview Moodboard
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-4 space-y-4">
          {/* Info section - light orange background */}
          <div className="flex gap-3 p-4 rounded-xl bg-[#FFF1EC] border border-primary/20">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <IconPalette className="size-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground">
                {moodboard.title}
              </p>
              <p className="text-sm text-[#6B7280] mt-0.5">
                {moodboard.description}
              </p>
            </div>
          </div>

          {/* Image grid - 3x2 default, masonry (3+4+3) for mansory, 4x4 for type "4" */}
          {isMansory ? (
            <div className="rounded-md bg-primary p-1 space-y-1">
              <div className="grid grid-cols-3 gap-1 w-full">
                {images.slice(0, 3).map((item) => (
                  <ImageCell key={item.id} item={item} />
                ))}
              </div>
              <div className="grid grid-cols-4 gap-1 w-full">
                {images.slice(3, 7).map((item) => (
                  <ImageCell key={item.id} item={item} />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-1 w-full">
                {images.slice(7, 10).map((item) => (
                  <ImageCell key={item.id} item={item} />
                ))}
              </div>
            </div>
          ) : (
            <div className={`grid ${gridCols} rounded-md bg-primary p-1 gap-1`}>
              {images.map((item) => (
                <ImageCell key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoodboardPreview;
