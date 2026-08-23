import Link from "next/link";
import Reveal from "@/components/animations/Reveal";
import RevealGroup from "@/components/animations/RevealGroup";
import TextReveal from "@/components/animations/TextReveal";
import SectionShell from "@/components/page/SectionShell";
import { slug } from "@/lib/slug";
import type { PageBlock } from "@/types/page";

type FaqBlock = Extract<PageBlock, { type: "faq" }>;
type RelatedBlock = Extract<PageBlock, { type: "related" }>;

/**
 * FAQ accordion. Native <details> so it works before JS and is keyboard
 * operable for free; the first item opens by default because a closed wall of
 * questions answers nothing at a glance. PageRenderer mirrors these items as
 * FAQPage structured data.
 */
export function FaqSection({ block }: { block: FaqBlock }) {
  const heading = block.heading ?? "Frequently asked questions";
  const id = slug(heading);

  return (
    <SectionShell tone="tint" labelledBy={id}>
      <div className="head">
        <Reveal kind="fade" duration={0.6}>
          <span className="eyebrow">Common questions</span>
        </Reveal>
        <TextReveal as="h2" id={id} className="h2-sm">
          {heading}
        </TextReveal>
        {block.lede && (
          <Reveal kind="up-sm" delay={0.08}>
            <p>{block.lede}</p>
          </Reveal>
        )}
      </div>

      <RevealGroup className="faq" items="details" stagger={0.05} itemReveal="up-sm">
        {block.items.map((item, i) => (
          <details key={item.q} open={i === 0}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </RevealGroup>
    </SectionShell>
  );
}

/**
 * Internal linking block. Every page carries one: it is how a visitor who
 * landed on a narrow query ("custom fonts") reaches the commercial pages, and
 * how the topic cluster gets its crawl paths.
 */
export function RelatedSection({ block }: { block: RelatedBlock }) {
  const heading = block.heading ?? "Related pages";
  const id = slug(heading);

  return (
    <SectionShell labelledBy={id} className="tight">
      <div className="head">
        <TextReveal as="h2" id={id} className="h2-sm">
          {heading}
        </TextReveal>
        {block.lede && (
          <Reveal kind="up-sm" delay={0.08}>
            <p>{block.lede}</p>
          </Reveal>
        )}
      </div>
      <RevealGroup className="related" stagger={0.05} itemReveal="up-sm">
        {block.items.map((item) => (
          <Link href={item.href} className="rel" key={item.href}>
            <b>{item.label}</b>
            {item.note && <span>{item.note}</span>}
          </Link>
        ))}
      </RevealGroup>
    </SectionShell>
  );
}
