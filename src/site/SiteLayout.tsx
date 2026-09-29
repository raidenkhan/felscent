import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Cursor } from "./motion";

/**
 * Storefront chrome: skip link, editorial header, main outlet, footer.
 * Also mounts the house custom cursor (self-disabling on touch devices and
 * for reduced-motion users) — it lives here so every page carries it.
 */
export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Cursor />
      <div className="ambient" aria-hidden="true" />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
