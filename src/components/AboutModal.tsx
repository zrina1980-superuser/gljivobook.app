import React from 'react';
import {
  X,
  Filter,
  Camera,
  MapPin,
  Mail,
  PhoneCall,
  ShieldAlert,
  BookOpen,
  Download,
  Award,
  HardDrive,
  Lock,
} from 'lucide-react';
import { ForestPermitSection } from './ForestPermitSection';
import { ZrinaLogo } from './ZrinaLogo';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalSpeciesCount: number;
  cachedCount?: number;
  isPreloading?: boolean;
  preloadProgress?: { loaded: number; total: number } | null;
  onPreloadOffline?: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  totalSpeciesCount,
  cachedCount = 0,
  isPreloading = false,
  preloadProgress = null,
  onPreloadOffline,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto overflow-x-hidden"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden box-border rounded-3xl bg-[#101913] border border-[#283e30] shadow-2xl p-5 sm:p-8 space-y-6 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#1f3126] pb-5">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Bio-Cyber Z Emblem */}
            <ZrinaLogo className="w-13 h-13 rounded-2xl border border-[#10b981]/45 shadow-inner" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight font-sans text-white">
                  <span>gljivobook</span>
                  <span className="text-[#10b981]">.app</span>{' '}
                  <span className="text-emerald-400 font-semibold text-base sm:text-lg">by Zrina</span>
                </h2>
                <span className="text-xs font-mono-tabular text-emerald-400">
                  v3.3 PRO • {totalSpeciesCount} vrsta
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#9bb0a2] mt-0.5">
                by Zrina • Terenski priručnik &amp; dnevnik
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] min-w-[40px] rounded-full bg-[#18261d] hover:bg-[#223629] text-[#9bb0a2] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Zatvori informacije o aplikaciji"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Author & Scientific Foundation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#0c130e] border border-[#223529] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <Award className="w-4 h-4 shrink-0" />
              <span>Autor i razvoj</span>
            </div>
            <p className="text-sm font-medium text-[#f2f6f3] leading-relaxed">
              Zamišljeno, dizajnirano i realizirano:{' '}
              <strong className="text-emerald-300">Vedran Zrinski (Zrina)</strong>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0c130e] border border-[#223529] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Stručni temelj</span>
            </div>
            <p className="text-xs text-[#c2d4c8] leading-relaxed">
              Razvijeno prema taksonomiji i morfološkim opisima iz{' '}
              <em>Enciklopedije gljiva (Svezak 1 i 2)</em> prof. dr. sc. Romana Bošca,
              prošireno i digitalizirano uz pomoć Gemini AI tehnologije.
            </p>
          </div>
        </div>

        {/* Terenska Offline baza (premještena s početnog zaslona u Info modal) */}
        {onPreloadOffline && (
          <div className="rounded-2xl bg-[#0c140f] border border-[#1f3025] p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 font-semibold text-[#e2ece5]">
                <HardDrive className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Terenska Offline baza fotografija</span>
              </div>
              <span className="font-mono-tabular text-emerald-400 font-semibold">
                {cachedCount}/{totalSpeciesCount} slika u memoriji
              </span>
            </div>
            <p className="text-xs text-[#889e90] leading-relaxed">
              Prije polaska u šumu preuzmite sve terenske fotografije u predmemoriju telefona kako bi bile vidljive i bez mobilnog signala.
            </p>
            {preloadProgress && isPreloading ? (
              <div className="space-y-1.5">
                <div className="w-full h-2 rounded-full bg-[#1a2920] overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all"
                    style={{
                      width: `${Math.round(
                        (preloadProgress.loaded / Math.max(1, preloadProgress.total)) * 100
                      )}%`,
                    }}
                  />
                </div>
                <div className="text-[11px] font-mono-tabular text-emerald-300">
                  Preuzimanje fotografija: {preloadProgress.loaded} / {preloadProgress.total}
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={onPreloadOffline}
                className="w-full min-h-[42px] px-4 py-2 rounded-xl bg-[#18271e] hover:bg-[#22372a] border border-[#2a4233] text-xs font-semibold text-emerald-300 inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Preuzmi sve slike za offline rad
              </button>
            )}
          </div>
        )}

        {/* Dozvola za sakupljanje gljiva (Hrvatske šume) */}
        <ForestPermitSection compact={true} />

        {/* Kratke upute za šumu (3 sažeta koraka) */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#889e90]">
            Kratke upute za šumu (3 koraka)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-[#131f17] border border-[#23382a] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-tabular font-bold text-emerald-400">
                  01. KORAK
                </span>
                <Filter className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-sm font-bold text-[#f2f6f3]">Filtriranje ključem</h4>
              <p className="text-xs text-[#9bb0a2] leading-relaxed">
                Odaberite izgled ispod klobuka (listići, cjevčice, iglice), vjenčić, ovoj i mliječni sok za trenutno sužavanje izbora i usporedbu dvojnica.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#131f17] border border-[#23382a] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-tabular font-bold text-amber-400">
                  02. KORAK
                </span>
                <Camera className="w-4 h-4 text-amber-400" />
              </div>
              <h4 className="text-sm font-bold text-[#f2f6f3]">3 kuta za AI determinaciju</h4>
              <p className="text-xs text-[#9bb0a2] leading-relaxed">
                U AI Skeneru snimite klobuk odozgo, listiće ili pore odozdo te cijeli stručak s bazom za najprecizniju morfološku analizu.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#131f17] border border-[#23382a] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-tabular font-bold text-emerald-400">
                  03. KORAK
                </span>
                <MapPin className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-sm font-bold text-[#f2f6f3]">1-tap GPS pinanje bez signala</h4>
              <p className="text-xs text-[#9bb0a2] leading-relaxed">
                Spremite točne GPS koordinate, nadmorsku visinu, fotografiju i glasovne bilješke u Terenski dnevnik čak i bez mobilnog signala.
              </p>
            </div>
          </div>
        </div>

        {/* 🔒 Privatnost, kolačići i licence */}
        <div className="rounded-2xl bg-[#0c130e] border border-[#223529] p-4 sm:p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Lock className="w-4 h-4 shrink-0" />
            <span>🔒 Privatnost, kolačići i licence</span>
          </div>
          <p className="text-xs text-[#c2d4c8] leading-relaxed">
            <strong>100% lokalna privatnost bez kolačića za praćenje:</strong> Aplikacija{' '}
            <strong>gljivobook.app</strong> ne koristi kolačiće za praćenje (tracking cookies),
            analitiku trećih strana niti šalje vaše GPS lokacije na poslužitelj. Svi unosi u
            terenski dnevnik, tajne GPS koordinate nalazišta, fotografije ulova, pinovi parkiranog
            automobila i pohranjene šumske dozvole spremaju se isključivo lokalno u{' '}
            <code className="text-emerald-300 font-mono">IndexedDB</code> bazi na vašem uređaju.
          </p>
          <p className="text-xs text-[#9bb0a2] leading-relaxed">
            <strong>Creative Commons atribucija i stručni izvori:</strong> Fotografije vrsta u atlasu
            preuzete su putem otvorenih API servisa iNaturalist i Wikimedia Commons pod slobodnim
            Creative Commons licencama (CC-BY / CC-BY-SA / CC0). Poveznica na izvornog autora i
            licencu dostupna je u detaljima svakog pojedinog uzorka. Taksonomska podjela i morfološki
            opisi temelje se na stručnoj literaturi prof. dr. sc. Romana Bošca (
            <em>Enciklopedija gljiva, Svezak 1 i 2</em>).
          </p>
        </div>

        {/* Contact & SOS Poison Control */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-4 rounded-2xl bg-[#0c130e] border border-[#223529] flex flex-col justify-between gap-2">
            <div className="text-xs text-[#889e90]">
              Kontakt za suradnju, prijedloge i prijavu grešaka:
            </div>
            <a
              href="mailto:gljivobook@zrina.app"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors break-all"
            >
              <Mail className="w-4 h-4 shrink-0" />
              gljivobook@zrina.app
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-red-950/35 border border-red-900/60 flex flex-col justify-between gap-2">
            <div className="flex items-start gap-1.5 text-xs font-semibold text-red-300">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>
                Centar za kontrolu otrovanja pri Institutu za medicinska istraživanja i medicinu rada (IMI)
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <a
                href="tel:+38512348342"
                className="inline-flex items-center gap-2 text-sm font-mono-tabular font-bold text-red-200 hover:text-white transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-red-400 shrink-0" />
                +385 1 2348 342
              </a>
              <span className="text-[11px] text-red-300 font-mono-tabular font-semibold">
                Hitna: 112 / 194
              </span>
            </div>
          </div>
        </div>

        {/* Footer Version & Close Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1f3126]">
          <div className="text-xs text-[#7c9384] font-mono-tabular">
            gljivobook.app by Zrina v3.3 PRO • Terenski priručnik &amp; dnevnik
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[42px] px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            Zatvori
          </button>
        </div>
      </div>
    </div>
  );
};
