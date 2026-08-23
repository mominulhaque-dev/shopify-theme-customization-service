import { scopeLeft, scopeRight, scopeSection } from "@/data/homepage";
import ImageReveal from "@/components/animations/ImageReveal";
import Reveal from "@/components/animations/Reveal";
import RevealGroup from "@/components/animations/RevealGroup";
import TextReveal from "@/components/animations/TextReveal";
import { ThemeCeilingChart } from "@/components/ui/mockups-data";
import { linkify } from "@/lib/linkify";
import type { ScopeBlock } from "@/types";

function ScopeColumn({ blocks }: { blocks: ScopeBlock[] }) {
  return (
    <>
      {blocks.map((block) => (
        <div className={`blk${block.isLimit ? " limit" : ""}`} key={block.heading}>
          <h3>{block.heading}</h3>
          <p>{block.body}</p>
          <ul>
            {block.items.map((item) => (
              <li key={item}>{linkify(item)}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

/**
 * "What customization includes" — the scope wall. Copy verbatim (CLAUDE.md §3).
 *
 * The intro now sits beside a chart of how much each theme generation absorbs in
 * settings, because the paragraphs argue about where the wall sits and the chart
 * is the fastest way to see it. The wall itself keeps its centre rule, which
 * draws itself in as the section arrives.
 */
export default function ScopeSection() {
  return (
    <section className="tint" id="scope" aria-labelledby="scope-heading">
      <div className="wrap">
        <div className="split scope-intro">
          <div className="split-copy">
            <Reveal kind="fade" duration={0.6}>
              <span className="eyebrow">{scopeSection.eyebrow}</span>
            </Reveal>
            <TextReveal as="h2" id="scope-heading">
              {scopeSection.h2}
            </TextReveal>
            <Reveal kind="up-sm" delay={0.08}>
              <p className="deck-sm">{scopeSection.deckSm}</p>
              {scopeSection.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Reveal>
          </div>
          <div className="split-media">
            <ImageReveal delay={0.12} parallax={0.06}>
              <div className="figure">
                <ThemeCeilingChart />
              </div>
            </ImageReveal>
            <p className="figure-cap">Editor reach by theme generation</p>
          </div>
        </div>

        <RevealGroup className="wall" items=".wall-side, .wall-rule" itemReveal="up" stagger={0.12}>
          <div className="wall-side left">
            <div className="zone-label">Editor reaches this far</div>
            <ScopeColumn blocks={scopeLeft} />
          </div>

          <div className="wall-rule">
            <span className="wall-tag">The wall</span>
          </div>

          <div className="wall-side right">
            <div className="zone-label">Past here it needs code</div>
            <ScopeColumn blocks={scopeRight} />
          </div>
        </RevealGroup>

        <p className="wall-foot">{linkify(scopeSection.footNote)}</p>
      </div>
    </section>
  );
}
