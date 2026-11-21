import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/server";
import { getSettings } from "@/lib/settings";
import { MILESTONE_LABEL, PROJECT_STATUS_LABEL, TOKEN_RE, progress, type Milestone } from "@/lib/admin/projects";

/**
 * Client portal: a private, unlisted progress page. Anyone holding the link
 * can view it — the 36-character random token is the key — so it shows only
 * what the client already knows (no prices, notes or other clients).
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Your project" },
  robots: { index: false, follow: false, nocache: true },
};

const fmt = (d: string) =>
  new Date(d.length === 10 ? `${d}T00:00:00Z` : d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Dhaka" });

export default async function PortalPage({ params }: { params: { token: string } }) {
  if (!TOKEN_RE.test(params.token)) notFound();
  const db = createServiceClient();
  if (!db) notFound();

  const { data } = await db
    .from("projects")
    .select("title, client_name, store_url, status, message, updated_at, project_milestones(id, title, sort, status, due_date, done_at)")
    .eq("token", params.token)
    .maybeSingle();
  if (!data) notFound();

  const p = data as {
    title: string;
    client_name: string;
    store_url: string;
    status: string;
    message: string;
    updated_at: string;
    project_milestones: Milestone[];
  };
  const steps = [...(p.project_milestones ?? [])].sort((a, b) => a.sort - b.sort);
  const pct = p.status === "delivered" ? 100 : progress(steps);
  const current = steps.find((s) => s.status === "doing") ?? steps.find((s) => s.status === "todo");
  const settings = await getSettings();

  return (
    <section className="portal">
      <div className="wrap portal-wrap">
        <header className="portal-head">
          <span className="eyebrow">Project tracker</span>
          <h1>{p.title}</h1>
          <p className="portal-sub">
            {p.client_name && <>For {p.client_name} · </>}
            {p.store_url && <>{p.store_url.replace(/^https?:\/\//, "")} · </>}
            Updated {fmt(p.updated_at)}
          </p>
        </header>

        <div className="portal-card portal-summary">
          <div className="portal-summary-top">
            <span className={`portal-status portal-status-${p.status}`}>{PROJECT_STATUS_LABEL[p.status] ?? p.status}</span>
            <strong className="portal-pct">{pct}%</strong>
          </div>
          <div className="portal-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Project progress">
            <span style={{ width: `${pct}%` }} />
          </div>
          {p.status !== "delivered" && current && (
            <p className="portal-now">
              Now: <strong>{current.title}</strong>
              {current.due_date && <> · expected {fmt(current.due_date)}</>}
            </p>
          )}
          {p.status === "delivered" && <p className="portal-now">Delivered. Thank you for working with us.</p>}
        </div>

        {p.message && (
          <div className="portal-card portal-message">
            <strong>Latest note</strong>
            <p>{p.message}</p>
          </div>
        )}

        {steps.length > 0 && (
          <ol className="portal-steps">
            {steps.map((s) => (
              <li key={s.id} className={`portal-step is-${s.status}`}>
                <span className="portal-dot" aria-hidden="true">
                  {s.status === "done" ? "✓" : ""}
                </span>
                <div>
                  <strong>{s.title}</strong>
                  <span className="portal-step-meta">
                    {MILESTONE_LABEL[s.status]}
                    {s.status === "done" && s.done_at && <> · {fmt(s.done_at)}</>}
                    {s.status !== "done" && s.due_date && <> · due {fmt(s.due_date)}</>}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        )}

        <div className="portal-card portal-help">
          <strong>Questions?</strong>
          <p>
            Email <a href={`mailto:${settings.email}`}>{settings.email}</a> or message us on{" "}
            <a href={settings.whatsappUrl} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
