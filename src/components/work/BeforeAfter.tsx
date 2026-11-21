"use client";

/* eslint-disable @next/next/no-img-element -- uploaded screenshots of unknown size */
import { useState } from "react";

/** Drag (or use the arrow keys) to compare the before and after screenshots. */
export default function BeforeAfter({ before, after, label }: { before: string; after: string; label: string }) {
  const [pos, setPos] = useState(50);
  return (
    <figure className="ba">
      <div className="ba-frame" style={{ ["--ba" as string]: `${pos}%` }}>
        <img src={after} alt={`${label}: after`} className="ba-img" loading="lazy" />
        <img src={before} alt={`${label}: before`} className="ba-img ba-before" loading="lazy" />
        <span className="ba-line" aria-hidden="true">
          <span className="ba-knob">⇆</span>
        </span>
        <span className="ba-tag ba-tag-before" aria-hidden="true">
          Before
        </span>
        <span className="ba-tag ba-tag-after" aria-hidden="true">
          After
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Slide to compare before and after"
          className="ba-range"
        />
      </div>
    </figure>
  );
}
