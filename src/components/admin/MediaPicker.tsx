"use client";

/* eslint-disable @next/next/no-img-element -- admin previews of arbitrary uploads */
import { useEffect, useState } from "react";
import { listMedia, type MediaRow } from "@/lib/admin/upload";
import MediaUploader from "./MediaUploader";

/**
 * Image URL field with a "Choose from library" dialog. The value is posted
 * with the surrounding form under `name`, so server actions just read a URL.
 */
export default function MediaPicker({
  name,
  label,
  defaultValue = "",
  hint,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  hint?: string;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<MediaRow[] | null>(null);

  useEffect(() => {
    if (!open) return;
    let alive = true;
    void listMedia().then((rows) => alive && setItems(rows));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      alive = false;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (url: string) => {
    setValue(url);
    setOpen(false);
  };

  return (
    <div className="adm-field">
      <label htmlFor={`mp-${name}`}>{label}</label>
      <div className="adm-picker">
        {value ? <img src={value} alt="" className="adm-picker-preview" /> : <span className="adm-picker-preview is-empty">No image</span>}
        <div className="adm-picker-controls">
          <input id={`mp-${name}`} name={name} value={value} onChange={(e) => setValue(e.target.value)} placeholder="https://…" />
          <div className="adm-actions">
            <button type="button" className="adm-btn adm-btn-sm" onClick={() => setOpen(true)}>
              Choose from library
            </button>
            {value && (
              <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => setValue("")}>
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
      {hint && <small className="adm-muted adm-small">{hint}</small>}

      {open && (
        <div className="adm-modal" role="dialog" aria-modal="true" aria-label="Choose an image" onClick={() => setOpen(false)}>
          <div className="adm-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-head">
              <h2>Choose an image</h2>
              <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
            <MediaUploader onUploaded={(row) => setItems((prev) => [row, ...(prev ?? [])])} />
            {items === null ? (
              <p className="adm-muted">Loading…</p>
            ) : items.length === 0 ? (
              <p className="adm-empty">No images yet — upload one above.</p>
            ) : (
              <div className="adm-media-grid adm-media-grid-sm">
                {items.map((m) => (
                  <button key={m.id} type="button" className="adm-media-pick" onClick={() => pick(m.url)} title={m.alt}>
                    <img src={m.url} alt={m.alt} loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
