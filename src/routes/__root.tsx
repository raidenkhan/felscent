import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { CartProvider } from "@/lib/cart";
import { Toaster } from "@/components/ui/sonner";
import appCss from "../styles.css?url";

const title = "FELSCENT — Fragrance that arrives slowly";
const description =
  "Eau de parfum composed to unfold over hours rather than minutes. Notes arrive gradually, not all at once.";
const ogImage = "/og.jpg";

/** One client for the whole app; admin queries live here too. */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { name: "theme-color", content: "#F4F0E8" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "FELSCENT" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;1,6..96,400&family=Jost:wght@300;400;500&family=Pinyon+Script&display=swap",
      },
    ],
  }),
  shellComponent: RootDocument,
  component: RootComponent,
  notFoundComponent: NotFound,
});

/** The document itself. Admin routes render here too, without the storefront chrome. */
function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* Paper-grain texture over everything; fixed, pointer-transparent. */}
        <div aria-hidden="true" className="grain-overlay" />
        <QueryClientProvider client={queryClient}>
          <CartProvider>{children}</CartProvider>
        </QueryClientProvider>
        <Toaster position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-5 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="text-headline mt-6">This page has drifted off.</h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          The link may be old, or the page may have been moved.
        </p>
        <Link to="/" className="link-hairline mt-10 inline-block">
          Return home
        </Link>
      </div>
    </div>
  );
}
