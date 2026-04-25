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

## 2026-04-25 Transport Debug Update

### Base URL audit
- Audited codebase for OpenAI transport configuration (`new OpenAI(`, `baseURL`, `OPENAI_BASE_URL`, `OPENAI_API_BASE`, `api.openai`, fetch/proxy overrides).
- No custom OpenAI SDK `baseURL` configuration found in server code.
- Runtime diagnostics now log:
  - `hasOpenAIBaseUrlEnv`
  - `hasOpenAIApiBaseEnv`
  - `customBaseUrlPassed` (currently `false`)
  - OpenAI SDK version from `package.json` (`openai` dependency)

### Raw fetch test result instrumentation
- Added raw fetch probe call to `https://api.openai.com/v1/responses` before the main model call.
- Probe logs only:
  - response `status`
  - response `headers.server`
  - `ok` boolean
- Main OpenAI request also logs the same transport result fields.

### Active transport
- OpenAI SDK transport is temporarily bypassed for requests.
- Active path is raw `fetch` to `https://api.openai.com/v1/responses`.
- System prompt and context composition behavior remain unchanged.
