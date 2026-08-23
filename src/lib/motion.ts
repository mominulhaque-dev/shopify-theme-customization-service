/** Every entrance the system knows about. Adding one means adding it here, in
 *  MOTION_FROM/MOTION_TO below, and in the pre-paint CSS in styles/motion.css. */
export type RevealKind =
  | "up"
  | "up-sm"
  | "fade"
  | "scale"
  | "image"
  | "mask-up"
  | "mask-left"
  | "blur"
  | "skew"
  | "rise-rotate";

/**
 * From-states for every `[data-reveal]` value.
 *
 * These MUST mirror the pre-paint CSS in src/styles/motion.css — CSS hides the
 * element before first paint, GSAP re-declares the same from-state so the tween
 * has somewhere to travel from. If you add a value here, add the matching CSS
 * rule (and vice versa) or you get a flash of finished content.
 */
export const MOTION_FROM: Record<RevealKind, gsap.TweenVars> = {
  up: { opacity: 0, y: 26 },
  "up-sm": { opacity: 0, y: 14 },
  fade: { opacity: 0 },
  scale: { opacity: 0, scale: 0.94 },
  image: { opacity: 0, scale: 1.05, clipPath: "inset(4% 4% 4% 4% round 12px)" },
  "mask-up": { opacity: 0, clipPath: "inset(0% 0% 102% 0%)", y: "0.32em" },
  "mask-left": { clipPath: "inset(0% 101% 0% 0%)" },
  blur: { opacity: 0, filter: "blur(10px)", y: 18 },
  skew: { opacity: 0, y: 34, skewY: 2.5 },
  "rise-rotate": { opacity: 0, y: 40, rotate: -1.4 },
};

/** Matching end-states — the "natural" rendered appearance. */
export const MOTION_TO: Record<RevealKind, gsap.TweenVars> = {
  up: { opacity: 1, y: 0 },
  "up-sm": { opacity: 1, y: 0 },
  fade: { opacity: 1 },
  scale: { opacity: 1, scale: 1 },
  image: { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 12px)" },
  "mask-up": { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", y: "0em" },
  "mask-left": { clipPath: "inset(0% 0% 0% 0%)" },
  blur: { opacity: 1, filter: "blur(0px)", y: 0 },
  skew: { opacity: 1, y: 0, skewY: 0 },
  "rise-rotate": { opacity: 1, y: 0, rotate: 0 },
};

/** Per-type timing, so an image settle is slower than a small text rise. */
export const MOTION_DURATION: Record<RevealKind, number> = {
  up: 0.85,
  "up-sm": 0.7,
  fade: 0.9,
  scale: 0.9,
  image: 1.15,
  "mask-up": 0.95,
  "mask-left": 1,
  blur: 1,
  skew: 1,
  "rise-rotate": 1,
};

export const DEFAULT_START = "top 86%";

export function attrNum(el: Element, name: string, fallback: number): number {
  const raw = (el as HTMLElement).dataset[name];
  if (raw === undefined || raw === "") return fallback;
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) ? n : fallback;
}

export function attrStr(el: Element, name: string, fallback: string): string {
  const raw = (el as HTMLElement).dataset[name];
  return raw === undefined || raw === "" ? fallback : raw;
}

/**
 * Items a `[data-reveal-group]` should stagger. Defaults to direct children,
 * with a one-level fallback for a group wrapping a single <ul>/<ol> — the two
 * shapes the pre-paint CSS in motion.css covers.
 */
export function groupItems(group: HTMLElement): HTMLElement[] {
  const selector = group.dataset.items;
  if (selector) {
    return Array.from(group.querySelectorAll<HTMLElement>(selector));
  }
  const kids = Array.from(group.children) as HTMLElement[];
  const only = kids.length === 1 ? kids[0] : undefined;
  if (only && (only.tagName === "UL" || only.tagName === "OL")) {
    return Array.from(only.children) as HTMLElement[];
  }
  return kids;
}

/** Number formatting for [data-counter] so 1200 reads as 1,200 mid-count. */
export function formatCount(value: number, decimals: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
