import { scopeLeft, scopeRight, scopeSection } from "@/data/homepage";
import Reveal from "@/components/animations/Reveal";
import RevealGroup from "@/components/animations/RevealGroup";
import TextReveal from "@/components/animations/TextReveal";
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
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export default function ScopeSection() {
  return (
    <section className="tint" id="scope" aria-labelledby="scope-heading">
      <div className="wrap">
        <Reveal as="div" className="head">
          <span className="eyebrow">{scopeSection.eyebrow}</span>
          <TextReveal as="h2">
            <span id="scope-heading">{scopeSection.h2}</span>
          </TextReveal>
          <p className="deck-sm">{scopeSection.deckSm}</p>
          {scopeSection.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>

        <RevealGroup className="wall" itemSelector=".wall-side, .wall-rule" y={20}>
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

        <p className="wall-foot">{scopeSection.footNote}</p>
      </div>
    </section>
  );
}
