# MatchFit — repo guide

Vanilla-JS PWA (no framework, no npm build for the site itself), served as-is
from the repo root.

> **This repo is MatchFit — a soccer strength & athleticism app**, converted
> from the "Yardsmith" golf app (July 2026). It's built for a 16-year-old
> winger/midfielder: **add muscle without losing his game** (speed, agility,
> aerobic engine). The **domain brain is `SOCCER-TRAINING-REFERENCE.md`**
> (thesis + the research base in `research/`); read it before changing the
> training model, the Speed & Power day, or the jump test. The older
> `YARDSMITH-BRAIN.md`, `DESIGN-CHANGES.md`, `CLUBHEAD-SPEED-REFERENCE.md` and
> the golf `*.md` docs are **legacy history** — accurate about the build system
> and architecture, but their product/training content is golf and superseded.
> No public domain is configured yet (see Deploy).

## Where to edit (the one rule that matters)

**Edit `src/` — never the generated files at the repo root.**

`index.html`, `app.js`, `styles.css`, and `sw.js` in the repo root are BUILD
OUTPUTS (each carries a `GENERATED` header). They are committed so Pages and
Capacitor can serve them with zero build infrastructure, but any hand edit to
them is overwritten by the next build.

| You want to change… | Edit… |
|---|---|
| App behavior / a feature | `src/js/app/*.js` (numbered modules, one per feature area) |
| Code that must run outside the IIFE (SW registration) | `src/js/global/*.js` |
| Styles | `src/css/styles.css` (above the GENERATED-DARK markers) |
| Page markup, meta tags, script tags | `src/index.template.html` |
| Service-worker logic | `src/sw.template.js` |

Then rebuild:

```
node scripts/build.mjs            # once
node scripts/build.mjs --watch    # rebuild on every src/ change
```

The build concatenates `src/js/app/*.js` (sorted by filename) into a single
IIFE — the modules share one scope, exactly like the old monolith, so
function declarations in any module are visible to all others. `src/js/global/*.js`
is appended after the IIFE. `{{V}}` placeholders in the templates become a
10-char content hash, so **cache busting is automatic**: no manual
`yardsmith-vNNN` service-worker bumps, no `?v=` pin edits for app.js/styles.css.
(cloud-sync.js and coach.js keep their manual `?v=` pins in
`src/index.template.html` + `src/sw.template.js` — bump those when editing them.)

## Dark theme

The dark theme is GENERATED into `src/css/styles.css` between the
`GENERATED-DARK` markers. After any CSS change:

```
python3 scripts/gen-dark-theme.py && node scripts/build.mjs
```

Hand-pinned dark overrides live in the `CORE` list inside
`scripts/gen-dark-theme.py` — edit there, not in the CSS block.

## Deploy

**Pages deploy is ENABLED; the Supabase deploy is still disabled.** `deploy.yml`
publishes to GitHub Pages at **https://forgerperformanceco.github.io/soccer-workout/**
on every push to `main` (no `CNAME`, so the default github.io domain). The golf
`deploy-functions.yml` (Supabase) is still `workflow_dispatch` only — it targets
the original Yardsmith backend and needs secrets this repo doesn't have; set up
your own Supabase project + secrets before re-enabling it. The AI coach and
cloud login/sync stay inert until that backend exists.

When re-enabled, deploy rsync-stages the repo root (minus src/, scripts/, docs,
native projects) and publishes to Pages. There is no build step in CI — **the
committed build outputs are what ships**, so always rebuild and commit them
together with your src/ change.

Native shells: `node scripts/build-www.mjs` gathers the served files into
`www/` for Capacitor (`npx cap sync`).

## Testing

Playwright harness lives in the session scratchpad (see DESIGN-CHANGES.md for
patterns). Tests spin up a local `http.Server` over the repo root and drive the
BUILT output — rebuild before testing. `playwright-core` is a devDependency;
Chromium is pre-installed at `/opt/pw-browsers/`.

## Data

All state is localStorage `ff_*` keys; `lsGet`/`lsSet` (in
`src/js/app/020-persistence…`) dispatch `ff-data-changed`, which
`cloud-sync.js` listens to for Supabase blob sync. Adding a new `ff_*` key that
should roam? Add it to `KEYS` in `cloud-sync.js` and bump its `?v=` pin.

## Parallel sessions (multiple Claude chats on this repo)

The owner often runs more than one session against `main` at once. Git's
non-fast-forward rejection is the safety net — respect it:

- **Never force-push.** If `git push` is rejected, `git fetch origin main`,
  `git rebase origin/main`, resolve, **rebuild** (`node scripts/build.mjs`),
  then push. Never `--force` / `--force-with-lease` around a rejection.
- **Conflicts in generated outputs** (`index.html`, `app.js`, `styles.css`,
  `sw.js`, `www/`) are never resolved by hand: take either side, then rebuild —
  the build regenerates truth from `src/`.
- **Push early, push small.** Long-lived local work is what makes rebases hurt.
- **Record training/product decisions in `SOCCER-TRAINING-REFERENCE.md`** (the
  domain brain) — the repo docs are the only memory shared between sessions.
  A decision that lives only in one chat doesn't exist for the next.
- Branding note: the app is **MatchFit** (converted from the Yardsmith golf app
  Jul 2026; Yardsmith itself was renamed from FairwayFuel). The localStorage
  profile key stays `"fairwayfuel"` and all `ff_*` keys keep their names —
  **never rename stored keys** (invisible to users, and renaming breaks
  cloud-sync/migrations). The user-facing brand is set in
  `src/index.template.html`, `manifest.webmanifest`, and `package.json`.
