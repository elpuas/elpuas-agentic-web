# Agent Markdown Link Rendering Fix

## What was done

- Added safe Markdown link parsing for assistant responses.
- Preserved the existing auto-linking behavior for bare external URLs and internal paths.
- Prevented Markdown labels such as `github.com/elpuas` from being split into a broken internal `/elpuas` link.

## Files changed

- `src/layouts/BaseLayout.astro`
- `.context/2026-08-27-agent-markdown-link-rendering.md`

## Validation

- `npm run build` passed.
- Verified in a local browser with a mocked agent response containing GitHub, YouTube, and Twitch Markdown links plus a bare external URL.
- Confirmed each label produces one anchor with the expected external URL, while bare-URL auto-linking still works.

## Next steps

- Verify the profile-links response in the deployed site after this change is merged and deployed.
