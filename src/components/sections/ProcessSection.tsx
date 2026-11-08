import {
  processSection,
  processSteps,
  timeRows,
  timelineSection,
} from "@/data/homepage";
import ImageReveal from "@/components/animations/ImageReveal";
import Reveal from "@/components/animations/Reveal";
import RevealGroup from "@/components/animations/RevealGroup";
import TextReveal from "@/components/animations/TextReveal";
import { Visual } from "@/components/ui/visuals";

/**
 * Process first, timeline second. Copy verbatim (§3).
 *
 * Layout per the November 2026 revision: "How the customization process works"
 * keeps its place on the right with an illustration beside it; the "How long a
 * customization takes" block moves down to sit directly above the four-step
 * diagram.
 */
export default function ProcessSection() {
  return (
    <section className="tint has-backdrop" aria-labelledby="process-heading">
      <div className="wrap">
        <Reveal kind="fade" duration={0.6}>
          <span className="eyebrow">{timelineSection.eyebrow}</span>
        </Reveal>

        <div className="proc">
          <div className="proc-media">
            <ImageReveal delay={0.1} parallax={0.05}>
              <Visual name="image-customize" />
            </ImageReveal>
          </div>

          <div>
            <TextReveal as="h2" className="h2-col" id="process-heading">
              {processSection.h2}
            </TextReveal>
            <Reveal kind="up-sm" delay={0.06}>
              <p className="col-lede">{processSection.lede}</p>
            </Reveal>
            <RevealGroup className="steps" items=".step" itemReveal="up-sm" stagger={0.09}>
              {processSteps.map((step) => (
                <div className="step" key={step.title}>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </div>
              ))}
            </RevealGroup>
          </div>
        </div>

        <div className="proc proc-timeline">
          <div>
            <TextReveal as="h2" className="h2-col" id="timeline-heading">
              {timelineSection.h2}
            </TextReveal>
            <Reveal kind="up-sm" delay={0.06}>
              <p className="col-lede">{timelineSection.lede}</p>
            </Reveal>
            <Reveal kind="up-sm" delay={0.1}>
              <p className="times-note">{timelineSection.note}</p>
            </Reveal>
          </div>
          <RevealGroup className="times-wrap" items="li" itemReveal="up-sm" stagger={0.06}>
            <ul className="times">
              {timeRows.map((row) => (
                <li key={row.label}>
                  <span>{row.label}</span>
                  <b>{row.time}</b>
                </li>
              ))}
            </ul>
          </RevealGroup>
        </div>

        <ImageReveal className="proc-figure" delay={0.1}>
          <div className="figure">
            <Visual name="ill-process" />
          </div>
        </ImageReveal>
      </div>
    </section>
  );
}
