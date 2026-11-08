"use client";

import { useState } from "react";

type Item = { q: string; a: string };

/** Repeatable question/answer rows, posted as JSON in a hidden input. */
export default function FaqEditor({ name, defaultValue }: { name: string; defaultValue: Item[] }) {
  const [items, setItems] = useState<Item[]>(defaultValue);
  const update = (i: number, patch: Partial<Item>) => setItems((all) => all.map((it, j) => (j === i ? { ...it, ...patch } : it)));

  return (
    <div className="adm-stack">
      <input type="hidden" name={name} value={JSON.stringify(items.filter((i) => i.q.trim() && i.a.trim()))} />
      {items.map((item, i) => (
        <div className="adm-repeat" key={i}>
          <label className="adm-field">
            <span>Question {i + 1}</span>
            <input value={item.q} onChange={(e) => update(i, { q: e.target.value })} />
          </label>
          <label className="adm-field">
            <span>Answer</span>
            <textarea rows={3} value={item.a} onChange={(e) => update(i, { a: e.target.value })} />
          </label>
          <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => setItems((all) => all.filter((_, j) => j !== i))}>
            Remove question
          </button>
        </div>
      ))}
      <div>
        <button type="button" className="adm-btn adm-btn-sm" onClick={() => setItems((all) => [...all, { q: "", a: "" }])}>
          + Add question
        </button>
      </div>
    </div>
  );
}
