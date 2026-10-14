import Link from "next/link";
import type { LinkRef } from "@/types/page";

/**
 * Breadcrumb trail. Emitted as a nav + ordered list for assistive tech and
 * mirrored as BreadcrumbList JSON-LD by PageRenderer, which is what earns the
 * breadcrumb display in search results for nested routes.
 *
 * Note it renders *above* the hero band, so it always sits on the page
 * background rather than on the hero's. It therefore has no dark variant — an
 * earlier one tinted the links for dark-hero pages and left them at roughly
 * 2:1 against white.
 */
export default function Breadcrumbs({ trail, current }: { trail: LinkRef[]; current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="wrap crumbs">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        {trail.map((crumb) => (
          <li key={crumb.href}>
            <Link href={crumb.href}>{crumb.label}</Link>
          </li>
        ))}
        <li>
          <span aria-current="page">{current}</span>
        </li>
      </ol>
    </nav>
  );
}
