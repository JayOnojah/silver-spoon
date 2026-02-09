import { Checkbox } from "@/src/components/ui/checkbox";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import type { TodoTask } from "./index";

interface UngroupedTaskProps {
  task: TodoTask;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const UngroupedTask = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}: UngroupedTaskProps) => {
  return (
    <div className=" p-4 rounded-xl space-y-2 bg-[#FEF9F7F9]">
      <div className="flex items-center justify-between gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task.id)}
          className="mt-0.5 rounded border-[#9AA4B2] data-[state=checked]:bg-primary data-[state=checked]:border-primary size-5 shrink-0"
        />
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => onEdit(task.id)}
            className="p-2 text-[#9AA4B2] hover:text-foreground rounded-md transition-colors"
            aria-label="Edit task"
          >
            <IconPencil className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="p-2 text-[#9AA4B2] hover:text-foreground rounded-md transition-colors"
            aria-label="Delete task"
          >
            <IconTrash className="size-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-foreground">{task.title}</p>
        <p className="text-sm text-[#6B7280] mt-0.5">{task.description}</p>
      </div>
    </div>
  );
};
