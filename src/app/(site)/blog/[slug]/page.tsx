import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/page/Breadcrumbs";
import { InlineLinks, plainText } from "@/components/blog/InlineLinks";
import { Visual } from "@/components/ui/visuals";
import NewsletterBand from "@/components/blog/NewsletterBand";
import { BLOG_AUTHOR, BLOG_POSTS, getPost, type BlogBlock } from "@/data/blog";
import { OG_IMAGE, siteConfig } from "@/data/site";
import { slug as toSlug } from "@/lib/slug";

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  const url = `/blog/${post.slug}/`;
  return {
    title: { absolute: post.metaTitle },
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.metaTitle,
      description: post.description,
      publishedTime: post.date,
      images: [OG_IMAGE],
    },
  };
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 id={toSlug(block.text)}>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "p":
      return (
        <p>
          <InlineLinks text={block.text} />
        </p>
      );
    case "list": {
      const items = block.items.map((item) => (
        <li key={item}>
          <InlineLinks text={item} />
        </li>
      ));
      return block.ordered ? <ol>{items}</ol> : <ul>{items}</ul>;
    }
    case "callout":
      return (
        <aside className="post-callout">
          <strong>{block.title}</strong>
          <p>
            <InlineLinks text={block.text} />
          </p>
        </aside>
      );
    case "table":
      return (
        <div className="post-table">
          <table>
            <thead>
              <tr>
                {block.columns.map((c) => (
                  <th key={c} scope="col">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell, i) => (i === 0 ? <th key={i} scope="row">{cell}</th> : <td key={i}>{cell}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const url = `${siteConfig.url}/blog/${post.slug}/`;
  const headings = post.body.filter((b): b is Extract<BlogBlock, { type: "h2" }> => b.type === "h2");
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: url,
      url,
      keywords: post.keyword,
      author: { "@type": "Organization", name: BLOG_AUTHOR, url: siteConfig.url },
      publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: plainText(f.a) },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog/` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs trail={[{ label: "Blog", href: "/blog/" }]} current={post.title} />

      <article className="post">
        <header className="post-head wrap">
          <div>
            <span className="post-cat">{post.category}</span>
            <h1>{post.title}</h1>
            <p className="post-intro">{post.excerpt}</p>
            <p className="post-meta">
              By {BLOG_AUTHOR} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readMinutes} min read
            </p>
          </div>
          <div className="figure figure-lift">
            <Visual name={post.visual} />
          </div>
        </header>

        <div className="wrap post-layout">
          <aside className="post-toc" aria-label="In this article">
            <strong>In this article</strong>
            <ol>
              {headings.map((h) => (
                <li key={h.text}>
                  <a href={`#${toSlug(h.text)}`}>{h.text}</a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="post-content">
            <div className="post-takeaways">
              <strong>Key points</strong>
              <ul>
                {post.takeaways.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>

            {post.body.map((block, i) => (
              <Block block={block} key={i} />
            ))}

            <h2 id="faq">Frequently asked questions</h2>
            <div className="faq post-faq">
              {post.faq.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>{f.q}</summary>
                  <p>
                    <InlineLinks text={f.a} />
                  </p>
                </details>
              ))}
            </div>

            <div className="post-cta">
              <div>
                <strong>Want a price for your store?</strong>
                <p>Send your store link and what you want changed. You get a fixed price and a delivery date within two business days.</p>
              </div>
              <Link href="/hire/" className="btn btn-signal">
                Get a scoped quote
              </Link>
            </div>

            <NewsletterBand />
          </div>
        </div>
      </article>

      <section className="tint post-related" aria-labelledby="related-posts">
        <div className="wrap">
          <h2 id="related-posts" className="h2-sm">
            Keep reading
          </h2>
          <div className="post-grid">
            {related.map((p) => (
              <Link href={`/blog/${p.slug}/`} className="post-card" key={p.slug}>
                <div className="post-media figure">
                  <Visual name={p.visual} />
                </div>
                <div className="post-body">
                  <span className="post-cat">{p.category}</span>
                  <h3>{p.title}</h3>
                  <span className="post-meta">{p.readMinutes} min read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
