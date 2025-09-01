"use client";

import { useEffect } from "react";

interface KeyNavigationOptions {
  onClose?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  active?: boolean; // activer/désactiver la navigation (utile quand modal ouvert/fermé)
}

export default function useKeyNavigation({
  onClose,
  onPrev,
  onNext,
  active = true,
}: KeyNavigationOptions) {
  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose?.();
          break;
        case "ArrowLeft":
          onPrev?.();
          break;
        case "ArrowRight":
          onNext?.();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onPrev, onNext, active]);
}