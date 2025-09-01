// components/gallery/ProjectGallery.tsx (SERVER)
import fs from "node:fs";
import path from "node:path";

import ProjectGalleryClient from "../../components/gallery/OptimizedGallery/ProjetctGalleryClient";

type OrderJson = Record<string, Record<string, string>>; // { slug: { "1": "01-xxx.jpg", ... }, ... }
type MetaEntry = {
  width?: number;
  height?: number;
  ["File:ImageWidth"]?: number;
  ["File:ImageHeight"]?: number;
};
type MetaJson = Record<string, MetaEntry>; // { "01-xxx.webp" | "01-xxx.jpg": { ... } }

type ImageForGallery = {
  src: string;
  alt: string;
  width: number;
  height: number;
  meta?: {
    title?: string;     // XMP:Title
    country?: string;   // IPTC:Country-PrimaryLocationName
    city?: string;      // XMP:City
    captionJa?: string; // IPTC:Caption-Abstract (japonais si dispo)
    palette?: string[]; // ['1A1E23', ...] (sans #)
    // exif?: { ISO?: number; FNumber?: number; ExposureTime?: number; date?: string; time?: string; } // si tu veux plus tard
  };
};

function pickMeta(base: string, metadata: Record<string, any>) {
  const key = [`${base}.webp`, `${base}.jpg`, `${base}.jpeg`].find(k => metadata[k]);
  const m = key ? metadata[key] : undefined;
  if (!m) return undefined;
  return {
    title: m["XMP:Title"],
    country: m["IPTC:Country-PrimaryLocationName"],
    city: m["XMP:City"],
    captionJa: m["IPTC:Caption-Abstract"],
    palette: Array.isArray(m["palette"]) ? m["palette"] : undefined,
    // exif: { ISO: m["EXIF:ISO"], FNumber: m["EXIF:FNumber"], ExposureTime: m["EXIF:ExposureTime"], date: m["IPTC:DigitalCreationDate"], time: m["IPTC:DigitalCreationTime"] }
  };
}

function getBasename(file: string) {
  return file.replace(/\.[^.]+$/, "");
}

function getDimsFromMeta(
  base: string,
  metadata: MetaJson
): { width: number; height: number } {
  // Essaye d'abord .webp (si tu as migré les clés metadata),
  // puis .jpg puis .jpeg (compat avec un ancien fichier metadata)
  const candidates = [`${base}.webp`, `${base}.jpg`, `${base}.jpeg`];

  for (const key of candidates) {
    const entry = metadata[key];
    if (!entry) continue;

    const w = entry.width ?? entry["File:ImageWidth"];
    const h = entry.height ?? entry["File:ImageHeight"];
    if (typeof w === "number" && typeof h === "number") {
      return { width: w, height: h };
    }
  }

  // Fallback raisonnable si aucune meta trouvée (évite de planter)
console.warn("[Gallery] Fallback size used for:", base);
return { width: 1600, height: 1067 };
}

export default function ProjectGallery({ projectDir }: { projectDir: string }) {
  // Dossiers / chemins
  const publicDir = path.join(process.cwd(), "public", projectDir, "L");
  const orderPath = path.join(process.cwd(), "data", "image_order.json");
  const metaPath = path.join(process.cwd(), "data", "image_metadata.json");

  // Lecture JSON
  const orderRaw = fs.readFileSync(orderPath, "utf-8");
  const metaRaw = fs.readFileSync(metaPath, "utf-8");
  const orderJson = JSON.parse(orderRaw) as OrderJson;
  const metadata = JSON.parse(metaRaw) as MetaJson;

  // Ordre pour le projet demandé
  const projectOrder = orderJson[projectDir];
  if (!projectOrder) {
    throw new Error(`Pas d'ordre trouvé pour le projet "${projectDir}" dans image_order.json`);
  }

  // Liste ordonnée des basenames (on ignore l'extension du JSON)
  const orderedBases = Object.keys(projectOrder)
    .sort((a, b) => Number(a) - Number(b))
    .map((k) => getBasename(projectOrder[k]));

  // Construction des images : on force .webp si présent dans /public,
  // sinon on retombe sur .jpg / .jpeg en dernier recours.
  const images = orderedBases
    .map((base) => {
      // fichier prioritaire
 let filename = `${base}.webp`;
      let filePath = path.join(publicDir, filename);
      if (!fs.existsSync(filePath)) {
        for (const f of [`${base}.jpg`, `${base}.jpeg`]) {
          const full = path.join(publicDir, f);
          if (fs.existsSync(full)) { filename = f; filePath = full; break; }
        }
        if (!fs.existsSync(filePath)) return null;
      }

      const { width, height } = getDimsFromMeta(base, metadata);
      return {
        src: `/${projectDir}/L/${filename}`,
        alt: base.replace(/[-_]/g, " "),
        width, height,
        meta: pickMeta(base, metadata),
      };
    })
    .filter(Boolean) as ImageForGallery[];

  return <ProjectGalleryClient images={images} />;
}
