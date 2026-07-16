import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PatternBackground } from "@/components/ui/PatternBackground";
import { apiFetch } from "@/lib/api";
import type { Faq } from "@/lib/types";

const menteePath = [
  "Créer un compte : niveau, intérêts, objectifs et langue.",
  "Recevoir une proposition de mentore selon le matching STF.",
  "Échanger via la messagerie sécurisée et planifier les sessions.",
  "Suivre ses objectifs, projets, badges et son bilan de cycle.",
];

const mentorePath = [
  "Créer un profil professionnel : expertise, langues, disponibilités.",
  "Attendre la validation du compte par l'équipe STF.",
  "Recevoir les mentées affectées et consulter leur profil pédagogique.",
  "Animer les sessions, rédiger des notes et proposer les prochaines étapes.",
];

export default async function MentoratPage() {
  const faqMentorat = await apiFetch<Faq[]>("/faqs?category=mentorat", { anonymous: true });

  return (
    <>
      <PageHero
        eyebrow="Mentorat"
        title="Un dispositif structuré, sécurisé et suivi"
        description="Inscription, validation des mentores, matching par critères objectifs, sessions, messagerie sécurisée et bilan de cycle : chaque étape est pensée pour protéger les mentées et créer un impact réel."
      />

      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Parcours mentée" title="Ce que vit une mentée" />
            <ol className="mt-6 space-y-4">
              {menteePath.map((step, i) => (
                <li
                  key={step}
                  className="flex gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm dark:border-border-default dark:bg-surface"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stf-blue-light text-sm font-bold text-stf-blue">
                    {i + 1}
                  </span>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{step}</p>
                </li>
              ))}
            </ol>
            <Button href="/inscription" className="mt-6">
              S'inscrire comme mentée
            </Button>
          </div>

          <div>
            <SectionHeading eyebrow="Parcours mentore" title="Ce que vit une mentore" />
            <ol className="mt-6 space-y-4">
              {mentorePath.map((step, i) => (
                <li
                  key={step}
                  className="flex gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm dark:border-border-default dark:bg-surface"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stf-orange-light text-sm font-bold text-stf-orange">
                    {i + 1}
                  </span>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{step}</p>
                </li>
              ))}
            </ol>
            <Button href="/inscription?role=mentore" variant="secondary" className="mt-6">
              Devenir mentore
            </Button>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-stf-navy py-20 text-white">
        <PatternBackground tone="onDark" />
        <Container className="relative">
          <SectionHeading eyebrow="Protection" title="La sécurité des mentées avant tout" invert />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Profil privé par défaut, en particulier pour les mineures",
              "Aucune coordonnée privée visible sans consentement",
              "Bouton de signalement dans chaque conversation",
              "Toute consultation des mentores est tracée et auditable",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-5 text-sm">
                {item}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Questions fréquentes" title="Tout comprendre sur le mentorat" />
          <div className="mt-8 divide-y divide-slate-100 rounded-2xl border border-slate-100 dark:divide-border-subtle dark:border-border-default">
            {faqMentorat.map((item) => (
              <div key={item.question} className="p-6">
                <h3 className="font-semibold text-stf-navy dark:text-white">{item.question}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
