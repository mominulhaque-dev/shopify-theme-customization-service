import Link from "next/link";
import { mainNav, siteConfig } from "@/data/site";
import HeaderScrollState from "@/components/navigation/HeaderScrollState";
import MobileMenu from "@/components/navigation/MobileMenu";

export default function Header() {
  return (
    <header>
      <HeaderScrollState />
      <div className="wrap nav">
        <Link href="/" className="logo">
          {siteConfig.shortName}
          <span>{siteConfig.tagline}</span>
        </Link>
        <nav aria-label="Primary">
          <ul>
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/hire/" className="btn btn-sm nav-cta">
          Get a quote
        </Link>
        <MobileMenu />
      </div>
    </header>
  );
}
