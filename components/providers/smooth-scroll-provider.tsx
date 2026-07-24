"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Wraps the app in a single Lenis instance, driven by the GSAP ticker
 * rather than its own requestAnimationFrame loop. This is required for
 * the hero's pinned ScrollTrigger timeline (and every other
 * scroll-triggered animation) to stay perfectly in sync with the
 * smoothed scroll position — running two independent rAF loops causes
 * visible lag between what the user feels and what GSAP measures.
 *
 * Respects prefers-reduced-motion by leaving native scroll untouched;
 * ScrollTrigger-based components must check the same media query and
 * fall back to a static, fully-visible state (see Hero.tsx).
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
