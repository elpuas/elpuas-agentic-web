# Deterministic Matching Tolerance

## What was done

- Upgraded deterministic intent routing from literal phrase checks to token-aware tolerant matching.
- Added token normalization for common shorthand:
  - `r` -> `are`
  - `u` -> `you`
  - `ur` -> `your`
- Added lightweight fuzzy token matching with near-match tolerance (edit distance <= 1) for minor typos.
- Added partial token tolerance for longer keywords (prefix overlap for practical variations).
- Updated alias matching to accept high token overlap, not only exact phrase inclusion.
- Kept deterministic responses as fixed final strings and preserved immediate return before AI path.

## Files changed

- `src/lib/deterministic/router.ts`
- `.context/2026-05-02-deterministic-matching-tolerance.md`

## Next steps

- Add unit tests for typo-tolerant deterministic matching per intent.
- Calibrate matching thresholds with real visitor query logs to reduce false positives.
