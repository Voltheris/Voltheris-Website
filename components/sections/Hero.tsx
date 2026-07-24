"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";

// Fixed, hand-placed particle positions — deterministic (no Math.random
// in render) so server and client markup match. Reads as an elegant
// scatter, not noise.
const PARTICLES = [
  { x: 18, y: 22 }, { x: 82, y: 18 }, { x: 12, y: 68 }, { x: 88, y: 72 },
  { x: 30, y: 12 }, { x: 70, y: 85 }, { x: 8, y: 42 }, { x: 92, y: 46 },
  { x: 46, y: 8 }, { x: 54, y: 92 }, { x: 24, y: 88 }, { x: 76, y: 10 },
  { x: 62, y: 30 }, { x: 38, y: 78 },
];

const LINES = [
  { x1: 10, y1: 15, x2: 22, y2: 30 },
  { x1: 90, y1: 20, x2: 78, y2: 34 },
  { x1: 14, y1: 80, x2: 26, y2: 66 },
  { x1: 86, y1: 78, x2: 74, y2: 64 },
];

/**
 * The homepage hero — a pinned, scroll-scrubbed sequence.
 *
 * At rest (scroll 0): only the VOLTHERIS wordmark and its underline are
 * visible. No nav, no copy, no buttons — matches the brief's "almost
 * silent" opening.
 *
 * Scrubbed through three phases as the section stays pinned:
 *  1. Letters separate (tracking widens), the underline (the Current)
 *     stretches, the word expands slightly.
 *  2. Particles and thin lines fade in and drift; the word settles down
 *     to a smaller, permanent "logo" scale near the top.
 *  3. The tagline, description, and CTAs rise in; the floating nav
 *     (`#site-nav`, rendered in the layout) fades in last.
 *
 * Reduced motion: skips the pin/scrub entirely and renders the final
 * revealed state immediately, including a visible nav.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<SVGSVGElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(revealRef.current, { opacity: 1, y: 0 });
        gsap.set(scrollCueRef.current, { opacity: 0 });
        gsap.set("#site-nav", { opacity: 1, y: 0, pointerEvents: "auto" });
        return;
      }

      gsap.set(underlineRef.current, { transformOrigin: "center" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=175%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl
        // Phase 0 — the cue disappears the instant scrolling begins.
        .to(scrollCueRef.current, { opacity: 0, duration: 0.06 }, 0)
        // Phase 1 — letters separate, the underline stretches, the word swells.
        .to(wordRef.current, { letterSpacing: "0.1em", scale: 1.06, duration: 0.34 }, 0)
        .to(underlineRef.current, { scaleX: 1.9, duration: 0.34 }, 0)
        // Phase 2 — particles and thin lines drift in.
        .to(".hero-particle", { opacity: 1, stagger: 0.02, duration: 0.4 }, 0.28)
        // Phase 2 (cont.) — the wordmark settles to its permanent, smaller scale.
        .to(groupRef.current, { scale: 0.55, y: "-22vh", duration: 0.45 }, 0.4)
        .to(wordRef.current, { letterSpacing: "0.05em", duration: 0.45 }, 0.4)
        .to(underlineRef.current, { scaleX: 1, opacity: 0.55, duration: 0.45 }, 0.4)
        // Phase 3 — the company reveals itself: copy, CTAs, then nav.
        .to(revealRef.current, { opacity: 1, y: 0, duration: 0.32 }, 0.6)
        .to("#site-nav", { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.28 }, 0.72);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-ivory px-gutter text-center"
    >
      <div
        ref={particlesRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="hero-particle absolute h-[3px] w-[3px] rounded-full bg-gold opacity-0"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          />
        ))}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          {LINES.map((l, i) => (
            <line
              key={i}
              className="hero-particle"
              x1={`${l.x1}%`}
              y1={`${l.y1}%`}
              x2={`${l.x2}%`}
              y2={`${l.y2}%`}
              stroke="#B08D57"
              strokeWidth="1"
              opacity="0"
            />
          ))}
        </svg>
      </div>

      <div ref={groupRef} className="relative z-10">
        <h1
          ref={wordRef}
          className="select-none font-display text-display-2xl leading-none tracking-tight text-ink"
        >
          VOLTHERIS
        </h1>
        <svg
          ref={underlineRef}
          viewBox="0 0 320 6"
          className="mx-auto mt-5 h-1.5 w-56 sm:w-72"
          aria-hidden="true"
        >
          <path d="M2 3 H318" className="the-current" />
        </svg>
      </div>

      <div
        ref={revealRef}
        className="relative z-10 mt-10 max-w-content opacity-0"
        style={{ transform: "translateY(24px)" }}
      >
        <p className="u-eyebrow">AI systems for business automation</p>
        <p className="mx-auto mt-5 max-w-prose text-body-l text-ink-soft">
          Voltheris designs AI systems that run lead generation,
          qualification, CRM, and scheduling — quietly, precisely, and
          without friction.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact">Book a consultation</Button>
          <Button href="/services" variant="ghost">
            Explore services
          </Button>
        </div>
      </div>

      <div
        ref={scrollCueRef}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="u-eyebrow">Scroll</span>
        <span className="h-10 w-px bg-hairline" />
      </div>
    </section>
  );
}
