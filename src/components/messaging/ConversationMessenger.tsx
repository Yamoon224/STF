"use client";

import { Check, Flag } from "lucide-react";
import { useState, useTransition } from "react";
import {
  getConversationMessagesAction,
  reportConversationAction,
  sendMessageAction,
} from "@/lib/actions/mentorship";
import { formatTime, initials } from "@/lib/format";
import type { ConversationSummary, Message } from "@/lib/types";

export function ConversationMessenger({
  currentUserId,
  initialConversations,
  initialActiveId,
  initialMessages,
  counterpartLabel,
  reportContext,
  sentBubbleClass,
}: {
  currentUserId: number;
  initialConversations: ConversationSummary[];
  initialActiveId: number | null;
  initialMessages: Message[];
  /** Displayed under the counterpart's name in the thread header, e.g. "Mentore assignée" or "Mentée". */
  counterpartLabel: string;
  /** Used in the auto-generated report description, e.g. "mentée" or "mentore". */
  reportContext: string;
  /** Tailwind classes for the current user's own message bubbles. */
  sentBubbleClass: string;
}) {
  const [conversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState(initialActiveId);
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [reported, setReported] = useState(false);
  const [pending, startTransition] = useTransition();

  const active = conversations.find((c) => c.id === activeId);
  const other = active?.participants.find((p) => p.id !== currentUserId);

  function selectConversation(id: number) {
    setActiveId(id);
    setReported(false);
    startTransition(async () => {
      const msgs = await getConversationMessagesAction(id);
      setMessages(msgs);
    });
  }

  function handleSend(formData: FormData) {
    const body = String(formData.get("body") ?? "").trim();
    if (!body || !activeId) return;
    setDraft("");
    startTransition(async () => {
      const message = await sendMessageAction(activeId, body);
      setMessages((prev) => [...prev, message]);
    });
  }

  function handleReport() {
    if (!activeId) return;
    startTransition(async () => {
      await reportConversationAction(activeId, `Signalement depuis la messagerie ${reportContext}.`);
      setReported(true);
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-border-default dark:bg-surface">
        <div className="border-b border-slate-100 p-4 dark:border-border-subtle">
          <h1 className="font-semibold text-stf-navy dark:text-white">Messagerie</h1>
        </div>
        <ul className="divide-y divide-slate-100 dark:divide-border-subtle">
          {conversations.map((c) => {
            const o = c.participants.find((p) => p.id !== currentUserId);
            const last = c.messages[0];
            return (
              <li key={c.id}>
                <button
                  onClick={() => selectConversation(c.id)}
                  className={`flex w-full items-center gap-3 px-4 py-4 text-left ${
                    c.id === activeId ? "bg-stf-blue-light dark:bg-stf-blue/15" : "hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stf-blue text-sm font-bold text-white">
                    {o ? initials(o.name) : "?"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-stf-navy dark:text-white">{o?.name ?? c.subject}</p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">{last?.body ?? "Aucun message"}</p>
                  </div>
                  {last ? (
                    <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">{formatTime(last.created_at)}</span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-border-default dark:bg-surface">
        <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-border-subtle">
          <div>
            <p className="font-semibold text-stf-navy dark:text-white">{other?.name ?? "-"}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">{counterpartLabel}</p>
          </div>
          <button
            onClick={handleReport}
            disabled={pending || reported || !activeId}
            className="flex items-center gap-1.5 rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 disabled:opacity-50 dark:border-red-500/30 dark:hover:bg-red-500/10"
          >
            {reported ? (
              <>
                <Check className="h-3.5 w-3.5" strokeWidth={2} />
                Signalé
              </>
            ) : (
              <>
                <Flag className="h-3.5 w-3.5" strokeWidth={1.8} />
                Signaler
              </>
            )}
          </button>
        </div>

        <div className="flex-1 space-y-4 p-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender_id === currentUserId ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                  msg.sender_id === currentUserId
                    ? sentBubbleClass
                    : "bg-slate-100 text-stf-navy dark:bg-white/10 dark:text-white"
                }`}
              >
                <p>{msg.body}</p>
                <p
                  className={`mt-1 text-[10px] ${
                    msg.sender_id === currentUserId ? "text-white/70" : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {formatTime(msg.created_at)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <form
          action={handleSend}
          className="flex items-center gap-3 border-t border-slate-100 p-4 dark:border-border-subtle"
        >
          <input
            type="text"
            name="body"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Écrire un message…"
            className="flex-1 rounded-full border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={pending || !activeId}
            className="rounded-full bg-stf-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-stf-blue/90 disabled:opacity-50"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
