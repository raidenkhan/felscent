import { Link, createFileRoute } from "@tanstack/react-router";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/site/States";
import { SiteLayout } from "@/site/SiteLayout";

export const Route = createFileRoute("/bag")({
  component: BagRoute,
});

function BagRoute() {
  const { items, count, subtotalCents, remove, setQuantity } = useCart();

  return (
    <SiteLayout>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container-editorial">
          <p className="eyebrow">Your bag</p>
          <h1 className="text-headline mt-6 max-w-xl">
            {count > 0 ? `${count} ${count === 1 ? "bottle" : "bottles"}` : "Nothing chosen yet."}
          </h1>

          <div className="mt-16 lg:mt-24">
            {items.length === 0 ? (
              <EmptyState
                title="Your bag is empty"
                body="Fragrances you add will be kept here, ready when you are."
              />
            ) : (
              <div className="grid-editorial gap-y-12">
                <ul className="col-span-4 divide-y divide-border border-y border-border md:col-span-8 lg:col-span-8">
                  {items.map((item) => (
                    <li key={item.product.slug} className="flex items-start gap-6 py-8">
                      <div className="size-24 shrink-0 overflow-hidden bg-ivory-deep">
                        {item.product.images[0] ? (
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            width={96}
                            height={96}
                            className="img-editorial"
                          />
                        ) : null}
                      </div>

                      <div className="flex-1">
                        <h2 className="font-serif text-xl">{item.product.name}</h2>
                        <p className="mt-1 text-xs tracking-wide text-muted-foreground">
                          {item.product.fragrance_type} · {item.product.size_ml} ml
                        </p>

                        <div className="mt-4 flex items-center gap-6">
                          <label
                            htmlFor={`quantity-${item.product.slug}`}
                            className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground"
                          >
                            Quantity
                          </label>
                          <input
                            id={`quantity-${item.product.slug}`}
                            type="number"
                            min={0}
                            max={item.product.stock_quantity}
                            value={item.quantity}
                            onChange={(event) =>
                              setQuantity(item.product.slug, Number(event.target.value))
                            }
                            className="w-16 border-b border-input bg-transparent py-1 text-sm focus:border-foreground focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => remove(item.product.slug)}
                            className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <p className="tabular text-sm">
                        {formatPrice(item.product.price_cents * item.quantity, item.product.currency)}
                      </p>
                    </li>
                  ))}
                </ul>

                <aside className="col-span-4 mt-8 md:col-span-6 md:col-start-3 lg:col-span-3 lg:col-start-10 lg:mt-0">
                  <div className="border-t border-border pt-8">
                    <div className="flex items-baseline justify-between">
                      <span className="eyebrow">Subtotal</span>
                      <span className="tabular font-serif text-2xl">{formatPrice(subtotalCents)}</span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      Shipping and taxes are calculated at checkout.
                    </p>
                    <Button variant="rose" className="mt-8 w-full">
                      Proceed to checkout
                    </Button>
                    <Link to="/collection" className="link-hairline mt-6 inline-block">
                      Continue browsing
                    </Link>
                  </div>
                </aside>
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
