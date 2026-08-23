import Link from "next/link";
import Backdrop from "@/components/animations/Backdrop";
import { footerColumns, siteConfig } from "@/data/site";

/**
 * Footer. Also the site's internal-link map: every page in the registry is
 * reachable from here in one click, which is how the topic clusters get their
 * crawl paths and how a visitor deep in a guide finds the commercial pages.
 */
export default function Footer() {
  return (
    <footer>
      <Backdrop variant="mesh" tone="dark" noise />
      <div className="wrap">
        <div className="foot">
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h4>{column.heading}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="foot-base">
          <span>
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </span>
          <div className="foot-contact">
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phoneE164}`}>{siteConfig.phoneDisplay}</a>
            <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
          <span>Shopify Partner. Shopify is a trademark of Shopify Inc.</span>
        </div>
      </div>
    </footer>
  );
}
