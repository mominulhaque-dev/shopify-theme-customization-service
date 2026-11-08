"use client";

import { useState } from "react";

/** Text field with a live character counter (for SEO titles/descriptions). */
export default function CountedField({
  name,
  label,
  defaultValue,
  max,
  multiline = false,
  hint,
  required,
}: {
  name: string;
  label: string;
  defaultValue: string;
  max: number;
  multiline?: boolean;
  hint?: string;
  required?: boolean;
}) {
  const [v, setV] = useState(defaultValue);
  return (
    <label className="adm-field">
      <span>
        {label}{" "}
        <span className={`adm-count${v.length > max ? " is-over" : ""}`}>
          {v.length}/{max}
        </span>
      </span>
      {multiline ? (
        <textarea name={name} rows={3} value={v} onChange={(e) => setV(e.target.value)} required={required} />
      ) : (
        <input name={name} value={v} onChange={(e) => setV(e.target.value)} required={required} />
      )}
      {hint && <small className="adm-muted adm-small">{hint}</small>}
    </label>
  );
}
