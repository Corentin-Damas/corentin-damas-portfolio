"use client";

import React from "react";
import Image from "next/image";
import styles from "../Lightbox.module.css";
import type { LightboxImage as LightboxImageType } from "../types";

interface LightboxImageProps {
  image: LightboxImageType;
  loaded: boolean;
  dir: "next" | "prev" | null;
  onLoad: () => void;
  onImageClick: (e: React.MouseEvent) => void;
  onImageDoubleClick?: (e: React.MouseEvent) => void;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  zoomRef: React.RefObject<HTMLDivElement | null>;
  transformStyle?: React.CSSProperties;
  disableSwipe?: boolean;
}

const LightboxImage = React.memo<LightboxImageProps>(
  ({
    image,
    loaded,
    dir,
    onLoad,
    onImageClick,
    onImageDoubleClick,
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
        ref={containerRef}
      >
        <div className={styles.zoomCanvas} ref={zoomRef} style={transformStyle}>
          <div
            className={styles.imageContainer}
            style={{
              ["--img-w" as unknown as string]: String(image.width),
              ["--img-h" as unknown as string]: String(image.height),
            }}
            onPointerDown={disableSwipe ? undefined : onPointerDown}
            onPointerMove={disableSwipe ? undefined : onPointerMove}
            onPointerUp={disableSwipe ? undefined : onPointerUp}
            onPointerCancel={disableSwipe ? undefined : onPointerUp}
          >
            <Image
              src={image.src}
              alt={image.alt}
              unoptimized
              fill
              sizes="90vw"
              className={styles.img}
              onLoad={onLoad}
              onClick={onImageClick}
              onDoubleClick={onImageDoubleClick}
              priority
            />
          </div>
        </div>
      </div>
    );
  }
);

LightboxImage.displayName = "LightboxImage";

export default LightboxImage;
