import { use } from "react";
import { TemplateRenderer } from "@/components/templates/template-renderer";
import { ViewTracker } from "@/components/templates/shared/view-tracker";
import { getPublicSite } from "@/lib/api/public";

export default function PublicSitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const data = use(getPublicSite(slug));

  return (
    <div className="site-page">
      <ViewTracker slug={slug} />
      <TemplateRenderer site={data.site} sections={data.sections} />
    </div>
  );
}
