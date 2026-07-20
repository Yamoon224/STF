import { Briefcase, GraduationCap, Scale } from "lucide-react";

const pillars = [
  { icon: GraduationCap, title: "Éducation de qualité", description: "Un accès équitable à des programmes STIM rigoureux, pour toutes les bénéficiaires." },
  { icon: Scale, title: "Réduction des inégalités", description: "Réduire l'écart entre filles et garçons dans les filières scientifiques et technologiques." },
  { icon: Briefcase, title: "Un emploi décent pour tous", description: "Préparer les bénéficiaires à des carrières durables et valorisantes dans les STIM." },
];

export function Pillars() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {pillars.map((p) => (
        <div
          key={p.title}
          className="rounded-2xl border border-white/10 bg-white/10 p-6 text-white backdrop-blur-sm"
        >
          <p.icon className="h-7 w-7" strokeWidth={1.8} />
          <h3 className="mt-3 font-bold">{p.title}</h3>
          <p className="mt-2 text-sm text-white/80">{p.description}</p>
        </div>
      ))}
    </div>
  );
}
