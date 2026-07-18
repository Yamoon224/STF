"use client";

import { Suspense, useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { loginAction, verifyMfaAction, type AuthActionState } from "@/lib/actions/auth";

function ConnexionForm() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const [loginState, loginFormAction, loginPending] = useActionState<AuthActionState, FormData>(loginAction, null);
  const [mfaState, mfaFormAction, mfaPending] = useActionState<AuthActionState, FormData>(verifyMfaAction, null);

  const challenge = mfaState?.mfaChallenge ?? loginState?.mfaChallenge ?? null;

  if (challenge) {
    return (
      <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-sm dark:border-border-default dark:bg-surface">
        <h1 className="text-2xl font-bold text-stf-navy dark:text-white">Double authentification</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Saisissez le code généré par votre application d&apos;authentification.
        </p>

        <form action={mfaFormAction} className="mt-8 space-y-5">
          <input type="hidden" name="mfa_challenge" value={challenge} />
          {next ? <input type="hidden" name="next" value={next} /> : null}
          <div>
            <label className="text-sm font-semibold text-stf-navy dark:text-white">Code de vérification</label>
            <input
              type="text"
              name="code"
              inputMode="numeric"
              autoFocus
              required
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white"
              placeholder="123456"
            />
          </div>

          {mfaState?.error ? <p className="text-sm text-red-600">{mfaState.error}</p> : null}

          <button
            type="submit"
            disabled={mfaPending}
            className="w-full rounded-full bg-stf-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stf-orange/90 disabled:opacity-60"
          >
            {mfaPending ? "Vérification…" : "Vérifier"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-sm dark:border-border-default dark:bg-surface">
      <h1 className="text-2xl font-bold text-stf-navy dark:text-white">{t("connexion.title")}</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {t("connexion.description")}
      </p>

      <form action={loginFormAction} className="mt-8 space-y-5">
        {next ? <input type="hidden" name="next" value={next} /> : null}
        <div>
          <label className="text-sm font-semibold text-stf-navy dark:text-white">{t("connexion.email")}</label>
          <input
            type="email"
            name="email"
            required
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
            placeholder="vous@exemple.com"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-stf-navy dark:text-white">{t("connexion.password")}</label>
          <PasswordInput
            name="password"
            required
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
            placeholder="••••••••"
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <input type="checkbox" className="rounded border-slate-300" />
            {t("connexion.remember")}
          </label>
          <Link href="#" className="font-semibold text-stf-blue">
            {t("connexion.forgot")}
          </Link>
        </div>

        {loginState?.error ? <p className="text-sm text-red-600">{loginState.error}</p> : null}

        <button
          type="submit"
          disabled={loginPending}
          className="w-full rounded-full bg-stf-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stf-orange/90 disabled:opacity-60"
        >
          {loginPending ? "Connexion…" : t("connexion.submit")}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        {t("connexion.noAccount")}{" "}
        <Link href="/inscription" className="font-semibold text-stf-blue">
          {t("connexion.createAccount")}
        </Link>
      </p>
    </div>
  );
}

export default function ConnexionPage() {
  return (
    <Suspense>
      <ConnexionForm />
    </Suspense>
  );
}
