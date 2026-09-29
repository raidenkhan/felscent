# Cinematic re-shoot — ChatGPT prompt & replacement guide

The site currently shows your existing bottle photos with a subtle cinematic
CSS treatment (`img-cinematic` in `src/styles.css`). When you have
cinematic re-shoots, replace the files **1:1** in
`src/assets/products/` — **same filenames** — and the whole site updates
automatically. No code changes needed.

---

## The master prompt (paste into ChatGPT)

> You are a luxury fragrance photographer. I will give you a photo of a
> perfume bottle. Reimagine it as a cinematic luxury editorial photograph,
> keeping the bottle and its label EXACTLY as they appear — same shape, same
> colour, same text, same proportions. Do not redesign the bottle.
>
> **Scene:** the bottle stands on a warm ivory travertine stone surface, with
> soft dried botanicals (rose petals, oakmoss, a stem of lavender) placed
> loosely nearby — never cluttered. Behind it, a seamless warm ivory backdrop
> (#F4F0E8) with a gentle gradient of light falling off toward the edges,
> evoking late-afternoon sun through a tall window.
>
> **Light:** one large, soft directional light from the upper left,
> warm (about 4200K), creating a long soft shadow to the lower right and a
> gentle highlight along the bottle's left shoulder. Deep, soft shadows —
> no harsh specular hotspots on the glass.
>
> **Camera:** shot on medium-format, 80mm lens, f/8, eye-level,
> straight-on product angle with the bottle filling about 60% of the frame
> height. Slight film grain, medium-format depth-of-field falloff.
>
> **Grade:** quiet-luxury editorial colour grade — warm ivory and taupe
> tones, muted saturation, deep espresso shadow rolloff, subtle vignette,
> faint halation on highlights. The mood is calm, expensive, unhurried.
>
> **Output:** one 4:5 vertical image, photorealistic, no text, no watermark,
> no props beyond those described.

Attach the bottle photo, then add one line per bottle naming it
(e.g. "This is Barakat."). Save the result as the same filename listed below.

---

## Per-bottle variant lines

Add the matching line when you generate each bottle so the compositions vary
while the set stays coherent:

| File to replace | Bottle | Variant line |
|---|---|---|
| `barakat.jpg` | Barakat | Add two dried rose buds lying to the right of the bottle. |
| `brown-orchid.jpg` | Brown Orchid | Add a dark orchid stem leaning against the backdrop behind the bottle. |
| `cocktail-intense.jpg` | Cocktail Intense | Add a small brass spoon of whole cinnamon sticks and one star anise at the base. |
| `liquid-brun.jpg` | Liquid Brun | Add a split vanilla pod and a curl of dark chocolate on the stone. |
| `matelot.jpg` | Matelot | Add a piece of weathered driftwood and a thin rope coil — dry, not nautical-themed. |
| `oniro.jpg` | Oniro | Add a scatter of coarse sea salt crystals and one bay leaf on the stone. |
| `oud-de-arabia.jpg` | Oud de Arabia | Add dark oud wood chips and a thin wisp of incense smoke rising behind the bottle. |
| `oud-madness.jpg` | Oud Madness | Add a halved passion fruit and deep red rose petals at the base. |
| `ramz-lattafa.jpg` | Ramz Silver | Add a fresh pear and a small sprig of lavender lying at the base. |
| `suits.jpg` | Suits | Add a folded charcoal-grey pocket square and one lavender stem — tailored, minimal. |
| `suspenso.jpg` | Suspenso | Add dried tobacco leaves and a stem of dried grasses at the base. |
| `zara.jpg` | Zara Vibrant Leather | Add a small piece of raw birch bark and one pineapple leaf. |

For **`oud-de-arabia.jpg`** and **`oud-madness.jpg`** — the two bottles used
in the large hero and dark-feature slots (3:4 and 4:5 crops) — also add:

> Leave generous empty space above the bottle so the image crops well in a
> tall editorial frame.

---

## Dark variant (only for the home-page dark feature)

The dark feature section (`FeaturedFragrance`) shows **Oud de Arabia** on an
espresso background. For that one image, generate an additional dark version:

> Same bottle, same rules — but the scene is now a dark espresso-brown
> surface (#1C1815) with a single low warm light from the right, deep shadows,
> the bottle catching a warm rim light along its edge, and oud wood chips in
> darkness around the base. Moody, intimate, museum-lit.

Save it as `oud-de-arabia-dark.jpg` next to the others and I'll wire the dark
section to use it instead.

---

## After generating — the replacement checklist

1. Put the new images anywhere, then either:
   - **Rename to match** the filenames in `src/assets/products/` and copy
     them over the old ones, **or**
   - If you changed filenames, tell me the new names and I'll update
     `src/site/home/content.ts`.
2. **Aspect ratios:** product cards crop to 4:5; the hero crops to 3:4.
   4:5 or taller sources work everywhere; the prompt above already asks
   for 4:5.
3. Run `npm run dev` and eyeball: home hero, dark feature, collection grid,
   a fragrance detail page, the journal preview.
4. Commit.

---

## Notes on how the site currently uses the photos

- **Hero (section 2):** Oud Madness — the most dramatic bottle.
- **Dark feature (section 6):** Oud de Arabia, per your confirmation.
- **Ritual (section 5):** Liquid Brun.
- **Ingredients (section 4):** Turkish rose → Oud Madness, agarwood →
  Oud de Arabia, vanilla → Liquid Brun.
- **Journal preview:** Barakat, Matelot, Oud de Arabia.
- Everything else appears in the 12-bottle collection grid.

Prices in the catalogue are placeholders (£28–£58). Tell me the real prices
any time — or set them yourself in the admin panel once Supabase is
connected, which is where they will ultimately live.
