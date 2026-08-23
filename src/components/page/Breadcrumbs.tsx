import Link from "next/link";
import type { LinkRef } from "@/types/page";

/**
 * Breadcrumb trail. Emitted as a nav + ordered list for assistive tech and
 * mirrored as BreadcrumbList JSON-LD by PageRenderer, which is what earns the
 * breadcrumb display in search results for the nested /customization/* and
 * /guides/* routes.
 */
export default function Breadcrumbs({
  trail,
  current,
  tone = "light",
}: {
  trail: LinkRef[];
  current: string;
  tone?: "light" | "dark";
}) {
  return (
    <nav aria-label="Breadcrumb" className={`wrap crumbs ${tone === "dark" ? "crumbs-dark" : ""}`}>
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
