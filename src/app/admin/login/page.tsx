import Image from "next/image";
import { supabaseConfigured } from "@/lib/supabase/env";
import LoginForm from "./LoginForm";

export default function LoginPage({ searchParams }: { searchParams: { next?: string; error?: string } }) {
  const configured = supabaseConfigured();
  const notice =
    searchParams.error === "not-admin" ? "This account is signed in but is not an admin." : undefined;

  return (
    <div className="adm-login">
      <div className="adm-card adm-login-card">
        <div className="adm-brand">
          <Image src="/icon.svg" alt="" width={36} height={36} unoptimized />
          <div>
            <strong>Admin</strong>
            <span>Shopify Theme Customization Services</span>
          </div>
        </div>
        {configured ? (
          <LoginForm next={searchParams.next || "/admin/"} notice={notice} />
        ) : (
          <p className="adm-alert adm-alert-error">
            Supabase is not configured. Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> to the environment and redeploy.
          </p>
        )}
      </div>
    </div>
  );
}
