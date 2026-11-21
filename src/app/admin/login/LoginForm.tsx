"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signIn, type LoginState } from "./actions";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="adm-btn adm-btn-primary adm-btn-block" disabled={pending}>
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export default function LoginForm({ next, notice }: { next: string; notice?: string }) {
  const [state, action] = useFormState<LoginState, FormData>(signIn, {});
  return (
    <form action={action} className="adm-stack">
      <input type="hidden" name="next" value={next} />
      {(state.error || notice) && (
        <p className="adm-alert adm-alert-error" role="alert">
          {state.error || notice}
        </p>
      )}
      <label className="adm-field">
        <span>Email</span>
        <input name="email" type="email" autoComplete="username" required />
      </label>
      <label className="adm-field">
        <span>Password</span>
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      <Submit />
    </form>
  );
}
