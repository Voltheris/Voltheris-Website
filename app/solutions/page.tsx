import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { IndustrySection } from "@/components/sections/IndustrySection";
import { CTABand } from "@/components/sections/CTABand";
import { IndustryJumpNav } from "@/components/ui/IndustryJumpNav";
import { Button } from "@/components/ui/Button";
import { industries } from "@/content/industries";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "How Voltheris automates lead generation, qualification, and scheduling for real estate, healthcare, law, construction, finance, marketing, and enterprise teams.",
};

export default function SolutionsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Solutions"
        heading="Built around how your industry actually works."
        description="The underlying system is the same — capture, qualify, book — but what qualifies a lead in real estate isn't what qualifies one in law or finance. Every deployment starts from your industry's specifics, not a generic template."
        actions={
          <>
            <Button href="/contact">Book a consultation</Button>
            <Button href="/services" variant="ghost">
              See all services
            </Button>
          </>
        }
      />

      <IndustryJumpNav />

      {industries.map((industry, i) => (
        <IndustrySection
          key={industry.slug}
          industry={industry}
          reverse={i % 2 === 1}
          tone={i % 2 === 0 ? "sand" : "ivory"}
        />
      ))}

      <CTABand />
    </main>
  );
}
