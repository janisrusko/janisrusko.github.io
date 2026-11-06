# Link-preview card

`assets/og-janis-rusko-2026-11.jpg` (1200 x 630) is the image messengers and social sites show for the site.

To rebuild it:

1. In `../reach-map`, run `npm install` and `node build.mjs`. This writes `map-main.svg`.
2. Paste that SVG into `card.template.html` where the MAP comment is.
3. Put JetBrains Mono 500 (latin and latin-ext woff2, from `@fontsource/jetbrains-mono`) in `fonts/`. The name uses Inter Display Bold.
4. Open the page at 1200 x 630, screenshot it, and save as JPEG at quality 88.

Keep the name and Riga inside x 140 to 1060: messengers crop the sides. Give the new file a new name and update `og:image` on all four pages, so cached previews refresh.
