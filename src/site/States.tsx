import { Button } from "@/components/ui/button";

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid-editorial gap-y-14" aria-busy="true" aria-label="Loading collection">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="col-span-2 md:col-span-4 lg:col-span-3">
          <div className="aspect-[4/5] animate-pulse bg-ivory-deep" />
          <div className="mt-5 h-5 w-2/3 animate-pulse bg-ivory-deep" />
          <div className="mt-2 h-3 w-1/3 animate-pulse bg-ivory-deep" />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-y border-border py-20 text-center">
      <h2 className="text-title">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

export function ErrorState({ title, body, onRetry }: { title: string; body: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="border-y border-border py-20 text-center">
      <h2 className="text-title">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">{body}</p>
      {onRetry && (
        <Button variant="outline" className="mt-8" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
