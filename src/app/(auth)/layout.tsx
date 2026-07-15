import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { PatternBackground } from "@/components/ui/PatternBackground";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-stf-cream dark:bg-surface-muted">
      <PatternBackground />
      <header className="relative flex items-center justify-between px-4 py-6 sm:px-8">
        <Logo />
        <ThemeToggle />
      </header>
      <main className="relative flex flex-1 items-center justify-center px-4 pb-16">
        {children}
      </main>
    </div>
  );
}
