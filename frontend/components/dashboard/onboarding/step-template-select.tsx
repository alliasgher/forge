"use client";

import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { TEMPLATES } from "@/lib/constants";

const TEMPLATE_DEMOS: Record<string, string> = {
  bold: "demo-perfume",
  modern: "demo-gym",
  classic: "demo-cleaning",
};

const TEMPLATE_PREVIEW_BG: Record<string, string> = {
  modern: "bg-white border border-slate-200",
  classic: "bg-blue-50 border border-blue-100",
  bold: "bg-slate-950 border border-slate-800",
};

const TEMPLATE_PREVIEW_CONTENT: Record<string, { bar: string; lines: string[]; btn: string }> = {
  modern: {
    bar: "bg-white border-b border-slate-100",
    lines: ["bg-slate-800", "bg-slate-300", "bg-slate-200"],
    btn: "bg-slate-800",
  },
  classic: {
    bar: "bg-white border-b border-blue-100",
    lines: ["bg-blue-800", "bg-blue-300", "bg-blue-200"],
    btn: "bg-blue-600",
  },
  bold: {
    bar: "bg-slate-950 border-b border-slate-800",
    lines: ["bg-amber-400", "bg-slate-600", "bg-slate-700"],
    btn: "bg-amber-400",
  },
};

export function StepTemplateSelect() {
  const { template, setTemplate, setStep } = useOnboardingStore();

  return (
    <div>
      <h2 className="mb-2 text-center font-heading text-2xl font-bold text-deep dark:text-white">
        Pick a template
      </h2>
      <p className="mb-8 text-center text-sm text-muted-foreground">
        Each template has a completely different look. Preview a live demo.
      </p>
      <div className="grid gap-4">
        {TEMPLATES.map((t) => {
          const selected = template === t.value;
          const preview = TEMPLATE_PREVIEW_CONTENT[t.value];
          const demoSlug = TEMPLATE_DEMOS[t.value];

          return (
            <button
              key={t.value}
              onClick={() => setTemplate(t.value as "modern" | "classic" | "bold")}
              className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-all hover:border-mint/40 ${
                selected ? "border-mint bg-mint/5 shadow-sm" : "border-border bg-card"
              }`}
            >
              {/* Mini site mockup */}
              <div className={`h-20 w-32 shrink-0 overflow-hidden rounded-lg ${TEMPLATE_PREVIEW_BG[t.value]}`}>
                {/* Navbar */}
                <div className={`h-4 flex items-center px-2 gap-1 ${preview.bar}`}>
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  <div className="h-1 w-8 rounded-full bg-slate-300" />
                </div>
                {/* Hero */}
                <div className="px-3 pt-2 space-y-1.5">
                  <div className={`h-2.5 rounded-full w-3/4 ${preview.lines[0]}`} />
                  <div className={`h-1.5 rounded-full w-full ${preview.lines[1]}`} />
                  <div className={`h-1.5 rounded-full w-2/3 ${preview.lines[2]}`} />
                  <div className={`h-4 w-16 rounded-lg mt-1 ${preview.btn}`} />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`font-heading font-semibold ${selected ? "text-mint" : "text-deep dark:text-white"}`}>
                    {t.label}
                  </p>
                  {selected && <span className="text-[10px] rounded-full bg-mint/15 text-mint px-2 py-0.5 font-medium">Selected</span>}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{t.description}</p>
                <a
                  href={`/site/${demoSlug}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-2 inline-flex items-center gap-1 text-xs text-mint hover:text-mint-dark transition-colors"
                >
                  <ExternalLink className="h-3 w-3" />
                  Live preview
                </a>
              </div>
            </button>
          );
        })}
      </div>
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={() => setStep(2)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={() => setStep(4)} className="bg-navy hover:bg-navy-light text-white">
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
