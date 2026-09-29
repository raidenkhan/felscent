import { useRef, useState, type FormEvent } from "react";

/**
 * Newsletter signup (footer).
 * Microinteractions: the "Your email" label floats above the field once you
 * type, and success swaps the form for a confirmation with a hand-drawn
 * checkmark that draws itself (stroke-dashoffset animation).
 */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      inputRef.current?.focus();
      return;
    }
    setState("done");
  }

  if (state === "done") {
    return (
      <p className="check-reveal flex items-start gap-3 text-sm text-muted-foreground" role="status">
        <svg
          className="check-draw mt-0.5 size-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 12.5l5.2 5L20 6.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
          />
        </svg>
        <span>Thank you. We write rarely, and only when there is something worth saying.</span>
      </p>
    );
  }

  const floating = email.length > 0;

  return (
    <form onSubmit={submit} className="float-field relative border-b border-foreground pb-2">
      <label
        htmlFor="newsletter-email"
        className={[
          "float-label block origin-left transition-all duration-300",
          floating
            ? "translate-y-0 text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground"
            : "translate-y-4 text-sm normal-case tracking-normal text-muted-foreground",
        ].join(" ")}
      >
        Your email
      </label>
      <input
        id="newsletter-email"
        ref={inputRef}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder=" "
        className="mt-0 w-full bg-transparent pt-5 text-sm focus:outline-none"
      />
      <button type="submit" className="link-hairline absolute bottom-2 right-0">
        Subscribe
      </button>
    </form>
  );
}
