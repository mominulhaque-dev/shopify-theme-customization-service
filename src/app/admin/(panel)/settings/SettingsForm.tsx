"use client";

import { useFormState, useFormStatus } from "react-dom";
import type { SiteSettings } from "@/lib/settings";
import { saveSettings, type SaveState } from "./actions";

function Save() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="adm-btn adm-btn-primary" disabled={pending}>
      {pending ? "Saving…" : "Save changes"}
    </button>
  );
}

export default function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, action] = useFormState<SaveState, FormData>(saveSettings, {});
  return (
    <form action={action} className="adm-stack">
      {state.error && <p className="adm-alert adm-alert-error" role="alert">{state.error}</p>}
      {state.ok && <p className="adm-alert adm-alert-ok" role="status">Saved. The website is updated.</p>}

      <section className="adm-card adm-stack">
        <h2>Prices and delivery times</h2>
        <p className="adm-muted adm-small">
          Shown on the homepage pricing section, the Pricing page and service pages. Package names are fixed.
          Prices also mentioned inside written text (blog posts, FAQ answers) are not changed here.
        </p>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Package</th>
                <th>Price</th>
                <th>Delivery time</th>
              </tr>
            </thead>
            <tbody>
              {settings.tiers.map((tier, i) => (
                <tr key={tier.name}>
                  <td>{tier.name}</td>
                  <td>
                    <input name={`price_${i}`} defaultValue={tier.price} aria-label={`${tier.name} price`} required />
                  </td>
                  <td>
                    <input name={`time_${i}`} defaultValue={tier.time} aria-label={`${tier.name} delivery time`} required />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="adm-card adm-stack">
        <h2>Contact details</h2>
        <p className="adm-muted adm-small">Shown in the footer, the mobile menu and the Hire page.</p>
        <div className="adm-cols">
          <label className="adm-field">
            <span>Email</span>
            <input name="email" type="email" defaultValue={settings.email} required />
          </label>
          <label className="adm-field">
            <span>Phone (as shown)</span>
            <input name="phoneDisplay" defaultValue={settings.phoneDisplay} required />
          </label>
          <label className="adm-field">
            <span>Phone (international, for tap-to-call)</span>
            <input name="phoneE164" defaultValue={settings.phoneE164} placeholder="+8801580424024" required />
          </label>
          <label className="adm-field">
            <span>WhatsApp link</span>
            <input name="whatsappUrl" type="url" defaultValue={settings.whatsappUrl} placeholder="https://wa.me/8801580424024" required />
          </label>
        </div>
      </section>

      <div>
        <Save />
      </div>
    </form>
  );
}
