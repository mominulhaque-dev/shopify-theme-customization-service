import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";

export default async function DashboardPage() {
  const { email } = await requireAdmin();
  return (
    <>
      <header className="adm-head">
        <div>
          <h1>Dashboard</h1>
          <p className="adm-muted">Signed in as {email}</p>
        </div>
      </header>
      <div className="adm-grid">
        <Link href="/admin/settings/" className="adm-card adm-tile">
          <strong>Site settings</strong>
          <span className="adm-muted">Prices, delivery times, email, phone and WhatsApp.</span>
        </Link>
      </div>
    </>
  );
}
