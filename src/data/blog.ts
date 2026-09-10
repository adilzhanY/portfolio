import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/*
 * The blog is a folder of Markdown files, read at build time. Nothing here
 * runs in the browser: the static export bakes every post into HTML, so
 * publishing a post is writing a file and pushing.
 *
 * File: src/content/blog/<slug>.md. The frontmatter carries the metadata,
 * the body is the article. Images live in public/blog/<slug>/ and are
 * referenced from the Markdown as /blog/<slug>/name.webp.
 */

export interface PostMeta {
  slug: string;
  title: string;
  /** ISO date, "2026-09-04". */
  date: string;
  summary: string;
  tags: string[];
  /** Optional image, already root-relative, for example "/blog/shot.webp". */
  thumbnail?: string;
}

export interface Post extends PostMeta {
  /** The article body, already rendered to HTML. */
  html: string;
}

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

/*
 * The editor writes `date: 2026-09-10` unquoted, which YAML turns into a Date,
 * while a file written by hand may carry a quoted string. Both end up as the
 * same ISO day here, so sorting and formatting never see the difference.
 */
function toISODate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

function readFile(slug: string) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  const meta: PostMeta = {
    slug,
    title: String(data.title),
    date: toISODate(data.date),
    summary: String(data.summary ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    ...(data.thumbnail ? { thumbnail: String(data.thumbnail) } : {}),
  };
  return { meta, content };
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

/** Every post's metadata, newest first. */
export function getPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => readFile(slug).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!getPostSlugs().includes(slug)) return null;
  const { meta, content } = readFile(slug);
  const rendered = await remark().use(html).process(content);
  return { ...meta, html: String(rendered) };
}

/** "4 September 2026", the way the rest of the site writes dates. */
export function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
