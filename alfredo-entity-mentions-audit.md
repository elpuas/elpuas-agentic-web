# Public Entity Mention Audit: Alfredo Navas / ElPuas / EPDC

## Summary

The strongest public mentions are the WordCamp San Jose speaker and organizer pages, the WordPress DevDay San Jose pages, the WebDevStudios team page, the WordPress.org profile, GitHub, and three YouTube appearances. That is enough public coverage to support Alfredo Navas as a clearly identifiable person online.

ElPuas Digital Crafts is also publicly mentioned, but the evidence is thinner and mostly attached to Alfredo's own profiles or employer/community pages. It looks viable as a supporting entity, but not yet as strong as Alfredo Navas himself.

WordPress.tv did not surface any videos for the name search, so it currently adds little value.

## Strongest Entity Sources

| Name / Query | URL | Source Type | Mentioned Entity | Has Link? | Links To | Context | Potential Use | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Alfredo Navas | https://events.wordpress.org/sanjose/2026/wordpress-devday/speaker/alfredo-navas/ | WordCamp / event page | Alfredo Navas, ElPuas Digital Crafts | Yes | Session page and event navigation | Official WordPress DevDay speaker page with bio and session listing. | Wikidata reference candidate, Knowledge Graph source | High |
| Alfredo Navas | https://sanjose.wordcamp.org/2025/organizer/alfredo-navas/ | WordCamp / event page | Alfredo Navas, ElPuas Digital Crafts | Yes | GitHub | Official WordCamp organizer page with bio and social links. | Wikidata reference candidate, sameAs candidate | High |
| Alfredo Navas | https://sanjose.wordcamp.org/2024/speaker/alfredo-navas/ | WordCamp / event page | Alfredo Navas | Yes | LinkedIn | Official WordCamp speaker page with bio, session, and social links. | Wikidata reference candidate | High |
| Alfredo Navas | https://webdevstudios.com/team/alfredo-navas/ | Agency/company profile | Alfredo Navas, WebDevStudios, WordPress Costa Rica | Yes | Community and internal profile links | Employer profile that identifies Alfredo by name, role, location, and community work. | Wikidata reference candidate, sameAs candidate | High |
| Alfredo Navas | https://profiles.wordpress.org/elpuas/ | WordPress.org | Alfredo Navas, ElPuas, ElPuas Digital Crafts, elpuas.com | Yes | elpuas.com, GitHub, WordPress.org | WordPress.org profile with name, location, employer, and site links. | sameAs candidate, Knowledge Graph source | High |
| ElPuas | https://github.com/elpuas | GitHub | Alfredo Navas, ElPuas Digital Crafts | Yes | ElPuas Digital Crafts site, GitHub | GitHub profile with full name, bio, employer, and location. | sameAs candidate, Knowledge Graph source | Medium |
| Alfredo Navas | https://events.wordpress.org/sanjose/2025/wordpress-devday/speakers/ | WordCamp / event page | Alfredo Navas, ElPuas | Yes | Speaker profile | Speakers index that lists Alfredo under the event roster. | Knowledge Graph source, reference candidate | High |
| Alfredo Navas | https://www.youtube.com/watch?v=4n43x918sGI | Podcast / interview | Alfredo Navas, El Puas, WordPress | Yes | YouTube | Interview title names Alfredo and his nickname; description frames him as WordCamp community leader. | Wikidata reference candidate, LLM SEO source | Medium |
| Alfredo Navas | https://www.youtube.com/watch?v=W4cx5L12ewI | Podcast / interview | Alfredo Navas, WebDevStudios | Yes | YouTube | Interview title and description identify Alfredo as a WordPress Frontend Engineer at WebDevStudios. | Wikidata reference candidate, LLM SEO source | Medium |
| Alfredo Navas | https://www.youtube.com/watch?v=B33I2bvt6TQ&t=11s | Community / video | Alfredo Navas | Yes | YouTube | Community video naming Alfredo in the title and keywords. | LLM SEO source, reference candidate | Medium |
| ElPuas | https://www.youtube.com/@elpuas | Social profile | Alfredo Navas, ElPuas | Yes | buymeacoffee.com/elpuas | Personal YouTube channel with Alfredo Navas as the channel name. | sameAs candidate | Medium |
| Alfredo Navas | https://wordpress.tv/search/Alfredo+Navas/ | WordPress.tv | Alfredo Navas | No | None | Search page reports no videos found for the query. | Weak / low value | Low |
| Alfredo Navas | https://events.wordpress.org/sanjose/2025/wordpress-devday/speaker/alfredo-navas/ | WordPress DevDay / event page | Alfredo Navas | No | None | Direct speaker URL returns a 404 page in this fetch. | Needs cleanup | Low |

## Possible sameAs URLs

- https://elpuas.com
- https://elpuasdigitalcrafts.com
- https://profiles.wordpress.org/elpuas/
- https://github.com/elpuas
- https://webdevstudios.com/team/alfredo-navas/
- https://sanjose.wordcamp.org/2024/speaker/alfredo-navas/
- https://sanjose.wordcamp.org/2025/organizer/alfredo-navas/
- https://events.wordpress.org/sanjose/2026/wordpress-devday/speaker/alfredo-navas/
- https://www.youtube.com/@elpuas

## Possible Wikidata Reference Candidates

Use these first because they are stable, public, and factual enough to support basic statements about identity, community roles, and speaking history:

- https://sanjose.wordcamp.org/2024/speaker/alfredo-navas/
- https://sanjose.wordcamp.org/2025/organizer/alfredo-navas/
- https://events.wordpress.org/sanjose/2026/wordpress-devday/speaker/alfredo-navas/
- https://webdevstudios.com/team/alfredo-navas/
- https://www.youtube.com/watch?v=4n43x918sGI
- https://www.youtube.com/watch?v=W4cx5L12ewI
- https://www.youtube.com/watch?v=B33I2bvt6TQ&t=11s

## Backlink / Cleanup Opportunities

- The WebDevStudios team page is the clearest third-party backlink opportunity because it is a stable employer profile and does not currently point to `elpuas.com` or `elpuasdigitalcrafts.com`.
- The WordCamp San Jose 2024 and 2025 speaker / organizer pages already link to social profiles, so they are good candidates to request a profile URL update if the current LinkedIn or GitHub targets change.
- The WordPress.org profile already links to `elpuas.com` and GitHub, so it should remain the canonical profile reference and can be reused in structured data.
- The direct 2025 WordPress DevDay speaker URL appears stale or removed; the speakers index and organizer page are the current working URLs.

## Weak or Low-Value Mentions

- WordPress.tv search results for Alfredo Navas returned no videos, so this page does not add much entity value right now.
- The direct 2025 WordPress DevDay speaker URL is a 404 in this audit, so it is only useful as a cleanup signal.

## Recommendations

1. Add the strongest public profiles to JSON-LD `sameAs`: WordPress.org, GitHub, WebDevStudios, WordCamp pages, and the YouTube channel.
2. Keep `elpuas.com` and `elpuasdigitalcrafts.com` consistent across all profiles and bios; the current profile mix shows some name variation, but the entity is still coherent.
3. Ask for a backlink or site URL update on the WebDevStudios team page if it can safely include `elpuas.com` or `elpuasdigitalcrafts.com`.
4. Use the WordCamp and WordPress DevDay pages as the main external references when building Wikidata or Knowledge Graph support.
5. Publish or secure a few more independent mentions outside self-owned profiles if you want ElPuas Digital Crafts to stand up more cleanly as its own Wikidata item.

## Final Answers

1. Alfredo Navas has enough public mentions to justify a Wikidata item: yes, provided the item is built from the independent event and publisher references rather than only self-owned profiles.
2. ElPuas Digital Crafts has some public mentions, but it is not yet as strong as Alfredo Navas and looks borderline for a separate Wikidata item without more independent coverage.
3. Add these URLs to JSON-LD `sameAs`: `https://elpuas.com`, `https://elpuasdigitalcrafts.com`, `https://profiles.wordpress.org/elpuas/`, `https://github.com/elpuas`, `https://webdevstudios.com/team/alfredo-navas/`, `https://sanjose.wordcamp.org/2024/speaker/alfredo-navas/`, `https://sanjose.wordcamp.org/2025/organizer/alfredo-navas/`, `https://events.wordpress.org/sanjose/2026/wordpress-devday/speaker/alfredo-navas/`, and `https://www.youtube.com/@elpuas`.
4. The mentions most worth updating for `elpuas.com` or `elpuasdigitalcrafts.com` are the WebDevStudios team page and any editable WordCamp / WordPress profile pages that currently point only to social accounts.
5. Top 5 actions: normalize one canonical name, add `sameAs` to site schema, request one or two third-party backlink updates, publish one more independent interview or podcast mention, and keep WordPress.org plus GitHub as the two primary public identity anchors.
