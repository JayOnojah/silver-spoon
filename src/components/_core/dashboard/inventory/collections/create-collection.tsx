"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/components/ui/label";

interface CreateCollectionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate?: (name: string) => void;
}

export default function CreateCollection({
  open,
  onOpenChange,
  onCreate,
}: CreateCollectionProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed) {
      onCreate?.(trimmed);
      setName("");
      onOpenChange(false);
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) setName("");
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader className="text-left space-y-4">
          <DialogTitle className="text-xl font-bold text-[#121926]">
            Create Collection
          </DialogTitle>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#374151]">
                Collection Name <span className="text-destructive">*</span>
              </Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Collection Name"
                className="h-10 rounded-lg border-[#D0D5DD]"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={!name.trim()}
              className="w-full h-11 rounded-xl bg-primary text-white hover:bg-primary/90 font-bold disabled:opacity-50"
            >
              Create Collection
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
