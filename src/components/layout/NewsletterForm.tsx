"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { subscribeNewsletterAction, type NewsletterActionState } from "@/lib/actions/newsletter";

export function NewsletterForm() {
  const { t } = useLanguage();
  const [state, formAction, pending] = useActionState<NewsletterActionState, FormData>(
    subscribeNewsletterAction,
    null
  );

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-stf-orange">{t("footer.newsletterTitle")}</h3>
      <p className="mt-2 text-sm text-slate-300">{t("footer.newsletterDescription")}</p>

      {state?.success ? (
        <p className="mt-3 text-sm font-semibold text-stf-green">{t("footer.newsletterSuccess")}</p>
      ) : (
        <form action={formAction} className="mt-3 flex gap-2">
          <input
            type="email"
            name="email"
            required
            placeholder={t("footer.newsletterPlaceholder")}
            className="w-full min-w-0 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white outline-none placeholder:text-slate-400 focus:border-stf-orange"
          />
          <button
            type="submit"
            disabled={pending}
            aria-label={t("footer.newsletterSubmit")}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stf-orange text-white transition-opacity hover:bg-stf-orange/90 disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      )}

      {state?.error ? <p className="mt-2 text-xs text-red-400">{state.error}</p> : null}
    </div>
  );
}
