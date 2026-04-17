import type { Site, Section } from "@/lib/types";
import { SectionWrapper } from "./shared/section-wrapper";
import { SiteHeader } from "./shared/site-header";
import { SiteFooter } from "./shared/site-footer";
import { HeroSection } from "./sections/hero-section";
import { AboutSection } from "./sections/about-section";
import { ServicesSection } from "./sections/services-section";
import { GallerySection } from "./sections/gallery-section";
import { TestimonialsSection } from "./sections/testimonials-section";
import { ContactSection } from "./sections/contact-section";
import { FaqSection } from "./sections/faq-section";
import { PricingSection } from "./sections/pricing-section";
import { DemoBanner } from "./shared/demo-banner";

interface TemplateRendererProps {
  site: Site;
  sections: Section[];
}

const SECTION_COMPONENTS: Record<string, React.ComponentType<any>> = {
  hero: HeroSection,
  about: AboutSection,
  services: ServicesSection,
  gallery: GallerySection,
  testimonials: TestimonialsSection,
  contact: ContactSection,
  faq: FaqSection,
  pricing: PricingSection,
};

export function TemplateRenderer({ site, sections }: TemplateRendererProps) {
  const variant = site.template || "modern";

  return (
    <SectionWrapper colors={site.colors} fonts={site.fonts}>
      <SiteHeader site={site} />
      <main>
        {sections.map((section) => {
          const Component = SECTION_COMPONENTS[section.type];
          if (!Component) return null;
          return (
            <Component
              key={section.id}
              content={section.content}
              site={site}
              variant={variant}
              slug={site.slug}
            />
          );
        })}
      </main>
      <SiteFooter site={site} />
      {(site.expires_at || site.is_demo) && <div className="h-16 sm:h-14" aria-hidden />}
      <DemoBanner expiresAt={site.expires_at} isDemo={site.is_demo} />
    </SectionWrapper>
  );
}
