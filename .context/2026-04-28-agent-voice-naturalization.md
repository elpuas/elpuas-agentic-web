# Task Log - Agent Voice Naturalization

## What was done
- Updated the `SYSTEM_PROMPT` in `src/lib/ai.ts` to reduce polished resume-style phrasing.
- Added explicit guidance to prefer naturally spoken chat English while keeping first-person Alfredo voice, context grounding, and concise answers.
- Added constraints to avoid formal transition/wrap-up language and corporate-style stacked noun phrasing.
- Added guidance to allow natural contractions and occasional short sentence fragments when conversationally appropriate.

## Files changed
- `src/lib/ai.ts`
- `.context/2026-04-28-agent-voice-naturalization.md`

## Next steps
- Validate tone behavior with a few representative prompts in the CLI interface.
- If needed, tune examples further based on real conversation outputs.
