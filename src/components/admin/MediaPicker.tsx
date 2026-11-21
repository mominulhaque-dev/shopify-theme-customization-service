"use client";

/* eslint-disable @next/next/no-img-element -- admin previews of arbitrary uploads */
import { useCallback, useState } from "react";
import MediaLibraryDialog from "./MediaLibraryDialog";

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
  const close = useCallback(() => setOpen(false), []);

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
        <MediaLibraryDialog
          onClose={close}
          onPick={(row) => {
            setValue(row.url);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}
