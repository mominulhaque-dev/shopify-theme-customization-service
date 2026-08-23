import type { BackdropVariant } from "@/components/animations/Backdrop";
import type { VisualKey } from "@/components/ui/visuals";
import type { LinkRef, PageContent } from "@/types/page";
import { CRUMB_WORK, ctaBlock } from "@/data/pages/_shared";

export interface CaseInput {
  slug: string;
  title: string;
  description: string;
  /** Category and theme, e.g. "Apparel · Dawn". Also the breadcrumb leaf. */
  eyebrow: string;
  h1: string;
  lede: string;
  meta: string[];
  visual: VisualKey;
  backdrop: BackdropVariant;
  brief: string[];
  constraint: { heading: string; body: string[]; bullets?: string[]; visual: VisualKey };
  /** Rows of [change, path, why] — the file-tree diff, as on the homepage tiers. */
  changes: string[][];
  outcome: string[];
  /** The honest retrospective. Every write-up has one; none of them are "nothing". */
  differently: string[];
  related: LinkRef[];
}

/**
 * Builds a case-study page from the facts of the project.
 *
 * Every write-up carries the same five parts — brief, constraint, file-tree
 * diff, what changed, what we would do differently — because that is the set a
 * merchant evaluating an agency actually needs, and a fixed shape stops the
 * uncomfortable part being quietly dropped from the awkward projects.
 *
 * Merchant names and measured figures are absent by policy, not by oversight:
 * they are published only with written sign-off, and most clients decline. See
 * /work/ for the reasoning.
 */
export function buildCase(input: CaseInput): PageContent {
  return {
    slug: input.slug,
    title: input.title,
    description: input.description,
    breadcrumbs: CRUMB_WORK,
    seo: {
      intent: "commercial",
      primary: input.eyebrow.toLowerCase(),
      supporting: ["Shopify theme customization case study", "Shopify customization example"],
    },
    hero: {
      eyebrow: input.eyebrow,
      h1: input.h1,
      lede: input.lede,
      meta: input.meta,
      cta: { label: "Start a similar project", href: "/hire/" },
      secondary: { label: "All case studies", href: "/work/" },
      visual: input.visual,
      backdrop: input.backdrop,
    },
    blocks: [
      {
        type: "prose",
        eyebrow: "The brief",
        heading: "What the merchant asked for",
        body: input.brief,
      },
      {
        type: "split",
        eyebrow: "The constraint",
        heading: input.constraint.heading,
        body: input.constraint.body,
        bullets: input.constraint.bullets,
        visual: input.constraint.visual,
        media: "right",
        tone: "tint",
      },
      {
        type: "table",
        eyebrow: "What changed",
        heading: "The file-tree diff",
        lede: "The same view we give in a scope document: which files moved and why.",
        columns: ["Change", "Path", "Why"],
        rows: input.changes,
      },
      {
        type: "prose",
        eyebrow: "Outcome",
        heading: "What the merchant got",
        body: input.outcome,
      },
      {
        type: "prose",
        eyebrow: "Retrospective",
        heading: "What we would do differently",
        body: input.differently,
        tone: "tint",
      },
      { type: "related", heading: "Related", items: input.related },
      ctaBlock(
        "Similar problem?",
        "Send your store URL and a description. You get a fixed price, a delivery date and a written scope within two business days."
      ),
    ],
  };
}
