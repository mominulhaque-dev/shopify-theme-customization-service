"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import type { ProjectState } from "./actions";

function SendBtn() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="adm-btn adm-btn-sm" disabled={pending}>
      {pending ? "Sending…" : "Email link to client"}
    </button>
  );
}

export default function PortalLink({ url, emailAction }: { url: string; emailAction: (prev: ProjectState) => Promise<ProjectState> }) {
  const [copied, setCopied] = useState(false);
  const [state, action] = useFormState<ProjectState>(emailAction, {});
  return (
    <div className="adm-stack">
      <div className="adm-copy">
        <input readOnly value={url} aria-label="Client page link" onFocus={(e) => e.currentTarget.select()} />
        <button
          type="button"
          className="adm-btn adm-btn-sm"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(url);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            } catch {
              window.prompt("Copy this link", url);
            }
          }}
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <div className="adm-actions">
        <a href={url} target="_blank" rel="noopener noreferrer" className="adm-btn adm-btn-ghost adm-btn-sm">
          Open client page ↗
        </a>
        <form action={action}>
          <SendBtn />
        </form>
      </div>
      {state.error && <p className="adm-alert adm-alert-error">{state.error}</p>}
      {state.ok && <p className="adm-alert adm-alert-ok">{state.ok}</p>}
    </div>
  );
}
