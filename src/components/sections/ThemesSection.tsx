import Link from "next/link";
import { themeNotes, themeRows, themesSection } from "@/data/homepage";
import Backdrop from "@/components/animations/Backdrop";
import { Visual } from "@/components/ui/visuals";
import ImageReveal from "@/components/animations/ImageReveal";
import Marquee from "@/components/animations/Marquee";
import Reveal from "@/components/animations/Reveal";
import RevealGroup from "@/components/animations/RevealGroup";
import TextReveal from "@/components/animations/TextReveal";

/**
 * Which themes we customize. Copy verbatim (CLAUDE.md §3).
 *
 * The visual compares the three kinds of theme from the store owner's side
 * (easy to change / change with care / upgrade first) rather than showing the
 * theme editor's internals.
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
            </Reveal>
          </div>
          <div className="split-media">
            <ImageReveal delay={0.12} parallax={0.07}>
              <div className="figure">
                <Visual name="ill-theme-fit" />
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
                    <span className="chip chip-static" key={chip}>
                      {chip}
                    </span>
                  ))}
                </div>
                <p className="theme-note">{themeNotes[i]}</p>
              </div>
            </div>
          ))}
        </RevealGroup>

        <Reveal kind="up-sm" className="themes-more">
          <Link href="/themes/" className="chip chip-more">
            More
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
