import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/page/Breadcrumbs";
import { InlineLinks, plainText } from "@/components/blog/InlineLinks";
import PostMedia from "@/components/blog/PostMedia";
import NewsletterBand from "@/components/blog/NewsletterBand";
import { BLOG_AUTHOR } from "@/data/blog";
import { OG_IMAGE, siteConfig } from "@/data/site";
import { prepareHtml } from "@/lib/blog-html";
import { getPostBySlug, getPosts } from "@/lib/posts";

/* Posts published from the admin after the build render on first request. */
export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
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
      modifiedTime: post.updated,
      images: post.coverUrl ? [{ url: post.coverUrl }] : [OG_IMAGE],
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

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const url = `${siteConfig.url}/blog/${post.slug}/`;
  const { html, headings } = prepareHtml(post.bodyHtml);
  const related = (await getPosts())
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated,
      ...(post.coverUrl ? { image: post.coverUrl } : {}),
      mainEntityOfPage: url,
      url,
      keywords: post.keyword,
      author: {
        "@type": "Organization",
        name: BLOG_AUTHOR,
        url: siteConfig.url,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
    post.faq.length > 0 && {
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
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${siteConfig.url}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${siteConfig.url}/blog/`,
        },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ].filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        trail={[{ label: "Blog", href: "/blog/" }]}
        current={post.title}
      />

      <article className="post">
        <header className="post-head wrap">
          <div>
            <span className="post-cat">{post.category}</span>
            <h1>{post.title}</h1>
            <p className="post-intro">{post.excerpt}</p>
            <p className="post-meta">
              By {BLOG_AUTHOR} ·{" "}
              <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
              {post.readMinutes} min read
            </p>
          </div>
          <div className="figure figure-lift">
            <PostMedia post={post} eager />
          </div>
        </header>

        <div className="wrap post-layout">
          {headings.length > 0 ? (
            <aside className="post-toc" aria-label="In this article">
              <strong>In this article</strong>
              <ol>
                {headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ol>
            </aside>
          ) : (
            <div aria-hidden="true" />
          )}

          <div className="post-content">
            {post.takeaways.length > 0 && (
              <div className="post-takeaways">
                <strong>Key points</strong>
                <ul>
                  {post.takeaways.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            )}

            <div
              className="post-html"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {post.faq.length > 0 && (
              <h2 id="faq">Frequently asked questions</h2>
            )}
            {post.faq.length > 0 && (
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
            )}

            <div className="post-cta">
              <div>
                <strong>Want a price for your store?</strong>
                <p>
                  Send your store link and what you want changed. You get a
                  fixed price and a delivery date within two business days.
                </p>
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
              <Link
                href={`/blog/${p.slug}/`}
                className="post-card"
                key={p.slug}
              >
                <div className="post-media figure">
                  <PostMedia post={p} />
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
