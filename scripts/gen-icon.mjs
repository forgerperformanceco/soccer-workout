// Generate MatchFit's soccer-ball icon.svg and rasterize it to the app PNGs.
// Throwaway tooling; run manually. Uses the preinstalled Chromium to screenshot.
import { writeFileSync } from "node:fs";
import { chromium } from "playwright-core";

const CX = 256, CY = 258, R = 150;
const poly = (cx, cy, r, rot, n = 5) =>
  Array.from({ length: n }, (_, i) => {
    const a = rot + (i * 2 * Math.PI) / n;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
const path = pts => "M" + pts.map(p => p.map(v => v.toFixed(1)).join(",")).join(" L") + " Z";

const up = -Math.PI / 2;
const central = poly(CX, CY, 55, up);              // central black pentagon (points up)
// Outer pentagons + seams, aligned with each central-pentagon vertex direction.
let outers = "", seams = "";
for (let k = 0; k < 5; k++) {
  const a = up + (k * 2 * Math.PI) / 5;
  const ox = CX + 116 * Math.cos(a), oy = CY + 116 * Math.sin(a);
  outers += `<path d="${path(poly(ox, oy, 34, a + Math.PI))}" fill="#111c15"/>`;
  const vx = CX + 55 * Math.cos(a), vy = CY + 55 * Math.sin(a);   // central vertex
  seams += `<line x1="${vx.toFixed(1)}" y1="${vy.toFixed(1)}" x2="${ox.toFixed(1)}" y2="${oy.toFixed(1)}" stroke="#111c15" stroke-width="7"/>`;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#176236"/>
      <stop offset="0.65" stop-color="#0b3d22"/>
      <stop offset="1" stop-color="#19a84e"/>
    </linearGradient>
    <radialGradient id="ball" cx="0.38" cy="0.32" r="0.8">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#dbe4dd"/>
    </radialGradient>
    <clipPath id="ballclip"><circle cx="${CX}" cy="${CY}" r="${R}"/></clipPath>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#bg)"/>
  <path d="M0 372 Q256 316 512 372 L512 512 L0 512 Z" fill="#ffffff" opacity="0.06"/>
  <circle cx="${CX}" cy="${CY}" r="${R}" fill="url(#ball)"/>
  <g clip-path="url(#ballclip)">
    ${seams}
    <path d="${path(central)}" fill="#111c15"/>
    ${outers}
  </g>
  <circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="#0b3d22" stroke-opacity="0.25" stroke-width="6"/>
</svg>
`;
writeFileSync("icon.svg", svg);

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const sizes = { "icon-192.png": 192, "icon-512.png": 512, "apple-touch-icon.png": 180, "logo-dark-mark.png": 256 };
for (const [file, size] of Object.entries(sizes)) {
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  await page.setContent(
    `<style>*{margin:0;padding:0}html,body{width:${size}px;height:${size}px}svg{width:${size}px;height:${size}px;display:block}</style>` + svg,
    { waitUntil: "networkidle" });
  await page.locator("svg").screenshot({ path: file, omitBackground: true });
  await page.close();
}
await browser.close();
console.log("wrote icon.svg +", Object.keys(sizes).join(", "));
