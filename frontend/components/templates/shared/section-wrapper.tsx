import type { SiteColors, SiteFonts } from "@/lib/types";

interface SectionWrapperProps {
  colors: SiteColors;
  fonts: SiteFonts;
  children: React.ReactNode;
}

export function SectionWrapper({ colors, fonts, children }: SectionWrapperProps) {
  return (
    <div
      style={{
        "--site-primary": colors.primary,
        "--site-secondary": colors.secondary,
        "--site-accent": colors.accent,
        "--site-bg": colors.background,
        "--site-text": colors.text,
        "--site-heading-font": fonts.heading,
        "--site-body-font": fonts.body,
        fontFamily: `${fonts.body}, sans-serif`,
        color: colors.text,
        backgroundColor: colors.background,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
