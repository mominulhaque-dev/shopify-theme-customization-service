"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import CountedField from "@/components/admin/CountedField";
import FaqEditor from "@/components/admin/FaqEditor";
import MediaPicker from "@/components/admin/MediaPicker";
import RichEditor from "@/components/admin/RichEditor";
import { savePost, type PostSaveState } from "./actions";

export interface PostFormValues {
  title: string;
  slug: string;
  meta_title: string;
  description: string;
  keyword: string;
  category: string;
  excerpt: string;
  cover_url: string | null;
  visual: string | null;
  takeaways: string[];
  body_html: string;
  faq: Array<{ q: string; a: string }>;
  read_minutes: number | null;
  status: string;
  published_at: string | null;
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

export default function PostForm({
  id,
  values,
  visuals,
  categories,
  justSaved,
}: {
  id: string | null;
  values: PostFormValues;
  visuals: string[];
  categories: string[];
  justSaved?: boolean;
}) {
  const [state, action] = useFormState<PostSaveState, FormData>(savePost.bind(null, id), {});
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
            <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
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
            <small className="adm-muted adm-small">/blog/{shownSlug || "…"}/ — changing it on a published post breaks old links (add a redirect).</small>
          </label>
          <label className="adm-field">
            <span>Intro (shown under the title and on the blog list)</span>
            <textarea name="excerpt" rows={3} defaultValue={values.excerpt} />
          </label>
          <label className="adm-field">
            <span>Key points (one per line, optional)</span>
            <textarea name="takeaways" rows={4} defaultValue={values.takeaways.join("\n")} />
          </label>
        </section>

        <section className="adm-card adm-stack">
          <h2>Article</h2>
          <p className="adm-muted adm-small">
            Use H2 for main sections — they become the &ldquo;In this article&rdquo; list. Callout makes a dark highlight box. For links to
            your own pages write the path, e.g. <code>/pricing/</code>.
          </p>
          <RichEditor name="body_html" defaultValue={values.body_html} />
        </section>

        <section className="adm-card adm-stack">
          <h2>FAQ</h2>
          <p className="adm-muted adm-small">Shown at the end of the post and sent to Google as FAQ data. Links: [text](/path/).</p>
          <FaqEditor name="faq" defaultValue={values.faq} />
        </section>

        <section className="adm-card adm-stack">
          <h2>Search engines</h2>
          <CountedField name="meta_title" label="SEO title" defaultValue={values.meta_title} max={60} hint="Leave empty to use the title." />
          <CountedField name="description" label="Meta description" defaultValue={values.description} max={155} multiline />
          <label className="adm-field">
            <span>Target keyword</span>
            <input name="keyword" defaultValue={values.keyword} />
          </label>
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
            <span>Publish date</span>
            <input type="date" name="published_on" defaultValue={values.published_at?.slice(0, 10) ?? ""} />
            <small className="adm-muted adm-small">Empty = today when published. A future date schedules it.</small>
          </label>
          <Save label={id ? "Save changes" : "Create post"} />
        </section>

        <section className="adm-card adm-stack">
          <label className="adm-field">
            <span>Category</span>
            <input name="category" defaultValue={values.category} list="post-categories" />
            <datalist id="post-categories">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </label>
          <MediaPicker name="cover_url" label="Cover image" defaultValue={values.cover_url} hint="Wide image, about 1600×1000." />
          <label className="adm-field">
            <span>Illustration (used when there is no cover)</span>
            <select name="visual" defaultValue={values.visual ?? ""}>
              <option value="">Default</option>
              {visuals.map((v) => (
                <option key={v} value={v}>
                  {v.replace(/^(ill|image)-/, "").replace(/-/g, " ")}
                </option>
              ))}
            </select>
          </label>
          <label className="adm-field">
            <span>Read time (minutes)</span>
            <input type="number" min={1} max={60} name="read_minutes" defaultValue={values.read_minutes ?? ""} placeholder="Auto" />
          </label>
        </section>
      </aside>
    </form>
  );
}
