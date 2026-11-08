"use server";

import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";

export type LoginState = { error?: string };

export async function signIn(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!supabaseConfigured()) return { error: "Supabase is not configured on this deployment." };

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/admin/");
  if (!email || !password) return { error: "Enter your email and password." };

  const supabase = createSessionClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Wrong email or password." };

  // Only allow internal admin paths as a post-login destination.
  redirect(next.startsWith("/admin/") ? next : "/admin/");
}

export async function signOut() {
  const supabase = createSessionClient();
  await supabase.auth.signOut();
  redirect("/admin/login/");
}
