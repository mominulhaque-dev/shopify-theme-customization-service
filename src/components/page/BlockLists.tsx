import Link from "next/link";
import Magnetic from "@/components/animations/Magnetic";
import Reveal from "@/components/animations/Reveal";
import RevealGroup from "@/components/animations/RevealGroup";
import TextReveal from "@/components/animations/TextReveal";
import SectionShell from "@/components/page/SectionShell";
import { slug } from "@/lib/slug";
import type { PageBlock } from "@/types/page";

type TableBlock = Extract<PageBlock, { type: "table" }>;
type PriceBlock = Extract<PageBlock, { type: "priceList" }>;
type ProseBlock = Extract<PageBlock, { type: "prose" }>;

/** Comparison table. Horizontally scrollable rather than reflowed: a matrix
 *  loses its meaning when the columns are stacked. */
export function TableSection({ block }: { block: TableBlock }) {
  const id = slug(block.heading);

  return (
    <SectionShell tone={block.tone} labelledBy={id} wide>
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

      <Reveal kind="mask-left" duration={1.1}>
        <div className="tbl-scroll">
          <table className="tbl">
            <thead>
              <tr>
                {block.columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={cell} scope="row">
                        {cell}
                      </th>
                    ) : (
                      <td key={`${row[0]}-${i}`}>{cell}</td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
      {block.note && <p className="tbl-note">{block.note}</p>}
    </SectionShell>
  );
}

/** Published price ladder — same shape as the homepage tiers, reused per page. */
export function PriceSection({ block }: { block: PriceBlock }) {
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

      <RevealGroup className="prices" items=".price-row" stagger={0.08} itemReveal="up-sm">
        {block.items.map((item) => (
          <div className="price-row" key={item.label}>
            <h3>{item.label}</h3>
            <p>{item.note}</p>
            <div className="price-figs">
              <b>{item.price}</b>
              <span>{item.time}</span>
            </div>
          </div>
        ))}
      </RevealGroup>
      {block.note && <p className="tbl-note">{block.note}</p>}
    </SectionShell>
  );
}

/** Long-form explanation with optional subheads — the SEO body of a guide. */
export function ProseSection({ block }: { block: ProseBlock }) {
  const id = slug(block.heading);

  return (
    <SectionShell tone={block.tone} labelledBy={id}>
      <div className="prose">
        {block.eyebrow && (
          <Reveal kind="fade" duration={0.6}>
            <span className="eyebrow">{block.eyebrow}</span>
          </Reveal>
        )}
        <TextReveal as="h2" id={id}>
          {block.heading}
        </TextReveal>
        <Reveal kind="up-sm" delay={0.08}>
          {block.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
        {block.subheads && (
          <RevealGroup items=".prose-sub" stagger={0.08} itemReveal="up-sm">
            {block.subheads.map((sub) => (
              <div className="prose-sub" key={sub.title}>
                <h3>{sub.title}</h3>
                {sub.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ))}
          </RevealGroup>
        )}
      </div>
    </SectionShell>
  );
}

/** Closing conversion band. Every page ends with exactly one. */
export function CtaSection({ block }: { block: Extract<PageBlock, { type: "cta" }> }) {
  const id = slug(block.heading);
  const dark = block.tone === "dark";

  return (
    <SectionShell
      tone={dark ? "dark" : "tint"}
      backdrop={dark ? "beams" : "mesh"}
      labelledBy={id}
      curtain={dark}
    >
      <div className="cta-band">
        <div>
          <TextReveal as="h2" id={id}>
            {block.heading}
          </TextReveal>
          <Reveal kind="up-sm" delay={0.08}>
            <p>{block.body}</p>
          </Reveal>
        </div>
        <Reveal kind="up-sm" delay={0.16} className="btn-row">
          <Magnetic strength={11}>
            <Link href={block.cta.href} className={`btn btn-lg btn-arrow ${dark ? "btn-signal" : ""}`}>
              {block.cta.label}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8h10m0 0-4-4m4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </Magnetic>
          {block.secondary && (
            <Link href={block.secondary.href} className={dark ? "btn btn-lg btn-ghost" : "btn btn-lg btn-outline"}>
              {block.secondary.label}
            </Link>
          )}
        </Reveal>
      </div>
    </SectionShell>
  );
}
