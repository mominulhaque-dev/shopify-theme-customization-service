"use client";

import { useFormState, useFormStatus } from "react-dom";
import { LEAD_STATUSES, STATUS_LABEL } from "@/lib/admin/format";
import type { LeadSaveState } from "../actions";

function Save() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="adm-btn adm-btn-primary" disabled={pending}>
      {pending ? "Saving…" : "Save"}
    </button>
  );
}

export default function LeadForm({
  action,
  status,
  notes,
}: {
  action: (prev: LeadSaveState, fd: FormData) => Promise<LeadSaveState>;
  status: string;
  notes: string;
}) {
  const [state, formAction] = useFormState(action, {});
  return (
    <form action={formAction} className="adm-stack">
      <label className="adm-field">
        <span>Status</span>
        <select name="status" defaultValue={status}>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABEL[s]}
            </option>
          ))}
        </select>
      </label>
      <label className="adm-field">
        <span>Your notes (only you see these)</span>
        <textarea name="notes" defaultValue={notes} rows={6} placeholder="Quoted $250 on 9 Nov, waiting for reply…" />
      </label>
      {state.error && <p className="adm-alert adm-alert-error">{state.error}</p>}
      {state.ok && <p className="adm-alert adm-alert-ok">Saved.</p>}
      <div>
        <Save />
      </div>
    </form>
  );
}
