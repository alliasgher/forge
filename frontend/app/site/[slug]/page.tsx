import { TemplateRenderer } from "@/components/templates/template-renderer";
import { ViewTracker } from "@/components/templates/shared/view-tracker";
import { getPublicSite } from "@/lib/api/public";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function fetchSite(slug: string) {
  const res = await fetch(`${API_URL}/api/public/sites/${slug}`, { cache: "no-store" });
  if (res.status === 410) {
    const body = await res.json().catch(() => ({}));
    return { expired: true, businessName: body.business_name || "This site", data: null };
  }
  if (!res.ok) return { expired: false, businessName: "", data: null, notFound: res.status === 404 };
  const data = await res.json();
  return { expired: false, businessName: "", data, notFound: false };
}

export default async function PublicSitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await fetchSite(slug);

  if (result.expired) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: "linear-gradient(135deg, #0D1B2A, #1E3A5F)" }}>
        <div className="max-w-lg">
          <div className="text-6xl mb-6">⏰</div>
          <h1 className="text-3xl font-bold text-white mb-3">
            {result.businessName} has expired
          </h1>
          <p className="text-white/60 text-lg mb-8">
            This demo site was active for 7 days. Want a permanent, professional website that never expires?
          </p>
          <div className="space-y-4">
            <a href="https://alliasgher.vercel.app/#contact" target="_blank" rel="noreferrer"
              className="block w-full rounded-2xl py-4 text-base font-bold text-deep transition-all hover:opacity-90"
              style={{ backgroundColor: "#00C9A7" }}>
              Contact Ali for a Custom Website →
            </a>
            <a href="/explore"
              className="block w-full rounded-2xl border border-white/20 py-4 text-base font-medium text-white/70 hover:text-white hover:border-white/40 transition-colors">
              Try Forge Again — Free
            </a>
          </div>
          <p className="mt-8 text-xs text-white/30">
            Built with <a href="/" className="underline hover:text-white/50">Forge</a>
          </p>
        </div>
      </div>
    );
  }

  if (!result.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Site not found.</p>
      </div>
    );
  }

  return (
    <div className="site-page">
      <ViewTracker slug={slug} />
      <TemplateRenderer site={result.data.site} sections={result.data.sections} />
    </div>
  );
}
