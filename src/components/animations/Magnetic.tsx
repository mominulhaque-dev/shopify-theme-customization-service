import type { ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** Max travel toward the cursor, in px. Keep small — 8–14 reads as intent. */
  strength?: number;
}

/**
 * Wraps a button/link so it pulls gently toward the cursor. Server component;
 * MotionProvider binds the pointer handlers and skips them entirely on touch
 * devices, where a magnet that never releases is worse than none.
 */
export default function Magnetic({ children, className, strength = 10 }: MagneticProps) {
  return (
    <span className={`magnetic ${className ?? ""}`.trim()} data-magnetic={strength}>
      {children}
    </span>
  );
}
