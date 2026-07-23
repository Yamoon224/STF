"use client";

import { useState } from "react";
import { Check, Link2, Mail, Share2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const iconButtonClass =
  "flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-stf-orange hover:text-stf-orange dark:border-border-default dark:text-slate-300 dark:hover:border-stf-orange dark:hover:text-stf-orange";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M13.5 21v-7.2h2.4l.36-2.8h-2.76V9.2c0-.81.22-1.36 1.39-1.36h1.48V5.34C15.9 5.24 15.06 5.17 14.09 5.17c-2.13 0-3.59 1.3-3.59 3.68v2.15H8.1v2.8h2.4V21h3Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M18.24 3h2.86l-6.25 7.14L22 21h-5.76l-4.51-5.9L6.55 21H3.68l6.68-7.64L3 3h5.9l4.08 5.4L18.24 3Zm-1 16.2h1.58L7.84 4.7H6.14l11.1 14.5Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M17.47 14.38c-.29-.15-1.7-.84-1.96-.93-.26-.1-.46-.15-.65.15-.19.29-.75.93-.92 1.12-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.71-1.6-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.57-.9-2.15-.24-.57-.48-.5-.65-.5-.17 0-.36-.02-.56-.02-.19 0-.51.07-.78.36-.26.29-1.02 1-1.02 2.42 0 1.43 1.05 2.82 1.19 3.01.15.19 2.05 3.13 4.97 4.39.69.3 1.24.48 1.66.61.7.22 1.33.19 1.83.11.56-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.37-.07-.12-.26-.19-.55-.34ZM12.02 21.9h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.9 9.9 0 0 1-1.51-5.26C2.13 6.53 6.65 2 12.02 2c2.62 0 5.08 1.02 6.93 2.88a9.75 9.75 0 0 1 2.87 6.94c0 5.38-4.52 9.9-9.8 9.9v.18Zm8.4-18.3A11.82 11.82 0 0 0 12.02 0C5.54 0 .27 5.28.27 11.76c0 2.08.54 4.1 1.57 5.88L.17 24l6.53-1.71a11.9 11.9 0 0 0 5.32 1.25h.01c6.47 0 11.75-5.28 11.75-11.76 0-3.14-1.22-6.09-3.44-8.32Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 20h-3.37v-5.9c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.1V20h-3.37V8.5h3.24v1.57h.05c.45-.86 1.56-1.77 3.2-1.77 3.43 0 4.06 2.26 4.06 5.2V20Z" />
    </svg>
  );
}

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const canNativeShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  async function handleNativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      // user cancelled the native share sheet — nothing to do
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — silently ignore
    }
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      key: "facebook",
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FacebookIcon />,
    },
    {
      key: "x",
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <XIcon />,
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: <WhatsAppIcon />,
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <LinkedInIcon />,
    },
    {
      key: "email",
      label: "Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: <Mail className="h-4 w-4" strokeWidth={1.8} />,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-stf-navy dark:text-white">{t("share.label")}</span>

      {canNativeShare ? (
        <button
          type="button"
          onClick={handleNativeShare}
          aria-label={t("share.native")}
          title={t("share.native")}
          className={iconButtonClass}
        >
          <Share2 className="h-4 w-4" strokeWidth={1.8} />
        </button>
      ) : null}

      {links.map((link) => (
        <a
          key={link.key}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
          title={link.label}
          className={iconButtonClass}
        >
          {link.icon}
        </a>
      ))}

      <button
        type="button"
        onClick={handleCopy}
        aria-label={t("share.copyLink")}
        title={t("share.copyLink")}
        className={iconButtonClass}
      >
        {copied ? <Check className="h-4 w-4" strokeWidth={1.8} /> : <Link2 className="h-4 w-4" strokeWidth={1.8} />}
      </button>

      {copied ? <span className="text-xs font-semibold text-stf-green">{t("share.linkCopied")}</span> : null}
    </div>
  );
}
