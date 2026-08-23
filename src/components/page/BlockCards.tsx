import Link from "next/link";
import ImageReveal from "@/components/animations/ImageReveal";
import Reveal from "@/components/animations/Reveal";
import RevealGroup from "@/components/animations/RevealGroup";
import SpotlightCard from "@/components/animations/SpotlightCard";
import TextReveal from "@/components/animations/TextReveal";
import SectionShell from "@/components/page/SectionShell";
import { Visual } from "@/components/ui/visuals";
import { slug } from "@/lib/slug";
import type { PageBlock } from "@/types/page";

type CardsBlock = Extract<PageBlock, { type: "cards" }>;
type StepsBlock = Extract<PageBlock, { type: "steps" }>;
type ChecklistBlock = Extract<PageBlock, { type: "checklist" }>;

/** Capability / feature grid. Cards carry the spotlight+tilt hover, not a fade. */
export function CardsSection({ block }: { block: CardsBlock }) {
  const id = slug(block.heading);
  const columns = block.columns ?? 3;

  return (
    <SectionShell tone={block.tone} backdrop={block.backdrop} labelledBy={id}>
      <div className="head">
        {block.eyebrow && (
          <Reveal kind="fade" duration={0.6}>
            <span className="eyebrow">{block.eyebrow}</span>
          </Reveal>
        )}
        <TextReveal as="h2" id={id}>
          {block.heading}
        </TextReveal>
        {block.lede && (
          <Reveal kind="up-sm" delay={0.08}>
            <p>{block.lede}</p>
          </Reveal>
        )}
      </div>

      <RevealGroup className={`cards c${columns}`} stagger={0.07} itemReveal="rise-rotate">
        {block.items.map((item) => (
          <SpotlightCard key={item.title} tilt={3}>
            {item.href ? (
              <Link href={item.href} className="card card-link">
                <CardBody item={item} withGo />
              </Link>
            ) : (
              <div className="card">
                <CardBody item={item} />
              </div>
            )}
          </SpotlightCard>
        ))}
      </RevealGroup>
    </SectionShell>
  );
}

function CardBody({ item, withGo }: { item: CardsBlock["items"][number]; withGo?: boolean }) {
  return (
    <>
      {item.meta && <div className="card-meta">{item.meta}</div>}
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      {withGo && (
        <span className="card-go">
          Read more
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 8h10m0 0-4-4m4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </>
  );
}

/** Numbered process. Pairs with a visual when the page has one to spare. */
export function StepsSection({ block }: { block: StepsBlock }) {
  const id = slug(block.heading);

  const copy = (
    <div>
      {block.eyebrow && (
        <Reveal kind="fade" duration={0.6}>
          <span className="eyebrow">{block.eyebrow}</span>
        </Reveal>
      )}
      <TextReveal as="h2" id={id}>
        {block.heading}
      </TextReveal>
      {block.lede && (
        <Reveal kind="up-sm" delay={0.08}>
          <p className="col-lede">{block.lede}</p>
        </Reveal>
      )}
      <RevealGroup className="steps" items=".step" stagger={0.08} itemReveal="up-sm">
        {block.items.map((step) => (
          <div className="step" key={step.title}>
            <div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              {step.meta && <div className="step-meta">{step.meta}</div>}
            </div>
          </div>
        ))}
      </RevealGroup>
    </div>
  );

  return (
    <SectionShell tone={block.tone} backdrop={block.backdrop} labelledBy={id}>
      {block.visual ? (
        <div className="steps-split">
          {copy}
          <ImageReveal delay={0.12} parallax={0.05}>
            <Visual name={block.visual} />
          </ImageReveal>
        </div>
      ) : (
        copy
      )}
    </SectionShell>
  );
}

/** In-scope / out-of-scope columns — the pattern the homepage "wall" uses. */
export function ChecklistSection({ block }: { block: ChecklistBlock }) {
  const id = slug(block.heading);

  return (
    <SectionShell tone={block.tone} labelledBy={id}>
      <div className="head">
        {block.eyebrow && (
          <Reveal kind="fade" duration={0.6}>
            <span className="eyebrow">{block.eyebrow}</span>
          </Reveal>
        )}
        <TextReveal as="h2" id={id}>
          {block.heading}
        </TextReveal>
        {block.lede && (
          <Reveal kind="up-sm" delay={0.08}>
            <p>{block.lede}</p>
          </Reveal>
        )}
      </div>

      <RevealGroup className="checks" stagger={0.1} itemReveal="up">
        {block.groups.map((group) => (
          <div className={`check-group ${group.limit ? "limit" : ""}`} key={group.title}>
            <h3>{group.title}</h3>
            {group.body && <p>{group.body}</p>}
            <ul className="ticks">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </RevealGroup>

      {block.note && <p className="checks-note">{block.note}</p>}
    </SectionShell>
  );
}
