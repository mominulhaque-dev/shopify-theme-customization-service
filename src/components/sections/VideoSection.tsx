import Reveal from "@/components/animations/Reveal";
import TextReveal from "@/components/animations/TextReveal";

/**
 * A 49-second plain-English explainer for store owners who do not want to
 * read about Liquid and schema: what we change, how the price is fixed, and
 * that the live store keeps selling. Voiceover with English captions; the
 * file is only fetched when the visitor presses play (`preload="none"`).
 *
 * Source: public/video/explainer.mp4 (1280×720, H.264/AAC), poster frame and
 * captions alongside it.
 */
export default function VideoSection() {
  return (
    <section className="video-sec" aria-labelledby="video-heading">
      <div className="wrap video-in">
        <div>
          <Reveal kind="fade" duration={0.6}>
            <span className="eyebrow">Watch · 49 seconds</span>
          </Reveal>
          <TextReveal as="h2" id="video-heading">
            How we fix your store, in plain English
          </TextReveal>
          <Reveal kind="up-sm" delay={0.06}>
            <p className="col-lede">
              No code talk. What we change, how the price is fixed before we start, and why your shop keeps selling while we work.
            </p>
          </Reveal>
        </div>
        <Reveal kind="up" delay={0.1}>
          <div className="video-frame">
            <video
              controls
              preload="none"
              playsInline
              poster="/video/explainer-poster.jpg"
              width={1280}
              height={720}
            >
              <source src="/video/explainer.mp4" type="video/mp4" />
              <track kind="captions" src="/video/explainer.en.vtt" srcLang="en" label="English" default />
            </video>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
