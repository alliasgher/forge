"use client";

interface ImageMarqueeProps {
  images: string[];
  speed?: number;
  reverse?: boolean;
  height?: number;
}

export function ImageMarquee({ images, speed = 30, reverse = false, height = 220 }: ImageMarqueeProps) {
  const doubled = [...images, ...images];

  return (
    <div className="relative overflow-hidden" style={{ height }}>
      <div
        className="flex gap-4 absolute"
        style={{
          animation: `marquee-scroll ${speed}s linear infinite ${reverse ? "reverse" : ""}`,
          whiteSpace: "nowrap",
        }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="shrink-0 overflow-hidden rounded-2xl"
            style={{ width: height * 1.4, height }}
          >
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
