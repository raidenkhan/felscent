import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/types";
import { formatPrice, stockStatus } from "@/lib/format";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const status = stockStatus(product.stock_quantity, product.low_stock_threshold);
  const image = product.images[0];

  return (
    <Link
      to="/fragrance/$slug"
      params={{ slug: product.slug }}
      data-cursor="view"
      viewTransition
      className="group block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      aria-label={`${product.name}, ${formatPrice(product.price_cents, product.currency)}`}
    >
      <div className="frame-dome frame-vignette shape-morph group-hover:frame-arch aspect-[4/5] overflow-hidden bg-ivory-deep">
        {image ? (
          <img
            src={image}
            alt={product.name}
            width={1024}
            height={1280}
            loading={priority ? "eager" : "lazy"}
            className="img-editorial img-cinematic"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-serif text-muted-foreground">No image</div>
        )}
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl leading-tight group-hover:text-rose transition-colors">{product.name}</h3>
          <p className="mt-1 text-xs tracking-wide text-muted-foreground">
            {product.fragrance_type} · {product.size_ml} ml
          </p>
        </div>
        <p className="tabular text-sm">{formatPrice(product.price_cents, product.currency)}</p>
      </div>
      {status !== "in" && (
        <p className="mt-2 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
          {status === "out" ? "Sold out" : "Last few remaining"}
        </p>
      )}
    </Link>
  );
}
