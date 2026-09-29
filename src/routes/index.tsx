import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/site/SiteLayout";
import { HomePage } from "@/site/home";
import { useProducts } from "@/lib/useProducts";

export const Route = createFileRoute("/")({ component: HomeRoute });

function HomeRoute() {
  const { products, loading, error, refetch } = useProducts();

  return (
    <SiteLayout>
      <HomePage products={products} loading={loading} error={error} onRetry={refetch} />
    </SiteLayout>
  );
}
