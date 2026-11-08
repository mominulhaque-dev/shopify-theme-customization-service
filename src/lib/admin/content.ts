import "server-only";
import { VISUALS } from "@/components/ui/visuals";

/** Built-in illustrations an editor can pick when there is no cover image. */
export const VISUAL_OPTIONS = Object.keys(VISUALS).filter((k) => k.startsWith("ill-") || k.startsWith("image-"));

export const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export function toSlug(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export const str = (fd: FormData, key: string, max = 1000) => String(fd.get(key) ?? "").trim().slice(0, max);

export function httpsOrNull(v: string): string | null {
  if (!v) return null;
  try {
    const u = new URL(v);
    return u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
}

export function parseJsonArray<T>(raw: string): T[] {
  try {
    const v: unknown = JSON.parse(raw || "[]");
    return Array.isArray(v) ? (v as T[]) : [];
  } catch {
    return [];
  }
}

/** yyyy-mm-dd from a date input → ISO timestamp at 09:00 Dhaka, else null. */
export function dateToIso(v: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return null;
  return new Date(`${v}T03:00:00Z`).toISOString();
}
