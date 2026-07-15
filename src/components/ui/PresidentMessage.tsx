import Image from "next/image";

const quote = `Chères membres et partenaires de STF, c'est avec fierté et gratitude que je vous accueille dans notre présentation. En tant que présidente et fondatrice de Sciences et Technologie au Féminin, j'ai vu notre vision prendre vie grâce à votre engagement inébranlable. Notre mission a toujours été de créer un espace où les femmes en science et technologie s'épanouissent, innovent et inspirent. Des ateliers captivants aux partenariats stratégiques, ensemble, nous avons construit une communauté d'excellence et d'impact. Mais notre voyage continue. Engagés à élargir nos horizons, nous encourageons plus de femmes à embrasser leur passion, et à façonner un avenir d'égalité. Merci à toute notre équipe, chaque bénévole, partenaire et supporter. C'est grâce à vous que STF est une réalité dynamique. Ensemble, écrivons l'histoire. Inspirons les générations futures à croire en elles, à poursuivre leurs rêves avec audace. Nos défis sont grands, mais notre détermination l'est encore plus.`;

export function PresidentMessage({ compact = false }: { compact?: boolean }) {
  const paragraphs = compact
    ? [quote.split(". ").slice(0, 2).join(". ") + "."]
    : quote.split(". ").reduce<string[]>((acc, sentence, i) => {
        const groupIndex = Math.floor(i / 3);
        acc[groupIndex] = acc[groupIndex] ? `${acc[groupIndex]} ${sentence}.` : `${sentence}.`;
        return acc;
      }, []);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm dark:border-border-default dark:bg-surface">
      <div className="grid gap-0 lg:grid-cols-[320px_1fr]">
        <div className="relative h-64 w-full lg:h-full">
          <Image
            src="/brand/presidente-fondatrice.png"
            alt="Christelle Ogo, Présidente et Fondatrice de STF"
            fill
            sizes="(min-width: 1024px) 320px, 100vw"
            className="object-cover object-top"
          />
        </div>
        <div className="p-8 sm:p-10">
          <span className="text-5xl leading-none text-stf-orange">“</span>
          <div className="-mt-4 space-y-4 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-6">
            <p className="font-bold text-stf-navy dark:text-white">Christelle Ogo</p>
            <p className="text-sm text-stf-orange">Présidente et Fondatrice</p>
          </div>
        </div>
      </div>
    </div>
  );
}
