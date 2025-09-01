"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styles from "./Lightbox.module.css";

export type LightboxImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  meta?: {
    title?: string;
    country?: string;
    city?: string;
    captionJa?: string;
    palette?: string[]; // ex: ["1A1E23","DBDEDE",...]
    // exif?: { ISO?: number; FNumber?: number; ExposureTime?: number; date?: string; time?: string; }
  };
};

export default function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const total = images.length;
  const current = images[index];
  const prevIdx = index > 0 ? index - 1 : null;
  const nextIdx = index < total - 1 ? index + 1 : null;

  const [infoOpen, setInfoOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const prevIndexRef = useRef(index);
  const [dir, setDir] = useState<"next" | "prev" | null>(null);

  // ⬇️ Palette → variables CSS pour le bouton Info
  const palette = (current.meta?.palette ?? []).map(
    (p) => "#" + p.replace("#", "")
  );
  const hasPalette = palette.length > 0;
  const infoVars: React.CSSProperties | undefined = hasPalette
    ? ({
        // valeurs de repli sobres pour éviter les flashs
        ["--info-c1" as any]: palette[0] ?? "#11354d",
        ["--info-c2" as any]: palette[1] ?? "#11354d",
        ["--info-c3" as any]: palette[2] ?? "#11354d",
        ["--info-c4" as any]: palette[3] ?? "#11354d",
      } as React.CSSProperties)
    : undefined;

  const swipe = useRef({ x: 0, y: 0, drag: false, blockClick: false, id: -1 });
  const THRESH = 48; // px

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") {
      swipe.current = {
        x: e.clientX,
        y: e.clientY,
        drag: false,
        blockClick: false,
        id: e.pointerId,
      };
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (swipe.current.id === e.pointerId) {
      const dx = e.clientX - swipe.current.x;
      const dy = e.clientY - swipe.current.y;
      // glisse horizontale dominante
      if (
        !swipe.current.drag &&
        Math.abs(dx) > 10 &&
        Math.abs(dx) > Math.abs(dy)
      ) {
        swipe.current.drag = true;
      }
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (swipe.current.id === e.pointerId) {
      const dx = e.clientX - swipe.current.x;
      if (swipe.current.drag && Math.abs(dx) > THRESH) {
        swipe.current.blockClick = true; // empêche le clic de fond
        if (dx < 0)
          onNavigate(nextIdx as number); // swipe gauche → image suivante
        else onNavigate(prevIdx as number); // swipe droite → image précédente
      }
      swipe.current.id = -1;
    }
  };

  const onStageClick = (e: React.MouseEvent) => {
    if (swipe.current.blockClick) {
      // évite de fermer après un swipe
      swipe.current.blockClick = false;
      e.stopPropagation();
      return;
    }
    // règle “tap”: ferme le panneau sinon la lightbox
    if (infoOpen) setInfoOpen(false);
    else onClose();
  };

  // lock scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // keyboard nav
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && nextIdx !== null) onNavigate(nextIdx);
      else if (e.key === "ArrowLeft" && prevIdx !== null) onNavigate(prevIdx);
      else if (e.key.toLowerCase() === "i") setInfoOpen((v) => !v);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNavigate, prevIdx, nextIdx]);

  useEffect(() => {
    const old = prevIndexRef.current;
    if (index !== old) setDir(index > old ? "next" : "prev");
    prevIndexRef.current = index;
    setLoaded(false); // on attend le onLoadingComplete
  }, [index]);

  // preload neighbors
  useEffect(() => {
    [prevIdx, nextIdx].forEach((i) => {
      if (i != null) {
        const im = new window.Image();
        im.src = images[i].src;
      }
    });
  }, [index, prevIdx, nextIdx, images]);
  // copy hex
  async function copyHex(hexNoHash: string) {
    const hex = "#" + hexNoHash.replace("#", "").toUpperCase();
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* noop */
    }
  }

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lb-title"
    >
      <div className={styles.backdrop} onClick={onStageClick} />

      <div className={styles.content_container}>
        {/* Zone image (flex:1) */}
        <div className={styles.content}>
          {/* nav */}
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

          {/* fermer */}
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

          {/* toggle infos (côté droit) */}
          <button
            className={`${styles.infoToggle} ${
              hasPalette ? styles.infoColored : ""
            }`}
            style={infoVars}
            onClick={() => setInfoOpen((v) => !v)}
            aria-label={
              infoOpen ? "Hide informations" : "Display more informations"
            }
            aria-pressed={infoOpen}
          >
            i
          </button>

          {/* image */}
          <div
            key={current.src}
            className={styles.frame}
            data-dir={dir ?? ""}
            data-state={loaded ? "loaded" : "loading"}
            onClick={onStageClick}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div className={styles.stage}>
              <Image
                src={current.src}
                alt={current.alt}
                unoptimized
                sizes="(max-width: 768px) 100vw, 100vw"
                className={`${styles.img} ${styles.media}`}
                fill
                // onClick={(e) => e.stopPropagation()}
                onLoadingComplete={() => setLoaded(true)}
                priority
              />
            </div>

            <div className={styles.counter}>
              {index + 1} / {total}
            </div>
          </div>
          <div className={styles.loader} hidden={loaded} />
        </div>

        {/* Panneau latéral (pousse le stage) */}
        <aside
          className={`${styles.side} ${infoOpen ? styles.sideOpen : ""}`}
          // aria-hidden={!infoOpen}
          aria-live="polite"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`grain ${styles.grain_opacity}`}
            aria-hidden="true"
          ></div>
          <button
            className={styles.sideClose}
            onClick={() => setInfoOpen(false)}
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
            {current.meta?.title && (
              <h3 className={styles.sideTitle}>{current.meta.title}</h3>
            )}
            <div className={styles.metaList}>
              {current.meta?.country && (
                <div className={styles.metaList_item}>
                  <h4>Country</h4>
                  <p>{current.meta.country}</p>
                </div>
              )}
              {current.meta?.city && (
                <div className={styles.metaList_item}>
                  <h4>City</h4>
                  <p>{current.meta.city}</p>
                </div>
              )}
              {current.meta?.captionJa && (
                <div className={styles.metaList_item}>
                  <h4>Caption</h4>
                  <p className={styles.ja}>{current.meta.captionJa}</p>
                </div>
              )}
            </div>
          </div>

          {/* palette en bas */}
          {Array.isArray(current.meta?.palette) &&
            current.meta!.palette!.length > 0 && (
              <div className={styles.palette_container}>
                <div className={styles.palette} aria-label="Color palette">
                  {current.meta!.palette!.map((p, i) => {
                    const hex = "#" + p.replace("#", "").toUpperCase();
                    return (
                      <button
                        key={i}
                        type="button"
                        className={styles.swatch}
                        title={`Copy ${hex}`}
                        onClick={() => copyHex(p)}
                        style={{ backgroundColor: hex }}
                        aria-label={`Copy color ${hex}`}
                      ></button>
                    );
                  })}
                </div>
                <p className={styles.palette_instruction}>
                  Select colour to copy on clipboard
                </p>
              </div>
            )}
          {copied && (
            <div className={styles.copied}>Color copied: {copied}</div>
          )}
        </aside>
      </div>
    </div>
  );
}
