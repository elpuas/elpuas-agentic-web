# Page Context Awareness - 2026-04-24

## What was done
- Added optional `pageContext` support through the shared CLI chat flow.
- Built page-scoped context on single blog post pages and passed it to the shared layout chat.
- Updated `/api/ask` to accept `pageContext` from the request body and forward it to context loading.
- Updated AI context assembly to keep global + blog discovery context and append current page context when present.
- Updated system prompt rules so current page context is primary for "this post/article/page/section" style prompts, while still allowing global answers for unrelated questions.

## Files modified
- `src/pages/blog/[slug].astro`
- `src/layouts/BaseLayout.astro`
- `src/pages/api/ask.ts`
- `src/lib/context.ts`
- `src/lib/ai.ts`

## pageContext flow added
- `src/pages/blog/[slug].astro` now builds a plain text `pageContext` with:
  - Current Page Type: Blog Post
  - Current Blog Title
  - Current Blog Slug
  - Current Blog Description
  - Current Blog Category
  - Current Blog Tags
  - Current Blog Content (full article body)
- `pageContext` is passed into `BaseLayout` and read by the shared CLI script.

## Request payload updated
- Shared CLI request now sends:
  - `question`
  - `page`
  - `pageContext` (only when available)
- Existing pages without `pageContext` continue to work unchanged.

## AI context merge updated
- Merge order is now:
  1. Global knowledge context
  2. Blog discovery context
  3. Current page context (optional)
- Page context is appended under `## Current Page Context`.

## System prompt adjustments
- Added explicit rules to prioritize current page context for page-referential queries.
- Added rule to use broader knowledge for unrelated questions.
- Added rule not to assume every question is page-related.

## Debug follow-up (same day)

### Root cause found
- `pageContext` was being injected in a fragile way via a hidden template node and read using `.textContent`.
- For rich MDX body content, that approach was easier to mis-handle and harder to validate reliably at runtime.
- Result: contextual prompts could fall back to broader/global context more often than expected.

### Files adjusted
- `src/layouts/BaseLayout.astro`
- `src/pages/api/ask.ts`
- `src/lib/context.ts`
- `src/lib/ai.ts`

### Payload validation notes
- Confirmed rendered `/blog/a-year-with-the-wordpress-community/` now exposes `data-page-context` directly on the `.cli` root and includes:
  - `Current Blog Title: A Year with the WordPress Community`
  - Full post body with the WP DevDay section.
- Added temporary dev logs:
  - Client logs outgoing payload preview before `/api/ask`.
  - API logs received payload preview (`hasPageContext`, title/slug preview).
- Verified requests for:
  - `summarize this post`
  - `what happened at WP DevDay?`
  - `what is this article about?`
  Returned answers grounded in the WordPress community post.

### Confirmed correct pageContext source
- `pageContext` source remains the current entry in `src/pages/blog/[slug].astro`:
  - metadata from `post.data`
  - full article body from `post.body`
- No About/knowledge-page content is injected into `pageContext` at source.

## Blog link refinement follow-up

### Blog discovery context formatting adjusted
- Updated `src/lib/blog-context.ts` entry formatting to be more readable and explicit per post while preserving required fields:
  - `title`
  - `slug`
  - `url` (explicitly `/blog/[slug]`)
  - `description`
  - `category`
  - `tags`
  - `date`
- Kept plain text context format for prompt compatibility.

### System prompt updated for internal blog links
- Updated `src/lib/ai.ts` instructions to require that when referencing/recommending existing posts, responses include:
  - post title
  - internal URL path (`/blog/[slug]`)
- Added a natural-language example that shows title + path in plain text.

### Validation notes
- API prompt test: `do you have a post about AI?`
  - Returned relevant titles and included `/blog/...` links.
- API prompt test: `do you have something about Electron?`
  - Returned Electron post title + `/blog/building-my-own-image-optimizer-with-electron-node-js-and-sharp`.
- API prompt test: `have you written about WordPress Playground?`
  - Returned Playground post title + `/blog/taking-playground-further-meet-blueprints`.
- In-page-context test on `/blog/a-year-with-the-wordpress-community/` with:
  - `do you have more posts like this?`
  - Returned related post reference with internal `/blog/...` link.
