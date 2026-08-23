import type { ElementType, ReactNode } from "react";
import type { RevealKind } from "@/lib/motion";

export type { RevealKind };

interface RevealProps {
  children: ReactNode;
  /** Which entrance to use — see MOTION_FROM in src/lib/motion.ts. */
  kind?: RevealKind;
  delay?: number;
  duration?: number;
  /** ScrollTrigger start position. */
  start?: string;
  as?: ElementType;
  className?: string;
  id?: string;
}

/**
 * Declares a single-block entrance. This is a *server* component: it only
 * emits data attributes, and MotionProvider (the one client component that
 * loads GSAP) wires up the actual tween. Nothing here ships JS to the browser.
 */
export default function Reveal({
  children,
  kind = "up",
  delay,
  duration,
  start,
  as: Tag = "div",
  className,
  id,
}: RevealProps) {
  return (
    <Tag
      id={id}
      className={className}
      data-reveal={kind}
      data-delay={delay}
      data-duration={duration}
      data-start={start}
    >
      {children}
    </Tag>
  );
}
