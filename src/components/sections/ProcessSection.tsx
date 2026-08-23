import {
  processSection,
  processSteps,
  timeRows,
  timelineSection,
} from "@/data/homepage";
import Reveal from "@/components/animations/Reveal";
import RevealGroup from "@/components/animations/RevealGroup";
import TextReveal from "@/components/animations/TextReveal";

export default function ProcessSection() {
  return (
    <section className="tint" aria-labelledby="timeline-heading">
      <div className="wrap">
        <span className="eyebrow">{timelineSection.eyebrow}</span>
        <div className="proc">
          <Reveal as="div">
            <TextReveal as="h2" className="h2-col">
              <span id="timeline-heading">{timelineSection.h2}</span>
            </TextReveal>
            <p className="col-lede">{timelineSection.lede}</p>
            <RevealGroup itemSelector="li" y={12}>
              <ul className="times">
                {timeRows.map((row) => (
                  <li key={row.label}>
                    <span>{row.label}</span>
                    <b>{row.time}</b>
                  </li>
                ))}
              </ul>
            </RevealGroup>
            <p className="times-note">{timelineSection.note}</p>
          </Reveal>

          <Reveal as="div" delay={0.1}>
            <TextReveal as="h2" className="h2-col">
              {processSection.h2}
            </TextReveal>
            <p className="col-lede">{processSection.lede}</p>
            <RevealGroup className="steps" itemSelector=".step" y={16}>
              {processSteps.map((step) => (
                <div className="step" key={step.title}>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </div>
              ))}
            </RevealGroup>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
