import { CalendarClock, Home, Library, MessageSquare, Users } from "lucide-react";
import { redirect } from "next/navigation";
import { EspaceShell, type EspaceNavItem } from "@/components/espace/EspaceShell";
import { getSessionUser } from "@/lib/session";
import { logoutAction } from "@/lib/actions/auth";

const iconClass = "h-4 w-4";

const navItems: EspaceNavItem[] = [
  { href: "/mentore", label: "Tableau de bord", icon: <Home className={iconClass} strokeWidth={1.8} /> },
  { href: "/mentore/mentees", label: "Mes mentées", icon: <Users className={iconClass} strokeWidth={1.8} /> },
  { href: "/mentore/sessions", label: "Sessions", icon: <CalendarClock className={iconClass} strokeWidth={1.8} /> },
  { href: "/mentore/ressources", label: "Ressources", icon: <Library className={iconClass} strokeWidth={1.8} /> },
  { href: "/mentore/messagerie", label: "Messagerie", icon: <MessageSquare className={iconClass} strokeWidth={1.8} /> },
];

export default async function MentoreLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/connexion?redirect=/mentore");
  }

  return (
    <EspaceShell
      navItems={navItems}
      roleLabel="Mentore"
      userName={user?.name ?? "Mentore"}
      userMeta={user?.mentor_profile?.expertise ?? "Mentore STF"}
      logoutAction={logoutAction}
    >
      {children}
    </EspaceShell>
  );
}
