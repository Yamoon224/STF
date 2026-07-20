import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PresidentMessage } from "@/components/ui/PresidentMessage";
import { Reveal } from "@/components/ui/Reveal";
import { getPageSections } from "@/lib/pageSections";

export default async function AProposPage() {
  const sections = await getPageSections("a-propos");
  const hero = sections.hero?.payload as { eyebrow?: string; title?: string; description?: string } | undefined;
  const histoire = sections.histoire?.payload as { eyebrow?: string; title?: string; body?: string } | undefined;
  const mission = sections.mission?.payload as { eyebrow?: string; title?: string; body?: string } | undefined;
  const values = (sections.values?.payload.items as { title: string; description: string }[] | undefined) ?? [];
  const governance = (sections.governance?.payload.items as { role: string; mission: string }[] | undefined) ?? [];

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow ?? "À propos"}
        title={hero?.title ?? "Sciences & Technologies au Féminin"}
        description={hero?.description ?? ""}
      />

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Mot de la présidente" title="Le message de notre fondatrice" center />
          <Reveal delay={100} className="mt-10">
            <PresidentMessage />
          </Reveal>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={histoire?.eyebrow ?? "Notre histoire"} title={histoire?.title ?? "Pourquoi STF existe"} />
            <Reveal delay={100}>
              <p className="mt-4 text-slate-600 dark:text-slate-300">{histoire?.body}</p>
            </Reveal>
          </div>
          <div>
            <SectionHeading eyebrow={mission?.eyebrow ?? "Notre mission"} title={mission?.title ?? "Ce que nous visons"} />
            <Reveal delay={100}>
              <p className="mt-4 text-slate-600 dark:text-slate-300">{mission?.body}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-20 dark:bg-surface-muted">
        <Container>
          <SectionHeading eyebrow="Nos valeurs" title="Audace, Union, Intégrité, Résultat" center />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 80}
                className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm dark:border-border-default dark:bg-surface"
              >
                <h3 className="text-lg font-bold text-stf-blue">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{v.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Gouvernance" title="Qui décide et qui contribue" />
          <Reveal className="mt-10 overflow-hidden rounded-2xl border border-slate-100 dark:border-border-default">
            <table className="w-full text-left text-sm">
              <thead className="bg-stf-navy text-white">
                <tr>
                  <th className="px-6 py-3 font-semibold">Rôle</th>
                  <th className="px-6 py-3 font-semibold">Mission</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-border-subtle">
                {governance.map((g) => (
                  <tr key={g.role} className="odd:bg-white even:bg-slate-50 dark:odd:bg-surface dark:even:bg-surface-muted">
                    <td className="px-6 py-4 font-semibold text-stf-navy dark:text-white">{g.role}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{g.mission}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
