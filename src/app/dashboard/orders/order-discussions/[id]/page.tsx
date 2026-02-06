"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  FileText,
  MessageSquareMore,
  Send,
  UsersRound,
} from "lucide-react";

import {
  Edit,
  Share,
  Trash,
} from "@/src/components/_core/dashboard/design-operations/svg";

interface Comment {
  id: number;
  author: string;
  content: string;
  mentions?: string[];
  timestamp: string;
  date: "Yesterday" | "Today";
}

export default function DiscussionPage() {
  const router = useRouter();
  const [newComment, setNewComment] = useState("");

  const teamMembers = [
    { initial: "SJ", color: "bg-[#22C55E]" },
    { initial: "JM", color: "bg-orange-500" },
    { initial: "MA", color: "bg-blue-500" },
    { initial: "AK", color: "bg-blue-400" },
    { initial: "+3", color: "bg-gray-400" },
  ];

  const comments: Comment[] = [
    {
      id: 1,
      author: "Einstein Oyakhilome",
      content:
        "Love the lace overlay idea! Can we also consider adding some pearl detailing?",
      timestamp: "1 hour ago",
      date: "Yesterday",
    },
    {
      id: 2,
      author: "Einstein Oyakhilome",
      content:
        "Love the lace overlay idea! Can we also consider adding some pearl detailing?",
      mentions: ["Sarah Jones", "Einstein Oyakhilome"],
      timestamp: "1 hour ago",
      date: "Yesterday",
    },
    {
      id: 3,
      author: "Einstein Oyakhilome",
      content:
        "Love the lace overlay idea! Can we also consider adding some pearl detailing?",
      timestamp: "1 hour ago",
      date: "Yesterday",
    },
    {
      id: 4,
      author: "Einstein Oyakhilome",
      content:
        "Love the lace overlay idea! Can we also consider adding some pearl detailing?",
      timestamp: "1 hour ago",
      date: "Today",
    },
    {
      id: 5,
      author: "Einstein Oyakhilome",
      content:
        "Love the lace overlay idea! Can we also consider adding some pearl detailing?",
      mentions: ["Sarah Jones", "Einstein Oyakhilome"],
      timestamp: "1 hour ago",
      date: "Today",
    },
    {
      id: 6,
      author: "Einstein Oyakhilome",
      content:
        "Love the lace overlay idea! Can we also consider adding some pearl detailing?",
      timestamp: "1 hour ago",
      date: "Today",
    },
  ];

  const yesterdayComments = comments.filter((c) => c.date === "Yesterday");
  const todayComments = comments.filter((c) => c.date === "Today");

  return (
    <div className="min-h-screen bg-[#FFF1EC] font-sans">
      {/* Header */}
      <div className="">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center cursor-pointer gap-2 text-[#0D0D0D] hover:text-gray-900"
          >
            <ArrowLeft size={16} />
            <span className="font-medium">Back</span>
          </button>

          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#9AA4B2] hover:bg-white rounded-full cursor-pointer"
            >
              <Edit />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#9AA4B2] hover:bg-white rounded-full cursor-pointer"
            >
              <Share />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#9AA4B2] hover:bg-white rounded-full cursor-pointer"
            >
              <Trash />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white my-8 p-6 rounded-3xl">
        {/* Discussion Header */}
        <div className="mb-6">
          <div className="flex flex-col items-start gap-3 mb-3">
            <FileText
              className="text-[#F74F25] mt-1"
              size={30}
              strokeWidth={1}
            />
            <div className="flex-1">
              <h1 className="font-semibold text-[#121926] mb-1">
                Discussion About Sarah's Design
              </h1>
              <p className="text-[#9AA4B2] text-sm">
                Brainstorming on possible ideas and concept regarding sarah's
                red carpet event
              </p>
            </div>
          </div>

          {/* Team Members */}
          <div className="flex items-center gap-2 text-[#9AA4B2]">
            <UsersRound />
            <div className="flex -space-x-3">
              {teamMembers.map((member, index) => (
                <Avatar key={index} className={`w-8 h-8 border-2 border-white`}>
                  <AvatarFallback
                    className={`text-white text-xs font-medium ${member.color}`}
                  >
                    {member.initial}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-sm">8 team members</span>
          </div>
        </div>

        {/* Note Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="text-sm text-[#9AA4B2] mb-3">Note</div>
          <p className="text-[#121926] text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
            consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum
            dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>
      </div>

      {/* Comment Section */}
      <div className="rounded-lg">
        <div className="border-gray-200">
          <div className="flex items-center gap-2">
            <MessageSquareMore size={20} className="text-gray-700" />
            <h2 className="font-semibold text-gray-900">
              Comments ({comments.length})
            </h2>
          </div>
        </div>

        {/* Yesterday Comments */}
        {yesterdayComments.length > 0 && (
          <div>
            <div className=" py-3 flex justify-between items-center gap-2">
              <div className="border-b w-full border-[#9AA4B2]"></div>
              <span className="text-xs font-medium text-[#9AA4B2]">
                Yesterday
              </span>
              <div className="border-b w-full border-[#9AA4B2]"></div>
            </div>
            {yesterdayComments.map((comment) => (
              <div key={comment.id} className="py-4 bg-transparent">
                <div className="flex gap-3">
                  <Avatar className="w-10 h-10 shrink-0">
                    <AvatarFallback className="text-white font-medium bg-[#669F2A]">
                      E
                    </AvatarFallback>
                  </Avatar>

                  <div
                    className="
      inline-block
      bg-white
      p-4
      rounded-xl
      md:max-w-[70%]
      wrap-break-word
      whitespace-pre-wrap
    "
                  >
                    <div className="font-medium text-gray-900 text-sm mb-1">
                      {comment.author}
                    </div>

                    <p className="text-gray-700 text-sm">
                      {comment.content}
                      {comment.mentions?.map((mention, idx) => (
                        <span key={idx} className="text-red-500 ml-1">
                          @{mention}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <span className="text-xs text-gray-400 ml-12">
                  {comment.timestamp}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Today Comments */}
        {todayComments.length > 0 && (
          <div>
            <div className="py-3 flex justify-between items-center gap-2">
              <div className="border-b w-full border-[#9AA4B2]"></div>
              <span className="text-xs font-medium text-[#9AA4B2]">Today</span>
              <div className="border-b w-full border-[#9AA4B2]"></div>
            </div>
            {todayComments.map((comment) => (
              <div key={comment.id} className="py-4 bg-transparent">
                <div className="flex gap-3">
                  <Avatar className="w-10 h-10 shrink-0">
                    <AvatarFallback className="text-white font-medium bg-[#669F2A]">
                      E
                    </AvatarFallback>
                  </Avatar>

                  <div
                    className="
      inline-block
      bg-white
      p-4
      rounded-xl
      md:max-w-[70%]
      wrap-break-word
      whitespace-pre-wrap
    "
                  >
                    <div className="font-medium text-gray-900 text-sm mb-1">
                      {comment.author}
                    </div>

                    <p className="text-gray-700 text-sm">
                      {comment.content}
                      {comment.mentions?.map((mention, idx) => (
                        <span key={idx} className="text-red-500 ml-1">
                          @{mention}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <span className="text-xs text-gray-400 ml-12">
                  {comment.timestamp}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Comment Input */}
        <div className="px-4 py-6 border-t border-gray-200 bg-white rounded-b-xl">
          <div className="flex gap-3 items-end">
            <Textarea
              placeholder="Add a comment...Use @ to mention teams"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 min-h-11 rounded-4xl max-h-32 text-xs resize-none border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />
            <Button
              size="icon"
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full h-11 w-11 shrink-0"
            >
              <Send size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
