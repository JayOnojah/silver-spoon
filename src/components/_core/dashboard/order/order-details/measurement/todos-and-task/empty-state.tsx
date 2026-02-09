import { IconAlarm, IconPlus } from "@tabler/icons-react";
import { Button } from "@/src/components/ui/button";

interface TodosEmptyStateProps {
  onAddClick?: () => void;
}

export function TodosEmptyState({ onAddClick }: TodosEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <IconAlarm className="size-16 text-primary mb-4" stroke={1.5} />
      <p className="text-lg font-bold text-foreground mb-2">
        No Todos & Tasks Added Yet
      </p>
      <p className="text-sm text-[#6B7280] max-w-sm mb-6">
        Create tasks to track work, assign responsibilities, and keep this order
        moving
      </p>
      <Button
        onClick={onAddClick}
        className="rounded-xl bg-primary text-white hover:bg-primary/90 font-semibold gap-2 h-10 px-4"
      >
        <IconPlus className="size-4" />
        Add Todos & Tasks
      </Button>
    </div>
  );
}
