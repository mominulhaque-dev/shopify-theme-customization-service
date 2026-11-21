import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { VISUAL_OPTIONS } from "@/lib/admin/content";
import CaseForm from "../CaseForm";

export default async function NewCase() {
  await requireAdmin();
  return (
    <>
      <header className="adm-head">
        <div>
          <Link href="/admin/cases/" className="adm-small">
            ← All case studies
          </Link>
          <h1>New case study</h1>
        </div>
      </header>
      <CaseForm
        id={null}
        visuals={VISUAL_OPTIONS}
        values={{
          title: "",
          slug: "",
          client: "",
          industry: "",
          theme: "",
          summary: "",
          problem_html: "",
          solution_html: "",
          results: [],
          before_url: null,
          after_url: null,
          cover_url: null,
          visual: null,
          testimonial_quote: "",
          testimonial_name: "",
          meta_title: "",
          description: "",
          sort_order: 0,
          status: "draft",
        }}
      />
    </>
  );
}
