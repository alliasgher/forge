import type { Site } from "@/lib/types";
import { ContactForm } from "../shared/contact-form";

interface Props { content: Record<string, any>; site: Site; variant: string; slug: string }

export function ContactSection({ content, site, slug }: Props) {
  const c = site.colors;

  return (
    <section id="contact" className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold" style={{ fontFamily: `${site.fonts.heading}, sans-serif`, color: c.primary }}>
          {content.heading || "Get in Touch"}
        </h2>
        {content.subheading && <p className="mt-2 opacity-60">{content.subheading}</p>}

        <div className="mt-8 text-left">
          <ContactForm slug={slug} primaryColor={c.primary} fields={content.fields} />
        </div>

        {(content.showPhone && site.phone) || (content.showAddress && site.address) ? (
          <div className="mt-8 space-y-1 text-sm opacity-60">
            {content.showPhone && site.phone && <p>{site.phone}</p>}
            {content.showAddress && site.address && <p>{site.address}</p>}
          </div>
        ) : null}
      </div>
    </section>
  );
}
