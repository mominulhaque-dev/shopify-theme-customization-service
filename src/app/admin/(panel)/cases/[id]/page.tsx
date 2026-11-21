import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { VISUAL_OPTIONS } from "@/lib/admin/content";
import ConfirmButton from "@/components/admin/ConfirmButton";
import CaseForm, { type CaseFormValues } from "../CaseForm";
import { deleteCase } from "../actions";

export default async function EditCase({ params, searchParams }: { params: { id: string }; searchParams: { saved?: string } }) {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("case_studies").select("*").eq("id", params.id).maybeSingle();
  if (!data) notFound();
  const c = data as CaseFormValues & { id: string };

  return (
    <>
      <header className="adm-head">
        <div>
          <Link href="/admin/cases/" className="adm-small">
            ← All case studies
          </Link>
          <h1>Edit case study</h1>
        </div>
        <div className="adm-actions">
          {c.status === "published" && (
            <a href={`/work/${c.slug}/`} target="_blank" rel="noopener noreferrer" className="adm-btn adm-btn-ghost">
              View on site ↗
            </a>
          )}
          <form action={deleteCase.bind(null, c.id)}>
            <ConfirmButton message="Delete this case study permanently?">Delete</ConfirmButton>
          </form>
        </div>
      </header>
      <CaseForm id={c.id} values={{ ...c, results: c.results ?? [] }} visuals={VISUAL_OPTIONS} justSaved={searchParams.saved === "1"} />
    </>
  );
}
