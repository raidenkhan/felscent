import type { Product } from "@/lib/types";
import { Botanicals } from "./Botanicals";
import { Collection } from "./Collection";
import { FeaturedFragrance } from "./FeaturedFragrance";
import { FragranceExplanation } from "./FragranceExplanation";
import { Hero } from "./Hero";
import { JournalPreview } from "./JournalPreview";
import { Philosophy } from "./Philosophy";
import { Ritual } from "./Ritual";
import { demoProducts, featured } from "./content";

interface Props {
  /**
   * Live products, newest or featured first — the first item becomes the dark
   * feature section. Falls back to the placeholder set in ./content so the
   * page renders before the Supabase wiring lands.
   */
  products?: Product[];
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

/**
 * Home page — design system sections 2 to 9, in order.
 *
 * Sections 1 (editorial header) and 10 (footer with the newsletter signup)
 * live in src/site/Header.tsx and src/site/Footer.tsx and are rendered by
 * SiteLayout, so they are not repeated here.
 */
export function HomePage({ products = demoProducts, loading = false, error = false, onRetry }: Props) {
  // The dark feature reads the fragrance named in ./content (featured.slug),
  // falling back to the first product so the section never renders empty.
  const featuredProduct =
    products.find((product) => product.slug === featured.slug) ?? products[0];

  return (
    <>
      <Hero />
      <Philosophy />
      <Botanicals />
      <Ritual />
      {featuredProduct ? <FeaturedFragrance product={featuredProduct} /> : null}
      <Collection products={products} loading={loading} error={error} onRetry={onRetry} />
      <FragranceExplanation />
      <JournalPreview />
    </>
  );
}
