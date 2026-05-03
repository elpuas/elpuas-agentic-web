# Deterministic Scope Refinement

## What was done

- Narrowed deterministic routing to factual utility intents only.
- Removed broad professional/conversational intents from deterministic matching so they fall back to normal OpenAI flow.
- Kept deterministic intents for:
  - location
  - public work links
  - contact
  - site build (factual)
  - out-of-domain generic trivia refusal
- Rewrote remaining deterministic answers to be concise and conversational while preserving exact canonical links.

## Files changed

- `src/lib/deterministic/intents.ts`
- `.context/2026-05-02-deterministic-scope-refinement.md`

## Next steps

- Optionally add targeted unit tests for “should remain AI-driven” prompts to prevent accidental re-expansion of deterministic scope.
