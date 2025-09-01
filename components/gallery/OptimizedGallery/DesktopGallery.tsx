"use client";

import React, { useEffect, useMemo, useState } from "react";
import useContainerWidth from "./hooks/useContainerWidth";
import {
  buildJustifiedRows,
  type InputImage,
  type BuiltRow,
} from "./hooks/buildJustifiedRows";
import Row from "./Row";

export type GalleryInputImage = InputImage;

type Props = {
  images: GalleryInputImage[];
  gap?: number; // espace horizontal entre images (px)
  targetRowHeight?: number; // hauteur visée (px)
  minRowHeight?: number;
  maxRowHeight?: number;
  className?: string;
  onSelect?: (index: number) => void;
};

const TARGET_ROW_HEIGHT= 280
const MIN_ROW_HEIGHT= 1

export default function DesktopGallery({
  images,
  gap = 8,
  targetRowHeight = TARGET_ROW_HEIGHT,
  minRowHeight = MIN_ROW_HEIGHT,
  maxRowHeight = Number.POSITIVE_INFINITY,
  className,
  onSelect,
}: Props) {
  // Mesure du conteneur
  const { ref, width } = useContainerWidth<HTMLDivElement>();

  // Largeur “stable” pour éviter le reflow sur micro-variations (scrollbar, etc.)
  const [stickyWidth, setStickyWidth] = useState(0);
  useEffect(() => {
    if (
      width > 0 &&
      (stickyWidth === 0 || Math.abs(width - stickyWidth) >= 8)
    ) {
      setStickyWidth(width);
    }
  }, [width, stickyWidth]);

  // Quantification (évite les repacks pour 1–2px)
  const effectiveWidth =
    stickyWidth > 0 ? Math.round(stickyWidth / 16) * 16 : 0;

  // Construction des lignes, seulement quand on a une vraie mesure
const rows = useMemo(
  () =>
    width
      ? buildJustifiedRows(images, Math.round(width), {
          targetRowHeight,
          gap,
          minRowHeight,
          maxRowHeight,
          justifyLastRowAlways: true,
        })
      : [],
  [images, width, gap]
);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: gap, // espacement vertical entre lignes
        contain: "content",
        overflowX: "clip",
      }}
    >
      {rows.length === 0
        ? null
        : rows.map((row, i) => (
            <Row
              key={i}
              images={row.images}
              rowHeight={row.height}
              gap={gap}
              onSelect={onSelect}
            />
          ))}
    </div>
  );
}
