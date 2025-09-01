// Compat layer autour de buildJustifiedRows pour éviter toute divergence.
// - Ré-exporte les types.
// - Accepte soit un objet d'options, soit l'ancienne signature (gap, targetRowHeight, ...).

import {
  buildJustifiedRows,
  type InputImage,
  type BuiltImage,
  type BuiltRow,
} from "../components/gallery/OptimizedGallery/hooks/buildJustifiedRows";

export type {
  InputImage,
  BuiltImage,
  BuiltRow,
} from "../components/gallery/OptimizedGallery/hooks/buildJustifiedRows";

export type BuildOptions = {
  targetRowHeight: number;
  minRowHeight: number;
  maxRowHeight: number;
  gap: number;
  justifyLastRowAlways?: boolean; // dernière ligne toujours justifiée
  justifyLastRowSingle?: boolean; // si dernière ligne = 1 image, pleine largeur
};

// Signature moderne (objet d'options)
export function buildImageRows(
  images: InputImage[],
  containerWidth: number,
  options: BuildOptions
): BuiltRow[];

// Signature legacy (gap[, targetRowHeight, minRowHeight, maxRowHeight])
export function buildImageRows(
  images: InputImage[],
  containerWidth: number,
  gap: number,
  targetRowHeight?: number,
  minRowHeight?: number,
  maxRowHeight?: number
): BuiltRow[];

// Implémentation unique
export function buildImageRows(
  images: InputImage[],
  containerWidth: number,
  arg3: BuildOptions | number,
  targetRowHeight?: number,
  minRowHeight?: number,
  maxRowHeight?: number
): BuiltRow[] {
  if (typeof arg3 === "number") {
    // Legacy: (images, width, gap, target?, min?, max?)
    const gap = arg3;
    const opts: BuildOptions = {
      gap,
      targetRowHeight: targetRowHeight ?? 280,
      minRowHeight: minRowHeight ?? 180,
      maxRowHeight: maxRowHeight ?? 420,
      justifyLastRowAlways: true,
      justifyLastRowSingle: true,
    };
    return buildJustifiedRows(images, containerWidth, opts);
  } else {
    // Moderne: (images, width, options)
    const opts: BuildOptions = {
      justifyLastRowAlways: true,
      justifyLastRowSingle: true,
      ...arg3,
    };
    return buildJustifiedRows(images, containerWidth, opts);
  }
}
