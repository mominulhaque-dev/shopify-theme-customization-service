/* eslint-disable @next/next/no-img-element -- uploaded covers have unknown dimensions */
import { Visual } from "@/components/ui/visuals";
import type { Post } from "@/lib/posts";

/** Cover image if the post has one, else its illustration, else a default. */
export default function PostMedia({ post, eager = false }: { post: Pick<Post, "coverUrl" | "visual" | "title">; eager?: boolean }) {
  if (post.coverUrl) {
    return <img src={post.coverUrl} alt="" className="post-cover" loading={eager ? "eager" : "lazy"} decoding="async" />;
  }
  return <Visual name={post.visual ?? "ill-process"} />;
}
