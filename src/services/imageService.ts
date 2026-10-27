import { Mushroom } from '../types/mushroom';
import { idbGetWithMigration, idbSet } from './storageService';

const PHOTO_CACHE_KEY = 'gljive_hr_pro_photo_cache_v3';
const GALLERY_CACHE_KEY = 'gljive_hr_pro_gallery_cache_v1';

interface PhotoCacheMap {
  [mushroomId: string]: string;
}

interface GalleryCacheMap {
  [wikiQuery: string]: string[];
}

let memoryCache: PhotoCacheMap = {};
let galleryMemoryCache: GalleryCacheMap = {};
let cacheHydrated = false;
let hydrationPromise: Promise<void> | null = null;

const inFlightRequests = new Map<string, Promise<string | null>>();
const inFlightGalleryRequests = new Map<string, Promise<string[]>>();

// Sinkrona inicijalizacija iz localStorage-a ako postoji prije nego što se IndexedDB hidrira
try {
  const rawPhoto = typeof localStorage !== 'undefined' ? localStorage.getItem(PHOTO_CACHE_KEY) : null;
  if (rawPhoto) memoryCache = JSON.parse(rawPhoto);
  const rawGal = typeof localStorage !== 'undefined' ? localStorage.getItem(GALLERY_CACHE_KEY) : null;
  if (rawGal) galleryMemoryCache = JSON.parse(rawGal);
} catch {
  // Ignore
}

export function ensureImageCachesHydrated(): Promise<void> {
  if (cacheHydrated) return Promise.resolve();
  if (hydrationPromise) return hydrationPromise;

  hydrationPromise = (async () => {
    try {
      const [idbPhotos, idbGalleries] = await Promise.all([
        idbGetWithMigration<PhotoCacheMap>(PHOTO_CACHE_KEY, {}),
        idbGetWithMigration<GalleryCacheMap>(GALLERY_CACHE_KEY, {}),
      ]);
      memoryCache = { ...idbPhotos, ...memoryCache };
      galleryMemoryCache = { ...idbGalleries, ...galleryMemoryCache };
      cacheHydrated = true;
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('gljive-photo-cached'));
      }
    } catch {
      cacheHydrated = true;
    }
  })();

  return hydrationPromise;
}

// Pokreni hidraciju odmah pri učitavanju modula
ensureImageCachesHydrated();

// Concurrency limiter to avoid HTTP 429 rate limits from Wikipedia / iNaturalist
const MAX_CONCURRENT_FETCHES = 5;
let activeFetches = 0;
const fetchQueue: Array<() => void> = [];

function acquireSlot(): Promise<void> {
  if (activeFetches < MAX_CONCURRENT_FETCHES) {
    activeFetches++;
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    fetchQueue.push(() => {
      activeFetches++;
      resolve();
    });
  });
}

function releaseSlot() {
  activeFetches = Math.max(0, activeFetches - 1);
  const next = fetchQueue.shift();
  if (next) next();
}

function getCache(): PhotoCacheMap {
  return memoryCache;
}

function getGalleryCache(): GalleryCacheMap {
  return galleryMemoryCache;
}

function saveGalleryToCache(wikiQuery: string, urls: string[]) {
  if (!urls || urls.length === 0) return;
  galleryMemoryCache[wikiQuery] = urls;
  void idbSet(GALLERY_CACHE_KEY, { ...galleryMemoryCache });
}

export function savePhotoToCache(id: string, url: string) {
  memoryCache[id] = url;
  void idbSet(PHOTO_CACHE_KEY, { ...memoryCache });
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('gljive-photo-cached'));
  }
}

export function removePhotoFromCache(id: string) {
  if (memoryCache[id]) {
    delete memoryCache[id];
    void idbSet(PHOTO_CACHE_KEY, { ...memoryCache });
  }
}

export function getCachedPhoto(mushroomId: string): string | null {
  return getCache()[mushroomId] || null;
}

export function getCachedCount(): number {
  return Object.keys(getCache()).length;
}

function extractCleanBinomial(latinOrQuery: string): string {
  const cleaned = latinOrQuery
    .replace(/_/g, ' ')
    .replace(/\(.*?\)/g, ' ')
    .trim();
  const parts = cleaned.split(/\s+/);
  if (parts.length >= 4 && (parts[2] === 'var.' || parts[2] === 'f.' || parts[2] === 'subsp.')) {
    return `${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]}`;
  }
  if (parts.length >= 2) {
    return `${parts[0]} ${parts[1]}`;
  }
  return parts[0] || '';
}

function extractBaseSpeciesBinomial(latinOrQuery: string): string {
  const cleaned = latinOrQuery
    .replace(/_/g, ' ')
    .replace(/\(.*?\)/g, ' ')
    .trim();
  const parts = cleaned.split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0]} ${parts[1]}`;
  }
  return parts[0] || '';
}

async function fetchFromWikipediaSummary(queryTitle: string): Promise<string | null> {
  if (!queryTitle) return null;
  try {
    const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      queryTitle.replace(/\s+/g, '_')
    )}`;
    const res = await fetch(wikiUrl);
    if (!res.ok) return null;
    const data = await res.json();
    const imgUrl: string | undefined = data?.thumbnail?.source || data?.originalimage?.source;
    if (imgUrl && !imgUrl.toLowerCase().endsWith('.svg')) {
      return imgUrl;
    }
  } catch {
    // Ignore error and continue to next source
  }
  return null;
}

async function fetchFromINaturalistObservations(taxonName: string): Promise<string | null> {
  if (!taxonName) return null;
  try {
    const cleanTaxon = taxonName.replace(/_/g, ' ').trim();
    const inatObsUrl = `https://api.inaturalist.org/v1/observations?taxon_name=${encodeURIComponent(
      cleanTaxon
    )}&photos=true&quality_grade=research&per_page=1`;
    const res = await fetch(inatObsUrl);
    if (!res.ok) return null;
    const data = await res.json();
    const photoUrl: string | undefined = data?.results?.[0]?.photos?.[0]?.url;
    if (photoUrl) {
      return photoUrl.replace('square', 'medium');
    }
  } catch {
    // Ignore error and continue to next source
  }
  return null;
}

async function fetchFromINaturalistTaxa(taxonName: string): Promise<string | null> {
  if (!taxonName) return null;
  try {
    const cleanTaxon = taxonName.replace(/_/g, ' ').trim();
    const inatTaxaUrl = `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(
      cleanTaxon
    )}&per_page=1`;
    const res = await fetch(inatTaxaUrl);
    if (!res.ok) return null;
    const data = await res.json();
    const photoUrl: string | undefined = data?.results?.[0]?.default_photo?.medium_url;
    if (photoUrl) {
      return photoUrl;
    }
  } catch {
    // Ignore error and continue to next source
  }
  return null;
}

async function fetchFromWikimediaCommons(taxonName: string): Promise<string | null> {
  if (!taxonName) return null;
  try {
    const cleanTaxon = taxonName.replace(/_/g, ' ').trim();
    const commonsUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
      `filetype:bitmap ${cleanTaxon}`
    )}&gsrlimit=1&prop=imageinfo&iiprop=url&iiurlwidth=600&format=json&origin=*`;
    const res = await fetch(commonsUrl);
    if (!res.ok) return null;
    const data = await res.json();
    const pages = data?.query?.pages;
    if (pages) {
      const firstPage = Object.values(pages)[0] as any;
      const thumbUrl: string | undefined =
        firstPage?.imageinfo?.[0]?.thumburl || firstPage?.imageinfo?.[0]?.url;
      if (thumbUrl && !thumbUrl.toLowerCase().endsWith('.svg')) {
        return thumbUrl;
      }
    }
  } catch {
    // Ignore error
  }
  return null;
}

async function resolveMushroomPhotoUrl(
  mushroom: Mushroom,
  skipUrl?: string
): Promise<string | null> {
  await ensureImageCachesHydrated();
  await acquireSlot();
  try {
    const candidates = Array.from(
      new Set(
        [
          mushroom.wikiQuery,
          extractCleanBinomial(mushroom.latin),
          extractBaseSpeciesBinomial(mushroom.latin),
          mushroom.synonyms ? extractCleanBinomial(mushroom.synonyms) : '',
        ].filter(Boolean)
      )
    );

    // 1. Try Wikipedia REST API (/api/rest_v1/page/summary/{wikiQuery})
    for (const candidate of candidates) {
      const url = await fetchFromWikipediaSummary(candidate);
      if (url && url !== skipUrl) {
        savePhotoToCache(mushroom.id, url);
        return url;
      }
    }

    // 2. Try iNaturalist Observations API (/v1/observations?taxon_name={wikiQuery}&photos=true&quality_grade=research&per_page=1)
    for (const candidate of candidates) {
      const url = await fetchFromINaturalistObservations(candidate);
      if (url && url !== skipUrl) {
        savePhotoToCache(mushroom.id, url);
        return url;
      }
    }

    // 3. Try iNaturalist Taxa API
    for (const candidate of candidates) {
      const url = await fetchFromINaturalistTaxa(candidate);
      if (url && url !== skipUrl) {
        savePhotoToCache(mushroom.id, url);
        return url;
      }
    }

    // 4. Try Wikimedia Commons search API
    for (const candidate of candidates) {
      const url = await fetchFromWikimediaCommons(candidate);
      if (url && url !== skipUrl) {
        savePhotoToCache(mushroom.id, url);
        return url;
      }
    }

    return null;
  } finally {
    releaseSlot();
  }
}

export async function fetchMushroomPhoto(
  mushroom: Mushroom,
  forceRefresh = false,
  skipUrl?: string
): Promise<string | null> {
  if (mushroom.userPhoto) return mushroom.userPhoto;

  await ensureImageCachesHydrated();

  if (!forceRefresh) {
    const cached = getCachedPhoto(mushroom.id);
    if (cached && cached !== skipUrl) return cached;
  }

  const requestKey = `${mushroom.id}:${skipUrl || ''}`;
  const existingRequest = inFlightRequests.get(requestKey);
  if (existingRequest) {
    return existingRequest;
  }

  const promise = resolveMushroomPhotoUrl(mushroom, skipUrl).finally(() => {
    inFlightRequests.delete(requestKey);
  });

  inFlightRequests.set(requestKey, promise);
  return promise;
}

/**
 * Dohvaća galeriju od 4 terenske fotografije iste vrste s iNaturalist API-ja,
 * a kao rezervu koristi Wikipedia media-list API. Rezultate sprema u IndexedDB i memorijski cache.
 */
export async function fetchMushroomGallery(wikiQuery: string): Promise<string[]> {
  const cleanKey = (wikiQuery || '').trim();
  if (!cleanKey) return [];

  await ensureImageCachesHydrated();

  const galleryCache = getGalleryCache();
  if (galleryCache[cleanKey] && galleryCache[cleanKey].length >= 4) {
    return galleryCache[cleanKey].slice(0, 4);
  }

  const existingInFlight = inFlightGalleryRequests.get(cleanKey);
  if (existingInFlight) {
    return existingInFlight;
  }

  const promise = (async (): Promise<string[]> => {
    const collectedUrls: string[] = [];
    const addUniqueUrl = (rawUrl?: string) => {
      if (!rawUrl || typeof rawUrl !== 'string') return;
      let normalized = rawUrl.trim();
      if (normalized.startsWith('//')) {
        normalized = `https:${normalized}`;
      }
      const lower = normalized.toLowerCase();
      if (
        lower.endsWith('.svg') ||
        lower.endsWith('.ogg') ||
        lower.endsWith('.ogv') ||
        lower.endsWith('.webm') ||
        lower.includes('commons-logo') ||
        lower.includes('red_pencil') ||
        lower.includes('question_book')
      ) {
        return;
      }
      if (!collectedUrls.includes(normalized)) {
        collectedUrls.push(normalized);
      }
    };

    const taxonCandidates = Array.from(
      new Set(
        [
          cleanKey.replace(/_/g, ' ').trim(),
          extractBaseSpeciesBinomial(cleanKey),
        ].filter(Boolean)
      )
    );

    // 1. Primarni izvor: iNaturalist Observations API (quality_grade=research&per_page=6)
    for (const taxonName of taxonCandidates) {
      if (collectedUrls.length >= 4) break;
      try {
        const inatUrl = `https://api.inaturalist.org/v1/observations?taxon_name=${encodeURIComponent(
          taxonName
        )}&photos=true&quality_grade=research&per_page=6`;
        const res = await fetch(inatUrl);
        if (res.ok) {
          const data = await res.json();
          const results = Array.isArray(data?.results) ? data.results : [];
          for (const obs of results) {
            const photos = Array.isArray(obs?.photos) ? obs.photos : [];
            for (const photo of photos) {
              if (photo?.url) {
                addUniqueUrl(String(photo.url).replace('square', 'medium'));
              }
              if (collectedUrls.length >= 4) break;
            }
            if (collectedUrls.length >= 4) break;
          }
        }
      } catch {
        // Nastavi na rezervni izvor
      }
    }

    // 2. Rezervni izvor: Wikipedia REST media-list API
    if (collectedUrls.length < 4) {
      const wikiCandidates = Array.from(
        new Set([
          cleanKey.replace(/\s+/g, '_'),
          extractBaseSpeciesBinomial(cleanKey).replace(/\s+/g, '_'),
        ])
      );

      for (const wikiTitle of wikiCandidates) {
        if (collectedUrls.length >= 4) break;
        try {
          const mediaListUrl = `https://en.wikipedia.org/api/rest_v1/page/media-list/${encodeURIComponent(
            wikiTitle
          )}`;
          const res = await fetch(mediaListUrl);
          if (res.ok) {
            const data = await res.json();
            const items = Array.isArray(data?.items) ? data.items : [];
            for (const item of items) {
              if (item?.type === 'image') {
                const src =
                  item?.srcset?.[1]?.src ||
                  item?.srcset?.[0]?.src ||
                  item?.original?.source ||
                  item?.thumbnail?.source;
                addUniqueUrl(src);
              }
              if (collectedUrls.length >= 4) break;
            }
          }
        } catch {
          // Ignoriraj grešku
        }
      }
    }

    const finalUrls = collectedUrls.slice(0, 4);
    if (finalUrls.length > 0) {
      saveGalleryToCache(cleanKey, finalUrls);
    }
    return finalUrls;
  })().finally(() => {
    inFlightGalleryRequests.delete(cleanKey);
  });

  inFlightGalleryRequests.set(cleanKey, promise);
  return promise;
}

export async function preloadAllPhotosForOffline(
  mushrooms: Mushroom[],
  onProgress?: (loaded: number, total: number) => void
): Promise<number> {
  await ensureImageCachesHydrated();
  let loaded = 0;
  const total = mushrooms.length;

  for (let i = 0; i < total; i++) {
    const m = mushrooms[i];
    const url = await fetchMushroomPhoto(m);
    if (url) {
      try {
        const img = new Image();
        img.src = url;
      } catch {
        // Ignore preload error
      }
    }
    loaded++;
    if (onProgress) onProgress(loaded, total);
  }

  return getCachedCount();
}
