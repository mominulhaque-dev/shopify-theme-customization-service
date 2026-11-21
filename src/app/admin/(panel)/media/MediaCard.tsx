"use client";

/* eslint-disable @next/next/no-img-element -- admin thumbnails of arbitrary uploads */
import { useState } from "react";
import ConfirmButton from "@/components/admin/ConfirmButton";
import { formatBytes, type MediaRow } from "@/lib/admin/upload";
import { deleteMedia, updateAlt } from "./actions";

export default function MediaCard({ item }: { item: MediaRow }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(item.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      window.prompt("Copy this URL", item.url);
    }
  };

  return (
    <figure className="adm-media-card">
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="adm-media-thumb">
        <img src={item.url} alt={item.alt} loading="lazy" />
      </a>
      <figcaption>
        <span className="adm-muted adm-small">
          {[item.width && item.height ? `${item.width}×${item.height}` : "", formatBytes(item.size)].filter(Boolean).join(" · ")}
        </span>
        <form action={updateAlt.bind(null, item.id)} className="adm-media-alt">
          <input name="alt" defaultValue={item.alt} aria-label="Alt text" placeholder="Alt text (describe the image)" />
          <button type="submit" className="adm-btn adm-btn-ghost adm-btn-sm">
            Save
          </button>
        </form>
        <div className="adm-actions">
          <button type="button" className="adm-btn adm-btn-sm" onClick={copy}>
            {copied ? "Copied ✓" : "Copy URL"}
          </button>
          <form action={deleteMedia.bind(null, item.id)}>
            <ConfirmButton message="Delete this image? Posts that use it will show a broken image." className="adm-btn adm-btn-danger adm-btn-sm">
              Delete
            </ConfirmButton>
          </form>
        </div>
      </figcaption>
    </figure>
  );
}
