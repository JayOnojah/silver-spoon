import { IconFileText, IconPlus } from "@tabler/icons-react";
import { Button } from "@/src/components/ui/button";

interface EmptyNoteProps {
  onAddClick?: () => void;
}

export function EmptyNote({ onAddClick }: EmptyNoteProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <IconFileText
        className="size-16 text-primary mb-4"
        stroke={1.5}
        aria-hidden
      />
      <p className="text-lg font-bold text-foreground mb-2">No Note Added Yet</p>
      <p className="text-sm text-[#6B7280] max-w-sm mb-6">
        Use notes to capture decisions, ideas, and discussions related to this
        order
      </p>
      <Button
        onClick={onAddClick}
        className="rounded-xl bg-primary text-white hover:bg-primary/90 font-semibold gap-2 h-10 px-4"
      >
        <IconPlus className="size-4" />
        Add Notes
      </Button>
    </div>
  );
}
