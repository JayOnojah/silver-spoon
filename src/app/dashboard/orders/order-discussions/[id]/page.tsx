"use client";

import { useParams } from "next/navigation";
import ChatDetailsContent from "./chat-details-content";

export default function OrderDiscussionPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : undefined;

  return <ChatDetailsContent discussionId={id} />;
}
