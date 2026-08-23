import type { ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees; 0 keeps the cursor spotlight and drops the tilt. */
  tilt?: number;
}

/**
 * Card shell with two premium hover behaviours instead of a plain translateY:
 * a radial spotlight that tracks the cursor (drawn by .spotlight-card::after
 * from the --mx/--my custom properties) and an optional 3D tilt.
 *
 * Server component — MotionProvider binds the pointer handlers, and only on
 * hover-capable pointers.
 */
export default function SpotlightCard({ children, className, tilt = 5 }: SpotlightCardProps) {
  return (
    <div className={`spotlight-card ${className ?? ""}`.trim()} data-tilt={tilt}>
      {children}
    </div>
  );
}
