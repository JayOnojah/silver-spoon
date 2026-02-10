"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  IconPlus,
  IconPencil,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
  IconUsers,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { TodosEmptyState } from "./empty-state";
import { GroupedCard } from "./grouped-card";
import { UngroupedTask } from "./ungrouped-card";
import {
  CreateGroupedTodos,
  type CreateGroupedTodoFormData,
} from "./create-grouped-todos";
import {
  CreateUngroupedTodos,
  type CreateUngroupedTodoFormData,
} from "./create-ungrouped-todos";

export interface TodoTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface GroupedTask {
  id: string;
  groupTitle: string;
  teamMemberInitials: string[];
  teamMemberCount: number;
  subTitle: string;
  description: string;
  completed: boolean;
}

const DUMMY_TASKS: TodoTask[] = [
  {
    id: "1",
    title: "Task Title",
    description:
      "Create the dimensions for the Mr Obi's Cap. And confirm with the Vendor",
    completed: true,
  },
  {
    id: "2",
    title: "Task Title",
    description:
      "Create the dimensions for the Mr Obi's Cap. And confirm with the Vendor",
    completed: false,
  },
];

const DUMMY_GROUPED_TASKS: GroupedTask[] = [
  {
    id: "g1",
    groupTitle: "Group Incharge of Cap",
    teamMemberInitials: ["S", "S", "S", "S"],
    teamMemberCount: 8,
    subTitle: "Obi's Cap",
    description:
      "Create the dimensions for the Mr Obi's Cap. And confirm with the Vendor.",
    completed: true,
  },
  {
    id: "g2",
    groupTitle: "Group Incharge of Cap",
    teamMemberInitials: ["S", "S", "S", "S"],
    teamMemberCount: 8,
    subTitle: "Obi's Cap",
    description:
      "Create the dimensions for the Mr Obi's Cap. And confirm with the Vendor.",
    completed: false,
  },
];

const TOTAL_PAGES = 10;
const PAGE_SIZE = 5;
const MAX_VISIBLE_PAGES = 5;

const AVATAR_COLORS = [
  "bg-[#E0E7FF] text-[#4338CA]",
  "bg-[#FCE7F3] text-[#BE185D]",
  "bg-[#D1FAE5] text-[#047857]",
  "bg-[#FEF3C7] text-[#B45309]",
  "bg-[#E5E7EB] text-[#4B5563]",
];

export const TodosAndTask = () => {
  const [viewMode, setViewMode] = useState<"grouped" | "ungrouped">("grouped");
  const [tasks, setTasks] = useState<TodoTask[]>(DUMMY_TASKS);
  const [groupedTasks, setGroupedTasks] =
    useState<GroupedTask[]>(DUMMY_GROUPED_TASKS);
  const [currentPage, setCurrentPage] = useState(1);
  const [createGroupedOpen, setCreateGroupedOpen] = useState(false);
  const [createUngroupedOpen, setCreateUngroupedOpen] = useState(false);

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const toggleGroupComplete = (id: string) => {
    setGroupedTasks((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, completed: !g.completed } : g,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleDeleteGroup = (id: string) => {
    setGroupedTasks((prev) => prev.filter((g) => g.id !== id));
  };

  const handleAddTask = () => {
    if (viewMode === "grouped") setCreateGroupedOpen(true);
    else setCreateUngroupedOpen(true);
  };

  const handleCreateGroupedSubmit = (data: CreateGroupedTodoFormData) => {
    const initials = data.assignStaff
      .slice(0, 4)
      .map((m) => m.name.trim()[0]?.toUpperCase() ?? "?");
    setGroupedTasks((prev) => [
      ...prev,
      {
        id: `g-${Date.now()}`,
        groupTitle: data.groupName,
        teamMemberInitials: initials.length ? initials : ["S", "S", "S", "S"],
        teamMemberCount: data.assignStaff.length,
        subTitle: data.title,
        description: data.description,
        completed: false,
      },
    ]);
  };

  const handleCreateUngroupedSubmit = (data: CreateUngroupedTodoFormData) => {
    setTasks((prev) => [
      ...prev,
      {
        id: `t-${Date.now()}`,
        title: data.title,
        description: data.description,
        completed: false,
      },
    ]);
  };

  const handleEdit = (_id: string) => {
    // TODO: open Edit dialog
  };

  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(MAX_VISIBLE_PAGES / 2),
      TOTAL_PAGES - MAX_VISIBLE_PAGES + 1,
    ),
  );
  const endPage = Math.min(TOTAL_PAGES, startPage + MAX_VISIBLE_PAGES - 1);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div className="space-y-4">
      <CreateGroupedTodos
        open={createGroupedOpen}
        onOpenChange={setCreateGroupedOpen}
        onSubmit={handleCreateGroupedSubmit}
      />
      <CreateUngroupedTodos
        open={createUngroupedOpen}
        onOpenChange={setCreateUngroupedOpen}
        onSubmit={handleCreateUngroupedSubmit}
      />
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Todos & Tasks</h3>
        <Button
          onClick={handleAddTask}
          className="rounded-xl bg-primary text-white hover:bg-primary/90 font-semibold gap-2 h-10 px-4"
        >
          <IconPlus className="size-4" />
          Add Todos & Tasks
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-[#E5E7EB]">
        <button
          type="button"
          onClick={() => setViewMode("grouped")}
          className={cn(
            "pb-3 text-sm font-bold transition-colors border-b-2 -mb-px",
            viewMode === "grouped"
              ? "text-foreground border-primary"
              : "text-[#9AA4B2] border-transparent",
          )}
        >
          Grouped Todos & Tasks
        </button>
        <button
          type="button"
          onClick={() => setViewMode("ungrouped")}
          className={cn(
            "pb-3 text-sm font-bold transition-colors border-b-2 -mb-px",
            viewMode === "ungrouped"
              ? "text-foreground border-primary"
              : "text-[#9AA4B2] border-transparent",
          )}
        >
          Ungrouped Todos & Tasks
        </button>
      </div>

      {/* Empty state */}
      {((viewMode === "grouped" && groupedTasks.length === 0) ||
        (viewMode === "ungrouped" && tasks.length === 0)) && (
          <TodosEmptyState onAddClick={handleAddTask} />
        )}

      {/* Content: Grouped or Ungrouped */}
      {((viewMode === "grouped" && groupedTasks.length > 0) ||
        (viewMode === "ungrouped" && tasks.length > 0)) && (
          <>
            <div className="space-y-3">
              {viewMode === "grouped" ? (
                groupedTasks.map((group) => (
                  <GroupedCard
                    key={group.id}
                    group={group}
                    onToggleComplete={toggleGroupComplete}
                    onEdit={handleEdit}
                    onDelete={handleDeleteGroup}
                  />
                ))
              ) : (
                tasks.map((task) => (
                  <UngroupedTask
                    key={task.id}
                    task={task}
                    onToggleComplete={toggleComplete}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 pt-6 border-t border-[#E5E7EB]">
              <div className="text-sm text-[#4B5565]">
                Page {currentPage} of {TOTAL_PAGES}
              </div>
              <div className="flex items-center justify-center gap-2">
                {pageNumbers.map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      "size-8 rounded-full text-sm font-medium transition-colors",
                      currentPage === page
                        ? "bg-primary text-white"
                        : "text-foreground hover:bg-[#F9FAFB]",
                    )}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="size-8 rounded-full border border-[#E5E7EB] hover:bg-[#F9FAFB] disabled:opacity-50 text-[#9AA4B2]"
                >
                  <IconChevronLeft className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))
                  }
                  disabled={currentPage === TOTAL_PAGES}
                  className="size-8 rounded-full border border-[#E5E7EB] hover:bg-[#F9FAFB] disabled:opacity-50 text-[#4B5565]"
                >
                  <IconChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          </>
        )}
    </div>
  );
};
