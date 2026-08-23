"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

type RevealAs = "div" | "span";

interface RevealProps {
  children: ReactNode;
  /** Vertical offset in px the element travels in from. */
  y?: number;
  delay?: number;
  duration?: number;
  as?: RevealAs;
  className?: string;
  /** ScrollTrigger start position relative to the viewport. */
  start?: string;
}

/**
 * Fades + translates a single block into view once it crosses the given
 * scroll threshold. Building block for section-level choreography — see
 * RevealGroup for staggered lists (cards, steps, FAQ rows).
 */
export default function Reveal({
  children,
  y = 28,
  delay = 0,
  duration = 0.9,
  as = "div",
  className,
  start = "top 85%",
}: RevealProps) {
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
    gsap.set(el, { opacity: 0, y });

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
