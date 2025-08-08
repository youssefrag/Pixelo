"use client";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import { ReactNode } from "react";

export default function HomeHeaderShell({ children }: { children: ReactNode }) {
  const dir = useScrollDirection(6);
  const hidden = dir === "up";

  return (
    <div className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      {/* Inner container can receive hover, so group works */}
      <div className="relative mx-auto max-w-screen-2xl group pointer-events-auto">
        {/* Peek handle */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 mt-1 transition-opacity duration-200
            ${hidden ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <button
            aria-label="Open header"
            className="rounded-full bg-white/90 backdrop-blur px-3 py-1 shadow-md border border-black/5
                       text-sm flex items-center gap-2 cursor-pointer"
          >
            <span className="text-lg">🗄️</span>
            <span className="hidden sm:inline">Open</span>
          </button>
        </div>

        {/* Header */}
        <header
          className={`transition-transform duration-300 will-change-transform
            ${
              hidden
                ? "-translate-y-full group-hover:translate-y-0"
                : "translate-y-0"
            }
            bg-white/90 backdrop-blur shadow-[0_8px_20px_rgba(0,0,0,0.15)]`}
        >
          {children}
        </header>
      </div>
    </div>
  );
}
