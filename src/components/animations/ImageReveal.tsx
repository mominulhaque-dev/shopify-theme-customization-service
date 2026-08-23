"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  start?: string;
}

/**
 * Scroll-triggered reveal for imagery/illustrations/mockups: the visual
 * starts slightly scaled up and clipped, then settles into place as it
 * enters the viewport — reads as the image "arriving" rather than fading.
 * Separate from TextReveal (which masks from the bottom edge) since images
 * read better easing in from a gentle scale than a hard directional wipe.
 */
export default function ImageReveal({ children, className, delay = 0, start = "top 82%" }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    registerGsap();
    gsap.set(el, { opacity: 0, scale: 1.06, clipPath: "inset(3% 3% 3% 3% round 12px)" });

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        clipPath: "inset(0% 0% 0% 0% round 12px)",
        duration: 1.1,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start, toggleActions: "play none none none" },
      });
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
