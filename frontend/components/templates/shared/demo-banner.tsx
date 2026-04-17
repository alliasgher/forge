"use client";

import { useState, useEffect } from "react";

interface DemoBannerProps {
  expiresAt: string | null;
  isDemo?: boolean;
}

function getDaysLeft(expiresAt: string): number {
  const diff = new Date(expiresAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function DemoBanner({ expiresAt, isDemo }: DemoBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;
  if (!expiresAt && !isDemo) return null;

  const daysLeft = expiresAt ? getDaysLeft(expiresAt) : null;
  const isExpiringSoon = daysLeft !== null && daysLeft <= 2;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 pb-safe pl-safe pr-safe"
      style={{
        background: isExpiringSoon
          ? "linear-gradient(135deg, #7F1D1D, #991B1B)"
          : "linear-gradient(135deg, #0D1B2A, #1E3A5F)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.3)",
      }}
    >
      <div className="px-4 py-3 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="h-2 w-2 rounded-full bg-mint animate-pulse shrink-0" />
          <p className="text-xs sm:text-sm text-white leading-snug">
            {daysLeft !== null ? (
              <>
                <span className="font-bold">
                  {daysLeft === 0 ? "Expires today" : `${daysLeft}d left`}
                </span>
                <span className="hidden sm:inline"> on this demo site.</span>{" "}
                <span className="text-white/70 hidden sm:inline">Want a permanent live website?</span>
              </>
            ) : (
              <>
                <span className="text-white/80">Demo site built with Forge.</span>
                <span className="hidden sm:inline"> Want your own?</span>
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://alliasgher.vercel.app/#contact"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg px-3 py-2 sm:px-4 text-xs sm:text-sm font-bold text-deep transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#00C9A7" }}
          >
            Contact Ali →
          </a>
          <button
            aria-label="Dismiss banner"
            onClick={() => setVisible(false)}
            className="flex h-8 w-8 items-center justify-center text-white/50 hover:text-white/80 transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
