import Link from "next/link";
import { caseStudies, faqItems, faqSection, workSection } from "@/data/homepage";
import Reveal from "@/components/animations/Reveal";
import RevealGroup from "@/components/animations/RevealGroup";
import SpotlightCard from "@/components/animations/SpotlightCard";
import TextReveal from "@/components/animations/TextReveal";
import { Visual } from "@/components/ui/visuals";
import { linkify } from "@/lib/linkify";

/**
 * Selected work + FAQ. Copy verbatim (§3).
 *
 * Each case card now leads with a real mockup of the surface it rebuilt instead
 * of an empty gradient, and keeps the reference file's caption underneath it as
 * the figure label — so the card says what was changed before you click.
 *
 * FAQ answers run through `linkify`, which restores the inline links the port
 * flattened (CLAUDE.md §3) without altering a word of the approved copy.
 */
export default function WorkSection() {
  return (
    <section aria-labelledby="work-heading">
      <div className="wrap">
        <div className="head">
          <Reveal kind="fade" duration={0.6}>
            <span className="eyebrow">{workSection.eyebrow}</span>
          </Reveal>
          <TextReveal as="h2" id="work-heading">
            {workSection.h2}
          </TextReveal>
          <Reveal kind="up-sm" delay={0.08}>
            <p>{workSection.paragraph}</p>
          </Reveal>
        </div>

        <RevealGroup className="work" itemReveal="rise-rotate" stagger={0.1}>
          {caseStudies.map((study) => (
            <SpotlightCard key={study.href} tilt={4}>
              <Link href={study.href} className="case">
                <div className="case-media">
                  <Visual name={study.visual} />
                </div>
                <div className="case-body">
                  <div className="case-theme">{study.theme}</div>
                  <h3>{study.title}</h3>
                  <p>{study.body}</p>
                  <p className="case-img-label">{study.imgLabel}</p>
                  <div className="case-out">{study.outcomeLabel}</div>
                </div>
              </Link>
            </SpotlightCard>
          ))}
        </RevealGroup>

        <Reveal kind="up-sm" className="work-more">
          <Link href="/work/" className="ilink">
            See all ten customization case studies
          </Link>
        </Reveal>

        <div className="cx-border">
          <Reveal kind="fade" duration={0.6}>
            <span className="eyebrow">{faqSection.eyebrow}</span>
          </Reveal>
          <TextReveal as="h2" className="h2-sm">
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
