import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { formatDate } from "@/lib/admin/format";
import { PROJECT_STATUS_LABEL, progress } from "@/lib/admin/projects";

interface Row {
  id: string;
  title: string;
  client_name: string;
  status: string;
  updated_at: string;
  project_milestones: { status: string }[];
}

export default async function ProjectsPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase
    .from("projects")
    .select("id, title, client_name, status, updated_at, project_milestones(status)")
    .order("status", { ascending: true })
    .order("updated_at", { ascending: false });
  const rows = (data as Row[] | null) ?? [];

  return (
    <>
      <header className="adm-head">
        <div>
          <h1>Client projects</h1>
          <p className="adm-muted">Each project has a private page you share with the client so they can follow progress.</p>
        </div>
        <Link href="/admin/projects/new/" className="adm-btn adm-btn-primary">
          + New project
        </Link>
      </header>
      {rows.length === 0 ? (
        <p className="adm-empty">No projects yet. Start one here or from a lead (&ldquo;Start a project&rdquo;).</p>
      ) : (
        <div className="adm-table-wrap adm-card">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const pct = progress(r.project_milestones ?? []);
                return (
                  <tr key={r.id}>
                    <td>
                      <Link href={`/admin/projects/${r.id}/`}>
                        <strong>{r.title}</strong>
                      </Link>
                      <div className="adm-muted adm-small">{r.client_name || "—"}</div>
                    </td>
                    <td>
                      <span className={`adm-badge adm-proj-${r.status}`}>{PROJECT_STATUS_LABEL[r.status] ?? r.status}</span>
                    </td>
                    <td>
                      <div className="adm-progress" aria-label={`${pct}% done`}>
                        <span style={{ width: `${pct}%` }} />
                      </div>
                      <span className="adm-small adm-muted">{pct}%</span>
                    </td>
                    <td className="adm-small">{formatDate(r.updated_at)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
