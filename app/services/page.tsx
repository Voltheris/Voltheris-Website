import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessCurrent } from "@/components/sections/ProcessCurrent";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { FAQ } from "@/components/sections/FAQ";
import { CTABand } from "@/components/sections/CTABand";
import { Button } from "@/components/ui/Button";
import { engagementSteps } from "@/content/engagementProcess";
import { pricingTiers } from "@/content/pricing";
import { servicesFAQ } from "@/content/faq";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI systems for lead generation, qualification, CRM automation, appointment booking, and business workflows — built around how your business actually runs.",
};

export default function ServicesPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Services"
        heading="The systems that run your pipeline while you run the business."
        description="Every engagement is built around a specific point of friction — not a generic bundle of features. Explore what each system does, then talk to us about which one to build first."
        actions={
          <>
            <Button href="/contact">Book a consultation</Button>
            <Button href="/portfolio" variant="ghost">
              See results
            </Button>
          </>
        }
      />

      <ServicesGrid />

      <ProcessCurrent
        eyebrow="How we build it"
        heading="From first call to live system, without the drift."
        steps={engagementSteps}
      />

      <PricingPreview tiers={pricingTiers} />

      <FAQ eyebrow="Questions" heading="Before you ask." items={servicesFAQ} />

      <CTABand />
    </main>
  );
}
