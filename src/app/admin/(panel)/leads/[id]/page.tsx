import Link from "next/link";
import { notFound } from "next/navigation";
import ConfirmButton from "@/components/admin/ConfirmButton";
import { requireAdmin } from "@/lib/admin/auth";
import { STATUS_LABEL, formatDate, isOverdue } from "@/lib/admin/format";
import { deleteLead, markUnread, updateLead } from "../actions";
import LeadForm from "./LeadForm";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  store_url: string;
  message: string;
  service: string | null;
  budget: string | null;
  source_page: string | null;
  referrer: string | null;
  status: string;
  notes: string;
  read_at: string | null;
  contacted_at: string | null;
};

export default async function LeadPage({ params }: { params: { id: string } }) {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("leads").select("*").eq("id", params.id).maybeSingle();
  if (!data) notFound();
  const lead = data as Lead;

  if (!lead.read_at) {
    await supabase.from("leads").update({ read_at: new Date().toISOString() }).eq("id", lead.id);
  }

  const storeHref = /^https?:\/\//.test(lead.store_url) ? lead.store_url : `https://${lead.store_url}`;
  const replySubject = encodeURIComponent("Your Shopify theme quote");
  const replyBody = encodeURIComponent(`Hi ${lead.name},\n\nThanks for your request about ${lead.store_url}.\n\n`);

  return (
    <>
      <header className="adm-head">
        <div>
          <Link href="/admin/leads/" className="adm-small">
            ← All leads
          </Link>
          <h1>{lead.name}</h1>
          <p className="adm-muted">
            {formatDate(lead.created_at)} ·{" "}
            <span className={`adm-badge adm-status-${lead.status}`}>
              {STATUS_LABEL[lead.status as keyof typeof STATUS_LABEL] ?? lead.status}
            </span>
            {isOverdue(lead) && <span className="adm-badge adm-badge-err">No reply for over 24 hours</span>}
          </p>
        </div>
        <div className="adm-actions">
          <a className="adm-btn adm-btn-primary" href={`mailto:${lead.email}?subject=${replySubject}&body=${replyBody}`}>
            ✉ Reply by email
          </a>
          <Link className="adm-btn" href={`/admin/projects/new/?lead=${lead.id}`}>
            Start a project
          </Link>
        </div>
      </header>

      <div className="adm-split">
        <div className="adm-stack">
          <section className="adm-card adm-stack">
            <h2>Request</h2>
            <dl className="adm-dl">
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${lead.email}`}>{lead.email}</a>
              </dd>
              <dt>Store</dt>
              <dd>
                <a href={storeHref} target="_blank" rel="noopener noreferrer nofollow">
                  {lead.store_url} ↗
                </a>
              </dd>
              <dt>Service</dt>
              <dd>{lead.service || "—"}</dd>
              <dt>Budget</dt>
              <dd>{lead.budget || "—"}</dd>
              <dt>Sent from</dt>
              <dd>{lead.source_page || "—"}</dd>
              <dt>Came from</dt>
              <dd className="adm-truncate">{lead.referrer || "Direct / unknown"}</dd>
              <dt>First contact</dt>
              <dd>{formatDate(lead.contacted_at)}</dd>
            </dl>
            <div>
              <h3 className="adm-label">Message</h3>
              <p className="adm-message">{lead.message}</p>
            </div>
          </section>
        </div>

        <aside className="adm-stack">
          <section className="adm-card">
            <LeadForm action={updateLead.bind(null, lead.id)} status={lead.status} notes={lead.notes} />
          </section>
          <section className="adm-card adm-stack">
            <form action={markUnread.bind(null, lead.id)}>
              <button type="submit" className="adm-btn adm-btn-ghost adm-btn-block">
                Mark as unread
              </button>
            </form>
            <form action={deleteLead.bind(null, lead.id)}>
              <ConfirmButton message={`Delete the lead from ${lead.name}? This cannot be undone.`}>
                Delete lead
              </ConfirmButton>
            </form>
          </section>
        </aside>
      </div>
    </>
  );
}
