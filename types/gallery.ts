export interface ImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

export interface GalleryImage extends ImageData {
  aspectRatio: number;
  globalIndex: number;
  displayWidth: number;
  displayHeight: number;
  blurDataURL?: string; // <= data URL "data:image/jpeg;base64,..."
}

export interface GalleryRow {
  images: GalleryImage[];
  height: number;
  width: number;
}

export interface Props {
  images: ImageData[];
  className?: string;
  targetRowHeight?: number;
  maxRowHeight?: number;
  minRowHeight?: number;
  gap?: number;
}

export interface BuildOptions {
  targetRowHeight: number;
  maxRowHeight: number;
  minRowHeight: number;
  gap: number;
}

