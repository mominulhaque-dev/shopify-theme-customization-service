import Link from "next/link";
import { hero } from "@/data/homepage";
import Backdrop from "@/components/animations/Backdrop";
import Magnetic from "@/components/animations/Magnetic";
import Reveal from "@/components/animations/Reveal";
import RevealGroup from "@/components/animations/RevealGroup";
import TextReveal from "@/components/animations/TextReveal";
import PriceCard from "@/components/cards/PriceCard";

/**
 * Homepage hero. Copy is verbatim from the approved reference (CLAUDE.md §3);
 * everything else here is presentation.
 *
 * Motion: the H1 splits into masked lines that rise in sequence (`TextReveal`),
 * the supporting block staggers behind it, the credentials count up, and the
 * aurora backdrop drifts its own mask. The price card is deliberately the last
 * thing to arrive — it is the page's proof, so it lands after the claim.
 */
export default function Hero() {
  return (
    <div className="hero-band has-backdrop">
      <Backdrop variant="aurora" noise shapes />
      <div className="wrap">
        <div className="hero">
          <div className="hero-copy">
            <TextReveal as="h1" trigger="load">
              {hero.h1Before}
              <em>{hero.h1Emphasis}</em>
              {hero.h1After}
            </TextReveal>

            <RevealGroup items=".hero-stagger" stagger={0.11} delay={0.3} itemReveal="up">
              <p className="deck hero-stagger">{hero.deck}</p>
              <p className="hero-lede hero-stagger">{hero.lede}</p>
              <div className="hero-cta hero-stagger">
                <Magnetic strength={10}>
                  <Link href={hero.ctaHref} className="btn btn-lg btn-arrow">
                    {hero.ctaLabel}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M3 8h10m0 0-4-4m4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </Magnetic>
                <span className="hero-note">{hero.note}</span>
              </div>
              <div className="creds hero-stagger">
                <span className="partner">{hero.creds.partner}</span>
                <span>
                  <b>
                    <span data-counter="25">25</span>+
                  </b>{" "}
                  theme projects delivered
                </span>
                <span>
                  <b data-counter="10">10</b> documented case studies
                </span>
              </div>
            </RevealGroup>
          </div>

          <Reveal kind="up" delay={0.45} className="hero-aside">
            <PriceCard />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
