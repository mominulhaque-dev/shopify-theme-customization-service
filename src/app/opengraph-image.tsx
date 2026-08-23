import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = "Shopify Theme Customization Services — scoped and priced before we start";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Rendered on request rather than at build time. @vercel/og (which next/og
 * wraps) fails to resolve its own WASM asset when the project path contains
 * spaces or brackets, which is true of this checkout — prerendering it would
 * break `next build` locally for a reason that does not exist on the host.
 * Generating per request costs one cached render and keeps the build green.
 */
export const dynamic = "force-dynamic";

/**
 * Generated OG card, so there is no binary asset to keep in sync with the
 * palette. Uses next/og's bundled font — no network fetch at build time, which
 * matters because this build environment cannot reach Google's font CDN.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#052e21",
          padding: "72px",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 18, height: 18, background: "#17c47f", transform: "rotate(45deg)" }} />
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#7fd9b4", textTransform: "uppercase" }}>
            Shopify Partner
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, lineHeight: 1.05, fontWeight: 700, letterSpacing: -2 }}>
            Shopify theme customization,
            <br />
            <span style={{ color: "#17c47f" }}>scoped and priced</span> before we start.
          </div>
          <div style={{ fontSize: 28, color: "#a9c8bb" }}>
            Fixed scope, written price, delivery date. From $1,000.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #12503c",
            paddingTop: 28,
            fontSize: 24,
            color: "#7ba795",
          }}
        >
          <div>{siteConfig.url.replace("https://", "")}</div>
          <div>25+ theme projects delivered</div>
        </div>
      </div>
    ),
    size
  );
}
