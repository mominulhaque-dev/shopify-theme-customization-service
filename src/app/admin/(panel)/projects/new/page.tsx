import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import ProjectForm from "../ProjectForm";
import { createProject } from "../actions";

export default async function NewProject({ searchParams }: { searchParams: { lead?: string } }) {
  const { supabase } = await requireAdmin();
  type Lead = { id: string; name: string; email: string; store_url: string; service: string | null };
  let lead: Lead | null = null;
  if (searchParams.lead && /^[0-9a-f-]{36}$/i.test(searchParams.lead)) {
    const { data } = await supabase.from("leads").select("id, name, email, store_url, service").eq("id", searchParams.lead).maybeSingle();
    lead = (data as Lead | null) ?? null;
  }

  return (
    <>
      <header className="adm-head">
        <div>
          <Link href="/admin/projects/" className="adm-small">
            ← All projects
          </Link>
          <h1>New client project</h1>
          {lead && <p className="adm-muted">From the lead by {lead.name}. The lead will be marked as Won.</p>}
        </div>
      </header>
      <ProjectForm
        action={createProject}
        isNew
        leadId={lead?.id ?? null}
        values={{
          title: lead?.service && lead.service !== "Not sure yet" ? lead.service : "",
          client_name: lead?.name ?? "",
          client_email: lead?.email ?? "",
          store_url: lead?.store_url ?? "",
          status: "active",
          message: "",
        }}
      />
    </>
  );
}
