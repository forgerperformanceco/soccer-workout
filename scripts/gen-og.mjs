// Regenerate og-image.png (1200x630 social share card) for MatchFit.
// Throwaway tooling; run manually. Renders an HTML card with the preinstalled Chromium.
import { readFileSync, writeFileSync } from "node:fs";
import { chromium } from "playwright-core";

// Reuse the generated soccer-ball icon, scaled into the card.
const ballSvg = readFileSync("icon.svg", "utf8");

const html = `<!doctype html><html><head><meta charset="utf8"><style>
  *{margin:0;padding:0;box-sizing:border-box;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif}
  .card{width:1200px;height:630px;display:flex;align-items:center;gap:56px;padding:0 90px;
    background:linear-gradient(135deg,#173762 0%,#0b213d 62%,#0e2a4f 100%);color:#fff;position:relative;overflow:hidden}
  .sweep{position:absolute;left:0;right:0;bottom:0;height:190px;background:rgba(255,255,255,.05);
    border-top-left-radius:100% 90px;border-top-right-radius:100% 90px}
  .mark{width:300px;height:300px;flex:none;filter:drop-shadow(0 18px 40px rgba(0,0,0,.35))}
  .mark svg{width:300px;height:300px}
  .tx{position:relative;z-index:2}
  .kick{font-size:26px;font-weight:600;letter-spacing:.5px;color:#bfd1e9;margin-bottom:14px}
  .wm{font-size:104px;font-weight:800;line-height:.95;letter-spacing:-1px}
  .wm b{color:#5f9ef0}
  .hook{font-size:44px;font-weight:700;margin-top:18px}
  .hook b{color:#5f9ef0}
  .sub{font-size:27px;color:#d7dee7;margin-top:20px;max-width:640px;line-height:1.4}
</style></head><body>
  <div class="card">
    <div class="sweep"></div>
    <div class="mark">${ballSvg}</div>
    <div class="tx">
      <div class="kick">⚽ THE SOCCER PLAYER'S MUSCLE &amp; SPEED SYSTEM</div>
      <div class="wm">Match<b>Fit</b></div>
      <div class="hook">Turn muscle into <b>speed</b>.</div>
      <div class="sub">A macro calculator + 20-week muscle &amp; speed plan. Build like a bodybuilder, move like a winger — add muscle, keep your engine.</div>
    </div>
  </div>
</body></html>`;

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "networkidle" });
await page.locator(".card").screenshot({ path: "og-image.png" });
await browser.close();
console.log("wrote og-image.png");
