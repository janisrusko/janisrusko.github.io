# Lighthouse baseline

- Measured: 2026-08-17
- Target: local production files served over `http://127.0.0.1:4173/`
- Lighthouse: 13.4.1
- Chrome: 151.0.7922.138
- Throttling: Lighthouse default simulated mobile throttling; desktop preset for desktop runs

Three independent runs were made for each mode. Values below are medians; parentheses show the observed range.

Equivalent commands were run three times per mode with a fresh Lighthouse Chrome session:

```sh
pnpm dlx lighthouse@13.4.1 http://127.0.0.1:4173/ \
  --quiet \
  --chrome-flags="--headless --no-sandbox --disable-gpu" \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json \
  --output-path=/tmp/lighthouse-mobile.json

pnpm dlx lighthouse@13.4.1 http://127.0.0.1:4173/ \
  --preset=desktop \
  --quiet \
  --chrome-flags="--headless --no-sandbox --disable-gpu" \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json \
  --output-path=/tmp/lighthouse-desktop.json
```

| Mode | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Mobile | 100 | 100 | 100 | 100 | 883 ms (814–888) | 918 ms (903–921) | 0 ms (0–15.5) | 0 (0–0.000063) |
| Desktop | 100 | 100 | 100 | 100 | 219 ms (215–234) | 246 ms (245–253) | 0 ms | 0 |

## Interpretation

- This is a synthetic regression baseline, not Chrome field data or a ranking guarantee.
- The optimized Open Graph image is metadata-only and does not contribute to the normal page render.
- Visual styles now live in a shared stylesheet; the small inline theme bootstrap prevents a colour-theme flash before the stylesheet renders.
- The local server's document-latency observation is not evidence about GitHub Pages response time.
- Use Search Console Core Web Vitals for field evidence when enough visits exist, and compare later Lighthouse releases with the same environment and repeated-run method.

## Expansion check — 2026-09-08

A single mobile regression run followed the addition of the body-of-work and speaking pages, the simplified homepage and shared site assets. This is a release check rather than a replacement for the repeated-run baseline above.

| Page | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Homepage | 100 | 100 | 100 | 100 | 1.0 s | 1.0 s | 0 ms | 0 |
| Body of work | 100 | 100 | 100 | 100 | 1.2 s | 1.2 s | 0 ms | 0 |
| Speaking and teaching | 100 | 100 | 100 | 100 | 1.1 s | 1.1 s | 0 ms | 0 |
