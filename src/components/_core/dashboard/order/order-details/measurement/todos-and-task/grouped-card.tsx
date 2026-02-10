import { Checkbox } from "@/src/components/ui/checkbox";
import { IconPencil, IconTrash, IconUsers } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import type { GroupedTask } from "./index";

const AVATAR_COLORS = [
  "bg-[#E0E7FF] text-[#4338CA]",
  "bg-[#FCE7F3] text-[#BE185D]",
  "bg-[#D1FAE5] text-[#047857]",
  "bg-[#FEF3C7] text-[#B45309]",
  "bg-[#E5E7EB] text-[#4B5563]",
];

interface GroupedCardProps {
  group: GroupedTask;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const GroupedCard = ({
  group,
  onToggleComplete,
  onEdit,
  onDelete,
}: GroupedCardProps) => {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl border border-[#E5E7EB] bg-[#FFFBF9]/50">
      <Checkbox
        checked={group.completed}
        onCheckedChange={() => onToggleComplete(group.id)}
        className="mt-0.5 rounded border-[#9AA4B2] data-[state=checked]:bg-primary data-[state=checked]:border-primary size-5 shrink-0"
      />
            <div className="flex-1 min-w-0 space-y-1.5">
                <p className="text-sm font-bold text-foreground">
                    {group.groupTitle}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                    <IconUsers className="size-4 text-[#9AA4B2] shrink-0" />
                    <div className="flex items-center -space-x-2.5">
                        {group.teamMemberInitials.slice(0, 4).map((initial, i) => (
                            <span
                                key={i}
                                className={cn(
                                    "inline-flex size-8 items-center justify-center rounded-full text-sm font-semibold border-2 border-white shrink-0",
                                    AVATAR_COLORS[i % AVATAR_COLORS.length],
                                )}
                            >
                                {initial}
                            </span>
                        ))}
                        {group.teamMemberCount > 4 && (
                            <span className="inline-flex size-8 items-center justify-center rounded-full bg-[#E5E7EB] text-[#6B7280] text-sm font-medium border-2 border-white shrink-0">
                                +{group.teamMemberCount - 4}
                            </span>
                        )}
                    </div>
                    <span className="text-sm text-[#6B7280]">
                        {group.teamMemberCount} team members
                    </span>
                </div>
                <p className="text-sm text-[#6B7280] font-medium">
                    {group.subTitle}
                </p>
                <p className="text-sm text-[#6B7280]">{group.description}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
                <button
                    type="button"
                    onClick={() => onEdit(group.id)}
                    className="p-2 text-[#9AA4B2] hover:text-foreground rounded-md transition-colors"
                    aria-label="Edit group"
                >
                    <IconPencil className="size-4" />
                </button>
                <button
                    type="button"
                    onClick={() => onDelete(group.id)}
                    className="p-2 text-[#9AA4B2] hover:text-foreground rounded-md transition-colors"
                    aria-label="Delete group"
                >
                    <IconTrash className="size-4" />
                </button>
            </div>
        </div>
    );
};