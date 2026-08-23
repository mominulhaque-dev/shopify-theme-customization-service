"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. Set to 0 to disable tilt and keep only the glow. */
  tilt?: number;
}

/**
 * Adds two premium hover behaviors to a card, replacing the plain
 * `translateY` hover used elsewhere: a soft radial "spotlight" that tracks
 * the cursor via CSS custom properties (--mx/--my, read by .spotlight-card
 * in sections.css), and an optional subtle 3D tilt. Both are GPU-cheap
 * (custom-property + transform only) and skipped entirely on touch devices
 * and reduced-motion, where the card falls back to its static border/shadow
 * hover already defined in CSS.
 */
export default function SpotlightCard({ children, className, tilt = 6 }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${px}%`);
      el.style.setProperty("--my", `${py}%`);

      if (tilt > 0) {
        const rotY = ((e.clientX - rect.left) / rect.width - 0.5) * tilt;
        const rotX = ((e.clientY - rect.top) / rect.height - 0.5) * -tilt;
        gsap.to(el, { rotateX: rotX, rotateY: rotY, duration: 0.4, ease: "power2.out" });
      }
    };

    const handleLeave = () => {
      el.style.setProperty("--mx", "50%");
      el.style.setProperty("--my", "50%");
      if (tilt > 0) {
        gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
      }
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [tilt]);

  return (
    <div ref={ref} className={`spotlight-card ${className ?? ""}`} style={{ perspective: 800 }}>
      {children}
    </div>
  );
}
