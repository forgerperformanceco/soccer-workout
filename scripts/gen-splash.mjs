// Generate the iOS PWA launch splash screens (splash/apple-splash-WxH.png) for
// MatchFit — navy gradient, centered soccer-ball mark, wordmark + tagline.
// Throwaway tooling; run manually with the preinstalled Chromium.
import { readFileSync, readdirSync } from "node:fs";
import { chromium } from "playwright-core";

const ballSvg = readFileSync("icon.svg", "utf8");
const files = readdirSync("splash").filter(f => /^apple-splash-\d+x\d+\.png$/.test(f));

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
for (const file of files) {
  const [w, h] = file.replace("apple-splash-", "").replace(".png", "").split("x").map(Number);
  const mark = Math.round(Math.min(w, h) * 0.30);
  const wm = Math.round(Math.min(w, h) * 0.085);
  const sub = Math.round(Math.min(w, h) * 0.032);
  const html = `<!doctype html><html><head><meta charset="utf8"><style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif}
    html,body{width:${w}px;height:${h}px;overflow:hidden}
    .s{width:${w}px;height:${h}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${Math.round(mark*0.14)}px;
       background:radial-gradient(120% 80% at 50% 32%, #173762 0%, #0b213d 55%, #071628 100%);color:#fff}
    .mark{width:${mark}px;height:${mark}px;filter:drop-shadow(0 ${Math.round(mark*0.06)}px ${Math.round(mark*0.13)}px rgba(0,0,0,.4))}
    .mark svg{width:${mark}px;height:${mark}px}
    .wm{font-size:${wm}px;font-weight:800;letter-spacing:-1px;margin-top:${Math.round(mark*0.10)}px}
    .wm b{color:#2e8bff}
    .sub{font-size:${sub}px;font-weight:600;color:#9fb6d6;margin-top:${Math.round(sub*0.4)}px}
  </style></head><body>
    <div class="s"><div class="mark">${ballSvg}</div>
    <div class="wm">Match<b>Fit</b></div>
    <div class="sub">⚽ Muscle &amp; Speed</div></div>
  </body></html>`;
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.locator(".s").screenshot({ path: "splash/" + file });
  await page.close();
}
await browser.close();
console.log("wrote " + files.length + " splash screens");
