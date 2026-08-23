import type { ReactNode } from "react";
import Backdrop, { type BackdropVariant } from "@/components/animations/Backdrop";

interface SectionShellProps {
  children: ReactNode;
  tone?: "plain" | "tint" | "dark";
  backdrop?: BackdropVariant;
  /** Adds the scrubbed clip-path arrival transition (dark bands mainly). */
  curtain?: boolean;
  className?: string;
  labelledBy?: string;
  id?: string;
  wide?: boolean;
}

/**
 * The one place a page block becomes a <section>: owns the tone (paper / tinted
 * / dark), the optional animated backdrop and the container. Blocks below only
 * describe their content, which is what keeps 40-odd pages visually consistent
 * without every block re-deciding its own padding.
 */
export default function SectionShell({
  children,
  tone = "plain",
  backdrop,
  curtain = false,
  className,
  labelledBy,
  id,
  wide = false,
}: SectionShellProps) {
  const classes = [
    tone === "tint" ? "tint" : "",
    tone === "dark" ? "dark on-deep" : "",
    backdrop ? "has-backdrop" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id={id}
      className={classes || undefined}
      aria-labelledby={labelledBy}
      data-curtain={curtain ? 3 : undefined}
    >
      {backdrop && <Backdrop variant={backdrop} tone={tone === "dark" ? "dark" : "light"} noise />}
      <div className={wide ? "wrap wrap-wide" : "wrap"}>{children}</div>
    </section>
  );
}
