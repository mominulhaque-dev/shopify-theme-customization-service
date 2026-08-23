import type { ReactNode } from "react";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  start?: string;
  /**
   * Fraction of the element's own height it drifts across the scroll range.
   * Small values only (0.05–0.2) — enough to separate the visual from the text
   * beside it, not enough to look like it is sliding off the page.
   */
  parallax?: number;
}

/**
 * Reveal for imagery, mockups and diagrams: a clipped, slightly over-scaled
 * start that settles into place, optionally with a scrubbed parallax drift.
 *
 * The parallax lives on an inner element so the two transforms never fight:
 * the outer node owns the entrance (scale + clip-path), the inner owns the
 * scroll-scrubbed y.
 */
export default function ImageReveal({
  children,
  className,
  delay,
  start,
  parallax,
}: ImageRevealProps) {
  const inner = parallax ? <div data-parallax={parallax}>{children}</div> : children;

  return (
    <div className={className} data-reveal="image" data-delay={delay} data-start={start}>
      {inner}
    </div>
  );
}
