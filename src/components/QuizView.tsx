import React, { useState, useRef, useEffect } from 'react';
import { Mushroom } from '../types/mushroom';
import { FIELD_SCRIPT_CHAPTERS, ALL_QUESTIONS_JSON } from '../data/quizQuestions';
import {
  ActiveQuizState,
  QuizQuestion,
  QuizRecord,
  QuizAnswerLog,
  QUESTION_RANKS,
  CERTIFICATE_TIERS,
  initQuizRound,
  applyFiftyFifty,
  applyBozacAdvice,
  applySkipQuestion,
  getSavedQuizRecord,
  lockQuizResult,
  updateSavedRecordHolderName,
  getCertificateTierByScore,
} from '../services/quizEngine';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ArrowRight,
  Download,
  Share2,
  Sparkles,
  ShieldCheck,
  UserCheck,
  Eye,
  Camera,
  Image as ImageIcon,
  Trash2,
  BookOpen,
  Lightbulb,
  ShoppingBasket,
  Divide,
  Lock,
  Check,
  HelpCircle,
  FileCheck2,
  ChevronRight,
} from 'lucide-react';
import { idbGet, idbSet } from '../services/storageService';
import { MushroomImage } from './MushroomImage';

interface QuizViewProps {
  mushrooms: Mushroom[];
  onSelectMushroom: (m: Mushroom) => void;
}

const AVATAR_IDB_KEY = 'gljivobook_certificate_avatar_v33';
const PROGRESS_STORAGE_KEY = 'gljivobook_quiz_active_round_v33';

/**
 * Helper to resolve a Mushroom object from an ID or slug
 */
function resolveQuizMushroom(mushrooms: Mushroom[], id?: string): Mushroom | undefined {
  if (!id) return undefined;
  return (
    mushrooms.find((m) => m.id === id) ||
    mushrooms.find((m) => m.id.includes(id) || id.includes(m.id))
  );
}

/**
 * Generates a deterministic 13x13 QR-like verification matrix from a string seed
 * for drawing the official QR verification stamp on the HTML5 Canvas ID card.
 */
function buildVerificationQrMatrix(seed: string): boolean[][] {
  const size = 13;
  const grid: boolean[][] = Array.from({ length: size }, () =>
    Array(size).fill(false)
  );

  const drawFinder = (r0: number, c0: number) => {
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        const isBorder = r === 0 || r === 4 || c === 0 || c === 4;
        const isCenter = r === 2 && c === 2;
        if (r0 + r < size && c0 + c < size) {
          grid[r0 + r][c0 + c] = isBorder || isCenter;
        }
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(0, size - 5);
  drawFinder(size - 5, 0);

  let hash = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const inTopLeft = r < 6 && c < 6;
      const inTopRight = r < 6 && c >= size - 6;
      const inBottomLeft = r >= size - 6 && c < 6;
      if (inTopLeft || inTopRight || inBottomLeft) continue;

      hash ^= (r * 31 + c * 17) & 0xff;
      hash = Math.imul(hash, 16777619);
      grid[r][c] = (Math.abs(hash) % 10) < 5;
    }
  }

  return grid;
}

export const QuizView: React.FC<QuizViewProps> = ({ mushrooms, onSelectMushroom }) => {
  // Active tab: 'quiz' (30-question exam) or 'script' ("Mala škola mikologije" Terenska skripta)
  const [activeSubView, setActiveSubView] = useState<'quiz' | 'script'>('quiz');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('ALL');

  // Quiz Engine State
  const [quizState, setQuizState] = useState<ActiveQuizState>(() => initQuizRound());
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [skippedNotice, setSkippedNotice] = useState<string | null>(null);
  const [resumedBanner, setResumedBanner] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // High-Score Lock Record ('gljivobook_quiz_record')
  const [lockedRecord, setLockedRecord] = useState<QuizRecord | null>(() =>
    getSavedQuizRecord()
  );
  // Whether user clicked "Moja iskaznica" to preview their saved record without finishing current round
  const [viewingSavedRecordOnly, setViewingSavedRecordOnly] = useState(false);

  // Answer Review Filter on Finished Screen
  const [reviewFilter, setReviewFilter] = useState<'ALL' | 'WRONG' | 'CORRECT'>('ALL');

  // Certificate Holder Name & Selfie Portrait
  const [holderName, setHolderName] = useState<string>(() => {
    const rec = getSavedQuizRecord();
    return rec?.holderName || 'Zrina';
  });
  const [userAvatarUrl, setUserAvatarUrl] = useState<string | null>(null);
  const [loadedAvatarImg, setLoadedAvatarImg] = useState<HTMLImageElement | null>(null);
  const [officialLogoImg, setOfficialLogoImg] = useState<HTMLImageElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Preload official PNG logo (/pwa-192x192.png) for HTML5 Canvas certificate
  useEffect(() => {
    const img = new Image();
    img.onload = () => setOfficialLogoImg(img);
    img.src = '/pwa-192x192.png';
  }, []);

  // Load saved avatar from IndexedDB and restore any in-progress 30-question round on mount
  useEffect(() => {
    let mounted = true;
    idbGet<string | null>(AVATAR_IDB_KEY).then((savedAvatar) => {
      if (mounted && savedAvatar) {
        setUserAvatarUrl(savedAvatar);
      }
    });

    try {
      const rawProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (rawProgress) {
        const parsed = JSON.parse(rawProgress) as ActiveQuizState;
        if (
          parsed &&
          Array.isArray(parsed.questions) &&
          parsed.questions.length === 30 &&
          !parsed.isFinished &&
          parsed.currentIndex >= 0 &&
          parsed.currentIndex < 30 &&
          (parsed.currentIndex > 0 || parsed.answersLog.length > 0)
        ) {
          setQuizState(parsed);
          const currentQ = parsed.questions[parsed.currentIndex];
          const existingLog = parsed.answersLog.find(
            (a) => a.questionId === currentQ?.id
          );
          if (existingLog) {
            setSelectedOption(existingLog.selectedOption);
          }
          setResumedBanner(true);
        }
      }
    } catch {
      // Ignore invalid saved progress
    }

    return () => {
      mounted = false;
    };
  }, []);

  // Preload selfie image for synchronous HTML5 Canvas drawing
  useEffect(() => {
    if (!userAvatarUrl) {
      setLoadedAvatarImg(null);
      return;
    }
    const img = new Image();
    img.onload = () => setLoadedAvatarImg(img);
    img.onerror = () => setLoadedAvatarImg(null);
    img.src = userAvatarUrl;
  }, [userAvatarUrl]);

  // Persist holderName changes to lockedRecord
  const handleHolderNameChange = (newName: string) => {
    setHolderName(newName);
    const updated = updateSavedRecordHolderName(newName);
    if (updated) {
      setLockedRecord(updated);
    }
  };

  // Handle selfie/gallery upload
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const tempCanvas = document.createElement('canvas');
        const maxDim = 480;
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
        tempCanvas.width = w;
        tempCanvas.height = h;
        tempCanvas.getContext('2d')?.drawImage(img, 0, 0, w, h);
        const compressedDataUrl = tempCanvas.toDataURL('image/jpeg', 0.86);
        setUserAvatarUrl(compressedDataUrl);
        idbSet(AVATAR_IDB_KEY, compressedDataUrl);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemoveAvatar = () => {
    setUserAvatarUrl(null);
    idbSet(AVATAR_IDB_KEY, null);
  };

  const saveActiveProgress = (nextState: ActiveQuizState) => {
    try {
      if (nextState.isFinished) {
        localStorage.removeItem(PROGRESS_STORAGE_KEY);
      } else {
        localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(nextState));
      }
    } catch {
      // Ignore quota errors
    }
  };

  const currentQuestion: QuizQuestion =
    quizState.questions[quizState.currentIndex] || quizState.questions[0];
  const currentRankDef =
    QUESTION_RANKS.find((r) => r.rank === currentQuestion?.rank) ||
    QUESTION_RANKS[0];

  // Select an answer option
  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null || quizState.eliminatedIndices.includes(idx)) {
      return;
    }
    setSelectedOption(idx);
    setSkippedNotice(null);

    const isCorrect = idx === currentQuestion.correctIndex;
    const nextScore = isCorrect ? quizState.score + 1 : quizState.score;

    const logEntry: QuizAnswerLog = {
      questionId: currentQuestion.id,
      rank: currentQuestion.rank,
      set: currentQuestion.set,
      questionText: currentQuestion.question,
      options: currentQuestion.options,
      selectedOption: idx,
      correctIndex: currentQuestion.correctIndex,
      isCorrect,
      explanation: currentQuestion.explanation,
      bozacHint: currentQuestion.bozacHint,
      relatedMushroomId: currentQuestion.relatedMushroomId,
    };

    const nextState: ActiveQuizState = {
      ...quizState,
      score: nextScore,
      answersLog: [
        ...quizState.answersLog.filter((a) => a.questionId !== currentQuestion.id),
        logEntry,
      ],
    };

    setQuizState(nextState);
    saveActiveProgress(nextState);
  };

  // Advance to next question or finish round
  const handleNextQuestion = () => {
    setSkippedNotice(null);
    if (quizState.currentIndex + 1 < quizState.questions.length) {
      const nextState: ActiveQuizState = {
        ...quizState,
        currentIndex: quizState.currentIndex + 1,
        eliminatedIndices: [],
        activeHint: null,
      };
      setQuizState(nextState);
      setSelectedOption(null);
      saveActiveProgress(nextState);
    } else {
      // Round completed! Lock High-Score in localStorage ('gljivobook_quiz_record')
      const finishedState: ActiveQuizState = {
        ...quizState,
        isFinished: true,
        eliminatedIndices: [],
        activeHint: null,
      };
      setQuizState(finishedState);
      saveActiveProgress(finishedState);
      setResumedBanner(false);
      setViewingSavedRecordOnly(false);

      const cleanName = (holderName || 'Zrina').trim() || 'Zrina';
      const updatedRecord = lockQuizResult(
        finishedState.score,
        finishedState.questions.length,
        cleanName
      );
      setLockedRecord(updatedRecord);
    }
  };

  // Start a brand new 30-question round
  const handleStartNewRound = () => {
    try {
      localStorage.removeItem(PROGRESS_STORAGE_KEY);
    } catch {
      // Ignore
    }
    const freshState = initQuizRound();
    setQuizState(freshState);
    setSelectedOption(null);
    setSkippedNotice(null);
    setResumedBanner(false);
    setShowResetConfirm(false);
    setViewingSavedRecordOnly(false);
    setReviewFilter('ALL');
    setActiveSubView('quiz');
  };

  // Joker 1: 50:50 (Dva spora)
  const handleJokerFiftyFifty = () => {
    if (selectedOption !== null || quizState.jokersUsed.fiftyFifty) return;
    const nextState = applyFiftyFifty(quizState);
    setQuizState(nextState);
    saveActiveProgress(nextState);
  };

  // Joker 2: Savjet prof. Bošca
  const handleJokerBozacAdvice = () => {
    if (quizState.jokersUsed.bozacAdvice) return;
    const nextState = applyBozacAdvice(quizState);
    setQuizState(nextState);
    saveActiveProgress(nextState);
  };

  // Joker 3: Sigurnosna košara (Preskok pitanja)
  const handleJokerSkipQuestion = () => {
    if (selectedOption !== null || quizState.jokersUsed.skipQuestion) return;
    const oldQuestion = currentQuestion;
    const nextState = applySkipQuestion(quizState);
    setQuizState(nextState);
    setSelectedOption(null);
    setSkippedNotice(
      `Pitanje je preskočeno bez gubitka bodova i zamijenjeno rezervnim pitanjem iz Ranga ${oldQuestion.rank} (Set ${oldQuestion.set}).`
    );
    saveActiveProgress(nextState);
  };

  // Determine whether we are showing the Certificate/Finished screen
  const showCertificateScreen = quizState.isFinished || viewingSavedRecordOnly;

  // Scores to display on the Certificate (High-Score Lock guarantees we ALWAYS use bestScore for the official ID card!)
  const effectiveBestScore = lockedRecord
    ? lockedRecord.bestScore
    : quizState.score;
  const effectiveTotal = lockedRecord
    ? lockedRecord.totalQuestions
    : quizState.questions.length;
  const bestPercentage = Math.round(
    (effectiveBestScore / Math.max(1, effectiveTotal)) * 100
  );
  const lockedCertTier = getCertificateTierByScore(effectiveBestScore);

  const currentAttemptScore = quizState.score;
  const currentAttemptPct = Math.round(
    (currentAttemptScore / Math.max(1, quizState.questions.length)) * 100
  );
  const currentAttemptTier = getCertificateTierByScore(currentAttemptScore);

  // Draw the 800x500px "Gljivarska iskaznica" with QR verification stamp on HTML5 Canvas
  useEffect(() => {
    if (!showCertificateScreen || activeSubView !== 'quiz') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rank = lockedCertTier;
    const displayScore = effectiveBestScore;
    const displayTotal = effectiveTotal;
    const displayPct = bestPercentage;
    const cleanName = (holderName || 'Zrina').trim() || 'Zrina';

    const unlockedDateObj = lockedRecord?.unlockedAt
      ? new Date(lockedRecord.unlockedAt)
      : new Date();
    const dateStr = unlockedDateObj.toLocaleDateString('hr-HR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const serialId = `GB-V33-R${rank.tier}-${String(
      ((cleanName.charCodeAt(0) * 137 + displayScore * 31) % 9000) + 1000
    )}`;

    const W = 800;
    const H = 500;
    ctx.clearRect(0, 0, W, H);

    // 1. Deep Forest Gradient Background
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#08100b');
    bgGrad.addColorStop(0.55, '#101e15');
    bgGrad.addColorStop(1, '#09130d');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Subtle radial glow
    const glow1 = ctx.createRadialGradient(650, 140, 10, 650, 140, 280);
    glow1.addColorStop(0, `${rank.primaryColor}24`);
    glow1.addColorStop(1, 'transparent');
    ctx.fillStyle = glow1;
    ctx.fillRect(0, 0, W, H);

    const glow2 = ctx.createRadialGradient(130, 320, 10, 130, 320, 240);
    glow2.addColorStop(0, 'rgba(16, 185, 129, 0.12)');
    glow2.addColorStop(1, 'transparent');
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, W, H);

    // Subtle topographic grid lines
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.045)';
    ctx.lineWidth = 1;
    for (let x = 40; x < W; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 40; y < H; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // 2. Outer & Inner Frame Borders
    ctx.strokeStyle = '#243b2c';
    ctx.lineWidth = 2;
    ctx.strokeRect(18, 18, W - 36, H - 36);

    ctx.strokeStyle = rank.borderColor;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(26, 26, W - 52, H - 52);

    // Corner accents
    const cornerLen = 18;
    ctx.strokeStyle = rank.primaryColor;
    ctx.lineWidth = 3;
    const corners = [
      [26, 26, 1, 1],
      [W - 26, 26, -1, 1],
      [26, H - 26, 1, -1],
      [W - 26, H - 26, -1, -1],
    ];
    corners.forEach(([cx, cy, dx, dy]) => {
      ctx.beginPath();
      ctx.moveTo(cx, cy + dy * cornerLen);
      ctx.lineTo(cx, cy);
      ctx.lineTo(cx + dx * cornerLen, cy);
      ctx.stroke();
    });

    // 3. Top Header Bar: Official gljivobook.app PNG Logo + Card Title + Serial/Date
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(48, 44, 52, 52, 13);
    ctx.fillStyle = '#040a0e';
    ctx.fill();
    ctx.clip();
    if (officialLogoImg) {
      ctx.drawImage(officialLogoImg, 48, 44, 52, 52);
    }
    ctx.restore();

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(48, 44, 52, 52, 13);
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 11px Inter, system-ui, sans-serif';
    ctx.fillText('GLJIVOBOOK PRO v3.3 • SLUŽBENA GLJIVARSKA ISKAZNICA', 114, 64);

    ctx.fillStyle = '#f2f6f3';
    ctx.font = 'bold 25px Georgia, serif';
    ctx.fillText('Gljivobook by Zrina', 114, 91);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#889e90';
    ctx.font = '600 12px monospace';
    ctx.fillText(`SERIJSKI BROJ: ${serialId}`, W - 48, 64);
    ctx.fillStyle = '#d6e3da';
    ctx.font = '500 13px monospace';
    ctx.fillText(`DATUM: ${dateStr}`, W - 48, 88);
    ctx.textAlign = 'left';

    ctx.strokeStyle = '#1f3326';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(48, 112);
    ctx.lineTo(W - 48, 112);
    ctx.stroke();

    // 4. LEFT COLUMN: ID PORTRAIT FRAME (120x150px)
    const photoX = 52;
    const photoY = 136;
    const photoW = 120;
    const photoH = 150;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoW, photoH, 12);
    ctx.fillStyle = '#0b150f';
    ctx.fill();
    ctx.clip();

    ctx.strokeStyle = 'rgba(16, 185, 129, 0.09)';
    ctx.lineWidth = 1;
    for (let gx = photoX; gx <= photoX + photoW; gx += 15) {
      ctx.beginPath();
      ctx.moveTo(gx, photoY);
      ctx.lineTo(gx, photoY + photoH);
      ctx.stroke();
    }
    for (let gy = photoY; gy <= photoY + photoH; gy += 15) {
      ctx.beginPath();
      ctx.moveTo(photoX, gy);
      ctx.lineTo(photoX + photoW, gy);
      ctx.stroke();
    }

    if (loadedAvatarImg && loadedAvatarImg.width > 0 && loadedAvatarImg.height > 0) {
      const scale = Math.max(
        photoW / loadedAvatarImg.width,
        photoH / loadedAvatarImg.height
      );
      const drawW = loadedAvatarImg.width * scale;
      const drawH = loadedAvatarImg.height * scale;
      const drawX = photoX + (photoW - drawW) / 2;
      const drawY = photoY + (photoH - drawH) / 2;
      ctx.drawImage(loadedAvatarImg, drawX, drawY, drawW, drawH);

      const portGrad = ctx.createLinearGradient(
        photoX,
        photoY + photoH - 36,
        photoX,
        photoY + photoH
      );
      portGrad.addColorStop(0, 'transparent');
      portGrad.addColorStop(1, 'rgba(8, 16, 11, 0.75)');
      ctx.fillStyle = portGrad;
      ctx.fillRect(photoX, photoY + photoH - 36, photoW, 36);
    } else {
      const midX = photoX + photoW / 2;
      ctx.fillStyle = 'rgba(16, 185, 129, 0.18)';
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.55)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(midX, photoY + photoH + 8, 48, Math.PI * 1.15, Math.PI * 1.85);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(midX, photoY + 68, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(midX - 28, photoY + 55);
      ctx.quadraticCurveTo(midX, photoY + 32, midX + 28, photoY + 55);
      ctx.closePath();
      ctx.fillStyle = 'rgba(251, 191, 36, 0.22)';
      ctx.fill();
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = '#6e8a78';
      ctx.font = 'bold 9px monospace';
      ctx.fillText('ID PORTRET', midX, photoY + photoH - 12);
      ctx.textAlign = 'left';
    }
    ctx.restore();

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoW, photoH, 12);
    ctx.stroke();

    // High-Score Lock Pill under Portrait
    ctx.fillStyle = '#13241a';
    ctx.strokeStyle = '#253c2d';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(photoX, photoY + photoH + 10, photoW, 24, 6);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 9.5px monospace';
    ctx.fillText(
      loadedAvatarImg ? 'FOTO VERIFICIRAN' : 'REKORD ZAKLJUČAN',
      photoX + photoW / 2,
      photoY + photoH + 26
    );
    ctx.textAlign = 'left';

    // 5. CENTER COLUMN: HOLDER NAME, ACHIEVED RANK, TITLE & METRICS
    const centerX = 194;

    ctx.fillStyle = '#889e90';
    ctx.font = '600 11px Inter, system-ui, sans-serif';
    ctx.fillText('NOSITELJ ISKAZNICE / GLJIVAR:', centerX, 148);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px Georgia, serif';
    ctx.fillText(cleanName.slice(0, 22), centerX, 184);

    ctx.fillStyle = '#889e90';
    ctx.font = '600 11px Inter, system-ui, sans-serif';
    ctx.fillText(`OSTVARENI MIKOLOŠKI STUPANJ (${rank.tier} / 6):`, centerX, 222);

    ctx.fillStyle = rank.primaryColor;
    ctx.font = 'bold 22px Georgia, serif';
    ctx.fillText(`STUPANJ ${rank.roman}: ${rank.shortName.toUpperCase()}`, centerX, 250);

    ctx.fillStyle = '#e2ece5';
    ctx.font = 'italic 15.5px Georgia, serif';
    ctx.fillText(`„${rank.badgeTitle}”`, centerX, 276);

    // Lower Metrics Boxes + QR Verification Stamp
    // Box 1: Score & Percentage
    ctx.fillStyle = '#0c1610';
    ctx.strokeStyle = '#253c2d';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(centerX, 304, 156, 86, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#889e90';
    ctx.font = '600 10px Inter, system-ui, sans-serif';
    ctx.fillText('NAJBOLJI REZULTAT', centerX + 12, 326);
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 23px monospace';
    ctx.fillText(`${displayScore}/${displayTotal}`, centerX + 12, 356);
    ctx.fillStyle = '#9bb0a2';
    ctx.font = '600 11px monospace';
    ctx.fillText(`Točnost: ${displayPct}%`, centerX + 12, 376);

    // Box 2: QR Verification Stamp (QR verifikacijski pečat)
    const qrBoxX = centerX + 168;
    const qrBoxY = 304;
    const qrBoxW = 192;
    const qrBoxH = 86;

    ctx.fillStyle = '#0c1610';
    ctx.strokeStyle = rank.borderColor;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(qrBoxX, qrBoxY, qrBoxW, qrBoxH, 12);
    ctx.fill();
    ctx.stroke();

    // Draw QR Matrix inside white pad
    const qrMatrix = buildVerificationQrMatrix(`${serialId}-${cleanName}-${displayScore}`);
    const qrPadX = qrBoxX + 10;
    const qrPadY = qrBoxY + 10;
    const qrPadSize = 66;

    ctx.fillStyle = '#f6f4ee';
    ctx.beginPath();
    ctx.roundRect(qrPadX, qrPadY, qrPadSize, qrPadSize, 6);
    ctx.fill();

    const cellSize = 4.2;
    const matrixStartX = qrPadX + 5.5;
    const matrixStartY = qrPadY + 5.5;
    ctx.fillStyle = '#0c1610';
    for (let r = 0; r < qrMatrix.length; r++) {
      for (let c = 0; c < qrMatrix[r].length; c++) {
        if (qrMatrix[r][c]) {
          ctx.fillRect(
            matrixStartX + c * cellSize,
            matrixStartY + r * cellSize,
            cellSize - 0.3,
            cellSize - 0.3
          );
        }
      }
    }

    // QR Stamp Labels
    ctx.fillStyle = rank.primaryColor;
    ctx.font = 'bold 9.5px monospace';
    ctx.fillText('QR VERIFIKACIJA', qrPadX + qrPadSize + 10, qrBoxY + 26);
    ctx.fillStyle = '#e2ece5';
    ctx.font = '600 10px Inter, system-ui, sans-serif';
    ctx.fillText('PEČAT ISPITA', qrPadX + qrPadSize + 10, qrBoxY + 43);
    ctx.fillStyle = '#889e90';
    ctx.font = '500 9.5px monospace';
    ctx.fillText(serialId, qrPadX + qrPadSize + 10, qrBoxY + 60);
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 9px monospace';
    ctx.fillText('✓ BOŽAC STANDARD', qrPadX + qrPadSize + 10, qrBoxY + 75);

    // 6. RIGHT COLUMN: GRAPHIC RANK MEDALLION / BADGE (Center X = 656, Y = 236)
    const cx = 656;
    const cy = 236;
    const outerR = 78;

    const badgeGrad = ctx.createLinearGradient(
      cx - outerR,
      cy - outerR,
      cx + outerR,
      cy + outerR
    );
    badgeGrad.addColorStop(0, rank.primaryColor);
    badgeGrad.addColorStop(0.5, '#ffffff');
    badgeGrad.addColorStop(1, rank.secondaryColor);

    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.fillStyle = '#0c1610';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = badgeGrad;
    ctx.stroke();

    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([6, 4]);
    ctx.arc(cx, cy, outerR - 11, 0, Math.PI * 2);
    ctx.strokeStyle = rank.primaryColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    const innerGrad = ctx.createRadialGradient(cx, cy - 18, 10, cx, cy, outerR - 17);
    innerGrad.addColorStop(0, '#182b20');
    innerGrad.addColorStop(1, '#09120d');
    ctx.beginPath();
    ctx.arc(cx, cy, outerR - 17, 0, Math.PI * 2);
    ctx.fillStyle = innerGrad;
    ctx.fill();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#9bb0a2';
    ctx.font = 'bold 9.5px Inter, system-ui, sans-serif';
    ctx.fillText('GLJIVOBOOK RANG', cx, cy - 30);

    ctx.fillStyle = rank.primaryColor;
    ctx.font = 'bold 38px Georgia, serif';
    ctx.fillText(rank.roman, cx, cy + 10);

    ctx.fillStyle = '#f2f6f3';
    ctx.font = 'bold 10.5px Inter, system-ui, sans-serif';
    ctx.fillText(rank.shortName.toUpperCase(), cx, cy + 30);

    const starsStr = '★'.repeat(rank.tier) + '☆'.repeat(6 - rank.tier);
    ctx.fillStyle = '#fbbf24';
    ctx.font = '12.5px sans-serif';
    ctx.fillText(starsStr, cx, cy + 48);

    ctx.fillStyle = '#13241a';
    ctx.strokeStyle = rank.borderColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(cx - 86, cy + 88, 172, 26, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = rank.primaryColor;
    ctx.font = 'bold 10px monospace';
    ctx.fillText(`STUPANJ ${rank.tier}/6 • VERIFICIRANO`, cx, cy + 105);

    // 7. BOTTOM FOOTER
    ctx.strokeStyle = '#1f3326';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(48, 424);
    ctx.lineTo(W - 48, 424);
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#a8bfb0';
    ctx.font = '500 11.5px Inter, system-ui, sans-serif';
    ctx.fillText(
      '⚠️ Službena terenska iskaznica s QR verifikacijskim pečatom. Vrijedi u šumi uz poštivanje pravila košare (Zrina).',
      W / 2,
      450
    );
    ctx.textAlign = 'left';
  }, [
    showCertificateScreen,
    activeSubView,
    holderName,
    loadedAvatarImg,
    officialLogoImg,
    lockedCertTier,
    effectiveBestScore,
    effectiveTotal,
    bestPercentage,
    lockedRecord,
  ]);

  const handleDownloadCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const cleanSlug =
      (holderName || 'zrina')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9čćžšđ]+/gi, '-') || 'zrina';
    const link = document.createElement('a');
    link.download = `gljivobook-iskaznica-${cleanSlug}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleShareCard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), 'image/png')
      );
      if (blob && navigator.share) {
        const file = new File([blob], 'gljivobook-iskaznica.png', {
          type: 'image/png',
        });
        await navigator.share({
          title: 'Moja Gljivarska Iskaznica — Gljivobook PRO',
          text: `Moj zaključani rekord u Gljivobooku: ${effectiveBestScore}/${effectiveTotal} (${lockedCertTier.badgeTitle})!`,
          files: [file],
        });
        return;
      }
    } catch {
      // Fallback to direct download
    }
    handleDownloadCard();
  };

  const relatedMushroom = resolveQuizMushroom(
    mushrooms,
    currentQuestion?.relatedMushroomId
  );
  const visualMushroom = resolveQuizMushroom(
    mushrooms,
    currentQuestion?.visualMushroomId
  );

  const visibleChapters =
    selectedChapterId === 'ALL'
      ? FIELD_SCRIPT_CHAPTERS
      : FIELD_SCRIPT_CHAPTERS.filter((c) => c.id === selectedChapterId);

  const filteredAnswerLogs = quizState.answersLog.filter((item) => {
    if (reviewFilter === 'WRONG') return !item.isCorrect;
    if (reviewFilter === 'CORRECT') return item.isCorrect;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Top Header Card & Mode Switcher ("Ispit znanja" vs "📖 Pripremi se za ispit / Mala škola mikologije") */}
      <div className="rounded-2xl bg-[#121c16] border border-[#233529] p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono-tabular text-emerald-400 font-semibold flex flex-wrap items-center gap-2">
              <span>MIKOLOŠKI CERTIFIKACIJSKI SUSTAV • BAZA 60 PITANJA (SET A & SET B)</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#18291f] border border-emerald-500/30 text-[10px] text-emerald-300">
                <Lock className="w-3 h-3" /> High-Score Lock aktivan
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif-display font-bold text-[#f2f6f3]">
              Rangirani kviz znanja i Mala škola mikologije
            </h2>
            <p className="text-xs sm:text-sm text-[#9bb0a2]">
              Svaka runda izvlači točno 30 pitanja kroz 5 progresivnih rangova težine (po 3 iz Seta A i 3 iz Seta B za svaki rang) uz 3 jednokratna terenska jokera.
            </p>
          </div>

          {/* Primary Action Buttons: "📖 Pripremi se za ispit" & "Moja iskaznica" */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setActiveSubView(activeSubView === 'script' ? 'quiz' : 'script');
              }}
              className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-2 cursor-pointer transition-colors border ${
                activeSubView === 'script'
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-[#18291f] hover:bg-[#21382a] border-emerald-500/40 text-emerald-300'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                {activeSubView === 'script'
                  ? '🎯 Vrati se na kviz ispit'
                  : '📖 Pripremi se za ispit (Skripta)'}
              </span>
            </button>

            {lockedRecord && (
              <button
                type="button"
                onClick={() => {
                  setActiveSubView('quiz');
                  setViewingSavedRecordOnly(!viewingSavedRecordOnly);
                }}
                className={`min-h-[42px] px-3.5 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-2 cursor-pointer transition-colors border ${
                  viewingSavedRecordOnly
                    ? 'bg-amber-500 text-black border-amber-400 font-bold'
                    : 'bg-[#16241b] hover:bg-[#1f3326] border-[#2b4334] text-[#d6e3da]'
                }`}
                title="Pregledaj svoj zaključani povijesni rekord i Gljivarsku iskaznicu"
              >
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Rekord: {lockedRecord.bestScore}/{lockedRecord.totalQuestions}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* 5 Progressive Ranks Strip (when in Quiz mode) */}
        {activeSubView === 'quiz' && (
          <div className="space-y-2 pt-1 border-t border-[#1e3024]">
            <div className="flex items-center justify-between text-[11px] text-[#889e90]">
              <span className="font-semibold uppercase tracking-wider">
                Progresija runde kroz 5 rangova (30 pitanja = 5 × [3 Set A + 3 Set B]):
              </span>
              <span className="font-mono-tabular text-emerald-400">
                Ukupna baza: {ALL_QUESTIONS_JSON.length} pitanja
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {QUESTION_RANKS.map((r) => {
                const isCurrentRank =
                  !showCertificateScreen && currentQuestion?.rank === r.rank;
                const isCompletedRank =
                  showCertificateScreen || (currentQuestion?.rank || 1) > r.rank;

                return (
                  <div
                    key={r.rank}
                    className={`p-2.5 rounded-xl border text-left transition-colors ${
                      isCurrentRank
                        ? 'bg-[#18291f] border-emerald-500/70'
                        : isCompletedRank
                        ? 'bg-[#0e1913] border-emerald-500/30'
                        : 'bg-[#0c140f] border-[#223428] opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 text-[10px] font-mono-tabular">
                      <span className="font-bold text-amber-400">
                        RANG {r.roman}
                      </span>
                      <span className="text-[#889e90]">{r.questionRangeLabel}</span>
                    </div>
                    <div className="text-xs font-bold text-[#f2f6f3] mt-0.5 truncate">
                      {r.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* =====================================================================
          VIEW 1: MALA ŠKOLA MIKOLOGIJE (CJELOVITA TERENSKA SKRIPTA ZA ŠTREBERE)
         ===================================================================== */}
      {activeSubView === 'script' ? (
        <div className="space-y-5">
          {/* Script Header & Chapter Filter Bar */}
          <div className="rounded-2xl bg-[#121c16] border border-[#233529] p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-mono-tabular text-amber-400 font-bold uppercase tracking-wider">
                  MALA ŠKOLA MIKOLOGIJE • TERENSKA SKRIPTA ZA ŠTREBERE
                </div>
                <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-[#f2f6f3] mt-0.5">
                  Teorijska priprema za 100% točnih odgovora na ispitu
                </h3>
                <p className="text-xs sm:text-sm text-[#9bb0a2] mt-1">
                  Sustavni pregled 5 ključnih poglavlja prema enciklopedijskoj školi prof. dr. sc. Romana Bošca: morfologija, ekologija i zakon, mikotoksikologija, kritične dvojnice i kulinarska pravila.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveSubView('quiz')}
                className="min-h-[42px] px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white inline-flex items-center gap-2 shrink-0 cursor-pointer transition-colors"
              >
                <span>Kreni na kviz (30 pitanja)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Chapter Selector Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setSelectedChapterId('ALL')}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  selectedChapterId === 'ALL'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#0c140f] text-[#9bb0a2] hover:text-white border border-[#223428]'
                }`}
              >
                📚 Svih 5 poglavlja
              </button>
              {FIELD_SCRIPT_CHAPTERS.map((chap) => (
                <button
                  key={chap.id}
                  type="button"
                  onClick={() => setSelectedChapterId(chap.id)}
                  className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                    selectedChapterId === chap.id
                      ? 'bg-amber-500 text-black font-bold'
                      : 'bg-[#0c140f] text-[#9bb0a2] hover:text-white border border-[#223428]'
                  }`}
                >
                  {chap.shortTitle}
                </button>
              ))}
            </div>
          </div>

          {/* Chapters Content */}
          <div className="space-y-5">
            {visibleChapters.map((chapter) => (
              <div
                key={chapter.id}
                className="rounded-2xl bg-[#121c16] border border-[#233529] p-5 sm:p-6 space-y-5"
              >
                <div className="border-b border-[#1f3126] pb-4 space-y-1.5">
                  <div className="text-xs font-mono-tabular font-bold text-emerald-400">
                    POGLAVLJE {chapter.chapterNumber} / 5 • TERENSKA SKRIPTA
                  </div>
                  <h4 className="text-lg sm:text-xl font-serif-display font-bold text-[#f2f6f3]">
                    {chapter.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#9bb0a2]">
                    {chapter.subtitle}
                  </p>
                </div>

                <div className="space-y-4">
                  {chapter.blocks.map((block, bIdx) => {
                    let badgeStyle =
                      'bg-[#18291f] border-emerald-500/40 text-emerald-300';
                    if (block.badgeTone === 'red') {
                      badgeStyle =
                        'bg-red-950/60 border-red-500/40 text-red-200';
                    } else if (block.badgeTone === 'amber') {
                      badgeStyle =
                        'bg-amber-950/50 border-amber-500/40 text-amber-300';
                    }

                    return (
                      <div
                        key={bIdx}
                        className="rounded-xl bg-[#0c140f] border border-[#223428] p-4 space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h5 className="text-sm sm:text-base font-bold text-[#f2f6f3]">
                            {block.heading}
                          </h5>
                          {block.badge && (
                            <span
                              className={`px-2.5 py-0.5 rounded-md border text-[10px] font-mono-tabular font-bold ${badgeStyle}`}
                            >
                              {block.badge}
                            </span>
                          )}
                        </div>

                        {block.paragraphs &&
                          block.paragraphs.map((p, pIdx) => (
                            <p
                              key={pIdx}
                              className="text-xs sm:text-sm text-[#d6e3da] leading-relaxed"
                            >
                              {p}
                            </p>
                          ))}

                        {block.bullets && (
                          <div className="space-y-2.5 pt-1">
                            {block.bullets.map((b, i) => (
                              <div
                                key={i}
                                className="p-3 rounded-xl bg-[#121e16] border border-[#1f3225] space-y-1"
                              >
                                <div className="text-xs sm:text-sm font-bold text-emerald-400">
                                  • {b.term}
                                </div>
                                <p className="text-xs sm:text-sm text-[#d6e3da] leading-relaxed">
                                  {b.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Key Takeaway Callout */}
                <div className="p-3.5 rounded-xl bg-[#18291f] border border-emerald-500/40 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-[#e2ece5]">
                    <span className="font-bold text-amber-400">
                      Zapamti za ispit i teren:{' '}
                    </span>
                    {chapter.keyTakeaway}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : showCertificateScreen ? (
        /* =====================================================================
           VIEW 2: FINISHED EXAM / HIGH-SCORE LOCK CERTIFICATE & ANSWER ANALYSIS
           ===================================================================== */
        <div className="rounded-2xl bg-[#121c16] border border-[#25392c] p-5 sm:p-7 space-y-6">
          {/* High-Score Lock Status Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1f3126] pb-5">
            <div className="space-y-1.5">
              <div className="inline-flex flex-wrap items-center gap-2 text-xs font-mono-tabular font-bold text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>
                  SLUŽBENA GLJIVARSKA ISKAZNICA • STUPANJ {lockedCertTier.roman} ({lockedCertTier.tier}/6)
                </span>
                {lockedRecord && !viewingSavedRecordOnly && (
                  <span className="px-2.5 py-0.5 rounded-md bg-[#18291f] border border-emerald-500/40 text-emerald-300">
                    {lockedRecord.isNewBest
                      ? '🏆 NOVI OSOBNI REKORD ZAKLJUČAN!'
                      : '🔒 POVIJESNI REKORD SAČUVAN (HIGH-SCORE LOCK)'}
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#f2f6f3]">
                {lockedCertTier.badgeTitle}
              </h3>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm">
                <span className="font-semibold text-emerald-300">
                  Zaključani najbolji rezultat: {effectiveBestScore}/{effectiveTotal} ({bestPercentage}%)
                </span>
                {!viewingSavedRecordOnly && (
                  <span className="text-[#9bb0a2]">
                    • Rezultat ove runde: {currentAttemptScore}/{quizState.questions.length} ({currentAttemptPct}% — {currentAttemptTier.shortName})
                  </span>
                )}
              </div>

              {lockedRecord &&
                !viewingSavedRecordOnly &&
                currentAttemptScore < lockedRecord.bestScore && (
                  <div className="p-3 rounded-xl bg-[#18291f] border border-emerald-500/40 text-xs text-[#d6e3da] flex items-start gap-2.5 mt-2">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>High-Score Lock zaštita:</strong> U ovoj rundi ostvarili ste{' '}
                      <strong>{currentAttemptScore}/30</strong> bodova, no vaš raniji rekord od{' '}
                      <strong>{lockedRecord.bestScore}/30</strong> i titula{' '}
                      <strong>„{lockedRecord.badgeTitle}”</strong> trajno su sačuvani na vašoj iskaznici i nisu umanjeni!
                    </span>
                  </div>
                )}

              <p className="text-xs text-[#9bb0a2] max-w-2xl pt-0.5">
                {lockedCertTier.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start shrink-0">
              {viewingSavedRecordOnly && !quizState.isFinished && (
                <button
                  type="button"
                  onClick={() => setViewingSavedRecordOnly(false)}
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white inline-flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Nastavi trenutnu rundu</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={handleStartNewRound}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#19281f] hover:bg-[#22362a] border border-[#2c4435] text-xs font-semibold text-[#e2ece5] inline-flex items-center gap-2 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-emerald-400" />
                <span>Nova runda (30 novih kombinacija)</span>
              </button>
            </div>
          </div>

          {/* Name Input + Selfie / Photo Upload + Download Controls */}
          <div className="rounded-2xl bg-[#0c140f] border border-[#223529] p-4 sm:p-5 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
              {/* Name Input */}
              <div className="lg:col-span-5 space-y-1.5">
                <label
                  htmlFor="certificate-holder-name"
                  className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Ime ili nadimak na Gljivarskoj iskaznici:</span>
                </label>
                <input
                  id="certificate-holder-name"
                  type="text"
                  maxLength={22}
                  value={holderName}
                  onChange={(e) => handleHolderNameChange(e.target.value)}
                  placeholder="npr. Zrina"
                  className="w-full min-h-[44px] px-4 py-2 rounded-xl bg-[#121e16] border border-[#2a4233] text-sm font-semibold text-[#f2f6f3] focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Selfie & Gallery Upload Buttons */}
              <div className="lg:col-span-7 flex flex-wrap items-center gap-2">
                <label className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#18291f] hover:bg-[#223a2c] border border-emerald-500/45 text-xs font-semibold text-emerald-300 inline-flex items-center gap-2 transition-colors cursor-pointer">
                  <Camera className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>📸 Uslikaj selfie za iskaznicu</span>
                  <input
                    type="file"
                    accept="image/*"
                    capture="user"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </label>

                <label className="min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#15221a] hover:bg-[#1e3125] border border-[#283f30] text-xs font-medium text-[#d6e3da] inline-flex items-center gap-1.5 transition-colors cursor-pointer">
                  <ImageIcon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Iz galerije</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </label>

                {userAvatarUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="min-h-[44px] px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-800/50 text-xs font-medium text-red-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Ukloni selfie sliku i vrati siluetu"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Ukloni sliku</span>
                  </button>
                )}
              </div>
            </div>

            {/* Download & Share Action Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#1a2b20]">
              <span className="text-xs text-[#9bb0a2]">
                Službena Gljivarska iskaznica s imenom, datumom, rangom i QR verifikacijskim pečatom:
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadCard}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs sm:text-sm font-semibold text-white inline-flex items-center gap-2 transition-colors cursor-pointer shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>Preuzmi iskaznicu (.png)</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareCard}
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#18281e] hover:bg-[#22382a] border border-[#2c4435] text-xs font-semibold text-emerald-300 inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Podijeli</span>
                </button>
              </div>
            </div>

            {/* HTML5 Canvas 800x500 Preview */}
            <div className="w-full overflow-x-auto flex justify-center pt-2">
              <canvas
                ref={canvasRef}
                width={800}
                height={500}
                className="w-full max-w-[800px] h-auto rounded-2xl border border-[#2b4334] shadow-2xl bg-[#09110c]"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#889e90] pt-1">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  Rezolucija: 800×500 px (HTML5 Canvas PNG) • QR verifikacijski pečat uključen
                </span>
              </span>
              <span className="font-mono-tabular text-emerald-400">
                Spremljeno u localStorage (gljivobook_quiz_record)
              </span>
            </div>
          </div>

          {/* Detailed Answer Review Section (Analiza točnih i netočnih odgovora s objašnjenjima iz baze) */}
          {quizState.answersLog.length > 0 && (
            <div className="space-y-4 pt-2 border-t border-[#1f3126]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base sm:text-lg font-serif-display font-bold text-[#f2f6f3] flex items-center gap-2">
                    <FileCheck2 className="w-5 h-5 text-emerald-400" />
                    <span>
                      Analiza odgovora iz odigrane runde ({quizState.answersLog.length} pitanja)
                    </span>
                  </h4>
                  <p className="text-xs text-[#9bb0a2]">
                    Pregled svih vaših točnih i netočnih odgovora uz stručna objašnjenja i savjete prof. Bošca.
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setReviewFilter('ALL')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                      reviewFilter === 'ALL'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#0c140f] text-[#9bb0a2] border border-[#223428]'
                    }`}
                  >
                    Svi ({quizState.answersLog.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewFilter('WRONG')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                      reviewFilter === 'WRONG'
                        ? 'bg-red-700 text-white'
                        : 'bg-[#0c140f] text-[#9bb0a2] border border-[#223428]'
                    }`}
                  >
                    Netočni ({quizState.answersLog.filter((a) => !a.isCorrect).length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewFilter('CORRECT')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                      reviewFilter === 'CORRECT'
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#0c140f] text-[#9bb0a2] border border-[#223428]'
                    }`}
                  >
                    Točni ({quizState.answersLog.filter((a) => a.isCorrect).length})
                  </button>
                </div>
              </div>

              <div className="space-y-3 max-h-[540px] overflow-y-auto pr-1">
                {filteredAnswerLogs.map((item, idx) => {
                  const m = resolveQuizMushroom(mushrooms, item.relatedMushroomId);
                  return (
                    <div
                      key={item.questionId}
                      className={`p-4 rounded-xl border space-y-2.5 ${
                        item.isCorrect
                          ? 'bg-[#0c1510] border-emerald-500/35'
                          : 'bg-red-950/25 border-red-500/45'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-tabular">
                        <span className="text-[#889e90]">
                          #{idx + 1} • RANG {item.rank} (Set {item.set})
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-md font-bold inline-flex items-center gap-1 ${
                            item.isCorrect
                              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                              : 'bg-red-950/60 text-red-200 border border-red-500/40'
                          }`}
                        >
                          {item.isCorrect ? (
                            <>
                              <Check className="w-3 h-3" /> TOČNO
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" /> NETOČNO
                            </>
                          )}
                        </span>
                      </div>

                      <div className="text-xs sm:text-sm font-bold text-[#f2f6f3]">
                        {item.questionText}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div
                          className={`p-2.5 rounded-lg border ${
                            item.isCorrect
                              ? 'bg-[#13241a] border-emerald-500/40 text-emerald-200'
                              : 'bg-red-950/40 border-red-500/40 text-red-200'
                          }`}
                        >
                          <div className="text-[10px] uppercase font-mono-tabular opacity-75">
                            Vaš odgovor:
                          </div>
                          <div className="font-semibold mt-0.5">
                            {item.options[item.selectedOption]}
                          </div>
                        </div>

                        {!item.isCorrect && (
                          <div className="p-2.5 rounded-lg bg-[#13241a] border border-emerald-500/40 text-emerald-200">
                            <div className="text-[10px] uppercase font-mono-tabular opacity-75">
                              Točan odgovor:
                            </div>
                            <div className="font-semibold mt-0.5">
                              {item.options[item.correctIndex]}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="text-xs text-[#d6e3da] leading-relaxed pt-1">
                        <span className="font-semibold text-emerald-400">
                          Objašnjenje:{' '}
                        </span>
                        {item.explanation}
                      </div>

                      <div className="text-[11px] italic text-amber-300/90 flex items-center justify-between gap-2 pt-0.5">
                        <span>💡 Savjet prof. Bošca: „{item.bozacHint}”</span>
                        {m && (
                          <button
                            type="button"
                            onClick={() => onSelectMushroom(m)}
                            className="px-2.5 py-1 rounded-lg bg-[#18291f] hover:bg-[#22382b] text-[11px] not-italic font-semibold text-emerald-300 shrink-0 cursor-pointer"
                          >
                            Kartica: {m.name}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* All 6 Certificate Tiers Reference */}
          <div className="space-y-2.5 pt-2 border-t border-[#1f3126]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#889e90]">
              Sustav Gljivarskih Iskaznica (6 stupnjeva prema ostvarenim bodovima od 30)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {CERTIFICATE_TIERS.slice()
                .reverse()
                .map((t) => {
                  const isUnlocked = effectiveBestScore >= t.minScore;
                  const isCurrent = lockedCertTier.tier === t.tier;
                  return (
                    <div
                      key={t.tier}
                      className={`p-3.5 rounded-xl border space-y-1 ${
                        isCurrent
                          ? 'bg-[#18291f] border-emerald-500/70'
                          : isUnlocked
                          ? 'bg-[#0e1712] border-[#253b2d]'
                          : 'bg-[#0a100c] border-[#18261d] opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono-tabular">
                        <span className="font-bold text-amber-400">
                          STUPANJ {t.roman} ({t.minScore}–{t.maxScore} bodova)
                        </span>
                        {isUnlocked && (
                          <span className="text-emerald-400 font-bold">✓</span>
                        )}
                      </div>
                      <div className="text-xs font-semibold text-[#f2f6f3]">
                        {t.badgeTitle}
                      </div>
                      <p className="text-[11px] text-[#889e90] line-clamp-2">
                        {t.subtitle}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        /* =====================================================================
           VIEW 3: ACTIVE 30-QUESTION EXAM WITH 3 FIELD JOKERS
           ===================================================================== */
        <>
          {/* Resume Banner if restored from localStorage */}
          {resumedBanner && (
            <div className="rounded-2xl bg-[#18291f] border border-emerald-500/45 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs sm:text-sm font-medium text-emerald-200 flex items-center gap-2">
                <span>
                  🔄 Nastavljena aktivna runda kviza (Pitanje {quizState.currentIndex + 1} od{' '}
                  {quizState.questions.length})
                </span>
              </div>
              <button
                type="button"
                onClick={handleStartNewRound}
                className="min-h-[34px] px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors cursor-pointer shrink-0"
              >
                Nova runda ispočetka
              </button>
            </div>
          )}

          <div className="rounded-2xl bg-[#121c16] border border-[#233529] p-5 sm:p-7 space-y-5">
            {/* Top Question Status Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#889e90] font-mono-tabular">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-lg bg-[#19291f] border border-emerald-500/30 text-emerald-300 font-bold">
                  RANG {currentRankDef.roman}: {currentRankDef.name.toUpperCase()}
                </span>
                <span className="px-2 py-1 rounded-lg bg-[#16231b] border border-[#253a2d] text-[#d6e3da] font-semibold">
                  Set {currentQuestion.set}
                </span>
                {visualMushroom && (
                  <span className="px-2.5 py-1 rounded-lg bg-amber-950/50 border border-amber-500/40 text-amber-300 font-bold inline-flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> FOTO-ANALIZA
                  </span>
                )}
                <span>
                  Pitanje {quizState.currentIndex + 1} / {quizState.questions.length}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold text-emerald-400">
                  Bodovi: {quizState.score} / {quizState.questions.length}
                </span>
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(true)}
                  className="px-2.5 py-1 rounded-lg bg-[#16231b] hover:bg-red-950/50 border border-[#253a2d] hover:border-red-700/50 text-[11px] font-sans font-medium text-[#9bb0a2] hover:text-red-200 transition-colors cursor-pointer"
                  title="Poništi trenutnu rundu i generiraj 30 novih pitanja"
                >
                  🔄 Nova runda
                </button>
              </div>
            </div>

            {/* Reset Confirmation Dialog */}
            {showResetConfirm && (
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs sm:text-sm text-red-100 font-medium">
                  Želite li prekinuti trenutnu rundu i izvući novu kombinaciju od 30 pitanja? (Vaš raniji rekord ostaje sigurno zaključan).
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(false)}
                    className="min-h-[36px] px-3.5 py-1.5 rounded-xl bg-[#18241c] hover:bg-[#223328] text-xs font-medium text-[#c5d6cb] cursor-pointer"
                  >
                    Odustani
                  </button>
                  <button
                    type="button"
                    onClick={handleStartNewRound}
                    className="min-h-[36px] px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-semibold text-white cursor-pointer"
                  >
                    Da, pokreni novu rundu
                  </button>
                </div>
              </div>
            )}

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-[#1b2a21] rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{
                  width: `${
                    ((quizState.currentIndex + 1) /
                      Math.max(1, quizState.questions.length)) *
                    100
                  }%`,
                }}
              />
            </div>

            {/* ===============================================================
                3 TERENSKA JOKERA BAR (Jednokratno po rundi)
               =============================================================== */}
            <div className="p-3.5 rounded-xl bg-[#0c140f] border border-[#223428] space-y-2.5">
              <div className="flex items-center justify-between text-[11px] text-[#889e90]">
                <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>3 Terenska Jokera (jednokratna pomoć u rundi):</span>
                </span>
                <span className="font-mono-tabular">
                  Preostalo:{' '}
                  {
                    [
                      !quizState.jokersUsed.fiftyFifty,
                      !quizState.jokersUsed.bozacAdvice,
                      !quizState.jokersUsed.skipQuestion,
                    ].filter(Boolean).length
                  }{' '}
                  / 3
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {/* Joker 1: 50:50 (Dva spora) */}
                <button
                  type="button"
                  disabled={
                    quizState.jokersUsed.fiftyFifty || selectedOption !== null
                  }
                  onClick={handleJokerFiftyFifty}
                  className={`min-h-[42px] px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                    quizState.jokersUsed.fiftyFifty
                      ? 'bg-[#0a100c] border-[#1c2b21] text-[#6e8476] opacity-50 cursor-not-allowed line-through'
                      : selectedOption !== null
                      ? 'bg-[#121e16] border-[#223428] text-[#889e90] opacity-60 cursor-not-allowed'
                      : 'bg-[#16241b] hover:bg-[#1f3326] border-emerald-500/40 text-emerald-300 cursor-pointer'
                  }`}
                  title="Uklanja 2 netočna ponuđena odgovora na trenutnom pitanju"
                >
                  <Divide className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>50:50 (Dva spora)</span>
                </button>

                {/* Joker 2: 🧠 Savjet prof. Bošca */}
                <button
                  type="button"
                  disabled={
                    quizState.jokersUsed.bozacAdvice || selectedOption !== null
                  }
                  onClick={handleJokerBozacAdvice}
                  className={`min-h-[42px] px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                    quizState.jokersUsed.bozacAdvice
                      ? 'bg-[#0a100c] border-[#1c2b21] text-[#6e8476] opacity-50 cursor-not-allowed line-through'
                      : selectedOption !== null
                      ? 'bg-[#121e16] border-[#223428] text-[#889e90] opacity-60 cursor-not-allowed'
                      : 'bg-[#18291f] hover:bg-[#223a2c] border-amber-500/45 text-amber-300 cursor-pointer'
                  }`}
                  title="Prikazuje autentični terenski savjet prof. dr. sc. Romana Bošca za ovo pitanje"
                >
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>🧠 Savjet prof. Bošca</span>
                </button>

                {/* Joker 3: 🧺 Sigurnosna košara (Preskok) */}
                <button
                  type="button"
                  disabled={
                    quizState.jokersUsed.skipQuestion || selectedOption !== null
                  }
                  onClick={handleJokerSkipQuestion}
                  className={`min-h-[42px] px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                    quizState.jokersUsed.skipQuestion
                      ? 'bg-[#0a100c] border-[#1c2b21] text-[#6e8476] opacity-50 cursor-not-allowed line-through'
                      : selectedOption !== null
                      ? 'bg-[#121e16] border-[#223428] text-[#889e90] opacity-60 cursor-not-allowed'
                      : 'bg-[#16241b] hover:bg-[#1f3326] border-emerald-500/40 text-emerald-300 cursor-pointer'
                  }`}
                  title="Preskače trenutno pitanje bez gubitka bodova i zamjenjuje ga rezervnim pitanjem iz istog ranga i seta"
                >
                  <ShoppingBasket className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>🧺 Sigurnosna košara</span>
                </button>
              </div>
            </div>

            {/* Skipped Question Confirmation Notice */}
            {skippedNotice && (
              <div className="p-3.5 rounded-xl bg-[#18291f] border border-emerald-500/50 text-xs text-emerald-200 flex items-center gap-2.5">
                <ShoppingBasket className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{skippedNotice}</span>
              </div>
            )}

            {/* Active Joker Hint Card: 🧠 Savjet prof. Bošca */}
            {quizState.activeHint && (
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/50 space-y-1">
                <div className="text-xs font-mono-tabular font-bold text-amber-300 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>JOKER AKTIVIRAN • SAVJET PROF. DR. SC. ROMANA BOŠCA:</span>
                </div>
                <p className="text-xs sm:text-sm italic text-[#f2f6f3] leading-relaxed">
                  „{quizState.activeHint}”
                </p>
              </div>
            )}

            {/* Optional Visual Photo-Question Card */}
            {visualMushroom && (
              <div className="rounded-2xl overflow-hidden border border-[#2a4233] bg-[#0b130e]">
                <div className="relative h-52 sm:h-60 w-full">
                  <MushroomImage
                    key={visualMushroom.id}
                    mushroom={visualMushroom}
                    className="w-full h-full"
                    priority={true}
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#09120d]/90 border border-emerald-500/40 text-[11px] font-mono-tabular font-semibold text-emerald-300 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      TERENSKI DETALJ:{' '}
                      {currentQuestion.visualFocusLabel || 'MORFOLOŠKA ANALIZA'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Question Text */}
            <div className="space-y-1">
              <div className="text-[11px] text-[#889e90]">
                {currentRankDef.description}
              </div>
              <h3 className="text-lg sm:text-xl font-serif-display font-bold text-[#f2f6f3] leading-snug">
                {currentQuestion.question}
              </h3>
            </div>

            {/* 4 Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isEliminated = quizState.eliminatedIndices.includes(idx);
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQuestion.correctIndex;
                const optionLetter = String.fromCharCode(65 + idx);

                let btnStyle =
                  'bg-[#0c130f] border-[#223428] text-[#d6e3da] hover:border-[#385441]';

                if (isEliminated && selectedOption === null) {
                  btnStyle =
                    'bg-[#090e0b] border-[#18241c] text-[#5e7265] opacity-40 line-through cursor-not-allowed';
                } else if (selectedOption !== null) {
                  if (isCorrect) {
                    btnStyle =
                      'bg-emerald-950/60 border-emerald-500 text-emerald-100';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-red-950/60 border-red-500 text-red-100';
                  } else {
                    btnStyle =
                      'bg-[#0c130f] border-[#1c2b21] text-[#6e8476] opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={selectedOption !== null || isEliminated}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full min-h-[54px] p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-colors flex items-center justify-between gap-3 ${
                      selectedOption === null && !isEliminated
                        ? 'cursor-pointer'
                        : ''
                    } ${btnStyle}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-[#16241b] border border-[#2a4032] text-emerald-400 font-mono-tabular text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {optionLetter}
                      </span>
                      <span className="leading-relaxed">{option}</span>
                    </div>

                    {isEliminated && selectedOption === null && (
                      <span className="text-[10px] font-mono-tabular uppercase px-2 py-0.5 rounded bg-[#16231b] text-[#889e90] shrink-0">
                        50:50 izbačeno
                      </span>
                    )}
                    {selectedOption !== null && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {selectedOption !== null && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Post-Answer Explanation & Next Question Button */}
            {selectedOption !== null && (
              <div className="p-4 rounded-xl bg-[#0d1610] border border-[#284030] space-y-3">
                <div className="text-xs font-semibold text-emerald-400">
                  Mikološko objašnjenje i ključna razlika:
                </div>
                <p className="text-xs sm:text-sm text-[#d6e3da] leading-relaxed">
                  {currentQuestion.explanation}
                </p>
                <div className="text-xs italic text-amber-300/90 pt-0.5">
                  💡 Savjet prof. Bošca: „{currentQuestion.bozacHint}”
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  {relatedMushroom ? (
                    <button
                      type="button"
                      onClick={() => onSelectMushroom(relatedMushroom)}
                      className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-[#19281f] hover:bg-[#23382b] text-xs font-medium text-emerald-300 transition-colors cursor-pointer"
                    >
                      Otvori karticu vrste: {relatedMushroom.name}
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="min-h-[42px] px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white inline-flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>
                      {quizState.currentIndex + 1 < quizState.questions.length
                        ? 'Sljedeće pitanje'
                        : 'Završi ispit i kreiraj iskaznicu'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
