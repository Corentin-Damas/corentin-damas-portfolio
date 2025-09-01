// components/gallery/MobileGallery.tsx
"use client";
import Image from "next/image";
import styles from "./Gallery.module.css";

export type MobileGalleryImage = {
  src: string;
  alt?: string;
  width: number;
  height: number;
};

type MobileGalleryProps = {
  images: MobileGalleryImage[];
  onSelect: (index: number) => void;
  gap?: number;           // px — défaut 12
  className?: string;     // optionnel pour surcharger le style
  eagerCount?: number;    // nb d’images à charger en priorité (défaut 2)
};

export default function MobileGallery({
  images,
  onSelect,
  eagerCount = 2,
}: MobileGalleryProps) {
  return (
    <div
      role="list"
      className={styles.mobileGallery}
    >
      {images.map((img, i) => {
        const label =
          img.alt && img.alt.trim().length > 0 ? img.alt : `Image ${i + 1}`;
        const loading = i < eagerCount ? "eager" : "lazy";

        return (
          <button
            key={i}
            type="button"
            role="listitem"
            className={styles.mobileItem}
            aria-label={`Open image: ${label}`}
            onClick={() => onSelect(i)}
          >
            <Image
              src={img.src}
              alt={label}
              className={styles.img}
              sizes="100vw"
              loading={loading}
              decoding="async"
              unoptimized
              draggable={false}
              width={100}
              height={100}
            />
          </button>
        );
      })}
    </div>
  );
}
