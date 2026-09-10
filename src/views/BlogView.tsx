import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { formatPostDate, getPosts } from "@/data/blog";
import { getContent } from "@/data/cv";
import { DEFAULT_LOCALE } from "@/i18n/config";
import ViewCount from "@/components/ViewCount";

/* The blog is written in English only, so the view always reads the
   English copy whatever the rest of the site is showing. */
export default function BlogView() {
  const { blog } = getContent(DEFAULT_LOCALE);
  const posts = getPosts();

  return (
    <div className="mx-auto max-w-5xl px-4 pt-8 pb-12 leading-relaxed sm:px-6 md:pt-10 lg:px-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">
          {blog.heading}
        </h1>
        <a
          href="/blog/feed.xml"
          className="text-sm text-muted hover:text-ink hover:underline hover:underline-offset-3"
        >
          {blog.feed}
        </a>
      </div>
      <p className="mt-2 text-body">{blog.intro}</p>

      {posts.length === 0 && (
        <p className="mt-8 border-t border-faint pt-6 text-[0.9375rem] text-muted">
          {blog.empty}
        </p>
      )}

      {posts.map((post, i) => (
        <article
          key={post.slug}
          className={[
            "grid gap-6 py-7 md:gap-10",
            post.thumbnail ? "md:grid-cols-[minmax(0,1fr)_320px]" : "",
            i < posts.length - 1 ? "border-b border-faint" : "",
          ].join(" ")}
        >
          <div>
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <ViewCount path={`/blog/${post.slug}`} />
            </div>
            <h2 className="mt-1.5 text-lg font-semibold">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:underline hover:underline-offset-3"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-[0.9375rem] text-body">{post.summary}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-faint bg-chip px-2.5 py-0.5 font-mono text-[0.78125rem] text-body"
                >
                  {tag}
                </span>
              ))}
              <Link
                href={`/blog/${post.slug}`}
                className="ml-auto inline-flex items-center gap-1.5 text-[0.84375rem] font-medium text-muted hover:text-ink"
              >
                {blog.read}
                <FiArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
          {post.thumbnail && (
            <Link href={`/blog/${post.slug}`} className="block self-center">
              <img
                src={post.thumbnail}
                alt=""
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className="block w-full rounded-lg border border-faint"
              />
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}
