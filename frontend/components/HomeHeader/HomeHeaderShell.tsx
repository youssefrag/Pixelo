"use client";

import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { useScrollDirection } from "@/hooks/useScrollDirection";

export default function HomeHeaderShell({ children }: { children: ReactNode }) {
  const dir = useScrollDirection(6);
  const hidden = dir === "up";

  return (
    <div className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      <div className="relative w-full group pointer-events-auto">
        <div
          className={`absolute left-1/2 -translate-x-1/2 transition-opacity duration-200
            ${hidden ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <button
            aria-label="Open header"
            className="w-screen bg-white/90 backdrop-blur py-2 shadow-md border-b border-black/5
                   flex justify-center items-center gap-2 cursor-pointer"
          >
            <FontAwesomeIcon icon={faBars} className="text-[#FF7A00]" />
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
