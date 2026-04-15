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
      className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between gap-4 flex-wrap"
      style={{
        background: isExpiringSoon
          ? "linear-gradient(135deg, #7F1D1D, #991B1B)"
          : "linear-gradient(135deg, #0D1B2A, #1E3A5F)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.3)",
      }}
    >
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-mint animate-pulse shrink-0" />
        <p className="text-sm text-white">
          {daysLeft !== null ? (
            <>
              <span className="font-bold">
                {daysLeft === 0 ? "Expires today" : `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left`}
              </span>
              {" "}on this demo site.{" "}
              <span className="text-white/70">Want a permanent live website?</span>
            </>
          ) : (
            <>
              <span className="text-white/80">This is a demo site built with Forge.</span>
              {" "}Want your own custom website?
            </>
          )}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <a
          href="https://alliasgher.vercel.app/#contact"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg px-4 py-2 text-sm font-bold text-deep transition-opacity hover:opacity-90 shrink-0"
          style={{ backgroundColor: "#00C9A7" }}
        >
          Contact Ali →
        </a>
        <button
          onClick={() => setVisible(false)}
          className="text-white/40 hover:text-white/70 transition-colors text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}
