import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/types";
import { ProductCard } from "../ProductCard";
import { EmptyState, ErrorState, ProductGridSkeleton } from "../States";
import { AccordionGallery } from "./AccordionGallery";
import { Reveal } from "../motion";
import { Section } from "./Section";
import { collection } from "./content";

interface Props {
  products: Product[];
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

/**
 * Section 7 — Product collection.
 * Four columns on desktop, two on tablet, two on mobile. Neutral card
 * backgrounds, no badges, discount labels or promotional stickers.
 */
export function Collection({ products, loading = false, error = false, onRetry }: Props) {
  return (
    <Section bordered labelledBy="collection-heading">
      <div className="container-editorial">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{collection.eyebrow}</p>
            <h2 id="collection-heading" className="text-headline mt-6 max-w-lg">
              {collection.heading}
            </h2>
          </div>
          <Link to="/collection" className="link-hairline">
            {collection.linkLabel}
        </Link>
        </Reveal>

        <div className="mt-16 lg:mt-24">
          {loading ? (
            <ProductGridSkeleton />
          ) : error ? (
            <ErrorState
              title="The collection could not be loaded"
              body="Please try again in a moment."
              onRetry={onRetry}
            />
          ) : products.length === 0 ? (
            <EmptyState
              title="Nothing here yet"
              body="New fragrances are added as they are ready. Join the journal to hear first."
            />
          ) : (
            <>
              {/*
               * Cinematic showcase — every bottle in one expandable strip.
               * Hovering a panel grows it to full colour while the rest dim
               * and desaturate; each panel links to its fragrance page.
               */}
              <AccordionGallery
                items={products.map((product) => ({
                  image: product.images[0] ?? "",
                  label: product.name,
                  link: `/fragrance/${product.slug}`,
                  alt: `${product.name} — ${product.fragrance_type}`,
                }))}
                defaultIndex={Math.max(
                  products.findIndex((product) => product.slug === "oud-madness"),
                  0,
                )}
                height={440}
                gap={6}
                radius={2}
                expandRatio={0.42}
                tilt={3}
                parallax={0.3}
                dim={0.22}
              />

              <div className="mt-16 grid-editorial gap-y-14 lg:mt-24">
                {products.map((product, index) => (
                  <Reveal
                    key={product.slug}
                    delay={(index % 4) * 90}
                    className="col-span-2 md:col-span-4 lg:col-span-3"
                  >
                    <ProductCard product={product} priority={index < 2} />
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Section>
  );
}
