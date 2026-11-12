import test from 'node:test';
import assert from 'node:assert/strict';
import {
  USER_GEMINI_API_KEY_STORAGE_KEY,
  loadUserGeminiApiKey,
  saveUserGeminiApiKey,
  removeUserGeminiApiKey,
  maskGeminiApiKey,
  StorageLike,
} from '../geminiKeyStorage';

function createMemoryStorage(options?: {
  throwOnGet?: boolean;
  throwOnSet?: boolean;
  throwOnRemove?: boolean;
  corruptWrite?: boolean;
}): StorageLike & { store: Map<string, string> } {
  const store = new Map<string, string>();
  return {
    store,
    getItem(key: string) {
      if (options?.throwOnGet) {
        throw new Error('Storage getItem blocked');
      }
      return store.has(key) ? store.get(key)! : null;
    },
    setItem(key: string, value: string) {
      if (options?.throwOnSet) {
        throw new Error('Storage setItem blocked');
      }
      store.set(key, options?.corruptWrite ? `${value}_corrupted` : value);
    },
    removeItem(key: string) {
      if (options?.throwOnRemove) {
        throw new Error('Storage removeItem blocked');
      }
      store.delete(key);
    },
  };
}

test('loadUserGeminiApiKey vraća spremljeni ključ kada postoji u localStorageu', () => {
  const storage = createMemoryStorage();
  storage.store.set(USER_GEMINI_API_KEY_STORAGE_KEY, '  AIzaSyTestKey1234567890  ');

  const result = loadUserGeminiApiKey(storage);
  assert.equal(result.storageAvailable, true);
  assert.equal(result.key, 'AIzaSyTestKey1234567890');
  assert.equal(result.errorMessage, null);
});

test('loadUserGeminiApiKey vraća prazno stanje kada ključ nije spremljen', () => {
  const storage = createMemoryStorage();
  const result = loadUserGeminiApiKey(storage);

  assert.equal(result.storageAvailable, true);
  assert.equal(result.key, '');
  assert.equal(result.errorMessage, null);
});

test('saveUserGeminiApiKey sprema ključ i potvrđuje ga ponovnim čitanjem', () => {
  const storage = createMemoryStorage();
  const result = saveUserGeminiApiKey('  AIzaSyValidUserKey987654  ', storage);

  assert.equal(result.saved, true);
  assert.equal(result.key, 'AIzaSyValidUserKey987654');
  assert.ok(result.message.includes('Spremljeno na ovom uređaju'));
  assert.equal(storage.store.get(USER_GEMINI_API_KEY_STORAGE_KEY), 'AIzaSyValidUserKey987654');
});

test('saveUserGeminiApiKey odbija prazan unos i ne označava ključ kao spremljen', () => {
  const storage = createMemoryStorage();
  const result = saveUserGeminiApiKey('   ', storage);

  assert.equal(result.saved, false);
  assert.ok(result.message.includes('Unesite valjani Gemini API ključ'));
  assert.equal(storage.store.has(USER_GEMINI_API_KEY_STORAGE_KEY), false);
});

test('saveUserGeminiApiKey ne prikazuje Spremljeno kada je localStorage nedostupan ili blokiran', () => {
  const nullStorageResult = saveUserGeminiApiKey('AIzaSyKey123456', null);
  assert.equal(nullStorageResult.saved, false);
  assert.ok(nullStorageResult.message.includes('Spremanje nije uspjelo'));

  const throwingStorage = createMemoryStorage({ throwOnSet: true });
  const throwResult = saveUserGeminiApiKey('AIzaSyKey123456', throwingStorage);
  assert.equal(throwResult.saved, false);
  assert.ok(throwResult.message.includes('Spremanje nije uspjelo'));
});

test('saveUserGeminiApiKey ne prikazuje Spremljeno ako verifikacija čitanja nakon zapisa ne uspije', () => {
  const corruptedStorage = createMemoryStorage({ corruptWrite: true });
  const result = saveUserGeminiApiKey('AIzaSyKey123456', corruptedStorage);

  assert.equal(result.saved, false);
  assert.ok(result.message.includes('provjera čitanja iz lokalne pohrane (localStorage) nije prošla'));
});

test('removeUserGeminiApiKey briše spremljeni ključ i potvrđuje uklanjanje', () => {
  const storage = createMemoryStorage();
  saveUserGeminiApiKey('AIzaSyKeyToRemove12345', storage);
  assert.equal(storage.store.has(USER_GEMINI_API_KEY_STORAGE_KEY), true);

  const removed = removeUserGeminiApiKey(storage);
  assert.equal(removed.removed, true);
  assert.ok(removed.message.includes('uklonjen'));
  assert.equal(storage.store.has(USER_GEMINI_API_KEY_STORAGE_KEY), false);
});

test('maskGeminiApiKey ispravno maskira API ključ za siguran prikaz u sučelju', () => {
  assert.equal(maskGeminiApiKey(''), '');
  assert.equal(maskGeminiApiKey('short'), '••••••••');
  assert.equal(maskGeminiApiKey('AIzaSyD1234567890XYZ9876'), 'AIza••••9876');
});
