import type { Site } from "@/lib/types";

export function SiteFooter({ site }: { site: Site }) {
  const isDark = site.template === "bold";
  const bg = isDark ? "#0D0A12" : site.colors.primary;
  const text = "#ffffff";

  return (
    <footer style={{ backgroundColor: bg, color: text }}>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p
              className="text-lg font-bold mb-3"
              style={{ fontFamily: `${site.fonts.heading}, serif` }}
            >
              {site.business_name}
            </p>
            {site.tagline && (
              <p className="text-sm opacity-60">{site.tagline}</p>
            )}
          </div>

          {/* Contact info */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide opacity-50 mb-3">
              Contact
            </p>
            <div className="space-y-1.5 text-sm opacity-75">
              {site.phone && <p>{site.phone}</p>}
              {site.email && <p>{site.email}</p>}
              {site.address && <p className="leading-relaxed">{site.address}</p>}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide opacity-50 mb-3">
              Quick Links
            </p>
            <div className="space-y-1.5 text-sm">
              {["About", "Services", "Gallery", "Contact"].map((link) => (
                <div key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="opacity-75 hover:opacity-100 transition-opacity"
                  >
                    {link}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-8 flex flex-col items-center justify-between gap-2 border-t pt-6 text-xs opacity-40 sm:flex-row"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <p>&copy; {new Date().getFullYear()} {site.business_name}. All rights reserved.</p>
          <p>
            Built with{" "}
            <a href="/" className="underline hover:opacity-70 transition-opacity">
              Forge
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
