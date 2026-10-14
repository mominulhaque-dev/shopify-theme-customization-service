import type { VisualKey } from "@/components/ui/visuals";
import type { BackdropVariant } from "@/components/animations/Backdrop";

export interface LinkRef {
  label: string;
  href: string;
  /** One line on why this link is worth following — used by RelatedBlock. */
  note?: string;
}

/** Search-intent metadata. Kept in the data so the strategy is auditable, and
 *  so the keyword actually appears in the copy rather than only in a spec. */
export interface SeoBrief {
  intent: "informational" | "commercial" | "transactional" | "navigational";
  primary: string;
  supporting: string[];
}

export type PageBlock =
  | {
      type: "split";
      /** Which side the visual sits on at desktop widths. */
      media?: "left" | "right";
      eyebrow?: string;
      heading: string;
      body: string[];
      bullets?: string[];
      visual: VisualKey;
      caption?: string;
      cta?: LinkRef;
      tone?: "plain" | "tint" | "dark";
      backdrop?: BackdropVariant;
    }
  | {
      type: "cards";
      eyebrow?: string;
      heading: string;
      lede?: string;
      columns?: 2 | 3 | 4;
      items: Array<{ title: string; body: string; meta?: string; href?: string }>;
      tone?: "plain" | "tint" | "dark";
      backdrop?: BackdropVariant;
    }
  | {
      type: "steps";
      eyebrow?: string;
      heading: string;
      lede?: string;
      items: Array<{ title: string; body: string; meta?: string }>;
      visual?: VisualKey;
      tone?: "plain" | "tint" | "dark";
      backdrop?: BackdropVariant;
    }
  | {
      type: "checklist";
      eyebrow?: string;
      heading: string;
      lede?: string;
      groups: Array<{ title: string; body?: string; items: string[]; limit?: boolean }>;
      note?: string;
      tone?: "plain" | "tint" | "dark";
    }
  | {
      type: "table";
      eyebrow?: string;
      heading: string;
      lede?: string;
      columns: string[];
      rows: string[][];
      note?: string;
      tone?: "plain" | "tint" | "dark";
    }
  | {
      type: "priceList";
      eyebrow?: string;
      heading: string;
      lede?: string;
      items: Array<{ label: string; price: string; time: string; note: string }>;
      note?: string;
      tone?: "plain" | "tint" | "dark";
    }
  | {
      type: "prose";
      eyebrow?: string;
      heading: string;
      body: string[];
      subheads?: Array<{ title: string; body: string[] }>;
      tone?: "plain" | "tint" | "dark";
    }
  | {
      type: "gallery";
      eyebrow?: string;
      heading: string;
      lede?: string;
      items: Array<{ visual: VisualKey; caption: string; body?: string }>;
      /** Pinned horizontal scroll on desktop, swipe strip on touch. */
      horizontal?: boolean;
      tone?: "plain" | "tint" | "dark";
      backdrop?: BackdropVariant;
    }
  | {
      type: "showcase";
      eyebrow?: string;
      heading: string;
      body?: string[];
      visual: VisualKey;
      caption?: string;
      tone?: "plain" | "tint" | "dark";
      backdrop?: BackdropVariant;
    }
  | { type: "faq"; heading?: string; lede?: string; items: Array<{ q: string; a: string }> }
  | { type: "related"; heading?: string; lede?: string; items: LinkRef[] }
  | {
      type: "cta";
      heading: string;
      body: string;
      cta: LinkRef;
      secondary?: LinkRef;
      tone?: "tint" | "dark";
    };

export interface PageHeroContent {
  eyebrow: string;
  h1: string;
  lede: string;
  /** Short factual meta chips — never invented metrics. */
  meta?: string[];
  cta?: LinkRef;
  secondary?: LinkRef;
  visual?: VisualKey;
  backdrop?: BackdropVariant;
  tone?: "light" | "dark";
}

export interface PageContent {
  /** Route path, leading and trailing slash, e.g. "/services/shopify-development/". */
  slug: string;
  title: string;
  description: string;
  /** Breadcrumb trail, excluding Home (added automatically). */
  breadcrumbs?: LinkRef[];
  seo: SeoBrief;
  hero: PageHeroContent;
  blocks: PageBlock[];
}
