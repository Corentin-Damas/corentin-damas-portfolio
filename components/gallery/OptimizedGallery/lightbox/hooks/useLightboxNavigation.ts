import { useMemo } from "react";
import type { NavigationState } from "../types";

export const useLightboxNavigation = (
  images: any[],
  index: number
): NavigationState => {
  return useMemo(() => {
    const total = images.length;
    const prevIdx = index > 0 ? index - 1 : null;
    const nextIdx = index < total - 1 ? index + 1 : null;

    return {
      current: index,
      total,
      prevIdx,
      nextIdx,
    };
  }, [images.length, index]);
};
