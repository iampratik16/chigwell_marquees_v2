# Chigwell Marquees — Load Performance Report

Repo: `chigwell_marquees_v2` · Stack: Next.js 16 + React 19 + framer-motion + gsap + lenis
Measured directly from the codebase (file sizes, video codecs, load code).

---

## 1. Why our testing didn't catch the slowness (LTE vs Wi-Fi)

Your instinct is right. Three things hid it:

1. **We almost certainly tested on Wi-Fi / localhost.** On Wi-Fi a 1.5MB hero video
   arrives in well under a second. On real LTE (~5–12 Mbps, higher latency) the same
   file is 1–3s, and the 6.4MB About-page video is 5–10s+. If we ran `next dev` on
   localhost there is **zero network transfer at all** — bandwidth is effectively
   infinite, so nothing feels slow.

2. **The page *looks* loaded before it *is* loaded.** Every hero shows a poster JPG
   instantly, then the video downloads behind it. Visually the page is "done" in ~1s,
   so a quick eyeball test passes — while 1.5–6.4MB is still streaming in the
   background and stealing bandwidth from everything else. "Looks loaded" ≠ "network
   idle."

3. **Next.js image optimization is cached after the first hit.** The first-ever
   visitor to a page pays for the server to transcode a 2MB source JPG into WebP/AVIF.
   The second visitor (us, testing twice) gets it from cache and sees it fast. We
   tested the warm path, real first-time users hit the cold path.

**To reproduce the CTO's experience:** open the site on a phone on mobile data (not
Wi-Fi), OR in Chrome DevTools → Network tab → throttle to "Fast 4G" / "Slow 4G", in an
incognito window (cold cache), against the **production build** (`npm run build && npm
run start`), not `next dev`.

---

## 2. Video format

- **Container/codec:** MP4 / **H.264 (AVC)**, AAC audio, muted, looping, `playsInline`.
- **Resolution:** 1280px wide (desktop-grade) — the *same* file is sent to a phone as
  to a 4K monitor. No smaller mobile variant exists.
- **No WebM / AV1 / HEVC alternatives** — only one H.264 MP4 per clip, so no smaller
  modern-codec fallback for capable browsers.
- **Delivery:** served as plain static files from `/public/media/video/`, **not**
  streamed/adaptive. Whole file downloads at once.
- **Loading attribute:** `preload="auto"` on every `<video>` → the browser downloads
  the **entire** clip on load, not just enough to start.

### Critical finding
`about-hero.mp4` (6.4MB) is **NOT faststart-encoded** (its `moov` atom is at the end of
the file). A browser cannot begin playback until it has downloaded **all 6.4MB**. This
file was replaced today at 15:07 (it's a byte-for-byte copy of the 6.4MB
`This_is_good.mp4` sitting in the repo root) and was never re-encoded/compressed for web.
The homepage `hero.mp4` *is* faststart, so it streams progressively — good.

---

## 3. On-load component & asset waterfall (Homepage `/`)

**Order the browser loads things:**

1. **HTML document** (server-rendered by Next.js).
2. **Critical CSS** (Tailwind, inlined by Next).
3. **JS bundles** — Next runtime + React 19 + **framer-motion + gsap + lenis**
   (animation/smooth-scroll libs; the heaviest JS cost — not separately measured
   because there is no production build in the repo yet, only `next dev`).
4. **Fonts** — 9 self-hosted `.woff2` files, preloaded (`next/font`, `display: swap`).
5. **Hero poster** `hero-poster.jpg` — loaded with `priority` via `next/image`
   (transcoded to AVIF/WebP on the fly). This is the LCP element.
6. **Hero video** `hero.mp4` (1.5MB) — starts downloading **immediately**
   (`preload="auto"`), competing with the poster and JS for bandwidth.
7. **Below-the-fold media** — every other section video (`RevealVideo`) is **lazy**:
   it only downloads when it's ~300px from entering the viewport (IntersectionObserver).
   This part is done correctly.

**How assets load — summary by type:**

| Asset type | Mechanism | Optimized? |
|---|---|---|
| Images | `next/image` → AVIF/WebP, responsive `sizes`, 31-day cache | ✅ Yes (but source files are huge — see §4) |
| Hero video (home) | static MP4, `preload="auto"`, faststart | ⚠️ Downloads fully on load, but streams |
| About hero video | static MP4, `preload="auto"`, **no faststart, 6.4MB** | ❌ Worst offender |
| Other section videos | lazy via IntersectionObserver (300px margin) | ✅ Good |
| Fonts | self-hosted woff2, preloaded, `swap` | ✅ Good |

**Homepage first-load network budget (approx, cold cache):**
- Fonts (9 × woff2, preloaded): **~190 KB**
- Hero poster (after AVIF/WebP transcode): ~40–100 KB (source is 138 KB)
- **Hero video `hero.mp4`: 1.5 MB** ← dominant payload on first paint
- App JS (framer-motion + gsap + lenis + React): **unmeasured — needs a prod build**
- → **~1.7 MB+ before counting JS**, most of it the hero video.

---

## 4. Asset sizes (the actual numbers)

### Videos — `/public/media/video/` (all H.264 MP4)
| File | Size | Notes |
|---|---|---|
| about-hero.mp4 | **6.4 MB** | ❌ not faststart, blocks playback; swapped in today |
| mega-hero.mp4 | 2.8 MB | |
| scene-mini.mp4 | 2.5 MB | |
| scene-mega.mp4 | 2.0 MB | |
| scene-wedding.mp4 | 1.9 MB | |
| wedding-hero.mp4 | 1.7 MB | |
| **hero.mp4 (homepage)** | **1.5 MB** | ✅ faststart |
| weddings.mp4 | 1.4 MB | |
| secret-garden.mp4 | 1.3 MB | |
| **Total shipped video** | **~21 MB** | |

### Raw source videos NOT shipped — `/_sources/` (should be gitignored, they're dev originals)
`download.mp4` 20.5MB · `hero_video.mp4` 8.9MB · `vid4.mp4` 8.1MB ·
`secretgarden.mp4` 4.2MB · `new_hero.mp4` 3.4MB · `next_hero.mp4` 3.2MB
→ **~48 MB of raw video committed to the repo** (bloats clone/deploy, not served to users).
Plus `This_is_good.mp4` (6.4MB) and `logo.png` (1MB) loose in the repo root.

### Images — `/public/media/` : **227 files, 126 MB total** (source originals)
Largest source files (served *optimized* by next/image, but the optimizer must chew
through these on first hit):
| File | Size |
|---|---|
| garden-waterfall-10f.jpg | 2.8 MB |
| hall-room-12d.jpg | 2.7 MB |
| chigwell-hall-4b.jpg | 1.9 MB |
| hall-room-12a/12c/12b.jpg | ~1.8 MB each |
| recent-garden.jpg | 1.6 MB |
| garden-10b.jpg | 1.5 MB |
| logo.png (root) | 1.0 MB |
| …many more 0.5–1 MB JPG/PNG | |

### Fonts — `/app/fonts/` (self-hosted woff2, all preloaded)
9 files, ~190 KB total. `Gambetta-Italic.woff2` is the largest single at 39 KB. Fine.

---

## Root causes, ranked

1. **`preload="auto"` on hero videos** → full video download forced on first paint,
   competing with the LCP image and JS. Change to `preload="none"` (poster already
   covers the frame) or `preload="metadata"`.
2. **`about-hero.mp4`: 6.4 MB + no faststart** → re-encode to faststart, ~720p, target
   ~1.5–2 MB. Single biggest win for the About page.
3. **One desktop-res H.264 file per clip** → add a smaller mobile variant and/or a WebM
   fallback; consider a real video CDN / adaptive stream if video is central.
4. **Huge source images (up to 2.8 MB)** → pre-resize originals to ~2000px/≤400 KB so
   the on-the-fly optimizer isn't grinding megapixels on every cold request.
5. **~48 MB of raw `_sources/` video + loose root files committed** → gitignore/remove;
   doesn't hit users but slows every clone/deploy.
6. **No production build to measure JS** → run `npm run build` to get real bundle sizes;
   framer-motion + gsap + lenis together are a meaningful JS payload.

## What was already done right
next/image with AVIF/WebP + long cache · lazy-loaded below-fold videos · self-hosted
preloaded fonts with `display: swap` · homepage hero video is faststart · poster images
for instant first paint.
