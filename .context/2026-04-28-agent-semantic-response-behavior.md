# Task Log: Agent Semantic Response Behavior Tuning

## What was done
- Updated `src/lib/ai.ts` system prompt behavior to improve contextual synthesis while preserving first-person voice.
- Removed rigid short-response framing and replaced it with adaptive concision based on question scope.
- Added explicit guidance to synthesize across multiple relevant context sections without inventing facts.
- Reinforced natural confidence and reduced repetitive narrow project references through prompt instruction.
- Preserved existing blog behavior instructions, including blog title + internal `/blog/[slug]` linking and current-page-context priority for "this post/article/page" requests.
- Updated fallback response wording to: "I don’t have enough context to answer that well yet."
- Increased `max_output_tokens` from `250` to `400` for broader professional answers.

## Files changed
- `src/lib/ai.ts`
- `.context/2026-04-28-agent-semantic-response-behavior.md`

## Next steps
- Monitor real question quality and adjust prompt constraints if specific answer patterns still feel too narrow.
