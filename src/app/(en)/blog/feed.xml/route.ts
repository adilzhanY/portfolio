import { getPosts } from "@/data/blog";
import { getContent } from "@/data/cv";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { SITE_URL } from "@/i18n/metadata";

export const dynamic = "force-static";

function escape(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* RSS 2.0, built from the same files as the pages, so it cannot drift. */
export function GET() {
  const { name, meta } = getContent(DEFAULT_LOCALE);
  const posts = getPosts();

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escape(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escape(post.summary)}</description>
${post.tags.map((tag) => `      <category>${escape(tag)}</category>`).join("\n")}
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(meta.blogTitle)}, ${escape(name)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escape(meta.blogDescription)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
