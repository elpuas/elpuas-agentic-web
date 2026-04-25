# 2026-04-25 - fix-push-protection-secret

## What was done
- Investigated GitHub GH013 push-protection failure on branch `feature/contact-page-mvp`.
- Identified secret exposure came from tracked build artifacts under `.netlify/` in commit `29c0a1a...`.
- Rewrote branch history from `origin/main` by replaying valid commits and reapplying only non-`.netlify` files from the problematic commit.
- Ensured `.netlify` is ignored and no `.netlify` files remain tracked.
- Force-pushed cleaned history using `--force-with-lease`.

## Files changed
- `.context/2026-04-25-fix-push-protection-secret.md`

## Next steps
- Rotate the exposed OpenAI API key in OpenAI dashboard if not already rotated.
- Continue development on `feature/contact-page-mvp` and open/update PR.
