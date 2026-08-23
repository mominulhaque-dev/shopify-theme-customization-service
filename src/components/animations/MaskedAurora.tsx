"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

interface MaskedAuroraProps {
  className?: string;
  /** Different sections get a different palette/scale, not one copy-pasted effect everywhere. */
  variant?: "hero" | "dark";
}

/**
 * Ambient, decorative-only background motion (aria-hidden, pointer-events
 * none throughout). Two layers:
 *  1. Blurred color blobs drifting via a CSS keyframe (cheap, GPU-only —
 *     see .blob in sections.css).
 *  2. A `mask-image: radial-gradient(...)` layer whose center is animated
 *     by GSAP through two CSS custom properties (--mask-x/--mask-y), which
 *     slowly reshapes which part of the blob layer is visible — this is
 *     the actual "mask animation" the brief asked for, distinct from the
 *     blobs just moving underneath a static mask.
 * Fully inert under prefers-reduced-motion: blobs stop animating (handled
 * by the global reduced-motion CSS rule) and the mask GSAP tween is
 * skipped so the mask sits in one fixed, still position.
 */
export default function MaskedAurora({ className, variant = "hero" }: MaskedAuroraProps) {
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = maskRef.current;
    if (!el || prefersReducedMotion()) return;

    const tween = gsap.to(el, {
      "--mask-x": "65%",
      "--mask-y": "60%",
      duration: 14,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div className={`${className ?? ""} aurora aurora--${variant}`} aria-hidden="true">
      <span className="blob b1" />
      <span className="blob b2" />
      <div ref={maskRef} className="aurora-mask" />
    </div>
  );
}
