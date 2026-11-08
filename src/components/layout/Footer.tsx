import Link from "next/link";
import Backdrop from "@/components/animations/Backdrop";
import { footerBlurb, footerMenu, siteConfig } from "@/data/site";
import type { SiteSettings } from "@/lib/settings";

/**
 * Footer: brand and a one-line description on the left, the site menu in one
 * column, and the ways to reach us in another.
 */
export default function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer>
      <Backdrop variant="mesh" tone="dark" noise />
      <div className="wrap">
        <div className="foot">
          <div className="foot-brand">
            <Link href="/" className="foot-mark">
              {siteConfig.shortName}
              <span>{siteConfig.tagline}</span>
            </Link>
            <p className="foot-lede">{footerBlurb}</p>
          </div>

          <nav aria-label="Footer">
            <h4>Menu</h4>
            <ul>
              {footerMenu.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={`mailto:${settings.email}`}>{settings.email}</a>
              </li>
              <li>
                <a href={`tel:${settings.phoneE164}`}>{settings.phoneDisplay}</a>
              </li>
              <li>
                <a href={settings.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
            </ul>
            <Link href="/hire/" className="btn btn-signal btn-sm foot-cta">
              Get a scoped quote
            </Link>
          </div>
        </div>

        <div className="foot-base">
          <span>
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </span>
          <span>Shopify Partner. Shopify is a trademark of Shopify Inc.</span>
        </div>
      </div>
    </footer>
  );
}
