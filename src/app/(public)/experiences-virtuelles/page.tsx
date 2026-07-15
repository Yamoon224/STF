import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const catalogue = [
  { title: "Fondations", level: "Tous niveaux", duration: "2h", difficulty: "Découverte", tone: "green" as const },
  { title: "Initiation à la robotique", level: "Collège", duration: "4h", difficulty: "Débutant", tone: "blue" as const },
  { title: "Bases de la programmation", level: "Lycée", duration: "6h", difficulty: "Débutant", tone: "blue" as const },
  { title: "Introduction à l'intelligence artificielle", level: "Université", duration: "8h", difficulty: "Intermédiaire", tone: "orange" as const },
  { title: "Data & statistiques appliquées", level: "Université", duration: "5h", difficulty: "Intermédiaire", tone: "orange" as const },
  { title: "Découverte des métiers du numérique", level: "Débutantes", duration: "3h", difficulty: "Découverte", tone: "green" as const },
];

export default function ExperiencesVirtuellesPage() {
  return (
    <>
      <PageHero
        eyebrow="Expériences virtuelles"
        title="Découvrir les STIM à son rythme"
        description="Un catalogue de modules progressifs et interactifs, filtrables par niveau, domaine, durée, langue et difficulté — pensés pour le mobile et les connexions limitées."
      />

      <section className="py-16">
        <Container>
          <div className="flex flex-wrap gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            {["Niveau", "Domaine", "Durée", "Langue", "Difficulté"].map((filter) => (
              <span key={filter} className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-500">
                {filter} ▾
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {catalogue.map((module) => (
            <div key={module.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <Badge tone={module.tone}>{module.level}</Badge>
              <h3 className="mt-3 text-lg font-bold text-stf-navy">{module.title}</h3>
              <div className="mt-3 flex gap-4 text-xs text-slate-500">
                <span>⏱ {module.duration}</span>
                <span>📈 {module.difficulty}</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <span>Leçon</span>·<span>Activité</span>·<span>Quiz</span>·<span>Badge</span>
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-stf-green-light py-16">
        <Container className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge tone="green">Parcours Fondations</Badge>
            <h2 className="mt-3 text-2xl font-bold text-stf-navy">
              Accessible à toutes les bénéficiaires, sans prérequis
            </h2>
          </div>
          <Button href="/inscription">Commencer le parcours</Button>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Phase 2" title="Quiz, badges et vitrine de projets" />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { title: "Quiz", text: "Score minimum paramétrable et validation automatique." },
              { title: "Badges & attestations", text: "Attribution automatique et export PDF selon les règles STF." },
              { title: "Vitrine projets", text: "Publication après validation STF et consentement explicite." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-dashed border-slate-200 p-6">
                <h3 className="font-semibold text-stf-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
