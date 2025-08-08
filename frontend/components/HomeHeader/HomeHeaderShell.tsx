"use client";
import { useEffect, useRef, useState } from "react";

function useScrollDirection(threshold = 8) {
  const lastY = useRef(0);
  const ticking = useRef(false);
  const [dir, setDir] = useState<"up" | "down" | "none">("none");

  useEffect(() => {
    lastY.current = Math.max(window.scrollY, 0);

    const onScroll = () => {
      const currentY = Math.max(window.scrollY, 0);
      const delta = currentY - lastY.current;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (Math.abs(delta) > threshold) {
            setDir(delta > 0 ? "down" : "up");
            lastY.current = currentY;
          } else if (currentY === 0) {
            setDir("none");
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return dir;
}
