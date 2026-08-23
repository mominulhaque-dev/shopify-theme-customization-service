"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
        <p>We reply with a scoped quote within two business days.</p>
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
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="form-row">
        <label htmlFor="storeUrl">Store URL</label>
        <input id="storeUrl" name="storeUrl" type="text" required placeholder="yourstore.myshopify.com" />
      </div>
      <div className="form-row">
        <label htmlFor="message">What do you want changed?</label>
        <textarea id="message" name="message" rows={5} required />
      </div>

      {status === "error" && (
        <p className="form-error" role="alert">
          {errorMessage}
        </p>
      )}

      <button type="submit" className="btn btn-lg" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Get a scoped quote"}
      </button>
    </form>
  );
}
