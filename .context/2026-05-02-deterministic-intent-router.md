# Deterministic Intent Router

## What was done

- Created a deterministic pre-routing layer to handle high-frequency portfolio questions before OpenAI.
- Added modular intent definitions in `src/lib/deterministic/intents.ts`.
- Added router logic in `src/lib/deterministic/router.ts` with:
  - safe normalization (lowercase, trim, punctuation cleanup)
  - phrase alias matching
  - lightweight keyword-cluster matching
  - out-of-domain deterministic refusal guard
- Integrated deterministic routing into `src/pages/api/ask.ts` before `loadContext()` and before `askAI()`.
- Preserved existing AI flow for non-deterministic questions.
- Validated deterministic and non-deterministic behavior through direct router tests and ran full build.

## Files changed

- `src/lib/deterministic/intents.ts`
- `src/lib/deterministic/router.ts`
- `src/pages/api/ask.ts`
- `.context/2026-05-02-deterministic-intent-router.md`

## Next steps

- Optionally expand aliases/keyword clusters using real production query logs.
- Add unit tests for deterministic intent matching and regression safety.

---

## Follow-up cleanup (same day)

- Hardened deterministic answer payload text so responses are fixed, concise, and final.
- Updated `PUBLIC_WORK_INTENT` to use full canonical URLs with `https://` from `content/knowledge/public-professional-profiles.mdx`.
- Confirmed deterministic routing still returns immediately from `src/pages/api/ask.ts` before context loading and before `askAI()`, so deterministic answers are not AI-post-processed.
