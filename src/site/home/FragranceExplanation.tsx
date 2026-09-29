import { Reveal } from "../motion";
import { Section } from "./Section";
import { explanation } from "./content";

/**
 * Section 8 — Fragrance explanation.
 * The one place where a centred editorial statement is allowed. The
 * progression is set with editorial labels and hairlines, never icons.
 */
export function FragranceExplanation() {
  return (
    <Section bordered labelledBy="explanation-heading">
      <div className="container-editorial">
        <Reveal className="mx-auto max-w-3xl text-center">
          {/* The script line plays the eyebrow's role here — the one section
              where a handwritten flourish stands instead of the label. */}
          <p className="text-script text-3xl text-rose">{explanation.eyebrow}</p>
          <h2 id="explanation-heading" className="text-headline mt-4">
            {explanation.statement}
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {explanation.body}
          </p>
        </Reveal>

        <ol className="mt-20 grid grid-cols-1 border-t border-border md:mt-28 md:grid-cols-3">
          {explanation.stages.map((stage, index) => (
            <Reveal
              as="li"
              key={stage.label}
              delay={index * 120}
              className="border-b border-border py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <span className="eyebrow">
                0{index + 1} — {stage.label}
              </span>
              <p className="mt-5 font-serif text-2xl leading-snug">{stage.copy}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
