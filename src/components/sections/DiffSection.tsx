import Link from "next/link";
import { diffSection, diffTiers } from "@/data/homepage";
import Backdrop from "@/components/animations/Backdrop";
import Reveal from "@/components/animations/Reveal";
import RevealGroup from "@/components/animations/RevealGroup";
import TextReveal from "@/components/animations/TextReveal";
import { linkify } from "@/lib/linkify";

/**
 * The scope/cost ladder — the site's signature section. Copy verbatim (§3).
 *
 * Presentation notes: the band scrubs in from slightly inset with rounded
 * corners (`data-curtain`) so the switch from paper to deep green reads as one
 * panel sliding over another; the grid backdrop's mask centre wanders; each tier
 * row lights its own hairline and lifts its price on hover, so the ladder feels
 * like a set of choices rather than a static table.
 */
export default function DiffSection() {
  return (
    <section className="diff-sec has-backdrop" aria-labelledby="pricing-heading" data-curtain="3">
      <Backdrop variant="grid" tone="dark" noise />
      <div className="wrap">
        <div className="head">
          <Reveal kind="fade" duration={0.6}>
            <span className="eyebrow">{diffSection.eyebrow}</span>
          </Reveal>
          <TextReveal as="h2" id="pricing-heading">
            {diffSection.h2}
          </TextReveal>
          <Reveal kind="up-sm" delay={0.08}>
            <p className="deck-sm">{diffSection.deckSm}</p>
            <p>{diffSection.paragraph}</p>
          </Reveal>
        </div>

        <RevealGroup className="diff" items=".tier" itemReveal="up" stagger={0.09}>
          {diffTiers.map((tier) => (
            <div className="tier" key={tier.id}>
              <div className="tier-lead">
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
          <Reveal kind="up-sm">
            <p>{linkify(diffSection.footNote)}</p>
          </Reveal>
          <Reveal kind="up-sm" delay={0.1}>
            <Link href="/pricing/" className="btn btn-ghost">
              Full pricing breakdown
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
