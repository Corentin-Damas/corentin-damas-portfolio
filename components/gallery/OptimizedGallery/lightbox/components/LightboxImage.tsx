"use client";

import React from "react";
import Image from "next/image";
import styles from "../Lightbox.module.css";
import type { LightboxImage as LightboxImageType } from "../types";

interface LightboxImageProps {
  image: LightboxImageType;
  loaded: boolean;
  dir: "next" | "prev" | null;
  onLoadingComplete: () => void;
  onStageClick: (e: React.MouseEvent) => void;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
  containerRef: React.RefObject<HTMLElement | null>;
  zoomRef: React.RefObject<HTMLElement | null>;
  transformStyle?: React.CSSProperties;
  disableSwipe?: boolean;
}

const LightboxImage = React.memo<LightboxImageProps>(
  ({
    image,
    loaded,
    dir,
    onLoadingComplete,
    onStageClick,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    containerRef,
    zoomRef,
    transformStyle,
    disableSwipe,
  }) => {
    return (
      <div
        key={image.src}
        className={styles.frame}
        data-dir={dir ?? ""}
        data-state={loaded ? "loaded" : "loading"}
        onClick={onStageClick}
        onPointerDown={disableSwipe ? undefined : onPointerDown}
        onPointerMove={disableSwipe ? undefined : onPointerMove}
        onPointerUp={disableSwipe ? undefined : onPointerUp}
        onPointerCancel={disableSwipe ? undefined : onPointerUp}
      >
        <div className={styles.stage} ref={containerRef}>
          <div
            className={styles.zoomCanvas}
            ref={zoomRef}
            style={transformStyle}
          >
            <Image
              src={image.src}
              alt={image.alt}
              unoptimized
              sizes="(max-width: 768px) 100vw, 100vw"
              className={`${styles.img} ${styles.media}`}
              fill
              onLoadingComplete={onLoadingComplete}
              priority
            />
          </div>
        </div>
        {/* Loader supprimé */}
      </div>
    );
  }
);

LightboxImage.displayName = "LightboxImage";

export default LightboxImage;
