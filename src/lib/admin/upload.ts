"use client";

import { createBrowserSupabase } from "@/lib/supabase/browser";

export const MEDIA_BUCKET = "media";
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
export const ACCEPT_IMAGES = "image/png,image/jpeg,image/webp,image/gif,image/avif";

export interface MediaRow {
  id: string;
  path: string;
  url: string;
  alt: string;
  mime: string | null;
  size: number | null;
  width: number | null;
  height: number | null;
  created_at: string;
}

function safeName(name: string): string {
  const dot = name.lastIndexOf(".");
  const base = (dot > 0 ? name.slice(0, dot) : name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "image";
  const ext = dot > 0 ? name.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, "") : "png";
  return `${base}.${ext}`;
}

function imageSize(file: File): Promise<{ width: number; height: number } | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      resolve(null);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}

/** Uploads one image to the media bucket and records it in the media table. */
export async function uploadMedia(file: File): Promise<MediaRow> {
  if (!ACCEPT_IMAGES.split(",").includes(file.type)) throw new Error(`${file.name}: only PNG, JPG, WebP, GIF or AVIF.`);
  if (file.size > MAX_UPLOAD_BYTES) throw new Error(`${file.name}: larger than 5 MB.`);

  const supabase = createBrowserSupabase();
  const now = new Date();
  const path = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${crypto
    .randomUUID()
    .slice(0, 8)}-${safeName(file.name)}`;

  const { error: upErr } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, file, { contentType: file.type, cacheControl: "31536000", upsert: false });
  if (upErr) throw new Error(`${file.name}: ${upErr.message}`);

  const url = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
  const dims = await imageSize(file);
  const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();

  const { data, error } = await supabase
    .from("media")
    .insert({ path, url, alt, mime: file.type, size: file.size, width: dims?.width ?? null, height: dims?.height ?? null })
    .select("*")
    .single();
  if (error) {
    await supabase.storage.from(MEDIA_BUCKET).remove([path]);
    throw new Error(`${file.name}: ${error.message}`);
  }
  return data as MediaRow;
}

export async function listMedia(limit = 200): Promise<MediaRow[]> {
  const supabase = createBrowserSupabase();
  const { data } = await supabase.from("media").select("*").order("created_at", { ascending: false }).limit(limit);
  return (data as MediaRow[] | null) ?? [];
}

export function formatBytes(n: number | null): string {
  if (!n) return "";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${Math.round(n / 1024)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}
