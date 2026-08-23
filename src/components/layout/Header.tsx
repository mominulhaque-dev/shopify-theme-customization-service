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
        <ul>
          {mainNav.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <Link href="/hire/" className="btn nav-cta">
          Get a quote
        </Link>
        <MobileMenu />
      </div>
    </header>
  );
}
