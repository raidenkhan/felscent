import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * True once VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env.
 * Everything Supabase-backed checks this first so the storefront still renders
 * before the project is wired up.
 */
export const isSupabaseConfigured = Boolean(url && anonKey);

/** Null until the env vars exist — callers must handle it. */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

/** The `products` table name, in one place. */
export const PRODUCTS_TABLE = "products";
