"use client";

import Item from "./Item";
import styles from "./Gallery.module.css";
import type { BuiltImage } from "./hooks/buildJustifiedRows";

export default function Row({
  images,
  rowHeight,
  gap,
  onSelect,
}: {
  images: BuiltImage[];
  rowHeight: number;
  gap: number;
  onSelect?: (i: number) => void;
}) {
  return (
    <div className={styles.row} style={{ height: rowHeight, gap }}>
      {images.map((img) => (
        <Item key={img.globalIndex} image={img} onSelect={onSelect} />
      ))}
    </div>
  );
}
