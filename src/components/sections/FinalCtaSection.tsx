import Link from "next/link";
import { finalCta } from "@/data/homepage";
import Backdrop from "@/components/animations/Backdrop";
import Magnetic from "@/components/animations/Magnetic";
import Reveal from "@/components/animations/Reveal";
import TextReveal from "@/components/animations/TextReveal";

/**
 * Closing CTA. Copy verbatim (§3). Beam backdrop rather than another aurora, so
 * the last thing on the page does not repeat the first thing.
 */
export default function FinalCtaSection() {
  return (
    <section className="cta has-backdrop" aria-labelledby="cta-heading">
      <Backdrop variant="beams" noise />
      <div className="wrap">
        <div className="cta-in">
          <div>
            <TextReveal as="h2" id="cta-heading">
              {finalCta.h2}
            </TextReveal>
            <Reveal kind="up-sm" delay={0.08}>
              <p>{finalCta.paragraph}</p>
            </Reveal>
          </div>
          <Reveal kind="up-sm" delay={0.16} className="btn-row">
            <Magnetic strength={12}>
              <Link href={finalCta.ctaHref} className="btn btn-lg btn-arrow">
                {finalCta.ctaLabel}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3 8h10m0 0-4-4m4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </Magnetic>
            <Link href="/pricing/" className="btn btn-lg btn-outline">
              See pricing first
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
