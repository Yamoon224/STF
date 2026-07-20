import { Award, Folder, GraduationCap, Handshake, Home, MessageSquare, Microscope } from "lucide-react";
import { redirect } from "next/navigation";
import { EspaceShell, type EspaceNavItem } from "@/components/espace/EspaceShell";
import { getSessionUser } from "@/lib/session";
import { logoutAction } from "@/lib/actions/auth";

const iconClass = "h-4 w-4";

const navItems: EspaceNavItem[] = [
  { href: "/mentee", label: "Tableau de bord", icon: <Home className={iconClass} strokeWidth={1.8} /> },
  { href: "/mentee/mentorat", label: "Mon mentorat", icon: <Handshake className={iconClass} strokeWidth={1.8} /> },
  { href: "/mentee/modules", label: "Modules", icon: <GraduationCap className={iconClass} strokeWidth={1.8} /> },
  { href: "/mentee/renforcement", label: "Cours de renforcement", icon: <Microscope className={iconClass} strokeWidth={1.8} /> },
  { href: "/mentee/projets", label: "Projets", icon: <Folder className={iconClass} strokeWidth={1.8} /> },
  { href: "/mentee/badges", label: "Badges", icon: <Award className={iconClass} strokeWidth={1.8} /> },
  { href: "/mentee/messagerie", label: "Messagerie", icon: <MessageSquare className={iconClass} strokeWidth={1.8} /> },
];

export default async function MenteeLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/connexion?redirect=/mentee");
  }

  return (
    <EspaceShell
      navItems={navItems}
      roleLabel="Mentée"
      userName={user?.name ?? "Mentée"}
      userMeta={user?.mentee_profile?.level ?? "Mentée STF"}
      logoutAction={logoutAction}
    >
      {children}
    </EspaceShell>
  );
}
