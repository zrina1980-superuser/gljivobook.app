import React, { useRef, useState } from 'react';
import {
  Search,
  Download,
  Plus,
  X,
  ArrowRight,
  Mic,
  MicOff,
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
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Trees,
} from 'lucide-react';
import {
  EdibilityStatus,
  HymeniumType,
  Mushroom,
  RegionId,
  TreeFilterId,
} from '../types/mushroom';
import { MushroomImage } from './MushroomImage';
import {
  calculateAstronomicalSunset,
  getSeasonalForestHazard,
  MushroomForecastResult,
} from '../services/weatherService';

export type StatusFilter = 'ALL' | EdibilityStatus | 'MEDICINAL';

export interface SeasonalWarningConfig {
  months: number[]; // 0 - 11
  text: string;
  buttonLabel: string;
  searchQuery: string;
}

export const SEASONAL_WARNINGS: SeasonalWarningConfig[] = [
  {
    months: [2, 3], // Ožujak / Travanj
    text: 'Oprez pri berbi ranih smrčaka! Smrtonosna moždanica (Gyromitra esculenta) sadrži termolabilni otrov giromitrin i ima moždano naboran, a ne saćasti klobuk.',
    buttonLabel: '🔍 Pogledaj: Moždanica',
    searchQuery: 'Moždanica',
  },
  {
    months: [4, 5], // Svibanj / Lipanj
    text: 'Oprez pri berbi livadnih pečurki (šampinjona)! Mlade zelene pupavke imaju bijele listiće i ovoj u dnu gomolja. Nikada ne beri nerazvijene gljive.',
    buttonLabel: '🔍 Pogledaj: Zelena pupavka',
    searchQuery: 'Zelena pupavka',
  },
  {
    months: [6, 7], // Srpanj / Kolovoz
    text: 'Sezona je biserki. Obavezno provjeri narebranost vjenčića i crvenjenje mesa kako ne bi došlo do kobne zamjene s panterovom muharom!',
    buttonLabel: '🔍 Pogledaj: Panterova muhara',
    searchQuery: 'Panterova muhara',
  },
  {
    months: [8, 9], // Rujan / Listopad
    text: 'Male sunčanice su u sezoni. Beri samo sunčanice s klobukom većim od 10 cm i pomičnim dvostrukim prstenom. Pazi na smrtno otrovne štitarke!',
    buttonLabel: '🔍 Pogledaj: Štitarke',
    searchQuery: 'Štitarka',
  },
  {
    months: [10, 11, 0, 1], // Studeni do Veljače
    text: 'Oprez pri berbi zimskih panjevčica i bukovača na panjevima! Smrtonosna rebrasta patuljica (Galerina marginata) raste na istom drvetu i sadrži amatoksin.',
    buttonLabel: '🔍 Pogledaj: Rebrasta patuljica',
    searchQuery: 'Rebrasta patuljica',
  },
];

export const TREE_FILTER_OPTIONS: { id: TreeFilterId; label: string }[] = [
  { id: 'ALL', label: 'Sva stabla' },
  { id: 'bukva', label: 'Bukva' },
  { id: 'hrast', label: 'Hrast' },
  { id: 'smreka', label: 'Smreka' },
  { id: 'jela', label: 'Jela' },
  { id: 'bor', label: 'Bor' },
  { id: 'breza', label: 'Breza' },
];

/**
 * Checks whether a mushroom species grows beneath or in mycorrhizal/saprotrophic association
 * with the selected tree species based on its habitat, summary, and name.
 */
export function matchesTreeFilter(mushroom: Mushroom, treeFilter: TreeFilterId): boolean {
  if (treeFilter === 'ALL') return true;

  const combined = `${mushroom.habitat} ${mushroom.shortSummary} ${mushroom.name}`
    .toLowerCase()
    .replace(/č|ć/g, 'c')
    .replace(/š/g, 's')
    .replace(/ž/g, 'z')
    .replace(/đ/g, 'd');

  const isAllForests = combined.includes('sve sume') || combined.includes('svim sumama');

  switch (treeFilter) {
    case 'bukva':
      return (
        combined.includes('bukv') ||
        combined.includes('bjelogoric') ||
        combined.includes('listopadn') ||
        isAllForests
      );
    case 'hrast':
      return (
        combined.includes('hrast') ||
        combined.includes('medunc') ||
        combined.includes('cer') ||
        combined.includes('crnik') ||
        combined.includes('kesten') ||
        combined.includes('bjelogoric') ||
        combined.includes('listopadn') ||
        isAllForests
      );
    case 'smreka':
      return (
        combined.includes('smrek') ||
        combined.includes('crnogoric') ||
        combined.includes('cetinjac') ||
        isAllForests
      );
    case 'jela':
      return (
        /(^|[^a-z])jel(a|e|i|u|om|ov|ama|ovim)/.test(combined) ||
        combined.includes('crnogoric') ||
        combined.includes('cetinjac') ||
        isAllForests
      );
    case 'bor':
      return (
        /(^|[^a-z])bor(a|u|om|ovi|ova|ovima|ov|ik|$)/.test(combined) ||
        combined.includes('crnogoric') ||
        combined.includes('cetinjac')
      );
    case 'breza':
      return (
        combined.includes('brez') ||
        combined.includes('trepetljik') ||
        combined.includes('topol') ||
        combined.includes('jasik')
      );
    default:
      return true;
  }
}

interface EncyclopediaViewProps {
  regionOptions: { id: RegionId | 'ALL'; label: string }[];
  regionFilter: RegionId | 'ALL';
  onSelectRegion: (region: RegionId | 'ALL') => void;
  treeFilter: TreeFilterId;
  onSelectTreeFilter: (tree: TreeFilterId) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  isVoiceListening: boolean;
  voiceStatusMessage: string | null;
  onStartVoiceSearch: () => void;
  isPreloading: boolean;
  preloadProgress: { loaded: number; total: number } | null;
  cachedCount: number;
  totalMushroomsCount: number;
  onPreloadOffline: () => void;
  onOpenAddSpecies: () => void;
  activeThisMonthOnly: boolean;
  onToggleActiveThisMonth: () => void;
  currentMonthLabel: string;
  statusFilter: StatusFilter;
  onSelectStatusFilter: (status: StatusFilter) => void;
  counts: {
    total: number;
    safe: number;
    warn: number;
    danger: number;
    medicinal: number;
    activeThisMonth: number;
  };
  forecast: MushroomForecastResult | null;
  isForecastLoading: boolean;
  forecastExpanded: boolean;
  onToggleForecastExpanded: () => void;
  isLocatingGps: boolean;
  onRequestGpsForecast: () => void;
  filteredMushrooms: Mushroom[];
  visibleMushrooms: Mushroom[];
  visibleCount: number;
  pageSize: number;
  onLoadMore: () => void;
  loadMoreSentinelRef: React.RefObject<HTMLDivElement | null>;
  onResetFilters: () => void;
  onOpenMushroomModal: (id: string) => void;
  onOpenAndFocusLookalikes: (id: string, e?: React.MouseEvent) => void;
  hymeniumLabels: Record<HymeniumType, string>;
  formatDiscreetRef: (ref: string) => string;
  accessibilityMode?: 'normal' | 'large' | 'high-contrast';
  sortMode?: 'favorites' | 'az';
  onChangeSortMode?: (mode: 'favorites' | 'az') => void;
}

export const EncyclopediaView: React.FC<EncyclopediaViewProps> = ({
  regionOptions,
  regionFilter,
  onSelectRegion,
  treeFilter,
  onSelectTreeFilter,
  searchQuery,
  onSearchChange,
  searchInputRef,
  isVoiceListening,
  voiceStatusMessage,
  onStartVoiceSearch,
  isPreloading,
  preloadProgress,
  cachedCount,
  totalMushroomsCount,
  onPreloadOffline,
  onOpenAddSpecies,
  activeThisMonthOnly,
  onToggleActiveThisMonth,
  currentMonthLabel,
  statusFilter,
  onSelectStatusFilter,
  counts,
  forecast,
  isForecastLoading,
  forecastExpanded,
  onToggleForecastExpanded,
  isLocatingGps,
  onRequestGpsForecast,
  filteredMushrooms,
  visibleMushrooms,
  visibleCount,
  pageSize,
  onLoadMore,
  loadMoreSentinelRef,
  onResetFilters,
  onOpenMushroomModal,
  onOpenAndFocusLookalikes,
  hymeniumLabels,
  formatDiscreetRef,
  accessibilityMode = 'normal',
  sortMode = 'favorites',
  onChangeSortMode,
}) => {
  const speciesListRef = useRef<HTMLDivElement | null>(null);
  const now = new Date();
  const currentMonth = now.getMonth(); // 0 - 11
  const dismissedWarningStorageKey = `gljivobook_dismissed_warning_${currentMonth}`;

  const activeWarning =
    SEASONAL_WARNINGS.find((item) => item.months.includes(currentMonth)) ||
    SEASONAL_WARNINGS[3];

  const [weeklyWarningDismissed, setWeeklyWarningDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(dismissedWarningStorageKey) === 'true';
    } catch {
      return false;
    }
  });

  const handleDismissWeeklyWarning = () => {
    setWeeklyWarningDismissed(true);
    try {
      localStorage.setItem(dismissedWarningStorageKey, 'true');
    } catch {
      // Ignore storage errors
    }
  };

  const handleSelectWarningSpecies = () => {
    if (statusFilter !== 'ALL') {
      onSelectStatusFilter('ALL');
    }
    if (treeFilter !== 'ALL') {
      onSelectTreeFilter('ALL');
    }
    if (activeThisMonthOnly) {
      onToggleActiveThisMonth();
    }
    onSearchChange(activeWarning.searchQuery);
    setTimeout(() => {
      speciesListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const seasonalHazard = getSeasonalForestHazard(now);

  const dynamicSunsetTime =
    forecast?.sunsetTime ||
    calculateAstronomicalSunset(
      forecast?.latitude ?? 45.885,
      forecast?.longitude ?? 15.955,
      now
    );

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
    <div className="space-y-4">
      <section className="space-y-2.5">
        {/* Horizontal Regional Filter Strip directly below header */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#121c16] border border-[#223428] rounded-xl overflow-x-auto">
          {regionOptions.map((reg) => {
            const isActive = regionFilter === reg.id;
            return (
              <button
                key={reg.id}
                type="button"
                onClick={() => onSelectRegion(reg.id)}
                className={`min-h-[36px] px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-[#9bb0a2] hover:text-[#f2f6f3] hover:bg-[#18261e]'
                }`}
              >
                {reg.label}
              </button>
            );
          })}
        </div>

        {/* Collapsible Weekly Warning Card ("⚠️ Upozorenje tjedna") above the Search Bar */}
        {!weeklyWarningDismissed && (
          <div className="rounded-xl bg-[#142018] border border-amber-500/35 px-3.5 py-2.5 flex items-start justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2 text-[#e6f0e9] leading-relaxed">
              <span className="font-bold text-amber-300 whitespace-nowrap shrink-0">
                ⚠️ Upozorenje tjedna:
              </span>
              <span className="text-[#d6e3da]">{activeWarning.text}</span>
              <button
                type="button"
                onClick={handleSelectWarningSpecies}
                className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-200 font-semibold text-[11px] inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
              >
                {activeWarning.buttonLabel}
              </button>
            </div>
            <button
              type="button"
              onClick={handleDismissWeeklyWarning}
              title="Zatvori sezonsko upozorenje za ovaj mjesec"
              aria-label="Zatvori upozorenje tjedna"
              className="min-h-[26px] min-w-[26px] rounded-lg text-[#9bb0a2] hover:text-white hover:bg-[#1e3125] flex items-center justify-center text-xs font-bold transition-colors cursor-pointer shrink-0"
            >
              ✕
            </button>
          </div>
        )}

        {/* Search Bar + Discreet Offline Badge + Add Species Button */}
        <div className="flex flex-col md:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#6d8777] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Pretraži gljive (npr. vrganj, jurček, dedek, kozarka, lisička, bumbak)..."
              className="w-full min-h-[46px] pl-11 pr-20 py-2 rounded-xl bg-[#121c16] border border-[#233529] text-sm text-[#f2f6f3] placeholder-[#688071] focus:outline-none focus:border-emerald-500"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  title="Očisti pretragu"
                  className="p-1.5 text-[#889e90] hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={onStartVoiceSearch}
                title="Glasovna pretraga gljiva (hr-HR)"
                className={`min-h-[34px] min-w-[34px] rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                  isVoiceListening
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-[#1a2b20] hover:bg-[#233a2c] text-emerald-400'
                }`}
              >
                {isVoiceListening ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Discreet minimized Offline cache badge */}
            <button
              type="button"
              onClick={onPreloadOffline}
              title="Terenska Offline baza fotografija — klikni za preuzimanje svih slika"
              className="min-h-[46px] px-3 py-2 rounded-xl bg-[#121c16] hover:bg-[#19281f] border border-[#223428] text-[11px] font-mono-tabular text-[#9bb0a2] hover:text-emerald-300 inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>
                {isPreloading && preloadProgress
                  ? `Offline ${preloadProgress.loaded}/${preloadProgress.total}`
                  : `Offline ${cachedCount}/${totalMushroomsCount}`}
              </span>
            </button>

            <button
              type="button"
              onClick={onOpenAddSpecies}
              className="min-h-[46px] px-3.5 py-2 rounded-xl bg-[#16241b] hover:bg-[#1f3326] border border-[#263c2e] text-xs font-semibold text-[#e2ece5] inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Dodaj vrstu</span>
            </button>
          </div>
        </div>
        {voiceStatusMessage && (
          <p className="text-xs text-amber-300 px-1">{voiceStatusMessage}</p>
        )}

        {/* Minimalist, single-line status bar directly below the search bar (neutral style without thick border) */}
        <div className="px-2 py-1 text-xs text-[#9bb0a2] flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <span>
            🌅 Zalazak u <strong className="font-mono-tabular text-[#d6e3da] font-semibold">{dynamicSunsetTime}</strong> • {seasonalHazard}
          </span>
        </div>

        {/* Tree / Mycorrhizal Partner Filter Strip: "🌲 Ispod stabla" */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#121c16] border border-[#223428] rounded-xl overflow-x-auto">
          <span className="px-2.5 py-1 text-xs font-semibold text-emerald-400 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0">
            <Trees className="w-3.5 h-3.5 shrink-0" />
            <span>🌲 Ispod stabla:</span>
          </span>
          {TREE_FILTER_OPTIONS.map((tree) => {
            const isSelected = treeFilter === tree.id;
            return (
              <button
                key={tree.id}
                type="button"
                onClick={() => onSelectTreeFilter(tree.id)}
                className={`min-h-[34px] px-3 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-[#17251d] text-[#b5c7bc] hover:text-white hover:bg-[#1f3227]'
                }`}
              >
                {tree.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Filter Controls + "🗓️ Aktivno ovaj mjesec" Seasonal Filter */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#121c16] border border-[#223428] rounded-xl overflow-x-auto">
          <button
            type="button"
            onClick={onToggleActiveThisMonth}
            title={`Prikaži samo vrste koje plodonose u trenutnom mjesecu (${currentMonthLabel})`}
            className={`min-h-[40px] px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer inline-flex items-center gap-1.5 font-mono-tabular ${
              activeThisMonthOnly
                ? 'bg-amber-500 text-black font-bold shadow-sm'
                : 'bg-[#18271e] text-amber-300 hover:bg-[#213529] border border-amber-500/30'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>🗓️ Aktivno ovaj mjesec ({counts.activeThisMonth})</span>
          </button>

          <span className="h-5 w-[1px] bg-[#24382b] shrink-0 mx-0.5" aria-hidden="true" />

          <button
            type="button"
            onClick={() => onSelectStatusFilter('ALL')}
            className={`min-h-[40px] px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer font-mono-tabular ${
              statusFilter === 'ALL'
                ? 'bg-emerald-600 text-white'
                : 'text-[#9bb0a2] hover:text-[#f2f6f3]'
            }`}
          >
            Sve vrste ({counts.total})
          </button>
          <button
            type="button"
            onClick={() => onSelectStatusFilter('SAFE')}
            className={`min-h-[40px] px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer font-mono-tabular ${
              statusFilter === 'SAFE'
                ? 'bg-emerald-600 text-white'
                : 'text-[#9bb0a2] hover:text-emerald-300'
            }`}
          >
            Jestive ({counts.safe})
          </button>
          <button
            type="button"
            onClick={() => onSelectStatusFilter('WARN')}
            className={`min-h-[40px] px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer font-mono-tabular ${
              statusFilter === 'WARN'
                ? 'bg-amber-600 text-white'
                : 'text-[#9bb0a2] hover:text-amber-300'
            }`}
          >
            Uvjetno jestive ({counts.warn})
          </button>
          <button
            type="button"
            onClick={() => onSelectStatusFilter('DANGER')}
            className={`min-h-[40px] px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer font-mono-tabular ${
              statusFilter === 'DANGER'
                ? 'bg-red-700 text-white'
                : 'text-[#9bb0a2] hover:text-red-300'
            }`}
          >
            Otrovne i smrtonosne ({counts.danger})
          </button>
          <button
            type="button"
            onClick={() => onSelectStatusFilter('MEDICINAL')}
            className={`min-h-[40px] px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer font-mono-tabular ${
              statusFilter === 'MEDICINAL'
                ? 'bg-teal-700 text-white'
                : 'text-[#9bb0a2] hover:text-teal-300'
            }`}
          >
            Ljekovite ({counts.medicinal})
          </button>

          {onChangeSortMode && (
            <>
              <span className="h-5 w-[1px] bg-[#24382b] shrink-0 mx-0.5 ml-auto" aria-hidden="true" />
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => onChangeSortMode('favorites')}
                  title="Prikaži najtraženije jestive gljive u sezoni na vrhu, a otrovnice na dnu"
                  className={`min-h-[38px] px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    sortMode === 'favorites'
                      ? 'bg-emerald-600/25 border border-emerald-500/60 text-emerald-300'
                      : 'text-[#889e90] hover:text-[#f2f6f3] hover:bg-[#18261e]'
                  }`}
                >
                  ⭐ Favoriti (Preporučeno)
                </button>
                <button
                  type="button"
                  onClick={() => onChangeSortMode('az')}
                  title="Abecedno razvrstavanje (A–Z)"
                  className={`min-h-[38px] px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer font-mono-tabular ${
                    sortMode === 'az'
                      ? 'bg-emerald-600/25 border border-emerald-500/60 text-emerald-300'
                      : 'text-[#889e90] hover:text-[#f2f6f3] hover:bg-[#18261e]'
                  }`}
                >
                  A–Z
                </button>
              </div>
            </>
          )}
        </div>

        {/* Discreet Open-Meteo Mushroom Barometer / Forecast Card */}
        {forecast && (
          <div className="rounded-2xl bg-[#111b15] border border-[#23362a] p-3.5 sm:p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2.5 min-w-0">
                <span className="text-xs sm:text-sm font-serif-display font-bold text-[#f2f6f3]">
                  🌲 Gljivarska prognoza za vašu lokaciju
                </span>
                <span className="text-xs text-[#889e90] truncate">
                  ({forecast.locationName})
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Suitability Index Badge */}
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono-tabular font-bold inline-flex items-center gap-1.5 ${
                    forecast.status === 'Vrhunac'
                      ? 'bg-emerald-500/20 border border-emerald-400/60 text-emerald-300'
                      : forecast.status === 'Optimalno'
                      ? 'bg-emerald-600/20 border border-emerald-500/50 text-emerald-300'
                      : forecast.status === 'Umjereno'
                      ? 'bg-amber-500/20 border border-amber-400/50 text-amber-300'
                      : 'bg-red-950/60 border border-red-700/50 text-red-300'
                  }`}
                >
                  <span>Indeks: {forecast.suitabilityIndex}%</span>
                  <span>•</span>
                  <span>{forecast.status}</span>
                </span>

                <button
                  type="button"
                  onClick={onRequestGpsForecast}
                  disabled={isLocatingGps || isForecastLoading}
                  title="Dohvati gljivarsku prognozu za točnu GPS lokaciju"
                  className="min-h-[32px] px-2.5 py-1 rounded-lg bg-[#17261d] hover:bg-[#203528] border border-[#294233] text-[11px] font-semibold text-emerald-300 inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <LocateFixed className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {isLocatingGps ? 'GPS...' : 'Moja lokacija'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={onToggleForecastExpanded}
                  className="min-h-[32px] min-w-[32px] rounded-lg bg-[#17261d] hover:bg-[#203528] text-[#9bb0a2] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  title={forecastExpanded ? 'Sakrij detalje prognoze' : 'Prikaži 5-dnevnu prognozu'}
                >
                  {forecastExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {forecastExpanded && (
              <div className="space-y-3 pt-1 border-t border-[#1c2c22]">
                {/* Metrics + Interpretation Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
                  <div className="lg:col-span-7 space-y-1">
                    <p className="text-xs text-[#d6e3da] leading-relaxed">
                      {forecast.interpretation}
                    </p>
                    <p className="text-xs font-semibold text-emerald-400 leading-relaxed">
                      💡 Preporuka: {forecast.recommendation}
                    </p>
                  </div>

                  <div className="lg:col-span-5 grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-xl bg-[#0b110e] border border-[#1f3025]">
                      <div className="text-[10px] text-[#889e90] flex items-center justify-center gap-1">
                        <CloudRain className="w-3 h-3 text-sky-400" />
                        <span>Kiša (10d)</span>
                      </div>
                      <div className="text-xs sm:text-sm font-mono-tabular font-bold text-[#f2f6f3] mt-0.5">
                        {forecast.metrics.rainPast10DaysMm} mm
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-[#0b110e] border border-[#1f3025]">
                      <div className="text-[10px] text-[#889e90] flex items-center justify-center gap-1">
                        <Droplets className="w-3 h-3 text-emerald-400" />
                        <span>Vlaga tla</span>
                      </div>
                      <div className="text-xs sm:text-sm font-mono-tabular font-bold text-[#f2f6f3] mt-0.5">
                        {forecast.metrics.soilMoisturePct}%
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-[#0b110e] border border-[#1f3025]">
                      <div className="text-[10px] text-[#889e90] flex items-center justify-center gap-1">
                        <Thermometer className="w-3 h-3 text-amber-400" />
                        <span>Temp. tla</span>
                      </div>
                      <div className="text-xs sm:text-sm font-mono-tabular font-bold text-[#f2f6f3] mt-0.5">
                        {forecast.metrics.soilTempC}°C
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5-Day Mini Forecast Strip & Trend */}
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#889e90]">
                    <span className="font-semibold">
                      Prognoza uvjeta za sljedećih 5 dana (Open-Meteo):
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono-tabular">
                      {forecast.trend === 'rast' ? (
                        <>
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">
                            Trend u porastu (+{forecast.trendDelta}%)
                          </span>
                        </>
                      ) : forecast.trend === 'pad' ? (
                        <>
                          <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
                          <span className="text-amber-400 font-semibold">
                            Trend u opadanju ({forecast.trendDelta}%)
                          </span>
                        </>
                      ) : (
                        <>
                          <Minus className="w-3.5 h-3.5 text-[#9bb0a2]" />
                          <span className="text-[#9bb0a2]">Stabilni uvjeti</span>
                        </>
                      )}
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5">
                    {forecast.next5Days.map((day) => (
                      <div
                        key={day.date}
                        className="p-2 rounded-xl bg-[#0b110e] border border-[#1c2b21] flex flex-col items-center text-center"
                      >
                        <span className="text-[10px] font-semibold text-[#9bb0a2]">
                          {day.dayLabel}
                        </span>
                        <span
                          className={`text-xs font-mono-tabular font-bold mt-0.5 ${
                            day.index >= 62
                              ? 'text-emerald-400'
                              : day.index >= 38
                              ? 'text-amber-300'
                              : 'text-[#889e90]'
                          }`}
                        >
                          {day.index}%
                        </span>
                        <span className="text-[10px] font-mono-tabular text-[#6d8777] mt-0.5">
                          {day.tempMin}°/{day.tempMax}°C
                        </span>
                        {day.rainMm > 0 && (
                          <span className="text-[9px] font-mono-tabular text-sky-400">
                            +{day.rainMm}mm
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* SPECIES CARD GRID */}
      <div ref={speciesListRef}>
      {filteredMushrooms.length === 0 ? (
        <div className="rounded-2xl bg-[#121c16] border border-[#233529] p-10 text-center space-y-3">
          <div className="text-base font-semibold text-[#e6f0e9]">
            Nije pronađena nijedna vrsta za odabrani upit ili filtar.
          </div>
          <button
            type="button"
            onClick={onResetFilters}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-emerald-600 text-xs font-semibold text-white cursor-pointer"
          >
            Poništi pretragu i filtre
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleMushrooms.map((mushroom, idx) => (
              <article
                key={mushroom.id}
                onClick={() => onOpenMushroomModal(mushroom.id)}
                className={`mushroom-card-surface group rounded-2xl bg-[#121c16] border border-[#223428] hover:border-[#395743] overflow-hidden flex flex-col justify-between transition-colors cursor-pointer ${
                  accessibilityMode === 'high-contrast' ? 'border-emerald-400 bg-black' : ''
                }`}
              >
                <div>
                  <div className="relative">
                    <MushroomImage
                      mushroom={mushroom}
                      priority={idx < 6}
                      className="w-full h-52"
                    />
                    {mushroom.hasLethalLookalike && (
                      <button
                        type="button"
                        onClick={(e) => onOpenAndFocusLookalikes(mushroom.id, e)}
                        title="Klikni za izravnu usporedbu s opasnim dvojnikom"
                        className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-red-950/90 hover:bg-red-900 border border-red-400/80 text-[11px] font-semibold text-red-100 backdrop-blur-sm inline-flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
                      >
                        <AlertTriangle className="w-3.5 h-3.5 text-red-300 shrink-0" />
                        <span>Opasni dvojnik</span>
                      </button>
                    )}
                    {mushroom.medicinal && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-teal-950/90 border border-teal-600/60 text-[11px] font-semibold text-teal-200 backdrop-blur-sm">
                        Ljekovita
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#889e90]">
                      {renderStatusText(mushroom.status)}
                      <span aria-hidden="true">·</span>
                      <span>{hymeniumLabels[mushroom.hymenium]}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">
                        {formatDiscreetRef(mushroom.bozacRef)}
                      </span>
                    </div>

                    <h2 className="mushroom-card-title text-lg font-serif-display font-bold text-[#f2f6f3] group-hover:text-emerald-300 transition-colors">
                      {mushroom.name}
                    </h2>
                    <p className="text-xs italic text-[#889e90] -mt-1">{mushroom.latin}</p>
                    {mushroom.folkNames && mushroom.folkNames.length > 0 && (
                      <p className="text-[11px] text-emerald-400/90 truncate -mt-1">
                        Narodni nazivi: {mushroom.folkNames.slice(0, 4).join(', ')}
                      </p>
                    )}

                    <p className="mushroom-card-desc text-xs text-[#b5c7bc] line-clamp-3 leading-relaxed">
                      {mushroom.shortSummary}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-4 pt-2 border-t border-[#1a281f] flex items-center justify-between text-xs text-[#889e90]">
                  <span>{mushroom.season || 'Ljeto – Jesen'}</span>
                  <span className="font-semibold text-emerald-400 inline-flex items-center gap-1">
                    Detalji i dvojnici ({mushroom.lookalikes.length})
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </section>

          {/* Infinite Scroll Sentinel & Load More Controls (24 cards per batch) */}
          <div
            ref={loadMoreSentinelRef}
            className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl bg-[#121c16] border border-[#223428] px-5 py-3.5 text-xs text-[#889e90]"
          >
            <span className="font-mono-tabular">
              Prikazano {visibleMushrooms.length} od {filteredMushrooms.length} vrsta
            </span>
            {visibleCount < filteredMushrooms.length && (
              <button
                type="button"
                onClick={onLoadMore}
                className="min-h-[40px] px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Učitaj još vrsta (+{Math.min(pageSize, filteredMushrooms.length - visibleCount)})
              </button>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
