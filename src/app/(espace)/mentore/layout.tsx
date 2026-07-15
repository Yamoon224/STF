import { EspaceShell, type EspaceNavItem } from "@/components/espace/EspaceShell";
import { mentorProfile } from "@/lib/mock-espace-data";

const navItems: EspaceNavItem[] = [
  { href: "/mentore", label: "Tableau de bord", icon: "🏠" },
  { href: "/mentore/mentees", label: "Mes mentées", icon: "👥" },
  { href: "/mentore/sessions", label: "Sessions", icon: "🗓️" },
  { href: "/mentore/ressources", label: "Ressources", icon: "📚" },
  { href: "/mentore/messagerie", label: "Messagerie", icon: "💬" },
];

export default function MentoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <EspaceShell
      navItems={navItems}
      roleLabel="Mentore"
      userName={mentorProfile.name}
      userMeta={mentorProfile.expertise}
    >
      {children}
    </EspaceShell>
  );
}
