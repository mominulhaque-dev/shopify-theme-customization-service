import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { formatDate, safeSearch } from "@/lib/admin/format";
import ConfirmButton from "@/components/admin/ConfirmButton";
import { deleteSubscriber, setUnsubscribed } from "./actions";

interface Row {
  id: string;
  email: string;
  source_page: string | null;
  unsubscribed: boolean;
  created_at: string;
}

const TABS = [
  { key: "", label: "Active" },
  { key: "unsubscribed", label: "Unsubscribed" },
  { key: "all", label: "All" },
];

export default async function SubscribersPage({ searchParams }: { searchParams: { q?: string; show?: string } }) {
  const { supabase } = await requireAdmin();
  const show = searchParams.show ?? "";
  const q = safeSearch(searchParams.q ?? "");

  let query = supabase.from("subscribers").select("id, email, source_page, unsubscribed, created_at").order("created_at", { ascending: false }).limit(1000);
  if (show === "") query = query.eq("unsubscribed", false);
  if (show === "unsubscribed") query = query.eq("unsubscribed", true);
  if (q) query = query.ilike("email", `%${q}%`);
  const [{ data }, { count: active }, { count: total }] = await Promise.all([
    query,
    supabase.from("subscribers").select("id", { count: "exact", head: true }).eq("unsubscribed", false),
    supabase.from("subscribers").select("id", { count: "exact", head: true }),
  ]);
  const rows = (data as Row[] | null) ?? [];
  const exportHref = `/admin/subscribers/export/?show=${encodeURIComponent(show)}`;

  return (
    <>
      <header className="adm-head">
        <div>
          <h1>Newsletter subscribers</h1>
          <p className="adm-muted">
            {active ?? 0} active · {total ?? 0} total. People sign up from the box at the end of blog posts.
          </p>
        </div>
        <a href={exportHref} className="adm-btn">
          Export CSV
        </a>
      </header>

      <nav className="adm-tabs" aria-label="Filter">
        {TABS.map((t) => (
          <Link key={t.key} href={t.key ? `/admin/subscribers/?show=${t.key}` : "/admin/subscribers/"} className={show === t.key ? "is-active" : undefined}>
            {t.label}
          </Link>
        ))}
      </nav>
      <form className="adm-filters" method="get">
        {show && <input type="hidden" name="show" value={show} />}
        <input name="q" defaultValue={searchParams.q ?? ""} placeholder="Search email…" aria-label="Search email" />
        <button type="submit" className="adm-btn">
          Search
        </button>
      </form>

      {rows.length === 0 ? (
        <p className="adm-empty">No subscribers here yet.</p>
      ) : (
        <div className="adm-table-wrap adm-card">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Signed up</th>
                <th>From page</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <a href={`mailto:${r.email}`}>{r.email}</a>
                  </td>
                  <td className="adm-small">{formatDate(r.created_at)}</td>
                  <td className="adm-small adm-muted">{r.source_page ?? "—"}</td>
                  <td>
                    <span className={`adm-badge${r.unsubscribed ? "" : " adm-status-won"}`}>{r.unsubscribed ? "Unsubscribed" : "Active"}</span>
                  </td>
                  <td>
                    <div className="adm-actions">
                      <form action={setUnsubscribed.bind(null, r.id, !r.unsubscribed)}>
                        <button type="submit" className="adm-btn adm-btn-ghost adm-btn-sm">
                          {r.unsubscribed ? "Resubscribe" : "Unsubscribe"}
                        </button>
                      </form>
                      <form action={deleteSubscriber.bind(null, r.id)}>
                        <ConfirmButton message={`Delete ${r.email}? Use this for data-removal requests.`} className="adm-btn adm-btn-danger adm-btn-sm">
                          Delete
                        </ConfirmButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
