# Blog

A blog on the static site, with an editor at `/admin` and a view counter on
every post, and no server to pay for. Markdown files in the repo, rendered at
build time. Saving in the editor is a commit, so a save is a publish.

## 1. Content and pages

- [x] Markdown loader: `src/data/blog.ts` reads `src/content/blog/*.md`,
      parses frontmatter (title, date, summary, tags, thumbnail), renders the
      body to HTML at build time, sorts newest first.
- [x] `/blog` list page: title, date, summary, tags, thumbnail, eye icon.
- [x] `/blog/[slug]` post page: article body in the case-study typography,
      date, tags, eye icon, back link.
- [x] English only at the root; `ru` and `de` do not get a prefixed copy.
- [x] Empty state, so the site still builds and reads well with no posts.
- [x] Post images: uploads land in `public/blog/` and are referenced as
      `/blog/name.webp`. The editor does this for you.
- [ ] Write the first post.

## 2. Wiring

- [x] "Blog" link in the nav (all three locales) and in the phone drawer.
- [x] Footer line: Blog next to Now and Uses.
- [x] Sitemap: `/blog` and every slug.
- [x] `llms.txt`: a Blog line with the feed URL.
- [x] RSS feed at `/blog/feed.xml`, a `force-static` route handler.
- [x] Page metadata: title, description, canonical, Open Graph type article,
      and the thumbnail as the share image.

## 3. The editor at /admin

- [x] Sveltia CMS as two static files, `public/admin/index.html` and
      `public/admin/config.yml`. No OAuth app, no worker, nothing to deploy.
- [x] `robots.txt` disallows `/admin`, and the page carries `noindex`.
- [x] Dates written by the editor are normalised in the loader, so an
      unquoted `date: 2026-09-10` and a quoted one behave the same.
- [ ] First sign-in: open `qantrr.com/admin`, click **Sign In with Token**,
      follow its link to GitHub, generate the token with the scopes it
      pre-selects, paste it back. Tokens expire (90 days by default), so
      this comes round a few times a year.
- [ ] Local editing, no token at all: `npm run dev`, open
      `localhost:3000/admin/index.html` in Chrome or Edge, click **Work with
      Local Repository**, pick this folder. It writes files on disk and makes
      no commits, so push yourself afterwards.

## 4. The eye icon

- [x] Phase one: `ViewCount` component fetches
      `kowix.goatcounter.com/counter/<path>.json`, renders the eye and the
      number, hides itself when the request fails.
- [ ] Turn on "Allow public counter" in the GoatCounter settings
      (Settings, then Site, then "Public counter"). Without it the icon
      never appears. On 4 September 2026 both `counter/TOTAL.json` and a
      per-path request answered 403 from the command line, so check in the
      browser that the footer badge and the eye actually show up.
- [ ] Phase two, only if the numbers matter: a Worker with a KV namespace in
      `wrangler.jsonc`, `GET` and `POST` on `/api/views/<slug>`, one count per
      visitor per day by hashing IP and date, then point `ViewCount` at it.

## 5. Later

- [ ] Tag pages or a tag filter once there are more than ten posts.
- [ ] Russian or German posts, if a post is worth translating: a `lang`
      field in the frontmatter and a prefixed route.
