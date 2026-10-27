import React, { useEffect, useState } from 'react';
import {
  Camera,
  X,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Scale,
  ZoomIn,
  Utensils,
  Flame,
  Clock,
  ShieldAlert,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import {
  CulinaryRecipe,
  HymeniumType,
  Lookalike,
  Mushroom,
  RegionId,
} from '../types/mushroom';
import { MushroomImage } from './MushroomImage';
import { getCachedPhoto } from '../services/imageService';

interface RomanMonthItem {
  num: number;
  roman: string;
  name: string;
}

interface MushroomDetailModalProps {
  mushroom: Mushroom;
  modalHistory: string[];
  previousMushroomInHistory: Mushroom | null;
  onBack: () => void;
  onClose: () => void;
  onUserPhotoUpload: (mushroomId: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  detailMode: 'simple' | 'bozac';
  onChangeDetailMode: (mode: 'simple' | 'bozac') => void;
  focusLookalikesHighlight: boolean;
  onSetFocusLookalikesHighlight: (val: boolean) => void;
  lookalikeSectionRef: React.RefObject<HTMLDivElement | null>;
  modalScrollRef: React.RefObject<HTMLDivElement | null>;
  onOpenCompareModal: (sourceMushroom: Mushroom, lookalikeIndex: number) => void;
  onNavigateToLookalike: (targetId: string) => void;
  onOpenLookalikeInfo: (sourceMushroom: Mushroom, lookalike: Lookalike) => void;
  resolveLookalikeTarget: (look: Lookalike) => Mushroom | null;
  galleryPhotos: string[];
  isGalleryLoading: boolean;
  onOpenLightbox: (index: number) => void;
  parseActiveMonths: (season?: string) => number[];
  currentMonthNumber: number;
  currentMonthLabel: string;
  romanMonths: RomanMonthItem[];
  regionShortLabels: Record<RegionId, string>;
  hymeniumLabels: Record<HymeniumType, string>;
  formatDiscreetRef: (bozacRef: string) => string;
}

/**
 * Generates 3 tailored, authentic Croatian forest culinary recipes for any edible or conditionally edible species.
 */
export function getCulinaryRecipesForSpecies(mushroom: Mushroom): CulinaryRecipe[] {
  if (mushroom.recipes && mushroom.recipes.length > 0) {
    return mushroom.recipes;
  }

  const id = mushroom.id.toLowerCase();
  const nameLower = mushroom.name.toLowerCase();
  const isWarn = mushroom.status === 'WARN';

  // 1. Biserka, Sunčanica, Kraljevka, Blagva (Klobuci za pohanje i tavu)
  if (
    id.includes('suncanica') ||
    id.includes('biserka') ||
    id.includes('blagva') ||
    nameLower.includes('sunčanica') ||
    nameLower.includes('biserka')
  ) {
    return [
      {
        title: isWarn
          ? 'Pohani klobuci na zlatno (uz obaveznu punu termičku obradu)'
          : 'Hrskavi pohani klobuci na bečki način',
        prepTime: '25 min',
        method: 'Tava / Pohanje na >170°C',
        ingredients:
          '4–6 otvorenih klobuka, 2 jaja, glatko brašno, krušne mrvice, sol, papar, ulje ili svinjska mast',
        steps: isWarn
          ? 'Klobuke biserke očistite (po želji ogulite kožicu klobuka), posolite te uvaljajte u brašno, jaja i mrvice. Pržite na srednje jakoj vatri ukupno 15–20 minuta uz okretanje dok sredina potpuno ne omekša i termolabilni hemolizini se ne razgrade.'
          : 'Očišćene klobuke lagano posolite, uvaljajte u brašno, razmućena jaja i krušne mrvice te pržite u zagrijanoj masnoći 4–5 minuta sa svake strane do zlatno-hrskave korice.',
      },
      {
        title: 'Na žaru ili gusanoj tavi s češnjakom i peršinom',
        prepTime: '20 min',
        method: 'Žar / Tava (>70°C)',
        ingredients:
          'Klobuci gljive, 3 režnja češnjaka, vezica svježeg peršina, maslinovo ulje ili maslac, krupna sol',
        steps: isWarn
          ? 'Klobuke pecite u poklopljenoj tavi s malo masnoće i podlijevanjem najmanje 15–20 minuta na >70°C. Pred kraj dodajte sitno sjeckani češnjak i peršin.'
          : 'Klobuke premažite maslinovim uljem i pecite na vrućoj tavi ili gradelama 5–6 minuta sa svake strane. Poslužite preliveno emulzijom češnjaka, peršina i ulja.',
      },
      {
        title: 'Šumski gulaš ili pirjana tava s lukom i vrhnjem',
        prepTime: '30 min',
        method: 'Pirjanje u kotliću ili tavi',
        ingredients:
          '500 g narezanih gljiva, 1 glavica luka, 1 žličica slatke paprike, 100 ml vrhnja za kuhanje, timijan',
        steps:
          'Na zlatno poprženom luku pirjajte narezane gljive 20 minuta uz povremeno podlijevanje temeljcem. Začinite solju, paprom i timijanom te povežite žlicom vrhnja.',
      },
    ];
  }

  // 2. Vrganji, Turčini, Djedovi, Borov vrganj, Crni vrganj (Rižoto, žar, sušenje)
  if (
    mushroom.hymenium === 'cjevcice' ||
    id.includes('vrganj') ||
    id.includes('turcin') ||
    id.includes('djed') ||
    id.includes('slinavka') ||
    id.includes('baršunovac')
  ) {
    return [
      {
        title: 'Kremasti šumski rižoto ili domaći fuži s vrganjima',
        prepTime: '25 min',
        method: 'Pirjanje / Rižoto',
        ingredients:
          '350 g svježih gljiva, 250 g riže Arborio (ili domaćih fuža), 1 ljutika, 50 g maslaca, bijelo vino, parmezan',
        steps: isWarn
          ? 'Narezane gljive najprije termički obradite pirjanjem najmanje 18–20 minuta na >70°C dok potpuno ne omekšaju, a zatim sjedinite s kuhanom rižom/tjesteninom, maslacem i parmezanom.'
          : 'Na maslacu zastaklite ljutiku, dodajte ploške vrganja i kratko zapecite. Dodajte rižu, podlijte bijelim vinom i toplim temeljcem uz miješanje 16–18 minuta te završite hladnim maslacem.',
      },
      {
        title: 'Klobuci na žaru s češnjakom i krupnom cvijet-soli',
        prepTime: '18 min',
        method: 'Na žaru / Grill tava',
        ingredients:
          'Čvrsti mladi klobuci i stručci (narezani na ploške 8 mm), maslinovo ulje, 2 režnja češnjaka, papar',
        steps: isWarn
          ? 'Ploške obavezno pecite i pirjajte u poklopljenoj tavi najmanje 15–20 minuta na >70°C (nikada polusirovo!).'
          : 'Ploške vrganja naglo pecite na suhoj vrućoj tavi ili žaru 3–4 minute sa svake strane dok ne zamirišu po pečenim lješnjacima, pa začinite maslinovim uljem i češnjakom.',
      },
      {
        title: 'Sušenje na 40–50°C i mljevenje u aromatični šumski prah',
        prepTime: '6–8 h (dehidrator)',
        method: 'Konzerviranje / Sušenje',
        ingredients: 'Zdravi i suhi primjerci bez crvotočina (ne prati vodom, samo očistiti četkicom)',
        steps:
          'Gljive narežite na tanke listiće (3–4 mm) i sušite u dehidratoru ili prozračnoj pećnici na 40–50°C dok ne postanu krhke poput čipsa. Dio spremite u staklenke, a dio sameljite u fini umami prah za juhe i umake.',
      },
    ];
  }

  // 3. Lisičica, Mrka trubača, Žuta trubača, Prosenjak (Tjestenina, kiseljenje, prah)
  if (
    mushroom.hymenium === 'letvice' ||
    mushroom.hymenium === 'iglice' ||
    id.includes('lisicica') ||
    id.includes('trubaca') ||
    id.includes('prosenjak')
  ) {
    return [
      {
        title: 'Šumska tava s domaćom tjesteninom, češnjakom i maslacem',
        prepTime: '22 min',
        method: 'Pirjanje u tavi',
        ingredients:
          '300 g lisičica ili trubača, 40 g maslaca, 1 ljutika, 2 režnja češnjaka, svježi peršin, domaći široki rezanci',
        steps:
          'Gljive najprije stavite na suhu tavu da puste vlastitu tekućinu i ona ispari, zatim dodajte maslac, ljutiku i češnjak te pirjajte 12–15 minuta. Umiješajte kuhane rezance i svježi peršin.',
      },
      {
        title: 'Kiseljenje (mariniranje) u blagom octu s paprom i lovorom',
        prepTime: '35 min',
        method: 'Zimnica / Kiseljenje',
        ingredients:
          '500 g mladih čvrstih gljiva, 200 ml alkoholnog ili jabučnog octa, 400 ml vode, 1 žlica soli, 1 žličica šećera, zrno papra, lovor',
        steps:
          'Očišćene gljive blanširajte u slanoj kipućoj vodi 10–15 minuta, ocijedite i složite u sterilizirane staklenke. Prelijte vrućim prokuhanim naljevom od vode, octa, papra i lovora te pasterizirajte.',
      },
      {
        title: 'Sušenje na 40–50°C s mljevenjem u "šumski papar" (za trubače)',
        prepTime: '5–7 h',
        method: 'Sušenje i mljevenje u prah',
        ingredients: 'Očišćena plodišta raspolovljena po dužini stručka (provjera čistoće cijevi)',
        steps:
          'Osušite na 45°C do potpune lomljivosti. Sameljite u mužaru ili mlincu za kavu u tamni aromatični prah koji daje vrhunsku aromu tartufa pečenjima, rižotu i krem juhama.',
      },
    ];
  }

  // 4. Rujnice / Mliječnice (Žar i kiseljenje)
  if (mushroom.latex !== 'nema' || id.includes('rujnica') || id.includes('mlijecnica')) {
    return [
      {
        title: 'Rujnice na žaru ili tavi s češnjakom i slaninom',
        prepTime: '15 min',
        method: 'Žar / Tava',
        ingredients:
          'Klobuci rujnica, 50 g sitno sjeckane domaće slanine, 2 režnja češnjaka, maslinovo ulje, krupna sol',
        steps:
          'Cijele klobuke s listićima okrenutim prema gore pecite na žaru ili tavi sa slaninom 10–12 minuta dok ne puste narančasti sok i lijepo se zapeku. Pospite češnjakom i peršinom.',
      },
      {
        title: 'Marinirane rujnice u maslinovom ulju i vinskom octu',
        prepTime: '35 min',
        method: 'Kiseljenje / Marinada',
        ingredients:
          '500 g malih klobuka rujnica, vinski ocat, voda, lovorov list, papar u zrnu, maslinovo ulje',
        steps:
          'Mlade rujnice kuhajte 12–15 minuta u mješavini vode i octa (2:1), ocijedite, ohladite i složite u staklenke s češnjakom i ružmarinom te zalijte maslinovim uljem.',
      },
      {
        title: 'Rižoto s rujnicama i timijanom',
        prepTime: '25 min',
        method: 'Rižoto',
        ingredients: '300 g narezanih rujnica, 250 g riže, povrtni temeljac, maslac, majčina dušica',
        steps:
          'Kratko prepržite rujnice na maslacu da karameliziraju, dodajte rižu i postupno podlijevajte toplim temeljcem 18 minuta.',
      },
    ];
  }

  // 5. Default za ostale jestive i uvjetno jestive gljive (Puza, Bukovača, Smrčak, Krasnice, Šampinjoni...)
  return [
    {
      title: isWarn
        ? 'Krepki šumski gulaš (uz obavezno prokuhavanje 15–20 min i odlijevanje vode)'
        : 'Na žaru ili tavi s češnjakom, maslacem i peršinom',
      prepTime: '25 min',
      method: isWarn ? 'Kuhanje + Pirjanje (>70°C)' : 'Tava / Žar',
      ingredients:
        '400 g očišćenih klobuka, 2 režnja češnjaka, maslac ili ulje, luk, sol, svježe mljeveni papar, peršin',
      steps: isWarn
        ? 'Gljive najprije prokuhajte u dosta kipuće vode 15–20 minuta (za puzu ili maglen prvu vodu obavezno odlijte!), a zatim ih pirjajte na luku i češnjaku još 10 minuta.'
        : 'Narezane gljive pecite u zagrijanoj tavi na maslacu 10–12 minuta dok tekućina ne ispari i rubovi ne porumene, pa dodajte češnjak i peršin.',
    },
    {
      title: 'Kremasti rižoto ili domaća tjestenina sa šumskim gljivama',
      prepTime: '25 min',
      method: 'Rižoto / Tjestenina',
      ingredients:
        '300 g gljiva, 250 g tjestenine ili riže, 1 ljutika, 100 ml temeljca, maslac, ribani tvrdi sir',
      steps: isWarn
        ? 'Gljive temeljito termički obradite najmanje 15–20 minuta na >70°C dok svi termolabilni spojevi ne budu neutralizirani, pa povežite s tjesteninom ili rižom.'
        : 'Pirjajte gljive na ljutiki i maslacu 12 minuta, podlijte temeljcem i sjedinite s al dente tjesteninom ili rižotom.',
    },
    {
      title: 'Kiseljenje za zimnicu ili sušenje na 40–50°C s mljevenjem u prah',
      prepTime: '40 min / Sušenje 6 h',
      method: 'Konzerviranje (Zimnica / Sušenje)',
      ingredients:
        'Mladi i čvrsti primjerci, blagi ocat + začini za marinadu ili dehidrator na 40–50°C',
      steps:
        'Čvrste mlade klobuke prokuhajte 15–20 minuta za kiseljenje u staklenkama, ili tanko narezane ploške osušite na 40–50°C te sameljite u aromatični gljivarski začin.',
    },
  ];
}

export const MushroomDetailModal: React.FC<MushroomDetailModalProps> = ({
  mushroom,
  modalHistory,
  previousMushroomInHistory,
  onBack,
  onClose,
  onUserPhotoUpload,
  detailMode,
  onChangeDetailMode,
  focusLookalikesHighlight,
  onSetFocusLookalikesHighlight,
  lookalikeSectionRef,
  modalScrollRef,
  onOpenCompareModal,
  onNavigateToLookalike,
  onOpenLookalikeInfo,
  resolveLookalikeTarget,
  galleryPhotos,
  isGalleryLoading,
  onOpenLightbox,
  parseActiveMonths,
  currentMonthNumber,
  currentMonthLabel,
  romanMonths,
  regionShortLabels,
  hymeniumLabels,
  formatDiscreetRef,
}) => {
  const [selectedRecipeIdx, setSelectedRecipeIdx] = useState(0);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(20 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [resolvedHeroUrl, setResolvedHeroUrl] = useState<string | null>(() =>
    mushroom.userPhoto || getCachedPhoto(mushroom.id)
  );

  useEffect(() => {
    setSelectedRecipeIdx(0);
    setIsTimerRunning(false);
    setTimerSecondsLeft(20 * 60);
    setResolvedHeroUrl(mushroom.userPhoto || getCachedPhoto(mushroom.id));
  }, [mushroom.id, mushroom.userPhoto]);

  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = window.setInterval(() => {
      setTimerSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const isEdibleOrWarn = mushroom.status === 'SAFE' || mushroom.status === 'WARN';
  const recipes = isEdibleOrWarn ? getCulinaryRecipesForSpecies(mushroom) : [];

  const hasAlcoholWarning =
    mushroom.id.includes('gnojstarka') ||
    mushroom.id.includes('mrezastonogi-vrganj') ||
    mushroom.kitchen.toLowerCase().includes('alkohol');

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto overflow-x-hidden max-w-full box-border"
      onClick={onClose}
    >
      <div
        ref={modalScrollRef}
        className="w-full max-w-4xl max-w-full max-h-[92vh] overflow-y-auto overflow-x-hidden box-border rounded-t-3xl sm:rounded-3xl bg-[#101913] border border-[#283e30] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Stack Back Bar (when modalHistory has > 1 step) */}
        {modalHistory.length > 1 && previousMushroomInHistory && (
          <div className="sticky top-0 z-20 bg-[#0c140f]/95 backdrop-blur-md border-b border-[#24382b] px-4 py-2.5 flex items-center justify-between gap-2 max-w-full overflow-x-hidden box-border">
            <button
              type="button"
              onClick={onBack}
              className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/35 border border-emerald-500/50 text-xs font-semibold text-emerald-300 inline-flex items-center gap-2 transition-colors cursor-pointer truncate max-w-[80%]"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span className="truncate">
                ⬅️ Natrag na: {previousMushroomInHistory.name}
              </span>
            </button>
            <span className="text-[11px] font-mono-tabular text-[#889e90] shrink-0">
              Korak {modalHistory.length}
            </span>
          </div>
        )}

        {/* Top Image & Quick Close */}
        <div className="relative max-w-full overflow-x-hidden box-border">
          <MushroomImage
            mushroom={mushroom}
            priority={true}
            className="w-full h-64 sm:h-80"
            onPhotoResolved={setResolvedHeroUrl}
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 min-h-[44px] min-w-[44px] rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <label className="absolute bottom-4 right-4 min-h-[40px] px-3.5 py-2 rounded-xl bg-black/75 hover:bg-black text-xs font-semibold text-[#e6f0e9] inline-flex items-center gap-2 cursor-pointer backdrop-blur-sm border border-white/15">
            <Camera className="w-4 h-4 text-emerald-400" />
            Postavi vlastitu sliku
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onUserPhotoUpload(mushroom.id, e)}
              className="hidden"
            />
          </label>
        </div>

        {/* Discreet Photo Source Attribution Bar directly below main photograph */}
        <div className="px-4 sm:px-7 py-2 bg-[#0c140f] border-b border-[#1e2f24] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#8fa696]">
          <a
            href={
              resolvedHeroUrl && !resolvedHeroUrl.startsWith('data:')
                ? resolvedHeroUrl
                : `https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(
                    mushroom.latin.split(' ').slice(0, 2).join(' ')
                  )}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-300 transition-colors inline-flex items-center gap-1.5 break-all"
          >
            <span>📷 Izvor fotografije: Wikimedia Commons / iNaturalist (CC-BY-SA)</span>
            <span className="text-emerald-400 underline underline-offset-2 font-semibold inline-flex items-center gap-1 whitespace-nowrap">
              <span>Izvorni URL slike</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </span>
          </a>
        </div>

        <div className="p-4 sm:p-7 space-y-6 max-w-full overflow-x-hidden box-border">
          {/* Top High-Risk Lookalike Banner in Detail Modal */}
          {mushroom.hasLethalLookalike && (
            <div className="rounded-2xl bg-red-950/70 border border-red-500/75 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 max-w-full box-border">
              <button
                type="button"
                onClick={() => {
                  onSetFocusLookalikesHighlight(true);
                  lookalikeSectionRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                  });
                }}
                className="text-left flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-red-100 cursor-pointer min-w-0"
              >
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span className="break-words">
                  Visoki rizik zamjene — ova vrsta ima opasnog dvojnika!
                </span>
              </button>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {mushroom.lookalikes.length > 0 && (
                  <button
                    type="button"
                    onClick={() => onOpenCompareModal(mushroom, 0)}
                    className="min-h-[36px] px-3.5 py-1.5 rounded-xl bg-red-800 hover:bg-red-700 text-xs font-semibold text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>⚖️ Usporedi 1 na 1</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Header Info */}
          <div className="space-y-2 max-w-full min-w-0 box-border">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#9bb0a2]">
              <span
                className={
                  mushroom.status === 'DANGER'
                    ? 'text-red-400 font-bold'
                    : mushroom.status === 'WARN'
                    ? 'text-amber-400 font-bold'
                    : 'text-emerald-400 font-bold'
                }
              >
                {mushroom.statusLabel}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular">
                {formatDiscreetRef(mushroom.bozacRef)}
              </span>
              {mushroom.season && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Sezona: {mushroom.season}</span>
                </>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#f2f6f3] break-words">
              {mushroom.name}
            </h2>
            <div className="text-sm italic text-[#9bb0a2] break-words">
              {mushroom.latin}
              {mushroom.synonyms ? ` (Sinonimi: ${mushroom.synonyms})` : ''}
            </div>
            {mushroom.folkNames && mushroom.folkNames.length > 0 && (
              <div className="text-xs text-emerald-400/95 pt-0.5 break-words">
                <span className="font-semibold text-emerald-300">Narodni nazivi:</span>{' '}
                {mushroom.folkNames.join(', ')}
              </div>
            )}
            {mushroom.regions && mushroom.regions.length > 0 && (
              <div className="text-xs text-[#889e90] pt-0.5 break-words">
                Regije u RH:{' '}
                <span className="text-[#c5d6cb]">
                  {mushroom.regions
                    .map((r) => regionShortLabels[r] || r)
                    .join(' · ')}
                </span>
              </div>
            )}

            {/* Compact 12-Month Fruiting Bar (I - XII) */}
            {(() => {
              const activeMonths = parseActiveMonths(mushroom.season);
              const isActiveNow = activeMonths.includes(currentMonthNumber);
              return (
                <div className="pt-2 space-y-1.5 max-w-full box-border">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <span className="text-[#889e90] font-semibold">
                      Kalendar plodonošenja (I – XII):
                    </span>
                    <span
                      className={`font-semibold ${
                        isActiveNow ? 'text-emerald-400' : 'text-[#889e90]'
                      }`}
                    >
                      {isActiveNow
                        ? `🟢 Aktivna u ovom mjesecu (${currentMonthLabel})`
                        : `Izvan glavne sezone u mjesecu: ${currentMonthLabel}`}
                    </span>
                  </div>
                  <div className="grid grid-cols-12 gap-1 w-full max-w-full box-border">
                    {romanMonths.map((m) => {
                      const isFruiting = activeMonths.includes(m.num);
                      const isCurrent = m.num === currentMonthNumber;
                      return (
                        <div
                          key={m.num}
                          title={`${m.name}: ${
                            isFruiting ? 'Plodonosi (u sezoni)' : 'Izvan sezone'
                          }`}
                          className={`h-7 rounded-md text-[10px] font-mono-tabular font-bold flex items-center justify-center transition-colors select-none ${
                            isFruiting
                              ? 'bg-emerald-600 text-white border border-emerald-400/80 shadow-xs'
                              : 'bg-[#0b110e] text-[#597062] border border-[#1d2d23]'
                          } ${isCurrent ? 'ring-2 ring-amber-400' : ''}`}
                        >
                          {m.roman}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* 50/50 Segmented Control Reading Mode Switcher */}
          <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-[#0b110e] border border-[#223428] rounded-xl w-full max-w-full box-border">
            <button
              type="button"
              onClick={() => onChangeDetailMode('simple')}
              className={`min-h-[42px] px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer w-full min-w-0 ${
                detailMode === 'simple'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-[#9bb0a2] hover:text-white'
              }`}
            >
              <span className="truncate">⚡ Brzi pregled</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeDetailMode('bozac')}
              className={`min-h-[42px] px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer w-full min-w-0 ${
                detailMode === 'bozac'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-[#9bb0a2] hover:text-white'
              }`}
            >
              <span className="truncate">🔬 Detaljno</span>
            </button>
          </div>

          {detailMode === 'simple' ? (
            <div className="space-y-4 max-w-full box-border">
              <p className="text-sm sm:text-base text-[#d6e3da] leading-relaxed break-words">
                {mushroom.shortSummary}
              </p>
              <div className="rounded-2xl bg-[#0b110e] border border-[#1f3025] p-4 sm:p-5 space-y-3 max-w-full box-border">
                <h3 className="text-xs font-bold text-emerald-400">
                  Tri ključne točke za prepoznavanje u šumi:
                </h3>
                <ul className="space-y-2.5 text-sm text-[#e2ece5]">
                  {mushroom.simpleBullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 min-w-0">
                      <span className="font-mono-tabular font-bold text-emerald-400 shrink-0">
                        0{i + 1}.
                      </span>
                      <span className="break-words min-w-0">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm max-w-full box-border">
              <div className="p-4 rounded-xl bg-[#0b110e] border border-[#1f3025] space-y-1 min-w-0">
                <div className="text-xs font-semibold text-emerald-400">Klobuk</div>
                <p className="text-[#d6e3da] leading-relaxed break-words">
                  {mushroom.bozacDetails.klobuk}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#0b110e] border border-[#1f3025] space-y-1 min-w-0">
                <div className="text-xs font-semibold text-emerald-400">
                  Himenij ({hymeniumLabels[mushroom.hymenium]})
                </div>
                <p className="text-[#d6e3da] leading-relaxed break-words">
                  {mushroom.bozacDetails.listici}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#0b110e] border border-[#1f3025] space-y-1 min-w-0">
                <div className="text-xs font-semibold text-emerald-400">Stručak i baza</div>
                <p className="text-[#d6e3da] leading-relaxed break-words">
                  {mushroom.bozacDetails.strucak}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#0b110e] border border-[#1f3025] space-y-1 min-w-0">
                <div className="text-xs font-semibold text-emerald-400">Meso i kemijske reakcije</div>
                <p className="text-[#d6e3da] leading-relaxed break-words">
                  {mushroom.bozacDetails.meso}
                </p>
              </div>
              {mushroom.bozacDetails.spore && (
                <div className="md:col-span-2 p-4 rounded-xl bg-[#0b110e] border border-[#1f3025] space-y-1 min-w-0">
                  <div className="text-xs font-semibold text-emerald-400">Mikroskopija i spore</div>
                  <p className="text-[#d6e3da] font-mono-tabular text-xs break-words">
                    {mushroom.bozacDetails.spore}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Field Photo Gallery (4 angles from iNaturalist / Wikipedia) */}
          <div className="space-y-3 max-w-full box-border">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base font-serif-display font-bold text-[#f2f6f3]">
                📸 Dodatne terenske fotografije (4 kuta)
              </h3>
              {galleryPhotos.length > 0 && (
                <span className="text-[11px] text-[#889e90]">
                  Kliknite na fotografiju za pregled preko cijelog zaslona
                </span>
              )}
            </div>

            {isGalleryLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-2xl bg-[#0b110e] border border-[#1f3025] animate-pulse flex items-center justify-center text-xs text-[#6d8777]"
                  >
                    Učitavanje...
                  </div>
                ))}
              </div>
            ) : galleryPhotos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {galleryPhotos.map((photoUrl, idx) => (
                  <button
                    key={photoUrl + idx}
                    type="button"
                    onClick={() => onOpenLightbox(idx)}
                    className="group relative aspect-square rounded-2xl overflow-hidden bg-[#0b110e] border border-[#24382b] hover:border-emerald-500/80 transition-all cursor-pointer focus:outline-none"
                  >
                    <img
                      src={photoUrl}
                      alt={`${mushroom.name} - terenska fotografija ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2.5">
                      <span className="text-[11px] font-mono-tabular font-semibold text-white">
                        Kut #{idx + 1}
                      </span>
                      <span className="w-7 h-7 rounded-full bg-black/70 text-emerald-300 flex items-center justify-center">
                        <ZoomIn className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-[#0b110e] border border-[#1f3025] px-4 py-3 text-xs text-[#889e90]">
                Dodatne terenske fotografije trenutačno nisu dostupne za ovu vrstu ili ste izvan mreže.
              </div>
            )}
          </div>

          {/* Lookalikes Comparison Section ("Moja gljiva vs. Dvojnik") */}
          {mushroom.lookalikes.length > 0 && (
            <div
              ref={lookalikeSectionRef}
              className={`space-y-3 rounded-2xl transition-all max-w-full box-border ${
                focusLookalikesHighlight
                  ? 'p-4 bg-red-950/25 border-2 border-red-500/80 shadow-lg'
                  : ''
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-serif-display font-bold text-[#f2f6f3]">
                    Moja gljiva vs. Dvojnik — Usporedba sa sličnim i opasnim vrstama
                  </h3>
                  {mushroom.hasLethalLookalike && (
                    <p className="text-xs font-semibold text-red-300 mt-0.5">
                      Obavezno provjerite svaku razliku prije branja!
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onOpenCompareModal(mushroom, 0)}
                  className="min-h-[38px] px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/50 text-xs font-bold text-amber-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <Scale className="w-4 h-4" />
                  <span>⚖️ Usporedi 1 na 1</span>
                </button>
              </div>
              <div className="space-y-3">
                {mushroom.lookalikes.map((look, idx) => {
                  const targetMushroom = resolveLookalikeTarget(look);
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-[#0b110e] border border-[#24382b] p-4 space-y-3 max-w-full box-border"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold text-amber-300 break-words">
                          Razlikovna značajka: {look.trait}
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onOpenCompareModal(mushroom, idx)}
                            className="px-3 py-1.5 rounded-xl bg-[#18281e] hover:bg-[#22382a] border border-emerald-500/40 text-xs font-semibold text-emerald-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Scale className="w-3.5 h-3.5" />
                            <span>⚖️ Usporedi 1 na 1</span>
                          </button>

                          {targetMushroom ? (
                            <button
                              type="button"
                              onClick={() => onNavigateToLookalike(targetMushroom.id)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                                targetMushroom.status === 'DANGER'
                                  ? 'bg-red-900/70 hover:bg-red-800 text-red-100 border border-red-600/60'
                                  : 'bg-[#17281e] hover:bg-[#20382a] text-emerald-300'
                              }`}
                            >
                              <span>
                                {targetMushroom.status === 'DANGER'
                                  ? `Prijeđi na otrovnicu: ${targetMushroom.name}`
                                  : `Prijeđi na vrstu: ${targetMushroom.name}`}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => onOpenLookalikeInfo(mushroom, look)}
                              className="text-xs font-semibold text-amber-300 hover:underline inline-flex items-center gap-1 cursor-pointer"
                            >
                              Info o dvojniku
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-[#121d16] border border-[#23382a] min-w-0">
                          <div className="font-semibold text-emerald-400 mb-1 break-words">
                            Moja gljiva ({mushroom.name}):
                          </div>
                          <div className="text-[#f2f6f3] break-words">{look.mine}</div>
                        </div>
                        <div
                          onClick={() => {
                            if (targetMushroom) {
                              onNavigateToLookalike(targetMushroom.id);
                            } else {
                              onOpenCompareModal(mushroom, idx);
                            }
                          }}
                          className="p-3 rounded-xl bg-red-950/35 border border-red-900/60 hover:border-red-500/80 transition-colors cursor-pointer min-w-0"
                        >
                          <div className="font-semibold text-red-300 mb-1 flex items-center justify-between gap-2">
                            <span className="break-words">
                              Dvojnik ({targetMushroom ? targetMushroom.name : look.targetId.replace(/-/g, ' ')}):
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          </div>
                          <div className="text-red-100 break-words">{look.other}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Habitat & Kitchen Use */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm max-w-full box-border">
            <div className="p-4 rounded-xl bg-[#0b110e] border border-[#1f3025] space-y-1 min-w-0">
              <div className="text-xs font-semibold text-[#889e90]">Stanište i rasprostranjenost</div>
              <p className="text-[#e2ece5] leading-relaxed break-words">{mushroom.habitat}</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0b110e] border border-[#1f3025] space-y-1 min-w-0">
              <div className="text-xs font-semibold text-[#889e90]">Kuhinja i toksikološka napomena</div>
              <p className="text-[#e2ece5] leading-relaxed break-words">{mushroom.kitchen}</p>
            </div>
          </div>

          {/* 2. KULINARSKI MODUL I TOKSIKOLOŠKE UPUTE ("🍽️ Priprema & Recepti") */}
          {isEdibleOrWarn && (
            <div className="rounded-2xl bg-[#0d1610] border border-[#263d2e] p-4 sm:p-5 space-y-4 max-w-full box-border">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <Utensils className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-serif-display font-bold text-[#f2f6f3]">
                      🍽️ Priprema &amp; Recepti
                    </h3>
                    <p className="text-[11px] text-[#889e90]">
                      Provjerene terenske i kulinarske upute za pripremu vrste {mushroom.name}
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-[#16261c] border border-[#284030] text-[11px] font-mono-tabular text-emerald-300 font-semibold">
                  {recipes.length} provjerena recepta
                </span>
              </div>

              {/* RED SAFETY FRAME FOR CONDITIONALLY EDIBLE SPECIES (status === 'WARN') */}
              {mushroom.status === 'WARN' && (
                <div className="rounded-2xl bg-red-950/65 border-2 border-red-500/80 p-4 space-y-3">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-red-100 leading-relaxed">
                    <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div className="space-y-1.5">
                      <p className="font-bold text-red-200">
                        ⚠️ TOKSIKOLOŠKA NAPOMENA: Sadrži termolabilne hemolizine. Obavezna termička obrada od minimalno 15-20 minuta na &gt;70°C. Nikada ne konzumirati sirovo niti nedovoljno pečeno!
                      </p>
                      {hasAlcoholWarning && (
                        <p className="text-xs text-amber-200 font-semibold">
                          🍷 OPREZ S ALKOHOLOM: Ova vrsta može izazvati koprinski (antabusni) sindrom u kombinaciji s alkoholom. Ne konzumirati alkoholna pića 48 sati prije i poslije obroka!
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Interactive 20-minute thermal boiling timer */}
                  <div className="pt-2 border-t border-red-800/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 text-red-200 font-mono-tabular">
                      <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>
                        Sigurnosni tajmer termičke obrade:{' '}
                        <strong className="text-white text-sm">{formatTimer(timerSecondsLeft)}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setIsTimerRunning((r) => !r)}
                        className="min-h-[32px] px-3 py-1 rounded-lg bg-red-800 hover:bg-red-700 text-white font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {isTimerRunning ? (
                          <>
                            <Pause className="w-3.5 h-3.5" />
                            <span>Pauza</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5" />
                            <span>Pokreni 20 min</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsTimerRunning(false);
                          setTimerSecondsLeft(20 * 60);
                        }}
                        title="Resetiraj tajmer na 20:00"
                        className="min-h-[32px] px-2.5 py-1 rounded-lg bg-red-950 hover:bg-red-900 border border-red-700/60 text-red-200 inline-flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Alcohol warning even on SAFE species if applicable */}
              {mushroom.status === 'SAFE' && hasAlcoholWarning && (
                <div className="rounded-xl bg-amber-950/50 border border-amber-500/60 p-3.5 text-xs text-amber-100 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Napomena uz konzumaciju:</strong> Preporučuje se izbjegavati konzumaciju alkohola uz obrok od gnojštarki zbog mogućeg antabusnog djelovanja kod osjetljivih osoba.
                  </span>
                </div>
              )}

              {/* Recipe Selector Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {recipes.map((recipe, idx) => {
                  const isActive = idx === selectedRecipeIdx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedRecipeIdx(idx)}
                      className={`min-h-[36px] px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-[#15231a] text-[#9bb0a2] hover:text-white border border-[#24392c]'
                      }`}
                    >
                      Recept #{idx + 1}: {recipe.title.split('(')[0].trim()}
                    </button>
                  );
                })}
              </div>

              {/* Active Recipe Card */}
              {recipes[selectedRecipeIdx] && (
                <div className="p-4 rounded-xl bg-[#0b110e] border border-[#213528] space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{recipes[selectedRecipeIdx].title}</span>
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] font-mono-tabular text-[#9bb0a2]">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#142119] border border-[#24382b] text-amber-300">
                        <Clock className="w-3 h-3" />
                        {recipes[selectedRecipeIdx].prepTime}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#142119] border border-[#24382b] text-emerald-300">
                        {recipes[selectedRecipeIdx].method}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs space-y-2 leading-relaxed">
                    <div className="p-2.5 rounded-lg bg-[#121d16] border border-[#1e3024] text-[#d6e3da]">
                      <strong className="text-emerald-400">Sastojci:</strong>{' '}
                      {recipes[selectedRecipeIdx].ingredients}
                    </div>
                    <p className="text-[#e6f0e9]">
                      <strong className="text-amber-300">Postupak pripreme:</strong>{' '}
                      {recipes[selectedRecipeIdx].steps}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
