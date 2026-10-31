import fs from 'node:fs';
import { feature } from 'topojson-client';
import { geoConicConformal, geoMercator, geoContains, geoBounds } from 'd3-geo';

const topo = JSON.parse(fs.readFileSync('node_modules/world-atlas/countries-50m.json', 'utf8'));
const countries = feature(topo, topo.objects.countries).features.map(f => ({ f, id: String(f.id).padStart(3, '0'), b: geoBounds(f) }));

// Countries with talks, teaching or a research stay
const ON = new Set(['428', '233', '528', '056', '300', '008', '688', '191', '616', '372', '380', '705', '276', '208', '724', '578', '196', '040', '756', '246']);

function countryAt(lon, lat) {
  for (const c of countries) {
    const [[x0, y0], [x1, y1]] = c.b;
    const inLon = x0 <= x1 ? (lon >= x0 && lon <= x1) : (lon >= x0 || lon <= x1);
    if (!inLon || lat < y0 || lat > y1) continue;
    if (geoContains(c.f, [lon, lat])) return c.id;
  }
  return null;
}
function dots(projection, x0, y0, x1, y1, step, isOn) {
  const off = [], on = [];
  let row = 0;
  for (let y = y0; y <= y1; y += step * 0.866, row++) {
    for (let x = x0 + (row % 2 ? step / 2 : 0); x <= x1; x += step) {
      const ll = projection.invert([x, y]);
      if (!ll) continue;
      const id = countryAt(ll[0], ll[1]);
      if (!id) continue;
      (isOn(id) ? on : off).push([x, y]);
    }
  }
  return { off, on };
}
const pathOf = pts => pts.map(([x, y]) => `M${x.toFixed(1)} ${y.toFixed(1)}h0`).join('');
const f1 = v => v.toFixed(1);

function arc([x0, y0], [x1, y1], bend = 0.2) {
  const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, dx = x1 - x0, dy = y1 - y0;
  return `M${f1(x0)} ${f1(y0)}Q${f1(mx - dy * bend)} ${f1(my + dx * bend)} ${f1(x1)} ${f1(y1)}`;
}
function pin(t, x, y) {
  if (t === 'stay') return `<rect class="map-pin map-pin-stay" x="${f1(x - 5.5)}" y="${f1(y - 5.5)}" width="11" height="11" transform="rotate(45 ${f1(x)} ${f1(y)})"/>`;
  return `<circle class="map-pin map-pin-${t}" cx="${f1(x)}" cy="${f1(y)}" r="${t === 'meet' ? 5 : 7}"/>`;
}
// Label placement in em, so offsets scale with the font size
const POS = {
  r: { dx: '0.75em', dy: '0.35em', a: 'start' },
  l: { dx: '-0.75em', dy: '0.35em', a: 'end' },
  u: { dx: '0', dy: '-0.8em', a: 'middle' },
  d: { dx: '0', dy: '1.35em', a: 'middle' },
  ur: { dx: '0.5em', dy: '-0.55em', a: 'start' },
  uR: { dx: '0.4em', dy: '-1em', a: 'start' },
  dr: { dx: '0.5em', dy: '1.1em', a: 'start' },
  ul: { dx: '-0.5em', dy: '-0.55em', a: 'end' },
  dl: { dx: '-0.5em', dy: '1.1em', a: 'end' },
};
function label(name, year, x, y, pos, extra = '') {
  // extra adds classes
  const p = POS[pos];
  const yr = year ? `<tspan class="map-year"> ${year}</tspan>` : '';
  return `<text class="map-label${extra}" x="${f1(x)}" y="${f1(y)}" dx="${p.dx}" dy="${p.dy}" text-anchor="${p.a}">${name}${yr}</text>`;
}

// ---------- Main map ----------
const W = 1000;
const proj = geoConicConformal().rotate([-12, 0]).parallels([38, 60]);
const ring = [];
for (let lon = -11; lon <= 35; lon += 0.5) ring.push([lon, 34.3], [lon, 61]);
for (let lat = 34.3; lat <= 61; lat += 0.5) ring.push([-11, lat], [35, lat]);
proj.fitWidth(W, { type: 'MultiPoint', coordinates: ring });
const ys = ring.map(p => proj(p)[1]);
const yMin = Math.min(...ys), yMax = Math.max(...ys);
const [tx, ty] = proj.translate();
proj.translate([tx, ty - yMin]);
const H = Math.round(yMax - yMin);

const main = dots(proj, 5, 5, W - 5, H - 5, 10, id => ON.has(id));
const places = [
  ['Utrecht', '', 'talk', [5.12, 52.09], 'ur'],
  ['Brussels', '', 'talk', [4.35, 50.85], 'dl'],
  ['Tartu', '', 'talk', [26.72, 58.38], 'r'],
  ['Larissa', '', 'talk', [22.42, 39.64], 'r'],
  ['Tirana', '', 'talk', [19.82, 41.33], 'l'],
  ['Belgrade', '', 'teach', [20.46, 44.79], 'r'],
  ['Zagreb', '', 'teach', [15.98, 45.81], 'd'],
  ['Puławy', '', 'teach', [21.96, 51.42], 'r'],
  ['Dublin', '', 'teach', [-6.26, 53.35], 'u'],
  ['Brescia', '', 'teach', [10.21, 45.54], 'l'],
  ['Naples', '', 'stay', [14.27, 40.85], 'l'],
  ['Maribor', '', 'stay', [15.65, 46.55], 'ur'],
  ['Parma', '', 'meet', [10.33, 44.80], 'dl'],
  ['Berlin', '', 'meet', [13.40, 52.52], 'uR'],
  ['Copenhagen', '', 'meet', [12.57, 55.68], 'l'],
  ['Valencia', '', 'meet', [-0.38, 39.47], 'r'],
  ['Cyprus', '', 'meet', [33.36, 35.17], 'l'],
  ['Oslo', '', 'meet', [10.75, 59.91], 'r'],
  ['Vienna', '', 'meet', [16.37, 48.21], 'ur'],
  ['Lausanne', '', 'meet', [6.63, 46.52], 'l'],
  ['Finland', '', 'meet', [24.94, 60.17], 'r'],
];
const riga = proj([24.11, 56.95]);
let arcs = '', pins = '', labels = '';
for (const [n, yr, t, ll, pos] of places) {
  const [x, y] = proj(ll);
  arcs += `<path class="map-arc map-arc-${t}" d="${arc(riga, [x, y])}"/>`;
  pins += pin(t, x, y);
  labels += label(n, yr, x, y, pos, t === 'meet' ? ' map-label-meet' : '');
}
const byType = t => places.filter(p => p[2] === t).map(p => p[0]).join(', ');
const mainTitle = `Map of Europe with lines from Riga. Talks: ${byType('talk')}. Teaching: ${byType('teach')}. Research stays: ${byType('stay')}. Meetings and training: ${byType('meet')}.`;
const mainSvg = `<svg class="reach-map-main" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="reach-map-title" xmlns="http://www.w3.org/2000/svg">
<title id="reach-map-title">${mainTitle}</title>
<path class="map-dot" d="${pathOf(main.off)}"/>
<path class="map-dot map-dot-on" d="${pathOf(main.on)}"/>
<g>${arcs}</g>
<g>${pins}</g>
<circle class="map-hub-ring" cx="${f1(riga[0])}" cy="${f1(riga[1])}" r="9"/>
<circle class="map-hub" cx="${f1(riga[0])}" cy="${f1(riga[1])}" r="7.5"/>
<g>${labels}${label('Riga', '', riga[0], riga[1], 'dr', ' map-label-hub')}</g>
</svg>`;

// ---------- Latvia panel ----------
const LW = 400, LH = 250;
const lv = countries.find(c => c.id === '428').f;
const lproj = geoMercator().fitExtent([[44, 34], [LW - 44, LH - 34]], lv);
const lvDots = dots(lproj, 4, 4, LW - 4, LH - 4, 7, id => id === '428');
const lr = lproj([24.11, 56.95]);
const lvPlaces = [
  ['Cēsis', '', 'talk', [25.27, 57.31], 'r'],
  ['Jelgava', '', 'talk', [23.72, 56.65], 'd'],
  ['Mērsrags', '', 'talk', [23.12, 57.33], 'u'],
];
let la = '', lp = '', ll = '';
for (const [n, yr, t, c, pos] of lvPlaces) {
  const [x, y] = lproj(c);
  la += `<path class="map-arc map-arc-${t}" d="${arc(lr, [x, y], 0.18)}"/>`;
  lp += pin(t, x, y);
  ll += label(n, yr, x, y, pos);
}
const lvSvg = `<svg class="reach-map-lv" viewBox="0 0 ${LW} ${LH}" role="img" aria-labelledby="reach-map-lv-title" xmlns="http://www.w3.org/2000/svg">
<title id="reach-map-lv-title">Map of Latvia with talks in Riga, Cēsis, Jelgava and Mērsrags</title>
<path class="map-dot" d="${pathOf(lvDots.off)}"/>
<path class="map-dot map-dot-on" d="${pathOf(lvDots.on)}"/>
<g>${la}</g>
<g>${lp}</g>
<circle class="map-hub-ring" cx="${f1(lr[0])}" cy="${f1(lr[1])}" r="9"/>
<circle class="map-hub" cx="${f1(lr[0])}" cy="${f1(lr[1])}" r="7.5"/>
<g>${ll}${label('Riga', '', lr[0], lr[1], 'dr', ' map-label-hub')}</g>
</svg>`;

fs.writeFileSync('map-main.svg', mainSvg);
fs.writeFileSync('map-lv.svg', lvSvg);
console.log('main', W, H, mainSvg.length, 'dots', main.off.length + main.on.length, '| lv', lvSvg.length, 'dots', lvDots.off.length + lvDots.on.length);

// Optional: node build.mjs ../../speaking.html replaces both maps in place
const target = process.argv[2];
if (target) {
  let html = fs.readFileSync(target, 'utf8');
  for (const [cls, svg] of [['reach-map-main', mainSvg], ['reach-map-lv', lvSvg]]) {
    const a = html.indexOf(`<svg class="${cls}"`);
    const b = html.indexOf('</svg>', a) + '</svg>'.length;
    if (a < 0) throw new Error('map not found: ' + cls);
    html = html.slice(0, a) + svg + html.slice(b);
  }
  fs.writeFileSync(target, html);
  console.log('updated', target);
}
