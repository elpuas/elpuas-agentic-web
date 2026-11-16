# WordCamp US speaking and ezCater portfolio knowledge

## What was done

- Preserved the existing work on `feat/low-cost-agent-luna`.
- Read the published local article “From Costa Rica to Phoenix: What Speaking at WordCamp US Taught Me” as the source for the completed WordCamp US 2026 speaking engagement in Phoenix, August 19, 2026, the full talk title, first-time speaking context, recording, and article links.
- Added those facts to the community knowledge file and the public-media reference list.
- Added ezCater as one entry in the broader project portfolio. Per the user's correction, omitted current-work status, delivery dates, and implementation details.
- Restricted the public-work deterministic response to explicit profile/work-link lookup requests instead of broad fuzzy matches on WordPress or WordCamp terms. Factual speaking questions continue through the scope and factual-answer flow.
- Added a server-derived Costa Rica date to scope and answer instructions to resolve “this year” and avoid implying a completed event is upcoming. No future speaking engagements or project status may be inferred.
- Updated the website's knowledge files only; no personal Codex memory files were changed.

## Files changed for this follow-up

- content/knowledge/community.mdx
- content/knowledge/public-media-presence.mdx
- content/knowledge/projects.mdx
- src/lib/deterministic/router.ts
- src/lib/ai.ts
- .context/2026-11-16-wordcamp-us-ezcater-knowledge.md

## Validation

- `npm run build` and `git diff --check` passed.
- Eight live local endpoint checks passed: the exact user question, a past-tense speaking question, the Spanish equivalent, talk content, ezCater portfolio membership, refusal to invent ezCater status, refusal to invent next-year speaking plans, and retention of the explicit “show me your work” shortcut.
- The exact request returned: “Yes, I spoke at WordCamp US 2026 in Phoenix. My session was about agentic development for WordPress.”
- No external project details, employment relationship, delivery claims, or ezCater status were added.

## Next steps

- Review locally on `feat/low-cost-agent-luna`.
- Changes remain uncommitted; no push or deployment was performed.
