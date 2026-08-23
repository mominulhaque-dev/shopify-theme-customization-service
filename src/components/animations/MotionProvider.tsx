"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, motionEnabled, registerGsap } from "@/lib/gsap";
import {
  buildCounters,
  buildDraws,
  buildGroups,
  buildParallax,
  buildReveals,
  buildSplits,
} from "@/lib/motion-reveals";
import {
  bindMagnetic,
  bindTilt,
  buildBackdropMotion,
  buildMarquees,
  buildScrollProgress,
} from "@/lib/motion-interactions";
import { buildCurtains, buildHorizontalScroll, buildStacks } from "@/lib/motion-pin";

/**
 * One orchestrator for the whole motion system.
 *
 * Sections stay server components and declare what they want with data
 * attributes (`data-reveal`, `data-split`, `data-parallax`, `data-tilt`, …);
 * this provider is the only client component that touches GSAP. That keeps
 * animation out of the page bundles, guarantees every effect shares one
 * ScrollTrigger/context lifecycle, and makes a new effect a one-line attribute
 * rather than another wrapper component.
 *
 * Everything is gated on `motionEnabled()` — the `.motion` class the inline
 * bootstrap in layout.tsx adds only when JS is running and the visitor has not
 * asked for reduced motion. Without it, CSS is already showing the finished
 * state and this file does nothing at all.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!motionEnabled()) return;

    registerGsap();

    const cleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      // entrances
      buildReveals(document);
      buildGroups(document);
      buildSplits(document);
      // scroll-driven
      buildParallax(document);
      buildCurtains(document);
      buildStacks(document);
      buildHorizontalScroll(document);
      buildScrollProgress(document);
      // ambient + on-demand
      buildBackdropMotion(document);
      buildMarquees(document);
      buildCounters(document);
      buildDraws(document);
    });

    cleanups.push(...bindTilt(document), ...bindMagnetic(document));

    // Trigger positions depend on final text metrics; refresh once webfonts
    // have swapped in and again after late layout (images, embedded SVG).
    const refresh = () => ScrollTrigger.refresh();
    const timer = window.setTimeout(refresh, 450);
    if (document.fonts?.ready) void document.fonts.ready.then(refresh);

    return () => {
      window.clearTimeout(timer);
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [pathname]);

  return <>{children}</>;
}
