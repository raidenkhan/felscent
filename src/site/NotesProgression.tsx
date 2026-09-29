interface Props {
  top: string[];
  heart: string[];
  base: string[];
  dark?: boolean;
}

const stages = [
  { key: "top", label: "First impression", time: "0 – 15 min", copy: "The opening. Bright, fleeting, an introduction." },
  { key: "heart", label: "Heart", time: "15 min – 3 h", copy: "The character of the fragrance, once it has settled." },
  { key: "base", label: "Dry-down", time: "3 h onward", copy: "What remains on the skin at the end of the day." },
] as const;

export function NotesProgression({ top, heart, base, dark = false }: Props) {
  const notes = { top, heart, base };
  const muted = dark ? "text-feature-muted" : "text-muted-foreground";
  const border = dark ? "border-feature-border" : "border-border";

  return (
    <ol className={`grid grid-cols-1 border-t ${border} md:grid-cols-3`}>
      {stages.map((stage, i) => (
        <li key={stage.key} className={`border-b ${border} py-8 md:border-b-0 md:border-r md:px-8 md:last:border-r-0 md:first:pl-0 md:last:pr-0`}>
          <div className="flex items-baseline justify-between">
            <span className={`eyebrow ${dark ? "text-feature-muted" : ""}`}>0{i + 1} — {stage.label}</span>
            <span className={`text-[0.65rem] tracking-[0.15em] ${muted}`}>{stage.time}</span>
          </div>
          <p className="mt-5 font-serif text-2xl leading-snug">
            {notes[stage.key].length ? notes[stage.key].join(", ") : "—"}
          </p>
          <p className={`mt-3 text-sm leading-relaxed ${muted}`}>{stage.copy}</p>
        </li>
      ))}
    </ol>
  );
}
