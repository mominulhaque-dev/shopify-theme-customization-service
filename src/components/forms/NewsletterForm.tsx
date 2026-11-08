"use client";

import { useState, type FormEvent } from "react";

/** Newsletter sign-up: email + explicit consent, posts to /api/subscribe. */
export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(data.get("email") || ""),
          consent: data.get("consent") === "on",
          sourcePage: window.location.pathname,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Something went wrong.");
      setStatus("done");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    return (
      <p className="news-done" role="status">
        You are signed up. New guides will arrive in your inbox, and every email has an unsubscribe link.
      </p>
    );
  }

  return (
    <form className="news-form" onSubmit={onSubmit} noValidate>
      <label htmlFor="news-email" className="sr-only">
        Email address
      </label>
      <div className="news-row">
        <input id="news-email" name="email" type="email" required autoComplete="email" placeholder="you@yourstore.com" />
        <button type="submit" className="btn" disabled={status === "sending"}>
          {status === "sending" ? "Signing up…" : "Subscribe"}
        </button>
      </div>
      <label className="news-consent">
        <input type="checkbox" name="consent" required /> Email me new Shopify guides. Unsubscribe any time.
      </label>
      {status === "error" && (
        <p className="news-error" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
