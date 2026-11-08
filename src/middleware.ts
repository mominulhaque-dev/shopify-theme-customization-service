import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, supabaseConfigured } from "@/lib/supabase/env";
import { normalisePath, type RedirectRule } from "@/lib/redirects";

/**
 * Two jobs:
 *  1. Public pages: apply redirects managed in /admin/redirects.
 *  2. /admin: refresh the Supabase session and send anyone not signed in to
 *     the login page. Whether a signed-in user is an admin is checked again in
 *     the admin layout (and enforced by RLS), so a session alone never reaches
 *     admin data.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin")) return adminGate(request);
  return applyRedirect(request);
}

/* ------------------------------------------------------------ redirects --- */

// Per-instance cache: one small query per minute at most, not one per visit.
const TTL_MS = 60_000;
let cache: { at: number; rules: Map<string, RedirectRule> } | null = null;
let inflight: Promise<Map<string, RedirectRule>> | null = null;

async function loadRules(): Promise<Map<string, RedirectRule>> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.rules;
  if (inflight) return inflight;
  inflight = (async () => {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/redirects?select=source,destination,permanent&active=eq.true&limit=5000`,
        {
          headers: { apikey: SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}` },
          signal: AbortSignal.timeout(2500),
        },
      );
      if (!res.ok) throw new Error(`redirects ${res.status}`);
      const rows = (await res.json()) as RedirectRule[];
      const rules = new Map(rows.map((r) => [r.source, r]));
      cache = { at: Date.now(), rules };
      return rules;
    } catch {
      // Keep serving the last good copy; never block a page on this.
      const rules = cache?.rules ?? new Map<string, RedirectRule>();
      cache = { at: Date.now(), rules };
      return rules;
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}

async function applyRedirect(request: NextRequest) {
  if (!supabaseConfigured()) return NextResponse.next();
  const path = normalisePath(request.nextUrl.pathname);
  if (!path) return NextResponse.next();
  const rule = (await loadRules()).get(path);
  if (!rule || rule.destination === path) return NextResponse.next();

  const target = new URL(rule.destination, request.url);
  // Carry tracking parameters over unless the destination sets its own.
  if (!target.search && request.nextUrl.search) target.search = request.nextUrl.search;
  return NextResponse.redirect(target, rule.permanent ? 308 : 307);
}

/* ---------------------------------------------------------------- admin --- */

async function adminGate(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname.startsWith("/admin/login");

  if (!supabaseConfigured()) {
    if (isLogin) return NextResponse.next();
    return NextResponse.redirect(new URL("/admin/login/", request.url));
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  // Must be called right after creating the client: it refreshes the token.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isLogin) {
    const url = new URL("/admin/login/", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  if (user && isLogin) {
    return NextResponse.redirect(new URL("/admin/", request.url));
  }

  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: [
    // Everything except Next internals, API routes and files with an extension
    // (images, icons, sitemap.xml, robots.txt, video…).
    "/((?!_next/|api/|.*\\.[a-zA-Z0-9]{2,5}$).*)",
  ],
};
