"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PricingCard, type PricingTier } from "@/components/ui/PricingCard";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function PricingPreview({ tiers }: { tiers: PricingTier[] }) {
  return (
    <section className="bg-sand py-section-y">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Investment"
          heading="Priced for the outcome, not the seat count."
          description="Every engagement starts with a scoped Foundation or Momentum plan. Enterprise is quoted after discovery."
        />

        <motion.div
          className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={staggerContainer(0.1)}
        >
          {tiers.map((tier) => (
            <motion.div key={tier.name} variants={fadeUp}>
              <PricingCard tier={tier} />
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-10 text-center text-body-s text-ink-soft">
          Not sure which fits?{" "}
          <Button href="/contact" variant="ghost" className="ml-2">
            Book a 30-minute call
          </Button>
        </p>
      </div>
    </section>
  );
}
