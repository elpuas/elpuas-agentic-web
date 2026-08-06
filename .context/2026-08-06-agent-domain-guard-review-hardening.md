# Agent Domain Guard Review Hardening

## What was done

- Enforced the `ScopeDecision` cross-field contract:
  - blog-related results require non-empty blog title and URL values
  - every other category requires both blog fields to be `null`
- Added timeout and cancellation handling to both OpenAI requests.
- Added separate timeout budgets for scope classification and answer generation.
- Converted the blog discovery index to reusable structured records.
- Removed published-post validation based on formatted text delimiters.
- Kept the existing text formatter for the model's runtime context.

## Files changed

- `src/lib/ai.ts`
- `src/lib/blog-context.ts`
- `src/pages/api/ask.ts`
- `.context/2026-08-06-agent-domain-guard-review-hardening.md`

## Next steps

- Run strict TypeScript validation and the production build.
- Recheck out-of-domain, blog-related, and profile questions through the local API.
