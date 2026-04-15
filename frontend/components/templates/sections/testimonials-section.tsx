import type { Site } from "@/lib/types";
import { StarRating } from "../shared/star-rating";

interface Props { content: Record<string, any>; site: Site; variant: string }

export function TestimonialsSection({ content, site }: Props) {
  const items = content.items || [];
  const c = site.colors;

  if (items.length === 0) return null;

  return (
    <section className="px-6 py-16 md:py-24" style={{ backgroundColor: `${c.primary}05` }}>
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 text-center text-3xl font-bold" style={{ fontFamily: `${site.fonts.heading}, sans-serif`, color: c.primary }}>
          What People Say
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item: any) => (
            <div
              key={item.id}
              className="rounded-xl border p-6"
              style={{ borderColor: `${c.primary}10`, backgroundColor: c.background }}
            >
              <StarRating rating={item.rating || 5} color={c.secondary} />
              <p className="mt-3 text-sm leading-relaxed opacity-70">&ldquo;{item.text}&rdquo;</p>
              <div className="mt-4 flex items-center gap-3">
                {item.photo && (
                  <img src={item.photo} alt={item.name} className="h-10 w-10 rounded-full object-cover" />
                )}
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  {item.role && <p className="text-xs opacity-50">{item.role}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
