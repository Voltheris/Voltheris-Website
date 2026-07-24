import type { PricingTier } from "@/components/ui/PricingCard";

export const pricingTiers: PricingTier[] = [
  {
    name: "Foundation",
    price: "$1,500",
    cadence: "/mo",
    description: "For a single, well-defined workflow — usually lead capture and qualification.",
    features: [
      "One automated workflow",
      "CRM integration",
      "Monthly performance reporting",
      "Email support",
    ],
    ctaLabel: "Start here",
    ctaHref: "/contact",
  },
  {
    name: "Momentum",
    price: "$3,800",
    cadence: "/mo",
    description: "For teams automating the full pipeline, from first touch to booked meeting.",
    features: [
      "Up to four automated workflows",
      "Full CRM and calendar integration",
      "Weekly optimization reviews",
      "Priority support, same-day response",
    ],
    featured: true,
    ctaLabel: "Book a consultation",
    ctaHref: "/contact",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For multi-location or high-complexity operations that need a dedicated build.",
    features: [
      "Unlimited workflows",
      "Dedicated automation engineer",
      "Custom integrations and data pipelines",
      "SLA-backed support",
    ],
    ctaLabel: "Talk to sales",
    ctaHref: "/contact",
  },
];
