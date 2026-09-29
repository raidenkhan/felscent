import { Link } from "@tanstack/react-router";
import { Reveal } from "../motion";
import { Section } from "./Section";
import { philosophy } from "./content";

/**
 * Section 3 — Brand philosophy.
 * Deliberately not a three-column benefits strip: one large headline, a narrow
 * body column, and a small detail crop, separated by a single hairline.
 */
export function Philosophy() {
  return (
    <Section bordered labelledBy="philosophy-heading">
      <div className="container-editorial">
        <p className="eyebrow">{philosophy.eyebrow}</p>

        <div className="grid-editorial mt-10 gap-y-12 lg:mt-16">
          <Reveal
            as="h2"
            id="philosophy-heading"
            className="text-headline col-span-4 md:col-span-8 lg:col-span-6"
          >
            {philosophy.heading}
          </Reveal>

          <Reveal className="col-span-4 space-y-6 md:col-span-5 lg:col-span-3 lg:col-start-8" delay={120}>
            {philosophy.body.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
            <Link to="/journal" className="link-hairline mt-2 inline-block">
              {philosophy.linkLabel}
            </Link>
          </Reveal>

          <Reveal
            as="figure"
            className="plate-offset col-span-3 mt-6 md:col-span-3 lg:col-span-2 lg:col-start-11"
            delay={240}
          >
            <div className="frame-arch frame-vignette aspect-[3/4] overflow-hidden bg-ivory-deep">
              <img
                src={philosophy.image}
                alt={philosophy.imageAlt}
                width={600}
                height={800}
                loading="lazy"
                className="img-editorial img-cinematic"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
