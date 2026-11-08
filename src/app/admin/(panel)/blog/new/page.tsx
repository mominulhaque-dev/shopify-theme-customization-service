import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { VISUAL_OPTIONS } from "@/lib/admin/content";
import PostForm from "../PostForm";

export default async function NewPost() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("posts").select("category");
  const categories = Array.from(new Set(["Guides", "Pricing", ...((data as { category: string }[] | null) ?? []).map((r) => r.category)]));

  return (
    <>
      <header className="adm-head">
        <div>
          <Link href="/admin/blog/" className="adm-small">
            ← All posts
          </Link>
          <h1>New post</h1>
        </div>
      </header>
      <PostForm
        id={null}
        visuals={VISUAL_OPTIONS}
        categories={categories}
        values={{
          title: "",
          slug: "",
          meta_title: "",
          description: "",
          keyword: "",
          category: "Guides",
          excerpt: "",
          cover_url: null,
          visual: null,
          takeaways: [],
          body_html: "",
          faq: [],
          read_minutes: null,
          status: "draft",
          published_at: null,
        }}
      />
    </>
  );
}
