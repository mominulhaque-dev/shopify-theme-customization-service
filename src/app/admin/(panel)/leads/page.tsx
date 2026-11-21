import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { LEAD_STATUSES, STATUS_LABEL, formatDate, isOverdue, safeSearch, timeAgo } from "@/lib/admin/format";
import { SERVICE_OPTIONS } from "@/data/lead-options";

const PAGE_SIZE = 50;

type Lead = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  store_url: string;
  service: string | null;
  budget: string | null;
  status: string;
  read_at: string | null;
};

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string; service?: string; page?: string };
}) {
  const { supabase } = await requireAdmin();
  const q = safeSearch(searchParams.q ?? "");
  const status = LEAD_STATUSES.includes(searchParams.status as never) ? searchParams.status! : "";
  const service = searchParams.service ?? "";
  const page = Math.max(1, Number(searchParams.page) || 1);

  let query = supabase
    .from("leads")
    .select("id, created_at, name, email, store_url, service, budget, status, read_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (status) query = query.eq("status", status);
  if (service) query = query.eq("service", service);
  if (q) query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,store_url.ilike.%${q}%,message.ilike.%${q}%`);
  const { data, count, error } = await query;
  const leads = (data ?? []) as Lead[];

  const counts = await Promise.all(
    LEAD_STATUSES.map(async (s) => {
      const { count: c } = await supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", s);
      return [s, c ?? 0] as const;
    })
  );
  const total = counts.reduce((sum, [, c]) => sum + c, 0);

  const link = (params: Record<string, string>) => {
    const sp = new URLSearchParams({ ...(q && { q }), ...(status && { status }), ...(service && { service }), ...params });
    for (const [k, v] of Array.from(sp.entries())) if (!v) sp.delete(k);
    const s = sp.toString();
    return `/admin/leads/${s ? `?${s}` : ""}`;
  };
  const exportHref = `/admin/leads/export/${link({}).replace("/admin/leads/", "")}`;
  const pages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));

  return (
    <>
      <header className="adm-head">
        <div>
          <h1>Leads</h1>
          <p className="adm-muted">Everyone who filled in the quote form. Newest first.</p>
        </div>
        <a href={exportHref} className="adm-btn">
          ⬇ Export CSV
        </a>
      </header>

      <nav className="adm-tabs" aria-label="Filter by status">
        <Link href={link({ status: "", page: "" })} className={!status ? "is-active" : undefined}>
          All <span>{total}</span>
        </Link>
        {counts.map(([s, c]) => (
          <Link key={s} href={link({ status: s, page: "" })} className={status === s ? "is-active" : undefined}>
            {STATUS_LABEL[s]} <span>{c}</span>
          </Link>
        ))}
      </nav>

      <form className="adm-filters" action="/admin/leads/">
        {status && <input type="hidden" name="status" value={status} />}
        <input name="q" defaultValue={q} placeholder="Search name, email, store or message" aria-label="Search leads" />
        <select name="service" defaultValue={service} aria-label="Filter by service">
          <option value="">All services</option>
          {SERVICE_OPTIONS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <button type="submit" className="adm-btn">
          Search
        </button>
        {(q || service) && (
          <Link href={link({ q: "", service: "", page: "" })} className="adm-btn adm-btn-ghost">
            Clear
          </Link>
        )}
      </form>

      {error && <p className="adm-alert adm-alert-error">Could not load leads: {error.message}</p>}

      {leads.length === 0 ? (
        <div className="adm-card adm-empty">
          <strong>No leads here yet.</strong>
          <span className="adm-muted">New quote requests from the website will appear here automatically.</span>
        </div>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table adm-table-click">
            <thead>
              <tr>
                <th>Received</th>
                <th>Name</th>
                <th>Store</th>
                <th>Service</th>
                <th>Budget</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => {
                const overdue = isOverdue(lead);
                return (
                  <tr key={lead.id} className={!lead.read_at ? "is-unread" : undefined}>
                    <td title={formatDate(lead.created_at)}>
                      {timeAgo(lead.created_at)}
                      {overdue && (
                        <span className="adm-badge adm-badge-err" title="No reply for over 24 hours">
                          Overdue
                        </span>
                      )}
                    </td>
                    <td>
                      <Link href={`/admin/leads/${lead.id}/`} className="adm-rowlink">
                        {!lead.read_at && <span className="adm-dot" aria-label="Unread" />}
                        {lead.name}
                      </Link>
                      <div className="adm-muted adm-small">{lead.email}</div>
                    </td>
                    <td className="adm-truncate">{lead.store_url}</td>
                    <td>{lead.service || <span className="adm-muted">—</span>}</td>
                    <td>{lead.budget || <span className="adm-muted">—</span>}</td>
                    <td>
                      <span className={`adm-badge adm-status-${lead.status}`}>
                        {STATUS_LABEL[lead.status as keyof typeof STATUS_LABEL] ?? lead.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {pages > 1 && (
        <nav className="adm-pager" aria-label="Pages">
          {page > 1 && <Link href={link({ page: String(page - 1) })} className="adm-btn adm-btn-sm">← Newer</Link>}
          <span className="adm-muted adm-small">
            Page {page} of {pages}
          </span>
          {page < pages && <Link href={link({ page: String(page + 1) })} className="adm-btn adm-btn-sm">Older →</Link>}
        </nav>
      )}
    </>
  );
}
