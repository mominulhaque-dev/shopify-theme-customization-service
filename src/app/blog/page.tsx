import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/page/Breadcrumbs";
import Reveal from "@/components/animations/Reveal";
import RevealGroup from "@/components/animations/RevealGroup";
import { Visual } from "@/components/ui/visuals";
import NewsletterBand from "@/components/blog/NewsletterBand";
import { BLOG_POSTS } from "@/data/blog";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: "Shopify Theme Customization Blog: Guides for Store Owners" },
  description:
    "Plain-English guides on Shopify theme customization: what things cost, when to upgrade your theme, and changes that help shoppers buy.",
  alternates: { canonical: "/blog/" },
  openGraph: { url: "/blog/", type: "website" },
};

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogIndex() {
  const [featured, ...rest] = BLOG_POSTS;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} Blog`,
    url: `${siteConfig.url}/blog/`,
    blogPost: BLOG_POSTS.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${siteConfig.url}/blog/${p.slug}/`,
      datePublished: p.date,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs trail={[]} current="Blog" />
      <section className="blog-hero">
        <div className="wrap">
          <Reveal kind="fade" duration={0.6}>
            <span className="eyebrow">Blog</span>
          </Reveal>
          <h1>Shopify guides for store owners</h1>
          <p className="blog-lede">
            No jargon. What things cost, what you can change yourself, and when it is worth getting help.
          </p>
        </div>
      </section>

      <section className="blog-list-sec">
        <div className="wrap">
          {featured && (
            <Reveal kind="up">
              <Link href={`/blog/${featured.slug}/`} className="post-card post-featured">
                <div className="post-media figure">
                  <Visual name={featured.visual} />
                </div>
                <div className="post-body">
                  <span className="post-cat">{featured.category}</span>
                  <h2>{featured.title}</h2>
                  <p>{featured.excerpt}</p>
                  <span className="post-meta">
                    {formatDate(featured.date)} · {featured.readMinutes} min read
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          <RevealGroup className="post-grid" items=".post-card" stagger={0.08} itemReveal="up-sm">
            {rest.map((post) => (
              <Link href={`/blog/${post.slug}/`} className="post-card" key={post.slug}>
                <div className="post-media figure">
                  <Visual name={post.visual} />
                </div>
                <div className="post-body">
                  <span className="post-cat">{post.category}</span>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <span className="post-meta">
                    {formatDate(post.date)} · {post.readMinutes} min read
                  </span>
                </div>
              </Link>
            ))}
          </RevealGroup>

          <NewsletterBand />
        </div>
      </section>
    </>
  );
}
