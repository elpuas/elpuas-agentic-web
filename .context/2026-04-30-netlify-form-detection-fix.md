# Netlify Form Detection Fix (2026-04-30)

## What was done
- Audited the contact form implementation in `src/pages/contact.astro`.
- Verified production build output and confirmed the form was not present in static deploy HTML before the fix.
- Identified root cause: site uses Astro `output: 'server'`, and the `/contact` route was not prerendered, so Netlify Forms build-time parser could not detect the form.
- Updated contact page route to `prerender` so `/contact/index.html` is generated during build.
- Kept existing UI intact while adding Netlify-compatible form hardening:
  - `netlify` and `data-netlify="true"`
  - honeypot attributes and `bot-field` input
  - explicit `action` to a static success page
- Added a static success page at `/contact/success/` for form redirect fallback.
- Added an unlinked static form blueprint in `public/netlify-form-contact.html` to guarantee form schema detection at deploy time.
- Rebuilt and validated generated files in `dist` include the contact form and blueprint markup.

## Files changed
- `src/pages/contact.astro`
- `src/pages/contact/success.astro`
- `public/netlify-form-contact.html`
- `.context/2026-04-30-netlify-form-detection-fix.md`

## Next steps
- Deploy this branch to Netlify.
- In Netlify UI, confirm Form detection is enabled and verify the `contact` form appears after deploy processing.
- Submit one real test entry from `/contact/` and verify it lands under Forms submissions.
