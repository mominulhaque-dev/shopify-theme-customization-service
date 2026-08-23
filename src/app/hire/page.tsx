import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import { siteConfig } from "@/data/site";
import Reveal from "@/components/animations/Reveal";

export const metadata: Metadata = {
  title: "Get a Scoped Shopify Theme Customization Quote",
  description:
    "Send your Shopify store URL and what you want changed. Get a fixed-price, fixed-timeline scope back within two business days.",
  alternates: { canonical: "/hire/" },
};

export default function HirePage() {
  return (
    <>
      <section>
        <div className="wrap">
          <div className="head">
            <span className="eyebrow">Start a project</span>
            <h1 style={{ fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "1rem" }}>
              Get a scoped quote
            </h1>
            <p>
              Send your store URL and a short description of what you want changed. You get a
              scoped quote with a fixed price and a delivery date within two business days. No
              discovery call required to get a number, and no obligation once you have it.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "3rem" }}>
            <Reveal as="div">
              <ContactForm />
            </Reveal>
            <Reveal as="div" delay={0.1}>
              <aside className="price-card">
                <div className="price-card-top">
                  <span className="eyebrow">Prefer email or a call?</span>
                  <p style={{ marginTop: 0 }}>
                    <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                  </p>
                  <p>
                    <a href={`tel:${siteConfig.phoneE164}`}>{siteConfig.phoneDisplay}</a>
                  </p>
                  <p>
                    <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
                      Message us on WhatsApp
                    </a>
                  </p>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
