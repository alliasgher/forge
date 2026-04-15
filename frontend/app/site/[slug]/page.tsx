import { use } from "react";

export default function PublicSitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-bold">Site: {slug}</h1>
        <p className="mt-2 text-muted-foreground">
          Public site template will render here.
        </p>
      </div>
    </div>
  );
}
