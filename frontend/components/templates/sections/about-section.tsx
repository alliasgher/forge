import type { Site } from "@/lib/types";

interface Props { content: Record<string, any>; site: Site; variant: string }

export function AboutSection({ content, site }: Props) {
  const { title, body, image, imagePosition } = content;
  const c = site.colors;

  return (
    <section id="about" className="px-6 py-16 md:py-24">
      <div className={`mx-auto flex max-w-5xl flex-col items-center gap-10 ${imagePosition === "left" ? "md:flex-row-reverse" : "md:flex-row"}`}>
        <div className="flex-1">
          <h2 className="text-3xl font-bold" style={{ fontFamily: `${site.fonts.heading}, sans-serif`, color: c.primary }}>
            {title}
          </h2>
          <p className="mt-4 leading-relaxed opacity-70 whitespace-pre-line">{body}</p>
        </div>
        {image && (
          <div className="flex-1">
            <img src={image} alt={title} className="rounded-xl shadow-md" />
          </div>
        )}
      </div>
    </section>
  );
}
