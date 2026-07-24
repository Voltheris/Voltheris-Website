"use client";

import { motion } from "framer-motion";
import { CalendlyEmbed } from "@/components/ui/CalendlyEmbed";
import { fadeUpLarge, staggerContainer, fadeUp } from "@/lib/motion";

export function ScheduleSection() {
  return (
    <section id="schedule" className="scroll-mt-28 bg-sand py-section-y">
      <div className="container-content">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          variants={staggerContainer(0.08)}
          className="text-center"
        >
          <motion.p variants={fadeUp} className="u-eyebrow">
            Prefer to talk?
          </motion.p>
          <motion.h2
            variants={fadeUpLarge}
            className="mx-auto mt-3 max-w-content font-display text-display-l text-ink"
          >
            Book a 30-minute call directly.
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-prose text-body-l text-ink-soft">
            No form, no waiting for a reply — pick a time that works and we’ll
            talk through what’s worth automating first.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={fadeUp}
        >
          <CalendlyEmbed />
        </motion.div>
      </div>
    </section>
  );
}
