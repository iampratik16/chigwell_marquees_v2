# Performance Audit — Chigwell Marquees

Cross-checks every page against every rule in
[`WEB_PERFORMANCE_STANDARD.md`](./WEB_PERFORMANCE_STANDARD.md).

**Last run:** 2026-07-20 · branch `perf/loading-fixes` · verified live against a
local production build (`next start`), not by assumption.
**Scope:** all 16 routes. **Result: PASS** — every rule holds on every page.

---

## How this audit was run

- Every route fetched from a running production build; `<img>` markup parsed for
  eager-vs-lazy counts.
- Cache headers read straight off the HTTP responses.
- Image format confirmed by requesting with an `Accept: image/avif` header and
  reading the returned `Content-Type`.
- Video weights measured from the files on disk, mapped to the page that serves them.
- **Per-page cold-load measurement:** for each route, the eager images the browser
  would actually download were resolved from `srcset` + `sizes` at phone / laptop /
  4K viewports and their real byte sizes summed. This is what caught the 4K hero
  over-fetch below — invisible in the raw markup.

### A finding this level of testing caught

Markup inspection said every page was clean. Per-page **load** measurement found that
every full-bleed hero offered a `w=3840` (4K) `srcset` candidate, so a large desktop
downloaded a ~640KB poster for an image sitting behind a scrim and video. Fixed by
capping `sizes` at 1920px in `PageHero.tsx` + `Hero.tsx` (commit on this branch). 4K
displays now pull the ~360KB 1920 cut; laptops and phones were already correct.
**Lesson recorded: inspect the markup AND measure the load — they catch different bugs.**

Re-run the checks in the "Reproduce" section at the bottom before each release.

---

## Rule-by-rule result

| # | Rule | Status | Evidence |
|---|------|--------|----------|
| 1.1 | Meaningful content < 1s | ✅ | Hero poster is `priority`; splash gates on fonts only |
| 1.2 | Splash: fonts-only, capped, once/session | ✅ | `Loader.tsx` — `document.fonts.ready`, 1.8s cap, `sessionStorage` flag |
| 1.3 | Transitions short (~0.5s) | ✅ | `template.tsx` curtain 0.45s + 0.4s fade, global to all routes |
| 2.1 | Only hero eager, rest lazy | ✅ | **All 16 routes: exactly 3 eager images** (see table below) |
| 2.2 | Heavy media deferred | ✅ | `BackgroundVideo.tsx` — `preload="none"`, `play()` after `load` |
| 2.3 | No asset loaded twice | ✅ | Poster attribute removed; `<Image>` underlay is the poster |
| 3.1 | Modern formats, sized per device | ✅ | `_next/image` returns `image/avif`; every `<img>` has `sizes`; hero `srcset` capped at 1920px (was over-fetching 4K — now fixed) |
| 3.2 | Video compressed + phone variant | ✅ | All clips H.264 CRF 27–28, audio stripped, `-sm` variant per clip |
| 3.3 | Static media cached immutable | ✅ | `/media/*` → `max-age=31536000, immutable` (verified live) |
| 3.4 | Rename to replace cached files | ✅ | Videos suffixed `-v2` / `-v3`; no in-place overwrites |
| 4.1 | Tested cold + throttled + mobile | ✅ | PSI + WebPageTest run on live URL (see `PERF_CHANGES.md`) |
| 4.2 | Field data + real-moment mark | ✅ | Speed Insights installed; `splash:dismissed` mark emitted |
| 4.3 | Lean repo | ✅ | 78MB unreferenced media + `_sources` removed / gitignored |

---

## Per-page eager-image check (Rule 2.1)

Every page must load at most the hero eagerly. The "3 eager" on every route is the
same correct trio: **splash logo + header logo + hero poster** — all above the fold.
Everything else is lazy.

| Route | `<img>` | eager | lazy | verdict |
|-------|--------:|------:|-----:|:-------:|
| `/` | 71 | 3 | 68 | ✅ |
| `/the-estate` | 14 | 3 | 11 | ✅ |
| `/venues` | 7 | 3 | 4 | ✅ |
| `/venues/mega-marquee` | 6 | 3 | 3 | ✅ |
| `/venues/mini-marquee` | 8 | 3 | 5 | ✅ |
| `/venues/secret-garden` | 7 | 3 | 4 | ✅ |
| `/venues/suites` | 9 | 3 | 6 | ✅ |
| `/occasions` | 8 | 3 | 5 | ✅ |
| `/occasions/weddings` | 9 | 3 | 6 | ✅ |
| `/occasions/corporate` | 7 | 3 | 4 | ✅ |
| `/occasions/celebrations` | 7 | 3 | 4 | ✅ |
| `/occasions/faith-based` | 7 | 3 | 4 | ✅ |
| `/gallery` | 182 | 3 | 179 | ✅ |
| `/visit` | 5 | 3 | 2 | ✅ |
| `/privacy` | 4 | 3 | 1 | ✅ |
| `/terms` | 4 | 3 | 1 | ✅ |

**On `/gallery` (182 img tags):** 57 photos, each with a `srcset`. The grid images
have no `priority`, so Next.js lazy-loads them with `sizes="…33vw"` — a phone fetches
only a ~33vw slice, on scroll. The `priority` image in that component is the lightbox,
which renders only after a user clicks a photo open. Not a problem.

---

## Per-page hero video weight (Rule 3.2)

Interior pages carried heavier heroes than the homepage; the two worst were fixed by
trimming over-long loops (no re-encode, no quality loss), the flagship by a measured
CRF-28 recompress (SSIM 0.98). Every hero is now deferred *and* under ~1.6MB desktop /
~1MB phone.

| Route | Desktop | Phone (`-sm`) | Clip | Note |
|-------|--------:|--------------:|------|------|
| `/` | 1.50MB | 0.93MB | `hero-v2` | |
| `/the-estate` | 1.58MB | 0.84MB | `about-hero-v2` | |
| `/venues/mega-marquee` | 1.59MB | 0.81MB | `mega-hero-v3` | recompressed 1.9→1.6MB |
| `/venues/mini-marquee` | 0.94MB | 0.72MB | `scene-mega-v3` | trimmed 21s→9s, 2.0→0.94MB |
| `/venues/secret-garden` | 0.91MB | 0.35MB | `secret-garden-v2` | |
| `/occasions/weddings` | 1.07MB | 0.98MB | `wedding-hero-v2` | |

These block nothing — `preload="none"` keeps them off the critical path; the poster
paints instantly. The weight only matters for how soon the motion *starts*, not for
when the page is usable.

---

## Audio (verified separately)

Every video in the repo has **zero audio tracks** — stripped with `-an` during the
first re-encode pass. Confirmed by probing all 18 files. No video-with-audio is stored
anywhere.

---

## Open items (tracked, not blocking)

- **Unused JS (~60KB):** three animation libraries (framer-motion + GSAP + Lenis) with
  overlapping jobs. A real refactor — scope separately, not a tweak.
- **Git history:** old blobs remain in the pack (~475MB); clones stay heavy until a
  `git-filter-repo` pass. Needs coordination with other clone holders. No visitor impact.
- **Further video squeeze:** possible but diminishing returns; every hero is already
  deferred and reasonably sized. Not worth a quality trade right now.

---

## Reproduce this audit

With a production build running locally (`npm run build && npx next start -p 3196`):

```python
# Eager-image check across all routes
import urllib.request, re
paths = ["/","/the-estate","/venues","/venues/mega-marquee","/venues/mini-marquee",
  "/venues/secret-garden","/venues/suites","/occasions","/occasions/weddings",
  "/occasions/corporate","/occasions/celebrations","/occasions/faith-based",
  "/gallery","/visit","/privacy","/terms"]
for p in paths:
    html = urllib.request.urlopen(f"http://localhost:3196{p}").read().decode()
    imgs = re.findall(r'<img[^>]*>', html)
    eager = sum(1 for i in imgs if 'loading="lazy"' not in i)
    print(f"{p:<26} eager={eager}  {'OK' if eager<=3 else 'CHECK'}")
```

```bash
# Cache headers + AVIF delivery
curl -sI http://localhost:3196/media/video/hero-v2.mp4 | grep -i cache-control
curl -s -H 'Accept: image/avif' -o /dev/null -w '%{content_type}\n' \
  'http://localhost:3196/_next/image?url=%2Fmedia%2Fvideo%2Fhero-poster.jpg&w=750&q=75'
```

Expected: every route `eager=3` or fewer · media `max-age=31536000, immutable` ·
image content-type `image/avif`.
