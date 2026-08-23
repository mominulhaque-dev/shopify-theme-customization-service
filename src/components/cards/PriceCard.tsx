import { pricingCard } from "@/data/homepage";
import SpotlightCard from "@/components/animations/SpotlightCard";

/**
 * The hero's published-pricing card. Copy verbatim from the reference; the card
 * itself gets the cursor spotlight and a slight tilt so the page's single most
 * commercially important element is also the most tactile.
 *
 * No entrance animation of its own — the hero owns the choreography and wraps
 * this so the card arrives after the claim it substantiates.
 */
export default function PriceCard() {
  return (
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
  );
}
