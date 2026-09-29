import { Link } from "@tanstack/react-router";
import { Parallax, Reveal } from "../motion";
import { Section } from "./Section";
import { ritual } from "./content";

/**
 * Section 5 — Lifestyle and skin ritual.
 * Asymmetric split: one large image against a small text block, with negative
 * space doing the work instead of icons or containers.
 */
export function Ritual() {
  return (
    <Section bordered labelledBy="ritual-heading">
      <div className="container-editorial grid-editorial items-center gap-y-12">
        <Reveal
          as="figure"
          className="plate-offset-blush col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-1"
        >
          <Parallax speed={0.04}>
            <div className="frame-dome frame-vignette aspect-[5/4] overflow-hidden bg-ivory-deep">
              <img
                src={ritual.image}
                alt={ritual.imageAlt}
                width={1400}
                height={1120}
                loading="lazy"
                className="img-editorial img-cinematic"
              />
            </div>
          </Parallax>
          <figcaption className="mt-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
            {ritual.caption}
          </figcaption>
        </Reveal>

        <Reveal delay={140} className="col-span-4 md:col-span-6 lg:col-span-3 lg:col-start-10">
          <p className="eyebrow">{ritual.eyebrow}</p>
          <h2 id="ritual-heading" className="text-title mt-6">
            {ritual.heading}
          </h2>
          <div className="mt-6 space-y-5">
            {ritual.body.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
          <Link
            to="/fragrance/$slug"
            params={{ slug: ritual.slug }}
            className="link-hairline mt-8 inline-block"
          >
            {ritual.linkLabel}
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
