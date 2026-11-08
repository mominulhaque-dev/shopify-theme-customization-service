import AdminNav from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/admin/auth";
import { signOut } from "../login/actions";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const { email } = await requireAdmin();
  return (
    <div className="adm-shell">
      <AdminNav email={email} signOut={signOut} />
      <div className="adm-main">{children}</div>
    </div>
  );
}
