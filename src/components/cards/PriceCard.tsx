import { pricingCard } from "@/data/homepage";
import Reveal from "@/components/animations/Reveal";
import SpotlightCard from "@/components/animations/SpotlightCard";

export default function PriceCard() {
  return (
    <Reveal as="div" y={20} delay={0.3} start="top 90%">
      <SpotlightCard tilt={3}>
        <aside className="price-card">
          <div className="price-card-top">
            <span className="eyebrow">{pricingCard.eyebrow}</span>
            <div className="price-figure">
              <sup>{pricingCard.figurePrefix}</sup>
              {pricingCard.figure}
            </div>
            <p>{pricingCard.note}</p>
          </div>
          <ul>
            {pricingCard.items.map((item) => (
              <li key={item.label}>
                <span>{item.label}</span>
                <b>{item.price}</b>
              </li>
            ))}
          </ul>
        </aside>
      </SpotlightCard>
    </Reveal>
  );
}
