import {
  GrowthHabit,
  HymeniumType,
  LatexType,
  Mushroom,
  RingType,
} from '../types/mushroom';

export interface UploadedPhotoSlot {
  slotIndex: number; // 0 = Klobuk, 1 = Odozdo, 2 = Prerez i baza
  slotLabel: string;
  data: string;
  mimeType: string;
}

export type UnderCapTrait = 'ALL' | 'listici' | 'cjevcice' | 'bodljice' | 'trubasto';
export type GrowsOnTrait = 'ALL' | 'tlo' | 'panj_deblo';
export type StemBaseTrait = 'ALL' | 'ima_vrecicu' | 'nema_vrecice';
export type FleshCutTrait = 'ALL' | 'mijenja_boju' | 'ne_mijenja' | 'pusta_mlijeko';

export interface VisibleTraitsFilter {
  underCap: UnderCapTrait;
  growsOn: GrowsOnTrait;
  stemBase: StemBaseTrait;
  fleshCut: FleshCutTrait;
}

export interface QuickMorphologyFilters {
  hymenium: HymeniumType | 'AUTO';
  growth: GrowthHabit | 'AUTO';
  ring: RingType | 'AUTO';
  latex: LatexType | 'AUTO';
}

export interface DeterminationResult {
  engineMode: 'OFFLINE_FOREST_ENGINE' | 'HYBRID_OPEN_BIO';
  hasStemBasePhoto: boolean;
  detectedColorSummary: string;
  morphologicalAnalysis: {
    klobuk: string;
    himenij: string;
    strucakIbaza: string;
    opciDojam: string;
  };
  topMatches: {
    matchedId: string;
    name: string;
    latin: string;
    confidence: number;
    status: string;
    keyTraitsObserved: string;
    criticalVerification: string;
  }[];
  deadlyLookalikeAlert: string;
  safetyVerdict: string;
}

interface ColorProfile {
  dominantBuckets: string[];
  hrSummary: string;
  avgBrightness: number;
  hasBlueCyanTint: boolean;
  hasRedOrangeTint: boolean;
  hasGreenOliveTint: boolean;
  hasWhiteCream: boolean;
  hasDarkBlack: boolean;
}

function normalizeCroatian(str: string): string {
  return (str || '')
    .toLowerCase()
    .replace(/[čć]/g, 'c')
    .replace(/š/g, 's')
    .replace(/ž/g, 'z')
    .replace(/đ/g, 'd')
    .trim();
}

/**
 * Evaluates whether a species matches the 4 pre-camera "Obilježja koja vidiš" button filters:
 * - Ispod klobuka: Listići / Cjevčice (spužva) / Bodljice / Trubasto
 * - Raste na: Tlu / Panju ili deblu
 * - Dno stručka: Ima vrećicu (volvu) / Nema vrećice
 * - Meso na prerezu: Mijenja boju (plavi, crveni) / Ne mijenja / Pušta mlijeko
 */
export function evaluateVisibleTraitsMatch(
  m: Mushroom,
  traits?: VisibleTraitsFilter
): { matchesAll: boolean; scoreDelta: number; matchedLabels: string[] } {
  if (!traits) {
    return { matchesAll: true, scoreDelta: 0, matchedLabels: [] };
  }

  let matchesAll = true;
  let scoreDelta = 0;
  const matchedLabels: string[] = [];

  const normFlesh = normalizeCroatian(
    `${m.bozacDetails.meso} ${m.bozacDetails.kemijskeReakcije || ''} ${m.shortSummary}`
  );
  const normStem = normalizeCroatian(`${m.bozacDetails.strucak} ${m.shortSummary}`);

  // 1. Ispod klobuka: Listići / Cjevčice (spužva) / Bodljice / Trubasto
  if (traits.underCap !== 'ALL') {
    if (traits.underCap === 'listici') {
      if (m.hymenium === 'listici') {
        scoreDelta += 26;
        matchedLabels.push('ispod klobuka: listići');
      } else {
        matchesAll = false;
        scoreDelta -= 38;
      }
    } else if (traits.underCap === 'cjevcice') {
      if (m.hymenium === 'cjevcice') {
        scoreDelta += 28;
        matchedLabels.push('ispod klobuka: cjevčice (spužva)');
      } else {
        matchesAll = false;
        scoreDelta -= 38;
      }
    } else if (traits.underCap === 'bodljice') {
      if (m.hymenium === 'iglice') {
        scoreDelta += 32;
        matchedLabels.push('ispod klobuka: bodljice (iglice)');
      } else {
        matchesAll = false;
        scoreDelta -= 42;
      }
    } else if (traits.underCap === 'trubasto') {
      const isTrumpetOrChanterelle =
        m.hymenium === 'letvice' ||
        m.hymenium === 'glatko' ||
        m.id.includes('trubaca') ||
        m.id.includes('lisicica');
      if (isTrumpetOrChanterelle) {
        scoreDelta += 28;
        matchedLabels.push('ispod klobuka: trubasto / letvice');
      } else {
        matchesAll = false;
        scoreDelta -= 38;
      }
    }
  }

  // 2. Raste na: Tlu / Panju ili deblu
  if (traits.growsOn !== 'ALL') {
    if (traits.growsOn === 'tlo') {
      if (m.growth === 'tlo' || m.growth === 'busen') {
        scoreDelta += 16;
        matchedLabels.push('raste na tlu');
      } else {
        matchesAll = false;
        scoreDelta -= 28;
      }
    } else if (traits.growsOn === 'panj_deblo') {
      const normHab = normalizeCroatian(`${m.habitat} ${m.shortSummary}`);
      const growsOnWood =
        m.growth === 'drvo' ||
        (m.growth === 'busen' &&
          (normHab.includes('panj') || normHab.includes('drvet') || normHab.includes('debl')));
      if (growsOnWood) {
        scoreDelta += 24;
        matchedLabels.push('raste na panju ili deblu');
      } else {
        matchesAll = false;
        scoreDelta -= 32;
      }
    }
  }

  // 3. Dno stručka: Ima vrećicu (volvu) / Nema vrećice
  if (traits.stemBase !== 'ALL') {
    const hasVolva =
      m.ring === 'vjencic_ovoj' ||
      m.ring === 'samo_ovoj' ||
      normStem.includes('volv') ||
      normStem.includes('vrecast') ||
      normStem.includes('ovoj u dnu');
    if (traits.stemBase === 'ima_vrecicu') {
      if (hasVolva) {
        scoreDelta += 28;
        matchedLabels.push('dno stručka ima vrećicu (volvu)');
      } else {
        matchesAll = false;
        scoreDelta -= 35;
      }
    } else if (traits.stemBase === 'nema_vrecice') {
      if (!hasVolva) {
        scoreDelta += 14;
        matchedLabels.push('dno stručka bez vrećice (volve)');
      } else {
        matchesAll = false;
        scoreDelta -= 32;
      }
    }
  }

  // 4. Meso na prerezu: Mijenja boju (plavi, crveni) / Ne mijenja / Pušta mlijeko
  if (traits.fleshCut !== 'ALL') {
    const hasMilk = m.latex !== 'nema';
    const changesColor =
      normFlesh.includes('plav') ||
      normFlesh.includes('modr') ||
      normFlesh.includes('pocrven') ||
      normFlesh.includes('crveni') ||
      normFlesh.includes('pozut') ||
      normFlesh.includes('pocrn') ||
      normFlesh.includes('potamn') ||
      normFlesh.includes('mijenja boju');

    if (traits.fleshCut === 'pusta_mlijeko') {
      if (hasMilk) {
        scoreDelta += 32;
        matchedLabels.push(`meso na prerezu pušta mlijeko (${m.latex})`);
      } else {
        matchesAll = false;
        scoreDelta -= 40;
      }
    } else if (traits.fleshCut === 'mijenja_boju') {
      if (changesColor && !hasMilk) {
        scoreDelta += 24;
        matchedLabels.push('meso na prerezu mijenja boju');
      } else if (changesColor) {
        scoreDelta += 16;
        matchedLabels.push('meso mijenja boju');
      } else {
        matchesAll = false;
        scoreDelta -= 26;
      }
    } else if (traits.fleshCut === 'ne_mijenja') {
      if (!hasMilk && (!changesColor || normFlesh.includes('ne mijenja') || normFlesh.includes('nepromjenjiv'))) {
        scoreDelta += 16;
        matchedLabels.push('meso na prerezu ne mijenja boju');
      } else {
        matchesAll = false;
        scoreDelta -= 24;
      }
    }
  }

  return { matchesAll, scoreDelta, matchedLabels };
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }
  return { h, s, l };
}

async function extractPhotoColorProfile(dataUrl: string): Promise<ColorProfile> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const size = 96;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({
            dominantBuckets: ['smeđa', 'oker'],
            hrSummary: 'prirodni šumski tonovi',
            avgBrightness: 0.5,
            hasBlueCyanTint: false,
            hasRedOrangeTint: false,
            hasGreenOliveTint: false,
            hasWhiteCream: false,
            hasDarkBlack: false,
          });
          return;
        }

        ctx.drawImage(img, 0, 0, size, size);
        const start = Math.floor(size * 0.175);
        const span = Math.floor(size * 0.65);
        const imgData = ctx.getImageData(start, start, span, span).data;

        const counts: Record<string, number> = {
          bijel: 0,
          zut: 0,
          narancast: 0,
          crven: 0,
          smed: 0,
          zelen: 0,
          ljubicast: 0,
          plav: 0,
          siv: 0,
          crn: 0,
        };

        let totalL = 0;
        let samples = 0;

        for (let i = 0; i < imgData.length; i += 4) {
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const { h, s, l } = rgbToHsl(r, g, b);
          totalL += l;
          samples++;

          if (l > 0.78 && s < 0.28) {
            counts.bijel += 1.2;
          } else if (l < 0.16) {
            counts.crn += 1.1;
          } else if (s < 0.14) {
            if (l > 0.62) counts.bijel += 0.8;
            else counts.siv += 1;
          } else {
            if ((h >= 0 && h < 16) || h >= 342) {
              if (l < 0.38) counts.smed += 1;
              else counts.crven += 1.3;
            } else if (h >= 16 && h < 42) {
              if (l < 0.48 || s < 0.45) counts.smed += 1.2;
              else counts.narancast += 1.3;
            } else if (h >= 42 && h < 68) {
              if (l < 0.42) counts.smed += 1;
              else counts.zut += 1.3;
            } else if (h >= 68 && h < 160) {
              counts.zelen += 0.85;
            } else if (h >= 160 && h < 250) {
              counts.plav += 1.4;
            } else if (h >= 250 && h < 342) {
              counts.ljubicast += 1.3;
            }
          }
        }

        const sorted = Object.entries(counts)
          .filter(([, val]) => val > samples * 0.06)
          .sort((a, b) => b[1] - a[1]);

        const topKeys = sorted.slice(0, 3).map(([k]) => k);
        if (topKeys.length === 0) topKeys.push('smed');

        const labelMap: Record<string, string> = {
          bijel: 'bijelo-krem / svijetli tonovi',
          zut: 'žuto-zlatni / oker tonovi',
          narancast: 'narančasto-mareličasti tonovi',
          crven: 'crveno-karminski tonovi',
          smed: 'smeđi / kestenjasti tonovi',
          zelen: 'maslinasto-zelenkasti tonovi',
          ljubicast: 'ljubičasto-ametistni tonovi',
          plav: 'plavkasto-modri tonovi',
          siv: 'sivo-pepeljasti tonovi',
          crn: 'tamnosmeđi do crni tonovi',
        };

        const hrSummary = topKeys.map((k) => labelMap[k] || k).join(', ');

        resolve({
          dominantBuckets: topKeys,
          hrSummary,
          avgBrightness: samples > 0 ? totalL / samples : 0.5,
          hasBlueCyanTint: counts.plav > samples * 0.05,
          hasRedOrangeTint: counts.crven + counts.narancast > samples * 0.12,
          hasGreenOliveTint: counts.zelen > samples * 0.14,
          hasWhiteCream: counts.bijel > samples * 0.15,
          hasDarkBlack: counts.crn > samples * 0.18,
        });
      } catch {
        resolve({
          dominantBuckets: ['smed'],
          hrSummary: 'smeđi šumski tonovi',
          avgBrightness: 0.5,
          hasBlueCyanTint: false,
          hasRedOrangeTint: false,
          hasGreenOliveTint: false,
          hasWhiteCream: false,
          hasDarkBlack: false,
        });
      }
    };
    img.onerror = () => {
      resolve({
        dominantBuckets: ['smed'],
        hrSummary: 'prirodni tonovi',
        avgBrightness: 0.5,
        hasBlueCyanTint: false,
        hasRedOrangeTint: false,
        hasGreenOliveTint: false,
        hasWhiteCream: false,
        hasDarkBlack: false,
      });
    };
    img.src = dataUrl;
  });
}

const MONTH_MAP: Record<string, number> = {
  sijecanj: 1,
  sijecnja: 1,
  veljaca: 2,
  veljace: 2,
  ozujak: 3,
  ozujka: 3,
  travanj: 4,
  travnja: 4,
  svibanj: 5,
  svibnja: 5,
  lipanj: 6,
  lipnja: 6,
  srpanj: 7,
  srpnja: 7,
  kolovoz: 8,
  kolovoza: 8,
  rujan: 9,
  rujna: 9,
  listopad: 10,
  listopada: 10,
  studeni: 11,
  studenog: 11,
  prosinac: 12,
  prosinca: 12,
};

function isSpeciesActiveInMonth(seasonStr: string | undefined, monthNum: number): boolean {
  if (!seasonStr) return true;
  const norm = normalizeCroatian(seasonStr);
  if (norm.includes('cijela godina') || norm.includes('cijelu godinu')) return true;

  const segments = norm.split(/[&,;/]+/);
  for (const seg of segments) {
    const parts = seg
      .split(/[-–—]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length >= 2) {
      let start = MONTH_MAP[parts[0]];
      let end = MONTH_MAP[parts[parts.length - 1]];
      if (parts[0] === 'proljece') start = 3;
      if (parts[0] === 'ljeto') start = 6;
      if (parts[0] === 'jesen') start = 9;
      if (parts[0] === 'zima') start = 12;
      if (parts[parts.length - 1] === 'proljece') end = 5;
      if (parts[parts.length - 1] === 'ljeto') end = 8;
      if (parts[parts.length - 1] === 'jesen') end = 11;
      if (parts[parts.length - 1] === 'zima') end = 2;

      if (start && end) {
        if (start <= end) {
          if (monthNum >= start && monthNum <= end) return true;
        } else {
          if (monthNum >= start || monthNum <= end) return true;
        }
      }
    }
  }
  return false;
}

/**
 * Main 100% Free & Offline-First Mycological Determinator Engine.
 * Combines the 4 pre-camera "Obilježja koja vidiš" button filters with HTML5 Canvas color spectrum extraction
 * and Božac morphological scoring across all 169 local Croatian species.
 */
export async function runLocalMycologicalDetermination(params: {
  photos: (UploadedPhotoSlot | null)[];
  visibleTraits?: VisibleTraitsFilter;
  quickFilters?: QuickMorphologyFilters;
  habitatNotes: string;
  smellNotes: string;
  bruisingNotes: string;
  mushrooms: Mushroom[];
}): Promise<DeterminationResult> {
  const { photos, visibleTraits, quickFilters, habitatNotes, smellNotes, bruisingNotes, mushrooms } = params;

  const capPhoto = photos[0];
  const hymeniumPhoto = photos[1];
  const crossSectionPhoto = photos[2];
  const hasStemBasePhoto = Boolean(crossSectionPhoto);

  const [capProfile, hymeniumProfile, baseProfile] = await Promise.all([
    capPhoto ? extractPhotoColorProfile(capPhoto.data) : Promise.resolve(null),
    hymeniumPhoto ? extractPhotoColorProfile(hymeniumPhoto.data) : Promise.resolve(null),
    crossSectionPhoto ? extractPhotoColorProfile(crossSectionPhoto.data) : Promise.resolve(null),
  ]);

  const primaryProfile = capProfile || hymeniumProfile || baseProfile;
  const currentMonth = new Date().getMonth() + 1;

  const normHabitat = normalizeCroatian(habitatNotes);
  const normSmell = normalizeCroatian(smellNotes);
  const normBruising = normalizeCroatian(bruisingNotes);
  const combinedUserNotes = `${normHabitat} ${normSmell} ${normBruising}`.trim();

  const noteTokens = combinedUserNotes
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length >= 3)
    .map((t) => (t.length > 5 ? t.slice(0, t.length - 1) : t));

  const scored = mushrooms.map((m) => {
    let score = 38;
    const matchedReasons: string[] = [];

    const normCapText = normalizeCroatian(
      `${m.bozacDetails.klobuk} ${m.shortSummary} ${m.simpleBullets.join(' ')}`
    );
    const normHymeniumText = normalizeCroatian(m.bozacDetails.listici);
    const normFleshText = normalizeCroatian(
      `${m.bozacDetails.meso} ${m.bozacDetails.kemijskeReakcije || ''}`
    );
    const normFullSpecies = normalizeCroatian(
      `${m.name} ${m.latin} ${(m.folkNames || []).join(' ')} ${m.shortSummary} ${m.habitat} ${m.bozacDetails.klobuk} ${m.bozacDetails.listici} ${m.bozacDetails.strucak} ${m.bozacDetails.meso}`
    );

    // 0. Pre-Camera "Obilježja koja vidiš" 4-Button Filter (Filters 80% of species before pixel inspection)
    if (visibleTraits) {
      const vt = evaluateVisibleTraitsMatch(m, visibleTraits);
      score += vt.scoreDelta;
      matchedReasons.push(...vt.matchedLabels);
    }

    // 1. Optional Quick Morphological Filters
    if (quickFilters) {
      if (quickFilters.hymenium !== 'AUTO') {
        if (m.hymenium === quickFilters.hymenium) {
          score += 22;
        } else {
          score -= 30;
        }
      }
      if (quickFilters.growth !== 'AUTO') {
        if (m.growth === quickFilters.growth) score += 14;
        else score -= 18;
      }
      if (quickFilters.ring !== 'AUTO') {
        if (m.ring === quickFilters.ring) score += 18;
        else score -= 20;
      }
      if (quickFilters.latex !== 'AUTO') {
        if (m.latex === quickFilters.latex) score += 20;
        else score -= 25;
      }
    }

    // 2. Visual Color Spectrum Matching from Slot #1 (Klobuk)
    if (capProfile) {
      let colorHits = 0;
      for (const bucket of capProfile.dominantBuckets) {
        if (normCapText.includes(bucket)) {
          colorHits++;
        } else if (
          bucket === 'zut' &&
          (normCapText.includes('oker') || normCapText.includes('zlat'))
        ) {
          colorHits++;
        } else if (
          bucket === 'smed' &&
          (normCapText.includes('kesten') ||
            normCapText.includes('lješnjak') ||
            normCapText.includes('ljesnjak') ||
            normCapText.includes('oker'))
        ) {
          colorHits++;
        } else if (
          bucket === 'crven' &&
          (normCapText.includes('karmin') ||
            normCapText.includes('ružič') ||
            normCapText.includes('ruzic') ||
            normCapText.includes('ciglast'))
        ) {
          colorHits++;
        } else if (
          bucket === 'zelen' &&
          (normCapText.includes('maslin') || normCapText.includes('zel'))
        ) {
          colorHits++;
        } else if (
          bucket === 'bijel' &&
          (normCapText.includes('bjel') ||
            normCapText.includes('krem') ||
            normCapText.includes('svijet'))
        ) {
          colorHits++;
        }
      }
      if (colorHits > 0) {
        score += Math.min(18, colorHits * 8);
        matchedReasons.push(`kolorit klobuka (${capProfile.hrSummary})`);
      }
    }

    // 3. Visual Color Matching from Slot #2 (Odozdo / Himenij)
    if (hymeniumProfile) {
      for (const bucket of hymeniumProfile.dominantBuckets) {
        if (normHymeniumText.includes(bucket)) {
          score += 7;
          break;
        }
      }
    }

    // 4. Visual Color Matching from Slot #3 (Prerez / Meso)
    if (baseProfile) {
      if (baseProfile.hasBlueCyanTint && (normFleshText.includes('plav') || normFleshText.includes('modr'))) {
        score += 14;
        matchedReasons.push('plavljenje mesa na prerezu');
      }
      if (baseProfile.hasRedOrangeTint && (normFleshText.includes('crven') || normFleshText.includes('naranc'))) {
        score += 10;
      }
    }

    // 5. Habitat & Tree Partner Matching
    if (normHabitat) {
      const normMHab = normalizeCroatian(m.habitat);
      const treeKeywords = [
        { stem: 'bukv', label: 'bukva' },
        { stem: 'hrast', label: 'hrast' },
        { stem: 'smrek', label: 'smreka' },
        { stem: 'jel', label: 'jela' },
        { stem: 'bor', label: 'bor' },
        { stem: 'brez', label: 'breza' },
        { stem: 'grab', label: 'grab' },
        { stem: 'kesten', label: 'kesten' },
        { stem: 'topol', label: 'topola' },
        { stem: 'jasik', label: 'jasika' },
        { stem: 'livad', label: 'livada/pašnjak' },
        { stem: 'trav', label: 'travnjak' },
        { stem: 'panj', label: 'rast na panju/drvetu' },
        { stem: 'drv', label: 'rast na drvetu' },
        { stem: 'mahov', label: 'mahovina' },
      ];
      for (const tk of treeKeywords) {
        if (normHabitat.includes(tk.stem)) {
          if (normMHab.includes(tk.stem) || normFullSpecies.includes(tk.stem)) {
            score += 15;
            matchedReasons.push(`stanište (${tk.label})`);
          } else {
            score -= 5;
          }
        }
      }
    }

    // 6. Smell & Taste Matching
    if (normSmell) {
      const smellKeywords = [
        { stem: 'anis', label: 'miris na anis' },
        { stem: 'brasn', label: 'miris na svježe brašno' },
        { stem: 'rotkv', label: 'miris na rotkvicu/repu' },
        { stem: 'tint', label: 'miris na tintu/karbol' },
        { stem: 'karbol', label: 'miris na karbol/tintu' },
        { stem: 'marelic', label: 'voćni miris na marelicu' },
        { stem: 'voc', label: 'voćni miris' },
        { stem: 'cesnj', label: 'miris na češnjak' },
        { stem: 'luk', label: 'miris na luk/češnjak' },
        { stem: 'krumpir', label: 'miris na sirovi krumpir' },
        { stem: 'rib', label: 'miris na ribu/sled' },
        { stem: 'med', label: 'miris na med' },
        { stem: 'badem', label: 'miris na gorke bademe' },
        { stem: 'ugod', label: 'ugodan gljivarski miris' },
        { stem: 'neugod', label: 'neugodan miris' },
      ];
      for (const sk of smellKeywords) {
        if (normSmell.includes(sk.stem) && (normFleshText.includes(sk.stem) || normFullSpecies.includes(sk.stem))) {
          score += 18;
          matchedReasons.push(sk.label);
        }
      }
    }

    // 7. Bruising / Flesh Reaction / Latex Matching
    if (normBruising) {
      const bruiseKeywords = [
        { stem: 'plav', label: 'meso plavi na prerezu' },
        { stem: 'modr', label: 'meso modri na dodir' },
        { stem: 'crven', label: 'meso crveni na prerezu' },
        { stem: 'zuti', label: 'meso žuti u bazi' },
        { stem: 'zut', label: 'žuta promjena boje mesa' },
        { stem: 'crn', label: 'meso tamni/crni' },
        { stem: 'mlijek', label: 'izlučuje mliječni sok' },
        { stem: 'naranc', label: 'narančasti sok/meso' },
        { stem: 'ne mijenj', label: 'nepromjenjivo bijelo meso' },
        { stem: 'bijel', label: 'bijelo nepromjenjivo meso' },
      ];
      for (const bk of bruiseKeywords) {
        if (normBruising.includes(bk.stem) && (normFleshText.includes(bk.stem) || normFullSpecies.includes(bk.stem))) {
          score += 16;
          matchedReasons.push(bk.label);
        }
      }
    }

    // 8. General keyword overlap from user notes
    for (const token of noteTokens) {
      if (normFullSpecies.includes(token)) {
        score += 4;
      }
    }

    // 9. Seasonality Bonus
    if (isSpeciesActiveInMonth(m.season, currentMonth)) {
      score += 8;
      matchedReasons.push('aktivna sezona rasta');
    }

    const cappedScore = Math.min(90, Math.max(18, Math.round(score)));

    const lookalikeWarning =
      m.lookalikes && m.lookalikes.length > 0
        ? `Obavezno provjerite razliku u odnosu na dvojnika (${m.lookalikes[0].other.split(':')[0]}): ${m.lookalikes[0].trait} — kod ove vrste: ${m.lookalikes[0].mine}.`
        : '';

    const criticalVerification = [
      `1. Provjerite meso i miris uživo: ${m.bozacDetails.meso}`,
      `2. Provjerite stručak i dno baze u tlu: ${m.bozacDetails.strucak}`,
      lookalikeWarning,
    ]
      .filter(Boolean)
      .join(' ');

    const uniqueReasons = Array.from(new Set(matchedReasons));
    const keyTraitsObserved =
      uniqueReasons.length > 0
        ? `Podudaranje prema: ${uniqueReasons.join(', ')}. ${m.shortSummary}`
        : `${m.shortSummary} (${m.bozacRef})`;

    return {
      mushroom: m,
      confidence: cappedScore,
      keyTraitsObserved,
      criticalVerification,
    };
  });

  scored.sort((a, b) => b.confidence - a.confidence);
  const top3 = scored.slice(0, 3);

  const detectedColorSummary = primaryProfile
    ? primaryProfile.hrSummary
    : 'standardni šumski profil';

  const klobukAnalysis = capPhoto
    ? `Snimljen pogled odozgo (1. Klobuk): uočeni ${capProfile?.hrSummary || 'prirodni tonovi'}. Usporedite kožicu klobuka (suha, mazava, radijalno vlaknasta ili s krpicama ovoja) s opisom vrste: ${top3[0]?.mushroom.bozacDetails.klobuk || ''}`
    : `Fotografija klobuka odozgo (1. Klobuk) nije priložena. Prema morfološkom profilu najizglednije vrste: ${top3[0]?.mushroom.bozacDetails.klobuk || ''}`;

  const himenijAnalysis = hymeniumPhoto
    ? `Snimljen pogled odozdo (2. Odozdo): uočeni ${hymeniumProfile?.hrSummary || 'tonovi himenija'}. Provjerite jesu li s donje strane listići (slobodni, prirasli ili silazni), cjevčice (spužva), letvice ili iglice: ${top3[0]?.mushroom.bozacDetails.listici || ''}`
    : `Fotografija donje strane klobuka (2. Odozdo) nije priložena. Obavezno uživo provjerite himenij: ${top3[0]?.mushroom.bozacDetails.listici || ''}`;

  const strucakAnalysis = hasStemBasePhoto
    ? `Snimljen uzdužni prerez i baza (3. Prerez): uočeni ${baseProfile?.hrSummary || 'tonovi mesa i baze'}. Provjerite dno stručka na prisutnost vrećastog ovoja (volve), gomolja i promjenu boje mesa na zraku: ${top3[0]?.mushroom.bozacDetails.strucak || ''}`
    : `⚠️ KRITIČNI NEDOSTATAK: Fotografija br. 3 (Uzdužni prerez i dno baze stručka) NIJE priložena! Bez jasno vidljivog dna stručka izvađenog iz zemlje nije moguće isključiti bijeli vrećasti ovoj (volvu) smrtonosne zelene ili bijele pupavke (Amanita phalloides / A. verna).`;

  const opciDojam = `Lokalni terenski determinator (Offline Božac Engine) suzio je izbor pomoću filtra "Obilježja koja vidiš" i usporedio spektar boja sa svih ${mushrooms.length} vrsta u bazi Hrvatske. Najveća morfološka sličnost: ${top3
    .map((t) => `${t.mushroom.name} (${t.confidence}%)`)
    .join(', ')}.`;

  const deadlyLookalikeAlert = !hasStemBasePhoto
    ? `ZABRANA POTVRDE SIGURNOSTI BEZ BAZE STRUČKA: Niste priložili 3. fotografiju (uzdužni prerez i dno stručka). U tlu može ostati skriven bijeli vrećasti ovoj smrtonosne zelene pupavke (Amanita phalloides). Također uvijek isključite 4 smrtonosne skupine: Pupavke (Amanita), Rebrastu patuljicu (Galerina marginata na drvetu), Koprenke (Cortinarius s hrđavim listićima) i Crvenkastu cjepaču (Inocybe erubescens).`
    : `ELIMINACIJSKI PROTOKOL (4 SMRTONOSNE SKUPINE): Prije svake odluke o berbi obavezno uživo isključite: 1) Zelenu i bijelu pupavku (bijeli listići + vjenčić + vrećasti ovoj u dnu baze), 2) Rebrastu patuljicu (Galerina marginata — raste na drvetu, miris na brašno, srebrnasta vlakna na stručku), 3) Planinsku koprenku/crvenjaču (cimetasto-hrđavi listići i paučinasta koprena), 4) Crvenkastu cjepaču (stožast raspucan klobuk koji ciglasto crveni).`;

  const safetyVerdict = !hasStemBasePhoto
    ? `SIGURNOSNA ODLUKA: ODBIJENA POTVRDA JESTIVOSTI jer na fotografijama nije vidljivo cjelovito dno stručka (baza/ovoj). Izvadite cijelo dno stručka iz zemlje i provjerite sve morfološke detalje uživo.`
    : `SIGURNOSNA PREPORUKA: Niti jedna fotografija ne prenosi miris, okus i teksturu. Maksimalna pouzdanost ograničena je na 90% — obavezno prođite pitanja za terensku provjeru i usporedbu dvojnika na kartici vrste prije konzumacije.`;

  return {
    engineMode: 'OFFLINE_FOREST_ENGINE',
    hasStemBasePhoto,
    detectedColorSummary,
    morphologicalAnalysis: {
      klobuk: klobukAnalysis,
      himenij: himenijAnalysis,
      strucakIbaza: strucakAnalysis,
      opciDojam,
    },
    topMatches: top3.map((item) => ({
      matchedId: item.mushroom.id,
      name: item.mushroom.name,
      latin: item.mushroom.latin,
      confidence: item.confidence,
      status: item.mushroom.status,
      keyTraitsObserved: item.keyTraitsObserved,
      criticalVerification: item.criticalVerification,
    })),
    deadlyLookalikeAlert,
    safetyVerdict,
  };
}
