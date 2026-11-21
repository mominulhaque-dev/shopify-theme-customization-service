"use client";

import { useRef, useState, type FormEvent } from "react";
import { BUDGET_OPTIONS, SERVICE_OPTIONS } from "@/data/lead-options";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Contact form. Four states, all visible to the user: idle, submitting, success
 * and error. The endpoint fails loudly when email is not configured rather than
 * pretending to send (see src/app/api/contact/route.ts), and this component
 * surfaces that message verbatim instead of showing a false success.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  // When the form appeared; submissions faster than a human could type are dropped server-side.
  const shownAt = useRef(Date.now());

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      storeUrl: String(data.get("storeUrl") || ""),
      message: String(data.get("message") || ""),
      service: String(data.get("service") || ""),
      budget: String(data.get("budget") || ""),
      website: String(data.get("website") || ""), // honeypot: real visitors never see this field
      elapsedMs: Date.now() - shownAt.current,
      sourcePage: window.location.pathname,
      referrer: document.referrer.slice(0, 500),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <h3>Request sent.</h3>
        <p>
          We reply with a scoped quote — a fixed price, a delivery date and what is in and out of
          scope — within two business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label htmlFor="name">Your name</label>
        <input id="name" name="name" type="text" required autoComplete="name" />
      </div>
      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" inputMode="email" />
      </div>
      <div className="form-row">
        <label htmlFor="storeUrl">Store URL</label>
        <input
          id="storeUrl"
          name="storeUrl"
          type="text"
          required
          inputMode="url"
          placeholder="yourstore.myshopify.com"
          aria-describedby="storeUrl-hint"
        />
        <span className="hint" id="storeUrl-hint">
          A password-protected store is fine — send the password too if you have one.
        </span>
      </div>
      <div className="form-row form-row-split">
        <div>
          <label htmlFor="service">What do you need?</label>
          <select id="service" name="service" defaultValue="">
            <option value="" disabled>
              Choose a service
            </option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget">Budget</label>
          <select id="budget" name="budget" defaultValue="">
            <option value="" disabled>
              Choose a range
            </option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="message">What do you want changed?</label>
        <textarea id="message" name="message" rows={6} required aria-describedby="message-hint" />
        <span className="hint" id="message-hint">
          A list is ideal. Include your theme name and any date you are working toward.
        </span>
      </div>

      {/* Honeypot. Hidden from people and screen readers; bots fill it in. */}
      <div className="form-hp" aria-hidden="true">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p className="form-error" role="alert">
          {errorMessage}
        </p>
      )}

      <div className="form-foot">
        <button type="submit" className="btn btn-lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Get a scoped quote"}
        </button>
        <span className="form-note">Reply within two business days.</span>
      </div>
    </form>
  );
}
