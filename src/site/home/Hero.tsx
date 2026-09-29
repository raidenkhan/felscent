import { Link } from "@tanstack/react-router";
import { hero } from "./content";
import { Magnetic, Parallax, SplitText } from "../motion";

/**
 * Section 2 — Hero fragrance story.
 * Asymmetric: narrow text column left, 7-column image right on desktop.
 * Stacks with the statement first on mobile so the headline leads the page.
 *
 * Motion: the headline rises letter-by-letter on load, the CTAs lean toward
 * the cursor, and the photograph drifts on a slow parallax.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-statement"
      className="container-editorial pt-12 pb-12 md:pt-16 md:pb-16 lg:pt-24 lg:pb-20"
    >
      <div className="grid-editorial items-end gap-y-14">
        <div className="col-span-4 md:col-span-6 lg:col-span-4">
          <p className="text-script animate-fade-up text-4xl leading-none text-taupe-deep">
            {hero.eyebrow}
          </p>
          <h1 id="hero-statement" className="text-display mt-8" aria-label={hero.statement}>
            <SplitText text={hero.statement} entrance delay={350} step={26} />
          </h1>
          <p
            className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            {hero.body}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
            <Magnetic>
              <Link
                to="/fragrance/$slug"
                params={{ slug: hero.slug }}
                className="link-hairline"
              >
                {hero.primaryCta}
              </Link>
            </Magnetic>
            <Magnetic strength={0.22}>
              <Link to="/collection" className="link-hairline text-muted-foreground hover:text-foreground">
                {hero.secondaryCta}
              </Link>
            </Magnetic>
          </div>
        </div>

        <figure
          className="col-span-4 animate-fade-up md:col-span-8 md:col-start-1 lg:col-span-7 lg:col-start-6"
          style={{ animationDelay: "240ms" }}
        >
          <Parallax speed={0.05}>
            <div className="bloom">
              <img
                src={hero.image}
                alt=""
                aria-hidden="true"
                className="bloom-blob animate-bloom"
              />
              <div className="frame-arch frame-vignette aspect-[3/4] overflow-hidden bg-ivory-deep">
                <img
                  src={hero.image}
                  alt={hero.imageAlt}
                  width={1400}
                  height={1867}
                  fetchPriority="high"
                  className="img-editorial img-cinematic"
                />
              </div>
            </div>
          </Parallax>
          <figcaption className="mt-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
            {hero.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
