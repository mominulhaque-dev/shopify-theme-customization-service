import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, supabaseConfigured } from "@/lib/supabase/env";

/**
 * Runs only on /admin. Refreshes the Supabase session cookie and sends anyone
 * who is not signed in to the login page. Whether a signed-in user is actually
 * an admin is checked again in the admin layout (and enforced by RLS), so a
 * valid session alone never reaches admin data.
 */
export async function middleware(request: NextRequest) {
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
  matcher: ["/admin/:path*"],
};
