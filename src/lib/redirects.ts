/**
 * Shared by the middleware (edge) and the admin. No Node-only imports.
 *
 * Paths are stored normalised: leading slash, trailing slash, no query or
 * hash, lowercase. The site uses trailing slashes everywhere, so "/old" and
 * "/old/" are the same page.
 */
export function normalisePath(input: string): string | null {
  let s = input.trim();
  if (!s) return null;
  try {
    // Accept a full URL pasted from the browser bar and keep just the path.
    if (/^https?:\/\//i.test(s)) s = new URL(s).pathname;
  } catch {
    return null;
  }
  s = s.split(/[?#]/)[0] ?? "";
  if (!s.startsWith("/")) s = `/${s}`;
  s = s.replace(/\/{2,}/g, "/");
  if (!s.endsWith("/") && !/\.[a-z0-9]{2,5}$/i.test(s)) s = `${s}/`;
  try {
    s = decodeURI(s);
  } catch {
    /* keep as typed */
  }
  return s.toLowerCase();
}

/** Destination: a site path (normalised) or an absolute http(s) URL. */
export function normaliseDestination(input: string): string | null {
  const s = input.trim();
  if (/^https?:\/\//i.test(s)) {
    try {
      return new URL(s).toString();
    } catch {
      return null;
    }
  }
  const [path, rest = ""] = s.split(/(?=[?#])/);
  const p = normalisePath(path ?? "");
  return p ? p + rest : null;
}

export interface RedirectRule {
  source: string;
  destination: string;
  permanent: boolean;
}
