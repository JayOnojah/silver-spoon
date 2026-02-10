"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";

export interface CreateUngroupedTodoFormData {
  title: string;
  description: string;
}

interface CreateUngroupedTodosProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: CreateUngroupedTodoFormData) => void;
}

export const CreateUngroupedTodos = ({
  open,
  onOpenChange,
  onSubmit,
}: CreateUngroupedTodosProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const canSubmit = title.trim() && description.trim();

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit?.({
      title: title.trim(),
      description: description.trim(),
    });
    onOpenChange(false);
    setTitle("");
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle className="text-left font-bold text-foreground">
            Create Ungrouped Todos & Tasks
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-[#475467]">
              Title <span className="text-[#F74F25]">*</span>
            </Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
              className="h-10 rounded-lg border-[#D0D5DD] bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-[#475467]">
              Description <span className="text-[#F74F25]">*</span>
            </Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Short Description..."
              className="min-h-20 rounded-lg border-[#D0D5DD] bg-white resize-none"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full h-11 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
          >
            Add Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
