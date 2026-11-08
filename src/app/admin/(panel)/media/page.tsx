import { requireAdmin } from "@/lib/admin/auth";
import type { MediaRow } from "@/lib/admin/upload";
import MediaUploader from "@/components/admin/MediaUploader";
import MediaCard from "./MediaCard";

export default async function MediaPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("media").select("*").order("created_at", { ascending: false }).limit(500);
  const items = (data as MediaRow[] | null) ?? [];

  return (
    <>
      <header className="adm-head">
        <div>
          <h1>Media library</h1>
          <p className="adm-muted">
            Images for blog posts and case studies. PNG, JPG, WebP, GIF or AVIF, up to 5 MB each.
          </p>
        </div>
      </header>
      <section className="adm-card">
        <MediaUploader />
      </section>
      {items.length === 0 ? (
        <p className="adm-empty">No images yet. Upload the first one above.</p>
      ) : (
        <div className="adm-media-grid">
          {items.map((m) => (
            <MediaCard key={m.id} item={m} />
          ))}
        </div>
      )}
    </>
  );
}
