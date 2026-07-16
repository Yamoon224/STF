import { apiFetch } from "@/lib/api";
import { getSessionUser } from "@/lib/session";
import type { ConversationSummary, Message } from "@/lib/types";
import { ConversationMessenger } from "@/components/messaging/ConversationMessenger";

export default async function MenteeMessagerie() {
  const user = await getSessionUser();
  const conversations = await apiFetch<ConversationSummary[]>("/conversations");
  const first = conversations[0];
  const initialMessages = first
    ? await apiFetch<Message[]>(`/conversations/${first.id}/messages`)
    : [];

  return (
    <ConversationMessenger
      currentUserId={user?.id ?? 0}
      initialConversations={conversations}
      initialActiveId={first?.id ?? null}
      initialMessages={initialMessages}
      counterpartLabel="Mentore assignée"
      reportContext="mentée"
      sentBubbleClass="bg-stf-orange text-white"
    />
  );
}
