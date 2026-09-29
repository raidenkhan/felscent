import { Link } from "@tanstack/react-router";
import { Newsletter } from "./Newsletter";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-editorial grid-editorial py-16 md:py-24">
        <div className="col-span-4 md:col-span-8 lg:col-span-5">
          <p className="eyebrow">Letters from Felscent</p>
          <h2 className="mt-4 text-title max-w-sm">Occasional notes on scent, slowness and the season.</h2>
          <div className="mt-8 max-w-sm">
            <Newsletter />
          </div>
        </div>

        <div className="col-span-2 mt-12 md:col-span-2 md:col-start-1 lg:col-span-2 lg:col-start-8 lg:mt-0">
          <p className="eyebrow">Shop</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/collection" className="hover:text-rose transition-colors">Collection</Link></li>
            <li><Link to="/bag" className="hover:text-rose transition-colors">Your bag</Link></li>
          </ul>
        </div>
        <div className="col-span-2 mt-12 md:col-span-2 lg:col-span-2 lg:mt-0">
          <p className="eyebrow">House</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/journal" className="hover:text-rose transition-colors">Journal</Link></li>
            <li><Link to="/" hash="philosophy" className="hover:text-rose transition-colors">Philosophy</Link></li>
          </ul>
        </div>
        <div className="col-span-4 mt-12 md:col-span-4 lg:col-span-2 lg:mt-0">
          <p className="eyebrow">Studio</p>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Placeholder address<br />
            Studio hours by appointment<br />
            hello@felscent.example
          </p>
        </div>
      </div>

      <div className="container-editorial flex flex-col gap-3 border-t border-border py-6 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p className="font-serif text-lg normal-case tracking-[0.3em] text-foreground">FELSCENT</p>
        <p>© {new Date().getFullYear()} Felscent. All rights reserved.</p>
      </div>
    </footer>
  );
}
