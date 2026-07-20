import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { getPageSections } from "@/lib/pageSections";

export default async function PolitiquesPage() {
  const sections = await getPageSections("politiques");
  const hero = sections.hero?.payload as { eyebrow?: string; title?: string; description?: string } | undefined;
  const policies = (sections.policies?.payload.items as { title: string; text: string }[] | undefined) ?? [];

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow ?? "Politiques"}
        title={hero?.title ?? "Protection, confidentialité et conformité"}
        description={hero?.description ?? ""}
      />

      <section className="py-20">
        <Container className="grid gap-6 md:grid-cols-2">
          {policies.map((policy, i) => (
            <Reveal
              key={policy.title}
              delay={(i % 2) * 90}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-border-default dark:bg-surface"
            >
              <h2 className="text-lg font-bold text-stf-navy dark:text-white">{policy.title}</h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{policy.text}</p>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
