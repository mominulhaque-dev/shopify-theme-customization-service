import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <div className="wrap head">
        <span className="eyebrow">404</span>
        <h1 style={{ fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "1rem" }}>
          That page doesn&rsquo;t exist.
        </h1>
        <p>
          It may have moved, or the route hasn&rsquo;t been built yet. Start again from{" "}
          <Link href="/">the homepage</Link>, or{" "}
          <Link href="/hire/">get a scoped quote</Link>.
        </p>
      </div>
    </section>
  );
}
