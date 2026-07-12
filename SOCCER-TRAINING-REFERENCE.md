# MatchFit — Soccer Training Brain

The domain reference for **MatchFit**: the evidence base and the training thesis,
as implemented in this app. This is the soccer equivalent of the old golf
`CLUBHEAD-SPEED-REFERENCE.md`. Load this when you need to change the training
model, the Speed & Power day, the jump test, or any performance claim.

> **Athlete this app is built for (the owner's son):** 16 years old, plays
> **wing / midfield**. Goal: **add muscle without losing his game** — keep his
> top speed, acceleration, change of direction, and aerobic engine while he puts
> on lean mass. Everything below is filtered through that goal.

---

## 1. The thesis

A winger/box-to-box mid lives on **acceleration, top speed, change of direction,
repeated-sprint ability, and a big aerobic engine**. Adding muscle can *help*
those (more force to put into the ground) or *hurt* them (dead weight, lost
mobility, interference from junk conditioning). The whole design exists to add
muscle on the **helpful** side of that line:

- **Heavy, low-rep strength + hypertrophy** to build force capacity and lean mass.
- **A weekly Speed & Power day** (jumps → sprints) so the new muscle stays fast.
- **On-pitch play / small-sided games** on "rest" days to protect the engine.
- **Waves + deloads + a peak** so it's periodized, not just "lift more."

"Build like a bodybuilder, move like a winger — add muscle, keep your engine."

---

## 2. Evidence base

Three papers the owner supplied (PDFs archived in `research/`). Findings are
paraphrased; numbers are quoted as reported. Note the honesty caveats — this is
a young evidence base and we don't overclaim.

### 2.1 Jump training in soccer players — Thapa et al. 2025 (scoping review)
`research/Thapa-2025-jump-training-soccer-scoping-review.pdf` ·
*Hum Mov* 2025;26(1):15–41 · doi:10.5114/hm/199886

- **What it is:** systematic scoping review of jump (plyometric) training in
  soccer players; 77 study-arms across youth and adult, male and female.
- **What jump training moved (≥1 outcome across studies):** vertical **jump
  performance**, **linear sprinting**, **repeated-sprint ability**, **change of
  direction speed**, **kicking velocity**, endurance, balance, maximal strength,
  and **body composition**.
- **Speed of adaptation:** change-of-direction speed and jump variables can
  respond **rapidly (2–3 weeks)** to the stimulus.
- **Typical effective dose reported:** durations 3–96 weeks, **1–2 sessions per
  week**, **~80 jumps/session or ~140–240 jumps/week**, done with **maximal
  voluntary intent**.
- **Honesty caveat:** ~40% of studies were non-randomised, jump groups were
  small (often 10–13 participants), and publication bias toward significant
  findings is likely. The authors explicitly say robust "optimal regimen"
  recommendations **cannot yet** be made. So: jumps are well-justified as the
  lead stimulus, but we present them as *strongly supported*, not *proven*.

**→ How MatchFit uses it:** the **Speed & Power day leads with jumps** (CMJ,
broad jump, lateral bound) then **max-velocity sprints**. Session jump volume is
~50–70 max-intent contacts (well under the ~80 ceiling), run **1×/week as the
dedicated day plus lighter power primers on lift days** ≈ the reviewed 1–2
sessions / 140–240 jumps-per-week band. Every rep is cued **max intent, stop
when reps slow** — matching the "maximal voluntary intent" the dose depends on.

### 2.2 Core-stability training — Rodríguez et al. 2025 (meta-analysis)
`research/Rodriguez-2025-core-stability-soccer-meta-analysis.pdf` ·
Registration CRD42023461634

- **What it is:** systematic review + meta-analysis, **37 studies, 1174 soccer
  players (9–30 y)**.
- **Results:** core-stability training improved **vertical jump +1.66 cm**
  (95% CI 0.53–2.79) and **agility** — t-drill **−0.71 s** (CI −1.27, −0.14),
  Illinois **−0.56 s** (CI −1.05, −0.06). **No** significant effect on **30-m
  sprint** (−0.04 s) or **20-m sprint** (−0.05 s).
- **Conclusion:** core training helps **jumping and agility/change-of-direction**
  — **not straight-line speed**.

**→ How MatchFit uses it:** this is why the plan keeps rotational/anti-rotation
core work (Pallof, chops, rotational + overhead med-ball throws — the `🌀`
tag) **but frames it as agility, change-of-direction and jump support, never as
a way to get faster in a straight line.** Straight-line speed is trained by
**actual sprinting** (the max-velocity sprint drill), which is non-negotiable
in the Speed & Power day. We do **not** claim core work adds top speed.

### 2.3 Soccer training & fitness in adolescents — Hammami et al. 2018
`research/Hammami-2018-soccer-training-adolescent-fitness.pdf` ·
*J Sport Health Sci* · CC BY-NC-ND

- **What it is:** 41 adolescent boys (**~15.9 y**), trained soccer players vs
  untrained; plus small-sided-game intensity and an 8-week training block.
- **Results:** trained adolescents had markedly **higher aerobic fitness,
  sprint, jump power and balance** than untrained. **Small-sided games (6v6,
  4v4) elicited ~85% of peak heart rate** — high intensity, high enjoyment.
  8 weeks of twice-weekly soccer improved **balance**, but was **too short** to
  produce between-group changes in sprint, jump, or aerobic fitness.

**→ How MatchFit uses it:** the **"Rest / Play" days are real training** —
small-sided games run at ~85% HRpeak, which is exactly the aerobic + repeated-
sprint stimulus that **protects the engine while bulking**. And because
meaningful fitness change takes **longer than 8 weeks**, the app's **20-week**
horizon (with waves + a peak) is the right timescale, not a 4–6 week quick fix.

---

## 3. How the app implements this (mapping)

| App surface | Design | Evidence anchor |
|---|---|---|
| **Speed & Power day** (`035`) | Jumps lead → sprints finish; max intent, full rest, stop on slow-down | Thapa 2025 (jump dose + intent) |
| **Sprint drill** (`sprintDose`) | Flying-20 m max-velocity sprints, ramp 3→4→5 | Straight-line speed needs sprinting, not core (Rodríguez 2025) |
| **🌀 rotational/core work** | Kept as agility / jump / kicking support | Rodríguez 2025 (+VJ, +agility; no sprint effect) |
| **Jump Test** (`060`) | Vertical jump (inches), every 2 weeks, best of 3 | Jump is sensitive (responds in 2–3 wks) & trainable; #1 field power marker |
| **Rest / Play days** | On-pitch play / small-sided games as conditioning | Hammami 2018 (SSG ≈ 85% HRpeak) |
| **20-week season + waves** | Long horizon, periodized, deloads, 2-wk peak | Hammami 2018 (>8 wks needed); concurrent-training best practice |
| **Fuel → Lean Bulk default** | Modest surplus, high protein, for a growing teen | Add-muscle-without-fat thesis |

---

## 4. Design decisions & rationale

- **Vertical jump as the headline test**, not sprint time. A winger cares most
  about sprint speed, but vertical jump (a) is the #1 easily-measured field
  predictor of power/sprint, (b) responds fast so the 2-week retest shows
  movement, and (c) is **higher-is-better**, which let us reuse the golf app's
  entire PR/trend/baseline math with zero risk. **Sprint-time (a 30–40 m test,
  lower-is-better) is the top candidate to add next** for the winger's top-end.
- **Internal storage keys unchanged.** All localStorage keys stay `ff_*` and the
  profile key stays `"fairwayfuel"`. They're invisible to users; renaming buys
  nothing and risks migration/sync bugs.
- **No overclaiming.** Per the repo's evidence discipline, we don't attach
  specific "+X mph / +Y%" numbers to user-facing copy. The evidence above is
  strong enough to justify the *design*; it is not a marketing guarantee.

---

## 5. Open questions / next research to feed the brain

1. **Second weekly plyo/jump dose?** Thapa supports up to 2 sessions/week — the
   power primers on lift days partly cover this; worth formalising.
2. **Add a sprint-time test** (30–40 m) alongside vertical jump for top-end speed.
3. **Maturation & load management for a 16-year-old** — peak height velocity,
   growth-related injury risk (Osgood-Schlatter, apophysitis), and how to scale
   plyometric/sprint volume around growth spurts. None of the three papers cover
   this; **this is the most important gap to fill next.**
4. **Concurrent-training interference** (hypertrophy + high aerobic volume) —
   the design minimises it (heavy strength + explosive + separated play), but a
   dedicated concurrent-training source should be ingested to confirm dosing.
5. **Position-specific profiling** (winger vs central mid) — acceleration &
   repeated-sprint bias for wide players.

---

## Further reading / sources

- Thapa RK, Garcia-Carrillo E, Sortwell A, Byrne PJ, Afonso J, Ramirez-Campillo R.
  *Biological and physical fitness adaptations in soccer players after jump
  training: a systematic scoping review.* Hum Mov. 2025;26(1):15–41.
- Rodríguez S, Hernández-Álvarez ED, León-Prieto C. *Effects of core stability
  training on physical performance in soccer players: systematic review and
  meta-analysis.* (Reg. CRD42023461634.)
- Hammami A, Randers MB, Kasmi S, et al. *Effects of soccer training on
  health-related physical fitness measures in male adolescents.* J Sport Health
  Sci. (CC BY-NC-ND.)

_PDFs archived in `research/`. Findings paraphrased; wording is original._
