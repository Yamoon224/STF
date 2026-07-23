import Fuse from "fuse.js";
import type { SearchItem } from "./pages";

export type SearchResult = SearchItem & { score: number };

export type SearchResponse =
  | { tier: "redirect"; query: string; results: SearchResult[] }
  | { tier: "suggestions"; query: string; results: SearchResult[] }
  | { tier: "none"; query: string; results: [] };

const DIACRITICS = new RegExp("[" + String.fromCharCode(0x0300) + "-" + String.fromCharCode(0x036f) + "]", "g");

/** Strips accents and lowercases so "eleve" matches "élève", "mentore" matches "Mentoré", etc. */
function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(DIACRITICS, "")
    .toLowerCase();
}

// Common short French words that carry no search signal on their own ("comment devenir
// mentore" should really search for "devenir"/"mentore", not "comment").
const STOPWORDS = new Set([
  "le", "la", "les", "l", "un", "une", "des", "de", "du", "d", "au", "aux",
  "et", "ou", "est", "es", "suis", "sont", "je", "tu", "il", "elle", "on", "nous", "vous", "ils", "elles",
  "ce", "ca", "ça", "cette", "ces", "mon", "ma", "mes", "ton", "ta", "tes", "son", "sa", "ses",
  "pour", "avec", "sans", "dans", "sur", "chez", "par", "en", "a", "à",
  "comment", "quoi", "quel", "quelle", "quels", "quelles", "que", "qui", "quand",
  "voudrais", "aimerais", "cherche", "trouve", "trouver", "svp", "merci",
]);

type IndexedItem = {
  item: SearchItem;
  titleNorm: string;
  descriptionNorm: string;
  keywordsNorm: string;
};

/** A single strong hit above this confidence redirects; anything above the
 *  weaker threshold is offered as a "look here" suggestion; below both, nothing. */
const REDIRECT_SCORE = 0.2;
const SUGGESTION_SCORE = 0.45;
const MAX_RESULTS = 4;

function tokenize(query: string): string[] {
  const words = normalize(query)
    .split(/[^\p{L}\p{N}]+/u)
    .filter((w) => w.length >= 3 && !STOPWORDS.has(w));
  return words.length > 0 ? words : [normalize(query)];
}

export function searchItems(items: SearchItem[], rawQuery: string): SearchResponse {
  const query = rawQuery.trim();
  if (!query) return { tier: "none", query, results: [] };

  const indexed: IndexedItem[] = items.map((item) => ({
    item,
    titleNorm: normalize(item.title),
    descriptionNorm: normalize(item.description),
    keywordsNorm: normalize((item.keywords ?? []).join(" ")),
  }));

  const fuse = new Fuse(indexed, {
    keys: [
      { name: "titleNorm", weight: 0.6 },
      { name: "keywordsNorm", weight: 0.25 },
      { name: "descriptionNorm", weight: 0.15 },
    ],
    includeScore: true,
    ignoreLocation: true,
    threshold: 0.6,
  });

  // Search the full phrase plus each meaningful word separately, then keep each
  // item's best (lowest) score - questions like "comment devenir mentore ?" won't
  // fuzzy-match a short title as a whole string, but "mentore" alone will.
  const bestScoreById = new Map<string, SearchResult>();
  const searchStrings = [normalize(query), ...tokenize(query)];

  for (const s of searchStrings) {
    for (const match of fuse.search(s)) {
      const score = match.score ?? 1;
      const existing = bestScoreById.get(match.item.item.id);
      if (!existing || score < existing.score) {
        bestScoreById.set(match.item.item.id, { ...match.item.item, score });
      }
    }
  }

  const results = [...bestScoreById.values()]
    .filter((r) => r.score <= SUGGESTION_SCORE)
    .sort((a, b) => a.score - b.score)
    .slice(0, MAX_RESULTS);

  if (results.length === 0) return { tier: "none", query, results: [] };

  if (results[0].score <= REDIRECT_SCORE) {
    return { tier: "redirect", query, results: results.slice(0, 1) };
  }

  return { tier: "suggestions", query, results };
}
