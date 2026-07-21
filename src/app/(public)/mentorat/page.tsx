import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PatternBackground } from "@/components/ui/PatternBackground";
import { Reveal } from "@/components/ui/Reveal";
import { apiFetch } from "@/lib/api";
import { getPageSections } from "@/lib/pageSections";
import type { Faq } from "@/lib/types";

export default async function MentoratPage() {
  const [faqMentorat, sections] = await Promise.all([
    apiFetch<Faq[]>("/faqs?category=mentorat", { anonymous: true }),
    getPageSections("mentorat"),
  ]);

  const hero = sections.hero?.payload as { eyebrow?: string; title?: string; description?: string } | undefined;
  const menteePath = (sections.mentee_path?.payload.items as string[] | undefined) ?? [];
  const mentorePath = (sections.mentor_path?.payload.items as string[] | undefined) ?? [];
  const security = (sections.security?.payload.items as string[] | undefined) ?? [];

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow ?? "Mentorat"}
        title={hero?.title ?? "Un dispositif structuré, sécurisé et suivi"}
        description={hero?.description ?? ""}
      />

      <section className="py-24">
        <Container className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Parcours mentée" title="Ce que vit une mentée" />
            <ol className="mt-6 space-y-4">
              {menteePath.map((step, i) => (
                <li key={step}>
                  <Reveal
                    delay={i * 90}
                    className="flex gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm dark:border-border-default dark:bg-surface"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stf-blue-light text-sm font-bold text-stf-blue">
                      {i + 1}
                    </span>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{step}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
            <Button href="/inscription" className="mt-6">
              S&apos;inscrire comme mentée
            </Button>
          </div>

          <div>
            <SectionHeading eyebrow="Parcours mentore" title="Ce que vit une mentore" />
            <ol className="mt-6 space-y-4">
              {mentorePath.map((step, i) => (
                <li key={step}>
                  <Reveal
                    delay={i * 90}
                    className="flex gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm dark:border-border-default dark:bg-surface"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stf-orange-light text-sm font-bold text-stf-orange">
                      {i + 1}
                    </span>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{step}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
            <Button href="/inscription?role=mentore" variant="secondary" className="mt-6">
              Devenir mentore
            </Button>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-stf-navy py-24 text-white">
        <PatternBackground tone="onDark" />
        <Container className="relative">
          <SectionHeading eyebrow="Protection" title="La sécurité des mentées avant tout" invert />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {security.map((item, i) => (
              <Reveal key={item} delay={i * 80} className="rounded-xl border border-white/10 bg-white/5 p-5 text-sm">
                {item}
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Questions fréquentes" title="Tout comprendre sur le mentorat" />
          <div className="mt-10 divide-y divide-slate-100 rounded-2xl border border-slate-100 dark:divide-border-subtle dark:border-border-default">
            {faqMentorat.map((item, i) => (
              <Reveal key={item.question} delay={Math.min(i, 6) * 60} className="p-6">
                <h3 className="font-semibold text-stf-navy dark:text-white">{item.question}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.answer}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
