# Emmanuel Anasi — Realistic HTML Photograph Portfolio

`background.jpg` is your real desk photo (untouched). The notebook
is real HTML/CSS/JS laid over it, built to match an open exercise
/foolscap book rather than a single loose sheet:

- **Open book spread**: a blank ruled left page, a shadowed spine
  gutter down the middle, and the written right page — `.left-page`,
  `.spine-gutter`, `.real-paper` in `index.html`/`style.css`.
- **No ring-binder holes** — a sewn/glued exercise book doesn't have
  them. Just ruled lines and a red margin rule.
- Rounded outer page corners (top-right/bottom-right on the right
  page, mirrored on the left page's outer corners), straight on the
  spine side — like a real notebook, not a torn page.
- ONE consistent font throughout: Caveat — back to the font from
  the very first version, which read as more realistic than the
  later swaps.
- A real 3D perspective tilt on the whole notebook spread
  (`perspective(1300px) rotateX() rotateY() rotateZ()`), matching
  the depth of the very first version, instead of the flatter
  rotate-only look later versions settled on.
- `script.js` jitters every CHARACTER (not just each word) with a
  small randomized rotation, vertical offset, and ink-opacity
  variation. Whole-word rotation alone still leaves every letter
  inside identical, which is what reads as "typed" — per-letter
  variation is what actually sells it as handwritten. Characters
  are grouped inside a no-wrap word wrapper so lines still only
  break between words, never mid-word.
- Paper + photo share one CSS `filter` on `.photo-scene`, plus a
  grain layer and vignette, so it reads as one photograph.
- Text line-height is locked to the same 29px grid as the ruled
  lines so a rule always lands under a line of writing.
- The whole spread (`.notebook-spread`) is one flex row —
  `width: min(650px, 97vw)` — so it stays proportional and doesn't
  overflow on any screen size; the left page and spine take a fixed
  share and the right (written) page takes the rest.

## Run

Open `index.html` directly, or serve it:

    python -m http.server 8000

## Heads-up on fonts

Caveat loads from Google Fonts at runtime, so you need an
internet connection the first time a visitor opens the page.

## Edit your content

Everything is in `index.html`, inside `.real-paper .paper-inner`:
name, title, work, projects, stack, about, contact links, date.
Replace `background.jpg` to use a different photo — if you do,
re-check `background-position` in `style.css` (`.photo-scene`) so
the notebook still lands on a clear, flat part of the new photo.

## Recent tweaks

- Ink color deepened (`#0b2f78`) for stronger contrast against
  the paper.
- All text sizes increased (title, body, headings) — the ruled-line
  grid unit went from 29px to 34px to match, so alignment between
  text and ruled lines still holds.

## Second readability pass

- Text sizes increased again (title, body, headings) — ruled-line
  grid unit went from 34px to 40px to match.
- The larger text made the page much taller, which combined with
  the 3D perspective tilt started pushing content in the lower
  portion of the page past the right edge on narrow screens
  (worse the further a line was from the tilt's pivot point).
  Eased the tilt (smaller rotation angles, more perspective
  distance) and moved the pivot to dead center, and gave the
  sheet more side margin (`85vw` instead of `97vw`) so this
  can't happen again even with more content.
