/**
 * Home page content.
 *
 * PRODUCT CATALOGUE: the twelve fragrances the shop actually sells, with note
 * structures researched from Fragrantica/retail listings (Sept 2026). Prices
 * are PLACEHOLDERS (£32–£58) — the owner sets real prices in the admin panel
 * or the Supabase `products` table.
 *
 * IMAGERY: src/assets/products/*.jpg are the owner's current bottle photos.
 * A cinematic re-shoot can replace them 1:1 later (same filenames) — see
 * docs/product-reshoot-prompt.md for the exact brief.
 *
 * Home page copy is still placeholder, written to the FELSCENT tone.
 */
import barakatImage from "../../assets/products/barakat.jpg";
import brownOrchidImage from "../../assets/products/brown-orchid.jpg";
import cocktailIntenseImage from "../../assets/products/cocktail-intense.jpg";
import liquidBrunImage from "../../assets/products/liquid-brun.jpg";
import matelotImage from "../../assets/products/matelot.jpg";
import oniroImage from "../../assets/products/oniro.jpg";
import oudDeArabiaImage from "../../assets/products/oud-de-arabia.jpg";
import oudMadnessImage from "../../assets/products/oud-madness.jpg";
import ramzLattafaImage from "../../assets/products/ramz-lattafa.jpg";
import suitsImage from "../../assets/products/suits.jpg";
import suspensoImage from "../../assets/products/suspenso.jpg";
import zaraImage from "../../assets/products/zara.jpg";
import heroImage from "../../assets/hero.jpg";
import botanicalsImage from "../../assets/botanicals.jpg";
import featureImage from "../../assets/feature-dark.jpg";
import type { Product } from "@/lib/types";

export const images = {
  hero: heroImage,
  botanicals: botanicalsImage,
  feature: featureImage,
} as const;

/* ------------------------------------------------------------------ *
 * Section 2 — Hero fragrance story
 * ------------------------------------------------------------------ */

export const hero = {
  eyebrow: "Felscent",
  statement: "Not every note arrives at once.",
  body: "Fragrance is not always immediate. Some notes arrive softly, linger quietly, and reveal themselves over time.",
  primaryCta: "Discover the fragrance",
  secondaryCta: "Explore the collection",
  image: oudMadnessImage,
  imageAlt: "Oud Madness — dark fruity oud fragrance bottle",
  caption: "Oud Madness — eau de parfum",
  /** Slug of the fragrance the hero CTAs point at. */
  slug: "oud-madness",
};

/* ------------------------------------------------------------------ *
 * Section 3 — Brand philosophy
 * ------------------------------------------------------------------ */

export const philosophy = {
  eyebrow: "The art of arrival",
  heading: "Not every note arrives at once.",
  body: [
    "A fragrance is a process, not a first impression. The opening is bright and quick to leave; the heart takes its time; the base settles in and stays.",
    "Worn on skin, warmth and wearer decide the order of things. The scent you meet in the morning is rarely the one you end the day with.",
  ],
  linkLabel: "Discover the story",
  image: images.botanicals,
  imageAlt: "Dried botanical materials arranged on a neutral surface",
};

/* ------------------------------------------------------------------ *
 * Section 4 — Botanical ingredients
 * ------------------------------------------------------------------ */

export const botanicalsIntro = {
  eyebrow: "Botanical ingredients",
  heading: "Materials, before they become a fragrance.",
};

export interface Ingredient {
  name: string;
  sensory: string;
  noteCategory: string;
  detail: string;
  image: string;
  imageAlt: string;
  /** Nudges each crop so repeated photography does not read as repetition. */
  imagePosition?: string;
}

export const ingredients: Ingredient[] = [
  {
    name: "Turkish rose",
    sensory: "Deep, honeyed, a little dark.",
    noteCategory: "Heart note",
    detail: "Found in Oud Madness",
    image: oudMadnessImage,
    imageAlt: "Oud Madness fragrance bottle, rose and saffron composition",
    imagePosition: "50% 30%",
  },
  {
    name: "Agarwood",
    sensory: "Resinous warmth with a smoky finish.",
    noteCategory: "Base note",
    detail: "Found in Oud de Arabia",
    image: oudDeArabiaImage,
    imageAlt: "Oud de Arabia fragrance bottle on a warm ground",
    imagePosition: "50% 65%",
  },
  {
    name: "Bourbon vanilla",
    sensory: "A smooth base that settles close to the skin.",
    noteCategory: "Base note",
    detail: "Found in Liquid Brun",
    image: liquidBrunImage,
    imageAlt: "Liquid Brun fragrance bottle, vanilla and praline composition",
    imagePosition: "50% 20%",
  },
];

/* ------------------------------------------------------------------ *
 * Section 5 — Lifestyle and skin ritual
 * ------------------------------------------------------------------ */

export const ritual = {
  eyebrow: "On skin",
  heading: "A fragrance that settles into your rhythm.",
  body: [
    "Warmth changes everything. Applied to the wrist, the neck, the inside of the elbow, a fragrance moves with the body rather than sitting above it.",
    "Wear it for an hour before you decide. What arrives first is only the beginning.",
  ],
  linkLabel: "View the fragrance",
  /** Slug of the fragrance this ritual block links to. */
  slug: "liquid-brun",
  image: liquidBrunImage,
  imageAlt: "Liquid Brun fragrance bottle in warm directional light",
  caption: "Applied to the pulse points, the opening softens quickly",
};

/* ------------------------------------------------------------------ *
 * Section 6 — Dark immersive fragrance feature
 * ------------------------------------------------------------------ */

export const featured = {
  eyebrow: "Eau de parfum",
  heading: "A deeper note.",
  supporting: "Notes often arrive gradually, not all at once.",
  /** Slug of the fragrance the dark feature section reads. */
  slug: "oud-de-arabia",
  image: oudDeArabiaImage,
  imageAlt: "Oud de Arabia on a dark surface",
  caption: "Warm spice, soft florals, deep resins",
};

/* ------------------------------------------------------------------ *
 * Section 7 — Product collection
 * ------------------------------------------------------------------ */

export const collection = {
  eyebrow: "The collection",
  heading: "Each fragrance, unfolding at its own pace.",
  linkLabel: "Shop all fragrances",
};

/* ------------------------------------------------------------------ *
 * Section 8 — Fragrance explanation
 * ------------------------------------------------------------------ */

export const explanation = {
  eyebrow: "How it unfolds",
  statement: "Notes often arrive gradually, not all at once.",
  body: "A fragrance is read in three movements. The opening passes within minutes, the heart carries the character of the composition, and the dry-down is what you live with.",
  stages: [
    {
      label: "First impression",
      copy: "The opening is light and immediate. It is the introduction, not the story.",
    },
    {
      label: "The heart",
      copy: "Floral and botanical notes begin to emerge as the top notes fade.",
    },
    {
      label: "The dry-down",
      copy: "Warm woods and deeper notes remain close to the skin for hours.",
    },
  ],
};

/* ------------------------------------------------------------------ *
 * Section 9 — Journal preview
 * ------------------------------------------------------------------ */

export const journalIntro = {
  eyebrow: "The journal",
  heading: "On scent, slowness and the season.",
  linkLabel: "Read the journal",
};

export interface JournalEntry {
  category: string;
  title: string;
  summary: string;
  date: string;
  readingTime: string;
  image: string;
  imageAlt: string;
}

export const journal: JournalEntry[] = [
  {
    category: "Ritual",
    title: "Layering two fragrances without losing either",
    summary:
      "Which one goes on first, and why the oilier note should always sit beneath the brighter one.",
    date: "2026-08-14",
    readingTime: "4 min read",
    image: barakatImage,
    imageAlt: "Barakat and Brown Orchid fragrance bottles side by side",
  },
  {
    category: "Scent and memory",
    title: "Why a fragrance can return you to a room",
    summary: "The mechanism is ordinary chemistry. The experience of it is not.",
    date: "2026-07-02",
    readingTime: "6 min read",
    image: matelotImage,
    imageAlt: "Matelot fragrance bottle in soft focus",
  },
  {
    category: "Behind the scent",
    title: "Six months in the maceration room",
    summary:
      "What a fragrance does while it is left alone, and why the waiting cannot be rushed.",
    date: "2026-05-21",
    readingTime: "5 min read",
    image: oudDeArabiaImage,
    imageAlt: "Oud de Arabia bottle in low warm light",
  },
];

/* ------------------------------------------------------------------ *
 * The collection — twelve real fragrances
 *
 * Notes are researched (Fragrantica / retail listings). Prices are
 * placeholders until the owner sets them. Slugs are the URL identifiers —
 * keep them stable once the site is live.
 * ------------------------------------------------------------------ */

export type FragranceNotes = {
  top_notes: string[];
  heart_notes: string[];
  base_notes: string[];
};

interface CatalogueEntry extends FragranceNotes {
  slug: string;
  name: string;
  fragrance_type: string;
  size_ml: number;
  /** Placeholder — the owner replaces this per product. */
  price_cedis: number;
  short_description: string;
  image: string;
}

const catalogue: CatalogueEntry[] = [
  {
    slug: "barakat",
    name: "Barakat",
    fragrance_type: "Extrait de parfum",
    size_ml: 100,
    price_cedis: 42,
    short_description:
      "Saffron-warm and quietly sweet — jasmine over amberwood, closer to a whisper than a statement.",
    top_notes: ["Saffron", "Bitter almond"],
    heart_notes: ["Jasmine", "Cedar"],
    base_notes: ["Amberwood", "Musk"],
    image: barakatImage,
  },
  {
    slug: "brown-orchid",
    name: "Brown Orchid",
    fragrance_type: "Eau de parfum",
    size_ml: 100,
    price_cedis: 36,
    short_description:
      "Black currant and truffle over dark woods — a rich, earthy orchid with weight to it.",
    top_notes: ["Black currant", "Truffle", "Bergamot"],
    heart_notes: ["Ylang-ylang", "Lotus wood", "Jasmine"],
    base_notes: ["Patchouli", "Sandalwood", "Dark chocolate", "Frankincense"],
    image: brownOrchidImage,
  },
  {
    slug: "cocktail-intense",
    name: "Cocktail Intense",
    fragrance_type: "Eau de parfum",
    size_ml: 100,
    price_cedis: 38,
    short_description:
      "Cognac, cinnamon and oak — a boozy gourmand that reads warm rather than sweet.",
    top_notes: ["Cognac", "Bergamot"],
    heart_notes: ["Cinnamon", "Tonka bean", "Oak"],
    base_notes: ["Vanilla", "Sandalwood", "Praline"],
    image: cocktailIntenseImage,
  },
  {
    slug: "liquid-brun",
    name: "Liquid Brun",
    fragrance_type: "Eau de parfum",
    size_ml: 100,
    price_cedis: 45,
    short_description:
      "Cinnamon and cardamom folding into bourbon vanilla and praline — the evening scent that lingers.",
    top_notes: ["Cinnamon", "Cardamom", "Orange blossom", "Bergamot"],
    heart_notes: ["Bourbon vanilla", "Elemi"],
    base_notes: ["Praline", "Musk", "Ambroxan", "Guaiac wood"],
    image: liquidBrunImage,
  },
  {
    slug: "matelot",
    name: "Matelot",
    fragrance_type: "Eau de parfum",
    size_ml: 100,
    price_cedis: 34,
    short_description:
      "Saffron and cardamom over guaiac wood and leather — dry, aromatic, quietly masculine.",
    top_notes: ["Cardamom", "Saffron"],
    heart_notes: ["Lily of the valley"],
    base_notes: ["Guaiac wood", "Oud", "Patchouli", "Leather"],
    image: matelotImage,
  },
  {
    slug: "oniro",
    name: "Oniro",
    fragrance_type: "Eau de parfum",
    size_ml: 100,
    price_cedis: 36,
    short_description:
      "Grapefruit and sea salt over ambergris and oakmoss — daylight on a cold shore.",
    top_notes: ["Sea notes", "Grapefruit", "Mandarin"],
    heart_notes: ["Bay leaf", "Jasmine"],
    base_notes: ["Ambergris", "Guaiac wood", "Oakmoss", "Patchouli"],
    image: oniroImage,
  },
  {
    slug: "oud-de-arabia",
    name: "Oud de Arabia",
    fragrance_type: "Eau de parfum",
    size_ml: 100,
    price_cedis: 38,
    short_description:
      "Warm spice and soft florals over deep resins — a classical oud, worn close and elegant.",
    top_notes: ["Warm spices"],
    heart_notes: ["Rose", "Soft florals"],
    base_notes: ["Oud", "Woods", "Amber", "Musk"],
    image: oudDeArabiaImage,
  },
  {
    slug: "oud-madness",
    name: "Oud Madness",
    fragrance_type: "Eau de parfum",
    size_ml: 60,
    price_cedis: 58,
    short_description:
      "Passion fruit against saffron and Turkish rose — a dark fruity oud with a smoky leather trail.",
    top_notes: ["Passion fruit", "Saffron", "Turkish rose"],
    heart_notes: ["Oud", "Indonesian patchouli", "Benzoin"],
    base_notes: ["Leather", "Oakmoss", "Amber", "Vanilla"],
    image: oudMadnessImage,
  },
  {
    slug: "ramz-lattafa",
    name: "Ramz Silver",
    fragrance_type: "Eau de parfum",
    size_ml: 100,
    price_cedis: 32,
    short_description:
      "Pear and lavender brightening into vanilla and amber — sweet, lifted, easy to live with.",
    top_notes: ["Pear", "Lavender", "Bergamot", "Mint"],
    heart_notes: ["Cardamom", "Sage"],
    base_notes: ["Vanilla", "Amber", "Musk", "Patchouli"],
    image: ramzLattafaImage,
  },
  {
    slug: "suits",
    name: "Suits",
    fragrance_type: "Eau de parfum",
    size_ml: 100,
    price_cedis: 40,
    short_description:
      "Ginger and lavender pressed against leather and vanilla — tailored, warm, composed.",
    top_notes: ["Ginger", "Lavender", "Ozonic notes"],
    heart_notes: ["Rose", "Violet leaf", "Resins"],
    base_notes: ["Leather", "Patchouli", "Amber", "Vanilla"],
    image: suitsImage,
  },
  {
    slug: "suspenso",
    name: "Suspenso",
    fragrance_type: "Eau de parfum",
    size_ml: 100,
    price_cedis: 36,
    short_description:
      "Lavender and water notes over tobacco leaf and amber — cool mornings, warm evenings.",
    top_notes: ["Water notes", "Lavender", "Basil", "Geranium"],
    heart_notes: ["Sage", "Tobacco leaf", "Hay"],
    base_notes: ["Sandalwood", "Labdanum", "Cypress", "Amber", "Musk"],
    image: suspensoImage,
  },
  {
    slug: "zara",
    name: "Zara Vibrant Leather",
    fragrance_type: "Eau de parfum",
    size_ml: 120,
    price_cedis: 28,
    short_description:
      "Pineapple brightness over dry birch and leather — the opening that gets asked about.",
    top_notes: ["Pineapple", "Bergamot", "Citrus"],
    heart_notes: ["Violet", "Jasmine"],
    base_notes: ["Leather", "Birch", "Amberwood", "Musk"],
    image: zaraImage,
  },
];

/**
 * The storefront type is narrower than the catalogue entry (extra required
 * columns like id live in Supabase), so the cast keeps compilation honest —
 * the same approach the demo fixtures used.
 */
export const demoProducts = catalogue.map((entry) => {
  const { price_cedis, image, ...rest } = entry;
  return {
    ...rest,
    price_cents: price_cedis * 100,
    currency: "GHS",
    images: [image],
    published: true,
  };
}) as unknown as (Product & Partial<FragranceNotes>)[];
