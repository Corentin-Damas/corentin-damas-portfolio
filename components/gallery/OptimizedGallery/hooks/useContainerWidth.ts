"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type El = HTMLElement;

export default function useContainerWidth<T extends El>() {
  const nodeRef = useRef<T | null>(null);
  const [width, setWidth] = useState(0);

  const measure = useCallback((node: T | null) => {
    if (!node) return 0;
    const cs = getComputedStyle(node);
    const paddingX =
      parseFloat(cs.paddingLeft || "0") + parseFloat(cs.paddingRight || "0");
    // clientWidth = content + padding → on retire le padding pour obtenir l’espace réel dispo
    const w = node.clientWidth - paddingX;
    return Math.max(0, Math.round(w));
  }, []);

  const ref = useCallback(
    (node: T | null) => {
      if (nodeRef.current === node) return;
      nodeRef.current = node;
      if (node) setWidth(measure(node));
    },
    [measure]
  );

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    let raf = 0;
    const obs = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setWidth(measure(nodeRef.current)));
    });
    obs.observe(node);

    const onWin = () => setWidth(measure(nodeRef.current));
    window.addEventListener("resize", onWin);

    // 1ère mesure de sécurité
    setWidth(measure(node));

    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      window.removeEventListener("resize", onWin);
    };
  }, [measure]);

  return { ref, width };
}
