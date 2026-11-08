import { requireAdmin } from "@/lib/admin/auth";
import { LEGACY_REDIRECTS } from "@/data/legacy-redirects";
import ConfirmButton from "@/components/admin/ConfirmButton";
import AddRedirectForm from "./AddRedirectForm";
import { deleteRedirect, seedLegacyRedirects, toggleRedirect } from "./actions";

interface Row {
  id: string;
  source: string;
  destination: string;
  permanent: boolean;
  active: boolean;
}

export default async function RedirectsPage({ searchParams }: { searchParams: { q?: string } }) {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("redirects").select("id, source, destination, permanent, active").order("source");
  const all = (data as Row[] | null) ?? [];
  const q = (searchParams.q ?? "").toLowerCase().trim();
  const rows = q ? all.filter((r) => r.source.includes(q) || r.destination.toLowerCase().includes(q)) : all;
  const have = new Set(all.map((r) => r.source));
  const missingLegacy = LEGACY_REDIRECTS.filter(([s]) => !have.has(s)).length;

  return (
    <>
      <header className="adm-head">
        <div>
          <h1>Redirects</h1>
          <p className="adm-muted">Send old or mistyped addresses to a live page. Changes take effect within about a minute.</p>
        </div>
      </header>

      {missingLegacy > 0 && (
        <div className="adm-alert adm-alert-warn">
          <p>
            {missingLegacy} page{missingLegacy > 1 ? "s" : ""} removed in the November update (old guides, customization pages and
            case studies) still return &ldquo;page not found&rdquo;. Redirect them to the closest live page?
          </p>
          <form action={seedLegacyRedirects}>
            <button type="submit" className="adm-btn adm-btn-sm">
              Add {missingLegacy} redirect{missingLegacy > 1 ? "s" : ""}
            </button>
          </form>
        </div>
      )}

      <AddRedirectForm />

      <form className="adm-filters" method="get">
        <input name="q" defaultValue={searchParams.q ?? ""} placeholder="Search paths…" aria-label="Search redirects" />
        <button type="submit" className="adm-btn">
          Search
        </button>
      </form>

      {rows.length === 0 ? (
        <p className="adm-empty">No redirects{q ? " match" : " yet"}.</p>
      ) : (
        <div className="adm-table-wrap adm-card">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Old address</th>
                <th>Goes to</th>
                <th>Type</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className={r.active ? undefined : "adm-dim"}>
                  <td>
                    <code>{r.source}</code>
                  </td>
                  <td>
                    <a href={r.destination} target="_blank" rel="noopener noreferrer">
                      <code>{r.destination}</code>
                    </a>
                  </td>
                  <td className="adm-small">{r.permanent ? "Permanent" : "Temporary"}</td>
                  <td>
                    <span className={`adm-badge${r.active ? " adm-status-won" : ""}`}>{r.active ? "On" : "Off"}</span>
                  </td>
                  <td>
                    <div className="adm-actions">
                      <form action={toggleRedirect.bind(null, r.id, !r.active)}>
                        <button type="submit" className="adm-btn adm-btn-ghost adm-btn-sm">
                          {r.active ? "Turn off" : "Turn on"}
                        </button>
                      </form>
                      <form action={deleteRedirect.bind(null, r.id)}>
                        <ConfirmButton message={`Delete the redirect from ${r.source}?`} className="adm-btn adm-btn-danger adm-btn-sm">
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
