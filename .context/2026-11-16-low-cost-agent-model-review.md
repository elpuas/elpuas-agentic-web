# Low-cost portfolio agent model review

## What was done

- Reviewed local src/lib/ai.ts, src/lib/context.ts, src/pages/api/ask.ts, and README.md without changing runtime code.
- Confirmed both scope classification and answer generation use gpt-4.1-mini through the Responses API, with output caps of 80 and 400 tokens and timeouts of 8 and 20 seconds.
- Confirmed deterministic answers bypass the API; other in-domain questions can require two sequential model calls.
- Checked current official OpenAI model, pricing, deprecation, and latency documentation on November 16, 2026.
- Current Standard rates per million tokens: gpt-4.1-mini input $0.40/output $1.60; gpt-6-luna short-context input $0.10/output $0.50. These exclude caching, cache writes, and additional reasoning-token usage.
- The official deprecations table lists gpt-4.1-mini-2025-04-14 for shutdown January 14, 2027, with gpt-6-luna as the replacement.
- Recommended evaluating gpt-6-luna, initially with reasoning.effort set to none for this short-response workload. Luna supports Responses and structured outputs; its default reasoning effort is medium.
- Existing output budgets need validation because max_output_tokens includes reasoning and visible output. Check response completion status, scope JSON reliability, privacy boundaries, Spanish/English quality, latency, and actual token cost before migration.
- Noted that the answer context includes all global knowledge files plus the blog index and optional page context. Context selection is a separate possible cost improvement.
- No model calls, credentials, production settings, or application behavior were changed or tested live.

## Sources

- https://developers.openai.com/api/docs/models/gpt-6-luna
- https://developers.openai.com/api/docs/models/gpt-4.1-mini
- https://developers.openai.com/api/docs/pricing
- https://developers.openai.com/api/docs/deprecations
- https://developers.openai.com/api/docs/guides/latency-optimization

## Files changed

- .context/2026-11-16-low-cost-agent-model-review.md

## Next steps

- If migration is requested, create a separate branch and compare the existing model against Luna with representative questions before changing the default.
- Confirm model availability for the API project and measure usage; no account-level availability or production deployment was verified in this review.
