import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { TableCell } from "@/components/ui/table";
import { stockStatus } from "@/lib/format";
import { ProductDataError, updateProduct } from "@/lib/products";
import type { Product } from "@/lib/types";

/**
 * Inline stock editor for one table row.
 *
 * Local state makes typing feel immediate (no lost keystrokes while the
 * request is in flight); the value persists on blur, Enter or stepper press.
 */
export function StockCell({
  product,
  onChanged,
}: {
  product: Product;
  onChanged: () => void;
}) {
  const [draft, setDraft] = useState(String(product.stock_quantity));
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (!dirty) setDraft(String(product.stock_quantity));
  }, [product.stock_quantity, dirty]);

  const mutation = useMutation({
    mutationFn: (quantity: number) => updateProduct(product.id, { stock_quantity: quantity }),
    onSuccess: (updated) => {
      setDirty(false);
      setDraft(String(updated.stock_quantity));
      onChanged();
      toast.success(`${updated.name} — stock saved at ${updated.stock_quantity}`);
    },
    onError: (error) => {
      setDraft(String(product.stock_quantity));
      toast.error(error instanceof ProductDataError ? error.message : "Could not save stock");
    },
  });

  function commit(raw: string) {
    const parsed = Number.parseInt(raw, 10);
    if (Number.isNaN(parsed) || parsed < 0) {
      setDraft(String(product.stock_quantity));
      setDirty(false);
      return;
    }
    if (parsed === product.stock_quantity) {
      setDirty(false);
      return;
    }
    mutation.mutate(parsed);
  }

  const status = stockStatus(product.stock_quantity, product.low_stock_threshold);

  return (
    <TableCell>
      <div
        className={`inline-flex items-center border ${
          status === "out" ? "border-destructive/60" : "border-input"
        }`}
      >
        <button
          type="button"
          aria-label={`Decrease stock of ${product.name}`}
          disabled={mutation.isPending || product.stock_quantity === 0}
          onClick={() => {
            setDirty(true);
            commit(String(product.stock_quantity - 1));
          }}
          className="px-2 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-40"
        >
          <Minus className="size-3.5" />
        </button>

        <input
          aria-label={`Stock quantity for ${product.name}`}
          className="w-12 border-x border-input bg-transparent py-1.5 text-center text-sm tabular-nums focus:outline-none"
          inputMode="numeric"
          pattern="[0-9]*"
          value={draft}
          onChange={(event) => {
            setDirty(true);
            setDraft(event.target.value.replace(/[^\d]/g, ""));
          }}
          onBlur={(event) => commit(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              commit(event.currentTarget.value);
              event.currentTarget.blur();
            }
            if (event.key === "Escape") {
              setDraft(String(product.stock_quantity));
              setDirty(false);
            }
          }}
        />

        <button
          type="button"
          aria-label={`Increase stock of ${product.name}`}
          disabled={mutation.isPending}
          onClick={() => {
            setDirty(true);
            commit(String(product.stock_quantity + 1));
          }}
          className="px-2 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-40"
        >
          <Plus className="size-3.5" />
        </button>
      </div>

      {mutation.isPending && (
        <span className="ml-3 text-xs text-muted-foreground" role="status">
          Saving…
        </span>
      )}
      {dirty && !mutation.isPending && (
        <span className="ml-3 text-xs text-muted-foreground">Press Enter to save</span>
      )}
      {status !== "in" && !dirty && !mutation.isPending && (
        <span
          className={`ml-3 text-xs ${status === "out" ? "text-destructive" : "text-warning"}`}
        >
          {product.low_stock_threshold} or fewer left
        </span>
      )}
    </TableCell>
  );
}
