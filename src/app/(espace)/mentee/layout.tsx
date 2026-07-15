import { EspaceShell, type EspaceNavItem } from "@/components/espace/EspaceShell";
import { menteeProfile } from "@/lib/mock-espace-data";

const navItems: EspaceNavItem[] = [
  { href: "/mentee", label: "Tableau de bord", icon: "🏠" },
  { href: "/mentee/mentorat", label: "Mon mentorat", icon: "🤝" },
  { href: "/mentee/modules", label: "Modules", icon: "🎓" },
  { href: "/mentee/projets", label: "Projets", icon: "📁" },
  { href: "/mentee/badges", label: "Badges", icon: "🏅" },
  { href: "/mentee/messagerie", label: "Messagerie", icon: "💬" },
];

export default function MenteeLayout({ children }: { children: React.ReactNode }) {
  return (
    <EspaceShell
      navItems={navItems}
      roleLabel="Mentée"
      userName={menteeProfile.name}
      userMeta={menteeProfile.level}
    >
      {children}
    </EspaceShell>
  );
}
