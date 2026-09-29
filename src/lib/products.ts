import { productFormSchema } from "./productSchema";
import type { Product } from "./types";
import { PRODUCTS_TABLE, isSupabaseConfigured, supabase } from "./supabase";

/**
 * Data access for the `products` table (see supabase/schema.sql).
 *
 * Every function throws rather than returning null so react-query treats the
 * result as an error state the admin UI can render. They also throw a single
 * clear error when Supabase is not configured, instead of a confusing
 * "fetch of undefined" from inside the client.
 *
 * The price form field is whole cedis; storage is integer pesewas — conversion
 * lives only in toRow/fromRow.
 */

export class ProductDataError extends Error {}

function requireClient() {
  if (!supabase || !isSupabaseConfigured) {
    throw new ProductDataError(
      "Supabase is not connected. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env and restart the dev server.",
    );
  }
  return supabase;
}

function requireSession() {
  const client = requireClient();
  // Admin writes ride on the signed-in user's JWT, so RLS can authorise them.
  return client.auth.getSession().then(({ data, error }) => {
    if (error) throw new ProductDataError(error.message);
    if (!data.session) {
      throw new ProductDataError("Your session has expired. Please sign in again.");
    }
    return client;
  });
}

/** DB row shape — matches supabase/schema.sql exactly. */
interface ProductRow {
  id: string;
  slug: string;
  name: string;
  fragrance_type: string;
  size_ml: number;
  price_cents: number;
  currency: string;
  short_description: string | null;
  stock_quantity: number;
  low_stock_threshold: number;
  published: boolean;
  images: string[];
  top_notes: string[] | null;
  heart_notes: string[] | null;
  base_notes: string[] | null;
  created_at: string;
  updated_at: string;
}

function fromRow(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    fragrance_type: row.fragrance_type,
    size_ml: row.size_ml,
    price_cents: row.price_cents,
    // The shop trades exclusively in Ghana cedis — normalised here so every
    // surface (storefront, admin, forms) renders and writes GHS even if a
    // legacy row still carries another code.
    currency: "GHS",
    short_description: row.short_description ?? undefined,
    stock_quantity: row.stock_quantity,
    low_stock_threshold: row.low_stock_threshold,
    published: row.published,
    images: row.images ?? [],
    top_notes: row.top_notes ?? undefined,
    heart_notes: row.heart_notes ?? undefined,
    base_notes: row.base_notes ?? undefined,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

/**
 * Writable columns, shaped like the DB row (nullable note arrays, no id /
 * timestamps — the server owns those). Both createProduct and updateProduct
 * accept this, so form conversions produce one consistent shape.
 */
export interface ProductWrite {
  slug: string;
  name: string;
  fragrance_type: string;
  size_ml: number;
  price_cents: number;
  currency: string;
  short_description: string | null;
  stock_quantity: number;
  low_stock_threshold: number;
  published: boolean;
  images: string[];
  top_notes: string[] | null;
  heart_notes: string[] | null;
  base_notes: string[] | null;
}

/** Product → writable row. */
function toRow(input: Omit<Product, "id" | "created_at" | "updated_at">): ProductWrite {
  return {
    slug: input.slug,
    name: input.name,
    fragrance_type: input.fragrance_type,
    size_ml: input.size_ml,
    price_cents: input.price_cents,
    currency: input.currency,
    short_description: input.short_description ?? null,
    stock_quantity: input.stock_quantity,
    low_stock_threshold: input.low_stock_threshold,
    published: input.published ?? true,
    images: input.images,
    top_notes: input.top_notes?.length ? input.top_notes : null,
    heart_notes: input.heart_notes?.length ? input.heart_notes : null,
    base_notes: input.base_notes?.length ? input.base_notes : null,
  };
}

export async function listProducts(): Promise<Product[]> {
  const client = requireClient();
  const { data, error } = await client
    .from(PRODUCTS_TABLE)
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw new ProductDataError(error.message);
  return (data as ProductRow[]).map(fromRow);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const client = requireClient();
  const { data, error } = await client
    .from(PRODUCTS_TABLE)
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new ProductDataError(error.message);
  return data ? fromRow(data as ProductRow) : null;
}

export async function createProduct(input: ProductWrite) {
  const client = await requireSession();
  const { data, error } = await client
    .from(PRODUCTS_TABLE)
    .insert(input)
    .select("*")
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new ProductDataError("That slug is already in use. Choose another.");
    }
    throw new ProductDataError(error.message);
  }
  return fromRow(data as ProductRow);
}

export async function updateProduct(id: string, patch: Partial<ProductWrite>) {
  const client = await requireSession();
  const { data, error } = await client
    .from(PRODUCTS_TABLE)
    // Partial means untouched columns are omitted from the UPDATE, so the
    // server-side defaults and triggers stay in charge of them.
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new ProductDataError("That slug is already in use. Choose another.");
    }
    throw new ProductDataError(error.message);
  }
  return fromRow(data as ProductRow);
}

export async function deleteProduct(id: string) {
  const client = await requireSession();
  const { error } = await client.from(PRODUCTS_TABLE).delete().eq("id", id);
  if (error) throw new ProductDataError(error.message);
}

/* ------------------------------------------------------------------ *
 * Form conversions — the only place cedis ↔ pesewas happens
 * ------------------------------------------------------------------ */

export function formValuesToProduct(
  values: import("./productSchema").ProductFormValues,
): ProductWrite {
  return {
    slug: values.slug,
    name: values.name,
    fragrance_type: values.fragrance_type,
    size_ml: values.size_ml,
    price_cents: Math.round(values.price_cedis * 100),
    currency: "GHS",
    short_description: values.short_description ?? null,
    stock_quantity: values.stock_quantity,
    low_stock_threshold: values.low_stock_threshold,
    published: values.published ?? true,
    images: values.images,
    top_notes: values.top_notes?.length ? values.top_notes : null,
    heart_notes: values.heart_notes?.length ? values.heart_notes : null,
    base_notes: values.base_notes?.length ? values.base_notes : null,
  };
}

/** Form fields (pre-parse strings) → row, applying the schema as it parses. */
export function formInputToProduct(values: import("./productSchema").ProductFormInput) {
  const parsed = productFormSchema.parse(values);
  return formValuesToProduct(parsed);
}

/** Parsed row → form fields (numbers/arrays rendered back to strings). */
export function productToFormValues(
  product: Product,
): import("./productSchema").ProductFormInput {
  return {
    name: product.name,
    slug: product.slug,
    fragrance_type: product.fragrance_type,
    size_ml: String(product.size_ml),
    price_cedis: String(product.price_cents / 100),
    currency: product.currency,
    short_description: product.short_description ?? "",
    stock_quantity: String(product.stock_quantity),
    low_stock_threshold: String(product.low_stock_threshold),
    published: product.published ?? true,
    images: (product.images ?? []).join("\n"),
    top_notes: (product.top_notes ?? []).join(", "),
    heart_notes: (product.heart_notes ?? []).join(", "),
    base_notes: (product.base_notes ?? []).join(", "),
  };
}
