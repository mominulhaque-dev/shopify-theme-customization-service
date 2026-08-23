import { hero } from "@/data/homepage";
import HeroReveal from "@/components/sections/HeroReveal";
import PriceCard from "@/components/cards/PriceCard";
import Magnetic from "@/components/animations/Magnetic";
import TextReveal from "@/components/animations/TextReveal";
import MaskedAurora from "@/components/animations/MaskedAurora";

export default function Hero() {
  return (
    <div className="wrap">
      <div className="hero">
        <MaskedAurora className="hero-ambient" variant="hero" />
        <div className="hero-copy">
          <TextReveal as="h1" trigger="load">
            {hero.h1Before}
            <em>{hero.h1Emphasis}</em>
            {hero.h1After}
          </TextReveal>
          <HeroReveal>
            <p className="deck">{hero.deck}</p>
            <p className="hero-lede">{hero.lede}</p>
            <div className="hero-cta">
              <Magnetic strength={10}>
                <a href={hero.ctaHref} className="btn btn-lg">
                  {hero.ctaLabel}
                </a>
              </Magnetic>
              <span className="hero-note">{hero.note}</span>
            </div>
            <div className="creds">
              <span className="partner">{hero.creds.partner}</span>
              <span>
                <b>25+</b> theme projects delivered
              </span>
              <span>
                <b>10</b> documented case studies
              </span>
            </div>
          </HeroReveal>
        </div>
        <PriceCard />
      </div>
    </div>
  );
}
