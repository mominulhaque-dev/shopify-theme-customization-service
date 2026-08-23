import Link from "next/link";
import { themeNotes, themeRows, themesSection } from "@/data/homepage";
import Reveal from "@/components/animations/Reveal";
import RevealGroup from "@/components/animations/RevealGroup";
import TextReveal from "@/components/animations/TextReveal";
import ImageReveal from "@/components/animations/ImageReveal";
import ThemeEditorMockup from "@/components/ui/ThemeEditorMockup";

export default function ThemesSection() {
  return (
    <section aria-labelledby="themes-heading">
      <div className="wrap">
        <div className="split-visual">
          <Reveal as="div" className="head" y={20}>
            <span className="eyebrow">{themesSection.eyebrow}</span>
            <TextReveal as="h2">
              <span id="themes-heading">{themesSection.h2}</span>
            </TextReveal>
            <p>{themesSection.paragraph}</p>
          </Reveal>
          <ImageReveal className="split-visual-media" delay={0.15}>
            <ThemeEditorMockup />
          </ImageReveal>
        </div>

        <RevealGroup itemSelector=".theme-row" y={16}>
          {themeRows.map((row, i) => (
            <div className="theme-row" key={row.name}>
              <h3>
                {row.name}
                <small>{row.note}</small>
              </h3>
              <div>
                <div className="chips">
                  {row.chips.map((chip) => (
                    <Link href="/customization/dawn/" className="chip" key={chip}>
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
