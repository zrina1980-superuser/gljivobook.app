import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BackNavigationSnapshot,
  DEFAULT_EXIT_PROMPT_WINDOW_MS,
  resolveBackNavigationStep,
  resolveEscapeModalStep,
  isEditableDomTarget,
  isSwipeIgnoredDomTarget,
} from '../backNavigation';

function createBaseSnapshot(overrides: Partial<BackNavigationSnapshot> = {}): BackNavigationSnapshot {
  return {
    showDisclaimerModal: false,
    hasLightboxOpen: false,
    hasCompareModalOpen: false,
    hasLookalikeInfoModalOpen: false,
    showSOSModal: false,
    showAboutModal: false,
    showAddSpeciesModal: false,
    showIOSInstallModal: false,
    selectedMushroomId: null,
    modalHistory: [],
    activeTab: 'enciklopedija',
    scrollY: 0,
    lastExitPromptAt: null,
    now: 10_000,
    ...overrides,
  };
}

test('1. Obavezni sigurnosni disclaimer ne može se zaobići Back navigacijom ni Escape tipkom', () => {
  const snapshot = createBaseSnapshot({
    showDisclaimerModal: true,
    hasLightboxOpen: true,
    selectedMushroomId: 'vrganj',
    modalHistory: ['vrganj', 'zelena-pupavka'],
    activeTab: 'kviz',
  });

  assert.deepEqual(resolveBackNavigationStep(snapshot), { action: 'blocked-by-disclaimer' });
  assert.deepEqual(resolveEscapeModalStep(snapshot, false), { action: 'blocked-by-disclaimer' });
});

test('2. Zatvara najviši otvoreni modal/overlay prema strogom prioritetu', () => {
  assert.deepEqual(
    resolveBackNavigationStep(
      createBaseSnapshot({
        hasLightboxOpen: true,
        hasCompareModalOpen: true,
        showSOSModal: true,
        selectedMushroomId: 'vrganj',
      })
    ),
    { action: 'close-lightbox' }
  );

  assert.deepEqual(
    resolveBackNavigationStep(
      createBaseSnapshot({
        hasCompareModalOpen: true,
        hasLookalikeInfoModalOpen: true,
        showSOSModal: true,
      })
    ),
    { action: 'close-compare-modal' }
  );

  assert.deepEqual(
    resolveBackNavigationStep(
      createBaseSnapshot({
        hasLookalikeInfoModalOpen: true,
        showSOSModal: true,
      })
    ),
    { action: 'close-lookalike-info-modal' }
  );

  assert.deepEqual(
    resolveBackNavigationStep(
      createBaseSnapshot({
        showSOSModal: true,
        showAboutModal: true,
      })
    ),
    { action: 'close-sos-modal' }
  );

  assert.deepEqual(
    resolveBackNavigationStep(
      createBaseSnapshot({
        showAboutModal: true,
        showAddSpeciesModal: true,
      })
    ),
    { action: 'close-about-modal' }
  );

  assert.deepEqual(
    resolveBackNavigationStep(
      createBaseSnapshot({
        showAddSpeciesModal: true,
        showIOSInstallModal: true,
      })
    ),
    { action: 'close-add-species-modal' }
  );

  assert.deepEqual(
    resolveBackNavigationStep(
      createBaseSnapshot({
        showIOSInstallModal: true,
        selectedMushroomId: 'vrganj',
      })
    ),
    { action: 'close-ios-install-modal' }
  );
});

test('3. Detalj gljive vraća prethodnu vrstu u modalHistory ili zatvara detalj uz obnovu prethodnog prikaza', () => {
  const stepBackSnapshot = createBaseSnapshot({
    selectedMushroomId: 'zelena-pupavka',
    modalHistory: ['vrganj', 'zelena-pupavka'],
    activeTab: 'kljuc',
  });
  assert.deepEqual(resolveBackNavigationStep(stepBackSnapshot), {
    action: 'detail-history-back',
    previousMushroomId: 'vrganj',
    nextHistory: ['vrganj'],
  });

  const closeDetailSnapshot = createBaseSnapshot({
    selectedMushroomId: 'vrganj',
    modalHistory: ['vrganj'],
    activeTab: 'kljuc',
  });
  assert.deepEqual(resolveBackNavigationStep(closeDetailSnapshot), { action: 'close-detail' });
});

test('4. Povratak s podstranice/taba vraća korisnika na Enciklopediju prije izlaza', () => {
  for (const tab of ['kljuc', 'skener', 'dnevnik', 'kviz'] as const) {
    const snapshot = createBaseSnapshot({
      activeTab: tab,
      scrollY: 500,
    });
    assert.deepEqual(resolveBackNavigationStep(snapshot), { action: 'return-to-encyclopedia' });
  }
});

test('5. Na Enciklopediji prvo vraća skrolanje na vrh ako je korisnik skrolao niže od praga', () => {
  const scrolledSnapshot = createBaseSnapshot({
    activeTab: 'enciklopedija',
    scrollY: 320,
  });
  assert.deepEqual(resolveBackNavigationStep(scrolledSnapshot), { action: 'scroll-to-top' });
});

test('6. Dvostruki Back na početnom prikazu: prvi prikazuje poruku, drugi unutar 3 sekunde dopušta izlaz', () => {
  const firstBack = createBaseSnapshot({
    activeTab: 'enciklopedija',
    scrollY: 0,
    lastExitPromptAt: null,
    now: 5_000,
  });
  assert.deepEqual(resolveBackNavigationStep(firstBack), { action: 'exit-prompt' });

  const secondBackWithinWindow = createBaseSnapshot({
    activeTab: 'enciklopedija',
    scrollY: 0,
    lastExitPromptAt: 5_000,
    now: 5_000 + DEFAULT_EXIT_PROMPT_WINDOW_MS - 200,
  });
  assert.deepEqual(resolveBackNavigationStep(secondBackWithinWindow), { action: 'allow-exit' });

  const secondBackAfterExpiredWindow = createBaseSnapshot({
    activeTab: 'enciklopedija',
    scrollY: 0,
    lastExitPromptAt: 5_000,
    now: 5_000 + DEFAULT_EXIT_PROMPT_WINDOW_MS + 100,
  });
  assert.deepEqual(resolveBackNavigationStep(secondBackAfterExpiredWindow), { action: 'exit-prompt' });
});

test('7. Escape zatvara samo otvorene modale ili detalj vrste, a ignorira unos u polje i obično stanje taba', () => {
  assert.equal(
    resolveEscapeModalStep(createBaseSnapshot({ activeTab: 'kviz', scrollY: 500 }), false),
    null
  );
  assert.equal(
    resolveEscapeModalStep(createBaseSnapshot({ showSOSModal: true }), true),
    null
  );
  assert.deepEqual(
    resolveEscapeModalStep(
      createBaseSnapshot({
        selectedMushroomId: 'zelena-pupavka',
        modalHistory: ['vrganj', 'zelena-pupavka'],
      }),
      false
    ),
    {
      action: 'detail-history-back',
      previousMushroomId: 'vrganj',
      nextHistory: ['vrganj'],
    }
  );
});

test('8. Detekcija polja za unos i elemenata izuzetih iz rubne swipe geste', () => {
  assert.equal(isEditableDomTarget({ tagName: 'INPUT' } as unknown as EventTarget), true);
  assert.equal(isEditableDomTarget({ tagName: 'TEXTAREA' } as unknown as EventTarget), true);
  assert.equal(
    isEditableDomTarget({ tagName: 'DIV', isContentEditable: true } as unknown as EventTarget),
    true
  );
  assert.equal(
    isEditableDomTarget({ tagName: 'BUTTON', isContentEditable: false } as unknown as EventTarget),
    false
  );

  assert.equal(
    isSwipeIgnoredDomTarget({
      tagName: 'DIV',
      closest: (selector: string) => (selector.includes('.leaflet-container') ? ({} as Element) : null),
    } as unknown as EventTarget),
    true
  );
});
