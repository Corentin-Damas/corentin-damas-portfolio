"use client";

import React, { useCallback } from "react";
import styles from "../Lightbox.module.css";

interface ColorPaletteProps {
  palette: string[];
  copied: string | null;
  onCopyHex: (hex: string) => void;
}

const ColorPalette = React.memo<ColorPaletteProps>(
  ({ palette, copied, onCopyHex }) => {
    const handleCopyHex = useCallback(
      async (hexNoHash: string) => {
        const hex = "#" + hexNoHash.replace("#", "").toUpperCase();
        try {
          await navigator.clipboard.writeText(hex);
          onCopyHex(hex);
          setTimeout(() => onCopyHex(""), 1500);
        } catch {
          /* noop */
        }
      },
      [onCopyHex]
    );

    if (!palette || palette.length === 0) {
      return null;
    }

    return (
      <div className={styles.palette_container}>
        <div className={styles.palette} aria-label="Color palette">
          {palette.map((p, i) => {
            const hex = "#" + p.replace("#", "").toUpperCase();
            return (
              <button
                key={i}
                type="button"
                className={styles.swatch}
                title={`Copy ${hex}`}
                onClick={() => handleCopyHex(p)}
                style={{ backgroundColor: hex }}
                aria-label={`Copy color ${hex}`}
              />
            );
          })}
        </div>
        <p className={styles.palette_instruction}>
          Select colour to copy on clipboard
        </p>
        {copied && <div className={styles.copied}>Color copied: {copied}</div>}
      </div>
    );
  }
);

ColorPalette.displayName = "ColorPalette";

export default ColorPalette;
