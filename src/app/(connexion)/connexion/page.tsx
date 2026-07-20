"use client";

import { Suspense, useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { loginAction, verifyMfaAction, type AuthActionState } from "@/lib/actions/auth";

const fieldInputClass =
  "w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500";

function FieldIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center text-slate-400 dark:text-slate-500">
      {children}
    </span>
  );
}

function TopRow() {
  return (
    <div className="mb-10 flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </div>
  );
}

function ConnexionForm() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");
  const [loginState, loginFormAction, loginPending] = useActionState<AuthActionState, FormData>(loginAction, null);
  const [mfaState, mfaFormAction, mfaPending] = useActionState<AuthActionState, FormData>(verifyMfaAction, null);

  const challenge = mfaState?.mfaChallenge ?? loginState?.mfaChallenge ?? null;

  if (challenge) {
    return (
      <div className="w-full max-w-sm">
        <TopRow />
        <h1 className="text-2xl font-bold text-stf-navy dark:text-white">Double authentification</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Saisissez le code généré par votre application d&apos;authentification.
        </p>

        <form action={mfaFormAction} className="mt-8 space-y-5">
          <input type="hidden" name="mfa_challenge" value={challenge} />
          {redirectTo ? <input type="hidden" name="redirect" value={redirectTo} /> : null}
          <div>
            <label className="text-sm font-semibold text-stf-navy dark:text-white">Code de vérification</label>
            <div className="relative mt-2">
              <FieldIcon>
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 9h18M8 4v16" />
                </svg>
              </FieldIcon>
              <input
                type="text"
                name="code"
                inputMode="numeric"
                autoFocus
                required
                className={fieldInputClass}
                placeholder="123456"
              />
            </div>
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
    <div className="w-full max-w-sm">
      <TopRow />
      <h1 className="text-2xl font-bold text-stf-navy dark:text-white">{t("connexion.title")}</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {t("connexion.description")}
      </p>

      <form action={loginFormAction} className="mt-8 space-y-5">
        {redirectTo ? <input type="hidden" name="redirect" value={redirectTo} /> : null}
        <div>
          <label className="text-sm font-semibold text-stf-navy dark:text-white">{t("connexion.email")}</label>
          <div className="relative mt-2">
            <FieldIcon>
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m4 7 8 6 8-6" />
              </svg>
            </FieldIcon>
            <input
              type="email"
              name="email"
              required
              className={fieldInputClass}
              placeholder="vous@exemple.com"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-stf-navy dark:text-white">{t("connexion.password")}</label>
          <div className="relative mt-2">
            <FieldIcon>
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="11" width="16" height="9" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
            </FieldIcon>
            <PasswordInput
              name="password"
              required
              className={fieldInputClass}
              placeholder="••••••••"
            />
          </div>
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
