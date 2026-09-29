import { z } from "zod";

/**
 * Shared product schema for the admin forms and data layer.
 *
 * `price_cedis` is the form-facing representation — the shop owner types
 * cedis, the database stores integer pesewas, so conversion happens in exactly
 * one place (see products.ts).
 */

/** Text inputs arrive as strings; whitespace-only is treated as empty. */
const trimmed = z
  .string()
  .transform((value) => value.trim());

const optionalTrimmed = trimmed.transform((value) => (value === "" ? undefined : value));

/** "12", "12.5", "12.50" — never negative, at most one penny. */
const price = z.coerce
  .number({ message: "Price must be a number" })
  .nonnegative("Price cannot be negative")
  .refine((value) => Number.isFinite(value), "Price must be a number")
  .refine(
    (value) => Math.round(value * 100) === Number((value * 100).toFixed(6)),
    "Price cannot have more than two decimal places",
  );

/** Comma-separated textareas: "Bergamot, Green mandarin". */
const noteList = z
  .string()
  .transform((value) =>
    value
      .split(",")
      .map((note) => note.trim())
      .filter(Boolean),
  );

/** One URL per line, stored as the images string[]. */
const imageUrlList = z
  .string()
  .transform((value) =>
    value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
  );

export const productFormSchema = z.object({
  name: trimmed.pipe(z.string().min(1, "Name is required")),
  slug: trimmed
    .pipe(
      z
        .string()
        .min(1, "Slug is required")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and dashes only"),
    ),
  fragrance_type: trimmed.pipe(z.string().min(1, "Fragrance type is required")),
  size_ml: z.coerce
    .number({ message: "Size must be a number" })
    .int("Size must be a whole number")
    .positive("Size must be greater than zero"),
  price_cedis: price,
  currency: trimmed.pipe(z.string().length(3, "Use a 3-letter code such as GHS")),
  short_description: optionalTrimmed,
  stock_quantity: z.coerce
    .number({ message: "Stock must be a number" })
    .int("Stock must be a whole number")
    .nonnegative("Stock cannot be negative"),
  low_stock_threshold: z.coerce
    .number({ message: "Threshold must be a number" })
    .int("Threshold must be a whole number")
    .nonnegative("Threshold cannot be negative"),
  published: z.boolean(),
  images: imageUrlList,
  top_notes: noteList,
  heart_notes: noteList,
  base_notes: noteList,
});

export type ProductFormValues = z.output<typeof productFormSchema>;

/**
 * What the form fields actually hold before parsing. Defined explicitly
 * (rather than z.input) because zod 3 coerced schemas report input = output;
 * the DOM gives strings, so the form binds this shape.
 */
export interface ProductFormInput {
  name: string;
  slug: string;
  fragrance_type: string;
  size_ml: string;
  price_cedis: string;
  currency: string;
  short_description: string;
  stock_quantity: string;
  low_stock_threshold: string;
  published: boolean;
  images: string;
  top_notes: string;
  heart_notes: string;
  base_notes: string;
}

/** Fresh-product defaults; edit forms spread an existing row over these. */
export const emptyProductForm: ProductFormInput = {
  name: "",
  slug: "",
  fragrance_type: "Eau de parfum",
  size_ml: "50",
  price_cedis: "0",
  currency: "GHS",
  short_description: "",
  stock_quantity: "0",
  low_stock_threshold: "5",
  published: true,
  images: "",
  top_notes: "",
  heart_notes: "",
  base_notes: "",
};

/** Name → URL slug, e.g. "Slow Bloom" → "slow-bloom". */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
