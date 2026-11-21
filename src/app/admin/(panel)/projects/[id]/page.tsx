import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { MILESTONE_LABEL, MILESTONE_STATUSES, progress, type Milestone } from "@/lib/admin/projects";
import { siteConfig } from "@/data/site";
import ConfirmButton from "@/components/admin/ConfirmButton";
import ProjectForm, { type ProjectValues } from "../ProjectForm";
import PortalLink from "../PortalLink";
import {
  addMilestone,
  deleteMilestone,
  deleteProject,
  emailPortalLink,
  moveMilestone,
  regenerateToken,
  updateMilestone,
  updateProject,
} from "../actions";

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("projects").select("*, project_milestones(*)").eq("id", params.id).maybeSingle();
  if (!data) notFound();
  const p = data as ProjectValues & { id: string; token: string; lead_id: string | null; project_milestones: Milestone[] };
  const milestones = [...(p.project_milestones ?? [])].sort((a, b) => a.sort - b.sort);
  const pct = progress(milestones);
  const portalUrl = `${siteConfig.url}/portal/${p.token}/`;

  return (
    <>
      <header className="adm-head">
        <div>
          <Link href="/admin/projects/" className="adm-small">
            ← All projects
          </Link>
          <h1>{p.title}</h1>
          <p className="adm-muted">
            {pct}% done{p.lead_id && (
              <>
                {" · "}
                <Link href={`/admin/leads/${p.lead_id}/`}>Original enquiry</Link>
              </>
            )}
          </p>
        </div>
        <form action={deleteProject.bind(null, p.id)}>
          <ConfirmButton message="Delete this project and its client page? The link will stop working.">Delete project</ConfirmButton>
        </form>
      </header>

      <div className="adm-form-grid">
        <div className="adm-stack">
          <section className="adm-card adm-stack">
            <h2>Steps</h2>
            <p className="adm-muted adm-small">The client sees these steps, their status and due dates. Saving a step updates their page.</p>
            <div className="adm-progress adm-progress-lg" aria-hidden="true">
              <span style={{ width: `${pct}%` }} />
            </div>
            {milestones.length === 0 && <p className="adm-empty">No steps yet.</p>}
            <ol className="adm-steps">
              {milestones.map((m, i) => (
                <li key={m.id} className={`adm-step is-${m.status}`}>
                  <form action={updateMilestone.bind(null, p.id, m.id)} className="adm-step-form">
                    <input name="title" defaultValue={m.title} aria-label="Step" />
                    <select name="status" defaultValue={m.status} aria-label="Status">
                      {MILESTONE_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {MILESTONE_LABEL[s]}
                        </option>
                      ))}
                    </select>
                    <input type="date" name="due_date" defaultValue={m.due_date ?? ""} aria-label="Due date" />
                    <button type="submit" className="adm-btn adm-btn-sm">
                      Save
                    </button>
                  </form>
                  <div className="adm-step-tools">
                    <form action={moveMilestone.bind(null, p.id, m.id, -1)}>
                      <button type="submit" className="adm-btn adm-btn-ghost adm-btn-sm" disabled={i === 0} aria-label="Move up">
                        ↑
                      </button>
                    </form>
                    <form action={moveMilestone.bind(null, p.id, m.id, 1)}>
                      <button type="submit" className="adm-btn adm-btn-ghost adm-btn-sm" disabled={i === milestones.length - 1} aria-label="Move down">
                        ↓
                      </button>
                    </form>
                    <form action={deleteMilestone.bind(null, p.id, m.id)}>
                      <ConfirmButton message={`Remove the step "${m.title}"?`} className="adm-btn adm-btn-ghost adm-btn-sm">
                        ✕
                      </ConfirmButton>
                    </form>
                  </div>
                </li>
              ))}
            </ol>
            <form action={addMilestone.bind(null, p.id)} className="adm-step-form adm-step-add">
              <input name="title" placeholder="Add a step…" aria-label="New step" required />
              <input type="date" name="due_date" aria-label="Due date" />
              <button type="submit" className="adm-btn adm-btn-sm">
                + Add step
              </button>
            </form>
          </section>

          <ProjectForm action={updateProject.bind(null, p.id)} values={p} />
        </div>

        <aside className="adm-stack adm-sticky">
          <section className="adm-card adm-stack">
            <h2>Client page</h2>
            <p className="adm-muted adm-small">Anyone with this link can see the project page (no login). Don&rsquo;t post it publicly.</p>
            <PortalLink url={portalUrl} emailAction={emailPortalLink.bind(null, p.id)} />
            <form action={regenerateToken.bind(null, p.id)}>
              <ConfirmButton message="Make a new link? The old link stops working immediately." className="adm-btn adm-btn-ghost adm-btn-sm">
                Make a new link
              </ConfirmButton>
            </form>
          </section>
        </aside>
      </div>
    </>
  );
}
