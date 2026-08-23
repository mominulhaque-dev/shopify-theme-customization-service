import Link from "next/link";
import { diffSection, diffTiers } from "@/data/homepage";
import Reveal from "@/components/animations/Reveal";
import RevealGroup from "@/components/animations/RevealGroup";
import TextReveal from "@/components/animations/TextReveal";
import MaskedAurora from "@/components/animations/MaskedAurora";

export default function DiffSection() {
  return (
    <section className="diff-sec" aria-labelledby="pricing-heading">
      <div className="diff-grid" aria-hidden="true" />
      <MaskedAurora className="diff-ambient" variant="dark" />
      <div className="wrap">
        <Reveal as="div" className="head">
          <span className="eyebrow">{diffSection.eyebrow}</span>
          <TextReveal as="h2">
            <span id="pricing-heading">{diffSection.h2}</span>
          </TextReveal>
          <p className="deck-sm">{diffSection.deckSm}</p>
          <p>{diffSection.paragraph}</p>
        </Reveal>

        <RevealGroup className="diff" itemSelector=".tier" y={20}>
          {diffTiers.map((tier) => (
            <div className="tier" key={tier.id}>
              <div>
                <div className="tier-id">{tier.id}</div>
                <div className="tier-name">{tier.name}</div>
                <div className="tier-desc">{tier.description}</div>
              </div>
              <div className="changes">
                <div className="mob-label">What changes in your theme</div>
                {tier.changes.map((change) => (
                  <div className={change.op === "add" ? "add" : "mod"} key={change.label}>
                    <span className="op">{change.op === "add" ? "+" : "~"}</span>
                    <span>
                      <b>{change.label}</b> {change.path}
                    </span>
                  </div>
                ))}
              </div>
              <div className="tier-cost">
                <div className="mob-label">Price and turnaround</div>
                <div className="tier-price">{tier.price}</div>
                <div className="tier-time">{tier.time}</div>
              </div>
            </div>
          ))}
        </RevealGroup>

        <div className="diff-foot">
          <p>{diffSection.footNote}</p>
          <div>
            <Link href="/pricing/" className="btn btn-ghost">
              Full pricing breakdown
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
