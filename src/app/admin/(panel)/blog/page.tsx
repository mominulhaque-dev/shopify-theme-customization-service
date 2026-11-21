import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { formatDate } from "@/lib/admin/format";
import { BLOG_POSTS } from "@/data/blog";
import { importStaticPosts } from "./actions";

interface Row {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: string;
  published_at: string | null;
  updated_at: string;
}

export default async function BlogAdmin() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase
    .from("posts")
    .select("id, slug, title, category, status, published_at, updated_at")
    .order("published_at", { ascending: false, nullsFirst: true });
  const posts = (data as Row[] | null) ?? [];
  const have = new Set(posts.map((p) => p.slug));
  const missing = BLOG_POSTS.filter((p) => !have.has(p.slug)).length;
  const published = posts.filter((p) => p.status === "published").length;

  return (
    <>
      <header className="adm-head">
        <div>
          <h1>Blog posts</h1>
          <p className="adm-muted">
            {posts.length} post{posts.length === 1 ? "" : "s"} · {published} published
          </p>
        </div>
        <Link href="/admin/blog/new/" className="adm-btn adm-btn-primary">
          + New post
        </Link>
      </header>

      {missing > 0 && (
        <div className="adm-alert adm-alert-warn">
          <p>
            {published === 0
              ? `The website is showing the ${BLOG_POSTS.length} built-in posts. Import them to edit them here — once any post is published from the admin, only admin posts are shown.`
              : `${missing} built-in post${missing > 1 ? "s are" : " is"} not in the admin yet and no longer show on the website.`}
          </p>
          <form action={importStaticPosts}>
            <button type="submit" className="adm-btn adm-btn-sm">
              Import {missing} built-in post{missing > 1 ? "s" : ""}
            </button>
          </form>
        </div>
      )}

      {posts.length === 0 ? (
        <p className="adm-empty">No posts in the admin yet.</p>
      ) : (
        <div className="adm-table-wrap adm-card">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Published</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <Link href={`/admin/blog/${p.id}/`}>
                      <strong>{p.title}</strong>
                    </Link>
                    <div className="adm-muted adm-small">/blog/{p.slug}/</div>
                  </td>
                  <td>{p.category}</td>
                  <td>
                    <span className={`adm-badge${p.status === "published" ? " adm-status-won" : ""}`}>
                      {p.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="adm-small">{p.published_at ? formatDate(p.published_at) : "—"}</td>
                  <td>
                    {p.status === "published" && (
                      <a href={`/blog/${p.slug}/`} target="_blank" rel="noopener noreferrer" className="adm-small">
                        View ↗
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
