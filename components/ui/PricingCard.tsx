"use client";

import { TbCheck } from "react-icons/tb";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface PricingTier {
  name: string;
  price: string;
  cadence?: string;
  description: string;
  features: string[];
  featured?: boolean;
  ctaLabel: string;
  ctaHref: string;
}

export function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-card border p-8 transition-colors duration-300 ease-signature",
        tier.featured
          ? "border-gold bg-charcoal text-ivory"
          : "border-hairline bg-ivory text-ink hover:border-gold/60"
      )}
    >
      {tier.featured && (
        <p className="mb-4 inline-flex w-fit items-center rounded-full border border-gold px-3 py-1 font-mono text-caption uppercase tracking-[0.1em] text-gold">
          Most requested
        </p>
      )}

      <p
        className={cn(
          "font-mono text-caption uppercase tracking-[0.1em]",
          tier.featured ? "text-ivory/50" : "text-ink-faint"
        )}
      >
        {tier.name}
      </p>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-display text-display-m">{tier.price}</span>
        {tier.cadence && (
          <span className={cn("text-body-s", tier.featured ? "text-ivory/50" : "text-ink-faint")}>
            {tier.cadence}
          </span>
        )}
      </div>

      <p className={cn("mt-4 text-body-s", tier.featured ? "text-ivory/70" : "text-ink-soft")}>
        {tier.description}
      </p>

      <ul className="mt-8 flex-1 space-y-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-body-s">
            <TbCheck
              className={cn("mt-0.5 shrink-0", tier.featured ? "text-gold" : "text-gold-text")}
              aria-hidden="true"
            />
            <span className={tier.featured ? "text-ivory/85" : "text-ink-soft"}>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button
          href={tier.ctaHref}
          variant={tier.featured ? "onDark" : "ghost"}
          className="w-full justify-center"
        >
          {tier.ctaLabel}
        </Button>
      </div>
    </div>
  );
}
