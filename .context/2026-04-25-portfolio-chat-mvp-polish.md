# Portfolio Chat MVP Polish - 2026-04-25

## What was done

- Refined AI persona behavior in `src/lib/ai.ts` to keep replies shorter, more conversational, and less resume/biography-like.
- Kept first-person response behavior and existing blog recommendation/page-context instructions.
- Replaced the hard fallback (`I don't know.`) with a concise human fallback: `That’s not something I have a good answer for.`
- Removed unsupported `text.verbosity = low` from the Responses API payload.
- Added `max_output_tokens: 250` for concise, cost-controlled completions.
- Added API input validation in `src/pages/api/ask.ts`:
  - rejects empty or whitespace-only questions
  - rejects questions longer than 450 characters
  - returns friendly JSON error messages
- Added lightweight anti-spam cooldown per IP (4 seconds) in `src/pages/api/ask.ts`.
- Updated API user-facing 500-level errors to be calm and generic while keeping detailed server logs for debugging.
- Preserved existing stable backend behavior:
  - direct raw fetch to OpenAI Responses API
  - hardened output parser
  - Netlify-safe process.env access pattern
  - page context support
  - blog discovery support

## Files changed

- `src/lib/ai.ts`
- `src/pages/api/ask.ts`
- `.context/2026-04-25-portfolio-chat-mvp-polish.md`

## Final validation notes

### Manual API checks (local dev)

Prompts tested:
- `tell me about yourself`
- `what tools do you use?`
- `what projects have you worked on?`
- `do you have a post about AI?`
- `summarize this post` (with `pageContext`)

Observed:
- Request path and context loading worked.
- Page-context and blog-discovery loading still executed in logs.
- Friendly user-facing errors were returned for backend failures.
- Throttle worked: repeated rapid requests from same IP returned 429 cooldown errors.
- Validation worked:
  - empty question -> 400 with friendly message
  - >450 chars -> 400 with friendly message

Note:
- Full response-quality confirmation (shorter/natural AI replies, blog link wording) could not be completed in this environment because `ELPUAS_OPENAI_API_KEY` was not present at runtime, so OpenAI completion calls returned the new generic error message as expected.

### Build check

- `npm run build` passed successfully.

## Next steps

- Re-run the five prompt checks in an environment with `ELPUAS_OPENAI_API_KEY` set to confirm final live response tone and blog-link phrasing end-to-end.
