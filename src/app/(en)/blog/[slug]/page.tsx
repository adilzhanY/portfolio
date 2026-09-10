import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostView from "@/views/BlogPostView";
import { getPost, getPostSlugs } from "@/data/blog";
import { SITE_URL } from "@/i18n/metadata";

type Params = { params: Promise<{ slug: string }> };

/*
 * With output: export a dynamic route has to produce at least one page, so an
 * empty blog folder falls back to one slug that renders the 404 page.
 */
const NO_POSTS = "no-posts-yet";

export function generateStaticParams() {
  const slugs = getPostSlugs();
  return (slugs.length > 0 ? slugs : [NO_POSTS]).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      url: `${SITE_URL}/blog/${slug}`,
      ...(post.thumbnail ? { images: [{ url: post.thumbnail }] } : {}),
    },
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  return <BlogPostView post={post} />;
}
