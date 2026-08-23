import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MotionProvider from "@/components/animations/MotionProvider";
import ScrollProgress from "@/components/animations/ScrollProgress";
import SmoothScrollProvider from "@/components/animations/SmoothScrollProvider";
import { siteConfig } from "@/data/site";

import "./globals.css";

/**
 * Runs synchronously before the body paints. It adds `.motion` to <html> only
 * when JS is available and the visitor has not asked for reduced motion, which
 * is what lets the pre-paint hidden states in styles/motion.css exist without
 * ever trapping content invisible: no class, no hiding, no animation.
 */
const MOTION_BOOTSTRAP = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('motion')}}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}: Scope, Cost and Timeline`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

/*
 * No og:image is advertised yet, deliberately.
 *
 * next/og cannot run in this checkout: @vercel/og resolves its bundled font
 * through a path join that produces an invalid URL when the project directory
 * contains a space or brackets, and it fails at module load rather than at
 * render, so the route 500s rather than degrading. Advertising an og:image URL
 * that returns 500 is worse than advertising none.
 *
 * The card design is ready at public/og-image.svg. To finish it: export that to
 * public/og-image.png at 1200x630, then add
 *   images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }]
 * to openGraph above and `images: ["/og-image.png"]` to twitter.
 */

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phoneE164,
  description: siteConfig.description,
  priceRange: "$1,000–$12,000",
  areaServed: "Worldwide",
  knowsAbout: [
    "Shopify theme customization",
    "Shopify Liquid development",
    "Online Store 2.0 migration",
    "Shopify store speed optimization",
    "Shopify conversion rate optimization",
  ],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Shopify theme customization" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Online Store 2.0 migration" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Shopify store redesign" } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts over <link> rather than next/font: the build environment
            cannot reach fonts.gstatic.com, and a font fetch that fails at build
            time fails the whole build. Preconnects keep the runtime cost close
            to self-hosting. See CLAUDE.md §"Fonts". */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap"
        />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body>
        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOTSTRAP }} />
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
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </MotionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
