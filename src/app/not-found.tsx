import Link from "next/link";
import Backdrop from "@/components/animations/Backdrop";
import Reveal from "@/components/animations/Reveal";
import TextReveal from "@/components/animations/TextReveal";

/**
 * 404. Rather than a dead end, it offers the routes people actually arrive
 * looking for — the four commercial hubs and the guides index.
 */
export default function NotFound() {
  return (
    <div className="phero has-backdrop">
      <Backdrop variant="contour" noise />
      <div className="wrap">
        <div className="phero-in solo">
          <Reveal kind="fade" duration={0.6}>
            <span className="eyebrow">404</span>
          </Reveal>
          <TextReveal as="h1" trigger="load">
            That page doesn&rsquo;t exist.
          </TextReveal>
          <Reveal kind="up-sm" delay={0.2}>
            <p className="phero-lede">
              The link may be old, or the address may have a typo in it. Everything on this site is
              one click from here.
            </p>
          </Reveal>
          <Reveal kind="up-sm" delay={0.3} className="btn-row">
            <Link href="/" className="btn btn-lg">
              Back to the homepage
            </Link>
            <Link href="/hire/" className="btn btn-lg btn-outline">
              Get a scoped quote
            </Link>
          </Reveal>
          <Reveal kind="fade" delay={0.4}>
            <div className="related" style={{ marginTop: "2rem" }}>
              <Link href="/customization/" className="rel">
                <b>Theme customization</b>
                <span>Every layer we work in, priced</span>
              </Link>
              <Link href="/pricing/" className="rel">
                <b>Pricing</b>
                <span>Four published tiers</span>
              </Link>
              <Link href="/themes/" className="rel">
                <b>Themes</b>
                <span>Dawn, Prestige, Spotlight, legacy</span>
              </Link>
              <Link href="/guides/" className="rel">
                <b>Guides</b>
                <span>Including when not to hire anyone</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
