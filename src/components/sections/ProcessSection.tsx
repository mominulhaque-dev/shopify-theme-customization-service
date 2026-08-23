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
import { TimelineGantt } from "@/components/ui/mockups-process";

/**
 * Timeline + process, side by side. Copy verbatim (§3).
 *
 * The schedule diagram underneath turns the two ranges either column quotes into
 * something you can read at a glance, including the two approval gates — which
 * is the section's actual claim: the dates slip on feedback, not on code.
 */
export default function ProcessSection() {
  return (
    <section className="tint has-backdrop" aria-labelledby="timeline-heading">
      <div className="wrap">
        <Reveal kind="fade" duration={0.6}>
          <span className="eyebrow">{timelineSection.eyebrow}</span>
        </Reveal>

        <div className="proc">
          <div>
            <TextReveal as="h2" className="h2-col" id="timeline-heading">
              {timelineSection.h2}
            </TextReveal>
            <Reveal kind="up-sm" delay={0.06}>
              <p className="col-lede">{timelineSection.lede}</p>
            </Reveal>
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
            <Reveal kind="up-sm" delay={0.1}>
              <p className="times-note">{timelineSection.note}</p>
            </Reveal>
          </div>

          <div>
            <TextReveal as="h2" className="h2-col">
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

        <ImageReveal className="proc-figure" delay={0.1}>
          <div className="figure">
            <TimelineGantt />
          </div>
        </ImageReveal>
        <p className="figure-cap">A four-week project, with both approval gates marked</p>
      </div>
    </section>
  );
}
