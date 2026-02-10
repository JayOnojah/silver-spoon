"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  MessageSquareMore,
  Send,
  Copy,
} from "lucide-react";
import {
  Edit,
  Share,
  Trash,
} from "@/src/components/_core/dashboard/design-operations/svg";
import { MentionPopover } from "@/src/components/_core/dashboard/order/order-details/measurement/note/mention-popover";

const MENTION_STAFF = [
  { id: "s1", name: "Sarah Jones" },
  { id: "s2", name: "John Doe" },
  { id: "s3", name: "Einstein Oyakhilome" },
  { id: "s4", name: "Jane Smith" },
  { id: "s5", name: "Mike Johnson" },
  { id: "s6", name: "Anna Lee" },
];

export interface Comment {
  id: number;
  author: string;
  authorInitial: string;
  content: string;
  mentions?: string[];
  timestamp: string;
  date: "Yesterday" | "Today";
}

const TEAM_AVATARS = [
  { initial: "SJ", color: "bg-blue-500" },
  { initial: "JD", color: "bg-green-500" },
  { initial: "EO", color: "bg-purple-500" },
  { initial: "MA", color: "bg-orange-500" },
  { initial: "AK", color: "bg-red-500" },
  { initial: "LW", color: "bg-green-600" },
];

const DUMMY_COMMENTS: Comment[] = [
  {
    id: 1,
    author: "Einstein Oyakhilome",
    authorInitial: "E",
    content:
      "Love the lace overlay idea! Can we also consider adding some pearl detailing?",
    timestamp: "1 hour ago",
    date: "Yesterday",
  },
  {
    id: 2,
    author: "Einstein Oyakhilome",
    authorInitial: "E",
    content:
      "Love the lace overlay idea! Can we also consider adding some pearl detailing?",
    mentions: ["Sarah Jones", "Einstein Oyakhilome"],
    timestamp: "1 hour ago",
    date: "Yesterday",
  },
  {
    id: 3,
    author: "Einstein Oyakhilome",
    authorInitial: "E",
    content:
      "Love the lace overlay idea! Can we also consider adding some pearl detailing?",
    timestamp: "1 hour ago",
    date: "Yesterday",
  },
  {
    id: 4,
    author: "Einstein Oyakhilome",
    authorInitial: "E",
    content:
      "Love the lace overlay idea! Can we also consider adding some pearl detailing?",
    timestamp: "1 hour ago",
    date: "Today",
  },
  {
    id: 5,
    author: "Einstein Oyakhilome",
    authorInitial: "E",
    content:
      "Love the lace overlay idea! Can we also consider adding some pearl detailing?",
    mentions: ["Sarah Jones", "Einstein Oyakhilome"],
    timestamp: "1 hour ago",
    date: "Today",
  },
  {
    id: 6,
    author: "Einstein Oyakhilome",
    authorInitial: "E",
    content:
      "Love the lace overlay idea! Can we also consider adding some pearl detailing?",
    timestamp: "1 hour ago",
    date: "Today",
  },
];

const NOTE_BODY =
  "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.";

interface ChatDetailsContentProps {
  discussionId?: string;
}

export default function ChatDetailsContent({
  discussionId,
}: ChatDetailsContentProps) {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cursorAfterMentionRef = useRef<number | null>(null);

  const [newComment, setNewComment] = useState("");
  const [comments] = useState<Comment[]>(DUMMY_COMMENTS);
  const [mentionPopoverOpen, setMentionPopoverOpen] = useState(false);
  const [mentionStartIndex, setMentionStartIndex] = useState(0);
  const [mentionQuery, setMentionQuery] = useState("");
  const [mentionPopoverSearch, setMentionPopoverSearch] = useState("");

  const filteredMentionStaff = MENTION_STAFF.filter((s) =>
    s.name.toLowerCase().includes(mentionPopoverSearch.toLowerCase()),
  );

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const cursor = e.target.selectionStart ?? value.length;
    setNewComment(value);

    const textBeforeCursor = value.slice(0, cursor);
    const lastAt = textBeforeCursor.lastIndexOf("@");
    if (lastAt === -1) {
      setMentionPopoverOpen(false);
      return;
    }
    const fromAtToCursor = textBeforeCursor.slice(lastAt + 1);
    if (fromAtToCursor.includes(" ") || fromAtToCursor.includes("\n")) {
      setMentionPopoverOpen(false);
      return;
    }
    setMentionStartIndex(lastAt);
    setMentionQuery(fromAtToCursor);
    setMentionPopoverSearch(fromAtToCursor);
    setMentionPopoverOpen(true);
    cursorAfterMentionRef.current = cursor;
  };

  const handleSelectMention = (staff: { id: string; name: string }) => {
    const cursor = cursorAfterMentionRef.current ?? mentionStartIndex + 1;
    const before = newComment.slice(0, mentionStartIndex);
    const after = newComment.slice(cursor);
    const insertion = `@${staff.name} `;
    const newValue = before + insertion + after;
    setNewComment(newValue);
    setMentionPopoverOpen(false);
    cursorAfterMentionRef.current = null;
    const newCursor = mentionStartIndex + insertion.length;
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(newCursor, newCursor);
    }, 0);
  };

  useEffect(() => {
    if (!mentionPopoverOpen) {
      cursorAfterMentionRef.current = null;
      setMentionPopoverSearch("");
    }
  }, [mentionPopoverOpen]);

  const yesterdayComments = comments.filter((c) => c.date === "Yesterday");
  const todayComments = comments.filter((c) => c.date === "Today");

  const renderCommentList = (items: Comment[]) =>
    items.map((comment) => (
      <div key={comment.id} className="py-4 bg-transparent">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10 shrink-0 border-2 border-white">
            <AvatarFallback className="text-white font-medium bg-[#669F2A] text-sm">
              {comment.authorInitial}
            </AvatarFallback>
          </Avatar>
          <div className="inline-block bg-white p-4 rounded-xl md:max-w-[70%] wrap-break-word whitespace-pre-wrap border border-[#E5E7EB]">
            <div className="font-medium text-[#121926] text-sm mb-1">
              {comment.author}
            </div>
            <p className="text-[#4B5565] text-sm leading-relaxed">
              {comment.content}
              {comment.mentions?.map((mention, idx) => (
                <span key={idx} className="text-[#F74F25] ml-1">
                  @{mention}
                </span>
              ))}
            </p>
          </div>
        </div>
        <span className="text-xs text-[#9AA4B2] ml-12 block mt-1">
          {comment.timestamp}
        </span>
      </div>
    ));

  return (
    <div className="min-h-screen bg-[#FFF1EC] font-sans">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#0D0D0D] hover:text-gray-900 font-medium"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="flex items-center gap-0">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-[#9AA4B2] hover:bg-white hover:text-foreground rounded-full h-9 w-9"
            aria-label="Edit"
          >
            <Edit />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-[#9AA4B2] hover:bg-white hover:text-foreground rounded-full h-9 w-9"
            aria-label="Share"
          >
            <Share />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-[#9AA4B2] hover:bg-white hover:text-foreground rounded-full h-9 w-9"
            aria-label="Copy"
          >
            <Copy size={20} className="text-[#9AA4B2]" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-[#9AA4B2] hover:bg-white hover:text-foreground rounded-full h-9 w-9"
            aria-label="Delete"
          >
            <Trash />
          </Button>
        </div>
      </div>

      {/* Main content card */}
      <div className="bg-white my-6 p-6 rounded-3xl border border-[#E5E7EB]/50 shadow-sm">
        {/* Discussion header */}
        <div className="mb-6">
          <div className="flex gap-3 mb-3">
            <FileText
              className="text-[#F74F25] shrink-0 mt-0.5"
              size={28}
              strokeWidth={1.5}
            />
            <div className="min-w-0">
              <h1 className="font-semibold text-[#121926] text-lg mb-1">
                Discussion About Sarah&apos;s Design
              </h1>
              <p className="text-[#9AA4B2] text-sm">
                Brainstorming on possible ideas and concept regarding
                sarah&apos;s red carpet event
              </p>
            </div>
          </div>
          {/* Team members */}
          <div className="flex items-center gap-2 text-[#9AA4B2]">
            <div className="flex -space-x-3">
              {TEAM_AVATARS.map((member, index) => (
                <Avatar
                  key={index}
                  className="w-8 h-8 border-2 border-white shrink-0"
                >
                  <AvatarFallback
                    className={`text-white text-xs font-medium ${member.color}`}
                  >
                    {member.initial}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-sm">6 team members</span>
          </div>
        </div>

        {/* Note card */}
        <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFA]/50 p-4 mb-6">
          <div className="text-sm font-medium text-[#9AA4B2] mb-2">Note</div>
          <p className="text-[#121926] text-sm leading-relaxed">{NOTE_BODY}</p>
        </div>
      </div>

      {/* Comments section */}
      <div className="overflow-hidden">
        <div className="px-4 pt-4 pb-2 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            <MessageSquareMore size={20} className="text-[#4B5565]" />
            <h2 className="font-semibold text-[#121926]">
              Comments ({comments.length})
            </h2>
          </div>
        </div>

        <div className="px-4 pb-16">
          {yesterdayComments.length > 0 && (
            <>
              <div className="py-3 flex items-center gap-2">
                <div className="flex-1 border-b border-[#9AA4B2]/60" />
                <span className="text-xs font-medium text-[#9AA4B2] shrink-0">
                  Yesterday
                </span>
                <div className="flex-1 border-b border-[#9AA4B2]/60" />
              </div>
              {renderCommentList(yesterdayComments)}
            </>
          )}
          {todayComments.length > 0 && (
            <>
              <div className="py-3 flex items-center gap-2">
                <div className="flex-1 border-b border-[#9AA4B2]/60" />
                <span className="text-xs font-medium text-[#9AA4B2] shrink-0">
                  Today
                </span>
                <div className="flex-1 border-b border-[#9AA4B2]/60" />
              </div>
              {renderCommentList(todayComments)}
            </>
          )}
        </div>

        {/* Comment input (fixed at bottom of section) */}
        <div className="p-4 fixed bottom-0 w-full md:w-[calc(100%-260px)] -translate-x-4 border-t border-[#E5E7EB] bg-white">
          <div className="flex gap-3 items-end">
            <MentionPopover
              open={mentionPopoverOpen}
              onOpenChange={setMentionPopoverOpen}
              searchValue={mentionPopoverSearch}
              onSearchValueChange={setMentionPopoverSearch}
              items={filteredMentionStaff}
              onSelect={handleSelectMention}
            >
              <div className="flex-1 relative">
                <Textarea
                  ref={textareaRef}
                  placeholder="Add a comment...Use @ to mention teams"
                  value={newComment}
                  onChange={handleCommentChange}
                  onSelect={(e) => {
                    const cursor = (e.target as HTMLTextAreaElement)
                      .selectionStart;
                    cursorAfterMentionRef.current = cursor;
                  }}
                  className="w-full min-h-11 rounded-xl max-h-32 text-sm resize-none border-[#D0D5DD] focus:border-[#F74F25] focus-visible:ring-[#F74F25]"
                  rows={1}
                />
              </div>
            </MentionPopover>
            <Button
              type="button"
              size="icon"
              className="bg-[#F74F25] hover:bg-[#F74F25]/90 text-white rounded-full h-11 w-11 shrink-0"
              aria-label="Send"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
