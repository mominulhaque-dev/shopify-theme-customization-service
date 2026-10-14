import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Restores the inline links that were flattened to plain text when the homepage
 * was ported from the design reference (CLAUDE.md §"Homepage content").
 *
 * The copy strings in src/data/homepage.ts stay exactly as approved — this maps
 * phrases that already exist in that copy to the pages they were always meant
 * to point at, so nothing is reworded to make a link fit. Longest phrases match
 * first so a short phrase nested inside a longer one cannot win.
 */
const PHRASE_LINKS: Record<string, string> = {
  // "see the comparison": "/custom-theme-vs-template/",
  // "see store setup": "/store-setup/",
  // "theme updates and migration": "/migration/",
  // "the full process": "/process/",
  // "custom theme development versus customization": "/custom-theme-development/",
  // "hiring a Shopify theme developer": "/guides/hire-theme-developer/",
  // "custom theme versus template": "/custom-theme-vs-template/",
  // "migrating to Online Store 2.0": "/migration/",
};

const PHRASES = Object.keys(PHRASE_LINKS).sort((a, b) => b.length - a.length);

export function linkify(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let rest = text;
  let key = 0;

  while (rest.length > 0) {
    const hit = firstMatch(rest);
    if (!hit) {
      nodes.push(rest);
      break;
    }

    if (hit.index > 0) nodes.push(rest.slice(0, hit.index));
    nodes.push(
      <Link key={key++} href={hit.href} className="ilink">
        {rest.slice(hit.index, hit.index + hit.phrase.length)}
      </Link>
    );
    rest = rest.slice(hit.index + hit.phrase.length);
  }

  return nodes;
}

function firstMatch(text: string): { phrase: string; href: string; index: number } | null {
  let best: { phrase: string; href: string; index: number } | null = null;

  for (const phrase of PHRASES) {
    const index = text.indexOf(phrase);
    if (index === -1) continue;
    const href = PHRASE_LINKS[phrase];
    if (!href) continue;
    if (!best || index < best.index) best = { phrase, href, index };
  }

  return best;
}
