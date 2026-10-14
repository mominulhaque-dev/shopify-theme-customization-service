import type { Metadata } from "next";
import Backdrop from "@/components/animations/Backdrop";
import Reveal from "@/components/animations/Reveal";
import RevealGroup from "@/components/animations/RevealGroup";
import TextReveal from "@/components/animations/TextReveal";
import ContactForm from "@/components/forms/ContactForm";
import { FaqSection, RelatedSection } from "@/components/page/BlockFaq";
import { StepsSection } from "@/components/page/BlockCards";
import { PROCESS_STEPS } from "@/data/pages/_shared";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Get a Scoped Shopify Theme Customization Quote",
  description:
    "Send your Shopify store URL and what you want changed. Get a fixed-price, fixed-timeline scope back within two business days. No discovery call required to get a number.",
  alternates: { canonical: "/hire/" },
};

/**
 * The conversion page. Kept hand-built rather than data-driven because it is the
 * only page with a real form, and the form's states (idle, submitting, success,
 * error) are the point of it.
 */
export default function HirePage() {
  return (
    <>
      <div className="phero has-backdrop">
        <Backdrop variant="aurora" noise shapes />
        <div className="wrap">
          <div className="phero-in solo">
            <Reveal kind="fade" duration={0.6}>
              <span className="eyebrow">Start a project</span>
            </Reveal>
            <TextReveal as="h1" trigger="load">
              Get a scoped quote in two business days
            </TextReveal>
            <Reveal kind="up-sm" delay={0.2}>
              <p className="phero-lede">
                Send your store URL and a short description of what you want changed. You get a
                fixed price, a delivery date and a written scope. No discovery call required to get
                a number, and no obligation once you have it.
              </p>
            </Reveal>
            <Reveal kind="fade" delay={0.35} as="ul" className="phero-meta">
              <li>Shopify Partner</li>
              <li>Fixed price before work starts</li>
              <li>Your live store stays untouched</li>
            </Reveal>
          </div>
        </div>
      </div>

      <section className="tight">
        <div className="wrap">
          <div className="hire-grid">
            <Reveal kind="up" className="hire-form">
              <h2 className="h2-sm">Tell us about the work</h2>
              <ContactForm />
            </Reveal>

            <div className="hire-aside">
              <RevealGroup items=".hire-card" stagger={0.1} itemReveal="up-sm">
                <aside className="hire-card">
                  <h3>Prefer email, phone or WhatsApp?</h3>
                  <ul className="hire-contact">
                    <li>
                      <span>Email</span>
                      <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                    </li>
                    <li>
                      <span>Phone</span>
                      <a href={`tel:${siteConfig.phoneE164}`}>{siteConfig.phoneDisplay}</a>
                    </li>
                    <li>
                      <span>WhatsApp</span>
                      <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
                        Message us
                      </a>
                    </li>
                  </ul>
                </aside>

                <aside className="hire-card">
                  <h3>What to include</h3>
                  <p>
                    The more of this you send, the more precise the quote — and the less likely a
                    rescope later.
                  </p>
                  <ul className="ticks">
                    <li>Your store URL, and the theme name if you know it</li>
                    <li>The changes you want, in any order</li>
                    <li>A date you are working toward, if there is one</li>
                    <li>Screenshots or links to examples</li>
                  </ul>
                  <p className="hire-note">
                    Not sure which theme you are on? Its name and version are in Online Store → Themes in your Shopify admin.
                  </p>
                </aside>

                <aside className="hire-card hire-card-quiet">
                  <h3>We will tell you if you do not need us</h3>
                  <p>
                    Roughly half of what merchants send us is work the theme editor already does. If
                    yours is, we will explain what to change yourself instead of quoting for it.
                  </p>
                </aside>
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      <StepsSection
        block={{
          type: "steps",
          eyebrow: "What happens next",
          heading: "From your message to a published theme",
          lede: "Nothing starts until you approve the scope, and nothing publishes until you approve the build.",
          items: PROCESS_STEPS,
          visual: "timeline",
          tone: "tint",
        }}
      />

      <FaqSection
        block={{
          type: "faq",
          items: [
            {
              q: "How quickly will I hear back?",
              a: "Within two business days, with a scoped quote rather than a request for a call. If your enquiry needs a conversation to scope properly, we will say why and suggest a time.",
            },
            {
              q: "Do I need to know what my theme is?",
              a: "It helps and it is not required — we can identify it from your store URL. If you want to check first, the theme name and version are in Online Store → Themes, or in config/settings_schema.json.",
            },
            {
              q: "Will you ask for my store password?",
              a: "Never. As a Shopify Partner we request collaborator access, which you approve in your admin, can see the scope of, and can revoke at any time.",
            },
            {
              q: "What if my budget is below your smallest tier?",
              a: "We will say so plainly rather than stretching the work to fit. In most of those cases, we will explain what you can do yourself rather than take a project neither of us should be doing.",
            },
            {
              q: "Do you work with clients in other time zones?",
              a: "Yes — most of our work is asynchronous by design, which is why scoping is a document rather than a meeting. We overlap with European mornings and US mornings on request.",
            },
          ],
        }}
      />

      <RelatedSection
        block={{
          type: "related",
          heading: "Before you send it",
          items: [
            { label: "Pricing", href: "/pricing/", note: "The published ladder and what moves a quote" },
            { label: "Services", href: "/services/", note: "What we can help you change" },
            { label: "Case studies", href: "/work/", note: "Ten projects, including the rescopes" },
            { label: "Themes", href: "/themes/", note: "Theme generations and trade-offs" },
          ],
        }}
      />
    </>
  );
}
