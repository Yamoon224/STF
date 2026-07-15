"use client";

import { useState } from "react";
import { menteeMessages, menteeProfile } from "@/lib/mock-espace-data";

const thread = [
  { from: "mentore", text: "Bonjour Aïcha, comment avance ton projet de robotique ?", time: "hier 18:02" },
  { from: "moi", text: "Bonjour ! J'ai terminé le prototype, je prépare la présentation.", time: "hier 18:10" },
  { from: "mentore", text: "Super, envoie-moi tes slides avant la session de jeudi.", time: "09:12" },
];

export default function MenteeMessagerie() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-border-default dark:bg-surface">
        <div className="border-b border-slate-100 p-4 dark:border-border-subtle">
          <h1 className="font-semibold text-stf-navy dark:text-white">Messagerie</h1>
        </div>
        <ul className="divide-y divide-slate-100 dark:divide-border-subtle">
          {menteeMessages.map((m, i) => (
            <li key={m.from}>
              <button
                onClick={() => setActiveIndex(i)}
                className={`flex w-full items-center gap-3 px-4 py-4 text-left ${
                  i === activeIndex ? "bg-stf-blue-light dark:bg-stf-blue/15" : "hover:bg-slate-50 dark:hover:bg-white/5"
                }`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stf-blue text-sm font-bold text-white">
                  {m.from.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-stf-navy dark:text-white">{m.from}</p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">{m.preview}</p>
                </div>
                <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">{m.time}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-border-default dark:bg-surface">
        <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-border-subtle">
          <div>
            <p className="font-semibold text-stf-navy dark:text-white">{menteeProfile.mentor}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">Mentore assignée</p>
          </div>
          <button className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10">
            🚩 Signaler
          </button>
        </div>

        <div className="flex-1 space-y-4 p-4">
          {thread.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "moi" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                  msg.from === "moi"
                    ? "bg-stf-orange text-white"
                    : "bg-slate-100 text-stf-navy dark:bg-white/10 dark:text-white"
                }`}
              >
                <p>{msg.text}</p>
                <p className={`mt-1 text-[10px] ${msg.from === "moi" ? "text-white/70" : "text-slate-400 dark:text-slate-500"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <form className="flex items-center gap-3 border-t border-slate-100 p-4 dark:border-border-subtle">
          <input
            type="text"
            placeholder="Écrire un message…"
            className="flex-1 rounded-full border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
          />
          <button className="rounded-full bg-stf-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-stf-blue/90">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
