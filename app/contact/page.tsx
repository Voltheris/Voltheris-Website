import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { ScheduleSection } from "@/components/sections/ScheduleSection";
import { FAQ } from "@/components/sections/FAQ";
import { Button } from "@/components/ui/Button";
import { contactFAQ } from "@/content/contactFAQ";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Voltheris — send a message, book a call directly, or find our office details and social links.",
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Contact"
        heading="Let's see what's worth automating."
        description="Send a message with what's going on in your pipeline, or skip the back-and-forth and book a call directly below."
        actions={<Button href="#schedule">Book a call instead</Button>}
      />

      <ContactSection />

      <ScheduleSection />

      <FAQ eyebrow="Before you reach out" heading="Quick answers." items={contactFAQ} />
    </main>
  );
}
