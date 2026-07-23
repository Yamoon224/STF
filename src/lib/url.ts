import { headers } from "next/headers";

/** Absolute origin (scheme + host) of the current request - for share links and OG tags. */
export async function getBaseUrl(): Promise<string> {
  const h = await headers();
  const host = h.get("host") ?? "sciencesaufeminin.org";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}
