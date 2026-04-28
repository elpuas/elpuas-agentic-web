# 2026-04-28 - domain-limited-ai-guardrails

## What was done
- Hardened the AI system prompt in `src/lib/ai.ts` to enforce strict domain-limited behavior.
- Explicitly defined the assistant as non-general-purpose and prohibited answering from generic world knowledge when Alfredo context does not support the topic.
- Added clear in-domain and out-of-scope topic boundaries.
- Added natural conversational refusal/redirect guidance while preserving first-person Alfredo voice, continuity, and in-domain response richness.

## Files changed
- src/lib/ai.ts
- .context/2026-04-28-domain-limited-ai-guardrails.md

## Next steps
- Optionally test a few out-of-domain prompts in the CLI (history/science/trivia) to validate refusals are consistent and natural.
