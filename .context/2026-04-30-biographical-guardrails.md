# 2026-04-30 - biographical-guardrails

## What was done
- Created branch `feature/biographical-guardrails` from `main`.
- Hardened `SYSTEM_PROMPT` in `src/lib/ai.ts` to explicitly block invention/inference of undocumented private biographical details.
- Added a dedicated private-personal fallback style for undocumented personal questions with a short, natural privacy-aware redirect.
- Preserved existing professional/public scope behavior and first-person conversational voice.

## Files changed
- `src/lib/ai.ts`
- `.context/2026-04-30-biographical-guardrails.md`

## Next steps
- Monitor real chat interactions for private-personal question handling and tune wording only if needed.
