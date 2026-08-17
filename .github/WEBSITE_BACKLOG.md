# Website backlog

Last reviewed: 2026-08-17

This list records recommendations from the August 2026 website audit that are intentionally not implemented yet. It uses triggers rather than promised dates. The site should remain static, fast, privacy-minimal, evidence-led, and free of unsupported professional claims.

## Outstanding release follow-up

- [ ] In Google Search Console, inspect `https://janisrusko.github.io/`, test the live URL, request indexing, and resubmit `sitemap.xml` after the current release is deployed.
- [ ] Run PageSpeed Insights against the live URL and compare a repeated Lighthouse median with the saved local baseline.
- [ ] Check the deployed social card in LinkedIn Post Inspector or another Open Graph preview tool.
- [ ] Review Search Console Core Web Vitals when sufficient field data become available; do not treat a single synthetic score as permanent.

Completed during release validation: Google Rich Results Test and Schema.org Validator; W3C Nu; internal fragments and production assets; and external-link checks, with expected bot blocking distinguished from broken URLs.

## Reference pages

Build these only when there is enough durable, public material to make each URL independently useful.

- [ ] Create a dedicated **From Data to Decisions** project page with aims, work packages, progress, evidence links, outputs, limitations, and project-specific metadata.
- [ ] Create an evergreen **chemical food-safety risk prioritisation** reference page covering inputs, comparison methods, uncertainty, monitoring implications, limitations, and citations.
- [ ] Create an **occurrence-data infrastructure** reference page, including literature extraction only when a public method or demonstration is ready.
- [ ] Create a **dietary-exposure assessment** reference page when it can add more than a generic service description.
- [ ] Create a **publications hub** and short context pages for the most strategically relevant outputs without reproducing copyrighted papers.
- [ ] Create a dedicated **collaboration** page after defining its scope and deciding whether LinkedIn should remain the long-term contact route.
- [ ] Decide whether a separate **about** page would add evidence or simply duplicate the homepage.
- [ ] Create a **speaking/training** page only after confirming that these activities are publicly offered and documenting relevant examples.
- [ ] Create a **resources** hub only when multiple maintained tools, datasets, guides, or downloads exist.
- [ ] Create a dedicated page for the edible-bee-products systematic review when its protocol, results, or citable output can be shared.

## Content and UX decisions

- [ ] Reassess mobile content order: at small widths the “At a glance” card currently precedes the H1. Change it only if the desktop visual hierarchy and keyboard/reading order can remain coherent.
- [ ] Reassess whether the compact homepage should remain the primary experience after the first two reference pages exist.
- [ ] Add page-specific calls to action as new destinations become real; never link to placeholder routes.
- [ ] Keep `llms.txt` concise and synchronized with visible, source-supported facts rather than expanding it into a duplicate essay.
- [ ] Add a maintained Latvian `/lv/` section and `hreflang` only if a sustained Latvian-language audience justifies parallel upkeep. Do not mix language variants unpredictably on one URL.

## Discovery and identity

- [ ] Add page-specific titles, descriptions, canonicals, Open Graph metadata, and appropriate schema as new pages are published.
- [ ] Generate the sitemap automatically after the site has multiple maintained pages.
- [ ] Consider a custom domain as a portable professional identifier. If adopted, verify it in GitHub for takeover protection; configure apex and `www`, DNS, HTTPS, and redirects; update canonical and graph IDs, `og:url`, Open Graph/Twitter image URLs, sitemap URLs, and the `robots.txt` sitemap reference; update ORCID/LinkedIn/GitHub profile URLs; and add the new Search Console property.
- [ ] Add `ResearchProject`, `Dataset`, or `SoftwareApplication` schema only when a corresponding public page and asset visibly support it.

## Architecture and quality automation

- [ ] Move repeated CSS and theme JavaScript into shared files when multiple pages create real duplication.
- [ ] Evaluate Eleventy, Astro static output, or Jekyll when roughly six or more pages need shared templates. Preserve static HTML output and avoid adding client-side framework code.
- [ ] Introduce a shared identity/publication data source when repetition creates a realistic consistency risk.
- [ ] Add CI for modern HTML validation, internal/external link checking, JSON-LD smoke tests, accessibility checks, and Lighthouse budgets after a pinned toolchain is selected.
- [ ] Automate sitemap and optional feed generation when collections exist.
- [ ] Preserve these expanded-site performance budgets as engineering guardrails:
  - HTML per content page: under 60 KB uncompressed.
  - Critical CSS: under 20 KB.
  - Initial JavaScript: under 20 KB and preferably far below.
  - Visible mobile hero imagery: under 150 KB.
  - Total initial transfer for an ordinary content page: under 300 KB.
  - Third-party JavaScript and web fonts: zero by default.
  - Internal targets: CLS under 0.05, LCP under 2.0 seconds, and INP under 150 milliseconds.

## Compounding public assets

- [ ] Build an interactive risk-ranking demonstration only after the method is stable, publishable, and validated for public interpretation.
- [ ] Publish citable software or datasets through GitHub and Zenodo when a real reusable output exists.
- [ ] Add documented CSV/JSON downloads or a structured feed once multiple maintained public assets justify machine access.
- [ ] Consider a public API only after the data model is stable and demonstrated users need programmatic access.

## Platform triggers

- [ ] Add analytics only when there is a specific measurement question that Search Console and endpoint/download counts cannot answer.
- [ ] Consider a security-header proxy or hosting migration only when new dependencies or security requirements make header control substantive.
- [ ] Host any future authenticated, confidential, transactional, paid, or commercial application separately from GitHub Pages.

## Explicit non-goals

- React/Next or another client-side framework rebuild for the portfolio.
- Web-font or animation-heavy redesign.
- Generic SEO blog production or content written primarily for keyword volume.
- Unsupported schema properties or “schema stuffing.”
- Multiple analytics/advertising trackers.
- Hosting migration solely to improve a security-header scanner score.
- SaaS, credential, payment, or confidential-data handling on GitHub Pages.
