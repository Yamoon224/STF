"use client";

import Link from "next/link";
import { Suspense, useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { registerAction, type AuthActionState } from "@/lib/actions/auth";
import { stemDomainLabels, stemFields, type StemDomain } from "@/lib/stemFields";

type Role = "mentee" | "mentor";

const selectClass =
  "mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white";

function InscriptionForm() {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") === "mentore" ? "mentor" : "mentee";
  const [role, setRole] = useState<Role>(initialRole);
  const [domain, setDomain] = useState<StemDomain | "">("");
  const { t } = useLanguage();
  const [state, formAction, pending] = useActionState<AuthActionState, FormData>(registerAction, null);

  return (
    <div className="w-full max-w-lg">
      <div className="mb-10 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-stf-navy dark:text-white">{t("inscription.title")}</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {t("inscription.description")}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-2 rounded-full bg-slate-100 p-1 dark:bg-white/10">
        <button
          type="button"
          onClick={() => setRole("mentee")}
          className={`rounded-full py-2.5 text-sm font-semibold transition-colors ${
            role === "mentee" ? "bg-stf-orange text-white" : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {t("inscription.roleMentee")}
        </button>
        <button
          type="button"
          onClick={() => setRole("mentor")}
          className={`rounded-full py-2.5 text-sm font-semibold transition-colors ${
            role === "mentor" ? "bg-stf-blue text-white" : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {t("inscription.roleMentore")}
        </button>
      </div>

      <form action={formAction} className="mt-8 space-y-5">
        <input type="hidden" name="role" value={role} />

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-stf-navy dark:text-white">{t("inscription.firstName")}</label>
            <input
              type="text"
              name="firstName"
              required
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-stf-navy dark:text-white">{t("inscription.lastName")}</label>
            <input
              type="text"
              name="lastName"
              required
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-stf-navy dark:text-white">{t("inscription.email")}</label>
          <input
            type="email"
            name="email"
            required
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-stf-navy dark:text-white">Mot de passe</label>
            <PasswordInput
              name="password"
              required
              minLength={8}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-stf-navy dark:text-white">Confirmer le mot de passe</label>
            <PasswordInput
              name="password_confirmation"
              required
              minLength={8}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white"
            />
          </div>
        </div>

        {role === "mentee" ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-stf-navy dark:text-white">{t("inscription.level")}</label>
                <select name="level" className={selectClass}>
                  <option>{t("inscription.levelPrimaire")}</option>
                  <option>{t("inscription.levelCollege")}</option>
                  <option>{t("inscription.levelLycee")}</option>
                  <option>{t("inscription.levelUniversite")}</option>
                  <option>{t("inscription.levelDebutante")}</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-stf-navy dark:text-white">{t("inscription.interest")}</label>
                <select
                  name="domain"
                  required
                  value={domain}
                  onChange={(e) => setDomain(e.target.value as StemDomain | "")}
                  className={selectClass}
                >
                  <option value="">{t("inscription.domainPlaceholder")}</option>
                  <option value="science">{t("inscription.interestSciences")}</option>
                  <option value="technologie">{t("inscription.interestTechnologies")}</option>
                  <option value="ingenierie">{t("inscription.interestIngenierie")}</option>
                  <option value="mathematiques">{t("inscription.interestMathematiques")}</option>
                </select>
                <input type="hidden" name="domainLabel" value={domain ? stemDomainLabels[domain] : ""} />
              </div>
            </div>

            {domain ? (
              <div>
                <label className="text-sm font-semibold text-stf-navy dark:text-white">{t("inscription.metier")}</label>
                <select key={`metier-${domain}`} name="metier" required className={selectClass}>
                  <option value="">{t("inscription.metierPlaceholder")}</option>
                  {stemFields[domain].map((field) => (
                    <option key={field.metier} value={field.metier}>
                      {field.metier}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
          </>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-stf-navy dark:text-white">{t("inscription.interest")}</label>
                <select
                  name="domain"
                  required
                  value={domain}
                  onChange={(e) => setDomain(e.target.value as StemDomain | "")}
                  className={selectClass}
                >
                  <option value="">{t("inscription.domainPlaceholder")}</option>
                  <option value="science">{t("inscription.interestSciences")}</option>
                  <option value="technologie">{t("inscription.interestTechnologies")}</option>
                  <option value="ingenierie">{t("inscription.interestIngenierie")}</option>
                  <option value="mathematiques">{t("inscription.interestMathematiques")}</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-stf-navy dark:text-white">{t("inscription.capacity")}</label>
                <input type="number" name="capacity" min={1} defaultValue={2} className={selectClass} />
              </div>
            </div>

            {domain ? (
              <div>
                <label className="text-sm font-semibold text-stf-navy dark:text-white">{t("inscription.expertise")}</label>
                <select key={`profession-${domain}`} name="expertise" required className={selectClass}>
                  <option value="">{t("inscription.professionPlaceholder")}</option>
                  {stemFields[domain].map((field) => (
                    <option key={field.profession} value={field.profession}>
                      {field.profession}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
          </>
        )}

        <label className="flex items-start gap-3 text-xs text-slate-500 dark:text-slate-400">
          <input type="checkbox" required className="mt-0.5 rounded border-slate-300" />
          {t("inscription.consent")}
        </label>

        {state?.error ? <p className="text-sm text-red-600">{state.error}</p> : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-stf-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stf-orange/90 disabled:opacity-60"
        >
          {pending ? "…" : role === "mentee" ? t("inscription.submitMentee") : t("inscription.submitMentore")}
        </button>

        {role === "mentor" ? (
          <p className="text-center text-xs text-slate-400 dark:text-slate-500">
            {t("inscription.mentoreNotice")}
          </p>
        ) : null}
      </form>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        {t("inscription.alreadyRegistered")}{" "}
        <Link href="/connexion" className="font-semibold text-stf-blue">
          {t("inscription.login")}
        </Link>
      </p>
    </div>
  );
}

export default function InscriptionPage() {
  return (
    <Suspense>
      <InscriptionForm />
    </Suspense>
  );
}
