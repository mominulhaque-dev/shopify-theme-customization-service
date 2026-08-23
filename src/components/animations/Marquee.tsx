import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds per full cycle. Higher is slower. */
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  label?: string;
}

/**
 * Seamless infinite strip. Children are rendered twice — the second copy is
 * aria-hidden — so MotionProvider can translate the track by exactly -50% and
 * loop with no visible seam. Used for the supported-theme list, where a
 * horizontal drift communicates breadth better than a wrapped chip cloud.
 */
export default function Marquee({
  children,
  speed = 38,
  direction = "left",
  className,
  label,
}: MarqueeProps) {
  return (
    <div
      className={`marquee ${className ?? ""}`.trim()}
      data-marquee={speed}
      data-direction={direction}
      role={label ? "group" : undefined}
      aria-label={label}
    >
      <div className="marquee-track">
        <div className="marquee-set">{children}</div>
        <div className="marquee-set" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
