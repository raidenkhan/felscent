import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { SplitText } from "./motion";

const nav = [
  { to: "/collection", label: "Collection" },
  { to: "/journal", label: "Journal" },
] as const;

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-sm">
      <div className="container-editorial flex h-16 items-center justify-between md:h-20">
        <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              aria-label={item.label}
              viewTransition
              className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              <span aria-hidden="true">
                <SplitText text={item.label} wave />
              </span>
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="-ml-2 p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" strokeWidth={1.25} /> : <Menu className="size-5" strokeWidth={1.25} />}
        </button>

        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl tracking-[0.32em] md:text-[1.7rem]"
          aria-label="FELSCENT home"
          viewTransition
        >
          FELSCENT
        </Link>

        <Link
          to="/bag"
          viewTransition
          className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Bag{count > 0 ? ` (${count})` : ""}
        </Link>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-background px-5 py-6 md:hidden"
        >
          <ul className="flex flex-col gap-5">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="font-serif text-2xl"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
