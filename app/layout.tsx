import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { company } from "@/content/company";
import { socialLinks } from "@/content/social";
import "./globals.css";

const title = "Voltheris — AI Systems for Business Automation";
const description =
  "Voltheris designs AI systems that run lead generation, qualification, CRM, and scheduling for ambitious businesses — quietly, precisely, and without friction.";

export const metadata: Metadata = {
  metadataBase: new URL("https://voltheris.ai"),
  title: {
    default: title,
    template: "%s — Voltheris",
  },
  description,
  openGraph: {
    title,
    description,
    siteName: "Voltheris",
    type: "website",
    url: "https://voltheris.ai",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Voltheris",
  url: "https://voltheris.ai",
  description,
  email: company.email,
  telephone: company.phone,
  sameAs: socialLinks.map((s) => s.href),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        {/* Keyboard-only users can skip the nav and land on page content. */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />

        <SmoothScrollProvider>
          <Nav />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
