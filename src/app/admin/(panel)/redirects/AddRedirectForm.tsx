"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addRedirect, type RedirectState } from "./actions";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="adm-btn adm-btn-primary" disabled={pending}>
      {pending ? "Saving…" : "Add redirect"}
    </button>
  );
}

export default function AddRedirectForm() {
  const [state, action] = useFormState<RedirectState, FormData>(addRedirect, {});
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.ok) form.current?.reset();
  }, [state]);

  return (
    <form ref={form} action={action} className="adm-card adm-stack">
      <h2>Add a redirect</h2>
      {state.error && <p className="adm-alert adm-alert-error" role="alert">{state.error}</p>}
      {state.ok && <p className="adm-alert adm-alert-ok" role="status">{state.ok}</p>}
      <div className="adm-cols">
        <label className="adm-field">
          <span>Old address</span>
          <input name="source" placeholder="/old-page/" required />
        </label>
        <label className="adm-field">
          <span>Send visitors to</span>
          <input name="destination" placeholder="/services/ or https://…" required />
        </label>
      </div>
      <label className="adm-check">
        <input type="checkbox" name="permanent" defaultChecked /> Permanent (301/308 — tells Google the page moved for good)
      </label>
      <div>
        <Submit />
      </div>
    </form>
  );
}
