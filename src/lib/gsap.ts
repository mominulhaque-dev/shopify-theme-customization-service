"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { CustomEase } from "gsap/CustomEase";

let registered = false;

/**
 * Register GSAP plugins exactly once, client-side only.
 *
 * SplitText / DrawSVG / CustomEase ship in the free npm package from GSAP
 * 3.13 onward (this project is pinned to ^3.15), which is what makes real
 * per-line heading reveals and line-drawing diagram animation possible
 * without hand-rolled text measurement.
 */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, CustomEase);

  // Signature easing for this site: a long, low-overshoot settle. Used for
  // every entrance so the whole page shares one motion character.
  CustomEase.create("settle", "M0,0 C0.16,1 0.3,1 1,1");
  CustomEase.create("swift", "M0,0 C0.34,1.02 0.24,1 1,1");

  gsap.defaults({ ease: "settle", duration: 0.9 });
  registered = true;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True only on devices with a real hover-capable pointer (no touch tilt/magnet). */
export function isFinePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/**
 * Single source of truth for whether JS-driven motion should run at all.
 * Mirrors the inline bootstrap script in layout.tsx that adds `.motion` to
 * <html>: if that class is absent, CSS is showing the finished state and no
 * animation may run (otherwise elements would be re-hidden after paint).
 */
export function motionEnabled() {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("motion");
}

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, CustomEase };
