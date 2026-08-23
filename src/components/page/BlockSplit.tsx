import Link from "next/link";
import ImageReveal from "@/components/animations/ImageReveal";
import Reveal from "@/components/animations/Reveal";
import RevealGroup from "@/components/animations/RevealGroup";
import TextReveal from "@/components/animations/TextReveal";
import SectionShell from "@/components/page/SectionShell";
import { Visual } from "@/components/ui/visuals";
import { slug } from "@/lib/slug";
import type { PageBlock } from "@/types/page";

type SplitBlock = Extract<PageBlock, { type: "split" }>;
type ShowcaseBlock = Extract<PageBlock, { type: "showcase" }>;
type GalleryBlock = Extract<PageBlock, { type: "gallery" }>;

/** Text beside a visual — the workhorse composition for service pages. */
export function SplitSection({ block }: { block: SplitBlock }) {
  const id = slug(block.heading);

  return (
    <SectionShell tone={block.tone} backdrop={block.backdrop} labelledBy={id}>
      <div className={`split ${block.media === "left" ? "media-left" : ""}`}>
        <div className="split-copy">
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
            {block.bullets && (
              <ul className="ticks">
                {block.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {block.cta && (
              <p className="btn-row" style={{ marginTop: "1.25rem" }}>
                <Link href={block.cta.href} className="btn btn-outline">
                  {block.cta.label}
                </Link>
              </p>
            )}
          </Reveal>
        </div>

        <div className="split-media">
          <ImageReveal delay={0.1} parallax={0.07}>
            <Visual name={block.visual} />
          </ImageReveal>
          {block.caption && <p className="figure-cap">{block.caption}</p>}
        </div>
      </div>
    </SectionShell>
  );
}

/** One large visual under a short intro — for the page's signature image. */
export function ShowcaseSection({ block }: { block: ShowcaseBlock }) {
  const id = slug(block.heading);

  return (
    <SectionShell
      tone={block.tone}
      backdrop={block.backdrop}
      labelledBy={id}
      curtain={block.tone === "dark"}
      wide
    >
      <div className="showcase-head">
        {block.eyebrow && (
          <Reveal kind="fade" duration={0.6}>
            <span className="eyebrow">{block.eyebrow}</span>
          </Reveal>
        )}
        <TextReveal as="h2" id={id}>
          {block.heading}
        </TextReveal>
        {block.body && (
          <Reveal kind="up-sm" delay={0.08}>
            {block.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        )}
      </div>
      <ImageReveal className="showcase-media" delay={0.1}>
        <Visual name={block.visual} />
      </ImageReveal>
      {block.caption && <p className="figure-cap">{block.caption}</p>}
    </SectionShell>
  );
}

/**
 * Several visuals together. `horizontal` turns the row into a pinned
 * side-scrolling strip on desktop and a native swipe strip on touch — used
 * where the set of visuals is the point (theme comparisons, work samples).
 */
export function GallerySection({ block }: { block: GalleryBlock }) {
  const id = slug(block.heading);

  return (
    <SectionShell tone={block.tone} backdrop={block.backdrop} labelledBy={id} wide>
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

      {block.horizontal ? (
        <div className="hscroll" data-hscroll="">
          <div className="hscroll-track">
            {block.items.map((item) => (
              <GalleryItem key={item.caption} item={item} />
            ))}
          </div>
          <p className="hscroll-hint">Scroll sideways</p>
        </div>
      ) : (
        <RevealGroup className="gallery" stagger={0.09} itemReveal="scale">
          {block.items.map((item) => (
            <GalleryItem key={item.caption} item={item} />
          ))}
        </RevealGroup>
      )}
    </SectionShell>
  );
}

function GalleryItem({ item }: { item: GalleryBlock["items"][number] }) {
  return (
    <div className="gallery-item">
      <Visual name={item.visual} />
      <h3>{item.caption}</h3>
      {item.body && <p>{item.body}</p>}
    </div>
  );
}
