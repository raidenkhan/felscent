import { useEffect, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  emptyProductForm,
  productFormSchema,
  slugify,
  type ProductFormInput,
} from "@/lib/productSchema";
import {
  ProductDataError,
  createProduct,
  formInputToProduct,
  productToFormValues,
  updateProduct,
} from "@/lib/products";
import type { Product } from "@/lib/types";

/**
 * Create/edit dialog for a fragrance.
 *
 * One form serves both modes: pass `product` to edit, omit it to create. The
 * price is typed in cedis and converted to pesewas in formValuesToProduct —
 * the form never sees pesewas.
 */
export function ProductFormDialog({
  open,
  onOpenChange,
  product,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product;
  onSaved: () => void;
}) {
  const isEdit = Boolean(product);

  const defaults = useMemo<ProductFormInput>(
    () => (product ? productToFormValues(product) : emptyProductForm),
    [product],
  );

  // The form binds ProductFormInput (what the fields hold). Because the
  // resolver outputs ProductFormValues but react-hook-form v8 types
  // handleSubmit's argument as TFieldValues, we parse through zod again in
  // onSubmit — formInputToProduct is the single conversion point.
  const form = useForm<ProductFormInput>({
    resolver: zodResolver(productFormSchema) as never,
    defaultValues: defaults,
    mode: "onBlur",
  });

  // Re-seed the form each time the dialog opens for a different product.
  useEffect(() => {
    if (open) form.reset(defaults);
  }, [open, defaults, form]);

  const mutation = useMutation({
    mutationFn: (values: ProductFormInput) => {
      const row = formInputToProduct(values);
      return product ? updateProduct(product.id, row) : createProduct(row);
    },
    onSuccess: (saved) => {
      toast.success(
        isEdit ? `${saved.name} updated.` : `${saved.name} added to the collection.`,
      );
      onOpenChange(false);
      onSaved();
    },
    onError: (error) => {
      toast.error(error instanceof ProductDataError ? error.message : "Could not save");
    },
  });

  const errors = form.formState.errors;
  const name = form.watch("name");

  // Auto-slug from the name while creating, unless the slug was touched.
  const slugDirty = form.formState.dirtyFields.slug;
  useEffect(() => {
    if (!isEdit && !slugDirty && name) {
      form.setValue("slug", slugify(name), { shouldValidate: false });
    }
  }, [name, isEdit, slugDirty, form]);

  function onSubmit(values: ProductFormInput) {
    // mutationFn parses and converts; mutate receives the raw field values.
    mutation.mutate(values);
  }

  const fieldClass =
    "mt-2 w-full border-b border-input bg-transparent py-2 text-sm focus:border-foreground focus:outline-none";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-border bg-background sm:rounded-none">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl font-normal">
            {isEdit ? `Edit ${product?.name}` : "New fragrance"}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {isEdit
              ? "Changes appear in the shop immediately after saving."
              : "It will appear in the shop as soon as it is saved and visible."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="product-name" className="eyebrow">
              Name
            </Label>
            <Input
              id="product-name"
              className="mt-2 rounded-none border-0 border-b px-0"
              placeholder="Slow Bloom"
              {...form.register("name")}
            />
            <FieldError message={errors.name?.message} />
          </div>

          <div>
            <Label htmlFor="product-slug" className="eyebrow">
              Slug
            </Label>
            <input
              id="product-slug"
              className={fieldClass}
              placeholder="slow-bloom"
              {...form.register("slug")}
            />
            <FieldError message={errors.slug?.message} />
          </div>

          <div>
            <Label htmlFor="product-type" className="eyebrow">
              Fragrance type
            </Label>
            <input
              id="product-type"
              className={fieldClass}
              placeholder="Eau de parfum"
              {...form.register("fragrance_type")}
            />
            <FieldError message={errors.fragrance_type?.message} />
          </div>

          <div>
            <Label htmlFor="product-size" className="eyebrow">
              Size (ml)
            </Label>
            <input
              id="product-size"
              type="number"
              min={1}
              className={fieldClass}
              {...form.register("size_ml")}
            />
            <FieldError message={errors.size_ml?.message} />
          </div>

          <div>
            <Label htmlFor="product-price" className="eyebrow">
              Price (GH₵)
            </Label>
            <input
              id="product-price"
              type="number"
              min={0}
              step="0.01"
              className={fieldClass}
              {...form.register("price_cedis")}
            />
            <FieldError message={errors.price_cedis?.message} />
          </div>

          <div>
            <Label htmlFor="product-currency" className="eyebrow">
              Currency
            </Label>
            <input
              id="product-currency"
              className={fieldClass}
              maxLength={3}
              {...form.register("currency")}
            />
            <FieldError message={errors.currency?.message} />
          </div>

          <div>
            <Label htmlFor="product-stock" className="eyebrow">
              Stock quantity
            </Label>
            <input
              id="product-stock"
              type="number"
              min={0}
              className={fieldClass}
              {...form.register("stock_quantity")}
            />
            <FieldError message={errors.stock_quantity?.message} />
          </div>

          <div>
            <Label htmlFor="product-threshold" className="eyebrow">
              Low stock threshold
            </Label>
            <input
              id="product-threshold"
              type="number"
              min={0}
              className={fieldClass}
              {...form.register("low_stock_threshold")}
            />
            <FieldError message={errors.low_stock_threshold?.message} />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="product-description" className="eyebrow">
              Short description (optional)
            </Label>
            <textarea
              id="product-description"
              rows={2}
              className={`${fieldClass} resize-none`}
              {...form.register("short_description")}
            />
            <FieldError message={errors.short_description?.message} />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="product-images" className="eyebrow">
              Image URLs — one per line
            </Label>
            <textarea
              id="product-images"
              rows={2}
              className={`${fieldClass} resize-none`}
              placeholder="https://…"
              {...form.register("images")}
            />
            <FieldError message={errors.images?.message} />
          </div>

          <div>
            <Label htmlFor="product-top" className="eyebrow">
              Top notes (comma separated)
            </Label>
            <input
              id="product-top"
              className={fieldClass}
              placeholder="Bergamot, Green mandarin"
              {...form.register("top_notes")}
            />
          </div>

          <div>
            <Label htmlFor="product-heart" className="eyebrow">
              Heart notes
            </Label>
            <input
              id="product-heart"
              className={fieldClass}
              placeholder="Rose absolute, Violet leaf"
              {...form.register("heart_notes")}
            />
          </div>

          <div>
            <Label htmlFor="product-base" className="eyebrow">
              Base notes
            </Label>
            <input
              id="product-base"
              className={fieldClass}
              placeholder="Cedar, Soft musk"
              {...form.register("base_notes")}
            />
          </div>

          <div className="flex items-center justify-between border-t border-border pt-6 sm:col-span-2">
            <div className="flex items-center gap-4">
              <input
                id="product-published"
                type="checkbox"
                className="size-4 cursor-pointer accent-[var(--ink)]"
                checked={form.watch("published")}
                onChange={(event) => form.setValue("published", event.target.checked)}
              />
              <Label htmlFor="product-published" className="text-sm">
                Visible in the shop
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="rose" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving…" : isEdit ? "Save changes" : "Add fragrance"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs text-destructive">
      {message}
    </p>
  );
}
