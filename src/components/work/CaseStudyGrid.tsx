/* eslint-disable @next/next/no-img-element -- uploaded covers of unknown size */
import Link from "next/link";
import { Visual } from "@/components/ui/visuals";
import type { CaseStudy } from "@/lib/cases";

/** Detailed case studies published from the admin, shown on /work/. */
export default function CaseStudyGrid({ cases }: { cases: CaseStudy[] }) {
  if (cases.length === 0) return null;
  return (
    <section className="case-list-sec" aria-labelledby="case-studies-detailed">
      <div className="wrap">
        <div className="head">
          <span className="eyebrow">In detail</span>
          <h2 id="case-studies-detailed">Full case studies</h2>
          <p>Before and after, the problem, what we changed and the result.</p>
        </div>
        <div className="post-grid">
          {cases.map((c) => {
            const img = c.coverUrl || c.afterUrl;
            return (
              <Link href={`/work/${c.slug}/`} className="post-card" key={c.slug}>
                <div className="post-media figure">
                  {img ? <img src={img} alt="" className="post-cover" loading="lazy" /> : <Visual name={c.visual ?? "ill-redesign"} />}
                </div>
                <div className="post-body">
                  <span className="post-cat">{[c.industry, c.theme].filter(Boolean).join(" · ") || "Case study"}</span>
                  <h3>{c.title}</h3>
                  {c.summary && <p>{c.summary}</p>}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
