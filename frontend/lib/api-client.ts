const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

class ApiClient {
  private isRefreshing = false;
  private refreshPromise: Promise<string | null> | null = null;

  async fetch<T>(path: string, options?: RequestInit): Promise<T> {
    const headers = new Headers(options?.headers);
    const token = typeof window !== "undefined" ? localStorage.getItem("forge_access_token") : null;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    if (!headers.has("Content-Type") && !(options?.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    let response = await fetch(`${API_URL}${path}`, { ...options, headers });

    // Auto-refresh on 401
    if (response.status === 401 && token) {
      const newToken = await this.refreshToken();
      if (newToken) {
        headers.set("Authorization", `Bearer ${newToken}`);
        response = await fetch(`${API_URL}${path}`, { ...options, headers });
      } else {
        if (typeof window !== "undefined") {
          localStorage.removeItem("forge_access_token");
          localStorage.removeItem("forge_refresh_token");
          window.location.href = "/login";
        }
        throw new ApiError(401, "Session expired");
      }
    }

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new ApiError(response.status, body.error || "Request failed");
    }

    return response.json();
  }

  private async refreshToken(): Promise<string | null> {
    if (this.isRefreshing) return this.refreshPromise;

    this.isRefreshing = true;
    this.refreshPromise = (async () => {
      try {
        const refreshToken = localStorage.getItem("forge_refresh_token");
        if (!refreshToken) return null;

        const res = await fetch(`${API_URL}/api/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });

        if (!res.ok) return null;
        const data = await res.json();

        localStorage.setItem("forge_access_token", data.accessToken);
        localStorage.setItem("forge_refresh_token", data.refreshToken);
        return data.accessToken as string;
      } catch {
        return null;
      } finally {
        this.isRefreshing = false;
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }
}

export const api = new ApiClient();
export { ApiError };
