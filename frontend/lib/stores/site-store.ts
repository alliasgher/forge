import { create } from "zustand";
import type { Site, Section } from "@/lib/types";
import { getMySite } from "@/lib/api/sites";
import { api } from "@/lib/api-client";

interface SiteState {
  site: Site | null;
  sections: Section[];
  loading: boolean;
  noSite: boolean;       // true only on confirmed 404 (user has no site)
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
  noSite: false,
  error: null,

  fetchSite: async () => {
    set({ loading: true, error: null, noSite: false });
    try {
      const site = await getMySite();
      set({ site, loading: false, noSite: false });
    } catch (err: any) {
      if (err.status === 404) {
        // Confirmed: user has no site
        set({ site: null, loading: false, noSite: true });
      } else {
        // Network/auth error — don't redirect, just show error
        set({ site: null, loading: false, error: err.message || "Failed to load site", noSite: false });
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
      // Silently fail
    }
  },

  setSite: (site) => set({ site }),
  setSections: (sections) => set({ sections }),
  clear: () => set({ site: null, sections: [], loading: false, noSite: false, error: null }),
}));
