"use client";

import React, { useMemo, useCallback, useRef, useEffect } from "react";
import styles from "./Lightbox.module.css";
import type { LightboxProps } from "./types";

// Hooks
import { useLightboxNavigation } from "./hooks/useLightboxNavigation";
import { useSwipeGestures } from "./hooks/useSwipeGestures";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
import { useImagePreloading } from "./hooks/useImagePreloading";
import { useLightboxState } from "./hooks/useLightboxState";

// Components
import LightboxImage from "./components/LightboxImage";
import LightboxControls from "./components/LightboxControls";
import LightboxInfoPanel from "./components/LightboxInfoPanel";
import { useZoom } from "./hooks/useZoom";

export default function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: LightboxProps) {
  const current = images[index];

  // Hooks
  const navigation = useLightboxNavigation(images, index);
  const { infoOpen, setInfoOpen, copied, setCopied, loaded, setLoaded, dir } =
    useLightboxState(index);

  const swipeGestures = useSwipeGestures(
    onNavigate,
    navigation.prevIdx,
    navigation.nextIdx
  );

  useKeyboardNavigation(
    onClose,
    onNavigate,
    navigation.prevIdx,
    navigation.nextIdx,
    setInfoOpen
  );

  useImagePreloading(images, index, navigation.prevIdx, navigation.nextIdx);

  // Zoom (mobile)
  const containerRef = useRef<HTMLDivElement | null>(null);
  const zoomRef = useRef<HTMLDivElement | null>(null);
  const { zoomState, transformStyle, resetZoom, stepZoom } = useZoom(
    containerRef,
    zoomRef,
    { maxScale: 3 }
  );

  // Reset le zoom quand on change d'image
  useEffect(() => {
    resetZoom();
  }, [index, resetZoom]);

  // ⬇️ Palette → variables CSS pour le bouton Info
  const palette = useMemo(
    () => (current.meta?.palette ?? []).map((p) => "#" + p.replace("#", "")),
    [current.meta?.palette]
  );

  const hasPalette = palette.length > 0;

  const infoVars: React.CSSProperties | undefined = useMemo(
    () =>
      hasPalette
        ? ({
            // valeurs de repli sobres pour éviter les flashs
            ["--info-c1" as string]: palette[0] ?? "#11354d",
            ["--info-c2" as string]: palette[1] ?? "#11354d",
            ["--info-c3" as string]: palette[2] ?? "#11354d",
            ["--info-c4" as string]: palette[3] ?? "#11354d",
          } as React.CSSProperties)
        : undefined,
    [hasPalette, palette]
  );

  // Callbacks
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      // Backdrop click → fermer uniquement
      e.preventDefault();
      e.stopPropagation();
      onClose();
    },
    [onClose]
  );

  const handleImageSectionClick = useCallback((e: React.MouseEvent) => {
    // Empêcher la propagation vers le backdrop
    e.stopPropagation();
  }, []);

  const handleStageClick = useCallback((e: React.MouseEvent) => {
    // Tap sur l'image → ne fait rien (prépare double‑tap prochainement)
    e.stopPropagation();
    return;
  }, []);

  // Double click (desktop) traité comme double-tap → stepZoom
  const handleStageDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      stepZoom();
    },
    [stepZoom]
  );

  const handleToggleInfo = useCallback(() => {
    setInfoOpen((prev) => !prev);
  }, [setInfoOpen]);

  const handleCloseInfo = useCallback(() => {
    setInfoOpen(false);
  }, [setInfoOpen]);

  const handleCopyHex = useCallback(
    (hex: string) => {
      setCopied(hex);
    },
    [setCopied]
  );

  return (
    <div
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lb-title"
    >
      {/* Backdrop cliquable */}
      <div className={styles.backdrop} onClick={handleBackdropClick} />

      {/* Contenu principal */}
      <div className={styles.content}>
        {/* Zone image centrée */}
        <div className={styles.imageSection} onClick={handleImageSectionClick}>
          <LightboxImage
            image={current}
            loaded={loaded}
            dir={dir}
            onLoad={() => setLoaded(true)}
            onImageClick={handleStageClick}
            onImageDoubleClick={handleStageDoubleClick}
            onPointerDown={swipeGestures.onPointerDown}
            onPointerMove={swipeGestures.onPointerMove}
            onPointerUp={swipeGestures.onPointerUp}
            containerRef={containerRef}
            zoomRef={zoomRef}
            transformStyle={transformStyle()}
            disableSwipe={zoomState.isZoomed}
          />
        </div>

        {/* Contrôles de navigation */}
        <LightboxControls
          prevIdx={navigation.prevIdx}
          nextIdx={navigation.nextIdx}
          onNavigate={onNavigate}
          onClose={onClose}
          infoOpen={infoOpen}
          onToggleInfo={handleToggleInfo}
          hasPalette={hasPalette}
          infoVars={infoVars}
          index={index}
          total={navigation.total}
          onStepZoom={stepZoom}
        />

        {/* Panneau d'informations */}
        <LightboxInfoPanel
          image={current}
          infoOpen={infoOpen}
          onClose={handleCloseInfo}
          copied={copied}
          onCopyHex={handleCopyHex}
        />
      </div>
    </div>
  );
}
