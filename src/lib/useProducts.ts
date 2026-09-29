import { useQuery } from "@tanstack/react-query";
import { isSupabaseConfigured } from "./supabase";
import { getProductBySlug, listProducts } from "./products";
import { demoProducts } from "@/site/home/content";
import type { Product } from "./types";

/**
 * Storefront product data.
 *
 * Until VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY exist in .env, the site
 * renders the researched demo fixtures in src/site/home/content. Once the
 * env vars are set, live Supabase rows take over and loading/error states
 * surface through the same hook — components stay unchanged either way.
 */

export function useProducts() {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: listProducts,
    enabled: isSupabaseConfigured,
    staleTime: 30_000,
  });

  const products: Product[] = isSupabaseConfigured ? (query.data ?? []) : demoProducts;

  return {
    products,
    loading: isSupabaseConfigured && query.isPending,
    error: isSupabaseConfigured && query.isError,
    refetch: () => query.refetch(),
    isLive: isSupabaseConfigured,
  };
}

export function useProduct(slug: string) {
  const query = useQuery({
    queryKey: ["products", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: isSupabaseConfigured && Boolean(slug),
  });

  const demo = demoProducts.find((candidate) => candidate.slug === slug) ?? null;
  const product = isSupabaseConfigured ? (query.data ?? null) : demo;

  return {
    product,
    loading: isSupabaseConfigured && query.isPending,
    error: isSupabaseConfigured && query.isError,
    refetch: () => query.refetch(),
  };
}
