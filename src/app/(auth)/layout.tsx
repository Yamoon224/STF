import { InscriptionShowcasePanel } from "@/components/layout/InscriptionShowcasePanel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-dvh overflow-hidden lg:grid-cols-2">
      <InscriptionShowcasePanel />
      <div className="flex items-center justify-center overflow-y-auto bg-white px-4 py-8 dark:bg-background sm:px-8">
        {children}
      </div>
    </div>
  );
}
