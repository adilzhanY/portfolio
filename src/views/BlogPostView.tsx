import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { formatPostDate, type Post } from "@/data/blog";
import { getContent } from "@/data/cv";
import { DEFAULT_LOCALE } from "@/i18n/config";
import ViewCount from "@/components/ViewCount";

export default function BlogPostView({ post }: { post: Post }) {
  const { blog } = getContent(DEFAULT_LOCALE);

  return (
    <article className="post card" style={{ marginTop: "3rem" }}>
      <Link href="/blog" className="back-link">
        <FiArrowLeft aria-hidden="true" />
        {blog.back}
      </Link>
      <h1>{post.title}</h1>
      <div className="meta-line">
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        <ViewCount path={`/blog/${post.slug}`} />
      </div>
      {post.tags.length > 0 && (
        <div className="chips">
          {post.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      )}
      {/* The body is our own Markdown, rendered at build time, so
          injecting it is injecting content we wrote ourselves. */}
      <div className="post-body" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
