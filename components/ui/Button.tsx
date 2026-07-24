"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/useMagnetic";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "onDark";
  className?: string;
}

const variants = {
  primary: "bg-ink text-ivory hover:bg-gold hover:text-ivory",
  ghost: "border border-hairline text-ink hover:border-gold hover:text-gold",
  onDark: "bg-gold text-charcoal hover:bg-gold-bright",
};

/**
 * The site's single button primitive. Magnetic pull is applied via
 * useMagnetic on every variant — this is the one micro-interaction the
 * brief calls "magnetic buttons," so it lives in one place rather than
 * being reimplemented per CTA.
 */
export function Button({ href, children, variant = "primary", className }: ButtonProps) {
  const magnetic = useMagnetic<HTMLAnchorElement>(0.2);

  return (
    <Link
      href={href}
      ref={magnetic.ref}
      onPointerMove={magnetic.onPointerMove}
      onPointerLeave={magnetic.onPointerLeave}
      onPointerDown={magnetic.onPointerDown}
      onPointerUp={magnetic.onPointerUp}
      className={cn(
        "inline-flex items-center gap-2 rounded px-7 py-3.5 font-mono text-eyebrow uppercase tracking-[0.1em] transition-colors duration-300 ease-signature",
        variants[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}
