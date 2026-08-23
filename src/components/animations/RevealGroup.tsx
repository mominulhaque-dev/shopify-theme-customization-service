import type { ElementType, ReactNode } from "react";
import type { RevealKind } from "@/components/animations/Reveal";

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  /**
   * CSS selector for the items to stagger, relative to the wrapper. Leave
   * unset to use the wrapper's direct children (or the <li>s of a single
   * child list) — those are the two shapes the pre-paint CSS in motion.css
   * hides, so a custom selector should also resolve to direct children.
   */
  items?: string;
  stagger?: number;
  delay?: number;
  duration?: number;
  itemReveal?: RevealKind;
  start?: string;
  as?: ElementType;
  id?: string;
}

/**
 * Declares a staggered group entrance (card grids, tier rows, process steps,
 * FAQ rows). Server component — MotionProvider reads these attributes and
 * builds the stagger. See Reveal for the rationale.
 */
export default function RevealGroup({
  children,
  className,
  items,
  stagger,
  delay,
  duration,
  itemReveal = "up-sm",
  start,
  as: Tag = "div",
  id,
}: RevealGroupProps) {
  return (
    <Tag
      id={id}
      className={className}
      data-reveal-group=""
      data-items={items}
      data-stagger={stagger}
      data-delay={delay}
      data-duration={duration}
      data-item-reveal={itemReveal}
      data-start={start}
    >
      {children}
    </Tag>
  );
}
