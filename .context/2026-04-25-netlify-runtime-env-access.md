# Netlify Runtime Env Access - 2026-04-25

## What was done
- Audited OpenAI secret access usage in server code.
- Replaced server-side OpenAI key access from `import.meta.env.ELPUAS_OPENAI_API_KEY` to `process.env.ELPUAS_OPENAI_API_KEY`.
- Kept lazy server-only OpenAI client initialization intact.
- Preserved missing-key error handling.
- Added temporary production-safe diagnostics for runtime key inspection (no full key logging):
  - key prefix (first 10 chars)
  - key suffix (last 6 chars)
  - key length
  - whitespace detection via regex
- Updated `/api/ask` env check logging to explicitly validate `process.env` access.

## Files changed
- `src/lib/ai.ts`
- `src/pages/api/ask.ts`
- `.context/2026-04-25-netlify-runtime-env-access.md`

## import.meta.env usage removed from server OpenAI path
- Removed in `src/lib/ai.ts` (OpenAI client key lookup).
- Removed in `src/pages/api/ask.ts` (API env diagnostics).

## process.env diagnostics added
- `src/lib/ai.ts`:
  - logs masked key diagnostics at client initialization.
- `src/pages/api/ask.ts`:
  - logs masked key diagnostics in request env check.

## Build validation result
- `npm run build` completed successfully on 2026-04-25.
