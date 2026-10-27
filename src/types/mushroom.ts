export type EdibilityStatus = 'SAFE' | 'WARN' | 'DANGER';

export type HymeniumType = 'listici' | 'cjevcice' | 'letvice' | 'iglice' | 'glatko';
export type GrowthHabit = 'tlo' | 'busen' | 'drvo';
export type LatexType = 'nema' | 'narancasto' | 'bijelo' | 'vodenasto';
export type RingType = 'vjencic_ovoj' | 'samo_vjencic' | 'samo_ovoj' | 'bez';

export type RegionId =
  | 'medvednica_zagorje'
  | 'gorski_kotar'
  | 'istra_kvarner'
  | 'dalmacija'
  | 'slavonija'
  | 'karlovac';

export type TreeFilterId = 'ALL' | 'bukva' | 'hrast' | 'smreka' | 'jela' | 'bor' | 'breza';

export interface CulinaryRecipe {
  title: string;
  prepTime: string;
  method: string;
  ingredients: string;
  steps: string;
}

export interface LookalikeComparison {
  targetId: string;
  targetName?: string;
  trait: string;
  mine: string;
  other: string;
}

export type Lookalike = LookalikeComparison;

export interface BozacDetails {
  klobuk: string;
  listici: string; // ili cjevčice / iglice / himenij
  strucak: string;
  meso: string;
  spore?: string;
  kemijskeReakcije?: string;
}

export interface Mushroom {
  id: string;
  name: string;
  latin: string;
  synonyms?: string;
  folkNames?: string[];
  croatianNames?: string[];
  wikiQuery: string;
  bozacRef: string; // npr. "Svezak 1, br. 1, str. 50"
  status: EdibilityStatus;
  statusLabel: string;
  medicinal?: boolean;
  hasLethalLookalike?: boolean;
  regions: ('medvednica_zagorje' | 'gorski_kotar' | 'istra_kvarner' | 'dalmacija' | 'slavonija' | 'karlovac')[];
  hymenium: HymeniumType;
  growth: GrowthHabit;
  latex: LatexType;
  ring: RingType;
  shortSummary: string;
  simpleBullets: string[];
  bozacDetails: BozacDetails;
  lookalikes: LookalikeComparison[];
  habitat: string;
  kitchen: string;
  season?: string;
  recipes?: CulinaryRecipe[];
  toxicologyNote?: string;
  customAdded?: boolean;
  userPhoto?: string;
}

export type RawMushroom = Omit<Mushroom, 'regions'> & {
  regions?: ('medvednica_zagorje' | 'gorski_kotar' | 'istra_kvarner' | 'dalmacija' | 'slavonija' | 'karlovac')[];
};

export interface SavedFinding {
  id: string;
  mushroomId?: string;
  mushroomName: string;
  latinName?: string;
  date: string;
  locationName: string;
  latitude?: number;
  longitude?: number;
  accuracy?: number;
  altitude?: number | null;
  weightGrams?: number;
  notes: string;
  photoData?: string;
  photos: string[];
}
