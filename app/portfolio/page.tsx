import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { StatsBand } from "@/components/sections/StatsBand";
import { FeaturedCaseStudy } from "@/components/sections/FeaturedCaseStudy";
import { CTABand } from "@/components/sections/CTABand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { Button } from "@/components/ui/Button";
import { caseStudies, featuredCaseStudy } from "@/content/caseStudies";
import type { StatItem } from "@/content/stats";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Real Voltheris deployments across real estate, law, construction, healthcare, finance, and marketing — with the before-and-after numbers behind each one.",
};

const portfolioStats: StatItem[] = [
  { value: 42, suffix: "", label: "AI systems deployed" },
  { value: 240, suffix: "%", label: "Average ROI across engagements" },
  { value: 11, suffix: " days", label: "Average time to first system live" },
  { value: 6, suffix: " industries", label: "Served, from real estate to finance" },
];

const rest = caseStudies.filter((cs) => cs.slug !== featuredCaseStudy.slug);

export default function PortfolioPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Portfolio"
        heading="Proof, not promises."
        description="Six engagements, six industries, one pattern: find where the time is going, and take it back. Here's what that looked like in practice."
        actions={
          <>
            <Button href="/contact">Book a consultation</Button>
            <Button href="/services" variant="ghost">
              See services
            </Button>
          </>
        }
      />

      <StatsBand
        stats={portfolioStats}
        eyebrow="Across every engagement"
        heading="The numbers hold up at scale, not just in a single case."
      />

      <FeaturedCaseStudy caseStudy={featuredCaseStudy} />

      <section className="bg-ivory py-section-y">
        <div className="container-shell">
          <SectionHeader
            eyebrow="More work"
            heading="Five more systems, five more industries."
            description="Each one built around a different point of friction — not a generic bundle of automation features."
          />

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((cs) => (
              <CaseStudyCard key={cs.slug} caseStudy={cs} />
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
