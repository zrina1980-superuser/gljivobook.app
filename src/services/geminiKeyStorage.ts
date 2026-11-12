export const USER_GEMINI_API_KEY_STORAGE_KEY = 'gljivobook_user_gemini_api_key_v1';

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface LoadGeminiKeyResult {
  key: string;
  storageAvailable: boolean;
  errorMessage: string | null;
}

export interface SaveGeminiKeyResult {
  saved: boolean;
  key: string;
  message: string;
}

export interface RemoveGeminiKeyResult {
  removed: boolean;
  message: string;
}

function resolveDefaultStorage(customStorage?: StorageLike | null): StorageLike | null {
  if (customStorage !== undefined) {
    return customStorage;
  }
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * Loads the user's personal Gemini API key from localStorage on startup.
 * Never logs the key or throws if localStorage is blocked/unavailable.
 */
export function loadUserGeminiApiKey(customStorage?: StorageLike | null): LoadGeminiKeyResult {
  const storage = resolveDefaultStorage(customStorage);
  if (!storage) {
    return {
      key: '',
      storageAvailable: false,
      errorMessage:
        'Lokalna pohrana preglednika (localStorage) nije dostupna na ovom uređaju.',
    };
  }

  try {
    const raw = storage.getItem(USER_GEMINI_API_KEY_STORAGE_KEY);
    return {
      key: typeof raw === 'string' ? raw.trim() : '',
      storageAvailable: true,
      errorMessage: null,
    };
  } catch {
    return {
      key: '',
      storageAvailable: false,
      errorMessage:
        'Čitanje iz lokalne pohrane preglednika (localStorage) nije uspjelo ili je blokirano.',
    };
  }
}

/**
 * Explicitly saves the user's personal Gemini API key to localStorage on this device
 * and verifies that reading it back returns the exact same value.
 */
export function saveUserGeminiApiKey(
  rawKey: string,
  customStorage?: StorageLike | null
): SaveGeminiKeyResult {
  const trimmed = typeof rawKey === 'string' ? rawKey.trim() : '';
  if (!trimmed) {
    return {
      saved: false,
      key: '',
      message: 'Unesite valjani Gemini API ključ prije spremanja na uređaj.',
    };
  }

  const storage = resolveDefaultStorage(customStorage);
  if (!storage) {
    return {
      saved: false,
      key: trimmed,
      message:
        'Spremanje nije uspjelo: lokalna pohrana preglednika (localStorage) nije dostupna na ovom uređaju.',
    };
  }

  try {
    storage.setItem(USER_GEMINI_API_KEY_STORAGE_KEY, trimmed);
    const readBack = storage.getItem(USER_GEMINI_API_KEY_STORAGE_KEY);
    if (readBack !== trimmed) {
      return {
        saved: false,
        key: trimmed,
        message:
          'Spremanje nije uspjelo: provjera čitanja iz lokalne pohrane (localStorage) nije prošla.',
      };
    }

    return {
      saved: true,
      key: trimmed,
      message:
        'Spremljeno na ovom uređaju (samo u pregledniku ovog uređaja, nije šifrirano i ne sinkronizira se u oblak).',
    };
  } catch {
    return {
      saved: false,
      key: trimmed,
      message:
        'Spremanje nije uspjelo: preglednik je blokirao zapis u localStorage (npr. privatni način rada). Ključ možete koristiti privremeno dok je stranica otvorena.',
    };
  }
}

/**
 * Removes the saved Gemini API key from localStorage on this device.
 */
export function removeUserGeminiApiKey(
  customStorage?: StorageLike | null
): RemoveGeminiKeyResult {
  const storage = resolveDefaultStorage(customStorage);
  if (!storage) {
    return {
      removed: false,
      message:
        'Uklanjanje iz pohrane nije moguće jer localStorage nije dostupan, ali ključ je obrisan iz trenutne sesije.',
    };
  }

  try {
    storage.removeItem(USER_GEMINI_API_KEY_STORAGE_KEY);
    const remaining = storage.getItem(USER_GEMINI_API_KEY_STORAGE_KEY);
    if (remaining !== null) {
      return {
        removed: false,
        message: 'Uklanjanje ključa iz lokalne pohrane nije uspjelo.',
      };
    }
    return {
      removed: true,
      message: 'Spremljeni Gemini API ključ je uklonjen s ovog uređaja.',
    };
  } catch {
    return {
      removed: false,
      message:
        'Uklanjanje iz lokalne pohrane nije uspjelo, ali ključ je obrisan iz trenutne sesije.',
    };
  }
}

/**
 * Masks an API key for safe visual confirmation without exposing the secret in plain text.
 */
export function maskGeminiApiKey(rawKey: string): string {
  const trimmed = typeof rawKey === 'string' ? rawKey.trim() : '';
  if (!trimmed) return '';
  if (trimmed.length <= 8) {
    return '••••••••';
  }
  return `${trimmed.slice(0, 4)}••••${trimmed.slice(-4)}`;
}
