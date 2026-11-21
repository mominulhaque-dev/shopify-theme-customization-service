import { notFound } from "next/navigation";
import PageRenderer, { pageMetadata } from "@/components/page/PageRenderer";
import { PAGES, allPageSlugs } from "@/data/pages";

/**
 * Every interior page renders through this one route.
 *
 * The alternative was ~40 near-identical page.tsx files whose only difference
 * was which content object they imported. A registry plus one catch-all keeps
 * routes and content in sync by construction: a page exists because its content
 * exists, and `generateStaticParams` means they are all still statically
 * prerendered at build time rather than rendered per request.
 *
 * `dynamicParams = false` makes anything not in the registry a 404 instead of an
 * attempted render, so a typo in a link surfaces as a broken link in testing
 * rather than an empty page in production.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return allPageSlugs().map((slug) => ({ slug }));
}

function resolve(slug: string[] | undefined) {
  const path = `/${(slug ?? []).join("/")}/`;
  return PAGES[path];
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const page = resolve(params.slug);
  return page ? pageMetadata(page) : {};
}

export default function CatchAllPage({ params }: { params: { slug?: string[] } }) {
  const page = resolve(params.slug);
  if (!page) notFound();
  return <PageRenderer page={page} />;
}
