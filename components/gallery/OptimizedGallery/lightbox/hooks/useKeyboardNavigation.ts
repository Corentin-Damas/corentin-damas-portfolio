import { useEffect } from "react";

export const useKeyboardNavigation = (
  onClose: () => void,
  onNavigate: (index: number) => void,
  prevIdx: number | null,
  nextIdx: number | null,
  setInfoOpen: (open: boolean) => void
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          if (nextIdx !== null) onNavigate(nextIdx);
          break;
        case "ArrowLeft":
          if (prevIdx !== null) onNavigate(prevIdx);
          break;
        case "i":
        case "I":
          setInfoOpen((prev) => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNavigate, prevIdx, nextIdx, setInfoOpen]);
};
