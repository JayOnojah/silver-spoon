"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { IconSearch, IconCircleCheck, IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface CreateGroupedTodoFormData {
  groupName: string;
  title: string;
  description: string;
  assignStaffIds: string[];
  assignStaff: { id: string; name: string }[];
}

const MOCK_TEAM_MEMBERS = [
  { id: "tm-1", name: "Sarah Jones" },
  { id: "tm-2", name: "Sarah Jones" },
  { id: "tm-3", name: "Sarah Jones" },
  { id: "tm-4", name: "Sarah Jones" },
  { id: "tm-5", name: "Sarah Jones" },
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
  const [teamMemberSearch, setTeamMemberSearch] = useState("");
  const [assignStaffIds, setAssignStaffIds] = useState<string[]>([]);
  const [assignStaffPopoverOpen, setAssignStaffPopoverOpen] = useState(false);

  const selectedMembers = MOCK_TEAM_MEMBERS.filter((m) =>
    assignStaffIds.includes(m.id),
  );

  const toggleStaff = (id: string) => {
    setAssignStaffIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const filteredMembers = useMemo(() => {
    const q = teamMemberSearch.trim().toLowerCase();
    if (!q) return MOCK_TEAM_MEMBERS;
    return MOCK_TEAM_MEMBERS.filter((m) =>
      m.name.toLowerCase().includes(q),
    );
  }, [teamMemberSearch]);

  const canSubmit =
    groupName.trim() &&
    title.trim() &&
    description.trim() &&
    assignStaffIds.length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit?.({
      groupName: groupName.trim(),
      title: title.trim(),
      description: description.trim(),
      assignStaffIds,
      assignStaff: selectedMembers,
    });
    onOpenChange(false);
    setGroupName("");
    setTitle("");
    setDescription("");
    setTeamMemberSearch("");
    setAssignStaffIds([]);
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
            <Popover
              open={assignStaffPopoverOpen}
              onOpenChange={(open) => {
                setAssignStaffPopoverOpen(open);
                if (!open) setTeamMemberSearch("");
              }}
            >
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "h-10 w-full flex items-center justify-between gap-2 rounded-lg border bg-white px-3 text-left text-sm",
                    "border-[#D0D5DD] hover:border-[#9AA4B2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary",
                  )}
                >
                  <span
                    className={
                      selectedMembers.length > 0
                        ? "text-foreground"
                        : "text-[#9AA4B2]"
                    }
                  >
                    {selectedMembers.length === 0
                      ? "Select staff"
                      : selectedMembers.length <= 2
                        ? selectedMembers.map((m) => m.name).join(", ")
                        : `${selectedMembers.length} staff selected`}
                  </span>
                  <IconChevronDown className="size-4 text-[#9AA4B2] shrink-0" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-(--radix-popover-trigger-width) p-0 rounded-lg border-[#E5E7EB]"
                sideOffset={4}
              >
                <div className="p-2 border-b border-[#E5E7EB]">
                  <div className="relative">
                    <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-[#9AA4B2]" />
                    <Input
                      value={teamMemberSearch}
                      onChange={(e) => setTeamMemberSearch(e.target.value)}
                      placeholder="Search Team Member"
                      className="h-9 pl-8 rounded-md border-[#D0D5DD] bg-white text-sm"
                    />
                  </div>
                </div>
                <div className="max-h-44 overflow-y-auto p-1">
                  {filteredMembers.map((member) => (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => toggleStaff(member.id)}
                      className="w-full flex items-center justify-between gap-2 px-2 py-2 rounded-md text-left text-sm text-foreground hover:bg-[#F9FAFB] transition-colors"
                    >
                      <span>{member.name}</span>
                      {assignStaffIds.includes(member.id) ? (
                        <IconCircleCheck className="size-5 text-primary shrink-0" />
                      ) : (
                        <span className="size-5 rounded-full border-2 border-[#9AA4B2] shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
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
