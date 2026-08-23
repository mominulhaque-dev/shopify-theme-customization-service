import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ScopeSection from "@/components/sections/ScopeSection";
import ThemesSection from "@/components/sections/ThemesSection";
import DiffSection from "@/components/sections/DiffSection";
import ProcessSection from "@/components/sections/ProcessSection";
import WorkSection from "@/components/sections/WorkSection";
import FinalCtaSection from "@/components/sections/FinalCtaSection";
import { faqItems } from "@/data/homepage";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Shopify Theme Customization Services: Scope, Cost and Timeline",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <ScopeSection />
      <ThemesSection />
      <DiffSection />
      <ProcessSection />
      <WorkSection />
      <FinalCtaSection />
    </>
  );
}
