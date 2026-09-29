/**
 * Formatting helpers shared by the storefront and the admin panel.
 * Prices are stored as integer minor units (pesewas) to avoid float drift.
 */

/** Renders 24500 / "GHS" as "GH₵245". Whole amounts drop the decimals. */
export function formatPrice(cents: number, currency = "GHS"): string {
  const whole = cents % 100 === 0;
  // en-GH renders the cedi sign (GH₵); en-GB would print the code "GHS" instead.
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency,
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(cents / 100);
}

export type StockStatus = "in" | "low" | "out";

/** "out" when none left, "low" at or below the threshold, otherwise "in". */
export function stockStatus(quantity: number, threshold = 0): StockStatus {
  if (quantity <= 0) return "out";
  if (quantity <= threshold) return "low";
  return "in";
}

/** BCP 47 date for editorial bylines, e.g. "14 August 2026". */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
