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

## Next steps
- Manual browser validation on a blog post page for:
  - "summarize this post"
  - "what is this article about?"
  - "explain this section"
  - "what tools do you use?"
  - "who are you?"
