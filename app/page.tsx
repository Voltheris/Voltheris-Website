import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { ProcessCurrent } from "@/components/sections/ProcessCurrent";
import { StatsBand } from "@/components/sections/StatsBand";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { CTABand } from "@/components/sections/CTABand";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Philosophy />
      <ServicesPreview />
      <ProcessCurrent />
      <StatsBand />
      <PortfolioPreview />
      <CTABand />
    </main>
  );
}
