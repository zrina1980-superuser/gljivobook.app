import React, { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  Calendar,
  Plus,
  Trash2,
  Navigation,
  Download,
  Upload,
  Camera,
  Crosshair,
  Copy,
  Check,
  Compass,
  ExternalLink,
  AlertCircle,
  Mic,
  MicOff,
  Map,
  LocateFixed,
  Layers,
  Car,
  Scale,
  AlertTriangle,
  RotateCcw,
  Share2,
  X,
  ShieldCheck,
  Image as ImageIcon,
} from 'lucide-react';
import { Mushroom, SavedFinding } from '../types/mushroom';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { getCachedPhoto } from '../services/imageService';
import { idbGetWithMigration, idbSet } from '../services/storageService';
import { ForestPermitSection } from './ForestPermitSection';

interface FieldJournalViewProps {
  findings: SavedFinding[];
  mushrooms: Mushroom[];
  onAddFinding: (finding: SavedFinding) => void;
  onUpdateFinding?: (finding: SavedFinding) => void;
  onDeleteFinding: (id: string) => void;
  onImportData: (findings: SavedFinding[], customMushrooms: Mushroom[]) => void;
  customMushrooms: Mushroom[];
  onSelectMushroom: (mushroom: Mushroom) => void;
  theme?: 'dark' | 'light';
}

interface GeoPositionState {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number | null;
}

interface ParkedCarPin {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number | null;
  savedAt: string;
}

type MapBaseLayer = 'satellite' | 'topo';

const PARKED_CAR_STORAGE_KEY = 'gljivobook_parked_car_v1';
const EXTRA_BASKET_GRAMS_KEY = 'gljivobook_daily_basket_extra_v1';
const DAILY_LIMIT_GRAMS = 3000; // 3.00 kg daily limit of free Hrvatske šume permit

const ESRI_SATELLITE_URL =
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const ESRI_ATTRIBUTION =
  'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, USDA, USGS, Aerogrid, IGN';

const OPENTOPOMAP_URL = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
const OPENTOPOMAP_ATTRIBUTION =
  'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)';

interface ForestMassifEntry {
  massif: string;
  settlement: string;
  lat: number;
  lon: number;
  defaultAltitude: number;
}

const CROATIAN_FOREST_LOCATIONS: ForestMassifEntry[] = [
  { massif: 'Medvednica', settlement: 'Poljanica Bistranska', lat: 45.926, lon: 15.906, defaultAltitude: 460 },
  { massif: 'Medvednica', settlement: 'Gornja Bistra', lat: 45.918, lon: 15.918, defaultAltitude: 485 },
  { massif: 'Medvednica', settlement: 'Šestine', lat: 45.862, lon: 15.951, defaultAltitude: 390 },
  { massif: 'Medvednica', settlement: 'Gračani', lat: 45.868, lon: 15.978, defaultAltitude: 440 },
  { massif: 'Medvednica', settlement: 'Markuševec', lat: 45.875, lon: 16.012, defaultAltitude: 410 },
  { massif: 'Medvednica', settlement: 'Hunjka', lat: 45.915, lon: 15.982, defaultAltitude: 875 },
  { massif: 'Medvednica', settlement: 'Stubičke Toplice', lat: 45.962, lon: 15.932, defaultAltitude: 360 },
  { massif: 'Samoborsko gorje', settlement: 'Rude', lat: 45.772, lon: 15.678, defaultAltitude: 450 },
  { massif: 'Žumberak', settlement: 'Stojdraga', lat: 45.822, lon: 15.568, defaultAltitude: 520 },
  { massif: 'Vukomeričke gorice', settlement: 'Kravarsko', lat: 45.605, lon: 16.048, defaultAltitude: 215 },
  { massif: 'Ivanščica', settlement: 'Prigorec', lat: 46.195, lon: 16.124, defaultAltitude: 540 },
  { massif: 'Gorski kotar', settlement: 'Fužine', lat: 45.305, lon: 14.714, defaultAltitude: 730 },
  { massif: 'Gorski kotar', settlement: 'Delnice', lat: 45.398, lon: 14.802, defaultAltitude: 698 },
  { massif: 'Gorski kotar', settlement: 'Lokve', lat: 45.358, lon: 14.752, defaultAltitude: 740 },
  { massif: 'Gorski kotar', settlement: 'Crni Lug', lat: 45.415, lon: 14.702, defaultAltitude: 726 },
  { massif: 'Učka', settlement: 'Poklon', lat: 45.308, lon: 14.216, defaultAltitude: 922 },
  { massif: 'Papuk', settlement: 'Jankovac', lat: 45.519, lon: 17.686, defaultAltitude: 475 },
  { massif: 'Velebit', settlement: 'Krasno', lat: 44.82, lon: 15.052, defaultAltitude: 810 },
  { massif: 'Bilogora', settlement: 'Veliko Trojstvo', lat: 45.935, lon: 16.932, defaultAltitude: 245 },
  { massif: 'Pokuplje', settlement: 'Karlovac', lat: 45.492, lon: 15.555, defaultAltitude: 145 },
  { massif: 'Dalmatinska zagora', settlement: 'Sinj', lat: 43.703, lon: 16.639, defaultAltitude: 326 },
];

const CROATIAN_MONTHS_GENITIVE = [
  'siječnja',
  'veljače',
  'ožujka',
  'travnja',
  'svibnja',
  'lipnja',
  'srpnja',
  'kolovoza',
  'rujna',
  'listopada',
  'studenoga',
  'prosinca',
];

function findNearestForestEntry(lat?: number, lon?: number): ForestMassifEntry {
  if (typeof lat !== 'number' || typeof lon !== 'number' || Number.isNaN(lat) || Number.isNaN(lon)) {
    return CROATIAN_FOREST_LOCATIONS[0];
  }
  let best = CROATIAN_FOREST_LOCATIONS[0];
  let bestDistSq = Infinity;
  for (const entry of CROATIAN_FOREST_LOCATIONS) {
    const dLat = lat - entry.lat;
    const dLon = lon - entry.lon;
    const distSq = dLat * dLat + dLon * dLon;
    if (distSq < bestDistSq) {
      bestDistSq = distSq;
      best = entry;
    }
  }
  return best;
}

function inferMassifName(lat?: number, lon?: number, rawLocation?: string): string {
  const loc = (rawLocation || '').toLowerCase();
  if (loc.includes('medvednic') || loc.includes('sljeme') || loc.includes('bistr') || loc.includes('šestin') || loc.includes('gračan') || loc.includes('hunjk')) {
    return 'Medvednica';
  }
  if (loc.includes('samobor') || loc.includes('japetić') || loc.includes('plešivic') || loc.includes('rude')) {
    return 'Samoborsko gorje';
  }
  if (loc.includes('žumber')) return 'Žumberak';
  if (loc.includes('vukomer') || loc.includes('kravarsk')) return 'Vukomeričke gorice';
  if (loc.includes('ivanščic') || loc.includes('ivančic')) return 'Ivanščica';
  if (loc.includes('kalnik')) return 'Kalnik';
  if (loc.includes('gorski') || loc.includes('fužin') || loc.includes('delnic') || loc.includes('lokv') || loc.includes('risnjak')) {
    return 'Gorski kotar';
  }
  if (loc.includes('učk') || loc.includes('ćićarij')) return 'Učka';
  if (loc.includes('velebit') || loc.includes('lik')) return 'Velebit';
  if (loc.includes('papuk') || loc.includes('psunj') || loc.includes('krndij')) return 'Papuk';
  if (loc.includes('bilogor')) return 'Bilogora';
  return findNearestForestEntry(lat, lon).massif;
}

function inferFieldLocationDisplay(finding: SavedFinding): string {
  const raw = (finding.locationName || '').trim();
  const isGeneric =
    !raw ||
    raw === 'Šumsko stanište' ||
    raw.startsWith('GPS Točka') ||
    raw.startsWith('GPX Točka');

  const nearest = findNearestForestEntry(finding.latitude, finding.longitude);
  const massif = inferMassifName(finding.latitude, finding.longitude, raw);

  if (!isGeneric) {
    // Normalize existing separators ("Medvednica - Poljanica Bistranska" -> "Medvednica • Poljanica Bistranska")
    if (raw.includes('•')) {
      return raw
        .split('•')
        .map((s) => s.trim())
        .filter(Boolean)
        .join(' • ');
    }
    if (raw.includes('–') || raw.includes(' - ')) {
      return raw
        .split(/–|\s-\s/)
        .map((s) => s.trim())
        .filter(Boolean)
        .join(' • ');
    }
    if (raw.toLowerCase().includes(massif.toLowerCase())) {
      return `${massif} • ${nearest.settlement}`;
    }
    return `${massif} • ${raw}`;
  }

  return `${nearest.massif} • ${nearest.settlement}`;
}

function inferFieldAltitudeMeters(finding: SavedFinding, currentPos?: GeoPositionState | null): number {
  if (typeof finding.altitude === 'number' && !Number.isNaN(finding.altitude) && finding.altitude > 0) {
    return Math.round(finding.altitude);
  }
  if (
    currentPos &&
    typeof currentPos.altitude === 'number' &&
    !Number.isNaN(currentPos.altitude) &&
    currentPos.altitude > 0
  ) {
    return Math.round(currentPos.altitude);
  }
  const nearest = findNearestForestEntry(finding.latitude, finding.longitude);
  return Math.round(nearest.defaultAltitude);
}

/**
 * Formats date and time into Croatian field log style:
 * e.g. "19. listopada 2026. u 11:30"
 */
function formatCroatianFieldDateTime(dateStr: string): string {
  const cleaned = (dateStr || '').trim();
  const match = cleaned.match(
    /^(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{4})\.?(?:[,\s]+(?:u\s+)?(\d{1,2}):(\d{2}))?/i
  );
  if (match) {
    const day = parseInt(match[1], 10);
    const monthIndex = parseInt(match[2], 10) - 1;
    const year = match[3];
    const monthGenitive = CROATIAN_MONTHS_GENITIVE[monthIndex] || `${match[2]}.`;
    const hh = match[4] ? match[4].padStart(2, '0') : '11';
    const mm = match[5] ? match[5] : '30';
    return `${day}. ${monthGenitive} ${year}. u ${hh}:${mm}`;
  }
  return cleaned;
}

function normalizeToGrams(value?: number): number {
  if (typeof value !== 'number' || Number.isNaN(value) || value <= 0) return 0;
  // If user typed kilograms directly (e.g. 2.5), convert to grams (2500)
  if (value <= 50) {
    return Math.round(value * 1000);
  }
  return Math.round(value);
}

function formatWeightKg(gramsOrKg?: number): string {
  const grams = normalizeToGrams(gramsOrKg);
  if (grams <= 500) return '';
  const kg = grams / 1000;
  const formattedKg = Number.isInteger(kg * 10) ? kg.toFixed(1) : kg.toFixed(2);
  return `Ulov: ${formattedKg} kg`;
}

/**
 * Share Card Weight Rule:
 * NEVER display weight in grams or small weights (e.g. 0.15 kg).
 * Display weight EXCLUSIVELY if explicitly entered harvest weight is > 0.5 kg (> 500 g),
 * formatted as "Ulov: 2.5 kg".
 */
function formatShareCardHarvestWeight(gramsOrKg?: number): string | null {
  const grams = normalizeToGrams(gramsOrKg);
  if (grams <= 500) {
    return null;
  }
  const kg = grams / 1000;
  const formattedKg = Number.isInteger(kg * 10) ? kg.toFixed(1) : kg.toFixed(2);
  return `Ulov: ${formattedKg} kg`;
}

function calculateDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3;
  const p1 = (lat1 * Math.PI) / 180;
  const p2 = (lat2 * Math.PI) / 180;
  const dp = ((lat2 - lat1) * Math.PI) / 180;
  const dl = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dp / 2) * Math.sin(dp / 2) +
    Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) * Math.sin(dl / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

function calculateCompassBearing(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): { degrees: number; cardinal: string } {
  const p1 = (lat1 * Math.PI) / 180;
  const p2 = (lat2 * Math.PI) / 180;
  const dl = ((lon2 - lon1) * Math.PI) / 180;

  const y = Math.sin(dl) * Math.cos(p2);
  const x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl);
  const brng = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  const degrees = Math.round(brng);

  const dirs = ['S', 'SI', 'I', 'JI', 'J', 'JZ', 'Z', 'SZ'];
  const cardinal = dirs[Math.round(degrees / 45) % 8];
  return { degrees, cardinal };
}

function formatDistance(meters: number): string {
  if (meters < 1000) return `${meters} m`;
  return `${(meters / 1000).toFixed(2)} km`;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Resolve primary photo of a finding (supports `photoData` and `photos[0]`)
 */
function getFindingPhoto(finding: SavedFinding): string | undefined {
  if (finding.photoData && finding.photoData.trim().length > 0) {
    return finding.photoData;
  }
  if (Array.isArray(finding.photos) && finding.photos.length > 0 && finding.photos[0]) {
    return finding.photos[0];
  }
  return undefined;
}

/**
 * Custom SVG Mushroom Pin Icon for Leaflet
 */
function createMushroomMarkerIcon(isDanger = false): L.DivIcon {
  const bg = isDanger ? '#dc2626' : '#059669';
  const border = isDanger ? '#fca5a5' : '#fbbf24';
  const html = `
    <div style="
      width: 36px;
      height: 36px;
      border-radius: 50% 50% 50% 4px;
      transform: rotate(-45deg);
      background: ${bg};
      border: 2.5px solid ${border};
      box-shadow: 0 6px 16px rgba(0,0,0,0.65);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <span style="transform: rotate(45deg); font-size: 16px; line-height: 1;">🍄</span>
    </div>
  `;
  return L.divIcon({
    className: 'gljivobook-custom-pin',
    html,
    iconSize: [36, 36],
    iconAnchor: [18, 34],
    popupAnchor: [0, -32],
  });
}

/**
 * Custom SVG Parked Car Pin Icon for Leaflet ("🚗 Gdje mi je auto?")
 */
function createParkedCarIcon(): L.DivIcon {
  const html = `
    <div style="
      width: 38px;
      height: 38px;
      border-radius: 50% 50% 50% 4px;
      transform: rotate(-45deg);
      background: #d97706;
      border: 2.5px solid #fef08a;
      box-shadow: 0 6px 18px rgba(0,0,0,0.75);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <span style="transform: rotate(45deg); font-size: 17px; line-height: 1;">🚗</span>
    </div>
  `;
  return L.divIcon({
    className: 'gljivobook-parked-car-pin',
    html,
    iconSize: [38, 38],
    iconAnchor: [19, 36],
    popupAnchor: [0, -34],
  });
}

/**
 * Custom SVG User GPS Position Icon for Leaflet
 */
function createUserGpsIcon(): L.DivIcon {
  const html = `
    <div style="
      position: relative;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        position: absolute;
        inset: 0;
        border-radius: 9999px;
        background: rgba(56, 189, 248, 0.35);
        border: 1.5px solid rgba(56, 189, 248, 0.85);
      "></div>
      <div style="
        width: 12px;
        height: 12px;
        border-radius: 9999px;
        background: #0ea5e9;
        border: 2.5px solid #ffffff;
        box-shadow: 0 0 10px rgba(14, 165, 233, 0.9);
      "></div>
    </div>
  `;
  return L.divIcon({
    className: 'gljivobook-user-gps-pin',
    html,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
}

/**
 * GPX 1.1 XML Serializer for exporting GPS-pinned mushroom findings
 * Compatible with Garmin, OsmAnd, Gaia GPS, Locus Map, and Google Earth
 */
export function serializeFindingsToGPX(findings: SavedFinding[]): string {
  const pinned = findings.filter(
    (f) => typeof f.latitude === 'number' && typeof f.longitude === 'number'
  );
  const nowIso = new Date().toISOString();

  const waypointsXml = pinned
    .map((f) => {
      const lat = f.latitude!.toFixed(6);
      const lon = f.longitude!.toFixed(6);
      const title = f.latinName ? `${f.mushroomName} (${f.latinName})` : f.mushroomName;
      const elevationTag =
        typeof f.altitude === 'number' && !Number.isNaN(f.altitude)
          ? `\n    <ele>${f.altitude}</ele>`
          : '';
      const descParts = [
        `Lokacija: ${f.locationName || 'Šumsko stanište'}`,
        `Datum nalaza: ${f.date}`,
        f.weightGrams ? `Količina: ${f.weightGrams} g` : null,
        f.accuracy !== undefined ? `GPS preciznost: ±${f.accuracy} m` : null,
        f.notes ? `Bilješke: ${f.notes}` : null,
      ]
        .filter(Boolean)
        .join(' | ');

      return `  <wpt lat="${lat}" lon="${lon}">${elevationTag}
    <time>${nowIso}</time>
    <name>${escapeXml(title)}</name>
    <cmt>${escapeXml(f.locationName || 'Gljivobook nalazište')}</cmt>
    <desc>${escapeXml(descParts)}</desc>
    <sym>Mushroom</sym>
    <type>Gljivobook Nalazište</type>
  </wpt>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Gljivobook PRO v3.2 by Zrina" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
  <metadata>
    <name>Gljivobook PRO - Terenski GPS Dnevnik Nalazišta</name>
    <desc>Izvoz GPS koordinata gljivarskih staništa iz aplikacije Gljivobook by Zrina (${pinned.length} točaka)</desc>
    <author>
      <name>Gljivobook by Zrina</name>
    </author>
    <time>${nowIso}</time>
  </metadata>
${waypointsXml}
</gpx>`;
}

export const FieldJournalView: React.FC<FieldJournalViewProps> = ({
  findings,
  mushrooms,
  onAddFinding,
  onUpdateFinding,
  onDeleteFinding,
  onImportData,
  customMushrooms,
  onSelectMushroom,
  theme = 'dark',
}) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedMushroomId, setSelectedMushroomId] = useState('');
  const [customName, setCustomName] = useState('');
  const [locationName, setLocationName] = useState('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [accuracy, setAccuracy] = useState<number | undefined>(undefined);
  const [altitude, setAltitude] = useState<number | null | undefined>(undefined);
  const [weightGramsInput, setWeightGramsInput] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [gpsStatus, setGpsStatus] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Quick 1-Tap GPS Pin state (now also supports optional photo capture!)
  const [quickPinSpeciesId, setQuickPinSpeciesId] = useState('');
  const [quickPinLabel, setQuickPinLabel] = useState('');
  const [quickPinWeightGrams, setQuickPinWeightGrams] = useState<string>('');
  const [quickPinPhotoData, setQuickPinPhotoData] = useState<string | null>(null);
  const [isQuickPinning, setIsQuickPinning] = useState(false);
  const [quickPinFeedback, setQuickPinFeedback] = useState<string | null>(null);

  // Parked Car GPS Locator ("🚗 Gdje mi je auto?")
  const [parkedCar, setParkedCar] = useState<ParkedCarPin | null>(null);
  const [isSavingCarGps, setIsSavingCarGps] = useState(false);

  // Daily Harvest Weight Tracker (3.00 kg HŠ permit limit)
  const [extraTodayGrams, setExtraTodayGrams] = useState<number>(0);

  // Live reference position for distance to saved pins & parked car
  const [currentPos, setCurrentPos] = useState<GeoPositionState | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [pinningFindingId, setPinningFindingId] = useState<string | null>(null);

  // Outdoor Field Log Share Modal State (1080x1350px / 4:5 HTML5 Canvas)
  const [shareModalFinding, setShareModalFinding] = useState<SavedFinding | null>(null);
  const [shareLocationLabel, setShareLocationLabel] = useState<string>('Medvednica • Poljanica Bistranska');
  const [shareAltitudeMeters, setShareAltitudeMeters] = useState<string>('460');
  const [shareDateTimeText, setShareDateTimeText] = useState<string>('');
  const [shareWeightGrams, setShareWeightGrams] = useState<string>('');
  const [shareLoadedImage, setShareLoadedImage] = useState<HTMLImageElement | null>(null);
  const [officialLogoImg, setOfficialLogoImg] = useState<HTMLImageElement | null>(null);
  const [shareRadarCanvas, setShareRadarCanvas] = useState<HTMLCanvasElement | null>(null);
  const [shareRadarTick, setShareRadarTick] = useState<number>(0);
  const shareCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setOfficialLogoImg(img);
    img.src = '/zrina-neon-192.png?v=34';
  }, []);

  // Interactive Forest Satellite & Topo Map state (Leaflet)
  // In Paperlike light theme, default/adapt to standard daytime terrain layer ('topo')
  const [mapBaseLayer, setMapBaseLayer] = useState<MapBaseLayer>(() =>
    theme === 'light' ? 'topo' : 'satellite'
  );
  const [isCenteringMapGps, setIsCenteringMapGps] = useState(false);

  useEffect(() => {
    setMapBaseLayer(theme === 'light' ? 'topo' : 'satellite');
  }, [theme]);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const pinsLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const userLocationLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const parkedCarMarkerRef = useRef<L.Marker | null>(null);
  const markersByFindingIdRef = useRef<Record<string, L.Marker>>({});

  const quickLabelInputRef = useRef<HTMLInputElement | null>(null);
  const notesTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const todayDatePrefix = useMemo(
    () =>
      new Date().toLocaleDateString('hr-HR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    []
  );

  // Hydrate parked car GPS pin and today's extra basket weight from IndexedDB
  useEffect(() => {
    let active = true;
    Promise.all([
      idbGetWithMigration<ParkedCarPin | null>(PARKED_CAR_STORAGE_KEY, null),
      idbGetWithMigration<{ date: string; grams: number } | null>(EXTRA_BASKET_GRAMS_KEY, null),
    ]).then(([savedCar, savedExtra]) => {
      if (!active) return;
      if (savedCar && typeof savedCar.latitude === 'number') {
        setParkedCar(savedCar);
      }
      if (savedExtra && savedExtra.date === todayDatePrefix) {
        setExtraTodayGrams(savedExtra.grams || 0);
      }
    });
    return () => {
      active = false;
    };
  }, [todayDatePrefix]);

  const updateExtraTodayGrams = (nextGrams: number) => {
    const clamped = Math.max(0, nextGrams);
    setExtraTodayGrams(clamped);
    void idbSet(EXTRA_BASKET_GRAMS_KEY, { date: todayDatePrefix, grams: clamped });
  };

  // Sum today's harvested weight from findings logged today + quick basket counter
  const todayFindingsGrams = useMemo(() => {
    return findings.reduce((acc, f) => {
      if (f.date.startsWith(todayDatePrefix) && typeof f.weightGrams === 'number') {
        return acc + f.weightGrams;
      }
      return acc;
    }, 0);
  }, [findings, todayDatePrefix]);

  const totalTodayGrams = todayFindingsGrams + extraTodayGrams;
  const totalTodayKg = (totalTodayGrams / 1000).toFixed(2);
  const limitPct = Math.min(100, Math.round((totalTodayGrams / DAILY_LIMIT_GRAMS) * 100));

  // Glasovni unos za kratku oznaku staništa (Brzi GPS Pin)
  const quickVoice = useSpeechRecognition({
    lang: 'hr-HR',
    onTranscript: (spoken) => {
      setQuickPinLabel((prev) => (prev.trim() ? `${prev.trim()} ${spoken}` : spoken));
    },
  });

  // Glasovni terenski notes za detaljne bilješke o staništu i nalazu
  const notesVoice = useSpeechRecognition({
    lang: 'hr-HR',
    onTranscript: (spoken) => {
      setNotes((prev) => (prev.trim() ? `${prev.trim()}. ${spoken}` : spoken));
    },
  });

  // 1. Initialize Leaflet Map instance once
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [45.8986, 15.9482],
      zoom: 12,
      zoomControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const initialTileLayer = L.tileLayer(ESRI_SATELLITE_URL, {
      attribution: ESRI_ATTRIBUTION,
      maxZoom: 19,
    }).addTo(map);

    const pinsGroup = L.layerGroup().addTo(map);
    const userGpsGroup = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;
    tileLayerRef.current = initialTileLayer;
    pinsLayerGroupRef.current = pinsGroup;
    userLocationLayerGroupRef.current = userGpsGroup;

    setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      tileLayerRef.current = null;
      pinsLayerGroupRef.current = null;
      userLocationLayerGroupRef.current = null;
    };
  }, []);

  // 2. Switch between ESRI World Imagery Satellite & OpenTopoMap Topographic layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    if (mapBaseLayer === 'satellite') {
      tileLayerRef.current = L.tileLayer(ESRI_SATELLITE_URL, {
        attribution: ESRI_ATTRIBUTION,
        maxZoom: 19,
      }).addTo(map);
    } else {
      tileLayerRef.current = L.tileLayer(OPENTOPOMAP_URL, {
        attribution: OPENTOPOMAP_ATTRIBUTION,
        maxZoom: 17,
        subdomains: ['a', 'b', 'c'],
      }).addTo(map);
    }
  }, [mapBaseLayer]);

  // 3. Project all GPS pins from IndexedDB (`findings`) + Parked Car (`🚗`) onto the map
  useEffect(() => {
    const map = mapInstanceRef.current;
    const pinsGroup = pinsLayerGroupRef.current;
    if (!map || !pinsGroup) return;

    pinsGroup.clearLayers();
    markersByFindingIdRef.current = {};
    parkedCarMarkerRef.current = null;

    const pinnedFindings = findings.filter(
      (f) => typeof f.latitude === 'number' && typeof f.longitude === 'number'
    );

    const boundsPoints: L.LatLngExpression[] = [];

    // Render Parked Car Marker ("🚗 Gdje mi je auto?") if saved
    if (parkedCar) {
      boundsPoints.push([parkedCar.latitude, parkedCar.longitude]);
      const carMarker = L.marker([parkedCar.latitude, parkedCar.longitude], {
        icon: createParkedCarIcon(),
        zIndexOffset: 900,
      });

      const carPopupHtml = `
        <div style="min-width:205px;">
          <div style="font-size:14px;font-weight:700;color:#fbbf24;margin-bottom:4px;">
            🚗 Parkirano vozilo (Povratak)
          </div>
          <div style="font-size:11px;color:#cbd5e1;font-family:monospace;margin-bottom:4px;">
            GPS: ${parkedCar.latitude.toFixed(5)}, ${parkedCar.longitude.toFixed(5)}
          </div>
          <div style="font-size:11px;color:#9bb0a2;margin-bottom:8px;">
            Spremljeno: ${escapeHtml(parkedCar.savedAt)}${
        parkedCar.altitude ? ` • Visina: ${parkedCar.altitude} m n/v` : ''
      }
          </div>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${parkedCar.latitude},${
        parkedCar.longitude
      }&travelmode=walking" target="_blank" rel="noopener noreferrer" style="display:block;padding:6px 10px;border-radius:8px;background:#d97706;color:#ffffff;font-size:11px;font-weight:700;text-align:center;text-decoration:none;">
            🧭 Navigiraj pješice do auta
          </a>
        </div>
      `;

      carMarker.bindPopup(carPopupHtml, {
        className: 'gljivobook-leaflet-popup',
        maxWidth: 260,
      });
      carMarker.addTo(pinsGroup);
      parkedCarMarkerRef.current = carMarker;
    }

    pinnedFindings.forEach((f) => {
      const lat = f.latitude!;
      const lon = f.longitude!;
      boundsPoints.push([lat, lon]);

      const linkedMushroom = f.mushroomId
        ? mushrooms.find((m) => m.id === f.mushroomId)
        : mushrooms.find(
            (m) => m.name.toLowerCase() === f.mushroomName.toLowerCase()
          );

      const primaryPhoto = getFindingPhoto(f);
      const thumbUrl =
        primaryPhoto ||
        linkedMushroom?.userPhoto ||
        (linkedMushroom ? getCachedPhoto(linkedMushroom.id) : null);

      const isDanger = linkedMushroom?.status === 'DANGER';
      const marker = L.marker([lat, lon], {
        icon: createMushroomMarkerIcon(isDanger),
      });

      const thumbHtml = thumbUrl
        ? `<img src="${escapeHtml(thumbUrl)}" alt="${escapeHtml(
            f.mushroomName
          )}" style="width:100%;height:118px;object-fit:cover;border-radius:10px;margin-bottom:8px;border:1px solid #284030;" />`
        : `<div style="width:100%;height:76px;border-radius:10px;margin-bottom:8px;background:#16261c;border:1px solid #284030;display:flex;align-items:center;justify-content:center;font-size:28px;">🍄</div>`;

      const altitudeBadge =
        typeof f.altitude === 'number' && !Number.isNaN(f.altitude)
          ? `<span style="display:inline-block;padding:2px 7px;border-radius:6px;background:#17281e;border:1px solid #2c4636;color:#34d399;font-family:monospace;font-size:11px;font-weight:700;">⛰️ ${f.altitude} m n/v</span>`
          : `<span style="display:inline-block;padding:2px 7px;border-radius:6px;background:#17281e;color:#9bb0a2;font-family:monospace;font-size:11px;">GPS: ${lat.toFixed(4)}, ${lon.toFixed(4)}</span>`;

      const formattedWeight = formatWeightKg(f.weightGrams);
      const weightBadge = formattedWeight
        ? `<span style="display:inline-block;padding:2px 7px;border-radius:6px;background:#271e12;border:1px solid #854d0e;color:#fde047;font-family:monospace;font-size:11px;font-weight:700;">⚖️ ${escapeHtml(formattedWeight)}</span>`
        : '';

      const popupContainer = document.createElement('div');
      popupContainer.style.minWidth = '215px';
      popupContainer.style.maxWidth = '245px';
      popupContainer.innerHTML = `
        <div>
          ${thumbHtml}
          <div style="font-size:14px;font-weight:700;color:#f2f6f3;margin-bottom:2px;">
            ${escapeHtml(f.mushroomName)}
          </div>
          ${
            f.latinName
              ? `<div style="font-size:11px;font-style:italic;color:#889e90;margin-bottom:6px;">${escapeHtml(
                  f.latinName
                )}</div>`
              : ''
          }
          <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:6px;">
            ${altitudeBadge}
            ${weightBadge}
            <span style="font-size:11px;color:#cbd5e1;font-family:monospace;">📅 ${escapeHtml(
              f.date
            )}</span>
          </div>
          <div style="font-size:11px;color:#a7f3d0;margin-bottom:6px;">
            📍 ${escapeHtml(f.locationName || 'Šumsko stanište')}
          </div>
          ${
            f.notes
              ? `<div style="font-size:11px;color:#d6e3da;background:#0b120e;padding:6px 8px;border-radius:8px;border:1px solid #1f3126;margin-bottom:8px;">${escapeHtml(
                  f.notes
                )}</div>`
              : ''
          }
          <div style="display:flex;gap:6px;margin-top:6px;">
            ${
              linkedMushroom
                ? `<button type="button" data-open-species="true" style="flex:1;padding:6px 8px;border-radius:8px;background:#059669;color:#ffffff;font-size:11px;font-weight:600;border:none;cursor:pointer;">Atlas vrste</button>`
                : ''
            }
            <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="_blank" rel="noopener noreferrer" style="flex:1;padding:6px 8px;border-radius:8px;background:#1a2b20;border:1px solid #2b4535;color:#fbbf24;font-size:11px;font-weight:600;text-align:center;text-decoration:none;">Navigiraj</a>
          </div>
        </div>
      `;

      if (linkedMushroom) {
        const btn = popupContainer.querySelector('[data-open-species="true"]');
        btn?.addEventListener('click', () => {
          onSelectMushroom(linkedMushroom);
        });
      }

      marker.bindPopup(popupContainer, {
        className: 'gljivobook-leaflet-popup',
        maxWidth: 265,
      });

      marker.addTo(pinsGroup);
      markersByFindingIdRef.current[f.id] = marker;
    });

    if (boundsPoints.length === 1 && !currentPos) {
      map.setView(boundsPoints[0], 14);
    } else if (boundsPoints.length > 1 && !currentPos) {
      const bounds = L.latLngBounds(boundsPoints);
      map.fitBounds(bounds, { padding: [42, 42], maxZoom: 15 });
    }
  }, [findings, mushrooms, onSelectMushroom, parkedCar, currentPos]);

  // 4. Render User's current GPS position + accuracy circle on the map
  useEffect(() => {
    const userGroup = userLocationLayerGroupRef.current;
    if (!userGroup) return;

    userGroup.clearLayers();
    if (!currentPos) return;

    const { latitude: lat, longitude: lon, accuracy: acc, altitude: alt } = currentPos;

    const radiusMeters = acc && acc > 5 ? acc : 18;
    L.circle([lat, lon], {
      radius: radiusMeters,
      color: '#38bdf8',
      weight: 1.5,
      fillColor: '#0ea5e9',
      fillOpacity: 0.16,
    }).addTo(userGroup);

    const userMarker = L.marker([lat, lon], {
      icon: createUserGpsIcon(),
      zIndexOffset: 1000,
    });

    userMarker.bindPopup(
      `<div style="min-width:180px;">
        <div style="font-size:13px;font-weight:700;color:#38bdf8;margin-bottom:4px;">🎯 Vaša trenutna GPS lokacija</div>
        <div style="font-size:11px;font-family:monospace;color:#e2ece5;">${lat.toFixed(6)}, ${lon.toFixed(6)}</div>
        <div style="font-size:11px;color:#9bb0a2;margin-top:4px;">
          Preciznost: ±${acc ?? 10} m${alt !== null && alt !== undefined ? ` • Visina: ${alt} m n/v` : ''}
        </div>
      </div>`,
      { className: 'gljivobook-leaflet-popup' }
    );

    userMarker.addTo(userGroup);
  }, [currentPos]);

  // 5. Load finding photo for 1080x1350 (4:5) Outdoor Field Log Canvas generator
  useEffect(() => {
    if (!shareModalFinding) {
      setShareLoadedImage(null);
      return;
    }

    const linkedMushroom = shareModalFinding.mushroomId
      ? mushrooms.find((m) => m.id === shareModalFinding.mushroomId)
      : mushrooms.find(
          (m) => m.name.toLowerCase() === shareModalFinding.mushroomName.toLowerCase()
        );

    const candidateSrc =
      getFindingPhoto(shareModalFinding) ||
      linkedMushroom?.userPhoto ||
      (linkedMushroom ? getCachedPhoto(linkedMushroom.id) : null);

    if (!candidateSrc) {
      setShareLoadedImage(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setShareLoadedImage(img);
    };
    img.onerror = () => {
      setShareLoadedImage(null);
    };
    img.src = candidateSrc;
  }, [shareModalFinding, mushrooms]);

  // 5b. Load Zoom-11 Satellite Mini-Radar static map tiles (broad forest massif, no micro-location!)
  // Also auto-enriches altitude (Open-Meteo DEM) & settlement name (Nominatim HR) when GPS coords exist
  useEffect(() => {
    if (!shareModalFinding) {
      setShareRadarCanvas(null);
      return;
    }

    let cancelled = false;
    const nearest = findNearestForestEntry(
      shareModalFinding.latitude,
      shareModalFinding.longitude
    );
    const lat =
      typeof shareModalFinding.latitude === 'number' && !Number.isNaN(shareModalFinding.latitude)
        ? shareModalFinding.latitude
        : nearest.lat;
    const lon =
      typeof shareModalFinding.longitude === 'number' && !Number.isNaN(shareModalFinding.longitude)
        ? shareModalFinding.longitude
        : nearest.lon;

    // 1) Build Zoom-11 Satellite Mini-Radar stitched around (lat, lon)
    const zoom = 11;
    const n = Math.pow(2, zoom);
    const xFloat = ((lon + 180) / 360) * n;
    const latRad = (lat * Math.PI) / 180;
    const yFloat =
      ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n;

    const centerTileX = Math.floor(xFloat);
    const centerTileY = Math.floor(yFloat);
    const offsetX = Math.round((xFloat - centerTileX) * 256);
    const offsetY = Math.round((yFloat - centerTileY) * 256);

    const offscreen = document.createElement('canvas');
    offscreen.width = 256;
    offscreen.height = 256;
    const octx = offscreen.getContext('2d');

    if (octx) {
      const tileOffsets = [-1, 0, 1];
      let loadedCount = 0;

      tileOffsets.forEach((dx) => {
        tileOffsets.forEach((dy) => {
          const tx = centerTileX + dx;
          const ty = centerTileY + dy;
          const tileImg = new Image();
          tileImg.crossOrigin = 'anonymous';
          tileImg.onload = () => {
            if (cancelled) return;
            const drawX = 128 - offsetX + dx * 256;
            const drawY = 128 - offsetY + dy * 256;
            octx.drawImage(tileImg, drawX, drawY, 256, 256);
            loadedCount++;
            if (loadedCount >= 1) {
              try {
                // Verify canvas is not tainted before committing
                offscreen.toDataURL('image/png');
                setShareRadarCanvas(offscreen);
                setShareRadarTick((t) => t + 1);
              } catch {
                // Ignore if tainted
              }
            }
          };
          tileImg.onerror = () => {
            loadedCount++;
          };
          tileImg.src = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${zoom}/${ty}/${tx}`;
        });
      });
    }

    // 2) If finding has GPS coordinates, fetch exact GPS/DEM altitude & settlement if needed
    if (
      typeof shareModalFinding.latitude === 'number' &&
      typeof shareModalFinding.longitude === 'number'
    ) {
      if (shareModalFinding.altitude === undefined || shareModalFinding.altitude === null) {
        fetch(
          `https://api.open-meteo.com/v1/elevation?latitude=${shareModalFinding.latitude}&longitude=${shareModalFinding.longitude}`
        )
          .then((r) => (r.ok ? r.json() : null))
          .then((data) => {
            if (cancelled) return;
            const ele = data?.elevation?.[0];
            if (typeof ele === 'number' && !Number.isNaN(ele)) {
              const roundedEle = Math.round(ele);
              setShareAltitudeMeters(String(roundedEle));
              if (onUpdateFinding) {
                onUpdateFinding({ ...shareModalFinding, altitude: roundedEle });
              }
            }
          })
          .catch(() => {});
      }

      const rawLoc = (shareModalFinding.locationName || '').trim();
      const isAutoLoc =
        !rawLoc ||
        rawLoc === 'Šumsko stanište' ||
        rawLoc.startsWith('GPS Točka') ||
        rawLoc.startsWith('GPX Točka');

      if (isAutoLoc) {
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${shareModalFinding.latitude}&lon=${shareModalFinding.longitude}&zoom=14&accept-language=hr`
        )
          .then((r) => (r.ok ? r.json() : null))
          .then((data) => {
            if (cancelled || !data?.address) return;
            const addr = data.address;
            const settlement =
              addr.village ||
              addr.suburb ||
              addr.town ||
              addr.hamlet ||
              addr.municipality ||
              addr.city_district ||
              nearest.settlement;
            const massif = inferMassifName(
              shareModalFinding.latitude,
              shareModalFinding.longitude,
              `${addr.mountain || ''} ${addr.peak || ''} ${addr.region || ''} ${settlement}`
            );
            if (settlement) {
              setShareLocationLabel(`${massif} • ${settlement}`);
            }
          })
          .catch(() => {});
      }
    }

    return () => {
      cancelled = true;
    };
  }, [shareModalFinding, onUpdateFinding]);

  // 6. Draw 1080x1350px (4:5) "Outdoor Field Log" Share Card on HTML5 Canvas
  useEffect(() => {
    if (!shareModalFinding) return;
    const canvas = shareCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 1080;
    const H = 1350;
    ctx.clearRect(0, 0, W, H);

    // 1. Deep Dark Forest Background (#0b120e)
    ctx.fillStyle = '#0b120e';
    ctx.fillRect(0, 0, W, H);

    // Subtle atmospheric radial lighting
    const bgGlow = ctx.createRadialGradient(W / 2, 460, 60, W / 2, 540, 740);
    bgGlow.addColorStop(0, 'rgba(16, 185, 129, 0.10)');
    bgGlow.addColorStop(0.65, 'rgba(11, 18, 14, 0.03)');
    bgGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = bgGlow;
    ctx.fillRect(0, 0, W, H);

    // Elegant Minimalist Outer Border
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.28)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(28, 28, W - 56, H - 56, 32);
    ctx.stroke();

    // Hairline inner accent border
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(38, 38, W - 76, H - 76, 24);
    ctx.stroke();

    // 2. PHOTO STAGE (Uncropped Full Mushroom Photo + Blurred Backdrop)
    // Positioned in the upper 64% of the 4:5 portrait frame so vertical mushrooms retain 100% height from cap to stem base
    const photoX = 58;
    const photoY = 58;
    const photoW = W - 116; // 964px
    const photoH = 852; // Tall 964x852 viewport

    // Drop shadow behind photo stage
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
    ctx.shadowBlur = 32;
    ctx.shadowOffsetY = 12;
    ctx.fillStyle = '#070c09';
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoW, photoH, 24);
    ctx.fill();
    ctx.restore();

    // Clip to photo stage
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoW, photoH, 24);
    ctx.clip();

    if (shareLoadedImage && shareLoadedImage.width > 0 && shareLoadedImage.height > 0) {
      const imgW = shareLoadedImage.width;
      const imgH = shareLoadedImage.height;

      // Layer A: Blurred & darkened backdrop duplicate filling the entire stage (cover)
      ctx.save();
      const coverScale = Math.max((photoW + 80) / imgW, (photoH + 80) / imgH);
      const bgW = imgW * coverScale;
      const bgH = imgH * coverScale;
      const bgX = photoX + (photoW - bgW) / 2;
      const bgY = photoY + (photoH - bgH) / 2;
      ctx.filter = 'blur(30px) brightness(0.42) saturate(1.18)';
      ctx.drawImage(shareLoadedImage, bgX, bgY, bgW, bgH);
      ctx.filter = 'none';

      // Dark forest vignette over the blurred backdrop
      ctx.fillStyle = 'rgba(8, 14, 10, 0.38)';
      ctx.fillRect(photoX, photoY, photoW, photoH);
      ctx.restore();

      // Layer B: Full uncropped photograph (contain) so vertical mushrooms show cap-to-stem in full
      const containScale = Math.min(photoW / imgW, photoH / imgH);
      const fgW = imgW * containScale;
      const fgH = imgH * containScale;
      const fgX = photoX + (photoW - fgW) / 2;
      const fgY = photoY + (photoH - fgH) / 2;

      // Subtle elevation shadow behind the contained foreground photo
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.72)';
      ctx.shadowBlur = 28;
      ctx.shadowOffsetY = 6;
      ctx.drawImage(shareLoadedImage, fgX, fgY, fgW, fgH);
      ctx.restore();

      // Subtle hairline border around the contained image if letterboxed/pillarboxed
      if (Math.abs(fgW - photoW) > 6 || Math.abs(fgH - photoH) > 6) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(fgX, fgY, fgW, fgH);
      }
    } else {
      // Botanical dark-forest placeholder when finding has no photo
      const pGrad = ctx.createLinearGradient(photoX, photoY, photoX + photoW, photoY + photoH);
      pGrad.addColorStop(0, '#0c1711');
      pGrad.addColorStop(0.5, '#13241b');
      pGrad.addColorStop(1, '#09120d');
      ctx.fillStyle = pGrad;
      ctx.fillRect(photoX, photoY, photoW, photoH);

      const cx = W / 2;
      const cy = photoY + photoH / 2 - 10;

      ctx.beginPath();
      ctx.arc(cx, cy, 130, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.25)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Stylized Boletus Silhouette
      ctx.beginPath();
      ctx.moveTo(cx - 95, cy + 6);
      ctx.bezierCurveTo(cx - 95, cy - 88, cx + 95, cy - 88, cx + 95, cy + 6);
      ctx.closePath();
      ctx.fillStyle = 'rgba(16, 185, 129, 0.28)';
      ctx.fill();
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.beginPath();
      ctx.roundRect(cx - 28, cy + 6, 56, 82, 20);
      ctx.fillStyle = '#d6e3da';
      ctx.fill();
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 3.5;
      ctx.stroke();
    }
    ctx.restore();

    // Minimalist border around photo stage
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.26)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoW, photoH, 24);
    ctx.stroke();

    // 3. FIELD LOG DATA SECTION & SATELLITE MINI-RADAR (y: 938 .. 1255)
    const linkedMushroom = shareModalFinding.mushroomId
      ? mushrooms.find((m) => m.id === shareModalFinding.mushroomId)
      : mushrooms.find(
          (m) => m.name.toLowerCase() === shareModalFinding.mushroomName.toLowerCase()
        );
    const speciesCroatian = shareModalFinding.mushroomName;
    const speciesLatin = shareModalFinding.latinName || linkedMushroom?.latin || '';

    // Parse weight EXCLUSIVELY if > 0.5 kg (> 500 grams)
    const parsedShareGrams =
      shareWeightGrams.trim() !== '' ? Number(shareWeightGrams) : shareModalFinding.weightGrams;
    const harvestWeightText = formatShareCardHarvestWeight(parsedShareGrams);

    const textLeftX = 64;
    const maxTextWidth = 685; // Leaves room on the right for the 220x220 Satellite Mini-Radar

    // Species Croatian Name (Prominent)
    ctx.textAlign = 'left';
    ctx.fillStyle = '#f4f8f5';
    ctx.font =
      speciesCroatian.length > 24
        ? 'bold 42px Georgia, serif'
        : 'bold 48px Georgia, serif';
    ctx.fillText(speciesCroatian, textLeftX, 982, maxTextWidth);

    // Species Latin Name (Italic below Croatian name) + Optional Harvest Weight (> 0.5 kg only)
    if (speciesLatin) {
      ctx.fillStyle = '#86efac';
      ctx.font = 'italic 27px Georgia, serif';
      ctx.fillText(speciesLatin, textLeftX, 1022, maxTextWidth);
    }

    // Subtle divider line between species header and field telemetry
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.18)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(textLeftX, 1046);
    ctx.lineTo(textLeftX + maxTextWidth, 1046);
    ctx.stroke();

    // Field Info Strip (Date & Time, Altitude + Optional >0.5kg Weight, Location)
    const formattedDateTime =
      shareDateTimeText.trim() || formatCroatianFieldDateTime(shareModalFinding.date);
    const parsedAlt = Number(shareAltitudeMeters);
    const roundedAlt =
      !Number.isNaN(parsedAlt) && parsedAlt > 0
        ? Math.round(parsedAlt)
        : inferFieldAltitudeMeters(shareModalFinding, currentPos);
    const altitudeLineText = `${roundedAlt} m n/v`;
    const locationLineText =
      shareLocationLabel.trim() || inferFieldLocationDisplay(shareModalFinding);

    // Row 1: 📅 Date and time of finding (e.g. "19. listopada 2026. u 11:30")
    ctx.fillStyle = '#d6e3da';
    ctx.font = '500 24px Inter, system-ui, sans-serif';
    ctx.fillText(`📅  ${formattedDateTime}`, textLeftX, 1090, maxTextWidth);

    // Row 2: ⛰️ Altitude (e.g. "460 m n/v") + Optional Weight ONLY if > 0.5 kg (e.g. "Ulov: 2.5 kg")
    ctx.fillStyle = '#34d399';
    ctx.font = '600 24px Inter, system-ui, sans-serif';
    const altitudeAndWeightLine = harvestWeightText
      ? `⛰️  ${altitudeLineText}    •    ⚖️  ${harvestWeightText}`
      : `⛰️  ${altitudeLineText}`;
    ctx.fillText(altitudeAndWeightLine, textLeftX, 1138, maxTextWidth);

    // Row 3: 📍 Broader area and settlement (e.g. "Medvednica • Poljanica Bistranska")
    ctx.fillStyle = '#f2f6f3';
    ctx.font = '600 25px Inter, system-ui, sans-serif';
    ctx.fillText(`📍  ${locationLineText}`, textLeftX, 1186, maxTextWidth);

    // 4. SATELLITE MINI-RADAR (Bottom-Right of Info Strip — Zoom 11 broad massif, NO coordinates or track!)
    const radarSize = 224;
    const radarX = W - 64 - radarSize; // 792
    const radarY = 944;
    const radarCx = radarX + radarSize / 2;
    const radarCy = radarY + radarSize / 2;

    // Shadow & container for Mini-Radar
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = '#07110b';
    ctx.beginPath();
    ctx.roundRect(radarX, radarY, radarSize, radarSize, 28);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(radarX, radarY, radarSize, radarSize, 28);
    ctx.clip();

    if (shareRadarCanvas) {
      // Draw real ESRI World Imagery Zoom-11 satellite tile stitch
      ctx.drawImage(shareRadarCanvas, radarX, radarY, radarSize, radarSize);
      // Subtle forest-night tint so the satellite imagery integrates with #0b120e
      ctx.fillStyle = 'rgba(9, 22, 14, 0.26)';
      ctx.fillRect(radarX, radarY, radarSize, radarSize);
    } else {
      // Stylized topographic-satellite fallback if offline
      const rGrad = ctx.createRadialGradient(radarCx, radarCy, 10, radarCx, radarCy, radarSize * 0.7);
      rGrad.addColorStop(0, '#163022');
      rGrad.addColorStop(0.6, '#0d1f15');
      rGrad.addColorStop(1, '#07110b');
      ctx.fillStyle = rGrad;
      ctx.fillRect(radarX, radarY, radarSize, radarSize);

      // Stylized contour lines
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.14)';
      ctx.lineWidth = 1.2;
      [32, 56, 82, 108].forEach((r, idx) => {
        ctx.beginPath();
        ctx.ellipse(radarCx + (idx % 2 === 0 ? 6 : -5), radarCy - 4, r * 1.15, r * 0.85, 0.35, 0, Math.PI * 2);
        ctx.stroke();
      });
    }

    // Subtle vignette inside mini-radar edges
    const radarVignette = ctx.createRadialGradient(
      radarCx,
      radarCy,
      radarSize * 0.28,
      radarCx,
      radarCy,
      radarSize * 0.72
    );
    radarVignette.addColorStop(0, 'transparent');
    radarVignette.addColorStop(1, 'rgba(6, 12, 9, 0.68)');
    ctx.fillStyle = radarVignette;
    ctx.fillRect(radarX, radarY, radarSize, radarSize);

    // Subtle radar range ring & cardinal ticks (NO coordinates or tracks!)
    ctx.strokeStyle = 'rgba(110, 231, 183, 0.28)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(radarCx, radarCy, 66, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = 'rgba(110, 231, 183, 0.18)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(radarCx, radarCy, 32, 0, Math.PI * 2);
    ctx.stroke();

    // Small glowing dot in the center of the broad massif
    ctx.beginPath();
    ctx.arc(radarCx, radarCy, 16, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(16, 185, 129, 0.28)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(radarCx, radarCy, 6.5, 0, Math.PI * 2);
    ctx.fillStyle = '#10b981';
    ctx.fill();
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    ctx.restore();

    // Mini-Radar Outer Frame
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.38)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(radarX, radarY, radarSize, radarSize, 28);
    ctx.stroke();

    // 5. FOOTER & DISCRETE MINIMALIST SIGNATURE IN BOTTOM-RIGHT CORNER
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(64, 1236);
    ctx.lineTo(W - 64, 1236);
    ctx.stroke();

    const sigText = 'Gljivobook Pro • Terenski dnevnik';
    ctx.font = '500 20px Inter, system-ui, sans-serif';
    const sigWidth = ctx.measureText(sigText).width;
    const sigRightX = W - 64;
    const sigY = 1280;

    // Draw official gljivobook.app PNG logo to the left of the signature text
    const logoSize = 32;
    const logoX = sigRightX - sigWidth - logoSize - 12;
    const logoY = sigY - 23;

    if (officialLogoImg) {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(logoX, logoY, logoSize, logoSize, 7);
      ctx.clip();
      ctx.drawImage(officialLogoImg, logoX, logoY, logoSize, logoSize);
      ctx.restore();
    }

    // Signature text
    ctx.textAlign = 'right';
    ctx.fillStyle = '#9bb0a2';
    ctx.fillText(sigText, sigRightX, sigY);

    ctx.textAlign = 'left';
  }, [
    shareModalFinding,
    shareLoadedImage,
    officialLogoImg,
    shareRadarCanvas,
    shareRadarTick,
    shareLocationLabel,
    shareAltitudeMeters,
    shareDateTimeText,
    shareWeightGrams,
    mushrooms,
    currentPos,
  ]);

  const openAntiSpyShareModal = (finding: SavedFinding) => {
    setShareModalFinding(finding);
    setShareLocationLabel(inferFieldLocationDisplay(finding));
    setShareAltitudeMeters(String(inferFieldAltitudeMeters(finding, currentPos)));
    setShareDateTimeText(formatCroatianFieldDateTime(finding.date));
    setShareWeightGrams(
      typeof finding.weightGrams === 'number' && finding.weightGrams > 0
        ? String(finding.weightGrams)
        : ''
    );
  };

  const handleDownloadSharePng = () => {
    const canvas = shareCanvasRef.current;
    if (!canvas || !shareModalFinding) return;
    const dataUrl = canvas.toDataURL('image/png');
    const slug =
      shareModalFinding.mushroomName
        .toLowerCase()
        .replace(/[^a-z0-9čćžšđ]+/gi, '-')
        .replace(/^-|-$/g, '') || 'ulov';
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `gljivobook-ulov-${slug}.png`;
    a.click();
  };

  const handleNativeSharePng = async () => {
    const canvas = shareCanvasRef.current;
    if (!canvas || !shareModalFinding) return;
    try {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), 'image/png')
      );
      if (blob && navigator.share) {
        const file = new File([blob], 'gljivobook-ulov.png', { type: 'image/png' });
        await navigator.share({
          title: `${shareModalFinding.mushroomName} — Gljivobook Pro`,
          text: `🍄 ${shareModalFinding.mushroomName} (${shareLocationLabel}) — Gljivobook Pro • Terenski dnevnik`,
          files: [file],
        });
        return;
      }
    } catch {
      // Fallback to direct PNG download if Web Share API is cancelled or unsupported
    }
    handleDownloadSharePng();
  };

  const requestBrowserGeolocation = (
    onSuccess: (pos: GeoPositionState) => void,
    onError: (msg: string) => void
  ) => {
    if (!navigator.geolocation) {
      onError('Geolokacija nije podržana u ovom pregledniku.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(6));
        const lon = Number(pos.coords.longitude.toFixed(6));
        const acc = pos.coords.accuracy ? Math.round(pos.coords.accuracy) : undefined;
        const hwAlt = pos.coords.altitude !== null ? Math.round(pos.coords.altitude) : null;

        if (hwAlt !== null) {
          const result: GeoPositionState = {
            latitude: lat,
            longitude: lon,
            accuracy: acc,
            altitude: hwAlt,
          };
          setCurrentPos(result);
          onSuccess(result);
          return;
        }

        // If device GPS did not include altitude, query SRTM DEM elevation from Open-Meteo
        fetch(`https://api.open-meteo.com/v1/elevation?latitude=${lat}&longitude=${lon}`)
          .then((r) => (r.ok ? r.json() : null))
          .then((data) => {
            const demAlt =
              typeof data?.elevation?.[0] === 'number'
                ? Math.round(data.elevation[0])
                : findNearestForestEntry(lat, lon).defaultAltitude;
            const result: GeoPositionState = {
              latitude: lat,
              longitude: lon,
              accuracy: acc,
              altitude: demAlt,
            };
            setCurrentPos(result);
            onSuccess(result);
          })
          .catch(() => {
            const fallbackAlt = findNearestForestEntry(lat, lon).defaultAltitude;
            const result: GeoPositionState = {
              latitude: lat,
              longitude: lon,
              accuracy: acc,
              altitude: fallbackAlt,
            };
            setCurrentPos(result);
            onSuccess(result);
          });
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          onError('Pristup lokaciji je odbijen. Dopustite GPS u postavkama preglednika.');
        } else if (err.code === err.TIMEOUT) {
          onError('Isteklo vrijeme čekanja na GPS signal. Pokušajte ponovno na otvorenijem prostoru.');
        } else {
          onError('Nije moguće dohvatiti točnu GPS lokaciju.');
        }
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  };

  // Save Parked Car GPS location ("🚗 Gdje mi je auto?")
  const handleSaveParkedCarGps = () => {
    setIsSavingCarGps(true);
    setQuickPinFeedback('Dohvaćam GPS poziciju parkiranog vozila...');
    requestBrowserGeolocation(
      (pos) => {
        setIsSavingCarGps(false);
        const newCar: ParkedCarPin = {
          latitude: pos.latitude,
          longitude: pos.longitude,
          accuracy: pos.accuracy,
          altitude: pos.altitude,
          savedAt: new Date().toLocaleTimeString('hr-HR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        setParkedCar(newCar);
        void idbSet(PARKED_CAR_STORAGE_KEY, newCar);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([pos.latitude, pos.longitude], 16, { duration: 1 });
        }
        setQuickPinFeedback(
          `🚗 Lokacija automobila spremljena (${pos.latitude.toFixed(5)}, ${pos.longitude.toFixed(5)}).`
        );
        setTimeout(() => setQuickPinFeedback(null), 5000);
      },
      (errMsg) => {
        setIsSavingCarGps(false);
        setQuickPinFeedback(errMsg);
      }
    );
  };

  const handleFocusCarOnMap = () => {
    if (!parkedCar || !mapInstanceRef.current) return;
    mapContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    mapInstanceRef.current.flyTo([parkedCar.latitude, parkedCar.longitude], 16, { duration: 0.9 });
    setTimeout(() => {
      parkedCarMarkerRef.current?.openPopup();
    }, 450);
  };

  const handleClearParkedCar = () => {
    setParkedCar(null);
    void idbSet(PARKED_CAR_STORAGE_KEY, null);
  };

  // Floating button action: "🎯 Centriraj na moju GPS lokaciju"
  const handleCenterMapOnUserGps = () => {
    setIsCenteringMapGps(true);
    setQuickPinFeedback('Tražim vašu GPS poziciju za centriranje šumske karte...');

    requestBrowserGeolocation(
      (pos) => {
        setIsCenteringMapGps(false);
        const map = mapInstanceRef.current;
        if (map) {
          map.flyTo([pos.latitude, pos.longitude], 16, { duration: 1.1 });
        }
        setQuickPinFeedback(
          `Karta centrirana na vašu GPS poziciju (${pos.latitude.toFixed(5)}, ${pos.longitude.toFixed(5)} • preciznost ±${pos.accuracy ?? 10} m).`
        );
        setTimeout(() => setQuickPinFeedback(null), 5000);
      },
      (errMsg) => {
        setIsCenteringMapGps(false);
        setQuickPinFeedback(errMsg);
      }
    );
  };

  // Focus a specific finding pin on the map when clicked from a card below
  const handleFocusPinOnMap = (finding: SavedFinding) => {
    if (finding.latitude === undefined || finding.longitude === undefined) return;
    const map = mapInstanceRef.current;
    if (!map) return;

    mapContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    map.flyTo([finding.latitude, finding.longitude], 16, { duration: 0.9 });
    const marker = markersByFindingIdRef.current[finding.id];
    if (marker) {
      setTimeout(() => {
        marker.openPopup();
      }, 450);
    }
  };

  // Compress uploaded photo into Base64 string for IndexedDB `photoData`
  const compressImageFileToBase64 = (
    file: File,
    onResult: (base64: string) => void
  ) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 960;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d')?.drawImage(img, 0, 0, w, h);
        onResult(canvas.toDataURL('image/jpeg', 0.84));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    compressImageFileToBase64(file, (base64) => {
      setPhotoData(base64);
    });
    e.target.value = '';
  };

  const handleQuickPinPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    compressImageFileToBase64(file, (base64) => {
      setQuickPinPhotoData(base64);
    });
    e.target.value = '';
  };

  const handleAttachPhotoToExistingFinding = (
    finding: SavedFinding,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !onUpdateFinding) return;
    compressImageFileToBase64(file, (base64) => {
      onUpdateFinding({
        ...finding,
        photoData: base64,
        photos: [base64],
      });
    });
    e.target.value = '';
  };

  // Instant 1-Tap GPS Pin & Save directly in the Field Journal tab
  const handleQuickPinAndSave = () => {
    setIsQuickPinning(true);
    setQuickPinFeedback('Dohvaćanje satelitske GPS pozicije...');

    requestBrowserGeolocation(
      (pos) => {
        const matched = mushrooms.find((m) => m.id === quickPinSpeciesId);
        const nameToUse = matched
          ? matched.name
          : quickPinLabel.trim() || 'GPS Pin nalazišta';

        const nowFormatted = new Date().toLocaleDateString('hr-HR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });

        const parsedWeight =
          quickPinWeightGrams.trim() !== '' ? Math.max(0, Math.round(Number(quickPinWeightGrams))) : undefined;

        const newPinFinding: SavedFinding = {
          id: `nalaz-${Date.now()}`,
          mushroomId: matched?.id,
          mushroomName: nameToUse,
          latinName: matched?.latin,
          date: nowFormatted,
          locationName:
            quickPinLabel.trim() ||
            `GPS Točka (${pos.latitude.toFixed(4)}, ${pos.longitude.toFixed(4)})`,
          latitude: pos.latitude,
          longitude: pos.longitude,
          accuracy: pos.accuracy,
          altitude: pos.altitude,
          weightGrams: parsedWeight && !Number.isNaN(parsedWeight) ? parsedWeight : undefined,
          notes: matched
            ? `Brzi GPS pin vrste ${matched.name} na terenu.`
            : 'Brzo zabilježena GPS točka nalazišta.',
          photoData: quickPinPhotoData || undefined,
          photos: quickPinPhotoData ? [quickPinPhotoData] : [],
        };

        onAddFinding(newPinFinding);
        setIsQuickPinning(false);
        setQuickPinLabel('');
        setQuickPinWeightGrams('');
        setQuickPinPhotoData(null);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([pos.latitude, pos.longitude], 16, { duration: 1 });
        }
        setQuickPinFeedback(
          `Uspješno pinano na kartu: ${pos.latitude}, ${pos.longitude}${
            pos.accuracy ? ` (±${pos.accuracy} m)` : ''
          }`
        );
        setTimeout(() => setQuickPinFeedback(null), 5000);
      },
      (errMsg) => {
        setIsQuickPinning(false);
        setQuickPinFeedback(errMsg);
      }
    );
  };

  // Pin GPS inside the detailed form
  const handleGetGPSForForm = () => {
    setIsLocating(true);
    setGpsStatus('Dohvaćanje satelitskih koordinata...');
    requestBrowserGeolocation(
      (pos) => {
        setIsLocating(false);
        setLatitude(String(pos.latitude));
        setLongitude(String(pos.longitude));
        setAccuracy(pos.accuracy);
        setAltitude(pos.altitude);
        setGpsStatus(
          `GPS fiksiran: ${pos.latitude}, ${pos.longitude}${
            pos.accuracy ? ` (±${pos.accuracy} m)` : ''
          }`
        );
      },
      (errMsg) => {
        setIsLocating(false);
        setGpsStatus(errMsg);
      }
    );
  };

  // Pin or update GPS coordinates on an existing finding card
  const handlePinExistingFinding = (finding: SavedFinding) => {
    if (!onUpdateFinding) return;
    setPinningFindingId(finding.id);

    requestBrowserGeolocation(
      (pos) => {
        setPinningFindingId(null);
        onUpdateFinding({
          ...finding,
          latitude: pos.latitude,
          longitude: pos.longitude,
          accuracy: pos.accuracy,
          altitude: pos.altitude,
        });
      },
      (errMsg) => {
        setPinningFindingId(null);
        setQuickPinFeedback(errMsg);
      }
    );
  };

  // Refresh user's current position to see live distance to saved mushrooms & parked car
  const handleRefreshCurrentPos = () => {
    setIsLocating(true);
    requestBrowserGeolocation(
      (pos) => {
        setIsLocating(false);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([pos.latitude, pos.longitude], 15, { duration: 0.9 });
        }
      },
      (errMsg) => {
        setIsLocating(false);
        setQuickPinFeedback(errMsg);
      }
    );
  };

  const handleCopyCoords = (id: string, lat: number, lng: number) => {
    const text = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const matched = mushrooms.find((m) => m.id === selectedMushroomId);
    const nameToUse = matched ? matched.name : customName.trim() || 'Nepoznata gljiva';

    const parsedLat = latitude.trim() !== '' ? Number(latitude) : undefined;
    const parsedLng = longitude.trim() !== '' ? Number(longitude) : undefined;
    const parsedWeight =
      weightGramsInput.trim() !== '' ? Math.max(0, Math.round(Number(weightGramsInput))) : undefined;

    const newFinding: SavedFinding = {
      id: `nalaz-${Date.now()}`,
      mushroomId: matched?.id,
      mushroomName: nameToUse,
      latinName: matched?.latin,
      date: new Date().toLocaleDateString('hr-HR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      locationName: locationName.trim() || 'Šumsko stanište',
      latitude: parsedLat !== undefined && !Number.isNaN(parsedLat) ? parsedLat : undefined,
      longitude: parsedLng !== undefined && !Number.isNaN(parsedLng) ? parsedLng : undefined,
      accuracy,
      altitude,
      weightGrams: parsedWeight && !Number.isNaN(parsedWeight) ? parsedWeight : undefined,
      notes: notes.trim(),
      photoData: photoData || undefined,
      photos: photoData ? [photoData] : [],
    };

    onAddFinding(newFinding);
    setSelectedMushroomId('');
    setCustomName('');
    setLocationName('');
    setLatitude('');
    setLongitude('');
    setAccuracy(undefined);
    setAltitude(undefined);
    setWeightGramsInput('');
    setNotes('');
    setPhotoData(null);
    setGpsStatus(null);
    setShowForm(false);
  };

  const handleExportJSON = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      app: 'Gljivobook PRO by Zrina v3.2',
      findings,
      customMushrooms,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gljivobook-dnevnik-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportGPX = () => {
    const pinned = findings.filter(
      (f) => typeof f.latitude === 'number' && typeof f.longitude === 'number'
    );
    if (pinned.length === 0) {
      setQuickPinFeedback(
        'Nema GPS pinanih nalazišta za GPX izvoz. Prvo pinajte barem jednu lokaciju u dnevnik.'
      );
      return;
    }

    const gpxContent = serializeFindingsToGPX(findings);
    const blob = new Blob([gpxContent], { type: 'application/gpx+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gljivobook-lokacije-${new Date().toISOString().slice(0, 10)}.gpx`;
    a.click();
    URL.revokeObjectURL(url);
    setQuickPinFeedback(
      `Izvezeno ${pinned.length} GPS točaka u .gpx format (spremno za Garmin, OsmAnd, Gaia GPS i Google Earth).`
    );
    setTimeout(() => setQuickPinFeedback(null), 5000);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      if (file.name.toLowerCase().endsWith('.gpx') || content.trim().startsWith('<?xml')) {
        try {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(content, 'text/xml');
          const wpts = Array.from(xmlDoc.getElementsByTagName('wpt'));
          if (wpts.length > 0) {
            const importedGpxFindings: SavedFinding[] = wpts
              .map((wpt, idx) => {
                const lat = parseFloat(wpt.getAttribute('lat') || '');
                const lon = parseFloat(wpt.getAttribute('lon') || '');
                if (Number.isNaN(lat) || Number.isNaN(lon)) return null;
                const nameEl = wpt.getElementsByTagName('name')[0]?.textContent || 'GPX Nalazište';
                const cmtEl = wpt.getElementsByTagName('cmt')[0]?.textContent || '';
                const descEl = wpt.getElementsByTagName('desc')[0]?.textContent || '';
                const eleText = wpt.getElementsByTagName('ele')[0]?.textContent;
                const ele = eleText ? Math.round(parseFloat(eleText)) : undefined;

                const matched = mushrooms.find(
                  (m) =>
                    nameEl.toLowerCase().includes(m.name.toLowerCase()) ||
                    nameEl.toLowerCase().includes(m.latin.toLowerCase())
                );

                return {
                  id: `gpx-${Date.now()}-${idx}`,
                  mushroomId: matched?.id,
                  mushroomName: matched?.name || nameEl,
                  latinName: matched?.latin,
                  date: new Date().toLocaleDateString('hr-HR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  }),
                  locationName: cmtEl || `GPX Točka (${lat.toFixed(4)}, ${lon.toFixed(4)})`,
                  latitude: lat,
                  longitude: lon,
                  altitude: ele !== undefined && !Number.isNaN(ele) ? ele : undefined,
                  notes: descEl,
                  photos: [],
                } as SavedFinding;
              })
              .filter((x): x is SavedFinding => x !== null);

            if (importedGpxFindings.length > 0) {
              onImportData([...importedGpxFindings, ...findings], customMushrooms);
              setQuickPinFeedback(
                `Uspješno uvezeno ${importedGpxFindings.length} GPS točaka iz GPX datoteke.`
              );
            }
          }
        } catch {
          // Ignore invalid GPX
        }
        return;
      }

      try {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed.findings)) {
          onImportData(
            parsed.findings,
            Array.isArray(parsed.customMushrooms) ? parsed.customMushrooms : []
          );
          setQuickPinFeedback(
            `Uspješno uvezeno ${parsed.findings.length} nalaza iz sigurnosne kopije.`
          );
        }
      } catch {
        // Ignore invalid JSON
      }
    };
    reader.readAsText(file);
  };

  const pinnedFindingsCount = findings.filter(
    (f) => f.latitude !== undefined && f.longitude !== undefined
  ).length;

  const carDistanceMeters =
    parkedCar && currentPos
      ? calculateDistanceMeters(
          currentPos.latitude,
          currentPos.longitude,
          parkedCar.latitude,
          parkedCar.longitude
        )
      : null;

  const carBearing =
    parkedCar && currentPos
      ? calculateCompassBearing(
          currentPos.latitude,
          currentPos.longitude,
          parkedCar.latitude,
          parkedCar.longitude
        )
      : null;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="rounded-2xl bg-[#121c16] border border-[#233529] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#889e90] font-mono-tabular mb-1">
            <span>Ukupno nalaza: {findings.length}</span>
            <span aria-hidden="true">·</span>
            <span>GPS pinano na karti: {pinnedFindingsCount}</span>
            {currentPos && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400">
                  Trenutni GPS: {currentPos.latitude.toFixed(5)}, {currentPos.longitude.toFixed(5)}
                </span>
              </>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-serif-display font-bold text-[#f2f6f3]">
            Terenski dnevnik nalaza i interaktivna šumska karta
          </h2>
          <p className="mt-1 text-sm text-[#9bb0a2]">
            Pregledajte svoja nalazišta na satelitskoj snimci krošnji (bukva, hrast, smreka) ili topografskoj karti s izohipsama i vrtačama te podijelite ulov bez otkrivanja GPS lokacije.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="min-h-[44px] px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white inline-flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Novi unos / Dodaj lokaciju
          </button>

          <button
            type="button"
            onClick={handleExportGPX}
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-xs font-semibold text-amber-300 inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
            title="Izvezi GPS točke u standardni .gpx format za Garmin, OsmAnd, Gaia GPS i Google Earth"
          >
            <Map className="w-3.5 h-3.5 text-amber-400" />
            <span>Izvoz GPX (.gpx)</span>
          </button>

          <button
            type="button"
            onClick={handleExportJSON}
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#1a281f] hover:bg-[#24372b] text-xs font-medium text-[#d6e3da] inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
            title="Izvezi cjelovitu JSON sigurnosnu kopiju s fotografijama"
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>

          <label
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#1a281f] hover:bg-[#24372b] text-xs font-medium text-[#d6e3da] inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
            title="Uvezi .json sigurnosnu kopiju ili .gpx datoteku"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Uvoz</span>
            <input
              type="file"
              accept=".json,.gpx,.xml"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* DINAMIČKA ŠUMSKA DOZVOLA - HRVATSKE ŠUME */}
      <ForestPermitSection />

      {/* TERENSKI SIGURNOSNI MODULI: "🚗 Gdje mi je auto?" + "🧺 Vaga ulova (3.00 kg limit)" */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 1. "🚗 Gdje mi je auto?" — GPS Lokator parkiranog vozila */}
        <div className="rounded-2xl bg-[#101a14] border border-[#263d2e] p-4 sm:p-5 flex flex-col justify-between gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center shrink-0">
                <Car className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-sm font-serif-display font-bold text-[#f2f6f3]">
                  🚗 Gdje mi je auto? (GPS povratak iz šume)
                </h3>
                <p className="text-xs text-[#889e90]">
                  Spremite GPS točku pri ulasku u šumu za siguran povratak prije mraka.
                </p>
              </div>
            </div>
            {parkedCar && (
              <button
                type="button"
                onClick={handleClearParkedCar}
                title="Obriši spremljenu lokaciju automobila"
                className="p-1.5 rounded-lg text-[#889e90] hover:text-red-400 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {parkedCar ? (
            <div className="p-3 rounded-xl bg-[#0b110e] border border-amber-500/35 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-mono-tabular text-amber-300 font-semibold">
                  📍 {parkedCar.latitude.toFixed(5)}, {parkedCar.longitude.toFixed(5)} (u {parkedCar.savedAt}h)
                </span>
                {carDistanceMeters !== null && carBearing !== null ? (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono-tabular font-bold">
                    🧭 {formatDistance(carDistanceMeters)} • {carBearing.cardinal} ({carBearing.degrees}°)
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleRefreshCurrentPos}
                    className="text-[11px] font-semibold text-emerald-400 hover:underline cursor-pointer"
                  >
                    Izračunaj udaljenost do auta
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleFocusCarOnMap}
                  className="min-h-[34px] px-3 py-1 rounded-lg bg-[#18271e] hover:bg-[#22382b] text-xs font-semibold text-emerald-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Prikaži auto na karti</span>
                </button>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${parkedCar.latitude},${parkedCar.longitude}&travelmode=walking`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[34px] px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-xs font-bold text-black inline-flex items-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigiraj do auta</span>
                </a>
                <button
                  type="button"
                  onClick={handleSaveParkedCarGps}
                  disabled={isSavingCarGps}
                  className="min-h-[34px] px-2.5 py-1 rounded-lg bg-[#142018] hover:bg-[#1c2d22] text-[11px] text-[#9bb0a2] hover:text-white transition-colors cursor-pointer"
                >
                  Ažuriraj poziciju
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSaveParkedCarGps}
              disabled={isSavingCarGps}
              className="w-full min-h-[42px] px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-xs font-bold text-amber-300 inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Car className="w-4 h-4" />
              <span>
                {isSavingCarGps
                  ? 'Dohvaćam GPS poziciju vozila...'
                  : '📍 Parkirao sam ovdje (Spremi GPS lokaciju auta)'}
              </span>
            </button>
          )}
        </div>

        {/* 2. "🧺 Današnji ulov i HŠ dnevni limit (3.00 kg)" */}
        <div className="rounded-2xl bg-[#101a14] border border-[#263d2e] p-4 sm:p-5 flex flex-col justify-between gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-serif-display font-bold text-[#f2f6f3]">
                  🧺 Današnji ulov u košarici ({totalTodayKg} / 3.00 kg)
                </h3>
                <p className="text-xs text-[#889e90]">
                  Praćenje mase ubranih gljiva prema dnevnom limitu besplatne dozvole (3 kg/dan).
                </p>
              </div>
            </div>
            {extraTodayGrams > 0 && (
              <button
                type="button"
                onClick={() => updateExtraTodayGrams(0)}
                title="Poništi brzi brojač košarice"
                className="p-1.5 rounded-lg text-[#889e90] hover:text-amber-300 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="space-y-2">
            {/* Progress Bar */}
            <div className="w-full h-2.5 rounded-full bg-[#0b110e] border border-[#1f3227] overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  totalTodayGrams > DAILY_LIMIT_GRAMS
                    ? 'bg-red-500'
                    : totalTodayGrams >= 2400
                    ? 'bg-amber-400'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${limitPct}%` }}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span
                className={`font-semibold inline-flex items-center gap-1 ${
                  totalTodayGrams > DAILY_LIMIT_GRAMS
                    ? 'text-red-300'
                    : totalTodayGrams >= 2400
                    ? 'text-amber-300'
                    : 'text-emerald-300'
                }`}
              >
                {totalTodayGrams > DAILY_LIMIT_GRAMS ? (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>Prekoračen zakonski dnevni limit od 3.00 kg!</span>
                  </>
                ) : totalTodayGrams >= 2400 ? (
                  <span>Blizu ste dnevnog limita ({DAILY_LIMIT_GRAMS - totalTodayGrams} g preostalo)</span>
                ) : (
                  <span>Preostalo do limita: {((DAILY_LIMIT_GRAMS - totalTodayGrams) / 1000).toFixed(2)} kg</span>
                )}
              </span>

              <div className="flex items-center gap-1 font-mono-tabular">
                <button
                  type="button"
                  onClick={() => updateExtraTodayGrams(extraTodayGrams + 100)}
                  className="px-2 py-1 rounded-lg bg-[#16261c] hover:bg-[#203628] border border-[#284030] text-[11px] font-semibold text-emerald-300 cursor-pointer"
                >
                  +100g
                </button>
                <button
                  type="button"
                  onClick={() => updateExtraTodayGrams(extraTodayGrams + 250)}
                  className="px-2 py-1 rounded-lg bg-[#16261c] hover:bg-[#203628] border border-[#284030] text-[11px] font-semibold text-emerald-300 cursor-pointer"
                >
                  +250g
                </button>
                <button
                  type="button"
                  onClick={() => updateExtraTodayGrams(extraTodayGrams + 500)}
                  className="px-2 py-1 rounded-lg bg-[#16261c] hover:bg-[#203628] border border-[#284030] text-[11px] font-semibold text-emerald-300 cursor-pointer"
                >
                  +500g
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE FOREST SATELLITE & TOPOGRAPHIC MAP (Leaflet) */}
      <div className="rounded-2xl bg-[#101a14] border border-[#263d2e] overflow-hidden shadow-xl">
        {/* Map Top Status Bar */}
        <div className="px-4 py-3 bg-[#121e17] border-b border-[#223629] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-[#e2ece5] font-semibold">
            <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Interaktivna šumska karta ({mapBaseLayer === 'satellite' ? 'ESRI Satelit visoke rezolucije' : 'OpenTopoMap izohipse i reljef'})
            </span>
          </div>
          <span className="text-[11px] text-[#889e90] font-mono-tabular">
            Kliknite na pin 🍄 ili 🚗 na karti za sliku, visinu i navigaciju
          </span>
        </div>

        {/* Map Canvas Container with Floating Layer Switcher & GPS Center Button */}
        <div className="relative w-full h-[380px] sm:h-[450px]">
          <div ref={mapContainerRef} className="w-full h-full z-10" />

          {/* Top-Right Layer Switcher: 🛰️ Satelit | ⛰️ Topografska karta */}
          <div className="absolute top-3 right-3 z-[400] flex items-center gap-1 p-1 rounded-xl bg-[#0b110e]/92 backdrop-blur-md border border-[#2a4233] shadow-lg">
            <button
              type="button"
              onClick={() => setMapBaseLayer('satellite')}
              className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                mapBaseLayer === 'satellite'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-[#b5c7bc] hover:text-white'
              }`}
              title="ESRI World Imagery satelitski prikaz šumskih sastojina (bukva, hrast, smreka)"
            >
              🛰️ Satelit
            </button>
            <button
              type="button"
              onClick={() => setMapBaseLayer('topo')}
              className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                mapBaseLayer === 'topo'
                  ? 'bg-amber-500 text-black font-bold shadow-xs'
                  : 'text-[#b5c7bc] hover:text-white'
              }`}
              title="OpenTopoMap topografska karta s izohipsama, reljefom i vrtačama"
            >
              ⛰️ Topografska karta
            </button>
          </div>

          {/* Bottom-Left Floating Button: "🎯 Centriraj na moju GPS lokaciju" */}
          <div className="absolute bottom-4 left-3 z-[400]">
            <button
              type="button"
              onClick={handleCenterMapOnUserGps}
              disabled={isCenteringMapGps}
              className="min-h-[42px] px-3.5 sm:px-4 py-2 rounded-xl bg-[#0b110e]/92 hover:bg-[#14231a] backdrop-blur-md border border-emerald-500/60 text-xs font-semibold text-emerald-300 inline-flex items-center gap-2 shadow-xl transition-colors cursor-pointer"
            >
              <LocateFixed className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {isCenteringMapGps
                  ? 'Tražim GPS satelite...'
                  : '🎯 Centriraj na moju GPS lokaciju'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick 1-Tap GPS Pin Bar (with optional photo capture!) */}
      <div className="rounded-2xl bg-[#101a14] border border-[#263d2e] p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-[#f2f6f3] flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-emerald-400" />
              Brzi GPS Pin nalazišta (Jednim dodirom u šumi)
            </h3>
            <p className="text-xs text-[#889e90] mt-0.5">
              Trenutačno dohvaća i sprema vašu GPS širinu, dužinu, nadmorsku visinu, fotografiju i količinu te postavlja pin na kartu.
            </p>
          </div>
          {pinnedFindingsCount > 0 && (
            <button
              type="button"
              onClick={handleRefreshCurrentPos}
              disabled={isLocating}
              className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-[#18271e] hover:bg-[#22372a] text-xs font-medium text-emerald-300 inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              {isLocating ? 'Mjerenje...' : 'Izračunaj udaljenost i smjer do pinova'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-3">
            <select
              value={quickPinSpeciesId}
              onChange={(e) => setQuickPinSpeciesId(e.target.value)}
              aria-label="Odaberi vrstu gljive za brzi GPS pin"
              className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#0b110e] border border-[#24382b] text-xs sm:text-sm text-[#f2f6f3]"
            >
              <option value="">— Odaberi vrstu —</option>
              {mushrooms.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.latin})
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-4 relative">
            <input
              ref={quickLabelInputRef}
              type="text"
              value={quickPinLabel}
              onChange={(e) => setQuickPinLabel(e.target.value)}
              placeholder="Oznaka staništa (npr. Hrastići uz potok)..."
              className="w-full min-h-[44px] pl-3.5 pr-11 py-2 rounded-xl bg-[#0b110e] border border-[#24382b] text-xs sm:text-sm text-[#f2f6f3] placeholder-[#5c7465]"
            />
            <button
              type="button"
              onClick={() => quickVoice.startListening(quickLabelInputRef.current)}
              title="Diktiraj oznaku staništa glasom"
              className={`absolute right-1.5 top-1/2 -translate-y-1/2 min-h-[34px] min-w-[34px] rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                quickVoice.isListening
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-[#18271e] hover:bg-[#22372a] text-emerald-400'
              }`}
            >
              {quickVoice.isListening ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="md:col-span-2">
            <input
              type="number"
              min="0"
              max="10000"
              step="50"
              value={quickPinWeightGrams}
              onChange={(e) => setQuickPinWeightGrams(e.target.value)}
              placeholder="Masa (g), npr. 300"
              className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#0b110e] border border-[#24382b] text-xs sm:text-sm font-mono-tabular text-[#f2f6f3] placeholder-[#5c7465]"
            />
          </div>

          <div className="md:col-span-3">
            <button
              type="button"
              onClick={handleQuickPinAndSave}
              disabled={isQuickPinning}
              className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-xs font-semibold text-white inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              {isQuickPinning ? 'Dohvaćam GPS...' : 'Pinaj i spremi nalaz'}
            </button>
          </div>
        </div>

        {/* Optional Quick Photo Buttons & Thumbnail Preview */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#1c2f23]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#9bb0a2] mr-1">Fotografija nalaza:</span>
            <label className="min-h-[38px] px-3 py-1.5 rounded-xl bg-[#18291f] hover:bg-[#22392b] border border-emerald-500/40 text-xs font-semibold text-emerald-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer">
              <span>📷 Uslikaj nalaz</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleQuickPinPhotoUpload}
                className="hidden"
              />
            </label>
            <label className="min-h-[38px] px-3 py-1.5 rounded-xl bg-[#16231b] hover:bg-[#1f3126] border border-[#294031] text-xs font-semibold text-[#e2ece5] inline-flex items-center gap-1.5 transition-colors cursor-pointer">
              <span>🖼️ Izaberi sliku</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleQuickPinPhotoUpload}
                className="hidden"
              />
            </label>
          </div>

          {quickPinPhotoData && (
            <div className="flex items-center gap-2.5 bg-[#0b110e] border border-emerald-500/40 rounded-xl p-1.5 pr-3">
              <img
                src={quickPinPhotoData}
                alt="Pretpregled nalaza"
                className="w-12 h-12 rounded-lg object-cover border border-[#263d2e]"
              />
              <span className="text-xs font-medium text-emerald-300">Slika spremna</span>
              <button
                type="button"
                onClick={() => setQuickPinPhotoData(null)}
                className="min-h-[28px] min-w-[28px] rounded-lg bg-red-950/60 hover:bg-red-900 text-red-200 flex items-center justify-center text-xs cursor-pointer"
                title="Ukloni odabranu sliku"
              >
                ❌
              </button>
            </div>
          )}
        </div>

        {quickPinFeedback && (
          <div className="text-xs font-mono-tabular text-emerald-300 flex items-center gap-2 pt-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{quickPinFeedback}</span>
          </div>
        )}
      </div>

      {/* Detailed Add Finding Form ("Novi unos / Dodaj lokaciju") */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-[#121c16] border border-[#2c4435] p-5 space-y-4"
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-serif-display font-bold text-[#f2f6f3]">
              Novi unos / Dodaj lokaciju u terenski dnevnik
            </h3>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="p-1.5 rounded-lg text-[#9bb0a2] hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-[#9bb0a2] mb-1.5">
                Odaberi vrstu iz enciklopedije
              </label>
              <select
                value={selectedMushroomId}
                onChange={(e) => setSelectedMushroomId(e.target.value)}
                className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0b110e] border border-[#263a2d] text-sm text-[#f2f6f3]"
              >
                <option value="">— Odaberi vrstu ili upiši ručno dolje —</option>
                {mushrooms.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.latin})
                  </option>
                ))}
              </select>
            </div>

            {!selectedMushroomId && (
              <div>
                <label className="block text-xs text-[#9bb0a2] mb-1.5">
                  Ili upiši vlastiti naziv nalaza
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="npr. Ljetni vrganj ispod velikog hrasta"
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0b110e] border border-[#263a2d] text-sm text-[#f2f6f3]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs text-[#9bb0a2] mb-1.5">
                Naziv lokacije / šume (privatno)
              </label>
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="npr. Medvednica – Hunjka, Samoborsko gorje..."
                className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0b110e] border border-[#263a2d] text-sm text-[#f2f6f3]"
              />
            </div>

            <div>
              <label className="block text-xs text-[#9bb0a2] mb-1.5">
                Masa ubranih gljiva u gramima (za limit 3 kg)
              </label>
              <input
                type="number"
                min="0"
                max="10000"
                step="50"
                value={weightGramsInput}
                onChange={(e) => setWeightGramsInput(e.target.value)}
                placeholder="npr. 1200 (g)"
                className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0b110e] border border-[#263a2d] text-sm font-mono-tabular text-[#f2f6f3]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs text-[#9bb0a2] mb-1.5">
                GPS koordinate nalazišta (automatski ili ručni unos)
              </label>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleGetGPSForForm}
                  disabled={isLocating}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-[#1c2d22] hover:bg-[#263d2e] text-xs font-semibold text-emerald-300 inline-flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  {isLocating ? 'Tražim satelite...' : 'Dohvati moju GPS točku'}
                </button>
                {gpsStatus && (
                  <span className="text-xs text-[#9bb0a2] font-mono-tabular">{gpsStatus}</span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2.5 mt-2.5">
                <input
                  type="number"
                  step="any"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="Širina (npr. 45.8986)"
                  className="w-full min-h-[40px] px-3 py-1.5 rounded-xl bg-[#0b110e] border border-[#263a2d] text-xs font-mono-tabular text-[#f2f6f3]"
                />
                <input
                  type="number"
                  step="any"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="Dužina (npr. 15.9482)"
                  className="w-full min-h-[40px] px-3 py-1.5 rounded-xl bg-[#0b110e] border border-[#263a2d] text-xs font-mono-tabular text-[#f2f6f3]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <label className="block text-xs text-[#9bb0a2]">
                  Bilješke o staništu i nalazu (Glasovni terenski notes)
                </label>
                <button
                  type="button"
                  onClick={() => notesVoice.startListening(notesTextareaRef.current)}
                  className={`min-h-[32px] px-3 py-1 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                    notesVoice.isListening
                      ? 'bg-red-600 text-white animate-pulse'
                      : 'bg-[#1c2d22] hover:bg-[#263d2e] text-emerald-300 border border-[#2c4435]'
                  }`}
                >
                  {notesVoice.isListening ? (
                    <>
                      <MicOff className="w-3.5 h-3.5" />
                      <span>Slušam... (klikni za kraj)</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5" />
                      <span>Diktiraj bilješku glasom</span>
                    </>
                  )}
                </button>
              </div>
              <textarea
                ref={notesTextareaRef}
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="npr. Južna padina uz potok pod bukvom, 3 mlada primjerka u mahovini..."
                className="w-full p-3.5 rounded-xl bg-[#0b110e] border border-[#263a2d] text-sm text-[#f2f6f3]"
              />
              {notesVoice.statusMessage && (
                <p className="text-[11px] text-amber-300">{notesVoice.statusMessage}</p>
              )}
            </div>

            {/* Fotografija nalaza: 2 gumba ("📷 Uslikaj nalaz" & "🖼️ Izaberi sliku") + Thumbnail Preview sa ❌ */}
            <div className="space-y-2">
              <label className="block text-xs text-[#9bb0a2]">
                Fotografija s nalazišta (sprema se u IndexedDB `photoData`)
              </label>
              <div className="flex flex-wrap items-center gap-2.5">
                <label className="min-h-[44px] px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white inline-flex items-center gap-2 cursor-pointer transition-colors shadow-sm">
                  <span>📷 Uslikaj nalaz</span>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>

                <label className="min-h-[44px] px-4 py-2 rounded-xl bg-[#1c2d22] hover:bg-[#263d2e] border border-[#2c4435] text-xs font-semibold text-[#e2ece5] inline-flex items-center gap-2 cursor-pointer transition-colors">
                  <span>🖼️ Izaberi sliku</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {photoData && (
                <div className="mt-2 inline-flex items-center gap-3 p-2 pr-3 rounded-xl bg-[#0b110e] border border-emerald-500/45">
                  <img
                    src={photoData}
                    alt="Pretpregled nalaza"
                    className="w-16 h-16 rounded-xl object-cover border border-[#2c4435]"
                  />
                  <div className="text-xs">
                    <div className="font-semibold text-emerald-300">Fotografija spremna</div>
                    <div className="text-[11px] text-[#889e90]">Bit će spremljena uz nalaz</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPhotoData(null)}
                    className="min-h-[34px] min-w-[34px] rounded-xl bg-red-950/60 hover:bg-red-900 text-red-200 flex items-center justify-center text-xs cursor-pointer transition-colors"
                    title="Ukloni sliku"
                  >
                    ❌
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-[#1a261e] text-xs font-medium text-[#9bb0a2] cursor-pointer"
            >
              Odustani
            </button>
            <button
              type="submit"
              className="min-h-[44px] px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white cursor-pointer"
            >
              Spremi nalaz
            </button>
          </div>
        </form>
      )}

      {/* Findings List */}
      {findings.length === 0 ? (
        <div className="rounded-2xl bg-[#121c16] border border-[#233529] p-10 text-center space-y-2">
          <MapPin className="w-8 h-8 text-[#5c7a67] mx-auto" />
          <div className="text-base font-semibold text-[#e6f0e9]">
            Vaš terenski dnevnik je trenutno prazan
          </div>
          <p className="text-xs text-[#889e90] max-w-md mx-auto">
            Iskoristite gornji gumb &ldquo;Pinaj i spremi nalaz&rdquo; za trenutačno spremanje koordinata i slike nalazišta na šumsku kartu ili otvorite detaljni obrazac.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {findings.map((f) => {
            const linkedMushroom = f.mushroomId
              ? mushrooms.find((m) => m.id === f.mushroomId)
              : mushrooms.find(
                  (m) => m.name.toLowerCase() === f.mushroomName.toLowerCase()
                );
            const findingPhoto = getFindingPhoto(f);
            const hasCoords = f.latitude !== undefined && f.longitude !== undefined;
            const distanceFromUser =
              hasCoords && currentPos
                ? calculateDistanceMeters(
                    currentPos.latitude,
                    currentPos.longitude,
                    f.latitude!,
                    f.longitude!
                  )
                : null;
            const bearingFromUser =
              hasCoords && currentPos
                ? calculateCompassBearing(
                    currentPos.latitude,
                    currentPos.longitude,
                    f.latitude!,
                    f.longitude!
                  )
                : null;

            const weightLabel = formatWeightKg(f.weightGrams);

            return (
              <div
                key={f.id}
                className="rounded-2xl bg-[#121c16] border border-[#233529] overflow-hidden flex flex-col justify-between"
              >
                {findingPhoto ? (
                  <div className="relative h-48 w-full bg-[#0b110e]">
                    <img
                      src={findingPhoto}
                      alt={f.mushroomName}
                      className="w-full h-full object-cover"
                    />
                    {weightLabel && (
                      <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/80 border border-amber-500/50 text-xs font-mono-tabular font-bold text-amber-300">
                        ⚖️ {weightLabel}
                      </span>
                    )}
                  </div>
                ) : (
                  onUpdateFinding && (
                    <div className="px-4 pt-3.5 flex items-center justify-between gap-2">
                      <span className="text-[11px] text-[#889e90] inline-flex items-center gap-1">
                        <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                        Dodaj sliku nalaza:
                      </span>
                      <div className="flex items-center gap-1.5">
                        <label className="px-2.5 py-1 rounded-lg bg-[#18291f] hover:bg-[#22392b] border border-emerald-500/35 text-[11px] font-semibold text-emerald-300 cursor-pointer">
                          📷 Kamera
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={(e) => handleAttachPhotoToExistingFinding(f, e)}
                            className="hidden"
                          />
                        </label>
                        <label className="px-2.5 py-1 rounded-lg bg-[#16231b] hover:bg-[#1f3126] border border-[#294031] text-[11px] font-semibold text-[#e2ece5] cursor-pointer">
                          🖼️ Galerija
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleAttachPhotoToExistingFinding(f, e)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  )
                )}

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-[#889e90] font-mono-tabular">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {f.date}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {weightLabel && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/35 text-[11px] font-bold text-amber-300">
                            ⚖️ {weightLabel}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => onDeleteFinding(f.id)}
                          className="p-1.5 text-[#889e90] hover:text-red-400 transition-colors cursor-pointer"
                          title="Obriši nalaz"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-1.5">
                      {findingPhoto && (
                        <img
                          src={findingPhoto}
                          alt={f.mushroomName}
                          className="w-11 h-11 rounded-xl object-cover border border-emerald-500/40 shrink-0"
                        />
                      )}
                      <div className="min-w-0">
                        <h3 className="text-base font-serif-display font-bold text-[#f2f6f3] truncate">
                          {f.mushroomName}
                        </h3>
                        {f.latinName && (
                          <div className="text-xs italic text-[#889e90] truncate">{f.latinName}</div>
                        )}
                      </div>
                    </div>

                    <div className="mt-2.5 text-xs text-emerald-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{f.locationName}</span>
                    </div>

                    {/* Pinned GPS Coordinates Box or Pin Action */}
                    {hasCoords ? (
                      <div className="mt-2.5 p-2.5 rounded-xl bg-[#0b110e] border border-[#1f3025] space-y-1.5">
                        <div className="flex items-center justify-between gap-2 text-[11px] font-mono-tabular text-[#d6e3da]">
                          <button
                            type="button"
                            onClick={() => handleFocusPinOnMap(f)}
                            className="hover:text-emerald-400 underline underline-offset-4 transition-colors cursor-pointer text-left"
                            title="Fokusiraj ovaj pin na šumskoj karti iznad"
                          >
                            {f.latitude!.toFixed(5)}, {f.longitude!.toFixed(5)}
                          </button>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleFocusPinOnMap(f)}
                              className="px-2 py-0.5 rounded bg-emerald-500/15 hover:bg-emerald-500/30 text-[10px] font-semibold text-emerald-300 transition-colors cursor-pointer"
                              title="Prikaži pin na interaktivnoj karti"
                            >
                              Na karti
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCopyCoords(f.id, f.latitude!, f.longitude!)}
                              className="p-1 rounded hover:bg-[#1a2920] text-[#9bb0a2] hover:text-white transition-colors cursor-pointer"
                              title="Kopiraj GPS koordinate"
                            >
                              {copiedId === f.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${f.latitude},${f.longitude}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded hover:bg-[#1a2920] text-amber-400 hover:text-amber-300 transition-colors"
                              title="Navigiraj preko Google Mapsa"
                            >
                              <Navigation className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={`https://www.openstreetmap.org/?mlat=${f.latitude}&mlon=${f.longitude}#map=16/${f.latitude}/${f.longitude}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded hover:bg-[#1a2920] text-emerald-400 hover:text-emerald-300 transition-colors"
                              title="Otvori točku na OpenStreetMap karti"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono-tabular text-[#889e90]">
                          {f.accuracy !== undefined && <span>Preciznost: ±{f.accuracy} m</span>}
                          {f.altitude !== undefined && f.altitude !== null && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>Visina: {f.altitude} m n/v</span>
                            </>
                          )}
                          {distanceFromUser !== null && bearingFromUser !== null && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-emerald-400 font-semibold">
                                {formatDistance(distanceFromUser)} ({bearingFromUser.cardinal}{' '}
                                {bearingFromUser.degrees}°)
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      onUpdateFinding && (
                        <button
                          type="button"
                          onClick={() => handlePinExistingFinding(f)}
                          disabled={pinningFindingId === f.id}
                          className="mt-2.5 w-full min-h-[38px] px-3 py-1.5 rounded-xl bg-[#16241b] hover:bg-[#1e3125] border border-[#263d2e] text-xs font-medium text-emerald-300 inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          {pinningFindingId === f.id
                            ? 'Dohvaćam GPS...'
                            : 'Pinaj trenutne GPS koordinate ovdje'}
                        </button>
                      )
                    )}

                    {f.notes && (
                      <p className="mt-2.5 text-xs text-[#c5d6cb] leading-relaxed">
                        {f.notes}
                      </p>
                    )}
                  </div>

                  {/* Card Footer Actions: "📤 Podijeli ulov" (Anti-Špijun) + "Otvori enciklopedijsku karticu" */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="button"
                      onClick={() => openAntiSpyShareModal(f)}
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/45 text-xs font-semibold text-emerald-300 inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Share2 className="w-4 h-4 text-emerald-400" />
                      <span>📤 Podijeli ulov</span>
                    </button>

                    {linkedMushroom && (
                      <button
                        type="button"
                        onClick={() => onSelectMushroom(linkedMushroom)}
                        className="w-full min-h-[38px] px-3 py-1.5 rounded-xl bg-[#1a281f] hover:bg-[#23362a] text-xs font-medium text-[#e2ece5] transition-colors cursor-pointer"
                      >
                        Otvori enciklopedijsku karticu
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* "OUTDOOR FIELD LOG" VIZUALNO DIJELJENJE NALAZA MODAL (1080x1350px / 4:5 HTML5 Canvas) */}
      {shareModalFinding && (
        <div
          className="fixed inset-0 z-[75] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShareModalFinding(null)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl bg-[#0b120e] border border-emerald-500/40 shadow-2xl p-5 sm:p-6 space-y-4 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-[#1c2e23] pb-3.5">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <Compass className="w-4 h-4" />
                  <span>Outdoor Field Log • Format 4:5 (1080×1350 px)</span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif-display font-bold text-[#f2f6f3] mt-0.5">
                  📤 Podijeli ulov: {shareModalFinding.mushroomName}
                </h3>
                <p className="text-xs text-[#9bb0a2] mt-0.5">
                  Cijela fotografija bez rezanja klobuka i stručka uz satelitski mini-radar šireg šumskog masiva.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShareModalFinding(null)}
                className="min-h-[38px] min-w-[38px] rounded-full bg-[#15231b] hover:bg-[#1f3327] text-[#9bb0a2] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Field Telemetry Customization Controls for the 1080x1350 Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#080e0b] border border-[#1c2e23] rounded-2xl p-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-emerald-400 mb-1">
                  📍 Šire područje i naselje:
                </label>
                <input
                  type="text"
                  value={shareLocationLabel}
                  onChange={(e) => setShareLocationLabel(e.target.value)}
                  placeholder="npr. Medvednica • Poljanica Bistranska"
                  className="w-full min-h-[38px] px-3 py-1.5 rounded-xl bg-[#111c15] border border-[#263d2f] text-xs font-semibold text-[#f2f6f3]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-emerald-300 mb-1">
                  ⛰️ Nadmorska visina (m n/v):
                </label>
                <input
                  type="number"
                  min="0"
                  max="3500"
                  step="5"
                  value={shareAltitudeMeters}
                  onChange={(e) => setShareAltitudeMeters(e.target.value)}
                  placeholder="npr. 460"
                  className="w-full min-h-[38px] px-3 py-1.5 rounded-xl bg-[#111c15] border border-[#263d2f] text-xs font-mono-tabular font-semibold text-[#f2f6f3]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-amber-300 mb-1">
                  ⚖️ Ulov (prikazuje se samo {'>'} 0.5 kg):
                </label>
                <input
                  type="number"
                  min="0"
                  max="20000"
                  step="100"
                  value={shareWeightGrams}
                  onChange={(e) => setShareWeightGrams(e.target.value)}
                  placeholder="npr. 2500 za 2.5 kg"
                  className="w-full min-h-[38px] px-3 py-1.5 rounded-xl bg-[#111c15] border border-[#263d2f] text-xs font-mono-tabular font-semibold text-[#f2f6f3]"
                />
              </div>
            </div>

            {/* 1080x1350 (4:5) HTML5 Canvas Preview */}
            <div className="w-full flex justify-center">
              <canvas
                ref={shareCanvasRef}
                width={1080}
                height={1350}
                className="w-full max-w-[390px] aspect-[4/5] h-auto rounded-2xl border border-emerald-500/45 shadow-2xl bg-[#0b120e]"
              />
            </div>

            {/* Download & Share Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={handleDownloadSharePng}
                className="min-h-[46px] px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs sm:text-sm font-semibold text-white inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>📥 Preuzmi sliku (PNG 4:5)</span>
              </button>

              <button
                type="button"
                onClick={handleNativeSharePng}
                className="min-h-[46px] px-5 py-2.5 rounded-xl bg-[#15241b] hover:bg-[#1e3326] border border-emerald-500/45 text-xs sm:text-sm font-semibold text-emerald-300 inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>📲 Pošalji na WhatsApp / Mreže</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
