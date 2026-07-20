"use client";

import { useActionState, useState } from "react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { sendContactMessageAction, type ContactActionState } from "@/lib/actions/contact";

const audiences = [
  { key: "generale", label: "Information générale" },
  { key: "mentorat", label: "Mentorat" },
  { key: "partenaire", label: "Partenaire" },
  { key: "institution", label: "Institution" },
  { key: "media", label: "Média" },
];

export default function ContactPage() {
  const [active, setActive] = useState(audiences[0].key);
  const [state, formAction, pending] = useActionState<ContactActionState, FormData>(sendContactMessageAction, null);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre demande"
        description="Choisissez le formulaire correspondant à votre profil pour que l'équipe STF vous réponde plus rapidement."
      />

      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
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
              <a href="mailto:sciencesaufeminin@gmail.com" className="block hover:text-stf-orange">
                sciencesaufeminin@gmail.com
              </a>
              <a href="mailto:contact@scitechfeminin.org" className="block hover:text-stf-orange">
                contact@scitechfeminin.org
              </a>
              <a href="tel:+2252722306138" className="block hover:text-stf-orange">
                (+225) 27 22 30 61 38
              </a>
              <p>Siège : Angré 7ème tranche, rue L130, près du complexe sportif</p>
              <a
                href="https://www.linkedin.com/company/sciences-et-technologies-au-féminin/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-stf-blue hover:text-stf-orange"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 20h-3.37v-5.9c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.1V20h-3.37V8.5h3.24v1.57h.05c.45-.86 1.56-1.77 3.2-1.77 3.43 0 4.06 2.26 4.06 5.2V20Z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-border-default dark:bg-surface">
          <form
            action={formAction}
            className="space-y-5 p-6 sm:p-8"
          >
            <input type="hidden" name="audience" value={active} />
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-stf-navy dark:text-white">Nom complet</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-stf-navy dark:text-white">Email</label>
                <input
                  type="email"
                  name="email"
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
                name="subject"
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                placeholder={`Votre demande — ${audiences.find((a) => a.key === active)?.label}`}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-stf-navy dark:text-white">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                placeholder="Décrivez votre demande"
              />
            </div>

            {state?.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
            {state?.success ? (
              <p className="text-sm text-stf-green">Votre message a bien été envoyé, l&apos;équipe STF vous répondra rapidement.</p>
            ) : null}

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-full bg-stf-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stf-orange/90 disabled:opacity-60 sm:w-auto"
            >
              {pending ? "Envoi…" : "Envoyer le message"}
            </button>
          </form>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
