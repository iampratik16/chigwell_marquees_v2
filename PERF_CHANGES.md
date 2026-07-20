# Performance Fixes — What Changed and Why

Branch: `perf/loading-fixes` (4 commits, unmerged — main untouched).
Companion to `PERFORMANCE_REPORT.md` (the diagnosis); this file is the record of
what was actually changed, with measured results.

Test deployment: https://chigwell-marquees-v2-psi.vercel.app
(a throwaway Vercel project under shreyasgeetha's personal account — NOT the
client's production project; delete it when comparison testing is done).

---

## The problem, measured

The site was not slow — it was **hidden while ready**. On the live deployment,
the homepage finished loading at **~0.3s** but the splash screen kept it
invisible until **5.4s**, on every single visit. On top of that, every media
asset was served with `Cache-Control: max-age=0`, so returning visitors
re-downloaded ~3MB each time, and every internal click played ~1.65s of
curtain animation.

## Results

| Metric | Before | After |
|---|---|---|
| Content visible, first visit | 5.4s | ~1.0s (fast net) / ~3.0s (slow 4G phone) |
| Content visible, repeat visit | 5.4s again | ~0.1s (splash skipped) |
| Repeat-visit download (WebPageTest) | ~3MB | **103KB** |
| Hero video on phones | 1.5MB | 0.93MB |
| Route-change curtain | ~1.65s | ~0.55s |
| PSI score (mobile / desktop) | 72 / 89 | 77 / 96 |
| Lighthouse TBT / CLS | 30ms / 0 | 0ms / 0 |

Known metric artifact: lab LCP still reads high because Chrome excludes
full-viewport hero images from LCP candidates and scores the splash logo's
fade-in instead. The honest "when did the user see the site" number is the
`splash:dismissed` performance mark (visible in PSI's User Timing section).

---

## Commit 1 — `119bbd7` "reveal the site when it's ready, not 5s later"

1. **`components/site/Loader.tsx` (the main fix)**
   - Splash now waits on `document.fonts.ready` only — previously it waited on
     window `load`, which includes every below-fold image and the hero video.
   - Hard cap 1.8s (was 3.6s), min 400ms, snappier counter easing, shorter
     hold/exit animations.
   - Runs **once per browser session** (`sessionStorage` flag `tcm-splash-seen`);
     reloads and return visits skip straight to the site with a 0.25s fade.
   - Emits `performance.mark("splash:dismissed")` when the site becomes
     visible — our real "loaded" metric, visible in DevTools and PSI.

2. **`next.config.ts` — cache headers**
   - `/media/*` → `public, max-age=31536000, immutable`.
   - Brand PNGs (`logo.png`, `logo-footer.png`, `cursor-crown.png`) → 1 day +
     stale-while-revalidate.
   - **RULE THIS CREATES: never overwrite a file in `public/media/` — rename it**
     (visitors keep the old cached copy for up to a year). This is why the
     videos are suffixed `-v2`.

3. **`components/ui/BackgroundVideo.tsx`**
   - `preload="none"` and no `autoPlay` attribute; `play()` is called only
     after window `load`. Zero video bytes move during the critical load.
   - Dropped the `poster` attribute — both call sites (Hero, PageHero) already
     paint the same frame via an optimized `<Image priority>`; the raw poster
     JPG was being downloaded twice (~245KB → ~110KB).

4. **`app/template.tsx`** — route curtain 0.8s→0.45s, content fade delay
   0.25s→0.1s, duration 0.6s→0.4s.

5. **Below-fold images no longer `priority`** — `IntroStatement.tsx`,
   `TwoSpaces.tsx`; `Logo.tsx` takes `priority` as an opt-in prop and only
   `Header.tsx` passes it (the footer logo now lazy-loads).

## Commit 2 — `bd09cbb` "compress hero videos + serve small-screen variants"

- All 9 clips re-encoded (H.264 CRF 27, audio stripped, `+faststart`):
  video folder 18MB → 13.5MB. Where re-encoding gained <4%, original bytes
  were kept under the new name (no quality loss for no gain).
- Every clip gained a `<name>-sm.mp4` sibling (~480p, CRF 28, 7.6MB total).
  `BackgroundVideo` swaps it in on viewports <768px — **convention: the pair
  must exist for every clip added in future.**
- Verified via Lighthouse network logs: mobile emulation fetches only the
  `-sm` file, desktop only the full file.
- `lib/media.real.ts` VIDEO map points at the `-v2` names.

## Commit 3 — `d2f9774` "Vercel Speed Insights"

- `@vercel/speed-insights` package + `<SpeedInsights />` in `app/layout.tsx`.
- Gives real-user Core Web Vitals (LCP/CLS/INP/TTFB per page, device,
  country) in the Vercel dashboard.
- **ACTION REQUIRED: it no-ops until Speed Insights is toggled on in the
  Vercel project settings** of whichever project hosts the site.

## Commit 4 — `7787da9` "repo hygiene + image compression"

- Deleted 107 files (14.8MB) from `public/media` that no code references —
  leftovers from the WordPress import. Verified both directions: nothing
  referenced is missing, nothing remaining is unreferenced (except the
  `-sm.mp4` files, referenced by naming convention).
- `_sources/` (63MB of WP-export material) untracked and gitignored — it was
  being pushed to GitHub and uploaded on every deploy for nothing.
- `.playwright-mcp/` (test artifacts) gitignored.
- TwoSpaces crossfade panels: `quality={65}` (new 65 tier in
  `next.config.ts`) — they render behind dark gradient scrims where AVIF
  artifacts are invisible; PSI flagged them as the biggest compressible
  images on the page.

---

## Not done (known, deliberately deferred)

- **Unused JS (~60KB):** the site ships three animation libraries
  (framer-motion + GSAP + Lenis) with overlapping jobs. Consolidating is a
  proper refactor, not a tweak — scope separately.
- **Git history rewrite:** old media blobs remain in history (~475MB pack);
  clones stay heavy until a `git-filter-repo` pass. Needs coordination with
  other clone holders. Zero visitor impact.
- **SEO 69 on the test URL is intentional** — `app/robots.ts` blocks
  `*.vercel.app` from indexing so previews never compete with the real
  domain. Scores 100 on a production domain.

## Rules for whoever touches this next

1. Replacing a file in `public/media/`? **Rename it** (immutable caching).
2. Adding a background video? Encode both `<name>.mp4` and `<name>-sm.mp4`.
3. Never gate anything on window `load` — it waits for all media.
4. Below-fold images never get `priority`.
5. Judge speed by the `splash:dismissed` mark and Speed Insights field data,
   not by lab LCP (splash-logo artifact, see above).
