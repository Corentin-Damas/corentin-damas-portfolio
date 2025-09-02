"use client";

import React from "react";
import styles from "../Lightbox.module.css";

interface LightboxControlsProps {
  prevIdx: number | null;
  nextIdx: number | null;
  onNavigate: (index: number) => void;
  onClose: () => void;
  infoOpen: boolean;
  onToggleInfo: () => void;
  hasPalette: boolean;
  infoVars?: React.CSSProperties;
  index: number;
  total: number;
  onStepZoom?: () => void;
}

const LightboxControls = React.memo<LightboxControlsProps>(
  ({
    prevIdx,
    nextIdx,
    onNavigate,
    onClose,
    infoOpen,
    onToggleInfo,
    hasPalette,
    infoVars,
    index,
    total,
    onStepZoom,
  }) => {
    return (
      <>
        {/* Navigation buttons */}
        <button
          className={`${styles.nav} ${styles.prev}`}
          onClick={() => prevIdx !== null && onNavigate(prevIdx)}
          disabled={prevIdx === null}
          aria-label="Previous image"
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
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H12" />
          </svg>
        </button>

        <button
          className={`${styles.nav} ${styles.next}`}
          onClick={() => nextIdx !== null && onNavigate(nextIdx)}
          disabled={nextIdx === null}
          aria-label="Next image"
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
            <path d="M5 12h7" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>

        {/* Close button */}
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Close lightbox"
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {/* Info toggle button */}
        <button
          className={`${styles.infoToggle} ${
            hasPalette ? styles.infoColored : ""
          }`}
          style={infoVars}
          onClick={onToggleInfo}
          aria-label={
            infoOpen ? "Hide informations" : "Display more informations"
          }
          aria-pressed={infoOpen}
        >
          i
        </button>

        {/* Zoom step button (simple) */}
        {onStepZoom && (
          <button
            className={styles.infoToggle}
            style={{
              right: `calc(2vmin + var(--icone-S) + 8px)`,
              top: "2vmin",
              bottom: "auto",
            }}
            onClick={onStepZoom}
            aria-label="Zoom"
            title="Zoom"
            type="button"
          >
            +
          </button>
        )}

        {/* Counter */}
        <div className={styles.counter}>
          {index + 1} / {total}
        </div>
      </>
    );
  }
);

LightboxControls.displayName = "LightboxControls";

export default LightboxControls;
