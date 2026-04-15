import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/lib/types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  hydrated: boolean;
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      hydrated: false,
      setAuth: (user, accessToken, refreshToken) => {
        localStorage.setItem("forge_access_token", accessToken);
        localStorage.setItem("forge_refresh_token", refreshToken);
        set({ user, accessToken, refreshToken, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem("forge_access_token");
        localStorage.removeItem("forge_refresh_token");
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
      },
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "forge-auth",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
        // Verify tokens still exist in localStorage
        if (state?.isAuthenticated) {
          const token = localStorage.getItem("forge_access_token");
          if (!token) {
            state.logout();
          }
        }
      },
    }
  )
);
