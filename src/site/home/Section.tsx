import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "ivory" | "feature";

interface Props {
  children: ReactNode;
  /** Ivory is the default page ground; feature is the espresso-black immersive break. */
  tone?: Tone;
  /**
   * Vertical padding is half the section rhythm on each side, so two adjacent
   * sections combine to the 96 / 128 / 160px spacing the design system asks for
   * rather than doubling it.
   */
  size?: "default" | "compact";
  /** Renders a hairline above the section. */
  bordered?: boolean;
  id?: string;
  labelledBy?: string;
  className?: string;
}

export function Section({
  children,
  tone = "ivory",
  size = "default",
  bordered = false,
  id,
  labelledBy,
  className,
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        tone === "feature" && "bg-feature text-feature-foreground",
        bordered && "border-t border-border",
        size === "compact" ? "py-8 md:py-10 lg:py-12" : "py-12 md:py-16 lg:py-20",
        className,
      )}
    >
      {children}
    </section>
  );
}
