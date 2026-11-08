/* eslint-disable @next/next/no-img-element -- uploaded covers of unknown size */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/page/Breadcrumbs";
import BeforeAfter from "@/components/work/BeforeAfter";
import { Visual } from "@/components/ui/visuals";
import { OG_IMAGE, siteConfig } from "@/data/site";
import { prepareHtml } from "@/lib/blog-html";
import { getCaseStudies, getCaseStudy } from "@/lib/cases";

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getCaseStudies()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const c = await getCaseStudy(params.slug);
  if (!c) return {};
  const url = `/work/${c.slug}/`;
  const image = c.coverUrl || c.afterUrl;
  return {
    title: { absolute: c.metaTitle },
    description: c.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: c.metaTitle,
      description: c.description,
      images: image ? [{ url: image }] : [OG_IMAGE],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const c = await getCaseStudy(params.slug);
  if (!c) notFound();

  const url = `${siteConfig.url}/work/${c.slug}/`;
  const problem = prepareHtml(c.problemHtml).html;
  const solution = prepareHtml(c.solutionHtml).html;
  const meta = [c.client && `Client: ${c.client}`, c.industry, c.theme && `Theme: ${c.theme}`].filter(Boolean) as string[];
  const others = (await getCaseStudies()).filter((x) => x.slug !== c.slug).slice(0, 3);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: c.title,
      description: c.description,
      datePublished: c.date,
      dateModified: c.updated,
      url,
      mainEntityOfPage: url,
      ...(c.coverUrl || c.afterUrl ? { image: c.coverUrl || c.afterUrl } : {}),
      author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
        { "@type": "ListItem", position: 2, name: "Work", item: `${siteConfig.url}/work/` },
        { "@type": "ListItem", position: 3, name: c.title, item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs trail={[{ label: "Work", href: "/work/" }]} current={c.title} />

      <article className="post case">
        <div className="post-head wrap">
          <div>
            <span className="post-cat">Case study</span>
            <h1>{c.title}</h1>
            {c.summary && <p className="post-intro">{c.summary}</p>}
            {meta.length > 0 && <p className="post-meta">{meta.join(" · ")}</p>}
          </div>
          <div className="figure figure-lift">
            {c.coverUrl ? (
              <img src={c.coverUrl} alt="" className="post-cover" />
            ) : (
              <Visual name={c.visual ?? "ill-redesign"} />
            )}
          </div>
        </div>

        <div className="wrap case-body">
          {c.beforeUrl && c.afterUrl && (
            <section aria-labelledby="ba-h">
              <h2 id="ba-h">Before and after</h2>
              <BeforeAfter before={c.beforeUrl} after={c.afterUrl} label={c.title} />
            </section>
          )}

          {c.results.length > 0 && (
            <section aria-labelledby="results-h">
              <h2 id="results-h">Results</h2>
              <div className="case-results">
                {c.results.map((r) => (
                  <div className="case-result" key={r.label}>
                    <span className="case-result-label">{r.label}</span>
                    <span className="case-result-vals">
                      {r.before && <s>{r.before}</s>}
                      {r.before && r.after && <span aria-hidden="true">→</span>}
                      {r.after && <strong>{r.after}</strong>}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="post-content">
            {problem && (
              <>
                <h2>The problem</h2>
                <div className="post-html" dangerouslySetInnerHTML={{ __html: problem }} />
              </>
            )}
            {solution && (
              <>
                <h2>What we did</h2>
                <div className="post-html" dangerouslySetInnerHTML={{ __html: solution }} />
              </>
            )}

            {c.quote && (
              <blockquote className="case-quote">
                <p>&ldquo;{c.quote}&rdquo;</p>
                {c.quoteName && <cite>— {c.quoteName}</cite>}
              </blockquote>
            )}

            <div className="post-cta">
              <div>
                <strong>Want results like this for your store?</strong>
                <p>Send your store link and what you want changed. You get a fixed price and a delivery date within two business days.</p>
              </div>
              <Link href="/hire/" className="btn btn-signal">
                Get a scoped quote
              </Link>
            </div>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="tint post-related" aria-labelledby="more-cases">
          <div className="wrap">
            <h2 id="more-cases" className="h2-sm">
              More case studies
            </h2>
            <div className="post-grid">
              {others.map((o) => (
                <Link href={`/work/${o.slug}/`} className="post-card" key={o.slug}>
                  <div className="post-media figure">
                    {o.coverUrl || o.afterUrl ? (
                      <img src={(o.coverUrl || o.afterUrl)!} alt="" className="post-cover" loading="lazy" />
                    ) : (
                      <Visual name={o.visual ?? "ill-redesign"} />
                    )}
                  </div>
                  <div className="post-body">
                    <span className="post-cat">{o.industry || "Case study"}</span>
                    <h3>{o.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
