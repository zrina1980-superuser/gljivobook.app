const DB_NAME = 'gljive_hr_pro_idb';
const DB_VERSION = 1;
const STORE_NAME = 'kv_store';

let dbPromise: Promise<IDBDatabase> | null = null;

function openDatabase(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      reject(new Error('IndexedDB nije podržan u ovom okruženju.'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error || new Error('Greška pri otvaranju IndexedDB baze.'));
    };
  });

  return dbPromise;
}

export async function idbGet<T>(key: string): Promise<T | undefined> {
  try {
    const db = await openDatabase();
    return await new Promise<T | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result as T | undefined);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return undefined;
  }
}

export async function idbSet<T>(key: string, value: T): Promise<void> {
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Fallback ako je IndexedDB privremeno nedostupan
  }
}

/**
 * Dohvaća podatke iz IndexedDB-a, a ako još ne postoje u IndexedDB-u,
 * automatski migrira postojeće podatke iz localStorage-a i oslobađa localStorage kvotu.
 */
export async function idbGetWithMigration<T>(key: string, fallbackValue: T): Promise<T> {
  const fromIdb = await idbGet<T>(key);
  if (fromIdb !== undefined && fromIdb !== null) {
    return fromIdb;
  }

  try {
    const rawLocal = localStorage.getItem(key);
    if (rawLocal) {
      const parsed = JSON.parse(rawLocal) as T;
      await idbSet<T>(key, parsed);
      try {
        localStorage.removeItem(key);
      } catch {
        // Ignoriraj
      }
      return parsed;
    }
  } catch {
    // Ignoriraj grešku parsiranja
  }

  return fallbackValue;
}
