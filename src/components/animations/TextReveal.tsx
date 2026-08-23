"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

interface TextRevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Scroll-triggered (default) or plays immediately on mount, e.g. inside the hero. */
  trigger?: "scroll" | "load";
  delay?: number;
  start?: string;
}

/**
 * Mask-reveal heading: the heading sits inside an `overflow: hidden` wrapper
 * and animates in via `clip-path` (inset from the bottom edge) combined with
 * a slight rise + fade, so it reads as the text being "unmasked" rather than
 * a generic fade. Deliberately a single-block technique (not per-line/
 * per-character split) since accurate line-splitting needs real-browser
 * measurement this sandbox can't verify — see CLAUDE.md "Animation system"
 * for the per-line upgrade path once this is running in a browser.
 *
 * Reserved for hero H1s and section H2s per the brief, not body copy.
 */
export default function TextReveal({
  children,
  as: Tag = "h2",
  className,
  trigger = "scroll",
  delay = 0,
  start = "top 85%",
}: TextRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    if (prefersReducedMotion()) {
      inner.style.opacity = "1";
      inner.style.clipPath = "none";
      inner.style.transform = "none";
      return;
    }

    registerGsap();
    gsap.set(inner, {
      opacity: 0,
      y: "0.5em",
      clipPath: "inset(0 0 100% 0)",
    });

    const play = () =>
      gsap.to(inner, {
        opacity: 1,
        y: "0em",
        clipPath: "inset(0 0 0% 0)",
        duration: 0.9,
        delay,
        ease: "power4.out",
      });

    if (trigger === "load") {
      play();
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(inner, {
        opacity: 1,
        y: "0em",
        clipPath: "inset(0 0 0% 0)",
        duration: 0.9,
        delay,
        ease: "power4.out",
        scrollTrigger: { trigger: wrapperRef.current, start, toggleActions: "play none none none" },
      });
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapperRef} className="text-reveal-wrap">
      <Tag ref={innerRef as never} className={className}>
        {children}
      </Tag>
    </div>
  );
}
