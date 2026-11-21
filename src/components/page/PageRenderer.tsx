import { Fragment } from "react";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/page/Breadcrumbs";
import PageHero from "@/components/page/PageHero";
import {
  GallerySection,
  ShowcaseSection,
  SplitSection,
} from "@/components/page/BlockSplit";
import {
  CardsSection,
  ChecklistSection,
  StepsSection,
} from "@/components/page/BlockCards";
import {
  CtaSection,
  PriceSection,
  ProseSection,
  TableSection,
} from "@/components/page/BlockLists";
import { FaqSection, RelatedSection } from "@/components/page/BlockFaq";
import { siteConfig, OG_IMAGE } from "@/data/site";
import { getSettings } from "@/lib/settings";
import { getCaseStudies } from "@/lib/cases";
import CaseStudyGrid from "@/components/work/CaseStudyGrid";
import type { PageContent } from "@/types/page";

/** Per-page Metadata from the same object that renders the page. */
export function pageMetadata(page: PageContent): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.slug },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteConfig.url}${page.slug}`,
      type: "website",
      images: [OG_IMAGE],
    },
  };
}

/**
 * Renders a whole interior page from its content object: hero, breadcrumbs,
 * every block in declared order, and the structured data implied by what the
 * page contains (BreadcrumbList when nested, FAQPage when it has an FAQ).
 *
 * One renderer for ~40 routes is what keeps them consistent; variety comes from
 * each page choosing a different block order, tone sequence and backdrop set
 * rather than from bespoke layout code per page.
 */
export default async function PageRenderer({ page }: { page: PageContent }) {
  const { tiers } = await getSettings();
  // Case studies published from the admin appear on /work/ after the intro block.
  const cases = page.slug === "/work/" ? await getCaseStudies() : [];
  const faq = page.blocks.find((block) => block.type === "faq");
  const jsonLd = buildJsonLd(page, faq);

  return (
    <>
      {jsonLd.map((entry, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}

      {page.breadcrumbs && page.breadcrumbs.length > 0 && (
        <Breadcrumbs trail={page.breadcrumbs} current={page.hero.eyebrow} />
      )}
      <PageHero hero={page.hero} />

      {page.blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        const section = renderBlock(block, key);
        return index === 0 && cases.length > 0 ? (
          <Fragment key={key}>
            {section}
            <CaseStudyGrid cases={cases} />
          </Fragment>
        ) : (
          section
        );
      })}
    </>
  );

  function renderBlock(block: PageContent["blocks"][number], key: string) {
    switch (block.type) {
      case "split":
        return <SplitSection key={key} block={block} />;
      case "showcase":
        return <ShowcaseSection key={key} block={block} />;
      case "gallery":
        return <GallerySection key={key} block={block} />;
      case "cards":
        return <CardsSection key={key} block={block} />;
      case "steps":
        return <StepsSection key={key} block={block} />;
      case "checklist":
        return <ChecklistSection key={key} block={block} />;
      case "table":
        return <TableSection key={key} block={block} />;
      case "priceList":
        // Price and time come from /admin/settings; labels and notes stay in code.
        return (
          <PriceSection
            key={key}
            block={{
              ...block,
              items: block.items.map((item, i) => ({
                ...item,
                price: tiers[i]?.price ?? item.price,
                time: tiers[i]?.time ?? item.time,
              })),
            }}
          />
        );
      case "prose":
        return <ProseSection key={key} block={block} />;
      case "faq":
        return <FaqSection key={key} block={block} />;
      case "related":
        return <RelatedSection key={key} block={block} />;
      case "cta":
        return <CtaSection key={key} block={block} />;
      default:
        return null;
    }
  }
}

function buildJsonLd(
  page: PageContent,
  faq?: Extract<PageContent["blocks"][number], { type: "faq" }>,
) {
  const entries: Record<string, unknown>[] = [];

  if (page.breadcrumbs && page.breadcrumbs.length > 0) {
    entries.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        ...page.breadcrumbs.map((crumb, i) => ({
          "@type": "ListItem",
          position: i + 2,
          name: crumb.label,
          item: `${siteConfig.url}${crumb.href}`,
        })),
        {
          "@type": "ListItem",
          position: page.breadcrumbs.length + 2,
          name: page.hero.eyebrow,
          item: `${siteConfig.url}${page.slug}`,
        },
      ],
    });
  }

  if (faq && faq.items.length > 0) {
    entries.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  return entries;
}
