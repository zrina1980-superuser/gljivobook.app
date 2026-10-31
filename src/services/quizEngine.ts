import { ALL_QUESTIONS_JSON, RawQuizQuestion } from '../data/quizQuestions';

export type QuizQuestion = RawQuizQuestion;

export interface QuizRecord {
  bestScore: number;
  lastAttemptScore: number;
  totalQuestions: number;
  badgeTitle: string;
  rankTier: number;
  unlockedAt: string;
  isNewBest: boolean;
  holderName?: string;
}

export interface QuizAnswerLog {
  questionId: string;
  rank: 1 | 2 | 3 | 4 | 5;
  set: 'A' | 'B';
  questionText: string;
  options: string[];
  selectedOption: number;
  correctIndex: number;
  isCorrect: boolean;
  explanation: string;
  bozacHint: string;
  relatedMushroomId?: string;
}

export interface ActiveQuizState {
  questions: QuizQuestion[];
  currentIndex: number;
  score: number;
  eliminatedIndices: number[]; // Joker 50:50 (Dva spora)
  activeHint: string | null;   // Joker Savjet prof. Bošca
  skippedQuestionIds: string[]; // IDs preskočenih pitanja u rundi
  jokersUsed: {
    fiftyFifty: boolean;
    bozacAdvice: boolean;
    skipQuestion: boolean;
  };
  answersLog: QuizAnswerLog[];
  isFinished: boolean;
}

export interface QuestionRankDef {
  rank: 1 | 2 | 3 | 4 | 5;
  roman: string;
  name: string;
  questionRangeLabel: string;
  description: string;
}

export interface CertificateTierDef {
  tier: 1 | 2 | 3 | 4 | 5 | 6;
  roman: string;
  minScore: number;
  maxScore: number;
  badgeTitle: string;
  shortName: string;
  subtitle: string;
  primaryColor: string;
  secondaryColor: string;
  borderColor: string;
}

export const QUESTION_RANKS: QuestionRankDef[] = [
  {
    rank: 1,
    roman: 'I',
    name: 'Šumski šetač',
    questionRangeLabel: 'Pitanja 1–6',
    description: 'Osnove anatomije gljiva, himenij i prepoznatljive ikone šume (3A + 3B)'
  },
  {
    rank: 2,
    roman: 'II',
    name: 'Berač pripravnik',
    questionRangeLabel: 'Pitanja 7–12',
    description: 'Kulinarska pravila, termolabilnost, mirisi, staništa i čuvanje (3A + 3B)'
  },
  {
    rank: 3,
    roman: 'III',
    name: 'Iskusni gljivar',
    questionRangeLabel: 'Pitanja 13–18',
    description: 'Kritični parovi dvojnica 1-na-1 i terenske zamke (3A + 3B)'
  },
  {
    rank: 4,
    roman: 'IV',
    name: 'Terenski determinator',
    questionRangeLabel: 'Pitanja 19–24',
    description: 'Mikotoksikologija, sindromi latencije, otisak spora i kemizam (3A + 3B)'
  },
  {
    rank: 5,
    roman: 'V',
    name: 'Božčev učenik / Master',
    questionRangeLabel: 'Pitanja 25–30',
    description: 'Zakonska regulativa RH, mikroskopija, mikoriza i rijetke opasnosti (3A + 3B)'
  }
];

export const CERTIFICATE_TIERS: CertificateTierDef[] = [
  {
    tier: 1,
    roman: 'I',
    minScore: 0,
    maxScore: 9,
    badgeTitle: 'Šumski šetač (Zona opreza)',
    shortName: 'Šumski šetač',
    subtitle: 'Početna razina (0–9 bodova). Preporučuje se proučiti „Malu školu mikologije” prije samostalnog branja.',
    primaryColor: '#6ee7b7',
    secondaryColor: '#059669',
    borderColor: '#10b981'
  },
  {
    tier: 2,
    roman: 'II',
    minScore: 10,
    maxScore: 14,
    badgeTitle: 'Oprezni pripravnik s košarom',
    shortName: 'Oprezni pripravnik',
    subtitle: 'Solidno poznavanje osnovnih vrsta i pravila košare (10–14 bodova), uz nužan oprez kod dvojnica.',
    primaryColor: '#34d399',
    secondaryColor: '#047857',
    borderColor: '#10b981'
  },
  {
    tier: 3,
    roman: 'III',
    minScore: 15,
    maxScore: 19,
    badgeTitle: 'Napredni sezonski berač',
    shortName: 'Sezonski berač',
    subtitle: 'Dobro poznavanje staništa, jestivih gljiva i kulinarske pripreme uvjetno jestivih vrsta (15–19 bodova).',
    primaryColor: '#38bdf8',
    secondaryColor: '#0369a1',
    borderColor: '#0ea5e9'
  },
  {
    tier: 4,
    roman: 'IV',
    minScore: 20,
    maxScore: 24,
    badgeTitle: 'Iskusni šumski gljivar',
    shortName: 'Iskusni gljivar',
    subtitle: 'Pouzdano razlikovanje kritičnih dvojnica na terenu i poznavanje morfoloških obilježja (20–24 boda).',
    primaryColor: '#a78bfa',
    secondaryColor: '#6d28d9',
    borderColor: '#8b5cf6'
  },
  {
    tier: 5,
    roman: 'V',
    minScore: 25,
    maxScore: 28,
    badgeTitle: 'Vrhunski terenski determinator',
    shortName: 'Terenski determinator',
    subtitle: 'Napredno poznavanje mikotoksikologije, sindroma latencije, otiska spora i ekologije (25–28 bodova).',
    primaryColor: '#f59e0b',
    secondaryColor: '#b45309',
    borderColor: '#f59e0b'
  },
  {
    tier: 6,
    roman: 'VI',
    minScore: 29,
    maxScore: 30,
    badgeTitle: 'Doktor šume (Zlatna iskaznica prof. Bošca)',
    shortName: 'Doktor šume • Master',
    subtitle: 'Majstorska razina znanja (29–30 bodova) dostojna enciklopedijske škole prof. dr. sc. Romana Bošca!',
    primaryColor: '#fbbf24',
    secondaryColor: '#d97706',
    borderColor: '#fbbf24'
  }
];

export const QUIZ_RECORD_STORAGE_KEY = 'gljivobook_quiz_record';
const LEGACY_MASTER_RECORD_KEY = 'gljivobook_master_record';

/**
 * Promiješa redoslijed odgovora unutar pitanja (Fisher-Yates) i ažurira correctIndex.
 */
export function shuffleSingleQuestionOptions(q: QuizQuestion): QuizQuestion {
  const indexed = q.options.map((text, originalIdx) => ({
    text,
    isCorrect: originalIdx === q.correctIndex
  }));

  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = indexed[i];
    indexed[i] = indexed[j];
    indexed[j] = temp;
  }

  return {
    ...q,
    options: indexed.map((item) => item.text),
    correctIndex: indexed.findIndex((item) => item.isCorrect)
  };
}

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

export function calculateBadgeTitle(score: number): string {
  if (score >= 29) return 'Doktor šume (Zlatna iskaznica prof. Bošca)';
  if (score >= 25) return 'Vrhunski terenski determinator';
  if (score >= 20) return 'Iskusni šumski gljivar';
  if (score >= 15) return 'Napredni sezonski berač';
  if (score >= 10) return 'Oprezni pripravnik s košarom';
  return 'Šumski šetač (Zona opreza)';
}

export function calculateRankTier(score: number): 1 | 2 | 3 | 4 | 5 | 6 {
  if (score >= 29) return 6;
  if (score >= 25) return 5;
  if (score >= 20) return 4;
  if (score >= 15) return 3;
  if (score >= 10) return 2;
  return 1;
}

export function getCertificateTierByScore(score: number): CertificateTierDef {
  const tierNum = calculateRankTier(score);
  return (
    CERTIFICATE_TIERS.find((t) => t.tier === tierNum) ||
    CERTIFICATE_TIERS[0]
  );
}

/**
 * Vraća prethodno spremljeni najbolji rezultat iz localStorage ('gljivobook_quiz_record').
 */
export function getSavedQuizRecord(): QuizRecord | null {
  try {
    const data =
      localStorage.getItem(QUIZ_RECORD_STORAGE_KEY) ||
      localStorage.getItem(LEGACY_MASTER_RECORD_KEY);
    if (!data) return null;
    const parsed = JSON.parse(data) as QuizRecord;
    if (typeof parsed.bestScore !== 'number') return null;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Sprema rezultat s trajnim zaključavanjem najboljeg rezultata (High-Score Lock).
 * Ako igrač ostvari lošiji rezultat od povijesnog rekorda, NIKADA ne prepisuje niti
 * unazađuje prethodni najbolji rezultat, rang, titulu niti Gljivarsku iskaznicu.
 */
export function lockQuizResult(
  finalScore: number,
  total: number = 30,
  holderName?: string
): QuizRecord {
  const existing = getSavedQuizRecord();
  const previousBest = existing ? existing.bestScore : -1;
  const isNewBest = finalScore > previousBest;
  const bestScore = Math.max(existing ? existing.bestScore : 0, finalScore);

  const record: QuizRecord = {
    bestScore,
    lastAttemptScore: finalScore,
    totalQuestions: total,
    badgeTitle: calculateBadgeTitle(bestScore),
    rankTier: calculateRankTier(bestScore),
    unlockedAt: isNewBest
      ? new Date().toISOString()
      : existing?.unlockedAt || new Date().toISOString(),
    isNewBest,
    holderName: holderName || existing?.holderName || 'Zrina'
  };

  try {
    const serialized = JSON.stringify(record);
    localStorage.setItem(QUIZ_RECORD_STORAGE_KEY, serialized);
    localStorage.setItem(LEGACY_MASTER_RECORD_KEY, serialized);
  } catch {
    // Ignore storage quota errors
  }

  return record;
}

/**
 * Ažurira samo ime igrača u spremljenom rekordu bez diranja High-Score Locka.
 */
export function updateSavedRecordHolderName(holderName: string): QuizRecord | null {
  const existing = getSavedQuizRecord();
  if (!existing) return null;
  const updated: QuizRecord = {
    ...existing,
    holderName
  };
  try {
    const serialized = JSON.stringify(updated);
    localStorage.setItem(QUIZ_RECORD_STORAGE_KEY, serialized);
    localStorage.setItem(LEGACY_MASTER_RECORD_KEY, serialized);
  } catch {
    // Ignore storage errors
  }
  return updated;
}

/**
 * Generira rundu od točno 30 pitanja sa stalnim rastom težine (Rang 1 -> 5).
 * Iz svakog ranga uzima 3 nasumična pitanja iz Seta A i 3 iz Seta B,
 * promiješa ih unutar istog ranga te promiješa redoslijed ponuđenih odgovora.
 */
export function initQuizRound(
  pool: QuizQuestion[] = ALL_QUESTIONS_JSON
): ActiveQuizState {
  const selectedQuestions: QuizQuestion[] = [];

  for (let r = 1; r <= 5; r++) {
    const rankLevel = r as 1 | 2 | 3 | 4 | 5;
    const rankPoolA = pool.filter((q) => q.rank === rankLevel && q.set === 'A');
    const rankPoolB = pool.filter((q) => q.rank === rankLevel && q.set === 'B');

    const pickA = shuffleArray(rankPoolA).slice(0, 3);
    const pickB = shuffleArray(rankPoolB).slice(0, 3);

    const rankRound = shuffleArray([...pickA, ...pickB]).map((q) =>
      shuffleSingleQuestionOptions(q)
    );
    selectedQuestions.push(...rankRound);
  }

  return {
    questions: selectedQuestions,
    currentIndex: 0,
    score: 0,
    eliminatedIndices: [],
    activeHint: null,
    skippedQuestionIds: [],
    jokersUsed: {
      fiftyFifty: false,
      bozacAdvice: false,
      skipQuestion: false
    },
    answersLog: [],
    isFinished: false
  };
}

/**
 * Logika Jokera 1: [ 50:50 (Dva spora) ]
 * Uklanja 2 netočna ponuđena odgovora na trenutnom pitanju.
 */
export function applyFiftyFifty(state: ActiveQuizState): ActiveQuizState {
  if (state.jokersUsed.fiftyFifty || state.isFinished) return state;

  const currentQ = state.questions[state.currentIndex];
  if (!currentQ) return state;

  const wrongIndices = currentQ.options
    .map((_, i) => i)
    .filter((i) => i !== currentQ.correctIndex);

  const shuffledWrong = shuffleArray(wrongIndices);
  const toEliminate = shuffledWrong.slice(0, 2);

  return {
    ...state,
    eliminatedIndices: toEliminate,
    jokersUsed: {
      ...state.jokersUsed,
      fiftyFifty: true
    }
  };
}

/**
 * Logika Jokera 2: [ 🧠 Savjet prof. Bošca ]
 * Prikazuje karticu s autentičnim savjetom prof. Bošca za trenutno pitanje.
 */
export function applyBozacAdvice(state: ActiveQuizState): ActiveQuizState {
  if (state.jokersUsed.bozacAdvice || state.isFinished) return state;
  const currentQ = state.questions[state.currentIndex];
  if (!currentQ) return state;

  return {
    ...state,
    activeHint: currentQ.bozacHint,
    jokersUsed: {
      ...state.jokersUsed,
      bozacAdvice: true
    }
  };
}

/**
 * Logika Jokera 3: [ 🧺 Sigurnosna košara (Preskok) ]
 * Preskače trenutno pitanje bez gubitka bodova i zamjenjuje ga rezervnim pitanjem
 * iz ISTOG ranga i ISTOG seta (A ili B).
 */
export function applySkipQuestion(
  state: ActiveQuizState,
  pool: QuizQuestion[] = ALL_QUESTIONS_JSON
): ActiveQuizState {
  if (state.jokersUsed.skipQuestion || state.isFinished) return state;

  const currentQ = state.questions[state.currentIndex];
  if (!currentQ) return state;

  const usedIds = new Set([
    ...state.questions.map((q) => q.id),
    ...state.skippedQuestionIds
  ]);

  // Prvo tražimo rezervno pitanje iz istog ranga i istog seta (A ili B)
  const sameRankAndSetCandidates = pool.filter(
    (q) =>
      q.rank === currentQ.rank &&
      q.set === currentQ.set &&
      !usedIds.has(q.id)
  );

  // Fallback na isti rang ako su sva iz tog seta već potrošena
  const sameRankCandidates =
    sameRankAndSetCandidates.length > 0
      ? sameRankAndSetCandidates
      : pool.filter((q) => q.rank === currentQ.rank && !usedIds.has(q.id));

  if (sameRankCandidates.length === 0) return state;

  const chosenFallback = shuffleSingleQuestionOptions(
    shuffleArray(sameRankCandidates)[0]
  );

  const newQuestions = [...state.questions];
  newQuestions[state.currentIndex] = chosenFallback;

  return {
    ...state,
    questions: newQuestions,
    eliminatedIndices: [],
    activeHint: null,
    skippedQuestionIds: [...state.skippedQuestionIds, currentQ.id],
    jokersUsed: {
      ...state.jokersUsed,
      skipQuestion: true
    }
  };
}
