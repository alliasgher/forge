"use client";

import { useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    fetch(`${API_URL}/api/public/sites/${slug}/view`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: window.location.pathname,
        referrer: document.referrer || null,
        userAgent: navigator.userAgent,
      }),
    }).catch(() => {}); // fire-and-forget, silent fail
  }, [slug]);

  return null;
}
