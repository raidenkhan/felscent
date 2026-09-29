import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/site/ProductCard";
import { SiteLayout } from "@/site/SiteLayout";
import { useProducts } from "@/lib/useProducts";

export const Route = createFileRoute("/collection")({ component: CollectionRoute });

function CollectionRoute() {
  const { products, loading, error, refetch } = useProducts();

  return (
    <SiteLayout>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container-editorial">
          <p className="eyebrow">The collection</p>
          <h1 className="text-headline mt-6 max-w-xl">Each fragrance, unfolding at its own pace.</h1>

          <div className="mt-16 grid-editorial gap-y-14 lg:mt-24">
            {products.map((product, index) => (
              <div key={product.slug} className="col-span-2 md:col-span-4 lg:col-span-3">
                <ProductCard product={product} priority={index < 2} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
