import React, { useEffect, useMemo, useState } from 'react';
import {
  Camera,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  ArrowRight,
  Trash2,
  WifiOff,
  ShieldCheck,
  Filter,
  Info,
  KeyRound,
  ExternalLink,
  Cpu,
  Eye,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react';
import { Mushroom } from '../types/mushroom';
import {
  DeterminationResult,
  evaluateVisibleTraitsMatch,
  FleshCutTrait,
  GrowsOnTrait,
  runLocalMycologicalDetermination,
  StemBaseTrait,
  UnderCapTrait,
  UploadedPhotoSlot,
  VisibleTraitsFilter,
} from '../services/offlineDeterminator';
import { MushroomImage } from './MushroomImage';

interface AIScannerViewProps {
  mushrooms: Mushroom[];
  onSelectMushroom: (mushroom: Mushroom) => void;
}

type ScannerEngineMode = 'local' | 'gemini';

const PHOTO_SLOTS = [
  {
    id: 0,
    title: '1. Klobuk',
    subtitle: 'Pogled odozgo',
    hint: 'Boja, kožica i rub klobuka',
  },
  {
    id: 1,
    title: '2. Odozdo',
    subtitle: 'Listići / spužva i prsten',
    hint: 'Himenij ispod klobuka i vjenčić',
  },
  {
    id: 2,
    title: '3. Prerez',
    subtitle: 'Uzdužni prerez i baza',
    hint: 'Od klobuka do dna baze stručka',
  },
];

const UNDER_CAP_OPTIONS: { id: UnderCapTrait; label: string }[] = [
  { id: 'listici', label: 'Listići' },
  { id: 'cjevcice', label: 'Cjevčice (spužva)' },
  { id: 'bodljice', label: 'Bodljice' },
  { id: 'trubasto', label: 'Trubasto' },
];

const GROWS_ON_OPTIONS: { id: GrowsOnTrait; label: string }[] = [
  { id: 'tlo', label: 'Tlu' },
  { id: 'panj_deblo', label: 'Panju ili deblu' },
];

const STEM_BASE_OPTIONS: { id: StemBaseTrait; label: string }[] = [
  { id: 'ima_vrecicu', label: 'Ima vrećicu (volvu)' },
  { id: 'nema_vrecice', label: 'Nema vrećice' },
];

const FLESH_CUT_OPTIONS: { id: FleshCutTrait; label: string }[] = [
  { id: 'mijenja_boju', label: 'Mijenja boju (plavi, crveni)' },
  { id: 'ne_mijenja', label: 'Ne mijenja' },
  { id: 'pusta_mlijeko', label: 'Pušta mlijeko' },
];

function renderSlotAngleSvg(slotIndex: number) {
  if (slotIndex === 0) {
    return (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="w-12 h-12 sm:w-14 sm:h-14 text-emerald-400 transition-transform group-hover:scale-105"
        aria-hidden="true"
      >
        <circle
          cx="32"
          cy="32"
          r="24"
          fill="#10b981"
          fillOpacity="0.12"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        <circle
          cx="32"
          cy="32"
          r="15"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeDasharray="3 3"
          strokeOpacity="0.7"
        />
        <circle
          cx="32"
          cy="32"
          r="5.5"
          fill="#10b981"
          fillOpacity="0.3"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <line x1="32" y1="8" x2="32" y2="14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="32" y1="50" x2="32" y2="56" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="8" y1="32" x2="14" y2="32" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="50" y1="32" x2="56" y2="32" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="22" cy="21" r="2" fill="#fbbf24" />
        <circle cx="42" cy="23" r="1.8" fill="#fbbf24" />
        <circle cx="24" cy="42" r="1.6" fill="#fbbf24" />
        <circle cx="40" cy="40" r="2" fill="#fbbf24" />
      </svg>
    );
  }

  if (slotIndex === 1) {
    return (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="w-12 h-12 sm:w-14 sm:h-14 text-emerald-400 transition-transform group-hover:scale-105"
        aria-hidden="true"
      >
        <path
          d="M10 24C12 11 22 7 32 7C42 7 52 11 54 24"
          fill="#10b981"
          fillOpacity="0.12"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <ellipse
          cx="32"
          cy="24"
          rx="22"
          ry="8.5"
          fill="#0b140f"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line x1="15" y1="22" x2="26" y2="24" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.75" />
        <line x1="21" y1="18" x2="28" y2="23" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.75" />
        <line x1="32" y1="15.5" x2="32" y2="22" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.75" />
        <line x1="43" y1="18" x2="36" y2="23" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.75" />
        <line x1="49" y1="22" x2="38" y2="24" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.75" />
        <path
          d="M27 25V53C27 55.5 29.2 57 32 57C34.8 57 37 55.5 37 53V25"
          fill="#10b981"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M23 36C26 39 38 39 41 36L39 42C35 44 29 44 25 42L23 36Z"
          fill="#fbbf24"
          fillOpacity="0.28"
          stroke="#fbbf24"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="w-12 h-12 sm:w-14 sm:h-14 text-emerald-400 transition-transform group-hover:scale-105"
      aria-hidden="true"
    >
      <path
        d="M11 24C11 13 20 7 32 7C44 7 53 13 53 24H37V45C39.5 47.2 41 50.2 40 53.5C39 56.5 35.8 58 32 58C28.2 58 25 56.5 24 53.5C23 50.2 24.5 47.2 27 45V24H11Z"
        fill="#10b981"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <line
        x1="32"
        y1="5"
        x2="32"
        y2="60"
        stroke="#fbbf24"
        strokeWidth="1.8"
        strokeDasharray="3.5 2.5"
      />
      <path
        d="M20 48C20 55 25 59 32 59C39 59 44 55 44 48"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const AIScannerView: React.FC<AIScannerViewProps> = ({ mushrooms, onSelectMushroom }) => {
  // Engine mode: 'local' (default, 100% free & offline, no API key needed) or 'gemini' (optional user-supplied temporary key)
  const [engineMode, setEngineMode] = useState<ScannerEngineMode>('local');
  const [sessionApiKey, setSessionApiKey] = useState<string>('');
  const [showApiKeyInfoModal, setShowApiKeyInfoModal] = useState<boolean>(false);
  const [showPreFilteredPreview, setShowPreFilteredPreview] = useState<boolean>(false);

  const [photos, setPhotos] = useState<(UploadedPhotoSlot | null)[]>([null, null, null]);
  const [activeMenuSlot, setActiveMenuSlot] = useState<number | null>(null);
  const [visibleTraits, setVisibleTraits] = useState<VisibleTraitsFilter>({
    underCap: 'ALL',
    growsOn: 'ALL',
    stemBase: 'ALL',
    fleshCut: 'ALL',
  });
  const [habitatNotes, setHabitatNotes] = useState('');
  const [smellNotes, setSmellNotes] = useState('');
  const [bruisingNotes, setBruisingNotes] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DeterminationResult | null>(null);
  const [usedEngineLabel, setUsedEngineLabel] = useState<string>('');

  // Ensure any old permanently stored keys from earlier prototypes are purged
  useEffect(() => {
    try {
      localStorage.removeItem('gljivobook_gemini_api_key');
    } catch {
      // Ignore
    }
  }, []);

  const hasActiveTraitFilters =
    visibleTraits.underCap !== 'ALL' ||
    visibleTraits.growsOn !== 'ALL' ||
    visibleTraits.stemBase !== 'ALL' ||
    visibleTraits.fleshCut !== 'ALL';

  const preFilteredSpecies = useMemo(() => {
    if (!hasActiveTraitFilters) return mushrooms;
    return mushrooms.filter((m) => evaluateVisibleTraitsMatch(m, visibleTraits).matchesAll);
  }, [mushrooms, visibleTraits, hasActiveTraitFilters]);

  const handleFileChange = (slotIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 1024;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        const compressedData = canvas.toDataURL('image/jpeg', 0.82);

        setPhotos((prev) => {
          const next = [...prev];
          next[slotIndex] = {
            slotIndex,
            slotLabel: PHOTO_SLOTS[slotIndex].title,
            data: compressedData,
            mimeType: 'image/jpeg',
          };
          return next;
        });
        setActiveMenuSlot(null);
        setError(null);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const removePhoto = (slotIndex: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPhotos((prev) => {
      const next = [...prev];
      next[slotIndex] = null;
      return next;
    });
    setActiveMenuSlot(null);
  };

  const handleAnalyze = async () => {
    const validPhotos = photos.filter((p): p is UploadedPhotoSlot => p !== null);
    const hasAnyInput =
      validPhotos.length > 0 ||
      hasActiveTraitFilters ||
      habitatNotes.trim().length > 0 ||
      smellNotes.trim().length > 0 ||
      bruisingNotes.trim().length > 0;

    if (!hasAnyInput) {
      setError(
        'Odaberite barem jedno obilježje u brzom filtru iznad ili dodajte fotografiju gljive.'
      );
      return;
    }

    // If user selected Google Gemini AI mode, verify they provided a temporary session key
    const trimmedUserKey = sessionApiKey.trim();
    if (engineMode === 'gemini' && !trimmedUserKey) {
      setError(
        'U aplikaciji nije trajno spremljen API ključ autora. Za Google Gemini AI dubinski skener privremeno unesite vlastiti Gemini API ključ u polje iznad (kliknite na ℹ️ Info gumb za upute kako ga besplatno preuzeti putem svog Google računa) ili koristite „🌲 Lokalni Mikološki Model (Bez API ključa)” koji radi odmah!'
      );
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      if (engineMode === 'gemini') {
        const catalogSummary = preFilteredSpecies
          .slice(0, 60)
          .map(
            (m) =>
              `- ID: "${m.id}" | Naziv: ${m.name} (${m.latin}) | Status: ${m.status} | Himenij: ${m.hymenium} | Rast: ${m.growth} | Prsten/ovoj: ${m.ring} | Mlijeko: ${m.latex} | Stanište: ${m.habitat}`
          )
          .join('\n');

        const promptText = `Ti si vrhunski hrvatski mikolog i determinator prema enciklopedijskom standardu prof. dr. sc. Romana Bošca.
Analiziraj priložene fotografije gljive (Klobuk, Odozdo/himenij, Uzdužni prerez i baza stručka) te terenske filtre koje je korisnik označio:
- Ispod klobuka: ${visibleTraits.underCap || 'ALL'}
- Raste na: ${visibleTraits.growsOn || 'ALL'}
- Dno stručka (volva): ${visibleTraits.stemBase || 'ALL'}
- Meso na prerezu: ${visibleTraits.fleshCut || 'ALL'}
- Stanište i drveće: ${habitatNotes || 'nije navedeno'}
- Miris gljive: ${smellNotes || 'nije navedeno'}
- Promjena boje mesa: ${bruisingNotes || 'nije navedeno'}

Suženi popis kandidata iz baze autohtonih vrsta Hrvatske (169 vrsta):
${catalogSummary}

Vrati isključivo čist JSON objekt (bez markdown oznaka) s poljima:
{
  "deadlyLookalikeAlert": "string upozorenje na smrtonosne dvojnike",
  "safetyVerdict": "string sigurnosna procjena",
  "morphologicalAnalysis": {
    "klobuk": "string",
    "himenij": "string",
    "strucakIbaza": "string",
    "opciDojam": "string"
  },
  "topMatches": [
    {
      "matchedId": "ID vrste iz popisa",
      "name": "Hrvatski naziv",
      "latin": "Latinski naziv",
      "confidence": 75,
      "status": "SAFE | WARN | DANGER",
      "keyTraitsObserved": "string",
      "criticalVerification": "string"
    }
  ]
}
Pouzdanost (confidence) nikada ne smije prelaziti 90% iz sigurnosnih razloga.`;

        const parts: any[] = validPhotos.map((p) => ({
          inline_data: {
            mime_type: p.mimeType || 'image/jpeg',
            data: p.data.includes(',') ? p.data.split(',')[1] : p.data,
          },
        }));
        parts.push({ text: promptText });

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(
          trimmedUserKey
        )}`;

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts }],
            generationConfig: {
              responseMimeType: 'application/json',
            },
          }),
        });

        const payload = await response.json();
        if (!response.ok) {
          throw new Error(
            payload?.error?.message ||
              'Google Gemini AI analiza nije uspjela. Provjerite je li uneseni API ključ ispravan ili prebacite na Lokalni mikološki model.'
          );
        }

        const rawJsonText =
          payload?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
        const cleanedJson = rawJsonText
          .replace(/^```json\s*/i, '')
          .replace(/```$/i, '')
          .trim();
        const parsed = JSON.parse(cleanedJson);

        if (Array.isArray(parsed.topMatches)) {
          parsed.topMatches = parsed.topMatches.slice(0, 3).map((m: any) => ({
            ...m,
            confidence: Math.min(90, Math.max(10, Math.round(Number(m.confidence) || 60))),
            status:
              m.status === 'SAFE' || m.status === 'WARN' || m.status === 'DANGER'
                ? m.status
                : 'WARN',
          }));
        }

        setResult(parsed as DeterminationResult);
        setUsedEngineLabel('Google Gemini AI Dubinski Skener (Vlastiti ključ sesije)');
      } else {
        const analysis = await runLocalMycologicalDetermination({
          photos,
          visibleTraits,
          habitatNotes,
          smellNotes,
          bruisingNotes,
          mushrooms,
        });
        setResult(analysis);
        setUsedEngineLabel('Lokalni Mikološki Model (Božac Offline Engine • Bez API ključa)');
      }
    } catch (err: any) {
      setError(err?.message || 'Greška pri analizi.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetScanner = () => {
    setPhotos([null, null, null]);
    setActiveMenuSlot(null);
    setVisibleTraits({
      underCap: 'ALL',
      growsOn: 'ALL',
      stemBase: 'ALL',
      fleshCut: 'ALL',
    });
    setHabitatNotes('');
    setSmellNotes('');
    setBruisingNotes('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & Dual Engine Selector (Local Model without API vs Optional User Google Gemini AI) */}
      <div className="rounded-2xl bg-[#121c16] border border-[#233529] p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-[11px] font-semibold text-emerald-300">
                <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
                Lokalni model radi 100% bez API ključa i offline
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0d1812] border border-[#263c2e] text-[11px] font-medium text-[#9bb0a2]">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Bez trajno spremljenog API ključa u aplikaciji
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif-display font-bold text-[#f2f6f3]">
              Terenski Mikološki Determinator &amp; AI Skener (3 kuta)
            </h2>
            <p className="text-xs sm:text-sm text-[#9bb0a2] max-w-3xl">
              Prvo označite obilježja koja vidite uživo (sužava 80% gljiva u 4 klika), pregledajte suženi izbor vrsta te pokrenite ugrađeni <strong>Lokalni mikološki model (bez API ključa)</strong> ili opcionalno povežite <strong>vlastiti Google Gemini API ključ</strong> za dubinsku AI analizu slike.
            </p>
          </div>
          {(result || hasActiveTraitFilters) && (
            <button
              type="button"
              onClick={resetScanner}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1c2b21] hover:bg-[#263a2d] text-xs sm:text-sm font-medium text-[#e2ece5] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Poništi sve
            </button>
          )}
        </div>

        {/* Engine Mode Switcher Tabs */}
        <div className="pt-2 border-t border-[#1e3024] space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => {
                setEngineMode('local');
                setError(null);
              }}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                engineMode === 'local'
                  ? 'bg-[#18291f] border-emerald-500 ring-1 ring-emerald-500/40'
                  : 'bg-[#0c140f] border-[#223428] hover:border-[#344f3d]'
              }`}
            >
              <Cpu className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#f2f6f3] flex items-center gap-2">
                  <span>🌲 Lokalni Mikološki Model (Zadano)</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-600 text-[10px] font-bold text-white">
                    BEZ API KLJUČA
                  </span>
                </div>
                <p className="text-[11px] text-[#9bb0a2] mt-1 leading-relaxed">
                  Radi odmah na svakom uređaju i u šumi bez interneta. Koristi 4 morfološka filtra + lokalnu spektralnu analizu boja i kontrasta s fotografija.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setEngineMode('gemini');
                setError(null);
              }}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                engineMode === 'gemini'
                  ? 'bg-[#18291f] border-amber-500 ring-1 ring-amber-500/40'
                  : 'bg-[#0c140f] border-[#223428] hover:border-[#344f3d]'
              }`}
            >
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#f2f6f3] flex items-center gap-2">
                  <span>✨ Google Gemini AI Skener</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-[10px] font-bold text-amber-300">
                    VLASTITI KLJUČ
                  </span>
                </div>
                <p className="text-[11px] text-[#9bb0a2] mt-1 leading-relaxed">
                  Dubinska AI vizualna analiza pomoću vašeg Google računa / vlastitog Gemini API ključa (bez trajnog spremanja ključa u aplikaciju).
                </p>
              </div>
            </button>
          </div>

          {/* Google Gemini AI Configuration Panel (only shown when 'gemini' mode is selected) */}
          {engineMode === 'gemini' && (
            <div className="rounded-xl bg-[#0c140f] border border-amber-500/40 p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <KeyRound className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#f2f6f3]">
                      Povezivanje s vašim Google Gemini API ključem (Samo za trenutnu sesiju)
                    </div>
                    <p className="text-[11px] text-[#9bb0a2]">
                      U aplikaciji nije ugrađen trajni API ključ autora. AI dubinski skener radi samo kada povežete svoj Google račun ili privremeno zalijepite vlastiti besplatni Gemini API ključ.
                    </p>
                  </div>
                </div>

                {/* Info Button explaining how to get a free Gemini API key */}
                <button
                  type="button"
                  onClick={() => setShowApiKeyInfoModal(!showApiKeyInfoModal)}
                  className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-[#18291f] hover:bg-[#22382b] border border-amber-500/45 text-xs font-semibold text-amber-300 inline-flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors"
                >
                  <Info className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Kako do besplatnog Gemini API ključa?</span>
                </button>
              </div>

              {/* Step-by-step Info Box on how to get a Gemini API key with a Google Account */}
              {showApiKeyInfoModal && (
                <div className="p-4 rounded-xl bg-[#121e16] border border-emerald-500/40 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-emerald-400 uppercase tracking-wider">
                      ℹ️ Upute: Kako besplatno preuzeti svoj Google Gemini API ključ u 30 sekundi
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowApiKeyInfoModal(false)}
                      className="p-1 rounded-lg bg-[#18291f] text-[#9bb0a2] hover:text-white cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-[#d6e3da] leading-relaxed">
                    <li>
                      Otvorite službenu Google stranicu:{' '}
                      <a
                        href="https://aistudio.google.com/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 underline font-semibold inline-flex items-center gap-1"
                      >
                        aistudio.google.com/apikey <ExternalLink className="w-3 h-3" />
                      </a>{' '}
                      i prijavite se svojim standardnim <strong>Google (Gmail) računom</strong>.
                    </li>
                    <li>
                      Kliknite na plavi gumb <strong>„Create API key”</strong> (Izradi API ključ). Google za osobnu upotrebu nudi besplatni paket (Free Tier).
                    </li>
                    <li>
                      Kopirajte generirani niz znakova (počinje s <code className="px-1.5 py-0.5 rounded bg-[#0b130e] text-amber-300">AIza...</code>) i zalijepite ga u polje ispod.
                    </li>
                    <li>
                      <strong>100% privatno i bez trajnog spremanja:</strong> Ključ se drži isključivo u radnoj memoriji dok vam je stranica otvorena i automatski se briše zatvaranjem kartice.
                    </li>
                  </ol>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center">
                <div className="md:col-span-8 flex items-center gap-2">
                  <input
                    type="password"
                    value={sessionApiKey}
                    onChange={(e) => setSessionApiKey(e.target.value)}
                    placeholder="Privremeno zalijepite svoj Gemini API ključ (AIza...)"
                    className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#121e16] border border-[#2a4233] text-xs sm:text-sm text-[#f2f6f3] placeholder-[#6e8476] focus:outline-none focus:border-amber-500"
                  />
                  {sessionApiKey && (
                    <button
                      type="button"
                      onClick={() => setSessionApiKey('')}
                      className="min-h-[42px] px-3 py-2 rounded-xl bg-red-950/50 hover:bg-red-900/60 border border-red-800/50 text-xs font-semibold text-red-200 shrink-0 cursor-pointer"
                      title="Odmah ukloni ključ iz radne memorije"
                    >
                      Obriši
                    </button>
                  )}
                </div>

                <div className="md:col-span-4 flex flex-wrap items-center gap-2">
                  <a
                    href="https://aistudio.google.com/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#18291f] hover:bg-[#223a2c] border border-emerald-500/40 text-xs font-semibold text-emerald-300 inline-flex items-center justify-center gap-1.5 transition-colors"
                    title="Prijavite se Google računom i preuzmite svoj besplatni Gemini API ključ"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Preuzmi ključ (Google račun)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* KORAK PRIJE KAMERE: Brzi morfološki filtar („Obilježja koja vidiš”) + Suženi pregled vrsta */}
      <div className="rounded-2xl bg-[#121c16] border border-[#233529] p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-400 shrink-0" />
            <h3 className="text-sm sm:text-base font-serif-display font-bold text-[#f2f6f3]">
              Obilježja koja vidiš (Brzi morfološki filtar prije kamere)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-[#0c140f] border border-[#24382b] text-xs font-mono-tabular font-semibold text-emerald-400">
              Suženi izbor: {preFilteredSpecies.length} / {mushrooms.length} vrsta
            </span>
            <button
              type="button"
              onClick={() => setShowPreFilteredPreview(!showPreFilteredPreview)}
              className="min-h-[32px] px-3 py-1 rounded-lg bg-[#18291f] hover:bg-[#223a2c] border border-emerald-500/40 text-xs font-semibold text-emerald-300 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {showPreFilteredPreview
                  ? 'Sakrij sužene vrste'
                  : `Pregledaj sužene vrste (${preFilteredSpecies.length})`}
              </span>
              {showPreFilteredPreview ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. Ispod klobuka: Listići / Cjevčice (spužva) / Bodljice / Trubasto */}
          <div className="p-3.5 rounded-xl bg-[#0c130f] border border-[#1e2f24] space-y-2">
            <div className="text-xs font-semibold text-[#9bb0a2]">
              1. Ispod klobuka:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {UNDER_CAP_OPTIONS.map((opt) => {
                const active = visibleTraits.underCap === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() =>
                      setVisibleTraits((prev) => ({
                        ...prev,
                        underCap: prev.underCap === opt.id ? 'ALL' : opt.id,
                      }))
                    }
                    className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      active
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-[#15231a] hover:bg-[#1e3225] border border-[#263c2e] text-[#e2ece5]'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Raste na: Tlu / Panju ili deblu */}
          <div className="p-3.5 rounded-xl bg-[#0c130f] border border-[#1e2f24] space-y-2">
            <div className="text-xs font-semibold text-[#9bb0a2]">
              2. Raste na:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {GROWS_ON_OPTIONS.map((opt) => {
                const active = visibleTraits.growsOn === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() =>
                      setVisibleTraits((prev) => ({
                        ...prev,
                        growsOn: prev.growsOn === opt.id ? 'ALL' : opt.id,
                      }))
                    }
                    className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      active
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-[#15231a] hover:bg-[#1e3225] border border-[#263c2e] text-[#e2ece5]'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Dno stručka: Ima vrećicu (volvu) / Nema vrećice */}
          <div className="p-3.5 rounded-xl bg-[#0c130f] border border-[#1e2f24] space-y-2">
            <div className="text-xs font-semibold text-[#9bb0a2]">
              3. Dno stručka:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {STEM_BASE_OPTIONS.map((opt) => {
                const active = visibleTraits.stemBase === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() =>
                      setVisibleTraits((prev) => ({
                        ...prev,
                        stemBase: prev.stemBase === opt.id ? 'ALL' : opt.id,
                      }))
                    }
                    className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      active
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-[#15231a] hover:bg-[#1e3225] border border-[#263c2e] text-[#e2ece5]'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Meso na prerezu: Mijenja boju (plavi, crveni) / Ne mijenja / Pušta mlijeko */}
          <div className="p-3.5 rounded-xl bg-[#0c130f] border border-[#1e2f24] space-y-2">
            <div className="text-xs font-semibold text-[#9bb0a2]">
              4. Meso na prerezu:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {FLESH_CUT_OPTIONS.map((opt) => {
                const active = visibleTraits.fleshCut === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() =>
                      setVisibleTraits((prev) => ({
                        ...prev,
                        fleshCut: prev.fleshCut === opt.id ? 'ALL' : opt.id,
                      }))
                    }
                    className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      active
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-[#15231a] hover:bg-[#1e3225] border border-[#263c2e] text-[#e2ece5]'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Instant Preview Grid of Pre-Filtered Candidate Species */}
        {showPreFilteredPreview && (
          <div className="pt-3 border-t border-[#1e3024] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#9bb0a2]">
              <span>
                Izravni pregled suženih kandidata prema označenim morfološkim obilježjima (prikazano prvih{' '}
                {Math.min(12, preFilteredSpecies.length)} od {preFilteredSpecies.length}):
              </span>
            </div>
            {preFilteredSpecies.length === 0 ? (
              <div className="p-4 rounded-xl bg-[#0c140f] border border-[#223428] text-xs text-[#9bb0a2]">
                Niti jedna vrsta u bazi ne odgovara ovoj kombinaciji svih 4 obilježja. Pokušajte isključiti jedno obilježje.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {preFilteredSpecies.slice(0, 12).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => onSelectMushroom(m)}
                    className="p-2.5 rounded-xl bg-[#0c140f] hover:bg-[#16241b] border border-[#223428] text-left transition-colors cursor-pointer flex items-center gap-2.5"
                  >
                    <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-[#263c2e]">
                      <MushroomImage mushroom={m} className="w-full h-full" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#f2f6f3] truncate">
                        {m.name}
                      </div>
                      <div className="text-[10px] italic text-[#889e90] truncate">
                        {m.latin}
                      </div>
                      <div
                        className={`text-[10px] font-semibold mt-0.5 ${
                          m.status === 'DANGER'
                            ? 'text-red-400'
                            : m.status === 'WARN'
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {m.status === 'DANGER'
                          ? '🔴 Otrovna'
                          : m.status === 'WARN'
                          ? '🟡 Uvjetno'
                          : '🟢 Jestiva'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3-Angle Photo Upload Grid — Always 1 Horizontal Row (grid-cols-3) */}
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
          {PHOTO_SLOTS.map((slot, idx) => {
            const uploaded = photos[idx];
            const isMenuOpen = activeMenuSlot === idx;

            return (
              <div
                key={slot.id}
                onClick={() => setActiveMenuSlot(isMenuOpen ? null : idx)}
                className={`group relative rounded-2xl border transition-all cursor-pointer overflow-hidden flex flex-col justify-between min-h-[175px] sm:min-h-[215px] ${
                  uploaded
                    ? 'bg-[#0e1712] border-emerald-500/60 shadow-md'
                    : isMenuOpen
                    ? 'bg-[#16261d] border-emerald-400 ring-2 ring-emerald-500/30'
                    : 'bg-[#121c16] hover:bg-[#16231b] border-[#263c2e] hover:border-emerald-500/50'
                }`}
              >
                {uploaded ? (
                  <>
                    <img
                      src={uploaded.data}
                      alt={slot.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/50" />

                    <div className="relative z-10 p-2 sm:p-3 flex items-center justify-between gap-1">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-600/95 text-[10px] sm:text-xs font-bold text-white shadow-sm">
                        ✓ Snimljeno
                      </span>
                      <button
                        type="button"
                        onClick={(e) => removePhoto(idx, e)}
                        title="Obriši fotografiju"
                        aria-label={`Obriši fotografiju za ${slot.title}`}
                        className="min-h-[30px] min-w-[30px] sm:min-h-[34px] sm:min-w-[34px] rounded-lg bg-black/75 hover:bg-red-900/90 text-white flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>

                    <div className="relative z-10 p-2.5 sm:p-3.5 text-left">
                      <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                        {slot.title}
                      </div>
                      <div className="text-[10px] sm:text-xs text-emerald-300 font-medium mt-0.5">
                        Klikni za zamjenu slike
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-3 sm:p-4 flex-1 flex flex-col items-center justify-between text-center">
                    <div className="w-full">
                      <div className="text-xs sm:text-sm font-bold text-[#f2f6f3] leading-tight">
                        {slot.title}
                      </div>
                      <div className="text-[10px] sm:text-xs text-[#889e90] mt-0.5 line-clamp-1">
                        {slot.subtitle}
                      </div>
                    </div>

                    <div className="my-2 sm:my-3 flex items-center justify-center">
                      {renderSlotAngleSvg(idx)}
                    </div>

                    <div className="w-full">
                      <span className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-lg bg-[#192a20] group-hover:bg-emerald-600/25 border border-[#2b4434] text-[10px] sm:text-xs font-semibold text-emerald-300 transition-colors">
                        <Camera className="w-3 h-3 shrink-0" />
                        <span>Dodaj sliku</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Capture Menu */}
        {activeMenuSlot !== null && (
          <div className="rounded-2xl bg-[#14221a] border border-emerald-500/50 p-3.5 sm:p-4 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#f2f6f3]">
                Odabir fotografije — {PHOTO_SLOTS[activeMenuSlot].title} ({PHOTO_SLOTS[activeMenuSlot].subtitle})
              </div>
              <div className="text-xs text-[#9bb0a2]">
                {PHOTO_SLOTS[activeMenuSlot].hint}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <label className="flex-1 sm:flex-initial min-h-[42px] px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm">
                <span>📷 Uslikaj kamerom</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={(e) => handleFileChange(activeMenuSlot, e)}
                  className="hidden"
                />
              </label>

              <label className="flex-1 sm:flex-initial min-h-[42px] px-4 py-2 rounded-xl bg-[#1c2e23] hover:bg-[#263f30] border border-[#2f4b39] text-xs font-semibold text-[#e2ece5] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer">
                <span>🖼️ Odaberi iz galerije</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(activeMenuSlot, e)}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => setActiveMenuSlot(null)}
                className="min-h-[42px] px-3 py-2 rounded-xl bg-[#0e1712] hover:bg-[#19281f] text-xs font-semibold text-[#9bb0a2] hover:text-white transition-colors cursor-pointer"
              >
                Zatvori
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Field Observations Form */}
      <div className="rounded-2xl bg-[#121c16] border border-[#233529] p-5 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-[#e6f0e9] mb-1">
            Dodatna terenska zapažanja (stanište, miris i prerez)
          </h3>
          <p className="text-xs text-[#889e90]">
            Opcionalne bilješke za još precizniju determinaciju prema ključu prof. dr. sc. Romana Bošca.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-[#9bb0a2] mb-1.5">
              Stanište i drveće u blizini
            </label>
            <input
              type="text"
              value={habitatNotes}
              onChange={(e) => setHabitatNotes(e.target.value)}
              placeholder="npr. bukva, hrast, smreka, livada, na panju..."
              className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0b110e] border border-[#263a2d] text-sm text-[#f2f6f3] placeholder-[#5c7465] focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs text-[#9bb0a2] mb-1.5">
              Miris gljive
            </label>
            <input
              type="text"
              value={smellNotes}
              onChange={(e) => setSmellNotes(e.target.value)}
              placeholder="npr. na anis, brašno, krumpir, tintu, marelicu..."
              className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0b110e] border border-[#263a2d] text-sm text-[#f2f6f3] placeholder-[#5c7465] focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs text-[#9bb0a2] mb-1.5">
              Promjena boje mesa na prerezu
            </label>
            <input
              type="text"
              value={bruisingNotes}
              onChange={(e) => setBruisingNotes(e.target.value)}
              placeholder="npr. poplavi, pocrveni, žuto u dnu, bijelo..."
              className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0b110e] border border-[#263a2d] text-sm text-[#f2f6f3] placeholder-[#5c7465] focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-800/60 text-sm text-red-200 flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs text-[#889e90]">
            {engineMode === 'local'
              ? `Aktivan način: 🌲 Lokalni Mikološki Model (bez API ključa, uspoređuje ${preFilteredSpecies.length} kandidata).`
              : `Aktivan način: ✨ Google Gemini AI Dubinski Skener (koristi isključivo vaš privremeni ključ sesije).`}
          </p>
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="min-h-[48px] px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-sm font-semibold text-white inline-flex items-center justify-center gap-2.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            {isAnalyzing
              ? 'Mikološka analiza u tijeku...'
              : engineMode === 'gemini'
              ? 'Pokreni Google Gemini AI analizu'
              : 'Pokreni lokalnu determinaciju (Bez API-ja)'}
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {result && (
        <div className="space-y-5">
          {/* Engine Attribution Pill */}
          {usedEngineLabel && (
            <div className="px-3.5 py-2 rounded-xl bg-[#18291f] border border-emerald-500/40 text-xs font-mono-tabular text-emerald-300 flex items-center justify-between gap-2">
              <span>IZVOR ANALIZE: {usedEngineLabel}</span>
              <span>Suženo iz {preFilteredSpecies.length} vrsta</span>
            </div>
          )}

          {/* Deadly Lookalike Warning Banner */}
          <div className="rounded-2xl bg-red-950/40 border border-red-800/60 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-red-200">
                  Sigurnosno upozorenje na dvojnike i provjeru baze stručka
                </h3>
                <p className="text-sm text-red-100/90 mt-1">{result.deadlyLookalikeAlert}</p>
                <p className="text-xs text-red-300/80 mt-2">{result.safetyVerdict}</p>
              </div>
            </div>
          </div>

          {/* Morphological Breakdown */}
          <div className="rounded-2xl bg-[#121c16] border border-[#233529] p-5">
            <h3 className="text-base font-serif-display font-bold text-[#f2f6f3] mb-3">
              Morfološka raščlamba sa fotografija i terenskih unosa
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-3.5 rounded-xl bg-[#0c130f] border border-[#1d2d22]">
                <div className="text-xs font-semibold text-[#889e90] mb-1">Klobuk</div>
                <div className="text-[#e2ece5]">{result.morphologicalAnalysis.klobuk}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0c130f] border border-[#1d2d22]">
                <div className="text-xs font-semibold text-[#889e90] mb-1">Himenij (ispod klobuka)</div>
                <div className="text-[#e2ece5]">{result.morphologicalAnalysis.himenij}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0c130f] border border-[#1d2d22]">
                <div className="text-xs font-semibold text-[#889e90] mb-1">Stručak i dno (baza)</div>
                <div className="text-[#e2ece5]">{result.morphologicalAnalysis.strucakIbaza}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0c130f] border border-[#1d2d22]">
                <div className="text-xs font-semibold text-[#889e90] mb-1">Taksonomski zaključak</div>
                <div className="text-[#e2ece5]">{result.morphologicalAnalysis.opciDojam}</div>
              </div>
            </div>
          </div>

          {/* Top Matches */}
          <div className="space-y-3">
            <h3 className="text-base font-serif-display font-bold text-[#f2f6f3]">
              Najbliža podudaranja u bazi ({result.topMatches.length})
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {result.topMatches.map((match, idx) => {
                const rawMatchedId = (match.matchedId || '').trim().toLowerCase();
                const cleanLatin = (match.latin || '')
                  .trim()
                  .split(/\s+/)
                  .slice(0, 2)
                  .join(' ');
                const latinName = cleanLatin || match.latin || match.name;

                const catalogMushroom = mushrooms.find((m) => {
                  if (rawMatchedId && m.id.toLowerCase() === rawMatchedId) return true;
                  if (
                    cleanLatin &&
                    cleanLatin.includes(' ') &&
                    m.latin.toLowerCase().startsWith(cleanLatin.toLowerCase())
                  ) {
                    return true;
                  }
                  return false;
                });

                const cappedConfidence = Math.min(
                  90,
                  Math.max(1, Math.round(Number(match.confidence) || 50))
                );

                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-[#121c16] border border-[#233529] p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs text-[#9bb0a2] mb-2">
                        <span className="font-mono-tabular font-semibold text-emerald-400">
                          Podudarnost: {cappedConfidence}% (maks. 90%)
                        </span>
                        <span>·</span>
                        <span
                          className={
                            match.status === 'DANGER'
                              ? 'text-red-400 font-semibold'
                              : match.status === 'WARN'
                              ? 'text-amber-400 font-semibold'
                              : 'text-emerald-400 font-semibold'
                          }
                        >
                          {match.status === 'DANGER'
                            ? 'Otrovna / Smrtonosna'
                            : match.status === 'WARN'
                            ? 'Uvjetno jestiva'
                            : 'Jestiva vrsta'}
                        </span>
                      </div>

                      <h4 className="text-lg font-serif-display font-bold text-[#f2f6f3]">
                        {match.name}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 mt-0.5 mb-3">
                        <p className="text-xs italic text-[#889e90]">{match.latin}</p>
                      </div>

                      <div className="space-y-2.5 text-xs">
                        <div>
                          <span className="font-semibold text-[#c5d6cb]">Uočene značajke: </span>
                          <span className="text-[#9bb0a2]">{match.keyTraitsObserved}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#0b110e] border border-[#1f3025]">
                          <span className="font-semibold text-amber-300 block mb-0.5">
                            Obavezna terenska provjera u šumi:
                          </span>
                          <span className="text-[#d6e3da]">{match.criticalVerification}</span>
                        </div>
                      </div>
                    </div>

                    {catalogMushroom ? (
                      <button
                        type="button"
                        onClick={() => onSelectMushroom(catalogMushroom)}
                        className="mt-4 w-full min-h-[44px] px-4 py-2 rounded-xl bg-[#1c2d22] hover:bg-[#263d2e] text-xs font-semibold text-[#e6f0e9] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Otvori karticu vrste i dvojnike
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <div className="mt-4 pt-3 border-t border-[#1e3024] space-y-2">
                        <div className="text-[11px] font-medium text-[#889e90]">
                          Vanjske mikološke baze za <em>{latinName}</em>:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <a
                            href={`https://www.inaturalist.org/search?q=${encodeURIComponent(latinName)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-h-[38px] px-3 py-1.5 rounded-xl bg-[#16271d] hover:bg-[#203829] border border-[#284433] text-xs font-semibold text-emerald-300 inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                          >
                            🌿 iNaturalist opažanja
                          </a>
                          <a
                            href={`https://en.wikipedia.org/wiki/${encodeURIComponent(latinName.replace(/ /g, '_'))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-h-[38px] px-3 py-1.5 rounded-xl bg-[#16271d] hover:bg-[#203829] border border-[#284433] text-xs font-semibold text-[#e2ece5] inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                          >
                            📖 Wikipedija članak
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
