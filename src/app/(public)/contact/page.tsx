"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

const audiences = [
  { key: "generale", label: "Information générale" },
  { key: "mentorat", label: "Mentorat" },
  { key: "partenaire", label: "Partenaire" },
  { key: "institution", label: "Institution" },
  { key: "media", label: "Média" },
];

export default function ContactPage() {
  const [active, setActive] = useState(audiences[0].key);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre demande"
        description="Choisissez le formulaire correspondant à votre profil pour que l'équipe STF vous réponde plus rapidement."
      />

      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <div className="flex flex-wrap gap-2 lg:flex-col">
              {audiences.map((a) => (
                <button
                  key={a.key}
                  type="button"
                  onClick={() => setActive(a.key)}
                  className={`rounded-full px-4 py-2.5 text-left text-sm font-semibold transition-colors lg:rounded-xl ${
                    active === a.key
                      ? "bg-stf-orange text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/15"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
            <div className="mt-8 space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <p>contact@stf-organisation.org</p>
              <p>+225 00 00 00 00</p>
              <p>Abidjan, Côte d&apos;Ivoire</p>
            </div>
          </div>

          <form className="space-y-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-border-default dark:bg-surface sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-stf-navy dark:text-white">Nom complet</label>
                <input
                  type="text"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-stf-navy dark:text-white">Email</label>
                <input
                  type="email"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                  placeholder="vous@exemple.com"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-stf-navy dark:text-white">Sujet</label>
              <input
                type="text"
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                placeholder={`Votre demande — ${audiences.find((a) => a.key === active)?.label}`}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-stf-navy dark:text-white">Message</label>
              <textarea
                required
                rows={5}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                placeholder="Décrivez votre demande"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-stf-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stf-orange/90 sm:w-auto"
            >
              Envoyer le message
            </button>
          </form>
        </Container>
      </section>
    </>
  );
}
