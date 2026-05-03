# Deterministic Router Calibration Pass

## What was done

- Retuned `PUBLIC_WORK_INTENT` keyword clusters to use natural visibility terms:
  - `work / portfolio / projects`
  - `github / linkedin / wordpress / profile`
- Expanded natural public-work aliases (e.g. `show me your projects`, `portfolio`, `project examples`, `work examples`).
- Reformatted `PUBLIC_WORK_INTENT` answer into a readable multiline conversational response with canonical links.
- Narrowed `CONTACT_INTENT` matching to explicit communication/hiring intent:
  - removed broad `project/together/work` cluster terms
  - kept contact-specific terms and aliases like `work with you`, `get in touch`
- Improved `SITE_BUILD_INTENT` copy to a more human sentence including Astro, MDX, internal knowledge base, OpenAI workflow, and conversational product goal.
- Removed `where are you from` from `LOCATION_INTENT` aliases and cluster.
- Refined out-of-domain patterns by removing overly broad generic patterns (`what is`, `who is`, `when did`) and replacing with safer trivia-oriented patterns.
- Kept and verified combined out-of-domain gate behavior in router logic:
  - refusal triggers only when a trivia pattern is present and no domain signal is detected.
- Added fuzzy alias guard requiring at least one distinctive token match to reduce false positives from filler overlap.

## Files changed

- `src/lib/deterministic/intents.ts`
- `src/lib/deterministic/router.ts`
- `.context/2026-05-03-deterministic-router-calibration-pass.md`

## Next steps

- Add intent-level unit tests for false-positive and false-negative edge cases in deterministic matching.
