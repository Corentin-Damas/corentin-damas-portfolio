"use client";

import { useState, useEffect } from "react";
import DesktopGallery from "./DesktopGallery";
import useIsMobile from "./hooks/useMobile";
import Lightbox from "../OptimizedGallery/lightbox";
import MobileGallery from "./MobileGallery";
import WaitingGallery from "./WaitingGallery";

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export default function ProjectGalleryClient({
  images,
}: {
  images: GalleryImage[];
}) {
  const [index, setIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile(900);

  useEffect(() => {
    let alive = true;

    const minDelay = new Promise<void>((r) => setTimeout(r, 2000));
    const decodeAll = Promise.all(
      images.map(({ src }) => {
        const img = new window.Image(); // IMPORTANT: window.Image (pas Next <Image/>)
        img.src = src;
        return img.decode().catch(() => {});
      })
    ).then(() => {});

    Promise.all([minDelay, decodeAll]).then(() => {
      if (alive) setLoading(false);
    });

    return () => {
      alive = false;
    };
  }, [images]);

  if (loading) {
    return <WaitingGallery />;
  }

  return (
    <>
      {isMobile ? (
        <MobileGallery images={images} onSelect={setIndex} />
      ) : (
        <DesktopGallery
          images={images}
          gap={24}
          targetRowHeight={360}
          minRowHeight={310}
          maxRowHeight={480}
          onSelect={setIndex}
        />
      )}

      {index !== null && (
        <Lightbox
          images={images}
          index={index}
          onClose={() => setIndex(null)}
          onNavigate={setIndex}
        />
      )}
    </>
  );
}
