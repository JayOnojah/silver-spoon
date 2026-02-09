"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { NoteCard, type NoteItem } from "./note-card";
import { EmptyNote } from "./empty-note";
import CreateNote, { type CreateNoteFormData } from "./create-note";

export type { NoteItem };

const DUMMY_NOTES: NoteItem[] = [
  {
    id: "n1",
    title: "Discussion About Sarah's Design",
    description:
      "Brainstorming on possible ideas and concept regarding sarah's red carpet event",
    commentCount: 45,
    lastUpdated: "1 day Ago",
  },
  {
    id: "n2",
    title: "Discussion About Sarah's Design",
    description:
      "Brainstorming on possible ideas and concept regarding sarah's red carpet event",
    commentCount: 45,
    lastUpdated: "1 day Ago",
  },
];

const Notes = () => {
  const router = useRouter();
  const [notes, setNotes] = useState<NoteItem[]>(DUMMY_NOTES);
  const [createNoteOpen, setCreateNoteOpen] = useState(false);

  const handleAddNote = () => setCreateNoteOpen(true);

  const handleViewDiscussion = (id: string) => {
    router.push(`/dashboard/orders/order-discussions/${id}`);
  };

  const handleCreateNoteSubmit = (data: CreateNoteFormData) => {
    const newNote: NoteItem = {
      id: `n${Date.now()}`,
      title: data.title,
      description: data.description,
      commentCount: 0,
      lastUpdated: "Just now",
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleEdit = (_id: string) => {
    // TODO: open Edit dialog
  };

  const handleDelete = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Notes</h3>
        <Button
          onClick={handleAddNote}
          variant="ghost"
          className="font-semibold text-primary hover:bg-primary/10 hover:text-primary rounded-xl h-10 px-4 gap-2"
        >
          <IconPlus className="size-4" />
          Add Notes
        </Button>
      </div>

      {notes.length === 0 ? (
        <EmptyNote onAddClick={handleAddNote} />
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onView={handleViewDiscussion}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <CreateNote
        open={createNoteOpen}
        onOpenChange={setCreateNoteOpen}
        onSubmit={handleCreateNoteSubmit}
      />
    </div>
  );
};

export default Notes;
