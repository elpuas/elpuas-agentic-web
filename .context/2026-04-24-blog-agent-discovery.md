# Blog Agent Discovery

## Summary of changes
- Added blog discovery metadata context for the AI agent without loading full blog post bodies.
- Added a new `getBlogIndexContext()` function that reads the `blog` content collection, excludes drafts, sorts by date descending, and returns plain-text post metadata.
- Updated the context loader to append blog metadata under a dedicated `## Blog Posts` section together with existing knowledge context.
- Updated AI system prompt rules so responses can reference discovered blog posts with `/blog/[slug]` links and avoid inventing or fully summarizing posts without full article context.

## Files modified
- `src/lib/blog-context.ts`
- `src/lib/context.ts`
- `src/lib/ai.ts`
- `.context/2026-04-24-blog-agent-discovery.md`

## Notes
- This step only adds blog metadata discovery context.
- Full blog post body loading/summarization is intentionally not included in this step.
