import Link from "next/link";
import Backdrop from "@/components/animations/Backdrop";
import ImageReveal from "@/components/animations/ImageReveal";
import Magnetic from "@/components/animations/Magnetic";
import Reveal from "@/components/animations/Reveal";
import TextReveal from "@/components/animations/TextReveal";
import { Visual } from "@/components/ui/visuals";
import type { PageHeroContent } from "@/types/page";

/**
 * Interior-page hero. Split composition when the page declares a visual, a
 * single wide column when it does not — a guide about identifying a theme does
 * not need a mockup, a service page does.
 *
 * The H1 uses the per-line SplitText reveal with `trigger="load"` (it is above
 * the fold on every page), and each page picks its own backdrop variant so
 * consecutive pages in the same section do not open identically.
 */
export default function PageHero({ hero }: { hero: PageHeroContent }) {
  const dark = hero.tone === "dark";

  return (
    <div className={`phero has-backdrop ${dark ? "phero-dark on-deep" : ""}`}>
      {hero.backdrop && <Backdrop variant={hero.backdrop} tone={dark ? "dark" : "light"} noise shapes />}
      <div className="wrap">
        <div className={`phero-in ${hero.visual ? "" : "solo"}`}>
          <div className="phero-copy">
            <Reveal kind="fade" duration={0.6}>
              <span className="eyebrow">{hero.eyebrow}</span>
            </Reveal>
            <TextReveal as="h1" trigger="load" delay={0.05}>
              {hero.h1}
            </TextReveal>
            <Reveal kind="up-sm" delay={0.22}>
              <p className="phero-lede">{hero.lede}</p>
            </Reveal>

            {(hero.cta || hero.secondary) && (
              <Reveal kind="up-sm" delay={0.3} className="btn-row">
                {hero.cta && (
                  <Magnetic strength={9}>
                    <Link href={hero.cta.href} className={`btn btn-lg ${dark ? "btn-signal" : ""}`}>
                      {hero.cta.label}
                    </Link>
                  </Magnetic>
                )}
                {hero.secondary && (
                  <Link
                    href={hero.secondary.href}
                    className={`btn btn-lg ${dark ? "btn-ghost" : "btn-outline"}`}
                  >
                    {hero.secondary.label}
                  </Link>
                )}
              </Reveal>
            )}

            {hero.meta && hero.meta.length > 0 && (
              <Reveal kind="fade" delay={0.4} as="ul" className="phero-meta">
                {hero.meta.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </Reveal>
            )}
          </div>

          {hero.visual && (
            <ImageReveal className="phero-media" delay={0.15} parallax={0.06}>
              <Visual name={hero.visual} />
            </ImageReveal>
          )}
        </div>
      </div>
    </div>
  );
}
