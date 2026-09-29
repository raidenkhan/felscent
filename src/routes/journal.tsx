import { createFileRoute } from "@tanstack/react-router";
import { formatDate } from "@/lib/format";
import { SiteLayout } from "@/site/SiteLayout";
import { journal } from "@/site/home/content";

export const Route = createFileRoute("/journal")({
  component: JournalRoute,
});

function JournalRoute() {
  return (
    <SiteLayout>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container-editorial">
          <p className="eyebrow">The journal</p>
          <h1 className="text-headline mt-6 max-w-xl">On scent, slowness and the season.</h1>

          <ol className="mt-16 border-t border-border lg:mt-24">
            {journal.map((entry) => (
              <li key={entry.title} className="border-b border-border">
                <article className="grid-editorial items-baseline gap-y-4 py-10">
                  <p className="eyebrow col-span-4 md:col-span-2">{entry.category}</p>
                  <div className="col-span-4 md:col-span-6 lg:col-span-6">
                    <h2 className="text-title">{entry.title}</h2>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {entry.summary}
                    </p>
                  </div>
                  <div className="col-span-4 flex gap-6 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground md:col-span-8 md:col-start-3 lg:col-span-4 lg:col-start-9 lg:justify-end">
                    <time dateTime={entry.date}>{formatDate(entry.date)}</time>
                    <span>{entry.readingTime}</span>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </SiteLayout>
  );
}
