import { api } from "@/lib/api-client";
import type { AuthResponse, User } from "@/lib/types";

export function login(email: string, password: string): Promise<AuthResponse> {
  return api.fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function signup(name: string, email: string, password: string): Promise<AuthResponse> {
  return api.fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export function getProfile(): Promise<User> {
  return api.fetch("/api/auth/me");
}
