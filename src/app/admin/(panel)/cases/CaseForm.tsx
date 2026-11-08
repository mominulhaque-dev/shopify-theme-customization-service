"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import CountedField from "@/components/admin/CountedField";
import MediaPicker from "@/components/admin/MediaPicker";
import ResultsEditor from "@/components/admin/ResultsEditor";
import RichEditor from "@/components/admin/RichEditor";
import { saveCase, type CaseSaveState } from "./actions";

export interface CaseFormValues {
  title: string;
  slug: string;
  client: string;
  industry: string;
  theme: string;
  summary: string;
  problem_html: string;
  solution_html: string;
  results: Array<{ label: string; before: string; after: string }>;
  before_url: string | null;
  after_url: string | null;
  cover_url: string | null;
  visual: string | null;
  testimonial_quote: string;
  testimonial_name: string;
  meta_title: string;
  description: string;
  sort_order: number;
  status: string;
}

function Save({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="adm-btn adm-btn-primary adm-btn-block" disabled={pending}>
      {pending ? "Saving…" : label}
    </button>
  );
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

export default function CaseForm({ id, values, visuals, justSaved }: { id: string | null; values: CaseFormValues; visuals: string[]; justSaved?: boolean }) {
  const [state, action] = useFormState<CaseSaveState, FormData>(saveCase.bind(null, id), {});
  const [title, setTitle] = useState(values.title);
  const [slug, setSlug] = useState(values.slug);
  const [slugTouched, setSlugTouched] = useState(Boolean(values.slug));
  const shownSlug = slugTouched ? slug : slugify(title);

  return (
    <form action={action} className="adm-form-grid">
      <div className="adm-stack">
        {state.error && <p className="adm-alert adm-alert-error" role="alert">{state.error}</p>}
        {(state.ok || justSaved) && !state.error && <p className="adm-alert adm-alert-ok" role="status">Saved.</p>}

        <section className="adm-card adm-stack">
          <label className="adm-field">
            <span>Title</span>
            <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Apparel store: product page rebuilt for mobile" />
          </label>
          <label className="adm-field">
            <span>URL slug</span>
            <input
              name="slug"
              value={shownSlug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
            />
            <small className="adm-muted adm-small">/work/{shownSlug || "…"}/</small>
          </label>
          <div className="adm-cols">
            <label className="adm-field">
              <span>Client (optional — only with permission)</span>
              <input name="client" defaultValue={values.client} />
            </label>
            <label className="adm-field">
              <span>Industry</span>
              <input name="industry" defaultValue={values.industry} placeholder="Apparel" />
            </label>
            <label className="adm-field">
              <span>Theme</span>
              <input name="theme" defaultValue={values.theme} placeholder="Dawn" />
            </label>
          </div>
          <label className="adm-field">
            <span>Short summary (cards and intro)</span>
            <textarea name="summary" rows={3} defaultValue={values.summary} />
          </label>
        </section>

        <section className="adm-card adm-stack">
          <h2>Before and after</h2>
          <p className="adm-muted adm-small">Two screenshots of the same page at the same size. Visitors drag a slider to compare.</p>
          <div className="adm-cols">
            <MediaPicker name="before_url" label="Before screenshot" defaultValue={values.before_url} />
            <MediaPicker name="after_url" label="After screenshot" defaultValue={values.after_url} />
          </div>
        </section>

        <section className="adm-card adm-stack">
          <h2>Results</h2>
          <ResultsEditor name="results" defaultValue={values.results} />
        </section>

        <section className="adm-card adm-stack">
          <h2>The problem</h2>
          <RichEditor name="problem_html" defaultValue={values.problem_html} placeholder="What the store owner asked for and what was in the way…" />
        </section>

        <section className="adm-card adm-stack">
          <h2>What we did</h2>
          <RichEditor name="solution_html" defaultValue={values.solution_html} placeholder="What changed, and why…" />
        </section>

        <section className="adm-card adm-stack">
          <h2>Client quote (optional)</h2>
          <label className="adm-field">
            <span>Quote</span>
            <textarea name="testimonial_quote" rows={3} defaultValue={values.testimonial_quote} />
          </label>
          <label className="adm-field">
            <span>Name / role</span>
            <input name="testimonial_name" defaultValue={values.testimonial_name} placeholder="Founder, apparel brand" />
          </label>
        </section>

        <section className="adm-card adm-stack">
          <h2>Search engines</h2>
          <CountedField name="meta_title" label="SEO title" defaultValue={values.meta_title} max={60} hint="Leave empty to use the title." />
          <CountedField name="description" label="Meta description" defaultValue={values.description} max={155} multiline hint="Leave empty to use the summary." />
        </section>
      </div>

      <aside className="adm-stack adm-sticky">
        <section className="adm-card adm-stack">
          <label className="adm-field">
            <span>Status</span>
            <select name="status" defaultValue={values.status}>
              <option value="draft">Draft (hidden)</option>
              <option value="published">Published</option>
            </select>
          </label>
          <label className="adm-field">
            <span>Order on the Work page</span>
            <input type="number" name="sort_order" defaultValue={values.sort_order} />
            <small className="adm-muted adm-small">Lower numbers show first.</small>
          </label>
          <Save label={id ? "Save changes" : "Create case study"} />
        </section>
        <section className="adm-card adm-stack">
          <MediaPicker name="cover_url" label="Cover image (optional)" defaultValue={values.cover_url} hint="If empty, the After screenshot is used." />
          <label className="adm-field">
            <span>Illustration (when there are no images)</span>
            <select name="visual" defaultValue={values.visual ?? ""}>
              <option value="">Default</option>
              {visuals.map((v) => (
                <option key={v} value={v}>
                  {v.replace(/^(ill|image)-/, "").replace(/-/g, " ")}
                </option>
              ))}
            </select>
          </label>
        </section>
      </aside>
    </form>
  );
}
