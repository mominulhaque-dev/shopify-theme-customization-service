"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ACCEPT_IMAGES, uploadMedia, type MediaRow } from "@/lib/admin/upload";

/** Drag-and-drop / click uploader. Calls onUploaded per file, then refreshes. */
export default function MediaUploader({ onUploaded }: { onUploaded?: (row: MediaRow) => void }) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [done, setDone] = useState(0);

  async function handle(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setErrors([]);
    setDone(0);
    const errs: string[] = [];
    let ok = 0;
    for (const file of Array.from(files)) {
      try {
        const row = await uploadMedia(file);
        ok += 1;
        onUploaded?.(row);
      } catch (e) {
        errs.push(e instanceof Error ? e.message : String(e));
      }
    }
    setErrors(errs);
    setDone(ok);
    setBusy(false);
    if (input.current) input.current.value = "";
    router.refresh();
  }

  return (
    <div>
      <label
        className={`adm-drop${drag ? " is-drag" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          void handle(e.dataTransfer.files);
        }}
      >
        <input
          ref={input}
          type="file"
          accept={ACCEPT_IMAGES}
          multiple
          hidden
          disabled={busy}
          onChange={(e) => void handle(e.target.files)}
        />
        <strong>{busy ? "Uploading…" : "Drop images here or click to choose"}</strong>
        <span className="adm-muted adm-small">You can pick several at once.</span>
      </label>
      {done > 0 && !busy && <p className="adm-alert adm-alert-ok">Uploaded {done} image{done > 1 ? "s" : ""}.</p>}
      {errors.map((e) => (
        <p key={e} className="adm-alert adm-alert-error">
          {e}
        </p>
      ))}
    </div>
  );
}
