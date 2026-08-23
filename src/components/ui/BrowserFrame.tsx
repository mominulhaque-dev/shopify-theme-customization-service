import type { ReactNode } from "react";

interface BrowserFrameProps {
  children: ReactNode;
  /** Shown in the fake address bar — keep it plausible, never a real client. */
  url?: string;
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Browser chrome drawn in CSS (see .browser in mockups.css) wrapping any
 * visual, so each mockup SVG only has to describe its own content. Decorative:
 * the frame is aria-hidden and the child carries the accessible description.
 */
export default function BrowserFrame({
  children,
  url = "yourstore.myshopify.com",
  tone = "light",
  className,
}: BrowserFrameProps) {
  return (
    <div className={`browser ${tone === "dark" ? "browser-dark" : ""} ${className ?? ""}`.trim()}>
      <div className="browser-bar" aria-hidden="true">
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-url">{url}</span>
      </div>
      {children}
    </div>
  );
}
