import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { formatPrice, stockStatus } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/site/States";
import { NotesProgression } from "@/site/NotesProgression";
import { SiteLayout } from "@/site/SiteLayout";
import { useProduct } from "@/lib/useProducts";

export const Route = createFileRoute("/fragrance/$slug")({
  component: FragranceRoute,
});

function FragranceRoute() {
  const { slug } = Route.useParams();
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const { product, loading, error, refetch } = useProduct(slug);

  if (loading) {
    return (
      <SiteLayout>
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container-editorial">
            <p className="eyebrow">One moment</p>
            <h1 className="text-headline mt-6">Opening the bottle…</h1>
          </div>
        </section>
      </SiteLayout>
    );
  }

  if (error) {
    return (
      <SiteLayout>
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container-editorial">
            <ErrorState
              title="The fragrance could not be loaded"
              body="Please try again in a moment."
              onRetry={refetch}
            />
          </div>
        </section>
      </SiteLayout>
    );
  }

  if (!product) {
    return (
      <SiteLayout>
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container-editorial text-center">
            <p className="eyebrow">Not found</p>
            <h1 className="text-headline mt-6">We could not find that fragrance.</h1>
            <Link to="/collection" className="link-hairline mt-10 inline-block">
              View the collection
            </Link>
          </div>
        </section>
      </SiteLayout>
    );
  }

  const status = stockStatus(product.stock_quantity, product.low_stock_threshold);

  return (
    <SiteLayout>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container-editorial grid-editorial gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <div className="aspect-[4/5] overflow-hidden bg-ivory-deep">
              {product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  width={1024}
                  height={1280}
                  className="img-editorial img-cinematic"
                />
              ) : null}
            </div>
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9">
            <p className="eyebrow">{product.fragrance_type}</p>
            <h1 className="text-headline mt-5">{product.name}</h1>
            <p className="mt-4 text-sm text-muted-foreground">{product.size_ml} ml</p>

            <p className="tabular mt-8 font-serif text-2xl">{formatPrice(product.price_cents, product.currency)}</p>

            {status === "out" ? (
              <p className="mt-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                Sold out
              </p>
            ) : status === "low" ? (
              <p className="mt-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                Last few remaining
              </p>
            ) : null}

            <Button
              variant="rose"
              className="mt-8 w-full"
              disabled={status === "out"}
              onClick={() => {
                add(product);
                setAdded(true);
              }}
            >
              {status === "out" ? "Sold out" : "Add to bag"}
            </Button>

            {added && (
              <p role="status" className="mt-4 text-sm text-muted-foreground">
                Added. <Link to="/bag" className="link-hairline">View your bag</Link>
              </p>
            )}

            {product.short_description && (
              <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                {product.short_description}
              </p>
            )}
          </div>
        </div>
      </section>

      {(product.top_notes?.length || product.heart_notes?.length || product.base_notes?.length) && (
        <section className="border-t border-border py-12 md:py-16 lg:py-20">
          <div className="container-editorial">
            <p className="eyebrow">How it unfolds</p>
            <h2 className="text-headline mt-6 max-w-lg">
              Notes often arrive gradually, not all at once.
            </h2>
            <div className="mt-14">
              <NotesProgression
                top={product.top_notes ?? []}
                heart={product.heart_notes ?? []}
                base={product.base_notes ?? []}
              />
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
