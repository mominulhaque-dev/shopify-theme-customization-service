import Link from "next/link";
import { mainNav, siteConfig } from "@/data/site";
import HeaderScrollState from "@/components/navigation/HeaderScrollState";
import MobileMenu from "@/components/navigation/MobileMenu";
import type { SiteSettings } from "@/lib/settings";

export default function Header({ contact }: { contact: Pick<SiteSettings, "email" | "phoneDisplay" | "phoneE164" | "whatsappUrl"> }) {
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
        <MobileMenu contact={{ email: contact.email, phoneDisplay: contact.phoneDisplay, phoneE164: contact.phoneE164, whatsappUrl: contact.whatsappUrl }} />
      </div>
    </header>
  );
}
