"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Search,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/src/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

// Staff list
const staffMembers = [
  { id: "sarah1", name: "Sarah Jones" },
  { id: "john", name: "John Doe" },
  { id: "jane", name: "Jane Smith" },
  { id: "mike", name: "Mike Johnson" },
  { id: "sarah2", name: "Sarah Williams" },
];

export default function AddNoteModal({ triggerText }: { triggerText: string }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);
  const [staffSearch, setStaffSearch] = useState("");
  const [textFormat, setTextFormat] = useState("Normal");
  const [staffPopoverOpen, setStaffPopoverOpen] = useState(false);

  // Initialize Tiptap editor
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#F74F25] underline",
        },
      }),
      Placeholder.configure({
        placeholder: "Add a comment...Use @ to mention teams",
      }),
    ],
    content: note,
    onUpdate: ({ editor }) => {
      setNote(editor.getHTML());
    },
  });

  const handleSubmit = () => {
    console.log({
      title,
      description,
      note,
      staff: selectedStaff,
      textFormat,
    });
    setOpen(false);
  };

  const setLink = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

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

  const toggleStaff = (staffId: string) => {
    setSelectedStaff((prev) =>
      prev.includes(staffId)
        ? prev.filter((id) => id !== staffId)
        : [...prev, staffId],
    );
  };

  const filteredStaff = staffMembers.filter((staff) =>
    staff.name.toLowerCase().includes(staffSearch.toLowerCase()),
  );

  if (!editor) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span>{triggerText}</span>
      </DialogTrigger>

      <DialogContent className="md:max-w-xl rounded-4xl bg-white p-0 gap-0 max-h-[90vh] overflow-y-auto font-sans">
        <DialogHeader className="px-8 py-8 pb-6">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-black text-[#121926]">
                Edit Note
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="px-8 pb-6 space-y-5">
          {/* Title */}
          <div>
            <Label className="font-medium text-[#4B5565] mb-2 block">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-12 text-[#121926] rounded-xl border border-[#CDD5DF] placeholder:text-[#9AA4B2]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-medium text-[#4B5565] mb-2 block">
              Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              placeholder="Enter Short Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-25 rounded-xl border-[#CDD5DF] border resize-none text-[#121926] placeholder:text-[#9AA4B2]"
            />
          </div>

          {/* Note with Rich Text Editor */}
          <div>
            <Label className="font-medium text-[#4B5565] mb-2 block">
              Note <span className="text-red-500">*</span>
            </Label>
            <div className="border border-[#E3E3E3] rounded-lg overflow-hidden">
              {/* Toolbar */}
              <div className="bg-white p-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-2 hover:bg-gray-100 rounded transition-colors ${
                    editor.isActive("bold") ? "bg-gray-200" : ""
                  }`}>
                  <Bold className="w-4 h-4 text-[#1D1D1D]" strokeWidth={4} />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-2 hover:bg-gray-100 rounded transition-colors ${
                    editor.isActive("italic") ? "bg-gray-200" : ""
                  }`}>
                  <Italic className="w-4 h-4 text-[#1D1D1D]" strokeWidth={4} />
                </button>
                <button
                  type="button"
                  onClick={setLink}
                  className={`p-2 hover:bg-gray-100 rounded transition-colors ${
                    editor.isActive("link") ? "bg-gray-200" : ""
                  }`}>
                  <LinkIcon
                    className="w-4 h-4 text-[#1D1D1D]"
                    strokeWidth={3}
                  />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={`p-2 hover:bg-gray-100 rounded transition-colors ${
                    editor.isActive("bulletList") ? "bg-gray-200" : ""
                  }`}>
                  <List className="w-4 h-4 text-[#1D1D1D]" strokeWidth={3} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={`p-2 hover:bg-gray-100 rounded transition-colors ${
                    editor.isActive("orderedList") ? "bg-gray-200" : ""
                  }`}>
                  <ListOrdered
                    className="w-4 h-4 text-[#1D1D1D]"
                    strokeWidth={3}
                  />
                </button>
              </div>

              {/* Format Dropdown */}
              <div className="pb-4 border-b mx-4">
                <Select value={textFormat} onValueChange={handleFormatChange}>
                  <SelectTrigger className="w-full rounded-2xl h-10 text-[#121926]">
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

              {/* Tiptap Editor */}
              <EditorContent
                editor={editor}
                className="text-[#121926] min-h-50"
              />
            </div>
          </div>

          {/* Assign Staff */}
          <div>
            <Label className="font-medium text-[#4B5565] mb-2 block">
              Assign Staff <span className="text-red-500">*</span>
            </Label>
            <Popover
              open={staffPopoverOpen}
              onOpenChange={setStaffPopoverOpen}
              modal={true}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="w-full h-12 px-4 rounded-xl border border-[#CDD5DF] flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors">
                  <span className="text-[#9AA4B2] text-sm">Select Staff</span>
                  <div className="flex items-center gap-2">
                    {selectedStaff.length > 0 && (
                      <span className="bg-[#F74F25] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                        {selectedStaff.length}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-[#9AA4B2]" />
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-(--radix-popover-trigger-width) p-0"
                align="start"
                sideOffset={5}
                onPointerDownOutside={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.closest('[role="dialog"]')) {
                    e.preventDefault();
                  }
                }}>
                <div className="p-3 border-b">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#9AA4B2]"
                      strokeWidth={1}
                    />
                    <Input
                      placeholder="Search Team Member"
                      value={staffSearch}
                      onChange={(e) => setStaffSearch(e.target.value)}
                      className="pl-10 h-10 border-[#F74F25]"
                    />
                  </div>
                </div>
                <div className="max-h-50 overflow-y-auto">
                  {filteredStaff.map((staff) => (
                    <div
                      key={staff.id}
                      className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-0"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        toggleStaff(staff.id);
                      }}>
                      <span className="text-[#9AA4B2]">{staff.name}</span>
                      <Checkbox
                        checked={selectedStaff.includes(staff.id)}
                        className="data-[state=checked]:bg-[#F74F25] rounded-full data-[state=checked]:border-[#F74F25] pointer-events-none"
                      />
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          {/* Submit Button */}
          <Button
            disabled={
              !title || !description || !note || selectedStaff.length === 0
            }
            onClick={handleSubmit}
            className="w-full h-12 font-bold bg-[#F74F25] hover:bg-[#E63E15] text-white rounded-xl transition-colors">
            Update Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
