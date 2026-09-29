import { Link } from "@tanstack/react-router";
import { Reveal } from "../motion";
import { Section } from "./Section";
import { journal, journalIntro } from "./content";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : dateFormat.format(parsed);
}

/**
 * Section 9 — Journal preview.
 * Quiet and typographic: category, headline, one-sentence summary. No badges.
 */
export function JournalPreview() {
  return (
    <Section labelledBy="journal-heading">
      <div className="container-editorial">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{journalIntro.eyebrow}</p>
            <h2 id="journal-heading" className="text-headline mt-6 max-w-lg">
              {journalIntro.heading}
            </h2>
          </div>
          <Link to="/journal" className="link-hairline">
            {journalIntro.linkLabel}
          </Link>
        </Reveal>

        <div className="grid-editorial mt-16 gap-y-14 lg:mt-24">
          {journal.map((entry, index) => (
            <Reveal
              as="article"
              key={entry.title}
              delay={index * 120}
              className="col-span-4 md:col-span-4 lg:col-span-4"
            >
              <Link to="/journal" className="group block">
                <div className="aspect-[4/3] overflow-hidden bg-ivory-deep">
                  <img
                    src={entry.image}
                    alt={entry.imageAlt}
                    width={1000}
                    height={750}
                    loading="lazy"
                    className="img-editorial img-cinematic"
                  />
                </div>
                <div className="mt-6 flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  <span>{entry.category}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={entry.date}>{formatDate(entry.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{entry.readingTime}</span>
                </div>
                <h3 className="mt-4 font-serif text-2xl leading-snug transition-colors group-hover:text-rose">
                  {entry.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {entry.summary}
                </p>
                <span className="link-hairline mt-6 inline-block">Read more</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
