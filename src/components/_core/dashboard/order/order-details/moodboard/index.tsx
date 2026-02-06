"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { IconPalette, IconPlus, IconTrash, IconEye } from "@tabler/icons-react";
import MoodboardPreview from "./moodboard-preview";
import AddNewMoodboard from "./add-new-moodboard";
import CreateNew from "./create-new";
import type { CreateMoodboardData } from "./create-new";

export interface MoodboardItem {
  id: string;
  title: string;
  description: string;
  designCount: number;
  lastUpdated: string;
  type: string;
}

const DUMMY_MOODBOARDS: MoodboardItem[] = [
  {
    id: "mb-1",
    title: "Men's Face Cap",
    description: "Description",
    designCount: 20,
    lastUpdated: "2 hours ago",
    type: "3",
  },
  {
    id: "mb-2",
    title: "Men's Face Cap",
    description: "Description",
    designCount: 20,
    lastUpdated: "2 hours ago",
    type: "4",
  },
  {
    id: "mb-3",
    title: "Men's Face Cap",
    description: "Description",
    designCount: 20,
    lastUpdated: "2 hours ago",
    type: "mansory",
  },
];

const MoodBoard = () => {
  const [moodboards, setMoodboards] =
    useState<MoodboardItem[]>(DUMMY_MOODBOARDS);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewMoodboard, setPreviewMoodboard] =
    useState<MoodboardItem | null>(null);
  const [addMoodboardOpen, setAddMoodboardOpen] = useState(false);
  const [createNewOpen, setCreateNewOpen] = useState(false);

  const handleAddMoodboard = () => {
    setAddMoodboardOpen(true);
  };

  const handleAddMoodboardSelect = (source: "existing" | "new") => {
    setAddMoodboardOpen(false);
    if (source === "new") {
      setCreateNewOpen(true);
      return;
    }
    setMoodboards((prev) => [
      ...prev,
      {
        id: `mb-${Date.now()}`,
        title: "New Moodboard",
        description: "Description",
        designCount: 0,
        lastUpdated: "Just now",
        type: "3",
      },
    ]);
  };

  const handleCreateMoodboard = (data: CreateMoodboardData) => {
    setMoodboards((prev) => [
      ...prev,
      {
        id: `mb-${Date.now()}`,
        title: data.title,
        description: data.description,
        designCount: 0,
        lastUpdated: "Just now",
        type: data.layoutStyle,
      },
    ]);
  };

  const handleRemove = (id: string) => {
    setMoodboards((prev) => prev.filter((m) => m.id !== id));
  };

  const handlePreview = (item: MoodboardItem) => {
    setPreviewMoodboard(item);
    setPreviewOpen(true);
  };

  return (
    <div>
      <AddNewMoodboard
        open={addMoodboardOpen}
        onOpenChange={setAddMoodboardOpen}
        onSelect={handleAddMoodboardSelect}
      />
      <CreateNew
        open={createNewOpen}
        onOpenChange={setCreateNewOpen}
        onCreate={handleCreateMoodboard}
      />
      <MoodboardPreview
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        moodboard={previewMoodboard}
      />
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground">Moodboards</h3>
        <Button
          variant="ghost"
          className="font-semibold text-primary hover:bg-primary/10 hover:text-primary rounded-xl h-10 px-4 gap-2"
          onClick={handleAddMoodboard}
        >
          <IconPlus className="size-4" />
          Add Moodboard
        </Button>
      </div>

      <div className="space-y-4">
        {moodboards.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-[#E5E7EB] p-4 flex items-start justify-between gap-4"
          >
            <div className="flex gap-3 min-w-0 flex-1">
              <IconPalette className="size-5 text-primary" />
              <div className="min-w-0">
                <p className="text-sm font-bold text-foreground">
                  {item.title}
                </p>
                <p className="text-sm text-[#9AA4B2] mt-0.5">
                  {item.description}
                </p>
                <p className="text-xs text-[#9AA4B2] mt-1">
                  <strong>{item.designCount} </strong>
                  Designs • Last updated {item.lastUpdated}
                </p>
                <button
                  type="button"
                  onClick={() => handlePreview(item)}
                  className="flex items-center gap-1.5 mt-3 text-sm font-medium text-primary hover:underline"
                >
                  <IconEye className="size-4" />
                  Preview
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(item.id)}
              className="shrink-0 text-[#9AA4B2] hover:text-foreground p-2 transition-colors"
              aria-label="Delete moodboard"
            >
              <IconTrash className="size-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodBoard;
