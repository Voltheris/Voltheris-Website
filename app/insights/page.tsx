import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { FeaturedArticle } from "@/components/sections/FeaturedArticle";
import { InsightsExplorer } from "@/components/sections/InsightsExplorer";
import { NewsletterSignup } from "@/components/sections/NewsletterSignup";
import { CTABand } from "@/components/sections/CTABand";
import { articles } from "@/content/articles";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Notes on AI automation, lead qualification, and running a pipeline that doesn't leak — from the team building Voltheris.",
};

const featured = articles.find((a) => a.featured) ?? articles[0]!;

export default function InsightsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Insights"
        heading="What we're learning, written down."
        description="Notes from live deployments — what actually moves the numbers, what doesn't, and why most automation advice skips the boring part that matters most."
      />

      <FeaturedArticle article={featured} />

      <InsightsExplorer />

      <NewsletterSignup />

      <CTABand />
    </main>
  );
}
