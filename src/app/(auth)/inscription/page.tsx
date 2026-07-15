"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

type Role = "mentee" | "mentore";

function InscriptionForm() {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") === "mentore" ? "mentore" : "mentee";
  const [role, setRole] = useState<Role>(initialRole);
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-lg rounded-2xl border border-slate-100 bg-white p-8 shadow-sm dark:border-border-default dark:bg-surface">
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
          onClick={() => setRole("mentore")}
          className={`rounded-full py-2.5 text-sm font-semibold transition-colors ${
            role === "mentore" ? "bg-stf-blue text-white" : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {t("inscription.roleMentore")}
        </button>
      </div>

      <form className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-stf-navy dark:text-white">{t("inscription.firstName")}</label>
            <input
              type="text"
              required
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-stf-navy dark:text-white">{t("inscription.lastName")}</label>
            <input
              type="text"
              required
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-stf-navy dark:text-white">{t("inscription.email")}</label>
          <input
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white"
          />
        </div>

        {role === "mentee" ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-stf-navy dark:text-white">{t("inscription.level")}</label>
              <select className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white">
                <option>{t("inscription.levelPrimaire")}</option>
                <option>{t("inscription.levelCollege")}</option>
                <option>{t("inscription.levelLycee")}</option>
                <option>{t("inscription.levelUniversite")}</option>
                <option>{t("inscription.levelDebutante")}</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-stf-navy dark:text-white">{t("inscription.interest")}</label>
              <select className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white">
                <option>{t("inscription.interestSciences")}</option>
                <option>{t("inscription.interestTechnologies")}</option>
                <option>{t("inscription.interestIngenierie")}</option>
                <option>{t("inscription.interestMathematiques")}</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-stf-navy dark:text-white">{t("inscription.expertise")}</label>
              <input
                type="text"
                placeholder={t("inscription.expertisePlaceholder")}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-stf-navy dark:text-white">{t("inscription.capacity")}</label>
              <input
                type="number"
                min={1}
                defaultValue={2}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>
        )}

        <label className="flex items-start gap-3 text-xs text-slate-500 dark:text-slate-400">
          <input type="checkbox" required className="mt-0.5 rounded border-slate-300" />
          {t("inscription.consent")}
        </label>

        <button
          type="submit"
          className="w-full rounded-full bg-stf-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stf-orange/90"
        >
          {role === "mentee" ? t("inscription.submitMentee") : t("inscription.submitMentore")}
        </button>

        {role === "mentore" ? (
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
