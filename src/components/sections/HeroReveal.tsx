"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Hero-specific entrance choreography (not scroll-triggered — this plays
 * once on load since the hero is above the fold): deck, lede, CTA row and
 * credentials line stagger in with a slight rise. The H1 itself is handled
 * separately by <TextReveal trigger="load"> in Hero.tsx (mask reveal rather
 * than a plain fade), so it's intentionally excluded from this selector —
 * animating the same node from two places causes a visible conflict.
 */
export default function HeroReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    registerGsap();
    const targets = el.querySelectorAll(".deck, .hero-lede, .hero-cta, .creds");

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: 22 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.35,
      });
    });

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
