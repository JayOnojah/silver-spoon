"use client";

import { useState, useEffect } from "react";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  IconSearch,
  IconChevronDown,
} from "@tabler/icons-react";
import { Bold, Italic, List, ListOrdered, Link as LinkIcon } from "lucide-react";

const MOCK_STAFF = [
  { id: "s1", name: "Sarah Jones" },
  { id: "s2", name: "John Doe" },
  { id: "s3", name: "Jane Smith" },
  { id: "s4", name: "Mike Johnson" },
];

export interface CreateNoteFormData {
  title: string;
  description: string;
  note: string;
  assignStaffIds: string[];
}

interface CreateNoteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: CreateNoteFormData) => void;
}

export default function CreateNote({
  open,
  onOpenChange,
  onSubmit,
}: CreateNoteProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignStaffIds, setAssignStaffIds] = useState<string[]>([]);
  const [staffSearch, setStaffSearch] = useState("");
  const [textFormat, setTextFormat] = useState("Normal");
  const [staffPopoverOpen, setStaffPopoverOpen] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-primary underline" },
      }),
      Placeholder.configure({
        placeholder: "Add a comment...Use @ to mention teams",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "min-h-[120px] px-4 py-3 text-sm text-foreground outline-none prose prose-sm max-w-none",
      },
    },
  });

  useEffect(() => {
    if (!open) {
      setTitle("");
      setDescription("");
      setAssignStaffIds([]);
      setStaffSearch("");
      setTextFormat("Normal");
      editor?.commands.setContent("");
    }
  }, [open, editor]);

  const filteredStaff = MOCK_STAFF.filter((s) =>
    s.name.toLowerCase().includes(staffSearch.toLowerCase()),
  );

  const noteHtml = editor?.getHTML() ?? "";
  const hasNote = noteHtml && noteHtml !== "<p></p>";
  const canSubmit =
    title.trim() &&
    description.trim() &&
    hasNote &&
    assignStaffIds.length > 0;

  const handleSubmit = () => {
    if (!canSubmit || !editor) return;
    onSubmit?.({
      title: title.trim(),
      description: description.trim(),
      note: editor.getHTML(),
      assignStaffIds,
    });
    onOpenChange(false);
  };

  const setLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl);
    if (url === null) return;
    if (url === "")
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    else
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const handleFormatChange = (value: string) => {
    if (!editor) return;
    setTextFormat(value);
    switch (value) {
      case "Heading 1":
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case "Heading 2":
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case "Heading 3":
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      default:
        editor.chain().focus().setParagraph().run();
    }
  };

  const toggleStaff = (id: string) => {
    setAssignStaffIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  if (!editor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-left text-xl font-bold text-foreground">
            Add A Note
          </DialogTitle>
          <p className="text-sm text-[#6B7280]">
            Start by adding a title and description
          </p>
        </DialogHeader>

        <div className="space-y-4 pt-2">
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
              Note <span className="text-[#F74F25]">*</span>
            </Label>
            <div className="rounded-lg border border-[#E5E7EB] overflow-hidden bg-white">
              <div className="flex items-center gap-1 p-2 border-b border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-2 rounded hover:bg-[#F3F4F6] ${editor.isActive("bold") ? "bg-[#E5E7EB]" : ""}`}
                >
                  <Bold className="size-4 text-foreground" strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-2 rounded hover:bg-[#F3F4F6] ${editor.isActive("italic") ? "bg-[#E5E7EB]" : ""}`}
                >
                  <Italic className="size-4 text-foreground" strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  onClick={setLink}
                  className={`p-2 rounded hover:bg-[#F3F4F6] ${editor.isActive("link") ? "bg-[#E5E7EB]" : ""}`}
                >
                  <LinkIcon className="size-4 text-foreground" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={`p-2 rounded hover:bg-[#F3F4F6] ${editor.isActive("bulletList") ? "bg-[#E5E7EB]" : ""}`}
                >
                  <List className="size-4 text-foreground" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  className={`p-2 rounded hover:bg-[#F3F4F6] ${editor.isActive("orderedList") ? "bg-[#E5E7EB]" : ""}`}
                >
                  <ListOrdered className="size-4 text-foreground" strokeWidth={2} />
                </button>
              </div>
              <div className="px-3 pb-3 mt-2">
                <Select value={textFormat} onValueChange={handleFormatChange}>
                  <SelectTrigger className="h-9 w-full rounded-lg border-[#E5E7EB]">
                    <SelectValue placeholder="Normal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Heading 1">Heading 1</SelectItem>
                    <SelectItem value="Heading 2">Heading 2</SelectItem>
                    <SelectItem value="Heading 3">Heading 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <EditorContent editor={editor} />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-[#475467]">
              Assign Staff <span className="text-[#F74F25]">*</span>
            </Label>
            <Popover
              open={staffPopoverOpen}
              onOpenChange={(o) => {
                setStaffPopoverOpen(o);
                if (!o) setStaffSearch("");
              }}
            >
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="h-10 w-full flex items-center justify-between rounded-lg border border-[#D0D5DD] bg-white px-3 text-left text-sm hover:bg-[#F9FAFB]"
                >
                  <span className={assignStaffIds.length ? "text-foreground" : "text-[#9AA4B2]"}>
                    {assignStaffIds.length === 0
                      ? "Select Staff"
                      : `${assignStaffIds.length} staff selected`}
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
                      value={staffSearch}
                      onChange={(e) => setStaffSearch(e.target.value)}
                      placeholder="Search Team Member"
                      className="h-9 pl-8 rounded-md border-[#D0D5DD] text-sm"
                    />
                  </div>
                </div>
                <div className="max-h-44 overflow-y-auto p-1">
                  {filteredStaff.map((staff) => (
                    <button
                      key={staff.id}
                      type="button"
                      onClick={() => toggleStaff(staff.id)}
                      className="w-full flex items-center justify-between gap-2 px-2 py-2 rounded-md text-left text-sm hover:bg-[#F9FAFB]"
                    >
                      <span>{staff.name}</span>
                      <Checkbox
                        checked={assignStaffIds.includes(staff.id)}
                        className="pointer-events-none data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
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
            Add Note
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
