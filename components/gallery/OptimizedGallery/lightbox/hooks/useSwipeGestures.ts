import { useRef, useCallback } from "react";
import type { SwipeState } from "../types";

// Seuils optimisés pour une meilleure fluidité
const SWIPE_THRESHOLD = 60; // px - distance minimale pour déclencher un swipe
const VELOCITY_THRESHOLD = 0.3; // px/ms - vitesse minimale pour un swipe rapide
const DIRECTION_THRESHOLD = 0.5; // ratio - dominance horizontale vs verticale
const MOMENTUM_DECAY = 0.95; // facteur de décélération pour le momentum

export const useSwipeGestures = (
  onNavigate: (index: number) => void,
  prevIdx: number | null,
  nextIdx: number | null
) => {
  const swipe = useRef<SwipeState>({
    x: 0,
    y: 0,
    drag: false,
    blockClick: false,
    id: -1,
  });

  // État pour le momentum et la vélocité
  const velocity = useRef({ x: 0, y: 0 });
  const lastMoveTime = useRef(0);
  const startTime = useRef(0);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") {
      const now = Date.now();
      swipe.current = {
        x: e.clientX,
        y: e.clientY,
        drag: false,
        blockClick: false,
        id: e.pointerId,
      };
      // Reset du momentum
      velocity.current = { x: 0, y: 0 };
      startTime.current = now;
      lastMoveTime.current = now;
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    }
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (swipe.current.id === e.pointerId) {
      const now = Date.now();
      const dx = e.clientX - swipe.current.x;
      const dy = e.clientY - swipe.current.y;
      const deltaTime = now - lastMoveTime.current;

      // Calcul de la vélocité
      if (deltaTime > 0) {
        velocity.current = {
          x: dx / deltaTime,
          y: dy / deltaTime,
        };
      }

      // Détection améliorée du swipe horizontal
      const totalDistance = Math.sqrt(dx * dx + dy * dy);
      const horizontalRatio = Math.abs(dx) / (Math.abs(dx) + Math.abs(dy) || 1);

      if (
        !swipe.current.drag &&
        totalDistance > 15 && // seuil de démarrage plus bas
        horizontalRatio > DIRECTION_THRESHOLD
      ) {
        swipe.current.drag = true;
      }

      lastMoveTime.current = now;
    }
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (swipe.current.id === e.pointerId) {
        const dx = e.clientX - swipe.current.x;
        const dy = e.clientY - swipe.current.y;
        const totalTime = Date.now() - startTime.current;

        if (swipe.current.drag) {
          const totalDistance = Math.sqrt(dx * dx + dy * dy);
          const horizontalRatio =
            Math.abs(dx) / (Math.abs(dx) + Math.abs(dy) || 1);
          const avgVelocity = totalDistance / totalTime;

          // Décision basée sur distance OU vélocité
          const shouldSwipe =
            (totalDistance > SWIPE_THRESHOLD &&
              horizontalRatio > DIRECTION_THRESHOLD) ||
            (avgVelocity > VELOCITY_THRESHOLD &&
              horizontalRatio > DIRECTION_THRESHOLD);

          if (shouldSwipe) {
            swipe.current.blockClick = true; // empêche le clic de fond

            // Navigation basée sur la direction
            if (dx < 0 && nextIdx !== null) {
              onNavigate(nextIdx); // swipe gauche → image suivante
            } else if (dx > 0 && prevIdx !== null) {
              onNavigate(prevIdx); // swipe droite → image précédente
            }
          }
        }

        // Reset
        swipe.current.id = -1;
        velocity.current = { x: 0, y: 0 };
      }
    },
    [onNavigate, prevIdx, nextIdx]
  );

  const onStageClick = useCallback(
    (
      e: React.MouseEvent,
      infoOpen: boolean,
      onClose: () => void,
      setInfoOpen: (open: boolean) => void
    ) => {
      if (swipe.current.blockClick) {
        // évite de fermer après un swipe
        swipe.current.blockClick = false;
        e.stopPropagation();
        return;
      }
      // règle "tap": ferme le panneau sinon la lightbox
      if (infoOpen) {
        setInfoOpen(false);
      } else {
        onClose();
      }
    },
    []
  );

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onStageClick,
  };
};
