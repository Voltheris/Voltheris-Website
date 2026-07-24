"use client";

import { useRef, type PointerEvent } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Subtle magnetic pull toward the pointer, used on primary buttons.
 * Strength is deliberately small (0.25) — this should read as the
 * button noticing the cursor, not chasing it.
 *
 * Press feedback (a small scale-down on pointer down) is handled here
 * too, via GSAP, rather than a Tailwind `active:scale-*` class — the
 * hook already drives `transform` on this element on every pointer
 * move, and an inline style always wins over a CSS class targeting the
 * same property, so a class-based press effect would be silently
 * overridden the moment the pointer moves.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(strength = 0.25) {
  const ref = useRef<T | null>(null);

  function onPointerMove(e: PointerEvent<T>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.5,
      ease: "back.out(1.4)",
    });
  }

  function onPointerLeave() {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.4)" });
  }

  function onPointerDown() {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { scale: 0.96, duration: 0.15, ease: "power2.out" });
  }

  function onPointerUp() {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { scale: 1, duration: 0.4, ease: "back.out(1.4)" });
  }

  return { ref, onPointerMove, onPointerLeave, onPointerDown, onPointerUp };
}
