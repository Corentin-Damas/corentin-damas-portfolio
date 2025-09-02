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

export type LightboxProps = {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
};

export type SwipeState = {
  x: number;
  y: number;
  drag: boolean;
  blockClick: boolean;
  id: number;
};

export type NavigationState = {
  current: number;
  total: number;
  prevIdx: number | null;
  nextIdx: number | null;
};

export type LightboxState = {
  infoOpen: boolean;
  copied: string | null;
  loaded: boolean;
  dir: "next" | "prev" | null;
};

export type ZoomState = {
  scale: number;
  translateX: number;
  translateY: number;
  isZoomed: boolean;
};

export type ZoomLimits = {
  minScale: number;
  maxScale: number;
  minTranslateX: number;
  maxTranslateX: number;
  minTranslateY: number;
  maxTranslateY: number;
};
