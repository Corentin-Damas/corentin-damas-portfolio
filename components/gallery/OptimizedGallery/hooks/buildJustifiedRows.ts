export type InputImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type BuiltImage = InputImage & {
  aspectRatio: number;
  displayWidth: number;
  displayHeight: number;
  globalIndex: number;
};

export type BuiltRow = { images: BuiltImage[]; height: number; width: number };

export type BuildOptions = {
  targetRowHeight: number; // hauteur “guide” qui détermine combien d’images par ligne
  gap: number;
  // bornes optionnelles (laisse par défaut pour rester simple)
  minRowHeight?: number;
  maxRowHeight?: number;
  justifyLastRowAlways?: boolean; // on laisse à true par défaut
};

const gaps = (count: number, gap: number) => gap * Math.max(0, count - 1);
const clamp = (n: number, a = 1, b = Number.POSITIVE_INFINITY) =>
  Math.max(a, Math.min(b, n));

export function buildJustifiedRows(
  images: InputImage[],
  containerWidthRaw: number,
  {
    targetRowHeight,
    gap,
    minRowHeight,
    maxRowHeight,
    justifyLastRowAlways = true,
  }: BuildOptions
): BuiltRow[] {
  const rows: BuiltRow[] = [];
  if (!images?.length || containerWidthRaw <= 0) return rows;

  const W = Math.round(containerWidthRaw); // largeur entière = pas de débordement
  let row: BuiltImage[] = [];
  let sumAR = 0;
  let idx = 0;

  const toBuilt = (img: InputImage): BuiltImage => ({
    ...img,
    aspectRatio: img.width / img.height,
    displayWidth: 0,
    displayHeight: 0,
    globalIndex: idx++,
  });

  function flushJustified(current: BuiltImage[], arSum: number) {
    if (current.length === 0) return;
    const gpx = gaps(current.length, gap);
    const target = Math.max(1, W - gpx);

    // Hauteur exacte qui remplit la ligne (puis bornée si besoin)
    const H0 = target / arSum;
    const H = Math.round(clamp(H0, minRowHeight, maxRowHeight));

    // Largeurs réelles à cette hauteur
    const exacts = current.map((it) => it.aspectRatio * H);
    const floors = exacts.map((x) => Math.floor(x));
    let used = floors.reduce((a, b) => a + b, 0);
    let missing = target - used;

    // Distribuer les pixels manquants sur les plus gros résidus
    const order = exacts
      .map((x, i) => ({ i, r: x - floors[i] }))
      .sort((a, b) => b.r - a.r);

    for (let k = 0; missing > 0; k = (k + 1) % order.length) {
      floors[order[k].i] += 1;
      missing--;
    }

    current.forEach((it, i) => {
      it.displayWidth = floors[i];
      it.displayHeight = H;
    });

    rows.push({ images: current, height: H, width: W });
  }

  for (const img of images) {
    const b = toBuilt(img);
    const nextLen = row.length + 1;
    const nextSum = sumAR + b.aspectRatio;
    const predicted = nextSum * targetRowHeight + gaps(nextLen, gap);

    if (predicted <= W || row.length === 0) {
      // on ajoute tant que ça tient (ou si c’est la 1re de la ligne)
      row.push(b);
      sumAR = nextSum;
    } else {
      // on justifie la ligne courante, puis on redémarre avec l’image refusée
      flushJustified(row, sumAR);
      row = [b];
      sumAR = b.aspectRatio;
    }
  }

  // Dernière ligne
  if (row.length > 0) {
    if (justifyLastRowAlways || row.length === 1) {
      flushJustified(row, sumAR);
    } else {
      const gpx = gaps(row.length, gap);
       const H = Math.round(clamp(targetRowHeight, minRowHeight, maxRowHeight));
      row.forEach((it) => {
        it.displayWidth = Math.round(it.aspectRatio * H);
        it.displayHeight = H;
      });
      rows.push({ images: row, height: H, width: Math.min(W, gpx + row.reduce((s, it) => s + it.displayWidth, 0)) });
    }
  }

  return rows;
}
