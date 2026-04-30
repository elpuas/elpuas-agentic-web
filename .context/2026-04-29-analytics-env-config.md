# Task Log - analytics-env-config

## What was done
- Removed hardcoded Google Analytics fallback measurement ID from `src/layouts/BaseLayout.astro`.
- Switched analytics configuration to use `PUBLIC_GA_MEASUREMENT_ID` only.
- Preserved behavior so analytics scripts are rendered only when the env var exists and is non-empty.

## Files changed
- src/layouts/BaseLayout.astro
- .context/2026-04-29-analytics-env-config.md

## Next steps
- Set `PUBLIC_GA_MEASUREMENT_ID` in Netlify production environment variables.
- Verify analytics events in production after deploy.
