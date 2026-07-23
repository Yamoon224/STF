"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { MessageCircle, X, Send, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { SearchResponse, SearchResult } from "@/lib/search/search";

type ChatMessage = {
  id: string;
  role: "user" | "bot";
  text?: string;
  response?: SearchResponse;
};

let nextId = 0;
function uid() {
  nextId += 1;
  return `msg-${nextId}`;
}

function ResultCard({ result, goToPageLabel }: { result: SearchResult; goToPageLabel: string }) {
  return (
    <Link
      href={result.url}
      className="block rounded-xl border border-slate-200 bg-white p-3 transition-colors hover:border-stf-orange/50 hover:bg-stf-orange-light dark:border-border-default dark:bg-surface dark:hover:bg-stf-orange/10"
    >
      <p className="text-sm font-semibold text-stf-navy dark:text-white">{result.title}</p>
      <p className="mt-0.5 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">{result.description}</p>
      <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-stf-orange">
        {goToPageLabel}
        <ArrowRight className="h-3 w-3" />
      </span>
    </Link>
  );
}

export function ChatWidget() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const seededGreeting = useRef(false);

  useEffect(() => {
    if (open && !seededGreeting.current) {
      seededGreeting.current = true;
      setMessages([{ id: uid(), role: "bot", text: t("chat.greeting") }]);
    }
  }, [open, t]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const query = input.trim();
    if (!query || loading) return;

    setMessages((prev) => [...prev, { id: uid(), role: "user", text: query }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = (await res.json()) as SearchResponse;
      setMessages((prev) => [...prev, { id: uid(), role: "bot", response: data }]);
    } catch {
      setMessages((prev) => [...prev, { id: uid(), role: "bot", text: t("chat.error") }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open ? (
        <div
          role="dialog"
          aria-label={t("chat.title")}
          className="fixed bottom-24 right-6 z-40 flex h-[28rem] max-h-[70vh] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 dark:bg-surface dark:ring-white/10"
        >
          <div className="flex items-center justify-between bg-stf-navy px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">{t("chat.title")}</p>
              <p className="text-xs text-white/70">{t("chat.subtitle")}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("chat.close")}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message) => (
              <div key={message.id} className={message.role === "user" ? "ml-auto max-w-[80%]" : "max-w-[90%]"}>
                {message.role === "user" ? (
                  <p className="rounded-2xl rounded-br-sm bg-stf-blue px-4 py-2 text-sm text-white">{message.text}</p>
                ) : message.text ? (
                  <p className="rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-2 text-sm text-stf-navy dark:bg-surface-muted dark:text-white">
                    {message.text}
                  </p>
                ) : message.response ? (
                  <div className="space-y-2">
                    <p className="rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-2 text-sm text-stf-navy dark:bg-surface-muted dark:text-white">
                      {message.response.tier === "none"
                        ? t("chat.noResults")
                        : message.response.tier === "redirect"
                          ? t("chat.redirectIntro")
                          : t("chat.suggestionsIntro")}
                    </p>
                    {message.response.results.map((result) => (
                      <ResultCard key={result.id} result={result} goToPageLabel={t("chat.goToPage")} />
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            {loading ? (
              <p className="max-w-[90%] rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-2 text-sm text-slate-400 dark:bg-surface-muted dark:text-slate-500">
                …
              </p>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-slate-100 p-3 dark:border-border-default">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chat.placeholder")}
              className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-stf-navy outline-none focus:border-stf-orange dark:border-border-default dark:bg-surface-muted dark:text-white"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label={t("chat.send")}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stf-orange text-white transition-opacity hover:bg-stf-orange/90 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t(open ? "chat.close" : "chat.launcherLabel")}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-stf-orange text-white shadow-lg shadow-stf-orange/30 transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
}
