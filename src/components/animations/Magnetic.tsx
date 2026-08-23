"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How far the element can travel toward the cursor, in px. */
  strength?: number;
}

/**
 * Wraps a button/link so it subtly pulls toward the cursor while hovered
 * (desktop pointer only — see the `matchMedia` guard) and eases back to
 * rest on leave. Kept restrained (small `strength`) per the brief's "keep
 * it professional, not gimmicky" note.
 */
export default function Magnetic({ children, className, strength = 14 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      gsap.to(el, {
        x: (relX / rect.width) * strength,
        y: (relY / rect.height) * strength,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`magnetic ${className ?? ""}`}>
      {children}
    </div>
  );
}
