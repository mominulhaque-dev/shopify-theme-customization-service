import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { STATUS_LABEL, isOverdue, timeAgo, OVERDUE_HOURS } from "@/lib/admin/format";
import { canEmailCustomers } from "@/lib/email";
import { telegramConfigured } from "@/lib/notify";

interface LeadRow {
  id: string;
  created_at: string;
  name: string;
  service: string | null;
  status: string;
  read_at: string | null;
}

export default async function DashboardPage() {
  const { supabase, email } = await requireAdmin();
  const since = new Date(Date.now() - 7 * 86400_000).toISOString();
  const overdueBefore = new Date(Date.now() - OVERDUE_HOURS * 3600_000).toISOString();
  const count = (q: PromiseLike<{ count: number | null }>) => Promise.resolve(q).then((r) => r.count ?? 0);

  const [leads7, unread, overdue, leadsAll, won, subs, posts, cases, projects, recent] = await Promise.all([
    count(supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", since)),
    count(supabase.from("leads").select("id", { count: "exact", head: true }).is("read_at", null)),
    count(supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new").lt("created_at", overdueBefore)),
    count(supabase.from("leads").select("id", { count: "exact", head: true })),
    count(supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "won")),
    count(supabase.from("subscribers").select("id", { count: "exact", head: true }).eq("unsubscribed", false)),
    count(supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "published")),
    count(supabase.from("case_studies").select("id", { count: "exact", head: true }).eq("status", "published")),
    count(supabase.from("projects").select("id", { count: "exact", head: true }).eq("status", "active")),
    supabase.from("leads").select("id, created_at, name, service, status, read_at").order("created_at", { ascending: false }).limit(8),
  ]);
  const recentLeads = (recent.data as LeadRow[] | null) ?? [];

  const stats = [
    { label: "New leads (7 days)", value: leads7, href: "/admin/leads/" },
    { label: "Unread", value: unread, href: "/admin/leads/", tone: unread > 0 ? "brand" : "" },
    { label: `Waiting over ${OVERDUE_HOURS}h`, value: overdue, href: "/admin/leads/?status=new", tone: overdue > 0 ? "warn" : "" },
    { label: "Won", value: `${won}/${leadsAll}`, href: "/admin/leads/?status=won" },
    { label: "Active projects", value: projects, href: "/admin/projects/" },
    { label: "Subscribers", value: subs, href: "/admin/subscribers/" },
    { label: "Published posts", value: posts, href: "/admin/blog/" },
    { label: "Case studies", value: cases, href: "/admin/cases/" },
  ];

  const setup = [
    { ok: Boolean(process.env.SUPABASE_SECRET_KEY), label: "Contact form saves leads", fix: "Add SUPABASE_SECRET_KEY in Vercel → Environment Variables." },
    { ok: Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL), label: "Email alert for each new lead", fix: "Add RESEND_API_KEY and CONTACT_EMAIL." },
    { ok: telegramConfigured(), label: "Telegram alert for each new lead", fix: "Add TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID." },
    { ok: Boolean(process.env.CRON_SECRET), label: "Daily follow-up reminder", fix: "Add CRON_SECRET (any long random text)." },
    { ok: canEmailCustomers(), label: "Auto-reply and portal emails to clients", fix: "Verify a domain in Resend, then set RESEND_FROM." },
  ];
  const missing = setup.filter((s) => !s.ok);

  return (
    <>
      <header className="adm-head">
        <div>
          <h1>Dashboard</h1>
          <p className="adm-muted">Signed in as {email}</p>
        </div>
        <Link href="/admin/blog/new/" className="adm-btn">
          + New post
        </Link>
      </header>

      <div className="adm-stats">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className={`adm-card adm-statcard${s.tone ? ` is-${s.tone}` : ""}`}>
            <span className="adm-stat">{s.value}</span>
            <span className="adm-muted adm-small">{s.label}</span>
          </Link>
        ))}
      </div>

      <div className="adm-dash">
        <section className="adm-card adm-stack">
          <div className="adm-row">
            <h2>Latest enquiries</h2>
            <Link href="/admin/leads/" className="adm-small">
              All leads →
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <p className="adm-empty">No enquiries yet. They appear here as soon as someone sends the Hire form.</p>
          ) : (
            <ul className="adm-feed">
              {recentLeads.map((l) => (
                <li key={l.id} className={l.read_at ? undefined : "is-unread"}>
                  <Link href={`/admin/leads/${l.id}/`}>
                    {!l.read_at && <span className="adm-dot" aria-label="Unread" />}
                    <strong>{l.name}</strong>
                    <span className="adm-muted adm-small">{l.service ?? "—"}</span>
                  </Link>
                  <span className="adm-feed-meta">
                    {isOverdue(l) && <span className="adm-badge adm-badge-err">Overdue</span>}
                    <span className={`adm-badge adm-status-${l.status}`}>{(STATUS_LABEL as Record<string, string>)[l.status] ?? l.status}</span>
                    <span className="adm-muted adm-small">{timeAgo(l.created_at)}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="adm-card adm-stack">
          <h2>Setup</h2>
          {missing.length === 0 ? (
            <p className="adm-alert adm-alert-ok">Everything is connected.</p>
          ) : (
            <p className="adm-muted adm-small">
              {setup.length - missing.length} of {setup.length} connected. After adding a variable in Vercel, redeploy.
            </p>
          )}
          <ul className="adm-checklist">
            {setup.map((s) => (
              <li key={s.label} className={s.ok ? "is-ok" : undefined}>
                <span aria-hidden="true">{s.ok ? "✓" : "○"}</span>
                <div>
                  <strong>{s.label}</strong>
                  {!s.ok && <span className="adm-muted adm-small">{s.fix}</span>}
                </div>
              </li>
            ))}
          </ul>
          <div className="adm-quick">
            <Link href="/admin/settings/">Prices &amp; contact details</Link>
            <Link href="/admin/redirects/">Redirects</Link>
            <Link href="/admin/media/">Media library</Link>
          </div>
        </section>
      </div>
    </>
  );
}
