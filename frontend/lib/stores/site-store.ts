import { create } from "zustand";
import type { Site, Section } from "@/lib/types";
import { getMySite } from "@/lib/api/sites";
import { api } from "@/lib/api-client";

interface SiteState {
  site: Site | null;
  sections: Section[];
  loading: boolean;
  error: string | null;
  fetchSite: () => Promise<void>;
  fetchSections: () => Promise<void>;
  setSite: (site: Site) => void;
  setSections: (sections: Section[]) => void;
  clear: () => void;
}

export const useSiteStore = create<SiteState>((set, get) => ({
  site: null,
  sections: [],
  loading: false,
  error: null,

  fetchSite: async () => {
    set({ loading: true, error: null });
    try {
      const site = await getMySite();
      set({ site, loading: false });
    } catch (err: any) {
      if (err.status === 404) {
        set({ site: null, loading: false });
      } else {
        set({ error: err.message, loading: false });
      }
    }
  },

  fetchSections: async () => {
    const { site } = get();
    if (!site) return;
    try {
      const sections = await api.fetch<Section[]>(`/api/sites/${site.id}/sections`);
      set({ sections });
    } catch {
      // Silently fail — sections aren't critical for layout
    }
  },

  setSite: (site) => set({ site }),
  setSections: (sections) => set({ sections }),
  clear: () => set({ site: null, sections: [], loading: false, error: null }),
}));
