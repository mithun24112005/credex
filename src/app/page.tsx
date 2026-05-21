import { DemoPreview } from "@/components/landing/demo-preview";
import { FaqSection } from "@/components/landing/faq-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { FooterCta } from "@/components/landing/footer-cta";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { TrustedTools } from "@/components/landing/trusted-tools";

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
