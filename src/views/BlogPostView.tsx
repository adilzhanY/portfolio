import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { formatPostDate, type Post } from "@/data/blog";
import { getContent } from "@/data/cv";
import { DEFAULT_LOCALE } from "@/i18n/config";
import ViewCount from "@/components/ViewCount";

export default function BlogPostView({ post }: { post: Post }) {
  const { blog } = getContent(DEFAULT_LOCALE);

  return (
    <div className="pt-10 pb-16 leading-relaxed">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink hover:underline hover:underline-offset-3"
      >
        <FiArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
        {blog.back}
      </Link>

      <article className="mt-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">{post.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <ViewCount path={`/blog/${post.slug}`} />
          </div>
          {post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sharp-sm border border-faint bg-chip px-2.5 py-0.5 font-mono text-[0.78125rem] text-body"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        {/* The body is our own Markdown, rendered at build time, so
            injecting it is injecting content we wrote ourselves. */}
        <div
          className="post-body mt-6"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </div>
  );
}
