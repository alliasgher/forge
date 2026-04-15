import type { Site } from "@/lib/types";

export function SiteFooter({ site }: { site: Site }) {
  return (
    <footer
      className="border-t px-6 py-8 text-center text-sm"
      style={{ borderColor: `${site.colors.primary}15`, color: `${site.colors.text}80` }}
    >
      <p>&copy; {new Date().getFullYear()} {site.business_name}. All rights reserved.</p>
      {site.phone && <p className="mt-1">{site.phone}</p>}
      <p className="mt-3 text-xs opacity-40">
        Built with <a href="/" className="underline">Forge</a>
      </p>
    </footer>
  );
}
