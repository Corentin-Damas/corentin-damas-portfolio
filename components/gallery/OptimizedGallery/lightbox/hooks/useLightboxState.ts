import { useState, useEffect, useRef } from "react";

export const useLightboxState = (index: number) => {
  const [infoOpen, setInfoOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [dir, setDir] = useState<"next" | "prev" | null>(null);
  const prevIndexRef = useRef(index);

  // Gestion de la direction d'animation et reset des états au changement d'image
  useEffect(() => {
    const old = prevIndexRef.current;
    if (index !== old) {
      setDir(index > old ? "next" : "prev");
      // Remettre dir à null après l'animation
      setTimeout(() => setDir(null), 300);
    }
    prevIndexRef.current = index;
    setLoaded(false);

  }, [index]);

  // Lock scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return {
    infoOpen,
    setInfoOpen,
    copied,
    setCopied,
    loaded,
    setLoaded,
    dir,
  };
};
