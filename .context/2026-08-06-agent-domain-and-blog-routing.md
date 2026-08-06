# Agent Domain and Blog Routing

## What was done

- Added a structured scope-classification gate before the main answer request.
- Split free-form questions into four routes:
  - Alfredo's documented domain
  - general questions directly related to a published blog post
  - out-of-domain questions
  - undocumented private questions
- Added fixed English and Spanish fallbacks for blocked questions.
- Added exact blog-title and URL validation before returning a recommendation.
- Reused the generated blog index between classification and answer context loading.
- Removed the current question from conversation history so it is not sent twice.
- Added a server-side duplicate-history guard for older clients.

## Files changed

- `src/layouts/BaseLayout.astro`
- `src/lib/ai.ts`
- `src/lib/context.ts`
- `src/pages/api/ask.ts`
- `.context/2026-08-06-agent-domain-and-blog-routing.md`

## Validation

- `npm run build`
- Confirmed a World Cup ticket-price question returns the Spanish out-of-domain fallback.
- Confirmed a block-theme/PHP question routes to the matching published blog post.
- Confirmed a professional-background question continues through the normal grounded-answer flow.

## Next steps

- Add automated regression tests for representative routing prompts if a test runner is introduced.
- Review production logs after deployment to calibrate false positives and false negatives.
