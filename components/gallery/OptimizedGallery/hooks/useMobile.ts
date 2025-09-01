"use client";

import { useEffect, useState } from "react";

export default function useIsMobile(breakpoint: number) {
  const [isMobile, set] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(`(max-width:${breakpoint}px)`);
    const on = () => set(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return isMobile;
}
