/**
 * Reading-progress hairline across the top of the viewport. Scrubbed by
 * MotionProvider (`[data-scroll-progress]`), so it is absent under reduced
 * motion rather than sitting at a fixed width.
 */
export default function ScrollProgress() {
  return <div className="scroll-progress" data-scroll-progress="" aria-hidden="true" />;
}
