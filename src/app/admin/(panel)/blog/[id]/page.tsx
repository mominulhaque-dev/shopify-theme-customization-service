import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { VISUAL_OPTIONS } from "@/lib/admin/content";
import ConfirmButton from "@/components/admin/ConfirmButton";
import PostForm, { type PostFormValues } from "../PostForm";
import { deletePost } from "../actions";

export default async function EditPost({ params, searchParams }: { params: { id: string }; searchParams: { saved?: string } }) {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("posts").select("*").eq("id", params.id).maybeSingle();
  if (!data) notFound();
  const post = data as PostFormValues & { id: string };
  const { data: cats } = await supabase.from("posts").select("category");
  const categories = Array.from(new Set(["Guides", "Pricing", ...((cats as { category: string }[] | null) ?? []).map((r) => r.category)]));

  return (
    <>
      <header className="adm-head">
        <div>
          <Link href="/admin/blog/" className="adm-small">
            ← All posts
          </Link>
          <h1>Edit post</h1>
        </div>
        <div className="adm-actions">
          {post.status === "published" && (
            <a href={`/blog/${post.slug}/`} target="_blank" rel="noopener noreferrer" className="adm-btn adm-btn-ghost">
              View on site ↗
            </a>
          )}
          <form action={deletePost.bind(null, post.id)}>
            <ConfirmButton message="Delete this post permanently?">Delete</ConfirmButton>
          </form>
        </div>
      </header>
      <PostForm
        id={post.id}
        values={{ ...post, faq: post.faq ?? [], takeaways: post.takeaways ?? [] }}
        visuals={VISUAL_OPTIONS}
        categories={categories}
        justSaved={searchParams.saved === "1"}
      />
    </>
  );
}
