import Link from "next/link";
import { footerColumns, siteConfig } from "@/data/site";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h4>{col.heading}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="foot-base">
          <span>&copy; {new Date().getFullYear()} {siteConfig.name}</span>
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
