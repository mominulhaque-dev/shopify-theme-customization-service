"use client";

import { useState } from "react";

type Item = { label: string; before: string; after: string };

/** Result rows (metric, before, after), posted as JSON in a hidden input. */
export default function ResultsEditor({ name, defaultValue }: { name: string; defaultValue: Item[] }) {
  const [items, setItems] = useState<Item[]>(defaultValue);
  const update = (i: number, patch: Partial<Item>) => setItems((all) => all.map((it, j) => (j === i ? { ...it, ...patch } : it)));

  return (
    <div className="adm-stack">
      <input type="hidden" name={name} value={JSON.stringify(items.filter((i) => i.label.trim()))} />
      {items.map((item, i) => (
        <div className="adm-repeat adm-repeat-row" key={i}>
          <label className="adm-field">
            <span>What changed</span>
            <input value={item.label} onChange={(e) => update(i, { label: e.target.value })} placeholder="Mobile page load" />
          </label>
          <label className="adm-field">
            <span>Before</span>
            <input value={item.before} onChange={(e) => update(i, { before: e.target.value })} placeholder="5.8 s" />
          </label>
          <label className="adm-field">
            <span>After</span>
            <input value={item.after} onChange={(e) => update(i, { after: e.target.value })} placeholder="2.1 s" />
          </label>
          <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => setItems((all) => all.filter((_, j) => j !== i))} aria-label={`Remove result ${i + 1}`}>
            ✕
          </button>
        </div>
      ))}
      <div>
        <button type="button" className="adm-btn adm-btn-sm" onClick={() => setItems((all) => [...all, { label: "", before: "", after: "" }])}>
          + Add result
        </button>
      </div>
    </div>
  );
}
