import "server-only";
import { createServerClient } from "@supabase/ssr";
import { createClient as createPlainClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/lib/supabase/env";

/**
 * Client bound to the signed-in admin's session cookies. Use in admin pages
 * and server actions; RLS sees `auth.uid()` and `is_admin()` applies.
 */
export function createSessionClient() {
  const cookieStore = cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component: the middleware refreshes the session.
        }
      },
    },
  });
}

/**
 * Anonymous client for public reads on the website (published content,
 * settings, redirects). No cookies, so pages that use it can stay static.
 */
export function createPublicClient() {
  return createPlainClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Privileged client (bypasses RLS). Server-only, for routes that write on a
 * visitor's behalf — the contact form, newsletter, cron and client portal.
 * Returns null when the secret key is not configured.
 */
export function createServiceClient() {
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!SUPABASE_URL || !secret) return null;
  return createPlainClient(SUPABASE_URL, secret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
