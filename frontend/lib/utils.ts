import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Public URL of a published site. Sites are served by the frontend at
 * /site/<slug> — never by the API host.
 */
export function publicSiteUrl(slug: string) {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL || "";
  return `${origin}/site/${slug}`;
}
