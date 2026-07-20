import type { SiteSettings } from "@/lib/types";

const icons = {
  linkedin: (
    <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 20h-3.37v-5.9c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.1V20h-3.37V8.5h3.24v1.57h.05c.45-.86 1.56-1.77 3.2-1.77 3.43 0 4.06 2.26 4.06 5.2V20Z" />
  ),
  facebook: (
    <path d="M13.5 9H15V6.5h-1.8C11.2 6.5 10 7.6 10 9.6V11H8.5v2.5H10V21h2.7v-7.5H14.6L15 11h-2.3V9.8c0-.5.2-.8.8-.8Z" />
  ),
  instagram: (
    <path d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Zm0 6.3a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm4.9-6.4a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0ZM12 5.3c1.9 0 2.2 0 2.9.05.7.03 1.2.15 1.6.32.4.17.7.37 1.05.7.33.34.53.65.7 1.05.17.4.3.9.32 1.6.03.7.05 1 .05 2.9s0 2.2-.05 2.9c-.03.7-.15 1.2-.32 1.6-.17.4-.37.7-.7 1.05-.34.33-.65.53-1.05.7-.4.17-.9.3-1.6.32-.7.03-1 .05-2.9.05s-2.2 0-2.9-.05c-.7-.03-1.2-.15-1.6-.32a2.9 2.9 0 0 1-1.05-.7 2.9 2.9 0 0 1-.7-1.05c-.17-.4-.3-.9-.32-1.6C5.3 14.2 5.3 13.9 5.3 12s0-2.2.05-2.9c.03-.7.15-1.2.32-1.6.17-.4.37-.7.7-1.05.34-.33.65-.53 1.05-.7.4-.17.9-.3 1.6-.32.7-.05 1-.05 2.9-.05ZM12 4c-1.95 0-2.2 0-2.96.05-.77.04-1.3.16-1.76.34-.48.19-.9.44-1.3.85-.4.4-.66.82-.85 1.3-.18.47-.3 1-.34 1.77C4.7 9.8 4.7 10.05 4.7 12s0 2.2.05 2.96c.04.77.16 1.3.34 1.76.19.48.44.9.85 1.3.4.4.82.66 1.3.85.47.18 1 .3 1.77.34.76.05 1 .05 2.95.05s2.2 0 2.96-.05c.77-.04 1.3-.16 1.76-.34.48-.19.9-.44 1.3-.85.4-.4.66-.82.85-1.3.18-.47.3-1 .34-1.77.05-.76.05-1 .05-2.95s0-2.2-.05-2.96c-.04-.77-.16-1.3-.34-1.76a3.9 3.9 0 0 0-.85-1.3 3.9 3.9 0 0 0-1.3-.85c-.47-.18-1-.3-1.77-.34C14.2 4 13.95 4 12 4Z" />
  ),
  youtube: (
    <path d="M21.6 8.2a2.7 2.7 0 0 0-1.9-1.9C18 5.8 12 5.8 12 5.8s-6 0-7.7.5a2.7 2.7 0 0 0-1.9 1.9C2 9.9 2 12 2 12s0 2.1.5 3.8a2.7 2.7 0 0 0 1.9 1.9C6 18.2 12 18.2 12 18.2s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9c.4-1.7.4-3.8.4-3.8s0-2.1-.4-3.8ZM10 14.7V9.3l5 2.7-5 2.7Z" />
  ),
  x: (
    <path d="M13.6 10.6 20 4h-1.6l-5.5 5.7L8.2 4H3l6.6 9.3L3 20.4h1.6l5.9-6.1 4.9 6.1H20l-6.4-9.8Zm-2.1 2.1-.7-1L5.4 5.2h2.4l4.4 6 .7 1 5.7 7.8h-2.4l-4.7-6.4Z" />
  ),
};

const settingKeys: Record<keyof typeof icons, string> = {
  linkedin: "social_linkedin",
  facebook: "social_facebook",
  instagram: "social_instagram",
  youtube: "social_youtube",
  x: "social_x",
};

export function SocialIcons({ siteSettings, className = "" }: { siteSettings: SiteSettings; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {(Object.keys(icons) as (keyof typeof icons)[])
        .map((key) => ({ key, href: siteSettings[settingKeys[key]] }))
        .filter(({ href }) => href && href !== "#")
        .map(({ key, href }) => (
          <a
            key={key}
            href={href!}
            target="_blank"
            rel="noreferrer"
            aria-label={key}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-200 transition-colors hover:bg-stf-orange hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              {icons[key]}
            </svg>
          </a>
        ))}
    </div>
  );
}
