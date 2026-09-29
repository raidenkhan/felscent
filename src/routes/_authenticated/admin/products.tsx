import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice, stockStatus } from "@/lib/format";
import { ProductDataError, listProducts, updateProduct } from "@/lib/products";
import type { Product } from "@/lib/types";
import { ProductFormDialog } from "@/site/admin/ProductFormDialog";
import { StockCell } from "@/site/admin/StockCell";

export const Route = createFileRoute("/_authenticated/admin/products")({
  component: AdminProducts,
});

const STOCK_HINTS: Record<string, string> = {
  out: "Sold out",
  low: "At or below threshold",
  in: "Healthy",
};

function AdminProducts() {
  const queryClient = useQueryClient();
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const productsQuery = useQuery({
    queryKey: ["admin", "products"],
    queryFn: listProducts,
  });

  const products = productsQuery.data ?? [];
  const lowStockCount = useMemo(
    () => products.filter((p) => stockStatus(p.stock_quantity, p.low_stock_threshold) !== "in").length,
    [products],
  );

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["admin", "products"] });

  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="container-editorial flex h-16 items-center justify-between md:h-20">
          <Link to="/" className="font-serif text-xl tracking-[0.32em]">
            FELSCENT
          </Link>
          <div className="flex items-center gap-8">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              Stock and products
            </p>
            <Button size="sm" onClick={() => setCreating(true)}>
              <Plus /> New fragrance
            </Button>
          </div>
        </div>
      </header>

      <main className="container-editorial py-10 md:py-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Studio</p>
            <h1 className="text-headline mt-4 max-w-xl">Manage the collection.</h1>
          </div>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {productsQuery.isPending
              ? "Loading…"
              : `${products.length} ${products.length === 1 ? "fragrance" : "fragrances"}${
                  lowStockCount > 0 ? ` · ${lowStockCount} need attention` : ""
                }`}
          </p>
        </div>

        <div className="mt-10">
          {productsQuery.isPending ? (
            <TableSkeleton />
          ) : productsQuery.isError ? (
            <ErrorPanel error={productsQuery.error} onRetry={refresh} />
          ) : products.length === 0 ? (
            <EmptyPanel onNew={() => setCreating(true)} />
          ) : (
            <ProductsTable
              products={products}
              onEdit={(product) => setEditing(product)}
              onChanged={refresh}
            />
          )}
        </div>
      </main>

      <ProductFormDialog
        open={creating}
        onOpenChange={setCreating}
        onSaved={refresh}
      />
      <ProductFormDialog
        open={editing !== null}
        onOpenChange={(open) => {
          if (!open) setEditing(null);
        }}
        product={editing ?? undefined}
        onSaved={refresh}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Table
 * ------------------------------------------------------------------ */

function ProductsTable({
  products,
  onEdit,
  onChanged,
}: {
  products: Product[];
  onEdit: (product: Product) => void;
  onChanged: () => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="eyebrow">Fragrance</TableHead>
          <TableHead className="eyebrow hidden md:table-cell">Type</TableHead>
          <TableHead className="eyebrow hidden md:table-cell">Price</TableHead>
          <TableHead className="eyebrow">Stock</TableHead>
          <TableHead className="eyebrow">Status</TableHead>
          <TableHead className="eyebrow hidden md:table-cell">Visible</TableHead>
          <TableHead className="eyebrow text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <ProductRow key={product.id} product={product} onEdit={onEdit} onChanged={onChanged} />
        ))}
      </TableBody>
    </Table>
  );
}

function ProductRow({
  product,
  onEdit,
  onChanged,
}: {
  product: Product;
  onEdit: (product: Product) => void;
  onChanged: () => void;
}) {
  const status = stockStatus(product.stock_quantity, product.low_stock_threshold);
  const statusColour =
    status === "out"
      ? "text-destructive"
      : status === "low"
        ? "text-warning"
        : "text-success";

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-4 py-1">
          <div className="size-12 shrink-0 overflow-hidden bg-ivory-deep">
            {product.images[0] ? (
              <img
                src={product.images[0]}
                alt=""
                width={48}
                height={48}
                loading="lazy"
                className="img-editorial"
              />
            ) : null}
          </div>
          <div>
            <p className="font-serif text-base leading-tight">{product.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">/{product.slug}</p>
          </div>
        </div>
      </TableCell>

      <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
        {product.fragrance_type} · {product.size_ml} ml
      </TableCell>

      <TableCell className="tabular hidden text-sm md:table-cell">
        {formatPrice(product.price_cents, product.currency)}
      </TableCell>

      <StockCell product={product} onChanged={onChanged} />

      <TableCell className="text-sm">
        <span className={statusColour}>{STOCK_HINTS[status]}</span>
      </TableCell>

      <TableCell className="hidden text-sm md:table-cell">
        {product.published === false ? (
          <span className="text-muted-foreground">Hidden</span>
        ) : (
          "Live"
        )}
      </TableCell>

      <TableCell className="text-right">
        <Button variant="ghost" size="sm" onClick={() => onEdit(product)}>
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
}

/* ------------------------------------------------------------------ *
 * States
 * ------------------------------------------------------------------ */

function TableSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading products">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-6 border-b border-border py-5">
          <div className="size-12 animate-pulse bg-ivory-deep" />
          <div className="h-4 w-40 animate-pulse bg-ivory-deep" />
          <div className="ml-auto h-8 w-20 animate-pulse bg-ivory-deep" />
        </div>
      ))}
    </div>
  );
}

function ErrorPanel({ error, onRetry }: { error: Error; onRetry: () => void }) {
  return (
    <div role="alert" className="border-y border-border py-20 text-center">
      <h2 className="text-title">The collection could not be loaded</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
        {error instanceof ProductDataError ? error.message : "Please try again in a moment."}
      </p>
      <Button variant="outline" className="mt-8" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}

function EmptyPanel({ onNew }: { onNew: () => void }) {
  return (
    <div className="border-y border-border py-20 text-center">
      <h2 className="text-title">Nothing here yet</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
        Add your first fragrance and it will appear in the shop immediately.
      </p>
      <Button className="mt-8" onClick={onNew}>
        <Plus /> New fragrance
      </Button>
    </div>
  );
}
