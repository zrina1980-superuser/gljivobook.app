import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Search,
  BookOpen,
  Filter,
  Camera,
  MapPin,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Download,
  Plus,
  X,
  ArrowRight,
  PhoneCall,
  Sparkles,
  WifiOff,
  Check,
  Upload,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Mic,
  MicOff,
  Info,
  ArrowLeft,
  Scale,
  Calendar,
  CloudRain,
  Thermometer,
  Droplets,
  TrendingUp,
  TrendingDown,
  Minus,
  LocateFixed,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  INITIAL_MUSHROOMS,
  getMushroomFavoriteRank,
  getMushroomDangerRank,
} from './data/mushrooms';
import {
  EdibilityStatus,
  GrowthHabit,
  HymeniumType,
  LatexType,
  Lookalike,
  Mushroom,
  RegionId,
  RingType,
  SavedFinding,
  TreeFilterId,
} from './types/mushroom';
import { MushroomImage } from './components/MushroomImage';
import {
  EncyclopediaView,
  matchesTreeFilter,
  StatusFilter,
} from './components/EncyclopediaView';
import { MushroomDetailModal } from './components/MushroomDetailModal';
import { AIScannerView } from './components/AIScannerView';
import { FieldJournalView } from './components/FieldJournalView';
import { QuizView } from './components/QuizView';
import { AboutModal } from './components/AboutModal';
import { ZrinaLogo } from './components/ZrinaLogo';
import { useOnlineStatus, usePWAInstall } from './hooks/usePWAInstall';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import {
  fetchMushroomGallery,
  getCachedCount,
  preloadAllPhotosForOffline,
} from './services/imageService';
import { idbGetWithMigration, idbSet } from './services/storageService';
import {
  fetchMushroomForecast,
  MushroomForecastResult,
  REGION_COORDINATES,
} from './services/weatherService';

type ActiveTab = 'enciklopedija' | 'kljuc' | 'skener' | 'dnevnik' | 'kviz';
export type AccessibilityMode = 'normal' | 'large' | 'high-contrast';

const CUSTOM_MUSHROOMS_KEY = 'gljive_hr_pro_custom_mushrooms_v1';
const USER_PHOTOS_KEY = 'gljive_hr_pro_user_photos_v1';
const FINDINGS_KEY = 'gljive_hr_pro_findings_v1';
const DISCLAIMER_KEY = 'gljivobook_disclaimer_accepted_v1';
const ACCESSIBILITY_MODE_KEY = 'gljivobook_accessibility_mode_v1';
const THEME_STORAGE_KEY = 'gljivo_theme';
const PAGE_SIZE = 24;

const HYMENIUM_LABELS: Record<HymeniumType, string> = {
  listici: 'Listići',
  cjevcice: 'Cjevčice (spužva)',
  letvice: 'Letvice (nabori)',
  iglice: 'Iglice (bodlje)',
  glatko: 'Glatko / Saćasto / Zdjelica',
};

const GROWTH_LABELS: Record<GrowthHabit, string> = {
  tlo: 'Pojedinačno iz tla',
  busen: 'U busenu / grmu',
  drvo: 'Na drvetu ili panju',
};

const LATEX_LABELS: Record<LatexType, string> = {
  nema: 'Bez mlijeka',
  narancasto: 'Narančasto / crveno mlijeko',
  bijelo: 'Bijelo mlijeko',
  vodenasto: 'Vodenasto mlijeko',
};

const RING_LABELS: Record<RingType, string> = {
  vjencic_ovoj: 'Vjenčić + Ovoj u dnu',
  samo_vjencic: 'Samo vjenčić (prsten)',
  samo_ovoj: 'Samo ovoj u dnu',
  bez: 'Bez vjenčića i ovoja',
};

const REGION_OPTIONS: { id: RegionId | 'ALL'; label: string }[] = [
  { id: 'ALL', label: '🌲 Sve regije' },
  { id: 'medvednica_zagorje', label: '⛰️ Medvednica & Zagorje' },
  { id: 'gorski_kotar', label: '🌲 Gorski kotar & Lika' },
  { id: 'istra_kvarner', label: '🌊 Istra & Kvarner' },
  { id: 'slavonija', label: '🌾 Slavonija & Podravina' },
  { id: 'dalmacija', label: '☀️ Dalmacija' },
  { id: 'karlovac', label: '🌰 Pokuplje & Banovina' },
];

const REGION_SHORT_LABELS: Record<RegionId, string> = {
  medvednica_zagorje: 'Medvednica & Zagorje',
  gorski_kotar: 'Gorski kotar & Lika',
  istra_kvarner: 'Istra & Kvarner',
  slavonija: 'Slavonija & Podravina',
  dalmacija: 'Dalmacija',
  karlovac: 'Pokuplje & Banovina',
};

const ROMAN_MONTHS: { num: number; roman: string; name: string }[] = [
  { num: 1, roman: 'I', name: 'Siječanj' },
  { num: 2, roman: 'II', name: 'Veljača' },
  { num: 3, roman: 'III', name: 'Ožujak' },
  { num: 4, roman: 'IV', name: 'Travanj' },
  { num: 5, roman: 'V', name: 'Svibanj' },
  { num: 6, roman: 'VI', name: 'Lipanj' },
  { num: 7, roman: 'VII', name: 'Srpanj' },
  { num: 8, roman: 'VIII', name: 'Kolovoz' },
  { num: 9, roman: 'IX', name: 'Rujan' },
  { num: 10, roman: 'X', name: 'Listopad' },
  { num: 11, roman: 'XI', name: 'Studeni' },
  { num: 12, roman: 'XII', name: 'Prosinac' },
];

const MONTH_NAME_MAP: Record<string, number> = {
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
  proljece: 4,
  ljeto: 7,
  jesen: 10,
  zima: 1,
};

function normalizeCroatian(str: string): string {
  return str
    .toLowerCase()
    .replace(/č|ć/g, 'c')
    .replace(/š/g, 's')
    .replace(/ž/g, 'z')
    .replace(/đ/g, 'd')
    .trim();
}

function parseActiveMonths(seasonStr?: string): number[] {
  if (!seasonStr) return [6, 7, 8, 9, 10, 11];
  const norm = normalizeCroatian(seasonStr);
  if (norm.includes('cijela godina') || norm.includes('cijelu godinu')) {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }

  const activeSet = new Set<number>();
  // Split compound ranges like "Travanj – Lipanj & Rujan – Studeni"
  const segments = norm.split(/[&,;/]+/);

  for (const seg of segments) {
    const parts = seg
      .split(/[-–—]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    if (parts.length >= 2) {
      let startMonth = MONTH_NAME_MAP[parts[0]];
      let endMonth = MONTH_NAME_MAP[parts[parts.length - 1]];

      // Handle seasonal terms at boundaries
      if (parts[0] === 'proljece') startMonth = 3;
      if (parts[0] === 'ljeto') startMonth = 6;
      if (parts[0] === 'jesen') startMonth = 9;
      if (parts[0] === 'zima') startMonth = 12;

      if (parts[parts.length - 1] === 'proljece') endMonth = 5;
      if (parts[parts.length - 1] === 'ljeto') endMonth = 8;
      if (parts[parts.length - 1] === 'jesen') endMonth = 11;
      if (parts[parts.length - 1] === 'zima') endMonth = 2;

      if (startMonth && endMonth) {
        if (startMonth <= endMonth) {
          for (let m = startMonth; m <= endMonth; m++) activeSet.add(m);
        } else {
          // Wrap-around winter season (e.g. Listopad – Veljača: 10..12 and 1..2)
          for (let m = startMonth; m <= 12; m++) activeSet.add(m);
          for (let m = 1; m <= endMonth; m++) activeSet.add(m);
        }
      }
    } else if (parts.length === 1) {
      const single = MONTH_NAME_MAP[parts[0]];
      if (single) activeSet.add(single);
    }
  }

  if (activeSet.size === 0) {
    return [6, 7, 8, 9, 10, 11];
  }

  return Array.from(activeSet).sort((a, b) => a - b);
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('enciklopedija');
  const [accessibilityMode, setAccessibilityMode] = useState<AccessibilityMode>(() => {
    try {
      const saved = localStorage.getItem(ACCESSIBILITY_MODE_KEY);
      if (saved === 'large' || saved === 'high-contrast' || saved === 'normal') {
        return saved;
      }
    } catch {
      // Ignore storage errors
    }
    return 'normal';
  });
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch {
      // Ignore storage errors
    }
    return 'dark';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [regionFilter, setRegionFilter] = useState<RegionId | 'ALL'>('ALL');
  const [treeFilter, setTreeFilter] = useState<TreeFilterId>('ALL');
  const [activeThisMonthOnly, setActiveThisMonthOnly] = useState<boolean>(false);

  // Sync theme ('dark' | 'light') to <html>, <body>, and localStorage ('gljivo_theme')
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === 'light') {
      root.classList.add('light');
      body.classList.add('light');
    } else {
      root.classList.remove('light');
      body.classList.remove('light');
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Sync accessibility mode class to root <html> element and localStorage
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('a11y-large', 'a11y-high-contrast');
    if (accessibilityMode === 'large') {
      root.classList.add('a11y-large');
    } else if (accessibilityMode === 'high-contrast') {
      root.classList.add('a11y-high-contrast');
    }
    try {
      localStorage.setItem(ACCESSIBILITY_MODE_KEY, accessibilityMode);
    } catch {
      // Ignore storage errors
    }
  }, [accessibilityMode]);

  const cycleAccessibilityMode = () => {
    setAccessibilityMode((prev) => {
      if (prev === 'normal') return 'large';
      if (prev === 'large') return 'high-contrast';
      return 'normal';
    });
  };

  const accessibilityModeLabel =
    accessibilityMode === 'large'
      ? 'Krupno 120%'
      : accessibilityMode === 'high-contrast'
      ? 'Visoki kontrast'
      : 'Normalno';

  const currentMonthNumber = useMemo(() => new Date().getMonth() + 1, []);
  const currentMonthLabel = useMemo(
    () => ROMAN_MONTHS.find((m) => m.num === currentMonthNumber)?.name || 'Ovaj mjesec',
    [currentMonthNumber]
  );

  // Weather / Mushroom Barometer state (Open-Meteo)
  const [forecast, setForecast] = useState<MushroomForecastResult | null>(null);
  const [isForecastLoading, setIsForecastLoading] = useState<boolean>(false);
  const [forecastExpanded, setForecastExpanded] = useState<boolean>(true);
  const [customGpsCoords, setCustomGpsCoords] = useState<{
    lat: number;
    lon: number;
    name: string;
  } | null>(null);
  const [isLocatingGps, setIsLocatingGps] = useState<boolean>(false);

  // Visual Key filters
  const [keyHymenium, setKeyHymenium] = useState<HymeniumType | 'ALL'>('ALL');
  const [keyGrowth, setKeyGrowth] = useState<GrowthHabit | 'ALL'>('ALL');
  const [keyLatex, setKeyLatex] = useState<LatexType | 'ALL'>('ALL');
  const [keyRing, setKeyRing] = useState<RingType | 'ALL'>('ALL');

  // Custom user data (persisted in IndexedDB with automatic migration from localStorage)
  const [customMushrooms, setCustomMushrooms] = useState<Mushroom[]>([]);
  const [userPhotos, setUserPhotos] = useState<Record<string, string>>({});
  const [findings, setFindings] = useState<SavedFinding[]>([]);
  const [storageHydrated, setStorageHydrated] = useState(false);

  // Modals & Detail state
  const [selectedMushroomId, setSelectedMushroomId] = useState<string | null>(null);
  const [modalHistory, setModalHistory] = useState<string[]>([]);
  const [detailMode, setDetailMode] = useState<'simple' | 'bozac'>('simple');
  const [compareModalData, setCompareModalData] = useState<{
    sourceMushroom: Mushroom;
    lookalikeIndex: number;
  } | null>(null);
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showDisclaimerModal, setShowDisclaimerModal] = useState<boolean>(() => {
    try {
      return localStorage.getItem(DISCLAIMER_KEY) !== 'true';
    } catch {
      return true;
    }
  });
  const [showAddSpeciesModal, setShowAddSpeciesModal] = useState(false);
  const [showIOSInstallModal, setShowIOSInstallModal] = useState(false);
  const [lookalikeInfoModal, setLookalikeInfoModal] = useState<{
    sourceMushroom: Mushroom;
    lookalike: Lookalike;
  } | null>(null);

  // Infinite scroll pagination state (24 cards per batch)
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [sortMode, setSortMode] = useState<'favorites' | 'az'>('favorites');
  const loadMoreSentinelRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const lookalikeSectionRef = useRef<HTMLDivElement | null>(null);
  const modalScrollRef = useRef<HTMLDivElement | null>(null);
  const [focusLookalikesHighlight, setFocusLookalikesHighlight] = useState(false);

  const openMushroomModal = (mushroomId: string) => {
    setFocusLookalikesHighlight(false);
    setModalHistory([mushroomId]);
    setSelectedMushroomId(mushroomId);
  };

  const navigateToLookalikeInModal = (targetId: string) => {
    setFocusLookalikesHighlight(false);
    setModalHistory((prev) => {
      const base = prev.length > 0 ? prev : selectedMushroomId ? [selectedMushroomId] : [];
      if (base[base.length - 1] === targetId) return base;
      return [...base, targetId];
    });
    setSelectedMushroomId(targetId);
    setTimeout(() => {
      modalScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 40);
  };

  const handleModalBack = () => {
    if (modalHistory.length <= 1) return;
    const nextHistory = modalHistory.slice(0, -1);
    const previousId = nextHistory[nextHistory.length - 1];
    setModalHistory(nextHistory);
    setSelectedMushroomId(previousId);
    setFocusLookalikesHighlight(false);
    setTimeout(() => {
      modalScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 40);
  };

  const closeMushroomModal = () => {
    setSelectedMushroomId(null);
    setModalHistory([]);
    setFocusLookalikesHighlight(false);
  };

  const openAndFocusLookalikes = (mushroomId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setModalHistory([mushroomId]);
    setSelectedMushroomId(mushroomId);
    setFocusLookalikesHighlight(true);
    setTimeout(() => {
      lookalikeSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 140);
  };

  const formatDiscreetRef = (bozacRef: string): string => {
    const cleaned = bozacRef.replace(/^Božac,\s*/i, '').trim();
    return cleaned ? `(${cleaned})` : '';
  };

  // Voice Search in Encyclopedia
  const searchVoice = useSpeechRecognition({
    lang: 'hr-HR',
    onTranscript: (spoken) => {
      const cleaned = spoken.replace(/[.,!?]+$/, '').trim();
      if (cleaned) {
        setSearchQuery(cleaned);
      }
    },
  });

  // Offline Preload State
  const [isPreloading, setIsPreloading] = useState(false);
  const [preloadProgress, setPreloadProgress] = useState<{ loaded: number; total: number } | null>(null);
  const [cachedCount, setCachedCount] = useState<number>(() => getCachedCount());

  // New Custom Species Form State
  const [newSpeciesName, setNewSpeciesName] = useState('');
  const [newSpeciesLatin, setNewSpeciesLatin] = useState('');
  const [newSpeciesBozacRef, setNewSpeciesBozacRef] = useState('Sv. 1, terenski zapis');
  const [newSpeciesStatus, setNewSpeciesStatus] = useState<EdibilityStatus>('SAFE');
  const [newSpeciesHymenium, setNewSpeciesHymenium] = useState<HymeniumType>('listici');
  const [newSpeciesGrowth, setNewSpeciesGrowth] = useState<GrowthHabit>('tlo');
  const [newSpeciesLatex, setNewSpeciesLatex] = useState<LatexType>('nema');
  const [newSpeciesRing, setNewSpeciesRing] = useState<RingType>('bez');
  const [newSpeciesSummary, setNewSpeciesSummary] = useState('');
  const [newSpeciesHabitat, setNewSpeciesHabitat] = useState('');
  const [newSpeciesKitchen, setNewSpeciesKitchen] = useState('');
  const [newSpeciesPhoto, setNewSpeciesPhoto] = useState<string | undefined>(undefined);

  const isOnline = useOnlineStatus();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  // Initial hydration & seamless migration from localStorage -> IndexedDB
  useEffect(() => {
    let active = true;
    Promise.all([
      idbGetWithMigration<Mushroom[]>(CUSTOM_MUSHROOMS_KEY, []),
      idbGetWithMigration<Record<string, string>>(USER_PHOTOS_KEY, {}),
      idbGetWithMigration<SavedFinding[]>(FINDINGS_KEY, []),
      idbGetWithMigration<boolean>(DISCLAIMER_KEY, false),
    ]).then(([savedCustom, savedPhotos, savedFindings, savedDisclaimer]) => {
      if (!active) return;
      setCustomMushrooms(Array.isArray(savedCustom) ? savedCustom : []);
      setUserPhotos(savedPhotos && typeof savedPhotos === 'object' ? savedPhotos : {});
      setFindings(Array.isArray(savedFindings) ? savedFindings : []);
      try {
        const lsAccepted = localStorage.getItem(DISCLAIMER_KEY) === 'true';
        if (savedDisclaimer === true || lsAccepted) {
          setShowDisclaimerModal(false);
        } else {
          setShowDisclaimerModal(true);
        }
      } catch {
        setShowDisclaimerModal(!savedDisclaimer);
      }
      setStorageHydrated(true);
    });
    return () => {
      active = false;
    };
  }, []);

  const handleAcceptDisclaimer = () => {
    setShowDisclaimerModal(false);
    try {
      localStorage.setItem(DISCLAIMER_KEY, 'true');
    } catch {
      // Ignore storage errors
    }
    void idbSet(DISCLAIMER_KEY, true);
  };

  useEffect(() => {
    if (!storageHydrated) return;
    void idbSet(CUSTOM_MUSHROOMS_KEY, customMushrooms);
  }, [customMushrooms, storageHydrated]);

  useEffect(() => {
    if (!storageHydrated) return;
    void idbSet(USER_PHOTOS_KEY, userPhotos);
  }, [userPhotos, storageHydrated]);

  useEffect(() => {
    if (!storageHydrated) return;
    void idbSet(FINDINGS_KEY, findings);
  }, [findings, storageHydrated]);

  useEffect(() => {
    const onPhotoCached = () => setCachedCount(getCachedCount());
    window.addEventListener('gljive-photo-cached', onPhotoCached);
    return () => window.removeEventListener('gljive-photo-cached', onPhotoCached);
  }, []);

  // Fetch Open-Meteo Mushroom Forecast when region or GPS coordinates change
  useEffect(() => {
    let cancelled = false;
    const target = customGpsCoords || REGION_COORDINATES[regionFilter] || REGION_COORDINATES.ALL;
    setIsForecastLoading(true);

    fetchMushroomForecast(target.lat, target.lon, target.name)
      .then((res) => {
        if (!cancelled) {
          setForecast(res);
          setIsForecastLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setIsForecastLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [regionFilter, customGpsCoords]);

  const handleRequestGpsForecast = () => {
    if (!navigator.geolocation) return;
    setIsLocatingGps(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocatingGps(false);
        setCustomGpsCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          name: `GPS lokacija (${pos.coords.latitude.toFixed(2)}°N, ${pos.coords.longitude.toFixed(2)}°E)`,
        });
      },
      () => {
        setIsLocatingGps(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const allMushrooms = useMemo(() => {
    const customIds = new Set(customMushrooms.map((m) => m.id));
    const merged = [...customMushrooms, ...INITIAL_MUSHROOMS];
    const seenIds = new Set<string>();
    const seenWiki = new Set<string>();

    const deduplicated = merged
      .filter((m) => {
        const cleanId = m.id.trim().toLowerCase();
        const cleanWiki = (m.wikiQuery || '').trim().toLowerCase();
        if (seenIds.has(cleanId) || (cleanWiki && seenWiki.has(cleanWiki))) {
          return false;
        }
        seenIds.add(cleanId);
        if (cleanWiki) seenWiki.add(cleanWiki);
        return true;
      })
      .map((m) => ({
        ...m,
        userPhoto: userPhotos[m.id] || m.userPhoto,
      }));

    return deduplicated.sort((a, b) => {
      const aCustom = customIds.has(a.id) ? -1 : 0;
      const bCustom = customIds.has(b.id) ? -1 : 0;
      if (aCustom !== bCustom) return aCustom - bCustom;
      return getMushroomFavoriteRank(a.id) - getMushroomFavoriteRank(b.id);
    });
  }, [customMushrooms, userPhotos]);

  const selectedMushroom = useMemo(
    () => allMushrooms.find((m) => m.id === selectedMushroomId) || null,
    [allMushrooms, selectedMushroomId]
  );

  const previousMushroomInHistory = useMemo(() => {
    if (modalHistory.length <= 1) return null;
    const prevId = modalHistory[modalHistory.length - 2];
    return allMushrooms.find((m) => m.id === prevId) || null;
  }, [modalHistory, allMushrooms]);

  const resolveLookalikeTarget = (look: Lookalike): Mushroom | null => {
    return (
      allMushrooms.find((m) => m.id === look.targetId) ||
      allMushrooms.find(
        (m) =>
          m.name.toLowerCase().includes(look.targetId.replace(/-/g, ' ')) ||
          look.other.toLowerCase().includes(m.name.toLowerCase().split('(')[0].trim())
      ) ||
      null
    );
  };

  // Field Gallery (4 additional angles) & Lightbox state
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([]);
  const [isGalleryLoading, setIsGalleryLoading] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLightboxIndex(null);

    if (!selectedMushroom) {
      setGalleryPhotos([]);
      setIsGalleryLoading(false);
      return;
    }

    const queryKey =
      selectedMushroom.wikiQuery ||
      selectedMushroom.latin.trim().split(/\s+/).slice(0, 2).join('_');

    setIsGalleryLoading(true);
    setGalleryPhotos([]);

    fetchMushroomGallery(queryKey)
      .then((urls) => {
        if (!cancelled) {
          setGalleryPhotos(urls);
          setIsGalleryLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setGalleryPhotos([]);
          setIsGalleryLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedMushroom]);

  // Filtered mushrooms for Encyclopedia & Visual Key
  const filteredMushrooms = useMemo(() => {
    const matched = allMushrooms.filter((m) => {
      // Regional filter (applies in Encyclopedia)
      if (activeTab === 'enciklopedija' && regionFilter !== 'ALL') {
        if (!m.regions || !m.regions.includes(regionFilter)) {
          return false;
        }
      }

      // Tree / Mycorrhizal Partner filter ("🌲 Ispod stabla")
      if (activeTab === 'enciklopedija' && treeFilter !== 'ALL') {
        if (!matchesTreeFilter(m, treeFilter)) {
          return false;
        }
      }

      // Seasonal filter: Active this month ("🗓️ Aktivno ovaj mjesec")
      if (activeTab === 'enciklopedija' && activeThisMonthOnly) {
        const activeMonths = parseActiveMonths(m.season);
        if (!activeMonths.includes(currentMonthNumber)) {
          return false;
        }
      }

      // Search query (checks Croatian name, Latin name, folkNames, synonyms, summary, habitat, and Božac ref)
      if (searchQuery.trim() !== '') {
        const normalizeText = (s: string) =>
          s
            .toLowerCase()
            .replace(/[čć]/g, 'c')
            .replace(/š/g, 's')
            .replace(/ž/g, 'z')
            .replace(/đ/g, 'd');
        const q = searchQuery.toLowerCase().trim();
        const normQ = normalizeText(q);
        const matchName =
          m.name.toLowerCase().includes(q) || normalizeText(m.name).includes(normQ);
        const matchLatin =
          m.latin.toLowerCase().includes(q) || normalizeText(m.latin).includes(normQ);
        const matchFolk =
          m.folkNames?.some(
            (fn) => fn.toLowerCase().includes(q) || normalizeText(fn).includes(normQ)
          ) ?? false;
        const matchSyn =
          (m.synonyms?.toLowerCase().includes(q) ||
            (m.synonyms ? normalizeText(m.synonyms).includes(normQ) : false)) ??
          false;
        const matchSummary =
          m.shortSummary.toLowerCase().includes(q) ||
          normalizeText(m.shortSummary).includes(normQ);
        const matchHabitat =
          m.habitat.toLowerCase().includes(q) || normalizeText(m.habitat).includes(normQ);
        const matchBozac = m.bozacRef.toLowerCase().includes(q);
        if (
          !matchName &&
          !matchLatin &&
          !matchFolk &&
          !matchSyn &&
          !matchSummary &&
          !matchHabitat &&
          !matchBozac
        ) {
          return false;
        }
      }

      // Status filter (when in encyclopedia tab)
      if (activeTab === 'enciklopedija') {
        if (statusFilter === 'MEDICINAL' && !m.medicinal) return false;
        if (statusFilter !== 'ALL' && statusFilter !== 'MEDICINAL' && m.status !== statusFilter) {
          return false;
        }
      }

      // Visual Key filters (when in kljuc tab)
      if (activeTab === 'kljuc') {
        if (keyHymenium !== 'ALL' && m.hymenium !== keyHymenium) return false;
        if (keyGrowth !== 'ALL' && m.growth !== keyGrowth) return false;
        if (keyLatex !== 'ALL' && m.latex !== keyLatex) return false;
        if (keyRing !== 'ALL' && m.ring !== keyRing) return false;
      }

      return true;
    });

    // Apply Smart Sorting ("⭐ Favoriti (Preporučeno)" vs "A–Z")
    return [...matched].sort((a, b) => {
      if (sortMode === 'az') {
        return a.name.localeCompare(b.name, 'hr');
      }

      // When user explicitly filters by "Otrovne i smrtonosne"
      if (statusFilter === 'DANGER') {
        const rankDiff = getMushroomDangerRank(a.id) - getMushroomDangerRank(b.id);
        if (rankDiff !== 0) return rankDiff;
        return a.name.localeCompare(b.name, 'hr');
      }

      // Default "⭐ Favoriti (Preporučeno)":
      // 1. Edible/Conditionally edible species first, Poisonous ("DANGER") at the bottom
      const aIsDanger = a.status === 'DANGER' ? 1 : 0;
      const bIsDanger = b.status === 'DANGER' ? 1 : 0;
      if (aIsDanger !== bIsDanger) return aIsDanger - bIsDanger;

      // If both are DANGER, put deadly Amanitas at the very bottom when browsing all
      if (aIsDanger === 1 && bIsDanger === 1) {
        return getMushroomDangerRank(b.id) - getMushroomDangerRank(a.id);
      }

      const aFavRank = getMushroomFavoriteRank(a.id);
      const bFavRank = getMushroomFavoriteRank(b.id);
      const aIsTopFav = aFavRank < 1000;
      const bIsTopFav = bFavRank < 1000;
      const aActiveNow = parseActiveMonths(a.season).includes(currentMonthNumber);
      const bActiveNow = parseActiveMonths(b.season).includes(currentMonthNumber);

      // 2. Top favorite edible species active in the current month come at the very top
      const aTier = aIsTopFav && aActiveNow ? 0 : aIsTopFav ? 1 : aActiveNow ? 2 : 3;
      const bTier = bIsTopFav && bActiveNow ? 0 : bIsTopFav ? 1 : bActiveNow ? 2 : 3;
      if (aTier !== bTier) return aTier - bTier;

      if (aFavRank !== bFavRank) return aFavRank - bFavRank;
      return a.name.localeCompare(b.name, 'hr');
    });
  }, [
    allMushrooms,
    regionFilter,
    treeFilter,
    activeThisMonthOnly,
    currentMonthNumber,
    searchQuery,
    statusFilter,
    sortMode,
    activeTab,
    keyHymenium,
    keyGrowth,
    keyLatex,
    keyRing,
  ]);

  // Reset pagination to first 24 cards whenever filters or search query change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [
    regionFilter,
    treeFilter,
    activeThisMonthOnly,
    searchQuery,
    statusFilter,
    sortMode,
    activeTab,
    keyHymenium,
    keyGrowth,
    keyLatex,
    keyRing,
  ]);

  const visibleMushrooms = useMemo(
    () => filteredMushrooms.slice(0, visibleCount),
    [filteredMushrooms, visibleCount]
  );

  // Automatic Infinite Scroll observer for Encyclopedia grid (loads +24 cards on scroll)
  useEffect(() => {
    if (activeTab !== 'enciklopedija') return;
    if (visibleCount >= filteredMushrooms.length) return;
    const el = loadMoreSentinelRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredMushrooms.length));
        }
      },
      { rootMargin: '400px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [activeTab, visibleCount, filteredMushrooms.length]);

  const counts = useMemo(() => {
    const regionPool =
      regionFilter === 'ALL'
        ? allMushrooms
        : allMushrooms.filter((m) => m.regions?.includes(regionFilter));
    const treePool =
      treeFilter === 'ALL'
        ? regionPool
        : regionPool.filter((m) => matchesTreeFilter(m, treeFilter));
    const activeThisMonthCount = treePool.filter((m) =>
      parseActiveMonths(m.season).includes(currentMonthNumber)
    ).length;
    const pool = activeThisMonthOnly
      ? treePool.filter((m) => parseActiveMonths(m.season).includes(currentMonthNumber))
      : treePool;
    return {
      total: pool.length,
      safe: pool.filter((m) => m.status === 'SAFE').length,
      warn: pool.filter((m) => m.status === 'WARN').length,
      danger: pool.filter((m) => m.status === 'DANGER').length,
      medicinal: pool.filter((m) => m.medicinal).length,
      activeThisMonth: activeThisMonthCount,
    };
  }, [allMushrooms, regionFilter, treeFilter, activeThisMonthOnly, currentMonthNumber]);

  const handlePreloadOffline = async () => {
    if (isPreloading) return;
    setIsPreloading(true);
    setPreloadProgress({ loaded: 0, total: allMushrooms.length });
    await preloadAllPhotosForOffline(allMushrooms, (loaded, total) => {
      setPreloadProgress({ loaded, total });
    });
    setCachedCount(getCachedCount());
    setIsPreloading(false);
  };

  const handleUserPhotoUpload = (mushroomId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 900;
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
        const compressed = canvas.toDataURL('image/jpeg', 0.82);
        setUserPhotos((prev) => ({ ...prev, [mushroomId]: compressed }));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleCreateCustomSpecies = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpeciesName.trim()) return;

    const statusLabelMap: Record<EdibilityStatus, string> = {
      SAFE: '🟢 JESTIVA VRSTA',
      WARN: '🟡 UVJETNO JESTIVA',
      DANGER: '🔴 OTROVNA / NEJESTIVA',
    };

    const created: Mushroom = {
      id: `vlastita-${Date.now()}`,
      name: newSpeciesName.trim(),
      latin: newSpeciesLatin.trim() || 'Species nova',
      wikiQuery: (newSpeciesLatin.trim() || newSpeciesName.trim()).replace(/\s+/g, '_'),
      bozacRef: newSpeciesBozacRef.trim() || 'Osobna terenska zabilješka',
      status: newSpeciesStatus,
      statusLabel: statusLabelMap[newSpeciesStatus],
      regions: [
        'medvednica_zagorje',
        'gorski_kotar',
        'istra_kvarner',
        'dalmacija',
        'slavonija',
        'karlovac',
      ],
      hymenium: newSpeciesHymenium,
      growth: newSpeciesGrowth,
      latex: newSpeciesLatex,
      ring: newSpeciesRing,
      shortSummary: newSpeciesSummary.trim() || 'Dodana vlastita terenska vrsta.',
      simpleBullets: [
        `Ispod klobuka: ${HYMENIUM_LABELS[newSpeciesHymenium]}`,
        `Način rasta: ${GROWTH_LABELS[newSpeciesGrowth]}`,
        `Vjenčić / ovoj: ${RING_LABELS[newSpeciesRing]}`,
      ],
      bozacDetails: {
        klobuk: newSpeciesSummary.trim() || 'Prema terenskom opažanju.',
        listici: HYMENIUM_LABELS[newSpeciesHymenium],
        strucak: RING_LABELS[newSpeciesRing],
        meso: LATEX_LABELS[newSpeciesLatex],
      },
      lookalikes: [],
      habitat: newSpeciesHabitat.trim() || 'Šumsko stanište u Hrvatskoj',
      kitchen: newSpeciesKitchen.trim() || 'Obavezna determinacija prije konzumacije.',
      season: 'Proljeće – Jesen',
      customAdded: true,
      userPhoto: newSpeciesPhoto,
    };

    setCustomMushrooms((prev) => [created, ...prev]);
    setNewSpeciesName('');
    setNewSpeciesLatin('');
    setNewSpeciesSummary('');
    setNewSpeciesHabitat('');
    setNewSpeciesKitchen('');
    setNewSpeciesPhoto(undefined);
    setShowAddSpeciesModal(false);
    openMushroomModal(created.id);
  };

  const resetVisualKey = () => {
    setKeyHymenium('ALL');
    setKeyGrowth('ALL');
    setKeyLatex('ALL');
    setKeyRing('ALL');
  };

  const renderStatusText = (status: EdibilityStatus) => {
    if (status === 'SAFE') {
      return (
        <span className="inline-flex items-center gap-1 text-[#10b981] font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
          Jestiva
        </span>
      );
    }
    if (status === 'WARN') {
      return (
        <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
          <AlertTriangle className="w-3.5 h-3.5" />
          Uvjetno jestiva
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[#fb7185] font-semibold">
        <ShieldAlert className="w-3.5 h-3.5" />
        Otrovna
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#0b110e] text-[#f2f6f3] pb-24 lg:pb-12 flex flex-col justify-between">
      <div>
      {/* Top Bar Contract: 3 zones separated by gap-6 */}
      <header className="sticky top-0 z-30 bg-[#0b110e]/92 backdrop-blur-md border-b border-[#1d2c22]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 sm:gap-8 px-4 sm:px-6 h-16">
          {/* Zone 1: New Cyber Z Emblem & gljivobook.app Branding */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('enciklopedija');
            }}
            className="flex items-center gap-3 group shrink-0"
          >
            <ZrinaLogo className="w-11 h-11 rounded-xl border border-[#10b981]/40 group-hover:border-[#00f5ff]/70 shadow-sm transition-colors" />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight leading-none font-sans">
                <span className="brand-title-main text-white">gljivobook</span>
                <span className="text-[#10b981] drop-shadow-[0_0_8px_rgba(16,185,129,0.45)]">.app</span>
              </span>
              <span className="text-[11px] text-[#9bb0a2] tracking-tight mt-1 whitespace-nowrap">
                by <strong className="text-emerald-400 font-semibold">Zrina</strong> • Terenski priručnik &amp; dnevnik
              </span>
            </div>
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#9bb0a2]">
            <button
              type="button"
              onClick={() => setActiveTab('enciklopedija')}
              className={`hover:text-[#f2f6f3] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'enciklopedija' ? 'text-emerald-400 underline underline-offset-8' : ''
              }`}
            >
              Enciklopedija
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('kljuc')}
              className={`hover:text-[#f2f6f3] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'kljuc' ? 'text-emerald-400 underline underline-offset-8' : ''
              }`}
            >
              Vizualni ključ
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('skener')}
              className={`hover:text-[#f2f6f3] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'skener' ? 'text-emerald-400 underline underline-offset-8' : ''
              }`}
            >
              AI Skener
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('dnevnik')}
              className={`hover:text-[#f2f6f3] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'dnevnik' ? 'text-emerald-400 underline underline-offset-8' : ''
              }`}
            >
              Terenski dnevnik
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('kviz')}
              className={`hover:text-[#f2f6f3] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'kviz' ? 'text-emerald-400 underline underline-offset-8' : ''
              }`}
            >
              Kviz znanja
            </button>
          </nav>

          {/* Zone 3: Theme Switcher ("☀️ / 🌙") + Accessibility ("Aa") + Info ("ℹ️") buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Mehanizam preklapanja teme (Tema Switcher: Tamna šumska <-> Svijetla Paperlike) */}
            <button
              type="button"
              onClick={toggleTheme}
              title={
                theme === 'dark'
                  ? 'Prebaci na svijetlu "Paperlike / Terenski dnevnik" temu za čitanje na suncu'
                  : 'Prebaci na tamnu šumsku temu'
              }
              aria-label="Promijeni temu prikaza (Tamna / Svijetla Paperlike)"
              className="min-h-[40px] min-w-[40px] px-2.5 rounded-xl bg-[#15231a] hover:bg-[#1e3225] border border-[#263c2e] text-[#e2ece5] inline-flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer shrink-0"
            >
              <span aria-hidden="true" className="text-sm leading-none">
                {theme === 'dark' ? '☀️' : '🌙'}
              </span>
            </button>

            {/* Pristupačnost / Veličina fonta ("Aa": Normalno -> Krupno 120% -> Visoki kontrast) */}
            <button
              type="button"
              onClick={cycleAccessibilityMode}
              title={`Pristupačnost prikaza: ${accessibilityModeLabel} (Klikni za promjenu: Normalno → Krupno 120% → Visoki kontrast)`}
              aria-label={`Pristupačnost prikaza: ${accessibilityModeLabel}`}
              className={`min-h-[40px] min-w-[40px] px-2.5 rounded-xl border inline-flex items-center justify-center gap-1.5 text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                accessibilityMode === 'high-contrast'
                  ? 'bg-amber-400 text-black border-white shadow-sm'
                  : accessibilityMode === 'large'
                  ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200'
                  : 'bg-[#15231a] hover:bg-[#1e3225] border-[#263c2e] text-[#e2ece5] hover:text-emerald-300'
              }`}
            >
              <span className="font-serif-display text-sm tracking-tight leading-none">Aa</span>
              {accessibilityMode !== 'normal' && (
                <span className="hidden sm:inline text-[10px] font-mono-tabular">
                  {accessibilityMode === 'large' ? '120%' : 'Kontrast'}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowAboutModal(true)}
              title="O aplikaciji gljivobook.app by Zrina i upute za šumu"
              aria-label="O aplikaciji gljivobook.app by Zrina i upute za šumu"
              className="min-h-[40px] min-w-[40px] px-2.5 rounded-xl bg-[#15231a] hover:bg-[#1e3225] border border-[#263c2e] text-emerald-400 hover:text-emerald-300 inline-flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer shrink-0"
            >
              <span aria-hidden="true" className="text-sm leading-none">ℹ️</span>
              <span className="hidden md:inline text-[#e2ece5]">Info</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 sm:pt-4 space-y-4">
        {/* Offline status notice when without signal */}
        {!isOnline && (
          <div className="rounded-xl bg-amber-950/50 border border-amber-700/60 px-4 py-2.5 text-xs text-amber-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Izvanmrežni (Offline) način rada aktivan — cijela enciklopedija, vizualni ključ i terenski dnevnik rade bez signala.
              </span>
            </div>
          </div>
        )}

        {/* ENCYCLOPEDIA TAB */}
        {activeTab === 'enciklopedija' && (
          <EncyclopediaView
            regionOptions={REGION_OPTIONS}
            regionFilter={regionFilter}
            onSelectRegion={setRegionFilter}
            treeFilter={treeFilter}
            onSelectTreeFilter={setTreeFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchInputRef={searchInputRef}
            isVoiceListening={searchVoice.isListening}
            voiceStatusMessage={searchVoice.statusMessage}
            onStartVoiceSearch={() => searchVoice.startListening(searchInputRef.current)}
            isPreloading={isPreloading}
            preloadProgress={preloadProgress}
            cachedCount={cachedCount}
            totalMushroomsCount={allMushrooms.length}
            onPreloadOffline={handlePreloadOffline}
            onOpenAddSpecies={() => setShowAddSpeciesModal(true)}
            activeThisMonthOnly={activeThisMonthOnly}
            onToggleActiveThisMonth={() => setActiveThisMonthOnly((prev) => !prev)}
            currentMonthLabel={currentMonthLabel}
            statusFilter={statusFilter}
            onSelectStatusFilter={setStatusFilter}
            counts={counts}
            forecast={forecast}
            isForecastLoading={isForecastLoading}
            forecastExpanded={forecastExpanded}
            onToggleForecastExpanded={() => setForecastExpanded((prev) => !prev)}
            isLocatingGps={isLocatingGps}
            onRequestGpsForecast={handleRequestGpsForecast}
            filteredMushrooms={filteredMushrooms}
            visibleMushrooms={visibleMushrooms}
            visibleCount={visibleCount}
            pageSize={PAGE_SIZE}
            onLoadMore={() =>
              setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredMushrooms.length))
            }
            loadMoreSentinelRef={loadMoreSentinelRef}
            onResetFilters={() => {
              setSearchQuery('');
              setStatusFilter('ALL');
              setRegionFilter('ALL');
              setTreeFilter('ALL');
              setActiveThisMonthOnly(false);
            }}
            onOpenMushroomModal={openMushroomModal}
            onOpenAndFocusLookalikes={openAndFocusLookalikes}
            hymeniumLabels={HYMENIUM_LABELS}
            formatDiscreetRef={formatDiscreetRef}
            accessibilityMode={accessibilityMode}
            sortMode={sortMode}
            onChangeSortMode={setSortMode}
          />
        )}

        {/* VISUAL IDENTIFICATION KEY TAB ("VIZUALNI KLJUČ") */}
        {activeTab === 'kljuc' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-[#121c16] border border-[#233529] p-5 sm:p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif-display font-bold text-[#f2f6f3]">
                    Vizualni morfološki ključ za prepoznavanje na terenu
                  </h2>
                  <p className="text-sm text-[#9bb0a2] mt-1">
                    Odaberite značajke koje vidite na ubranoj gljivi. Sustav će odmah suziti izbor na vrste koje odgovaraju opisu.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetVisualKey}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-[#1c2b21] hover:bg-[#263a2d] text-xs font-semibold text-[#e2ece5] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Poništi filtre ({filteredMushrooms.length} vrsta)
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Step 1: Hymenium */}
                <div className="p-4 rounded-xl bg-[#0c130f] border border-[#1e2f24] space-y-2.5">
                  <div className="text-xs font-bold text-emerald-400">
                    01. Što se nalazi ispod klobuka?
                  </div>
                  <div className="space-y-1.5">
                    <button
                      type="button"
                      onClick={() => setKeyHymenium('ALL')}
                      className={`w-full min-h-[40px] px-3 py-2 rounded-lg text-left text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                        keyHymenium === 'ALL'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#131e17] text-[#b5c7bc] hover:bg-[#1a2920]'
                      }`}
                    >
                      <span>Sve vrste himenija</span>
                      {keyHymenium === 'ALL' && <Check className="w-3.5 h-3.5" />}
                    </button>
                    {(Object.keys(HYMENIUM_LABELS) as HymeniumType[]).map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setKeyHymenium(h)}
                        className={`w-full min-h-[40px] px-3 py-2 rounded-lg text-left text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                          keyHymenium === h
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#131e17] text-[#b5c7bc] hover:bg-[#1a2920]'
                        }`}
                      >
                        <span>{HYMENIUM_LABELS[h]}</span>
                        {keyHymenium === h && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Growth Habit */}
                <div className="p-4 rounded-xl bg-[#0c130f] border border-[#1e2f24] space-y-2.5">
                  <div className="text-xs font-bold text-emerald-400">
                    02. Gdje i kako gljiva raste?
                  </div>
                  <div className="space-y-1.5">
                    <button
                      type="button"
                      onClick={() => setKeyGrowth('ALL')}
                      className={`w-full min-h-[40px] px-3 py-2 rounded-lg text-left text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                        keyGrowth === 'ALL'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#131e17] text-[#b5c7bc] hover:bg-[#1a2920]'
                      }`}
                    >
                      <span>Sva staništa i načini rasta</span>
                      {keyGrowth === 'ALL' && <Check className="w-3.5 h-3.5" />}
                    </button>
                    {(Object.keys(GROWTH_LABELS) as GrowthHabit[]).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setKeyGrowth(g)}
                        className={`w-full min-h-[40px] px-3 py-2 rounded-lg text-left text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                          keyGrowth === g
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#131e17] text-[#b5c7bc] hover:bg-[#1a2920]'
                        }`}
                      >
                        <span>{GROWTH_LABELS[g]}</span>
                        {keyGrowth === g && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Ring & Volva */}
                <div className="p-4 rounded-xl bg-[#0c130f] border border-[#1e2f24] space-y-2.5">
                  <div className="text-xs font-bold text-emerald-400">
                    03. Prsten (vjenčić) i ovoj u dnu?
                  </div>
                  <div className="space-y-1.5">
                    <button
                      type="button"
                      onClick={() => setKeyRing('ALL')}
                      className={`w-full min-h-[40px] px-3 py-2 rounded-lg text-left text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                        keyRing === 'ALL'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#131e17] text-[#b5c7bc] hover:bg-[#1a2920]'
                      }`}
                    >
                      <span>Sve kombinacije stručka</span>
                      {keyRing === 'ALL' && <Check className="w-3.5 h-3.5" />}
                    </button>
                    {(Object.keys(RING_LABELS) as RingType[]).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setKeyRing(r)}
                        className={`w-full min-h-[40px] px-3 py-2 rounded-lg text-left text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                          keyRing === r
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#131e17] text-[#b5c7bc] hover:bg-[#1a2920]'
                        }`}
                      >
                        <span>{RING_LABELS[r]}</span>
                        {keyRing === r && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 4: Latex / Milk */}
                <div className="p-4 rounded-xl bg-[#0c130f] border border-[#1e2f24] space-y-2.5">
                  <div className="text-xs font-bold text-emerald-400">
                    04. Pušta li mliječni sok na prerezu?
                  </div>
                  <div className="space-y-1.5">
                    <button
                      type="button"
                      onClick={() => setKeyLatex('ALL')}
                      className={`w-full min-h-[40px] px-3 py-2 rounded-lg text-left text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                        keyLatex === 'ALL'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#131e17] text-[#b5c7bc] hover:bg-[#1a2920]'
                      }`}
                    >
                      <span>Sve (s mlijekom ili bez)</span>
                      {keyLatex === 'ALL' && <Check className="w-3.5 h-3.5" />}
                    </button>
                    {(Object.keys(LATEX_LABELS) as LatexType[]).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setKeyLatex(l)}
                        className={`w-full min-h-[40px] px-3 py-2 rounded-lg text-left text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                          keyLatex === l
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#131e17] text-[#b5c7bc] hover:bg-[#1a2920]'
                        }`}
                      >
                        <span>{LATEX_LABELS[l]}</span>
                        {keyLatex === l && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Matching Results */}
            <div className="space-y-3">
              <h3 className="text-base font-serif-display font-bold text-[#f2f6f3] font-mono-tabular">
                Pronađene vrste koje odgovaraju odabranim značajkama ({filteredMushrooms.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredMushrooms.map((mushroom) => (
                  <article
                    key={mushroom.id}
                    onClick={() => openMushroomModal(mushroom.id)}
                    className="group rounded-2xl bg-[#121c16] border border-[#223428] hover:border-[#395743] overflow-hidden flex flex-col justify-between transition-colors cursor-pointer"
                  >
                    <div>
                      <MushroomImage mushroom={mushroom} className="w-full h-48" />
                      <div className="p-5 space-y-2">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#889e90]">
                          {renderStatusText(mushroom.status)}
                          <span aria-hidden="true">·</span>
                          <span>{HYMENIUM_LABELS[mushroom.hymenium]}</span>
                        </div>
                        <h4 className="text-lg font-serif-display font-bold text-[#f2f6f3]">
                          {mushroom.name}
                        </h4>
                        <p className="text-xs italic text-[#889e90]">{mushroom.latin}</p>
                        <p className="text-xs text-[#b5c7bc] line-clamp-2">{mushroom.shortSummary}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI SCANNER TAB */}
        {activeTab === 'skener' && (
          <AIScannerView
            mushrooms={allMushrooms}
            onSelectMushroom={(m) => openMushroomModal(m.id)}
          />
        )}

        {/* FIELD JOURNAL TAB */}
        {activeTab === 'dnevnik' && (
          <FieldJournalView
            findings={findings}
            mushrooms={allMushrooms}
            onAddFinding={(f) => setFindings((prev) => [f, ...prev])}
            onUpdateFinding={(updated) =>
              setFindings((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
            }
            onDeleteFinding={(id) => setFindings((prev) => prev.filter((item) => item.id !== id))}
            onImportData={(importedFindings, importedCustom) => {
              setFindings(importedFindings);
              if (importedCustom.length > 0) {
                setCustomMushrooms(importedCustom);
              }
            }}
            customMushrooms={customMushrooms}
            onSelectMushroom={(m) => openMushroomModal(m.id)}
            theme={theme}
          />
        )}

        {/* QUIZ TAB */}
        {activeTab === 'kviz' && (
          <QuizView
            mushrooms={allMushrooms}
            onSelectMushroom={(m) => openMushroomModal(m.id)}
          />
        )}
      </main>
      </div>

      {/* Discreet Signature Footer */}
      <footer className="max-w-7xl w-full mx-auto px-4 sm:px-6 pt-12 pb-4">
        <div className="border-t border-[#1a2920] pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7c9384]">
          <div className="flex items-center gap-2 font-medium text-[#9bb0a2]">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span>gljivobook.app by Zrina • Medvednica &amp; Zagorje</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setShowAboutModal(true)}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              O aplikaciji i upute
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setShowDisclaimerModal(true)}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Pravila sigurnosti
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setShowSOSModal(true)}
              className="text-red-300 hover:text-red-200 transition-colors cursor-pointer"
            >
              SOS Centar za kontrolu otrovanja IMI (+385 1 2348 342)
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0b110e]/95 backdrop-blur-md border-t border-[#1d2c22]">
        <div className="grid grid-cols-5 items-center h-16 px-1">
          <button
            type="button"
            onClick={() => setActiveTab('enciklopedija')}
            className={`min-h-[44px] flex flex-col items-center justify-center cursor-pointer ${
              activeTab === 'enciklopedija' ? 'text-emerald-400' : 'text-[#889e90]'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">
              Baza
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('kljuc')}
            className={`min-h-[44px] flex flex-col items-center justify-center cursor-pointer ${
              activeTab === 'kljuc' ? 'text-emerald-400' : 'text-[#889e90]'
            }`}
          >
            <Filter className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">
              Ključ
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('skener')}
            className={`min-h-[44px] flex flex-col items-center justify-center cursor-pointer ${
              activeTab === 'skener' ? 'text-emerald-400' : 'text-[#889e90]'
            }`}
          >
            <Camera className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">
              AI Skener
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dnevnik')}
            className={`min-h-[44px] flex flex-col items-center justify-center cursor-pointer ${
              activeTab === 'dnevnik' ? 'text-emerald-400' : 'text-[#889e90]'
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">
              Dnevnik
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('kviz')}
            className={`min-h-[44px] flex flex-col items-center justify-center cursor-pointer ${
              activeTab === 'kviz' ? 'text-emerald-400' : 'text-[#889e90]'
            }`}
          >
            <HelpCircle className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">
              Kviz
            </span>
          </button>
        </div>
      </nav>

      {/* SPECIES DETAIL MODAL / DRAWER */}
      {selectedMushroom && (
        <MushroomDetailModal
          mushroom={selectedMushroom}
          modalHistory={modalHistory}
          previousMushroomInHistory={previousMushroomInHistory}
          onBack={handleModalBack}
          onClose={closeMushroomModal}
          onUserPhotoUpload={handleUserPhotoUpload}
          detailMode={detailMode}
          onChangeDetailMode={setDetailMode}
          focusLookalikesHighlight={focusLookalikesHighlight}
          onSetFocusLookalikesHighlight={setFocusLookalikesHighlight}
          lookalikeSectionRef={lookalikeSectionRef}
          modalScrollRef={modalScrollRef}
          onOpenCompareModal={(sourceMushroom, lookalikeIndex) =>
            setCompareModalData({ sourceMushroom, lookalikeIndex })
          }
          onNavigateToLookalike={navigateToLookalikeInModal}
          onOpenLookalikeInfo={(sourceMushroom, lookalike) =>
            setLookalikeInfoModal({ sourceMushroom, lookalike })
          }
          resolveLookalikeTarget={resolveLookalikeTarget}
          galleryPhotos={galleryPhotos}
          isGalleryLoading={isGalleryLoading}
          onOpenLightbox={setLightboxIndex}
          parseActiveMonths={parseActiveMonths}
          currentMonthNumber={currentMonthNumber}
          currentMonthLabel={currentMonthLabel}
          romanMonths={ROMAN_MONTHS}
          regionShortLabels={REGION_SHORT_LABELS}
          hymeniumLabels={HYMENIUM_LABELS}
          formatDiscreetRef={formatDiscreetRef}
        />
      )}

      {/* 1-ON-1 SIDE-BY-SIDE LOOKALIKE COMPARISON MODAL ("⚖️ Usporedi 1 na 1") */}
      {compareModalData && (
        <div
          className="fixed inset-0 z-[68] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto overflow-x-hidden max-w-full box-border"
          onClick={() => setCompareModalData(null)}
        >
          {(() => {
            const { sourceMushroom, lookalikeIndex } = compareModalData;
            const currentLook =
              sourceMushroom.lookalikes[lookalikeIndex] || sourceMushroom.lookalikes[0];
            if (!currentLook) return null;
            const twinMushroom = resolveLookalikeTarget(currentLook);
            const twinDisplayName = twinMushroom
              ? twinMushroom.name
              : currentLook.other.split(':')[0] || currentLook.targetId.replace(/-/g, ' ');

            return (
              <div
                className="w-full max-w-5xl max-h-[92vh] overflow-y-auto overflow-x-hidden box-border rounded-3xl bg-[#0e1711] border border-[#2a4032] shadow-2xl p-4 sm:p-7 space-y-5 my-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between gap-3 border-b border-[#1f3126] pb-4">
                  <div className="min-w-0">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
                      <Scale className="w-4 h-4 shrink-0" />
                      <span>Usporedba dvojnica 1 na 1</span>
                    </div>
                    <h2 className="text-lg sm:text-2xl font-serif-display font-bold text-[#f2f6f3] mt-0.5 break-words">
                      {sourceMushroom.name} <span className="text-[#889e90] font-normal">vs.</span>{' '}
                      <span className="text-red-300">{twinDisplayName}</span>
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCompareModalData(null)}
                    className="min-h-[40px] min-w-[40px] rounded-full bg-[#18261d] hover:bg-[#223629] text-[#9bb0a2] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Switcher pills if the species has multiple lookalikes */}
                {sourceMushroom.lookalikes.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {sourceMushroom.lookalikes.map((item, i) => {
                      const target = resolveLookalikeTarget(item);
                      const label = target ? target.name : item.trait;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() =>
                            setCompareModalData({
                              sourceMushroom,
                              lookalikeIndex: i,
                            })
                          }
                          className={`min-h-[34px] px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                            i === lookalikeIndex
                              ? 'bg-amber-500 text-black'
                              : 'bg-[#15231a] text-[#9bb0a2] hover:text-white border border-[#253b2d]'
                          }`}
                        >
                          Dvojnik #{i + 1}: {label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* CENTER HIGHLIGHT: Exact Key Difference Box */}
                <div className="rounded-2xl bg-gradient-to-r from-emerald-950/60 via-[#15221a] to-red-950/60 border-2 border-amber-400/60 p-4 sm:p-5 space-y-2.5 shadow-lg">
                  <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300 text-center">
                    <Scale className="w-4 h-4 shrink-0" />
                    <span>Ključna razlika: {currentLook.trait}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-11 gap-2.5 items-center text-xs sm:text-sm">
                    <div className="sm:col-span-5 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-100 font-medium break-words">
                      <span className="block text-[11px] font-bold uppercase text-emerald-400 mb-0.5">
                        {sourceMushroom.name}:
                      </span>
                      {currentLook.mine}
                    </div>
                    <div className="sm:col-span-1 flex items-center justify-center">
                      <span className="px-2 py-1 rounded-lg bg-amber-400/20 border border-amber-400/50 text-[11px] font-mono-tabular font-bold text-amber-300">
                        VS
                      </span>
                    </div>
                    <div className="sm:col-span-5 p-3 rounded-xl bg-red-950/55 border border-red-500/60 text-red-100 font-medium break-words">
                      <span className="block text-[11px] font-bold uppercase text-red-300 mb-0.5">
                        {twinDisplayName}:
                      </span>
                      {currentLook.other}
                    </div>
                  </div>
                </div>

                {/* Two-Column Side-by-Side Comparison (Left: Green Frame | Right: Red Frame) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* LEFT COLUMN: First Mushroom (Green Frame) */}
                  <div className="rounded-2xl bg-[#0b120d] border-2 border-emerald-500/75 overflow-hidden flex flex-col justify-between">
                    <div>
                      <MushroomImage mushroom={sourceMushroom} className="w-full h-48 sm:h-56" />
                      <div className="p-4 sm:p-5 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          {renderStatusText(sourceMushroom.status)}
                          <span className="text-[11px] font-mono-tabular text-[#889e90]">
                            {HYMENIUM_LABELS[sourceMushroom.hymenium]}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-serif-display font-bold text-emerald-300 break-words">
                            {sourceMushroom.name}
                          </h3>
                          <p className="text-xs italic text-[#889e90] break-words">
                            {sourceMushroom.latin}
                          </p>
                        </div>
                        <div className="space-y-1.5 pt-1">
                          <div className="text-xs font-bold text-emerald-400">
                            Ključne točke prepoznavanja:
                          </div>
                          <ul className="space-y-1.5 text-xs text-[#e2ece5]">
                            {sourceMushroom.simpleBullets.map((b, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="font-mono-tabular font-bold text-emerald-400 shrink-0">
                                  •
                                </span>
                                <span className="break-words">{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-emerald-950/25 border-t border-emerald-500/30 text-xs text-emerald-200">
                      <strong>Meso / Reakcija:</strong> {sourceMushroom.bozacDetails.meso}
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Lookalike Mushroom (Red Frame) */}
                  <div className="rounded-2xl bg-[#130c0d] border-2 border-red-500/80 overflow-hidden flex flex-col justify-between">
                    <div>
                      {twinMushroom ? (
                        <MushroomImage mushroom={twinMushroom} className="w-full h-48 sm:h-56" />
                      ) : (
                        <div className="w-full h-48 sm:h-56 bg-gradient-to-br from-red-950/70 via-[#1a0f11] to-[#0f1511] flex flex-col items-center justify-center p-6 text-center border-b border-red-900/50">
                          <ShieldAlert className="w-10 h-10 text-red-400 mb-2" />
                          <span className="text-sm font-bold text-red-200">{twinDisplayName}</span>
                          <span className="text-xs text-red-300/80 mt-1">
                            Oprez: Slična / opasna dvojnica
                          </span>
                        </div>
                      )}

                      <div className="p-4 sm:p-5 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          {twinMushroom ? (
                            renderStatusText(twinMushroom.status)
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[#fb7185] font-semibold text-xs">
                              <ShieldAlert className="w-3.5 h-3.5" />
                              Dvojnica za izbjegavanje
                            </span>
                          )}
                          {twinMushroom && (
                            <span className="text-[11px] font-mono-tabular text-[#889e90]">
                              {HYMENIUM_LABELS[twinMushroom.hymenium]}
                            </span>
                          )}
                        </div>

                        <div>
                          <h3 className="text-lg sm:text-xl font-serif-display font-bold text-red-300 break-words">
                            {twinDisplayName}
                          </h3>
                          {twinMushroom && (
                            <p className="text-xs italic text-[#9bb0a2] break-words">
                              {twinMushroom.latin}
                            </p>
                          )}
                        </div>

                        <div className="space-y-1.5 pt-1">
                          <div className="text-xs font-bold text-red-300">
                            Ključne točke dvojnice:
                          </div>
                          {twinMushroom ? (
                            <ul className="space-y-1.5 text-xs text-red-100">
                              {twinMushroom.simpleBullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="font-mono-tabular font-bold text-red-400 shrink-0">
                                    •
                                  </span>
                                  <span className="break-words">{b}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-xs text-red-100 leading-relaxed break-words">
                              {currentLook.other}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="px-4 py-3 bg-red-950/40 border-t border-red-500/30 flex items-center justify-between gap-2 text-xs text-red-200">
                      <span className="truncate">
                        {twinMushroom
                          ? `Meso: ${twinMushroom.bozacDetails.meso}`
                          : `Značajka: ${currentLook.trait}`}
                      </span>
                      {twinMushroom && (
                        <button
                          type="button"
                          onClick={() => {
                            setCompareModalData(null);
                            navigateToLookalikeInModal(twinMushroom.id);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-red-800 hover:bg-red-700 text-white font-semibold inline-flex items-center gap-1 shrink-0 cursor-pointer"
                        >
                          <span>Otvori profil</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL FOR GALLERY PHOTOS */}
      {selectedMushroom && lightboxIndex !== null && galleryPhotos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar */}
          <div
            className="w-full max-w-5xl flex items-center justify-between gap-4 pb-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="text-sm sm:text-base font-serif-display font-bold">
                {selectedMushroom.name}{' '}
                <span className="italic font-normal text-[#9bb0a2] text-xs sm:text-sm">
                  ({selectedMushroom.latin})
                </span>
              </div>
              <div className="text-xs font-mono-tabular text-emerald-400">
                Terenska fotografija {lightboxIndex + 1} / {galleryPhotos.length}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="min-h-[44px] min-w-[44px] rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Zatvori uvećani prikaz"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Lightbox Image & Prev/Next Controls */}
          <div
            className="relative w-full max-w-5xl flex-1 flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {galleryPhotos.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + galleryPhotos.length) % galleryPhotos.length
                  )
                }
                className="absolute left-2 sm:left-4 z-10 min-h-[44px] min-w-[44px] rounded-full bg-black/75 hover:bg-black text-white border border-white/15 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Prethodna fotografija"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            <img
              src={galleryPhotos[lightboxIndex].replace('medium', 'large')}
              alt={`${selectedMushroom.name} - uvećana terenska fotografija ${lightboxIndex + 1}`}
              className="max-h-[78vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
              onError={(e) => {
                if (e.currentTarget.src !== galleryPhotos[lightboxIndex]) {
                  e.currentTarget.src = galleryPhotos[lightboxIndex];
                }
              }}
            />

            {galleryPhotos.length > 1 && (
              <button
                type="button"
                onClick={() => setLightboxIndex((lightboxIndex + 1) % galleryPhotos.length)}
                className="absolute right-2 sm:right-4 z-10 min-h-[44px] min-w-[44px] rounded-full bg-black/75 hover:bg-black text-white border border-white/15 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Sljedeća fotografija"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Thumbnail Strip */}
          {galleryPhotos.length > 1 && (
            <div
              className="flex items-center justify-center gap-2.5 pt-4"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryPhotos.map((thumb, idx) => (
                <button
                  key={thumb + idx}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    idx === lightboxIndex
                      ? 'border-emerald-400 scale-105'
                      : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={thumb} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SOS POISONING EMERGENCY MODAL */}
      {showSOSModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowSOSModal(false)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl bg-[#121a15] border border-red-800/70 p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif-display font-bold text-red-300">
                  SOS Protokol u slučaju sumnje na trovanje gljivama
                </h2>
                <p className="text-xs text-[#9bb0a2] mt-1">
                  Hitni telefonski brojevi u Republici Hrvatskoj (dostupni 0–24h)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSOSModal(false)}
                className="p-2 rounded-lg text-[#9bb0a2] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="tel:112"
                className="p-4 rounded-2xl bg-red-950/60 border border-red-700/70 flex items-center justify-between text-white hover:bg-red-900/70 transition-colors"
              >
                <div>
                  <div className="text-xs text-red-200">Jedinstveni broj za hitne službe</div>
                  <div className="text-2xl font-mono-tabular font-bold">112 / 194</div>
                </div>
                <PhoneCall className="w-6 h-6 text-red-300 shrink-0" />
              </a>
              <a
                href="tel:+38512348342"
                className="p-4 rounded-2xl bg-[#0b110e] border border-[#283e30] flex items-center justify-between gap-3 text-white hover:border-emerald-500 transition-colors"
              >
                <div>
                  <div className="text-xs text-[#9bb0a2] leading-snug">
                    Centar za kontrolu otrovanja pri Institutu za medicinska istraživanja i medicinu rada (IMI)
                  </div>
                  <div className="text-[10px] text-[#7c9384] italic mt-0.5">
                    Poison Control Centre at the Institute for Medical Research and Occupational Health (IMI)
                  </div>
                  <div className="text-lg sm:text-xl font-mono-tabular font-bold text-emerald-400 mt-1">
                    +385 1 2348 342
                  </div>
                </div>
                <PhoneCall className="w-6 h-6 text-emerald-400 shrink-0" />
              </a>
            </div>

            <div className="space-y-3 text-xs text-[#d6e3da] leading-relaxed">
              <div className="p-3.5 rounded-xl bg-[#0b110e] border border-amber-500/40">
                <strong className="text-amber-300 block mb-1">
                  Simptomi unutar 6 sati:
                </strong>
                Sindrom kratke latencije — uglavnom probavne smetnje, mučnina, grčevi. Piti tekućinu, javiti se liječniku.
              </div>
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-600/70">
                <strong className="text-red-300 block mb-1">
                  Simptomi nakon 6 do 24 sata (ili više dana):
                </strong>
                Sindrom duge latencije — <strong>HITNO NA HITNU!</strong> Karakteristično za najopasnije gljive (zelena pupavka, rebrasta patuljica, koprenke). Otrov je već prešao u krv i napada jetru i bubrege.
              </div>
              <div className="p-3.5 rounded-xl bg-[#0b110e] border border-[#1f3025]">
                <strong className="text-white block mb-1">
                  Napomena:
                </strong>
                U bolnicu obavezno ponijeti ostatke gljiva ili otpatke od čišćenja iz kante za smeće.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD CUSTOM SPECIES MODAL */}
      {showAddSpeciesModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowAddSpeciesModal(false)}
        >
          <form
            onSubmit={handleCreateCustomSpecies}
            className="w-full max-w-2xl rounded-3xl bg-[#121c16] border border-[#283e30] p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-serif-display font-bold text-[#f2f6f3]">
                Dodaj novu vrstu u enciklopediju
              </h2>
              <button
                type="button"
                onClick={() => setShowAddSpeciesModal(false)}
                className="p-2 text-[#9bb0a2] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#9bb0a2] mb-1">Hrvatski naziv vrste *</label>
                <input
                  type="text"
                  required
                  value={newSpeciesName}
                  onChange={(e) => setNewSpeciesName(e.target.value)}
                  placeholder="npr. Hrastov turen"
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0b110e] border border-[#263a2d] text-sm text-[#f2f6f3]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#9bb0a2] mb-1">Latinski naziv</label>
                <input
                  type="text"
                  value={newSpeciesLatin}
                  onChange={(e) => setNewSpeciesLatin(e.target.value)}
                  placeholder="npr. Leccinum aurantiacum"
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0b110e] border border-[#263a2d] text-sm text-[#f2f6f3]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#9bb0a2] mb-1">Jestivost / Status</label>
                <select
                  value={newSpeciesStatus}
                  onChange={(e) => setNewSpeciesStatus(e.target.value as EdibilityStatus)}
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0b110e] border border-[#263a2d] text-sm text-[#f2f6f3]"
                >
                  <option value="SAFE">Jestiva vrsta</option>
                  <option value="WARN">Uvjetno jestiva (prokuhati)</option>
                  <option value="DANGER">Otrovna ili nejestiva</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#9bb0a2] mb-1">Referenca (svezak/str.)</label>
                <input
                  type="text"
                  value={newSpeciesBozacRef}
                  onChange={(e) => setNewSpeciesBozacRef(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0b110e] border border-[#263a2d] text-sm text-[#f2f6f3]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#9bb0a2] mb-1">Ispod klobuka (Himenij)</label>
                <select
                  value={newSpeciesHymenium}
                  onChange={(e) => setNewSpeciesHymenium(e.target.value as HymeniumType)}
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0b110e] border border-[#263a2d] text-sm text-[#f2f6f3]"
                >
                  {(Object.keys(HYMENIUM_LABELS) as HymeniumType[]).map((h) => (
                    <option key={h} value={h}>
                      {HYMENIUM_LABELS[h]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#9bb0a2] mb-1">Način rasta</label>
                <select
                  value={newSpeciesGrowth}
                  onChange={(e) => setNewSpeciesGrowth(e.target.value as GrowthHabit)}
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0b110e] border border-[#263a2d] text-sm text-[#f2f6f3]"
                >
                  {(Object.keys(GROWTH_LABELS) as GrowthHabit[]).map((g) => (
                    <option key={g} value={g}>
                      {GROWTH_LABELS[g]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#9bb0a2] mb-1">Vjenčić i ovoj</label>
                <select
                  value={newSpeciesRing}
                  onChange={(e) => setNewSpeciesRing(e.target.value as RingType)}
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0b110e] border border-[#263a2d] text-sm text-[#f2f6f3]"
                >
                  {(Object.keys(RING_LABELS) as RingType[]).map((r) => (
                    <option key={r} value={r}>
                      {RING_LABELS[r]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#9bb0a2] mb-1">Mliječni sok</label>
                <select
                  value={newSpeciesLatex}
                  onChange={(e) => setNewSpeciesLatex(e.target.value as LatexType)}
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0b110e] border border-[#263a2d] text-sm text-[#f2f6f3]"
                >
                  {(Object.keys(LATEX_LABELS) as LatexType[]).map((l) => (
                    <option key={l} value={l}>
                      {LATEX_LABELS[l]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#9bb0a2] mb-1">Opis i ključne značajke</label>
              <textarea
                rows={2}
                value={newSpeciesSummary}
                onChange={(e) => setNewSpeciesSummary(e.target.value)}
                placeholder="Kratak opis klobuka, stručka i promjene boje mesa..."
                className="w-full p-3 rounded-xl bg-[#0b110e] border border-[#263a2d] text-sm text-[#f2f6f3]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#9bb0a2] mb-1">Stanište</label>
                <input
                  type="text"
                  value={newSpeciesHabitat}
                  onChange={(e) => setNewSpeciesHabitat(e.target.value)}
                  placeholder="npr. Pod brezama i jasikama"
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0b110e] border border-[#263a2d] text-sm text-[#f2f6f3]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#9bb0a2] mb-1">Fotografija vrste (neobavezno)</label>
                <label className="min-h-[44px] px-4 py-2 rounded-xl bg-[#1c2d22] hover:bg-[#263d2e] text-xs font-semibold text-[#e2ece5] inline-flex items-center gap-2 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  {newSpeciesPhoto ? 'Fotografija odabrana' : 'Odaberi sliku'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const r = new FileReader();
                      r.onload = () => setNewSpeciesPhoto(r.result as string);
                      r.readAsDataURL(file);
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddSpeciesModal(false)}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-[#1a261e] text-xs font-medium text-[#9bb0a2] cursor-pointer"
              >
                Odustani
              </button>
              <button
                type="submit"
                className="min-h-[44px] px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white cursor-pointer"
              >
                Spremi vrstu u enciklopediju
              </button>
            </div>
          </form>
        </div>
      )}

      {/* iOS PWA Installation Guide Modal */}
      {showIOSInstallModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowIOSInstallModal(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-[#121c16] border border-[#283e30] p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-serif-display font-bold text-[#f2f6f3]">
              Instalacija na iPhone / iPad
            </h3>
            <p className="text-xs text-[#b5c7bc] leading-relaxed">
              1. Dodirnite gumb <strong>Dijeli (Share)</strong> na dnu Safari preglednika.
              <br />
              2. Odaberite opciju <strong>Dodaj na početni zaslon (Add to Home Screen)</strong> kako bi vam vodič bio dostupan u šumi bez interneta.
            </p>
            <button
              type="button"
              onClick={() => setShowIOSInstallModal(false)}
              className="w-full min-h-[44px] rounded-xl bg-emerald-600 text-xs font-semibold text-white cursor-pointer"
            >
              Razumijem
            </button>
          </div>
        </div>
      )}

      {lookalikeInfoModal && (
        <div
          className="fixed inset-0 z-[65] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLookalikeInfoModal(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-[#121c16] border border-[#283e30] p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-amber-300">
                  Usporedba dvojnika ({lookalikeInfoModal.lookalike.trait})
                </div>
                <h3 className="text-lg font-serif-display font-bold text-[#f2f6f3] mt-0.5">
                  {lookalikeInfoModal.lookalike.other.split(':')[0] ||
                    lookalikeInfoModal.lookalike.targetId.replace(/-/g, ' ')}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLookalikeInfoModal(null)}
                className="p-1.5 text-[#889e90] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#0b110e] border border-[#23382a]">
                <div className="font-semibold text-emerald-400 mb-1">
                  {lookalikeInfoModal.sourceMushroom.name} ({lookalikeInfoModal.sourceMushroom.latin}):
                </div>
                <p className="text-[#e2ece5] leading-relaxed">
                  {lookalikeInfoModal.lookalike.mine}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-red-950/35 border border-red-900/60">
                <div className="font-semibold text-red-300 mb-1">Ključna razlika kod dvojnika:</div>
                <p className="text-red-100 leading-relaxed">
                  {lookalikeInfoModal.lookalike.other}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setLookalikeInfoModal(null)}
                className="min-h-[40px] px-4 py-2 rounded-xl bg-[#1a261e] text-xs font-medium text-[#9bb0a2] cursor-pointer"
              >
                Zatvori
              </button>
              <button
                type="button"
                onClick={() => {
                  const rawLabel =
                    lookalikeInfoModal.lookalike.other.split(':')[0]?.split('(')[0]?.trim() ||
                    lookalikeInfoModal.lookalike.targetId.replace(/-/g, ' ');
                  setLookalikeInfoModal(null);
                  closeMushroomModal();
                  setActiveTab('enciklopedija');
                  setStatusFilter('ALL');
                  setSearchQuery(rawLabel);
                }}
                className="min-h-[40px] px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                Pretraži srodne vrste u Enciklopediji
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ABOUT & INSTRUCTIONS MODAL */}
      <AboutModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
        totalSpeciesCount={allMushrooms.length}
        cachedCount={cachedCount}
        isPreloading={isPreloading}
        preloadProgress={preloadProgress}
        onPreloadOffline={handlePreloadOffline}
      />

      {/* FIRST-LAUNCH SAFETY DISCLAIMER MODAL (Jednokratni sigurnosni disclaimer) */}
      {showDisclaimerModal && (
        <div className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="w-full max-w-lg rounded-3xl bg-[#101913] border-2 border-amber-500/50 shadow-2xl p-6 sm:p-8 space-y-5 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <span className="text-[11px] font-mono-tabular uppercase tracking-wider text-amber-400 font-bold">
                  Pravila sigurnosti u šumi
                </span>
                <h2 className="text-xl sm:text-2xl font-serif-display font-bold text-[#f2f6f3]">
                  gljivobook.app • Upozorenje o sigurnosti
                </h2>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0b110e] border border-[#25392c] text-xs sm:text-sm text-[#dce8e0] leading-relaxed space-y-2">
              <p>
                <strong className="text-amber-300">UPOZORENJE O SIGURNOSTI:</strong> Aplikacija{' '}
                <strong>gljivobook.app</strong> služi isključivo kao pomoćni terenski i edukativni
                priručnik. Niti jedna fotografija, vizualni ključ ili AI determinator ne mogu
                jamčiti 100% sigurnost niti zamijeniti pregled iskusnog determinatora uživo.
                Konzumacija samoniklih gljiva je na vlastitu odgovornost.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#889e90] px-1">
              <span>
                Centar za kontrolu otrovanja pri Institutu za medicinska istraživanja i medicinu rada (IMI):
              </span>
              <a
                href="tel:+38512348342"
                className="font-mono-tabular font-bold text-red-300 hover:text-red-200 whitespace-nowrap"
              >
                +385 1 2348 342
              </a>
            </div>

            <button
              type="button"
              onClick={handleAcceptDisclaimer}
              className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm font-semibold text-white inline-flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
            >
              <Check className="w-4 h-4" />
              Razumijem i prihvaćam pravila šume
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
