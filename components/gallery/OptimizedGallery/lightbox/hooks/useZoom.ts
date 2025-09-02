import { useState, useRef, useCallback, useEffect } from "react";

export interface ZoomState {
  scale: number;
  translateX: number;
  translateY: number;
  isZoomed: boolean;
}

export interface ZoomLimits {
  minScale: number;
  maxScale: number;
  minTranslateX: number;
  maxTranslateX: number;
  minTranslateY: number;
  maxTranslateY: number;
}

const DEFAULT_ZOOM_STATE: ZoomState = {
  scale: 1,
  translateX: 0,
  translateY: 0,
  isZoomed: false,
};

const DEFAULT_ZOOM_LIMITS: ZoomLimits = {
  minScale: 1,
  maxScale: 3,
  minTranslateX: -200,
  maxTranslateX: 200,
  minTranslateY: -200,
  maxTranslateY: 200,
};

export const useZoom = (
  containerRef: React.RefObject<HTMLElement | null>,
  imageRef: React.RefObject<HTMLElement | null>,
  limits: Partial<ZoomLimits> = {}
) => {
  const [zoomState, setZoomState] = useState<ZoomState>(DEFAULT_ZOOM_STATE);
  const [isZooming, setIsZooming] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const zoomLimits = { ...DEFAULT_ZOOM_LIMITS, ...limits };
  const lastTouchDistance = useRef<number>(0);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Contraindre une valeur dans des bornes
  const clamp = useCallback((value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  }, []);

  // Mettre à jour le state de zoom en respectant les limites
  const updateZoomState = useCallback(
    (next: Partial<ZoomState>) => {
      setZoomState((prev) => {
        const scale = next.scale ?? prev.scale;
        // limites de translation dynamiques en fonction du scale
        let minTx = zoomLimits.minTranslateX;
        let maxTx = zoomLimits.maxTranslateX;
        let minTy = zoomLimits.minTranslateY;
        let maxTy = zoomLimits.maxTranslateY;

        // Si on a accès aux dimensions, on calcule des bornes plus réalistes
        if (containerRef.current && imageRef.current) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const imageRect = imageRef.current.getBoundingClientRect();
          const scaledW = imageRect.width * scale;
          const scaledH = imageRect.height * scale;
          const halfExcessW = Math.max(0, (scaledW - containerRect.width) / 2);
          const halfExcessH = Math.max(0, (scaledH - containerRect.height) / 2);
          minTx = -halfExcessW;
          maxTx = halfExcessW;
          minTy = -halfExcessH;
          maxTy = halfExcessH;
        }

        const translateX = clamp(
          next.translateX ?? prev.translateX,
          minTx,
          maxTx
        );
        const translateY = clamp(
          next.translateY ?? prev.translateY,
          minTy,
          maxTy
        );

        const clampedScale = clamp(
          scale,
          zoomLimits.minScale,
          zoomLimits.maxScale
        );

        return {
          scale: clampedScale,
          translateX,
          translateY,
          isZoomed: clampedScale > 1,
        };
      });
    },
    [clamp, containerRef, imageRef, zoomLimits]
  );

  // Zoomer à une valeur (centré)
  const zoomTo = useCallback(
    (scale: number) => {
      const smoothed = Number(scale.toFixed(3));
      updateZoomState({ scale: smoothed });
    },
    [updateZoomState]
  );

  // Reset complet
  const resetZoom = useCallback(() => {
    setZoomState(DEFAULT_ZOOM_STATE);
  }, []);

  // Zoom par paliers simples
  const stepZoom = useCallback(() => {
    const levels = [1, 1.5, 2, 3];
    const current = zoomState.scale;
    const next = levels.find((l) => l > current) ?? 1;
    if (next === 1) {
      resetZoom();
    } else {
      zoomTo(next);
    }
  }, [zoomState.scale, zoomTo, resetZoom]);

  // Distance entre deux touches
  const getTouchDistance = useCallback((touches: TouchList) => {
    if (touches.length < 2) return 0;
    const [t1, t2] = [touches[0], touches[1]];
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  // Gestion des événements tactiles (pinch centré + drag)
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length === 2) {
        setIsZooming(true);
        lastTouchDistance.current = getTouchDistance(e.touches);
      } else if (e.touches.length === 1) {
        if (zoomState.isZoomed) {
          setIsDragging(true);
          dragStart.current = {
            x: e.touches[0].clientX - zoomState.translateX,
            y: e.touches[0].clientY - zoomState.translateY,
          };
        }
      }
    },
    [
      getTouchDistance,
      zoomState.isZoomed,
      zoomState.translateX,
      zoomState.translateY,
    ]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length === 2 && isZooming) {
        const currentDistance = getTouchDistance(e.touches);
        if (lastTouchDistance.current > 0) {
          const scaleChange = currentDistance / lastTouchDistance.current;
          const newScale = zoomState.scale * scaleChange;
          zoomTo(newScale);
        }
        lastTouchDistance.current = currentDistance;
        e.preventDefault();
      } else if (e.touches.length === 1 && isDragging && zoomState.isZoomed) {
        const touch = e.touches[0];
        updateZoomState({
          translateX: touch.clientX - dragStart.current.x,
          translateY: touch.clientY - dragStart.current.y,
        });
        e.preventDefault();
      }
    },
    [
      getTouchDistance,
      isZooming,
      isDragging,
      zoomState.scale,
      zoomState.isZoomed,
      zoomTo,
      updateZoomState,
    ]
  );

  const handleTouchEnd = useCallback(() => {
    setIsZooming(false);
    setIsDragging(false);
    lastTouchDistance.current = 0;
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("touchstart", handleTouchStart, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd);
    el.addEventListener("touchcancel", handleTouchEnd);
    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
      el.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [containerRef, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Style à appliquer à la zone zoomable
  const transformStyle = useCallback(() => {
    return {
      transform: `translate(${zoomState.translateX}px, ${zoomState.translateY}px) scale(${zoomState.scale})`,
      transformOrigin: "center center",
    };
  }, [zoomState]);

  return {
    zoomState,
    isZooming,
    isDragging,
    zoomTo,
    resetZoom,
    stepZoom,
    updateZoomState,
    transformStyle,
  };
};
