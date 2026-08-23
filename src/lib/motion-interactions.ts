"use client";

import { gsap, isFinePointer } from "@/lib/gsap";
import { attrNum, attrStr } from "@/lib/motion";

type Cleanup = () => void;

/**
 * Cursor-follow spotlight + subtle 3D tilt on [data-tilt] cards.
 * Pointer-fine only: on touch the card keeps its CSS border/shadow hover and
 * nothing else, because a tilt that never resets is worse than no tilt.
 */
export function bindTilt(root: ParentNode): Cleanup[] {
  if (!isFinePointer()) return [];

  return Array.from(root.querySelectorAll<HTMLElement>("[data-tilt]")).map((el) => {
    const max = attrNum(el, "tilt", 5);
    const quickX = gsap.quickTo(el, "rotateX", { duration: 0.5, ease: "power2.out" });
    const quickY = gsap.quickTo(el, "rotateY", { duration: 0.5, ease: "power2.out" });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", `${nx * 100}%`);
      el.style.setProperty("--my", `${ny * 100}%`);
      if (max > 0) {
        quickY((nx - 0.5) * max);
        quickX((ny - 0.5) * -max);
      }
    };
    const onLeave = () => {
      el.style.setProperty("--mx", "50%");
      el.style.setProperty("--my", "50%");
      if (max > 0) {
        quickX(0);
        quickY(0);
      }
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  });
}

/** Buttons that pull toward the cursor: [data-magnetic="12"]. */
export function bindMagnetic(root: ParentNode): Cleanup[] {
  if (!isFinePointer()) return [];

  return Array.from(root.querySelectorAll<HTMLElement>("[data-magnetic]")).map((el) => {
    const strength = attrNum(el, "magnetic", 10);
    const quickX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power2.out" });
    const quickY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power2.out" });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      quickX(((e.clientX - (r.left + r.width / 2)) / r.width) * strength);
      quickY(((e.clientY - (r.top + r.height / 2)) / r.height) * strength);
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.45)" });
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  });
}

/**
 * Seamless marquee. The component renders its children twice, so shifting the
 * track by exactly half its width and wrapping is invisible.
 */
export function buildMarquees(root: ParentNode) {
  root.querySelectorAll<HTMLElement>("[data-marquee]").forEach((el) => {
    const track = el.querySelector<HTMLElement>(".marquee-track");
    if (!track) return;
    const speed = attrNum(el, "marquee", 38); // seconds per full cycle
    const dir = attrStr(el, "direction", "left") === "right" ? 1 : -1;

    gsap.fromTo(
      track,
      { xPercent: dir < 0 ? 0 : -50 },
      {
        xPercent: dir < 0 ? -50 : 0,
        duration: speed,
        ease: "none",
        repeat: -1,
      }
    );
  });
}

/**
 * Backdrop life: the mask centre of an aurora / grid / dot field wanders on a
 * long yoyo, so the *mask* moves rather than only the shapes underneath it.
 * [data-mask-move] with data-prop naming which custom properties to drive.
 */
export function buildBackdropMotion(root: ParentNode) {
  root.querySelectorAll<HTMLElement>("[data-mask-move]").forEach((el) => {
    const prop = attrStr(el, "prop", "mask");
    gsap.to(el, {
      [`--${prop}-x`]: attrStr(el, "toX", "66%"),
      [`--${prop}-y`]: attrStr(el, "toY", "62%"),
      duration: attrNum(el, "maskMove", 16),
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  });

  root.querySelectorAll<HTMLElement>("[data-sweep]").forEach((el) => {
    gsap.fromTo(
      el,
      { xPercent: -70 },
      {
        xPercent: 170,
        duration: attrNum(el, "sweep", 11),
        ease: "sine.inOut",
        repeat: -1,
        repeatDelay: attrNum(el, "sweepDelay", 1.2),
      }
    );
  });

  root.querySelectorAll<HTMLElement>("[data-drift]").forEach((el) => {
    const amount = attrNum(el, "drift", 18);
    gsap.to(el, {
      x: `random(-${amount}, ${amount})`,
      y: `random(-${amount}, ${amount})`,
      rotate: `random(-6, 6)`,
      duration: attrNum(el, "driftDuration", 9),
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      repeatRefresh: true,
    });
  });
}

/** Top-of-page reading progress bar: [data-scroll-progress]. */
export function buildScrollProgress(root: ParentNode) {
  const bar = root.querySelector<HTMLElement>("[data-scroll-progress]");
  if (!bar) return;

  gsap.to(bar, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: { start: 0, end: "max", scrub: 0.25 },
  });
}
