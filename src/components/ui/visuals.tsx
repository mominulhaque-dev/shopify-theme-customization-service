import BrowserFrame from "@/components/ui/BrowserFrame";
import CodePanel from "@/components/ui/CodePanel";
import ThemeEditorMockup from "@/components/ui/ThemeEditorMockup";
import { MobileLayoutMockup, ProductPageMockup, StorefrontMockup } from "@/components/ui/mockups-store";
import { BeforeAfterMockup, MigrationDiagram, SectionStackDiagram } from "@/components/ui/mockups-diagram";
import { FunnelChart, SpeedGauge, ThemeCeilingChart } from "@/components/ui/mockups-data";
import { FontSpecimen, PaletteSwatches } from "@/components/ui/mockups-brand";
import { BreakpointGrid, HandoverCard, TimelineGantt } from "@/components/ui/mockups-process";
import {
  CSS_SNIPPET,
  JSON_TEMPLATE_SNIPPET,
  JS_SNIPPET,
  LIQUID_SNIPPET,
  SCHEMA_SNIPPET,
} from "@/components/ui/code-samples";

/**
 * Registry of every page visual, keyed by name so page content data can ask for
 * `visual: "product-page"` without importing components. Keeping the mapping in
 * one place is also what makes it a one-line swap when a real screenshot
 * replaces an illustration (CLAUDE.md §"Image strategy").
 */
export const VISUALS = {
  "theme-editor": () => (
    <BrowserFrame url="admin.shopify.com/store/…/themes/editor">
      <ThemeEditorMockup />
    </BrowserFrame>
  ),
  storefront: () => (
    <BrowserFrame>
      <StorefrontMockup />
    </BrowserFrame>
  ),
  "product-page": () => (
    <BrowserFrame url="yourstore.myshopify.com/products/…">
      <ProductPageMockup />
    </BrowserFrame>
  ),
  mobile: () => (
    <div className="phone">
      <MobileLayoutMockup />
    </div>
  ),
  "before-after": () => (
    <div className="figure">
      <BeforeAfterMockup />
    </div>
  ),
  migration: () => (
    <div className="figure">
      <MigrationDiagram />
    </div>
  ),
  sections: () => (
    <div className="figure">
      <SectionStackDiagram />
    </div>
  ),
  speed: () => (
    <div className="figure">
      <SpeedGauge />
    </div>
  ),
  funnel: () => (
    <div className="figure">
      <FunnelChart />
    </div>
  ),
  ceiling: () => (
    <div className="figure">
      <ThemeCeilingChart />
    </div>
  ),
  fonts: () => (
    <div className="figure">
      <FontSpecimen />
    </div>
  ),
  palette: () => (
    <div className="figure">
      <PaletteSwatches />
    </div>
  ),
  breakpoints: () => (
    <div className="figure">
      <BreakpointGrid />
    </div>
  ),
  timeline: () => (
    <div className="figure">
      <TimelineGantt />
    </div>
  ),
  handover: () => (
    <div className="figure">
      <HandoverCard />
    </div>
  ),
  "code-liquid": () => <CodePanel file="sections/featured-bundle.liquid" lang="liquid" code={LIQUID_SNIPPET} />,
  "code-schema": () => <CodePanel file="sections/featured-bundle.liquid" lang="json" code={SCHEMA_SNIPPET} />,
  "code-css": () => <CodePanel file="assets/custom.css" lang="css" code={CSS_SNIPPET} />,
  "code-js": () => <CodePanel file="assets/bundle.js" lang="js" code={JS_SNIPPET} />,
  "code-template": () => <CodePanel file="templates/product.json" lang="json" code={JSON_TEMPLATE_SNIPPET} />,

  /* Overlapping compositions — a second, smaller visual riding the corner of a
     larger one, for sections that need more presence than a single figure. */
  "overlap-store": () => (
    <div className="figure-stack">
      <BrowserFrame>
        <StorefrontMockup />
      </BrowserFrame>
      <div className="figure-front phone">
        <MobileLayoutMockup />
      </div>
    </div>
  ),
  "overlap-editor": () => (
    <div className="figure-stack">
      <BrowserFrame url="admin.shopify.com/store/…/themes/editor">
        <ThemeEditorMockup />
      </BrowserFrame>
      <div className="figure-front figure">
        <SectionStackDiagram />
      </div>
    </div>
  ),
  "overlap-product": () => (
    <div className="figure-stack">
      <BrowserFrame url="yourstore.myshopify.com/products/…">
        <ProductPageMockup />
      </BrowserFrame>
      <div className="figure-front phone">
        <MobileLayoutMockup />
      </div>
    </div>
  ),
} as const;

export type VisualKey = keyof typeof VISUALS;

/** Renders a registered visual, or nothing if the key is unknown. */
export function Visual({ name }: { name: VisualKey }) {
  const Component = VISUALS[name];
  return Component ? <Component /> : null;
}
