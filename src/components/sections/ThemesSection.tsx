import Link from "next/link";
import { themeNotes, themeRows, themesSection } from "@/data/homepage";
import Backdrop from "@/components/animations/Backdrop";
import ImageReveal from "@/components/animations/ImageReveal";
import Marquee from "@/components/animations/Marquee";
import Reveal from "@/components/animations/Reveal";
import RevealGroup from "@/components/animations/RevealGroup";
import TextReveal from "@/components/animations/TextReveal";
import BrowserFrame from "@/components/ui/BrowserFrame";
import ThemeEditorMockup from "@/components/ui/ThemeEditorMockup";
import { SectionStackDiagram } from "@/components/ui/mockups-diagram";

/**
 * Which themes we customize. Copy verbatim (CLAUDE.md §3).
 *
 * The visual is an overlapping composition — the theme editor with the section
 * architecture diagram riding its corner — because the argument on this section
 * is precisely that what the editor exposes depends on how the theme is built.
 * Every theme chip is a real link: named themes to their own page, the rest to
 * the comparison.
 */
export default function ThemesSection() {
  const allChips = themeRows.flatMap((row) => row.chips);

  return (
    <section aria-labelledby="themes-heading" className="has-backdrop">
      <Backdrop variant="dots" />
      <div className="wrap">
        <div className="split themes-intro">
          <div className="split-copy">
            <Reveal kind="fade" duration={0.6}>
              <span className="eyebrow">{themesSection.eyebrow}</span>
            </Reveal>
            <TextReveal as="h2" id="themes-heading">
              {themesSection.h2}
            </TextReveal>
            <Reveal kind="up-sm" delay={0.08}>
              <p>{themesSection.paragraph}</p>
              <p className="btn-row" style={{ marginTop: "1.15rem" }}>
                <Link href="/themes/" className="btn btn-outline btn-sm">
                  Compare theme ceilings
                </Link>
              </p>
            </Reveal>
          </div>
          <div className="split-media">
            <ImageReveal delay={0.12} parallax={0.07}>
              <div className="figure-stack">
                <BrowserFrame url="admin.shopify.com/store/…/themes/editor">
                  <ThemeEditorMockup />
                </BrowserFrame>
                <div className="figure-front figure">
                  <SectionStackDiagram />
                </div>
              </div>
            </ImageReveal>
          </div>
        </div>

        <Reveal kind="fade" className="theme-marquee">
          <Marquee speed={44} label="Themes we customize regularly">
            {allChips.map((chip) => (
              /* Plain spans, not links: the strip is duplicated to loop
                 seamlessly, and two focusable copies of the same link would
                 double every theme in the tab order. The real links are the
                 chips in the rows below. */
              <span className="chip" key={chip}>
                {chip}
              </span>
            ))}
          </Marquee>
        </Reveal>

        <RevealGroup items=".theme-row" itemReveal="up-sm" stagger={0.1}>
          {themeRows.map((row, i) => (
            <div className="theme-row" key={row.name}>
              <h3>
                {row.name}
                <small>{row.note}</small>
              </h3>
              <div>
                <div className="chips">
                  {row.chips.map((chip) => (
                    <Link href={themeChipHref(chip)} className="chip" key={chip}>
                      {chip}
                    </Link>
                  ))}
                </div>
                <p className="theme-note">{themeNotes[i]}</p>
              </div>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

const CHIP_PAGES: Record<string, string> = {
  // Dawn: "/customization/dawn/",
  // Prestige: "/customization/prestige/",
  // Spotlight: "/customization/spotlight/",
  // Debut: "/customization/legacy-themes/",
  // Brooklyn: "/customization/legacy-themes/",
  // Minimal: "/customization/legacy-themes/",
  // Supply: "/customization/legacy-themes/",
  // Turbo: "/customization/legacy-themes/",
  // Narrative: "/customization/legacy-themes/",
};

function themeChipHref(chip: string) {
  return CHIP_PAGES[chip] ?? "/themes/";
}
