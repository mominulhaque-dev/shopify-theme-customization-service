"use client";

import { useFormState, useFormStatus } from "react-dom";
import { PROJECT_STATUSES, PROJECT_STATUS_LABEL } from "@/lib/admin/projects";
import type { ProjectState } from "./actions";

export interface ProjectValues {
  title: string;
  client_name: string;
  client_email: string;
  store_url: string;
  status: string;
  message: string;
}

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="adm-btn adm-btn-primary" disabled={pending}>
      {pending ? "Saving…" : label}
    </button>
  );
}

export default function ProjectForm({
  action,
  values,
  isNew,
  leadId,
}: {
  action: (prev: ProjectState, fd: FormData) => Promise<ProjectState>;
  values: ProjectValues;
  isNew?: boolean;
  leadId?: string | null;
}) {
  const [state, formAction] = useFormState<ProjectState, FormData>(action, {});
  return (
    <form action={formAction} className="adm-card adm-stack">
      {state.error && <p className="adm-alert adm-alert-error" role="alert">{state.error}</p>}
      {state.ok && <p className="adm-alert adm-alert-ok" role="status">{state.ok}</p>}
      {leadId && <input type="hidden" name="lead_id" value={leadId} />}
      <label className="adm-field">
        <span>Project name (the client sees this)</span>
        <input name="title" defaultValue={values.title} required placeholder="Product page rebuild" />
      </label>
      <div className="adm-cols">
        <label className="adm-field">
          <span>Client name</span>
          <input name="client_name" defaultValue={values.client_name} />
        </label>
        <label className="adm-field">
          <span>Client email</span>
          <input name="client_email" type="email" defaultValue={values.client_email} />
        </label>
        <label className="adm-field">
          <span>Store</span>
          <input name="store_url" defaultValue={values.store_url} />
        </label>
        <label className="adm-field">
          <span>Status</span>
          <select name="status" defaultValue={values.status}>
            {PROJECT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {PROJECT_STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="adm-field">
        <span>Note to the client (shown at the top of their page)</span>
        <textarea name="message" rows={3} defaultValue={values.message} placeholder="We're building on a preview theme this week. You'll get a link to review by Thursday." />
      </label>
      {isNew && (
        <label className="adm-check">
          <input type="checkbox" name="default_milestones" defaultChecked /> Start with the standard steps (scope → access → build → review → revisions → handover)
        </label>
      )}
      <div>
        <Submit label={isNew ? "Create project" : "Save details"} />
      </div>
    </form>
  );
}
