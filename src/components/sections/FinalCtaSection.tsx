import Link from "next/link";
import { finalCta } from "@/data/homepage";
import Reveal from "@/components/animations/Reveal";
import TextReveal from "@/components/animations/TextReveal";
import Magnetic from "@/components/animations/Magnetic";

export default function FinalCtaSection() {
  return (
    <section className="cta" aria-labelledby="cta-heading">
      <div className="wrap">
        <Reveal as="div" className="cta-in">
          <div>
            <TextReveal as="h2">
              <span id="cta-heading">{finalCta.h2}</span>
            </TextReveal>
            <p>{finalCta.paragraph}</p>
          </div>
          <div>
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
