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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface CreateGroupedTodoFormData {
  groupName: string;
  title: string;
  description: string;
  assignStaffId: string;
}

const MOCK_STAFF_GROUPS = [
  { value: "group-1", label: "Design Team" },
  { value: "group-2", label: "Production Team" },
  { value: "group-3", label: "Quality Check" },
];

interface CreateGroupedTodosProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: CreateGroupedTodoFormData) => void;
}

export const CreateGroupedTodos = ({
  open,
  onOpenChange,
  onSubmit,
}: CreateGroupedTodosProps) => {
  const [groupName, setGroupName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignStaffId, setAssignStaffId] = useState("");

  const canSubmit =
    groupName.trim() &&
    title.trim() &&
    description.trim() &&
    assignStaffId;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit?.({
      groupName: groupName.trim(),
      title: title.trim(),
      description: description.trim(),
      assignStaffId,
    });
    onOpenChange(false);
    setGroupName("");
    setTitle("");
    setDescription("");
    setAssignStaffId("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle className="text-left font-bold text-foreground">
            Create Group Tasks & Todos
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-[#475467]">
              Group Name <span className="text-[#F74F25]">*</span>
            </Label>
            <Input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter Group Name"
              className="h-10 rounded-lg border-[#D0D5DD] bg-white"
            />
          </div>

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

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-[#475467]">
              Assign Staff <span className="text-[#F74F25]">*</span>
            </Label>
            <Select value={assignStaffId} onValueChange={setAssignStaffId}>
              <SelectTrigger className="h-10 w-full rounded-lg border-[#D0D5DD] bg-white">
                <SelectValue placeholder="Select Group" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_STAFF_GROUPS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full h-11 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
          >
            Create Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
