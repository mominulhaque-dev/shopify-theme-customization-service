import Link from "next/link";
import { caseStudies, faqItems, faqSection, workSection } from "@/data/homepage";
import Reveal from "@/components/animations/Reveal";
import RevealGroup from "@/components/animations/RevealGroup";
import SpotlightCard from "@/components/animations/SpotlightCard";
import TextReveal from "@/components/animations/TextReveal";

export default function WorkSection() {
  return (
    <section aria-labelledby="work-heading">
      <div className="wrap">
        <Reveal as="div" className="head">
          <span className="eyebrow">{workSection.eyebrow}</span>
          <TextReveal as="h2">
            <span id="work-heading">{workSection.h2}</span>
          </TextReveal>
          <p>{workSection.paragraph}</p>
        </Reveal>

        <RevealGroup className="work" itemSelector=".spotlight-card" y={24}>
          {caseStudies.map((study) => (
            <SpotlightCard key={study.href} tilt={4}>
              <Link href={study.href} className="case">
                <div className="case-img">{study.imgLabel}</div>
                <div className="case-body">
                  <div className="case-theme">{study.theme}</div>
                  <h3>{study.title}</h3>
                  <p>{study.body}</p>
                  <div className="case-out">{study.outcomeLabel}</div>
                </div>
              </Link>
            </SpotlightCard>
          ))}
        </RevealGroup>
        <p style={{ marginTop: "1.75rem" }}>
          <Link href="/work/">See all ten customization case studies</Link>
        </p>

        <div className="cx-border">
          <span className="eyebrow">{faqSection.eyebrow}</span>
          <TextReveal as="h2" className="h2-sm">
            {faqSection.h2}
          </TextReveal>
          <RevealGroup className="faq" itemSelector="details" y={10} stagger={0.05}>
            {faqItems.map((item) => (
              <details key={item.question} open={item.open}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
