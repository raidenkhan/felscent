import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem, Product } from "./types";

const STORAGE_KEY = "felscent.bag.v1";

interface CartValue {
  items: CartItem[];
  /** Total number of bottles in the bag — Header renders this in the nav. */
  count: number;
  subtotalCents: number;
  add: (product: Product, quantity?: number) => void;
  remove: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartValue | null>(null);

function readStored(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        typeof item === "object" && item !== null && "product" in item && "quantity" in item,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  // Starts empty so server and first client render agree, then hydrates from
  // storage in an effect to avoid a markup mismatch.
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readStored());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage full or blocked — the bag still works for this session */
    }
  }, [items]);

  const add = useCallback((product: Product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.product.slug === product.slug);
      if (!existing) return [...current, { product, quantity }];
      return current.map((item) =>
        item.product.slug === product.slug
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((current) => current.filter((item) => item.product.slug !== slug));
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((item) => item.product.slug !== slug)
        : current.map((item) =>
            item.product.slug === slug ? { ...item, quantity } : item,
          ),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartValue>(() => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    const subtotalCents = items.reduce(
      (total, item) => total + item.product.price_cents * item.quantity,
      0,
    );
    return { items, count, subtotalCents, add, remove, setQuantity, clear };
  }, [items, add, remove, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside <CartProvider>. Add it to src/routes/__root.tsx.");
  }
  return context;
}
