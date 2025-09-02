// Main component
export { default } from "./Lightbox";

// Types
export type {
  LightboxImage,
  LightboxProps,
  ZoomState,
  ZoomLimits,
} from "./types";

// Hooks (for external use if needed)
export { useLightboxNavigation } from "./hooks/useLightboxNavigation";
export { useSwipeGestures } from "./hooks/useSwipeGestures";
export { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
export { useImagePreloading } from "./hooks/useImagePreloading";
export { useLightboxState } from "./hooks/useLightboxState";
export { useZoom } from "./hooks/useZoom";
