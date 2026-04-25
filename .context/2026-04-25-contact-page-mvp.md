# Contact Page MVP

## What was done
- Created `/src/pages/contact.astro` as a new Contact page using the existing `BaseLayout` and visual language from current site pages.
- Added a Netlify-compatible contact form with `name="contact"`, `method="POST"`, `data-netlify="true"`, and hidden `form-name` field.
- Added required fields (`name`, `email`, `message`) and submit button label `Send Message`.
- Added contact fallback note with clickable email link to `mailto:elpuas@gmail.com`.
- Kept shared AskMe/CLI section intact by using existing layout.

## Files changed
- `/src/pages/contact.astro`
- `/.context/2026-04-25-contact-page-mvp.md`

## Next steps
- Verify form submissions in a Netlify deploy context and confirm entries appear in Netlify Forms dashboard.
