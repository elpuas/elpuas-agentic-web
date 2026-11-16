# Upgrade the portfolio agent to GPT-6 Luna

## What was done

- Created `feat/low-cost-agent-luna` from the current `main` checkout. Preserved the pre-existing untracked model-review note.
- Updated both scope classification and answer generation to use one shared `gpt-6-luna` model constant.
- Explicitly disabled reasoning for both focused tasks, avoiding Luna's default medium reasoning and its additional output-token consumption.
- Increased the scope JSON budget from 80 to 256 tokens to accommodate exact article titles and URLs. Kept answers capped at 400 tokens and set low verbosity.
- Reject incomplete and empty Responses API results before consuming JSON or displaying text. Existing API error handling returns a controlled error.
- Updated README model and request-flow documentation.
- Kept existing prompts, deterministic routing, context loading, timeouts, and content unchanged.

## Files changed

- src/lib/ai.ts
- README.md
- .context/2026-11-16-low-cost-agent-luna-upgrade.md

## Validation

- `npm run build` and `git diff --check` passed.
- A real Luna scope call succeeded using the existing API project; it consumed 598 input tokens, 29 output tokens, and zero reasoning tokens.
- A temporary Node harness loaded the actual TypeScript helper and verified complete output, rejection of incomplete and empty results, invalid scope JSON/decisions, upstream HTTP errors, and request settings with mocked responses. These checks passed.
- Compared both models with the same prompts, context, structured schema, and output budgets: eight classification cases and five answer cases each. Baseline omitted Luna-only reasoning/verbosity settings. This was a small synthetic comparison, not a production traffic benchmark.
- Luna passed 13/13 cases, including Spanish/English, follow-ups, privacy, prompt injection, mixed scope, exact blog references, current-page context, and the missing-information fallback. GPT-4.1 mini passed 11/13: it returned a blog recommendation for a current-page summary request and paraphrased the required missing-information fallback.
- Comparison harness exited 1 because of those two baseline failures; all Luna cases and mocked regression checks passed.
- Baseline consumed 15,760 input/387 output tokens; Luna consumed 15,741 input/382 output tokens, with zero reasoning tokens. At current uncached Standard token rates, estimated costs were $0.0069232 vs $0.0017651, about 74.5% lower for this sample. These estimates exclude actual cache read/write effects and are not billing totals.
- Local POST /api/ask returned HTTP 200 for privacy refusal, out-of-domain refusal, and a Spanish page summary using full application context. The summary completed in about 3.6 seconds. A separate project question took the existing deterministic path and returned without an AI call.
- Temporary validation scripts/results: /tmp/elpuas-luna-validation.mjs and /tmp/elpuas-luna-validation.log. No API credentials were printed or committed.

## Next steps

- Review the local changes on `feat/low-cost-agent-luna`.
- No commit, push, or production deployment was performed. Production continues using its deployed configuration until these changes are released.
