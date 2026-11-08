import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";

interface Row {
  id: string;
  slug: string;
  title: string;
  industry: string;
  status: string;
  sort_order: number;
}

export default async function CasesAdmin() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase
    .from("case_studies")
    .select("id, slug, title, industry, status, sort_order")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  const rows = (data as Row[] | null) ?? [];

  return (
    <>
      <header className="adm-head">
        <div>
          <h1>Case studies</h1>
          <p className="adm-muted">Published case studies appear on the Work page with their own page and a before/after slider.</p>
        </div>
        <Link href="/admin/cases/new/" className="adm-btn adm-btn-primary">
          + New case study
        </Link>
      </header>
      {rows.length === 0 ? (
        <p className="adm-empty">No case studies yet.</p>
      ) : (
        <div className="adm-table-wrap adm-card">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Industry</th>
                <th>Status</th>
                <th>Order</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <Link href={`/admin/cases/${r.id}/`}>
                      <strong>{r.title}</strong>
                    </Link>
                    <div className="adm-muted adm-small">/work/{r.slug}/</div>
                  </td>
                  <td>{r.industry || "—"}</td>
                  <td>
                    <span className={`adm-badge${r.status === "published" ? " adm-status-won" : ""}`}>
                      {r.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>{r.sort_order}</td>
                  <td>
                    {r.status === "published" && (
                      <a href={`/work/${r.slug}/`} target="_blank" rel="noopener noreferrer" className="adm-small">
                        View ↗
                      </a>
                    )}
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
