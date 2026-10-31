# Reach map

Builds the dot map at the top of `speaking.html` from Natural Earth country shapes (via `world-atlas`).

To add a place, edit the `places` list in `build.mjs` (name, year left empty, type, [lon, lat], label position) and add the country's ISO numeric code to `ON`. Types: `talk`, `teach`, `stay`, `meet`. Then:

```
npm install
npm run build
```

This rewrites both map SVGs in `speaking.html`. Update the country count in the figure caption by hand.
