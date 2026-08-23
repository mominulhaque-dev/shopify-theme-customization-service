"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

interface RevealGroupProps {
  /** Each child becomes one staggered item — pass an array of elements. */
  children: ReactNode;
  className?: string;
  /** CSS selector (relative to the wrapper) for items to stagger. */
  itemSelector?: string;
  stagger?: number;
  y?: number;
  start?: string;
}

/**
 * Staggers the direct children (or a selector within them) into view as a
 * group crosses the scroll threshold — used for tier lists, case-study
 * grids, process steps and FAQ rows so each section has its own rhythm
 * rather than one repeated fade-in.
 */
export default function RevealGroup({
  children,
  className,
  itemSelector = ":scope > *",
  stagger = 0.08,
  y = 24,
  start = "top 82%",
}: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll(itemSelector);
    if (!items.length) return;

    if (prefersReducedMotion()) {
      items.forEach((item) => {
        (item as HTMLElement).style.opacity = "1";
        (item as HTMLElement).style.transform = "none";
      });
      return;
    }

    registerGsap();
    gsap.set(items, { opacity: 0, y });

    const ctx = gsap.context(() => {
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger,
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
  }, [itemSelector, stagger, y, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
