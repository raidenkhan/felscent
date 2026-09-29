import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { Parallax, Reveal } from "../motion";
import { NotesProgression } from "../NotesProgression";
import { Section } from "./Section";
import { featured, type FragranceNotes } from "./content";

type ProductExtras = Partial<FragranceNotes> & { short_description?: string };

/**
 * Section 6 — Dark immersive fragrance feature.
 * The strongest break in the page: espresso ground, warm-toned imagery and a
 * narrow light-text column. Reads one hero fragrance, not the collection.
 */
export function FeaturedFragrance({ product }: { product: Product }) {
  const extras = product as Product & ProductExtras;
  const image = product.images[0];

  return (
    <Section tone="feature" labelledBy="featured-heading">
      <div className="container-editorial">
        <div className="grid-editorial items-end gap-y-12">
          <Reveal as="figure" className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-1">
            <Parallax speed={0.04}>
              <div className="bloom">
                {image ? (
                  <img
                    src={image}
                    alt=""
                    aria-hidden="true"
                    className="bloom-blob-dark animate-bloom"
                  />
                ) : null}
                <div className="frame-dome frame-vignette aspect-[4/5] overflow-hidden bg-espresso-soft">
                  {image ? (
                    <img
                      src={image}
                      alt={product.name}
                      width={1200}
                      height={1500}
                      loading="lazy"
                      className="img-editorial img-cinematic-dark"
                    />
                  ) : null}
                </div>
              </div>
            </Parallax>
            <figcaption className="mt-4 text-[0.65rem] uppercase tracking-[0.2em] text-feature-muted">
              {featured.caption}
            </figcaption>
          </Reveal>

          <Reveal delay={140} className="col-span-4 md:col-span-6 lg:col-span-3 lg:col-start-10">
            <p className="eyebrow text-feature-muted">
              Felscent / {product.fragrance_type}
            </p>
            <h2 id="featured-heading" className="text-headline mt-6">
              {featured.heading}
            </h2>
            <p className="mt-5 font-serif text-xl leading-snug text-feature-foreground">
              {featured.supporting}
            </p>

            <div className="mt-10 border-t border-feature-border pt-8">
              <h3 className="font-serif text-2xl leading-tight">{product.name}</h3>
              {extras.short_description ? (
                <p className="mt-3 text-sm leading-relaxed text-feature-muted">
                  {extras.short_description}
                </p>
              ) : null}
              <p className="mt-6 text-[0.65rem] uppercase tracking-[0.2em] text-feature-muted">
                {product.size_ml} ml · {formatPrice(product.price_cents, product.currency)}
              </p>
            </div>

            <Link
              to="/fragrance/$slug"
              params={{ slug: product.slug }}
              className="link-hairline mt-8 inline-block"
            >
              Shop {product.name}
            </Link>
          </Reveal>
        </div>

        <div className="mt-20 lg:mt-28">
          <Reveal>
            <p className="eyebrow text-feature-muted">Note structure</p>
            <div className="mt-8">
              <NotesProgression
                top={extras.top_notes ?? []}
                heart={extras.heart_notes ?? []}
                base={extras.base_notes ?? []}
                dark
              />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
