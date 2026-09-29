import { Reveal } from "../motion";
import { Section } from "./Section";
import { botanicalsIntro, ingredients } from "./content";

/**
 * Section 4 — Botanical ingredients.
 * Alternating image and text blocks. Images always take more space than the
 * copy, names stay in uppercase sans with a hairline between entries.
 */
export function Botanicals() {
  return (
    <Section labelledBy="botanicals-heading">
      <div className="container-editorial">
        <div className="grid-editorial">
          <Reveal className="col-span-4 md:col-span-5 lg:col-span-4">
            <p className="eyebrow">{botanicalsIntro.eyebrow}</p>
            <h2 id="botanicals-heading" className="text-headline mt-6">
              {botanicalsIntro.heading}
            </h2>
          </Reveal>
        </div>

        <ol className="mt-16 lg:mt-24">
          {ingredients.map((ingredient, index) => {
            const reversed = index % 2 === 1;

            return (
              <li
                key={ingredient.name}
                className="grid-editorial items-end gap-y-8 border-t border-border py-12 first:border-t-0 first:pt-0 lg:py-16"
              >
                <Reveal
                  as="figure"
                  className={
                    reversed
                      ? "col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7 lg:row-start-1"
                      : "col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-1 lg:row-start-1"
                  }
                >
                  <div
                    className={`${
                      reversed ? "frame-dome" : "frame-arch"
                    } frame-vignette aspect-[4/3] overflow-hidden bg-ivory-deep`}
                  >
                    <img
                      src={ingredient.image}
                      alt={ingredient.imageAlt}
                      width={1200}
                      height={900}
                      loading="lazy"
                      style={ingredient.imagePosition ? { objectPosition: ingredient.imagePosition } : undefined}
                      className="img-editorial img-cinematic"
                    />
                  </div>
                </Reveal>

                <Reveal
                  delay={140}
                  className={
                    reversed
                      ? "col-span-4 md:col-span-5 lg:col-span-3 lg:col-start-2 lg:row-start-1"
                      : "col-span-4 md:col-span-5 lg:col-span-3 lg:col-start-9 lg:row-start-1"
                  }
                >
                  <dl>
                    <dt className="sr-only">Ingredient</dt>
                    <dd className="text-sm uppercase tracking-[0.22em]">{ingredient.name}</dd>

                    <dt className="sr-only">Sensory description</dt>
                    <dd className="mt-4 font-serif text-2xl leading-snug text-foreground">
                      {ingredient.sensory}
                    </dd>
                  </dl>
                  <p className="mt-6 border-t border-border pt-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                    {ingredient.noteCategory} · {ingredient.detail}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
