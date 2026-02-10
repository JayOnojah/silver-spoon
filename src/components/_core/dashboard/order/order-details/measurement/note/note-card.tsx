import { IconFileText, IconMessageCircle, IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { DocSvg, EditSvg } from "../../../svg";

export interface NoteItem {
  id: string;
  title: string;
  description: string;
  commentCount: number;
  lastUpdated: string;
}

interface NoteCardProps {
  note: NoteItem;
  onView?: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NoteCard = ({ note, onView, onEdit, onDelete }: NoteCardProps) => {
  return (
    <div className="p-4 space-y-1.5 rounded-xl border border-[#E5E7EB]">
      <div className="flex gap-4 items-center justify-between">
        <div className="shrink-0 pt-0.5 text-primary">
          <IconFileText
            className="size-6 text-primary mb-4"
            stroke={1.5}
            aria-hidden
          />
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {onView && (
            <button
              type="button"
              onClick={() => onView(note.id)}
              className="p-2 text-[#9AA4B2] hover:text-foreground rounded-md transition-colors"
              aria-label="View discussion"
            >
              <IconEye className="size-6" />
            </button>
          )}
          <button
            type="button"
            onClick={() => onEdit(note.id)}
            className="p-2 text-[#9AA4B2] hover:text-foreground rounded-md transition-colors"
            aria-label="Edit note"
          >
            <EditSvg />
          </button>
          <button
            type="button"
            onClick={() => onDelete(note.id)}
            className="text-[#9AA4B2] hover:text-foreground rounded-md transition-colors"
            aria-label="Delete note"
          >
            <IconTrash className="size-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-foreground">{note.title}</p>
        <p className="text-sm text-[#6B7280] mt-1">{note.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="flex items-center gap-1.5 text-sm text-[#6B7280]">
            <IconMessageCircle className="size-4" />
            {note.commentCount}
          </span>
          <span className="text-sm text-[#6B7280]">{note.lastUpdated}</span>
        </div>
      </div>
    </div>
  );
};
