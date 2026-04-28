# Task Log - 2026-04-28 - chat-conversation-memory

## What was done
- Created branch `feature/chat-conversation-memory` from `main`.
- Added bounded frontend `conversationHistory` payload support in the CLI submit flow.
- Added API-side validation and normalization for optional `conversationHistory`.
- Updated AI request assembly to include system prompt, global context, recent conversation history, and current question.
- Refined the system prompt to better handle follow-up continuity and reduce repetitive named examples.
- Enforced strict token discipline with short rolling history bounds and per-message trimming.

## Files changed
- `src/layouts/BaseLayout.astro`
- `src/pages/api/ask.ts`
- `src/lib/ai.ts`
- `.context/2026-04-28-chat-conversation-memory.md`

## Next steps
- Run `npm run build` to verify compile and type safety.
- Manually sanity-check CLI follow-up behavior in the browser to confirm improved conversational continuity.
