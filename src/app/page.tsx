import type { Metadata } from "next";

import { DemoPreview } from "@/components/landing/demo-preview";
import { FaqSection } from "@/components/landing/faq-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { FooterCta } from "@/components/landing/footer-cta";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { TrustedTools } from "@/components/landing/trusted-tools";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.tagline}`,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    type: "website",
    siteName: siteConfig.name
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description
  }
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustedTools />
      <FeaturesSection />
      <HowItWorks />
      <DemoPreview />
      <TestimonialsSection />
      <FaqSection />
      <FooterCta />
    </main>
  );
}
