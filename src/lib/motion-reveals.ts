"use client";

import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import {
  DEFAULT_START,
  MOTION_DURATION,
  MOTION_FROM,
  MOTION_TO,
  type RevealKind,
  attrNum,
  attrStr,
  formatCount,
  groupItems,
} from "@/lib/motion";

/**
 * Releases the compositing hint once an entrance has finished.
 *
 * `will-change` is declared in CSS for every hidden element so the first frame
 * of the tween is cheap, but leaving it on afterwards keeps a GPU layer alive
 * for every revealed node — on a long page that is a hundred-odd layers doing
 * nothing. Clearing it inline (which beats the class selector) hands the memory
 * back as soon as the element is at rest.
 */
function releaseHint(targets: Element | Element[]) {
  const list = Array.isArray(targets) ? targets : [targets];
  for (const el of list) (el as HTMLElement).style.willChange = "auto";
}

/** Single-element entrance reveals: [data-reveal="up|image|mask-up|blur|…"]. */
export function buildReveals(root: ParentNode) {
  root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    const kind = (el.dataset.reveal || "up") as RevealKind;
    const from = MOTION_FROM[kind] ?? MOTION_FROM.up;
    const to = MOTION_TO[kind] ?? MOTION_TO.up;

    gsap.fromTo(el, from, {
      ...to,
      duration: attrNum(el, "duration", MOTION_DURATION[kind] ?? 0.85),
      delay: attrNum(el, "delay", 0),
      ease: attrStr(el, "ease", "settle"),
      overwrite: "auto",
      onComplete: () => releaseHint(el),
      scrollTrigger: {
        trigger: el,
        start: attrStr(el, "start", DEFAULT_START),
        toggleActions: "play none none none",
      },
    });
  });
}

/**
 * Staggered groups: [data-reveal-group]. Items travel a little further than
 * they fade, and the stagger runs from the group's leading edge so rows read
 * as arriving in sequence rather than blinking on together.
 */
export function buildGroups(root: ParentNode) {
  root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
    const items = groupItems(group);
    if (!items.length) return;

    const kind = (group.dataset.itemReveal || "up-sm") as RevealKind;
    const from = MOTION_FROM[kind] ?? MOTION_FROM["up-sm"];
    const to = MOTION_TO[kind] ?? MOTION_TO["up-sm"];

    gsap.fromTo(items, from, {
      ...to,
      duration: attrNum(group, "duration", 0.75),
      delay: attrNum(group, "delay", 0),
      stagger: attrNum(group, "stagger", 0.075),
      ease: "settle",
      overwrite: "auto",
      onComplete: () => releaseHint(items),
      scrollTrigger: {
        trigger: group,
        start: attrStr(group, "start", "top 84%"),
        toggleActions: "play none none none",
      },
    });
  });
}

/**
 * Real per-line / per-word / per-char text reveals via SplitText.
 *
 * Lines are wrapped in an overflow-hidden mask (`linesClass` + CSS) so each one
 * rises out from behind its own edge — the effect the previous single-block
 * clip-path version could only approximate. Splitting waits for fonts because
 * measuring line boxes before the display face loads produces wrong breaks;
 * `autoSplit` re-splits on resize while keeping the played state.
 */
export function buildSplits(root: ParentNode) {
  root.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
    const mode = (el.dataset.split || "lines") as "lines" | "words" | "chars";
    const onLoad = el.dataset.trigger === "load";

    SplitText.create(el, {
      type: mode,
      mask: mode === "lines" ? "lines" : undefined,
      linesClass: "split-line",
      wordsClass: "split-word",
      charsClass: "split-char",
      autoSplit: true,
      onSplit(self) {
        const targets =
          mode === "lines" ? self.lines : mode === "words" ? self.words : self.chars;
        if (!targets.length) return undefined;

        return gsap.fromTo(
          targets,
          { yPercent: mode === "lines" ? 108 : 0, opacity: mode === "lines" ? 1 : 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: mode === "chars" ? 0.5 : 0.9,
            stagger: mode === "chars" ? 0.014 : 0.085,
            ease: "swift",
            delay: attrNum(el, "delay", 0),
            onComplete: () => releaseHint(targets as Element[]),
            scrollTrigger: onLoad
              ? undefined
              : {
                  trigger: el,
                  start: attrStr(el, "start", "top 88%"),
                  toggleActions: "play none none none",
                },
          }
        );
      },
    });
  });
}

/** Scroll-scrubbed parallax: [data-parallax="0.18"] — fraction of own height. */
export function buildParallax(root: ParentNode) {
  root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
    const depth = attrNum(el, "parallax", 0.15);
    const distance = () => el.offsetHeight * depth;

    gsap.fromTo(
      el,
      { y: () => distance() },
      {
        y: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el.closest("section, .parallax-scope") || el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );
  });
}

/** Count-up figures: [data-counter="25"] with optional data-decimals/suffix. */
export function buildCounters(root: ParentNode) {
  root.querySelectorAll<HTMLElement>("[data-counter]").forEach((el) => {
    const target = attrNum(el, "counter", 0);
    const decimals = attrNum(el, "decimals", 0);
    const state = { v: 0 };

    gsap.to(state, {
      v: target,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = formatCount(state.v, decimals);
      },
      scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" },
    });
  });
}

/** Line-drawing for SVG diagrams: [data-draw] on the <svg> wrapper. */
export function buildDraws(root: ParentNode) {
  root.querySelectorAll<HTMLElement>("[data-draw]").forEach((el) => {
    const strokes = el.querySelectorAll<SVGElement>("[data-draw-line]");
    if (!strokes.length) return;

    gsap.fromTo(
      strokes,
      { drawSVG: "0%" },
      {
        drawSVG: "100%",
        duration: 1.1,
        stagger: 0.08,
        ease: "power2.inOut",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
      }
    );
  });
}

export { ScrollTrigger };
