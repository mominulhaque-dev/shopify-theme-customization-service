import type { ElementType, ReactNode } from "react";

interface TextRevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /**
   * `lines` (default) masks each measured line and rises them in sequence —
   * the real per-line stagger, via GSAP SplitText, that the earlier
   * single-block clip-path version could only approximate. `words` and
   * `chars` are for short display strings only; never body copy.
   */
  mode?: "lines" | "words" | "chars";
  /** `load` plays immediately (above-the-fold headings); default waits for scroll. */
  trigger?: "scroll" | "load";
  delay?: number;
  start?: string;
  id?: string;
}

/**
 * Heading reveal. Server component: emits `data-split` and MotionProvider does
 * the splitting after webfonts settle (measuring line boxes before the display
 * face loads produces wrong breaks) and re-splits on resize.
 *
 * Reserved for h1/h2 — splitting body paragraphs hurts both reading and
 * screen-reader output for no visual gain.
 */
export default function TextReveal({
  children,
  as: Tag = "h2",
  className,
  mode = "lines",
  trigger = "scroll",
  delay,
  start,
  id,
}: TextRevealProps) {
  return (
    <Tag
      id={id}
      className={className}
      data-split={mode}
      data-trigger={trigger}
      data-delay={delay}
      data-start={start}
    >
      {children}
    </Tag>
  );
}
