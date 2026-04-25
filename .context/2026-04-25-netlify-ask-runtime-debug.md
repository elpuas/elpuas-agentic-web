# Netlify Ask Runtime Debug - 2026-04-25

## What was done
- Added full runtime error handling to `/src/pages/api/ask.ts` with top-level `try/catch`.
- Added request diagnostics logs for:
  - request received
  - API key presence (`hasApiKey` boolean only)
  - question presence (`hasQuestion`)
  - page context presence (`hasPageContext`)
- Added explicit context-loading error handling in `/api/ask` with JSON response:
  - `Context loading failed: ...`
- Added explicit OpenAI error handling in `/api/ask` with JSON response:
  - `OpenAI request failed: ...`
- Added fallback unhandled runtime JSON error in `/api/ask`:
  - `Unhandled /api/ask error: ...`
- Updated OpenAI client initialization in `/src/lib/ai.ts` to be:
  - lazy (initialized at request time)
  - server-only (`import.meta.env.SSR` guard)
  - validated for `ELPUAS_OPENAI_API_KEY`
- Updated `/src/lib/context.ts` to avoid runtime filesystem reads:
  - replaced `node:fs/promises` file reads with `import.meta.glob(..., { query: '?raw', import: 'default' })`
  - added context diagnostics logs for global/blog loading and page-context merge.
- Verified production build still passes (`npm run build`).

## Files changed
- `src/pages/api/ask.ts`
- `src/lib/ai.ts`
- `src/lib/context.ts`
- `.context/2026-04-25-netlify-ask-runtime-debug.md`

## Next steps
- Deploy this branch to Netlify and invoke `POST /api/ask` from production.
- Check Netlify function logs for new diagnostics to pinpoint remaining runtime issues if any.
- After confirming fix, remove or reduce temporary diagnostics verbosity.
