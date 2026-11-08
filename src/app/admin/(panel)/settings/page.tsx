import { requireAdmin } from "@/lib/admin/auth";
import { rowToSettings } from "@/lib/settings";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase
    .from("site_settings")
    .select("email, phone_display, phone_e164, whatsapp_url, tiers")
    .eq("id", 1)
    .maybeSingle();

  return (
    <>
      <header className="adm-head">
        <div>
          <h1>Settings</h1>
          <p className="adm-muted">Changes go live on the website as soon as you save.</p>
        </div>
      </header>
      <SettingsForm settings={rowToSettings(data)} />
    </>
  );
}
