"use client";

import Image from "next/image";
import styles from "./Gallery.module.css";
import type { BuiltImage } from "./hooks/buildJustifiedRows";

export default function Item({
  image,
  onSelect,
}: {
  image: BuiltImage;
  onSelect?: (index: number) => void;
}) {
  const { displayWidth, displayHeight } = image;

  return (
    <button
      type="button"
      className={styles.item}
      style={{ width: displayWidth, height: displayHeight }}
      aria-label={image.alt || "Open image"}
      onClick={() => onSelect?.(image.globalIndex)}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className={styles.img}
        sizes="100vw"
        priority={image.globalIndex < 4}
        loading={image.globalIndex < 4 ? "eager" : "lazy"}
        decoding="async"
        unoptimized
        draggable={false}
      />
    </button>
  );
}
