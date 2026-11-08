"use client";

/* eslint-disable @next/next/no-img-element -- admin previews of arbitrary uploads */
import { useEffect, useState } from "react";
import { listMedia, type MediaRow } from "@/lib/admin/upload";
import MediaUploader from "./MediaUploader";

/** Modal that lists the media library (with upload) and returns the chosen image. */
export default function MediaLibraryDialog({ onPick, onClose }: { onPick: (row: MediaRow) => void; onClose: () => void }) {
  const [items, setItems] = useState<MediaRow[] | null>(null);

  useEffect(() => {
    let alive = true;
    void listMedia().then((rows) => alive && setItems(rows));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      alive = false;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="adm-modal" role="dialog" aria-modal="true" aria-label="Choose an image" onClick={onClose}>
      <div className="adm-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="adm-modal-head">
          <h2>Choose an image</h2>
          <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={onClose}>
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
              <button key={m.id} type="button" className="adm-media-pick" onClick={() => onPick(m)} title={m.alt}>
                <img src={m.url} alt={m.alt} loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
