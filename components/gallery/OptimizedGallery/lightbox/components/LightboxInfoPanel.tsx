"use client";

import React from "react";
import styles from "../Lightbox.module.css";
import type { LightboxImage } from "../types";
import ColorPalette from "./ColorPalette";

interface LightboxInfoPanelProps {
  image: LightboxImage;
  infoOpen: boolean;
  onClose: () => void;
  copied: string | null;
  onCopyHex: (hex: string) => void;
}

const LightboxInfoPanel = React.memo<LightboxInfoPanelProps>(({
  image,
  infoOpen,
  onClose,
  copied,
  onCopyHex,
}) => {
  const palette = (image.meta?.palette ?? []).map(
    (p) => "#" + p.replace("#", "")
  );

  return (
    <aside
      className={`${styles.side} ${infoOpen ? styles.sideOpen : ""}`}
      aria-live="polite"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={`grain ${styles.grain_opacity}`}
        aria-hidden="true"
      />
      
      <button
        className={styles.sideClose}
        onClick={onClose}
        aria-label="Close informations"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 5v14" />
          <path d="M15 12H7" />
          <path d="m15 18 6-6-6-6" />
        </svg>
      </button>

      <div className={styles.sideInner}>
        {image.meta?.title && (
          <h3 className={styles.sideTitle}>{image.meta.title}</h3>
        )}
        
        <div className={styles.metaList}>
          {image.meta?.country && (
            <div className={styles.metaList_item}>
              <h4>Country</h4>
              <p>{image.meta.country}</p>
            </div>
          )}
          {image.meta?.city && (
            <div className={styles.metaList_item}>
              <h4>City</h4>
              <p>{image.meta.city}</p>
            </div>
          )}
          {image.meta?.captionJa && (
            <div className={styles.metaList_item}>
              <h4>Caption</h4>
              <p className={styles.ja}>{image.meta.captionJa}</p>
            </div>
          )}
        </div>
      </div>

      <ColorPalette
        palette={image.meta?.palette ?? []}
        copied={copied}
        onCopyHex={onCopyHex}
      />
    </aside>
  );
});

LightboxInfoPanel.displayName = "LightboxInfoPanel";

export default LightboxInfoPanel;
