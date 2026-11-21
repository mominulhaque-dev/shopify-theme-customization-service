import "server-only";
import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";

/**
 * Gate for every admin page and server action. Returns the session-bound
 * Supabase client and the admin's email, or redirects to the login page.
 * RLS enforces the same rule in the database, so this is a second lock,
 * not the only one.
 */
export async function requireAdmin() {
  if (!supabaseConfigured()) redirect("/admin/login/");
  const supabase = createSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login/");

  const { data: admin } = await supabase.from("admins").select("email").eq("user_id", user.id).maybeSingle();
  if (!admin) redirect("/admin/login/?error=not-admin");

  return { supabase, user, email: (admin as { email: string }).email || user.email || "" };
}
