"use client";

import { gsap } from "@/lib/gsap";
import { attrNum } from "@/lib/motion";

/**
 * Pinned horizontal scroll: [data-hscroll] pins the section and drives its
 * `.hscroll-track` sideways for the length of the overflow. Desktop only —
 * below 900px the track stays a native swipeable, snap-aligned overflow strip
 * (see .hscroll in page-blocks.css), which is what a thumb actually wants.
 */
export function buildHorizontalScroll(root: ParentNode) {
  if (window.innerWidth < 900) return;

  root.querySelectorAll<HTMLElement>("[data-hscroll]").forEach((section) => {
    const track = section.querySelector<HTMLElement>(".hscroll-track");
    if (!track) return;

    const distance = () => Math.max(0, track.scrollWidth - section.clientWidth + 48);
    if (distance() <= 0) return;

    gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top+=70",
        end: () => `+=${distance() + 200}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  });
}

/**
 * Section arrival transition: [data-curtain] scrubs a section from slightly
 * inset with rounded corners to full-bleed as it enters, so moving between a
 * light and a dark band reads as one panel sliding over another rather than a
 * hard colour switch.
 */
export function buildCurtains(root: ParentNode) {
  root.querySelectorAll<HTMLElement>("[data-curtain]").forEach((el) => {
    const inset = attrNum(el, "curtain", 3);

    gsap.fromTo(
      el,
      {
        clipPath: `inset(${inset}% ${inset}% 0% ${inset}% round 28px)`,
        scale: 0.985,
      },
      {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom-=8%",
          end: "top center",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      }
    );
  });
}

/**
 * Depth on scroll for stacked cards: [data-stack] children scale and lose a
 * little contrast as the next card rides over them. Used on the case-study
 * strip so scrolling feels layered rather than flat.
 */
export function buildStacks(root: ParentNode) {
  root.querySelectorAll<HTMLElement>("[data-stack]").forEach((stack) => {
    const cards = Array.from(stack.children) as HTMLElement[];
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      gsap.to(card, {
        scale: 0.955,
        opacity: 0.55,
        ease: "none",
        scrollTrigger: {
          trigger: cards[i + 1],
          start: "top bottom",
          end: "top center",
          scrub: 0.4,
        },
      });
    });
  });
}
