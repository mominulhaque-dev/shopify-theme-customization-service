import { faqItems, faqSection } from "@/data/homepage";
import Reveal from "@/components/animations/Reveal";
import RevealGroup from "@/components/animations/RevealGroup";
import TextReveal from "@/components/animations/TextReveal";
import { linkify } from "@/lib/linkify";

/**
 * FAQ. Copy verbatim (§3). The "Selected work" case-study grid that used to
 * sit above it was removed in the November 2026 revision (git history has
 * its copy if it comes back).
 *
 * FAQ answers run through `linkify`, which restores the inline links the port
 * flattened (CLAUDE.md §3) without altering a word of the approved copy.
 */
export default function WorkSection() {
  return (
    <section aria-labelledby="faq-heading">
      <div className="wrap">
        <div>
          <Reveal kind="fade" duration={0.6}>
            <span className="eyebrow">{faqSection.eyebrow}</span>
          </Reveal>
          <TextReveal as="h2" className="h2-sm" id="faq-heading">
            {faqSection.h2}
          </TextReveal>
          <RevealGroup className="faq" items="details" itemReveal="up-sm" stagger={0.05}>
            {faqItems.map((item) => (
              <details key={item.question} open={item.open}>
                <summary>{item.question}</summary>
                <p>{linkify(item.answer)}</p>
              </details>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
