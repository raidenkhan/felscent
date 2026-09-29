import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import "./motion.css";

/*
 * FELSCENT motion kit.
 *
 * House rules:
 *  - Everything eases with --ease-editorial and stays quiet: small distances,
 *    long durations, nothing that bounces.
 *  - Every effect respects prefers-reduced-motion (components bail out, CSS
 *    initial states only exist inside the no-preference media query).
 *  - SSR-safe: initial markup is the final, visible state; JS upgrades it.
 */

function motionOK(): boolean {
  return (
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function finePointer(): boolean {
  return (
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(pointer: fine)").matches
  );
}

/* ------------------------------------------------------------------ */
/* Reveal — scroll-triggered entrance for any block                    */
/* ------------------------------------------------------------------ */

interface RevealProps {
  children: ReactNode;
  /** Extra delay in ms, for staggering siblings. */
  delay?: number;
  as?: "div" | "section" | "figure" | "li" | "span" | "article" | "h2";
  className?: string;
  id?: string;
}

export function Reveal({ children, delay = 0, as = "div", className, id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!motionOK() || !("IntersectionObserver" in window)) {
      el.classList.add("is-inview");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-inview");
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as unknown as React.ElementType;
  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;
  return (
    <Tag ref={ref as never} id={id} className={["reveal", className].filter(Boolean).join(" ")} style={style}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* SplitText — per-letter entrance and/or hover wave                   */
/* ------------------------------------------------------------------ */

interface SplitTextProps {
  text: string;
  className?: string;
  /** Animate letters rising in on mount (hero only — it plays once). */
  entrance?: boolean;
  /** Wave the letters on hover (nav links, headline flourishes). */
  wave?: boolean;
  /** Delay before the first letter rises, ms. */
  delay?: number;
  /** Gap between letters, ms. */
  step?: number;
}

export function SplitText({
  text,
  className,
  entrance = false,
  wave = false,
  delay = 0,
  step = 30,
}: SplitTextProps) {
  const [entered, setEntered] = useState(false);
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <span
      className={["split-root", wave ? "split-wave" : "", className ?? ""].filter(Boolean).join(" ")}
      aria-label={text}
      onAnimationEnd={() => setEntered(true)}
    >
      {words.map((word, wi) => {
        const chars = Array.from(word).map((ch, ci) => {
          const i = charIndex++;
          const animating = entrance && !entered;
          return (
            <span
              key={ci}
              aria-hidden="true"
              className={[
                "split-char",
                animating ? "split-char-enter" : "",
              ].filter(Boolean).join(" ")}
              style={
                {
                  "--char-i": i,
                  ...(animating ? { animationDelay: `${delay + i * step}ms` } : null),
                } as CSSProperties
              }
            >
              {ch}
            </span>
          );
        });
        charIndex++; // count the space so the wave cascades across words
        return (
          <span key={wi} aria-hidden="true" className="split-word">
            {chars}
          </span>
        );
      })}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic — buttons lean toward a nearby cursor                      */
/* ------------------------------------------------------------------ */

interface MagneticProps {
  children: ReactNode;
  /** 0–1; how far the element chases the cursor. Keep small. */
  strength?: number;
  className?: string;
}

export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const zoneRef = useRef<HTMLSpanElement>(null);
  const targetRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!motionOK() || !finePointer()) return;
    const zone = zoneRef.current;
    const target = targetRef.current;
    if (!zone || !target) return;

    const xTo = gsap.quickTo(target, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(target, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const r = zone.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      xTo(dx * strength);
      yTo(dy * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    zone.addEventListener("pointermove", onMove);
    zone.addEventListener("pointerleave", onLeave);
    return () => {
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(target);
    };
  }, [strength]);

  return (
    // The zone carries invisible padding so the pull begins before the
    // cursor actually touches the link — a proximity halo.
    <span ref={zoneRef} className={["magnetic", className].filter(Boolean).join(" ")}>
      <span ref={targetRef} className="magnetic-target inline-block will-change-transform">
        {children}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Cursor — ink dot + trailing ring; becomes a "View" disc over cards  */
/* ------------------------------------------------------------------ */

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!motionOK() || !finePointer()) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    document.documentElement.classList.add("has-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let seen = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!seen) {
        seen = true;
        rx = x;
        ry = y;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const hit = target?.closest?.("a, button, [role='button'], input, textarea, select, label, [data-cursor]");
      const view = target?.closest?.("[data-cursor='view']");
      const variant = view ? "view" : hit ? "link" : "default";
      ring.dataset.variant = variant;
      dot.dataset.variant = variant;
      label.textContent =
        variant === "view"
          ? ((view as HTMLElement).dataset.cursorLabel ?? "View")
          : "";
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      dot.style.transform = `translate(${x}px, ${y}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} aria-hidden="true" className="cursor-dot" />
      <div ref={ringRef} aria-hidden="true" className="cursor-ring" data-variant="default">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Parallax — a whisper of vertical drift on hero imagery              */
/* ------------------------------------------------------------------ */

interface ParallaxProps {
  children: ReactNode;
  /** Fraction of viewport-relative offset. 0.04–0.08 is the house range. */
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.05, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!motionOK() || !finePointer()) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const centre = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-centre * speed).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={ref} className={["parallax", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
