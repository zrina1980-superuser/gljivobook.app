import React, { useEffect, useState } from 'react';
import {
  ExternalLink,
  FileCheck2,
  Upload,
  Trash2,
  Maximize2,
  X,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Scale,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { idbGetWithMigration, idbSet } from '../services/storageService';

export interface StoredForestPermit {
  permitNumber: string;
  fileDataUrl?: string | null;
  fileName?: string | null;
  fileMimeType?: string | null;
  updatedAt: string;
}

const PERMIT_STORAGE_KEY = 'gljivobook_hs_permit_v3';
const PERMIT_SYNC_EVENT = 'gljivobook-permit-sync';

/**
 * Extracts a 4-digit year (e.g., 2026 from "13027/2026" or "HR-2025-881")
 * without hardcoding any specific year.
 */
export function extractYearFromPermitNumber(rawPermit: string): number | null {
  const trimmed = rawPermit.trim();
  if (!trimmed) return null;

  // Prefer year after slash or dash (e.g., "13027/2026")
  const slashMatch = trimmed.match(/[/-]\s*(20\d{2})\b/);
  if (slashMatch && slashMatch[1]) {
    return parseInt(slashMatch[1], 10);
  }

  // Fallback: any 4-digit 20xx year in the string
  const generalMatch = trimmed.match(/\b(20\d{2})\b/);
  if (generalMatch && generalMatch[1]) {
    return parseInt(generalMatch[1], 10);
  }

  return null;
}

interface ForestPermitSectionProps {
  compact?: boolean;
}

export const ForestPermitSection: React.FC<ForestPermitSectionProps> = ({
  compact = false,
}) => {
  const currentYear = new Date().getFullYear();

  const [permitNumber, setPermitNumber] = useState<string>('');
  const [fileDataUrl, setFileDataUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileMimeType, setFileMimeType] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showRangerModal, setShowRangerModal] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load saved permit from IndexedDB and listen for cross-component updates
  useEffect(() => {
    let mounted = true;

    const loadPermit = async () => {
      const saved = await idbGetWithMigration<StoredForestPermit | null>(
        PERMIT_STORAGE_KEY,
        null
      );
      if (mounted && saved) {
        setPermitNumber(saved.permitNumber || '');
        setFileDataUrl(saved.fileDataUrl || null);
        setFileName(saved.fileName || null);
        setFileMimeType(saved.fileMimeType || null);
      }
      if (mounted) setIsLoaded(true);
    };

    loadPermit();

    const handleSync = () => {
      loadPermit();
    };

    window.addEventListener(PERMIT_SYNC_EVENT, handleSync);
    return () => {
      mounted = false;
      window.removeEventListener(PERMIT_SYNC_EVENT, handleSync);
    };
  }, []);

  const persistPermit = async (next: {
    permitNumber: string;
    fileDataUrl: string | null;
    fileName: string | null;
    fileMimeType: string | null;
  }) => {
    const payload: StoredForestPermit = {
      permitNumber: next.permitNumber,
      fileDataUrl: next.fileDataUrl,
      fileName: next.fileName,
      fileMimeType: next.fileMimeType,
      updatedAt: new Date().toISOString(),
    };
    await idbSet(PERMIT_STORAGE_KEY, payload);
    window.dispatchEvent(new CustomEvent(PERMIT_SYNC_EVENT));
  };

  const handlePermitNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVal = e.target.value;
    setPermitNumber(nextVal);
    if (isLoaded) {
      persistPermit({
        permitNumber: nextVal,
        fileDataUrl,
        fileName,
        fileMimeType,
      });
    }
  };

  const handlePermitFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);

    // Limit to 8 MB for smooth offline IndexedDB storage
    if (file.size > 8 * 1024 * 1024) {
      setUploadError('Datoteka je prevelika (maksimalno 8 MB za offline pohranu).');
      e.target.value = '';
      return;
    }

    const mime = file.type || (file.name.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'image/jpeg');

    // If image, optionally compress if huge; if PDF, store directly as base64 DataURL in IndexedDB
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setFileDataUrl(dataUrl);
      setFileName(file.name);
      setFileMimeType(mime);
      persistPermit({
        permitNumber,
        fileDataUrl: dataUrl,
        fileName: file.name,
        fileMimeType: mime,
      });
    };
    reader.onerror = () => {
      setUploadError('Greška pri učitavanju datoteke dozvole.');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemoveFile = () => {
    setFileDataUrl(null);
    setFileName(null);
    setFileMimeType(null);
    persistPermit({
      permitNumber,
      fileDataUrl: null,
      fileName: null,
      fileMimeType: null,
    });
  };

  const extractedYear = extractYearFromPermitNumber(permitNumber);
  const isPermitValid = extractedYear !== null && extractedYear >= currentYear;
  const isPermitExpired = extractedYear !== null && extractedYear < currentYear;

  return (
    <>
      <div
        className={`rounded-2xl bg-[#0d1711] border border-[#243a2c] ${
          compact ? 'p-4 space-y-3.5' : 'p-5 sm:p-6 space-y-4'
        }`}
      >
        {/* Top Row: Title & Direct Link to HŠ Portal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="text-[11px] font-mono-tabular font-semibold text-emerald-400 uppercase tracking-wider">
              UPRAVA ŠUMA • ZAKONSKA REGULATIVA ({currentYear}.)
            </div>
            <h3 className="text-base sm:text-lg font-serif-display font-bold text-[#f2f6f3]">
              🌲 Dozvola za sakupljanje gljiva (Hrvatske šume)
            </h3>
          </div>

          <a
            href="https://www.hrsume.hr/dozvole/"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[42px] px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white inline-flex items-center justify-center gap-2 shrink-0 transition-colors shadow-sm"
          >
            <span>Izdaj besplatnu dozvolu (HŠ Portal)</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          </a>
        </div>

        {/* Summary of HŠ Rules */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="p-3 rounded-xl bg-[#121f17] border border-[#223529] flex items-start gap-2.5">
            <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[#f2f6f3]">Besplatna dozvola</div>
              <p className="text-[11px] text-[#9bb0a2] mt-0.5 leading-relaxed">
                Za osobne potrebe izdaje se besplatno i vrijedi do 31. 12. tekuće godine.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#121f17] border border-[#223529] flex items-start gap-2.5">
            <Scale className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[#f2f6f3]">Limit do 3 kg dnevno</div>
              <p className="text-[11px] text-[#9bb0a2] mt-0.5 leading-relaxed">
                Do 3 kg nadzemnih gljiva dnevno po osobi (isključujući podzemne gljive / tartufe).
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#121f17] border border-[#223529] flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[#f2f6f3]">Obuhvat UŠP Zagreb</div>
              <p className="text-[11px] text-[#9bb0a2] mt-0.5 leading-relaxed">
                UŠP Zagreb pokriva Zagreb, Medvednicu i Hrvatsko zagorje (šumarije regije).
              </p>
            </div>
          </div>
        </div>

        {/* Permit Number Input & PDF/Image Upload */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end pt-1">
          <div className="md:col-span-6 space-y-1.5">
            <label
              htmlFor={`hs-permit-input-${compact ? 'modal' : 'journal'}`}
              className="text-xs font-semibold text-[#d6e3da] block"
            >
              Broj vaše dozvole (npr. <span className="font-mono-tabular text-emerald-400">13027/{currentYear}</span>):
            </label>
            <input
              id={`hs-permit-input-${compact ? 'modal' : 'journal'}`}
              type="text"
              value={permitNumber}
              onChange={handlePermitNumberChange}
              placeholder={`npr. 13027/${currentYear}`}
              className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#09110c] border border-[#294032] text-sm font-mono-tabular font-semibold text-[#f2f6f3] placeholder:text-[#5d7566] focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="md:col-span-6 flex flex-wrap items-center gap-2">
            <label className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#16271d] hover:bg-[#1f3628] border border-emerald-500/40 text-xs font-semibold text-emerald-300 inline-flex items-center gap-2 transition-colors cursor-pointer">
              <Upload className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {fileDataUrl ? 'Zamijeni PDF / sliku dozvole' : 'Učitaj PDF ili sliku dozvole'}
              </span>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handlePermitFileUpload}
                className="hidden"
              />
            </label>

            {fileDataUrl && (
              <button
                type="button"
                onClick={handleRemoveFile}
                className="min-h-[44px] px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-800/50 text-xs font-medium text-red-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Ukloni spremljeni dokument dozvole"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Ukloni</span>
              </button>
            )}
          </div>
        </div>

        {uploadError && (
          <div className="text-xs text-red-400 font-medium">{uploadError}</div>
        )}

        {/* Dynamic Year Validation Banner */}
        {permitNumber.trim() !== '' && (
          <div className="pt-1">
            {isPermitValid && extractedYear !== null && (
              <div className="p-3.5 rounded-xl bg-emerald-950/45 border border-emerald-500/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-emerald-200">
                      ✅ Dozvola aktivna za {extractedYear}.
                    </div>
                    <div className="text-[11px] text-emerald-300/85 font-mono-tabular">
                      Broj: {permitNumber.trim()} • Vrijedi do 31. 12. {extractedYear}.
                      {fileName ? ` • Prilog: ${fileName}` : ' • Offline spremno'}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowRangerModal(true)}
                  className="min-h-[42px] px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-[#07120b] inline-flex items-center justify-center gap-2 shrink-0 transition-colors cursor-pointer shadow-md"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Prikaži dozvolu šumaru</span>
                </button>
              </div>
            )}

            {isPermitExpired && extractedYear !== null && (
              <div className="p-3.5 rounded-xl bg-amber-950/50 border border-amber-500/65 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <a
                      href="https://www.hrsume.hr/dozvole/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-bold text-amber-200 hover:text-white underline decoration-amber-400/70 transition-colors block"
                    >
                      ⚠️ Dozvola je istekla 31. 12. {extractedYear}. Kliknite ovdje za besplatnu obnovu za {currentYear}.
                    </a>
                    <div className="text-[11px] text-amber-300/80">
                      Uneseni broj ({permitNumber.trim()}) odnosi se na proteklu sezonu ({extractedYear}.). Nova dozvola izdaje se besplatno u 1 minuti.
                    </div>
                  </div>
                </div>

                {fileDataUrl && (
                  <button
                    type="button"
                    onClick={() => setShowRangerModal(true)}
                    className="min-h-[38px] px-3 py-1.5 rounded-xl bg-[#1c2820] hover:bg-[#26372c] border border-[#324839] text-xs font-medium text-[#d6e3da] inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Pregled dokumenta</span>
                  </button>
                )}
              </div>
            )}

            {extractedYear === null && (
              <div className="p-3 rounded-xl bg-[#132018] border border-[#283f31] flex items-center justify-between gap-3 text-xs text-[#9bb0a2]">
                <span>
                  Upišite i četveroznamenkastu godinu u broj dozvole (npr.{' '}
                  <strong className="text-emerald-300 font-mono-tabular">
                    {permitNumber.trim()}/{currentYear}
                  </strong>
                  ) za automatsku provjeru valjanosti.
                </span>
                {fileDataUrl && (
                  <button
                    type="button"
                    onClick={() => setShowRangerModal(true)}
                    className="min-h-[38px] px-3 py-1.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-xs font-semibold text-emerald-300 inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Prikaži dozvolu šumaru</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* If user uploaded a file but hasn't typed a permit number yet, still allow opening fullscreen */}
        {permitNumber.trim() === '' && fileDataUrl && (
          <div className="p-3.5 rounded-xl bg-[#122118] border border-emerald-500/40 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-emerald-200">
              <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Dokument dozvole spremljen u offline memoriju ({fileName || 'Dozvola HŠ'}).
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowRangerModal(true)}
              className="min-h-[40px] px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-[#07120b] inline-flex items-center gap-2 cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Prikaži dozvolu šumaru</span>
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen Modal: "Prikaži dozvolu šumaru" */}
      {showRangerModal && (
        <div
          className="fixed inset-0 z-[100] bg-[#060c08]/95 backdrop-blur-md flex flex-col p-4 sm:p-6 overflow-y-auto"
          onClick={() => setShowRangerModal(false)}
        >
          <div
            className="max-w-3xl w-full mx-auto my-auto rounded-3xl bg-[#0e1912] border-2 border-emerald-500/70 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Official Ranger Inspection Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-[#112318] via-[#152c1e] to-[#112318] border-b border-[#25402f] flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-[11px] font-mono-tabular font-bold text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>TERENSKI PRIKAZ DOZVOLE ZA LUGARA / ŠUMARA</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-white">
                  Dozvola za sakupljanje gljiva — Hrvatske šume d.o.o.
                </h3>
                <p className="text-xs text-[#a5bdb0]">
                  Osobna evidencija dozvole za sakupljanje nedrvnih šumskih proizvoda (nadzemnih gljiva za osobne potrebe)
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowRangerModal(false)}
                className="min-h-[42px] min-w-[42px] rounded-full bg-[#1a2e22] hover:bg-[#243f2f] text-[#d6e3da] flex items-center justify-center cursor-pointer shrink-0"
                aria-label="Zatvori prikaz dozvole"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Permit Details & Document Preview */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-[#09120c] border border-[#233b2b]">
                  <div className="text-[11px] font-mono-tabular text-[#889e90] uppercase">
                    BROJ DOZVOLE
                  </div>
                  <div className="text-xl sm:text-2xl font-mono-tabular font-bold text-white mt-1">
                    {permitNumber.trim() || 'Priloženi dokument'}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#09120c] border border-[#233b2b]">
                  <div className="text-[11px] font-mono-tabular text-[#889e90] uppercase">
                    STATUS VALJANOSTI
                  </div>
                  <div className="text-sm sm:text-base font-bold mt-1.5">
                    {isPermitValid && extractedYear ? (
                      <span className="text-emerald-400">
                        ✅ Aktivna za {extractedYear}. (do 31. 12. {extractedYear}.)
                      </span>
                    ) : isPermitExpired && extractedYear ? (
                      <span className="text-amber-400">
                        ⚠️ Istekla 31. 12. {extractedYear}.
                      </span>
                    ) : (
                      <span className="text-emerald-300">Sezona {currentYear}.</span>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#09120c] border border-[#233b2b]">
                  <div className="text-[11px] font-mono-tabular text-[#889e90] uppercase">
                    DNEVNI LIMIT I PODRUČJE
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#e2ece5] mt-1.5">
                    Do 3 kg nadzemnih gljiva/dan • UŠP Zagreb &amp; RH
                  </div>
                </div>
              </div>

              {/* Uploaded Image or PDF Viewer */}
              {fileDataUrl ? (
                <div className="rounded-2xl overflow-hidden border border-[#294433] bg-[#070e09] p-2">
                  {fileMimeType === 'application/pdf' ||
                  fileDataUrl.startsWith('data:application/pdf') ? (
                    <div className="space-y-3">
                      <iframe
                        src={fileDataUrl}
                        title="Hrvatske šume PDF dozvola"
                        className="w-full h-[58vh] rounded-xl bg-white"
                      />
                      <div className="flex items-center justify-between px-2 py-1 text-xs text-[#9bb0a2]">
                        <span>PDF dokument: {fileName || 'dozvola.pdf'}</span>
                        <a
                          href={fileDataUrl}
                          download={fileName || `HS-dozvola-${extractedYear || currentYear}.pdf`}
                          className="text-emerald-400 hover:underline font-semibold"
                        >
                          Preuzmi / otvori PDF
                        </a>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={fileDataUrl}
                      alt="Slikovni prikaz dozvole Hrvatske šume"
                      className="w-full max-h-[62vh] object-contain mx-auto rounded-xl"
                    />
                  )}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-[#0a130d] border border-dashed border-[#2b4535] text-center space-y-2">
                  <FileText className="w-8 h-8 text-emerald-400 mx-auto" />
                  <div className="text-sm font-semibold text-[#e2ece5]">
                    Evidentiran broj dozvole: {permitNumber.trim()}
                  </div>
                  <p className="text-xs text-[#889e90] max-w-md mx-auto">
                    Za potpuni slikovni prikaz na terenu možete priložiti i PDF ili snimku zaslona (screenshot) svoje dozvole preuzete s portala Hrvatskih šuma.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Close Bar */}
            <div className="p-4 bg-[#0a130e] border-t border-[#1f3427] flex items-center justify-between gap-3">
              <span className="text-xs text-[#889e90] font-mono-tabular">
                Gljivobook PRO v3.1 • Offline pohrana u uređaju (IndexedDB)
              </span>
              <button
                type="button"
                onClick={() => setShowRangerModal(false)}
                className="min-h-[42px] px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white cursor-pointer"
              >
                Zatvori prikaz
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
