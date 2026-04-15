import { use } from "react";
import { TemplateRenderer } from "@/components/templates/template-renderer";
import { getPublicSite } from "@/lib/api/public";

export default function PublicSitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const data = use(getPublicSite(slug));

  return <TemplateRenderer site={data.site} sections={data.sections} />;
}
