import Link from "next/link";
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
    <>
      <header className="page-heading">
        <h1>
          {blog.heading}
          <span className="accent">.</span>
        </h1>
        <p className="lead">{blog.intro}</p>
        <div className="actions">
          <a className="button" href="/blog/feed.xml">
            {blog.feed}
            <span className="circ" aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <div className="list">
        {posts.length === 0 && <p className="card empty-note">{blog.empty}</p>}

        {posts.map((post, i) => (
          <article key={post.slug} className={post.thumbnail ? "list-item card has-media" : "list-item card"}>
            <div>
              <div className="meta-line">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                <ViewCount path={`/blog/${post.slug}`} />
              </div>
              <h2>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.summary}</p>
              <div className="chips">
                {post.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
                <Link href={`/blog/${post.slug}`} className="text-link" style={{ marginLeft: "auto" }}>
                  {blog.read} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            {post.thumbnail && (
              <Link href={`/blog/${post.slug}`}>
                <img src={post.thumbnail} alt="" loading={i === 0 ? "eager" : "lazy"} decoding="async" />
              </Link>
            )}
          </article>
        ))}
      </div>
    </>
  );
}
