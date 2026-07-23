import Image from "next/image";
import { UserRound } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

type Member = {
  name?: string;
  role: string;
  photo?: string;
};

function MemberCard({ member, size = "md" }: { member: Member; size?: "lg" | "md" }) {
  const dimension = size === "lg" ? "h-28 w-28" : "h-20 w-20";

  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={`relative ${dimension} shrink-0 overflow-hidden rounded-full border-4 border-white shadow-md dark:border-surface`}
      >
        {member.photo ? (
          <Image src={member.photo} alt={member.name ?? member.role} fill sizes="112px" className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400 dark:bg-white/10 dark:text-slate-500">
            <UserRound className={size === "lg" ? "h-12 w-12" : "h-8 w-8"} strokeWidth={1.5} />
          </div>
        )}
      </div>
      <p className="mt-3 text-sm font-bold text-stf-navy dark:text-white">{member.name ?? "Anonyme"}</p>
      <p className="max-w-[10rem] text-xs font-semibold uppercase tracking-wide text-stf-orange">{member.role}</p>
    </div>
  );
}

const support = [
  { role: "Gestionnaire de projet (Consultant)" },
  { role: "Responsable des opérations" },
  { role: "Consultant(e)s" },
];

export function TeamOrgChart() {
  return (
    <div className="flex flex-col items-center">
      <Reveal>
        <MemberCard
          size="lg"
          member={{
            name: "Christelle Ogo",
            role: "PCA — Présidente du Conseil d'Administration",
            photo: "/brand/presidente-fondatrice.png",
          }}
        />
      </Reveal>

      <div className="h-10 w-px bg-slate-200 dark:bg-border-default" />

      <Reveal delay={80}>
        <MemberCard
          size="lg"
          member={{
            name: "Armande Bahi",
            role: "Direction Exécutive",
            photo: "/brand/directrice-executive.jpg",
          }}
        />
      </Reveal>

      <div className="h-10 w-px bg-slate-200 dark:bg-border-default" />

      <div className="relative w-full max-w-3xl">
        <div className="absolute left-1/2 top-0 hidden h-px w-2/3 -translate-x-1/2 bg-slate-200 dark:bg-border-default sm:block" />
        <div className="grid grid-cols-1 gap-10 pt-10 sm:grid-cols-3">
          {support.map((member, i) => (
            <Reveal key={member.role} delay={160 + i * 80}>
              <MemberCard member={member} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
