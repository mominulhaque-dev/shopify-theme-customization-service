import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MotionProvider from "@/components/animations/MotionProvider";
import ScrollProgress from "@/components/animations/ScrollProgress";
import SmoothScrollProvider from "@/components/animations/SmoothScrollProvider";
import { siteConfig } from "@/data/site";
import { getSettings, priceRange } from "@/lib/settings";

/**
 * Everything the public website wraps its pages in: structured data, skip
 * link, scroll progress, smooth scrolling, motion, header and footer. Used by
 * the (site) route group layout and by the 404 page. The admin has its own
 * layout and loads none of this.
 */
export default async function SiteChrome({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.url,
    email: settings.email,
    telephone: settings.phoneE164,
    description: siteConfig.description,
    priceRange: priceRange(settings),
    areaServed: "Worldwide",
    knowsAbout: [
      "Shopify theme customization",
      "Shopify Liquid development",
      "Online Store 2.0 migration",
      "Shopify store speed optimization",
      "Shopify store redesign",
    ],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Shopify theme customization" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Online Store 2.0 migration" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Shopify store redesign" } },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <SmoothScrollProvider>
        <MotionProvider>
          <Header contact={settings} />
          <main id="main">{children}</main>
          <Footer settings={settings} />
        </MotionProvider>
      </SmoothScrollProvider>
    </>
  );
}
