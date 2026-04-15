import { create } from "zustand";
import type { SiteColors, SiteFonts } from "@/lib/types";
import { DEFAULT_COLORS, DEFAULT_FONTS } from "@/lib/constants";

interface OnboardingState {
  step: number;
  businessType: string;
  businessName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  template: "modern" | "classic" | "bold";
  colors: SiteColors;
  fonts: SiteFonts;
  setStep: (step: number) => void;
  setBusinessType: (type: string) => void;
  setBusinessDetails: (details: { businessName: string; tagline: string; phone: string; email: string; address: string }) => void;
  setTemplate: (template: "modern" | "classic" | "bold") => void;
  setColors: (colors: SiteColors) => void;
  setFonts: (fonts: SiteFonts) => void;
  reset: () => void;
}

const initialState = {
  step: 1,
  businessType: "",
  businessName: "",
  tagline: "",
  phone: "",
  email: "",
  address: "",
  template: "modern" as const,
  colors: DEFAULT_COLORS as SiteColors,
  fonts: DEFAULT_FONTS as SiteFonts,
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,
  setStep: (step) => set({ step }),
  setBusinessType: (businessType) => set({ businessType }),
  setBusinessDetails: (details) => set(details),
  setTemplate: (template) => set({ template }),
  setColors: (colors) => set({ colors }),
  setFonts: (fonts) => set({ fonts }),
  reset: () => set(initialState),
}));
