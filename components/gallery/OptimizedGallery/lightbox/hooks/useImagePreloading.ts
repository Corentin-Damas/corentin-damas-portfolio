import { useEffect } from "react";
import type { LightboxImage } from "../types";

export const useImagePreloading = (
  images: LightboxImage[],
  index: number,
  prevIdx: number | null,
  nextIdx: number | null
) => {
  useEffect(() => {
    // Preload des images voisines
    [prevIdx, nextIdx].forEach((i) => {
      if (i !== null && images[i]) {
        const img = new window.Image();
        img.src = images[i].src;
      }
    });
  }, [index, prevIdx, nextIdx, images]);
};
