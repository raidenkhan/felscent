/**
 * Shared domain types.
 *
 * Field names mirror the `products` table shape that ProductCard, Collection and
 * FeaturedFragrance already read: slug, name, fragrance_type, size_ml,
 * price_cents, currency, stock_quantity, low_stock_threshold, images.
 * Everything after that is optional so a Supabase row with extra columns still
 * satisfies this type.
 */

export interface Product {
  id: string;
  slug: string;
  name: string;
  fragrance_type: string;
  size_ml: number;
  price_cents: number;
  /** ISO 4217 code, e.g. "GHS". */
  currency: string;
  stock_quantity: number;
  low_stock_threshold: number;
  images: string[];

  short_description?: string;
  description?: string;
  top_notes?: string[];
  heart_notes?: string[];
  base_notes?: string[];
  /** Storefront visibility flag. */
  published?: boolean;
  created_at?: string;
  updated_at?: string;
}

/** A Product with the quantity the shopper has chosen. */
export interface CartItem {
  product: Product;
  quantity: number;
}
