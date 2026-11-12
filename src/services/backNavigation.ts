export type AppTabId = 'enciklopedija' | 'kljuc' | 'skener' | 'dnevnik' | 'kviz';

export interface BackNavigationSnapshot {
  showDisclaimerModal: boolean;
  hasLightboxOpen: boolean;
  hasCompareModalOpen: boolean;
  hasLookalikeInfoModalOpen: boolean;
  showSOSModal: boolean;
  showAboutModal: boolean;
  showAddSpeciesModal: boolean;
  showIOSInstallModal: boolean;
  selectedMushroomId: string | null;
  modalHistory: string[];
  activeTab: AppTabId;
  scrollY: number;
  scrollThreshold?: number;
  lastExitPromptAt: number | null;
  now: number;
  exitPromptWindowMs?: number;
}

export type BackNavigationStep =
  | { action: 'blocked-by-disclaimer' }
  | { action: 'close-lightbox' }
  | { action: 'close-compare-modal' }
  | { action: 'close-lookalike-info-modal' }
  | { action: 'close-sos-modal' }
  | { action: 'close-about-modal' }
  | { action: 'close-add-species-modal' }
  | { action: 'close-ios-install-modal' }
  | { action: 'detail-history-back'; previousMushroomId: string; nextHistory: string[] }
  | { action: 'close-detail' }
  | { action: 'return-to-encyclopedia' }
  | { action: 'scroll-to-top' }
  | { action: 'exit-prompt' }
  | { action: 'allow-exit' };

export const DEFAULT_SCROLL_TOP_THRESHOLD = 120;
export const DEFAULT_EXIT_PROMPT_WINDOW_MS = 3000;

/**
 * Pure helper that resolves the exact next back-navigation step in Gljivobook
 * according to the strict priority hierarchy:
 * 1. Mandatory safety disclaimer cannot be bypassed.
 * 2. Close highest open modal/overlay (lightbox -> compare -> lookalike info -> SOS -> About -> AddSpecies -> iOSInstall).
 * 3. If species detail is open: pop modalHistory to previous species if length > 1, otherwise close detail & restore scroll/tab.
 * 4. If on a non-encyclopedia tab ('kljuc', 'skener', 'dnevnik', 'kviz'), return to 'enciklopedija'.
 * 5. If on 'enciklopedija' and scrolled down past threshold, scroll back to top.
 * 6. On 'enciklopedija' at top: first Back triggers "Pritisnite još jednom za izlaz" prompt; second Back within 3s allows browser/OS exit.
 */
export function resolveBackNavigationStep(
  snapshot: BackNavigationSnapshot
): BackNavigationStep {
  if (snapshot.showDisclaimerModal) {
    return { action: 'blocked-by-disclaimer' };
  }

  if (snapshot.hasLightboxOpen) {
    return { action: 'close-lightbox' };
  }

  if (snapshot.hasCompareModalOpen) {
    return { action: 'close-compare-modal' };
  }

  if (snapshot.hasLookalikeInfoModalOpen) {
    return { action: 'close-lookalike-info-modal' };
  }

  if (snapshot.showSOSModal) {
    return { action: 'close-sos-modal' };
  }

  if (snapshot.showAboutModal) {
    return { action: 'close-about-modal' };
  }

  if (snapshot.showAddSpeciesModal) {
    return { action: 'close-add-species-modal' };
  }

  if (snapshot.showIOSInstallModal) {
    return { action: 'close-ios-install-modal' };
  }

  if (snapshot.selectedMushroomId !== null) {
    if (snapshot.modalHistory.length > 1) {
      const nextHistory = snapshot.modalHistory.slice(0, -1);
      const previousMushroomId = nextHistory[nextHistory.length - 1];
      return {
        action: 'detail-history-back',
        previousMushroomId,
        nextHistory,
      };
    }
    return { action: 'close-detail' };
  }

  if (snapshot.activeTab !== 'enciklopedija') {
    return { action: 'return-to-encyclopedia' };
  }

  const threshold = snapshot.scrollThreshold ?? DEFAULT_SCROLL_TOP_THRESHOLD;
  if (snapshot.scrollY > threshold) {
    return { action: 'scroll-to-top' };
  }

  const windowMs = snapshot.exitPromptWindowMs ?? DEFAULT_EXIT_PROMPT_WINDOW_MS;
  if (
    snapshot.lastExitPromptAt !== null &&
    snapshot.now - snapshot.lastExitPromptAt >= 0 &&
    snapshot.now - snapshot.lastExitPromptAt <= windowMs
  ) {
    return { action: 'allow-exit' };
  }

  return { action: 'exit-prompt' };
}

/**
 * Resolves which modal/overlay Escape key is allowed to close.
 * Escape only closes modals/overlays/detail and is ignored while the user is typing in an editable field
 * or when the mandatory safety disclaimer is open.
 */
export function resolveEscapeModalStep(
  snapshot: Omit<
    BackNavigationSnapshot,
    'activeTab' | 'scrollY' | 'scrollThreshold' | 'lastExitPromptAt' | 'now' | 'exitPromptWindowMs'
  >,
  isEditableTarget: boolean
): BackNavigationStep | null {
  if (isEditableTarget) {
    return null;
  }

  if (snapshot.showDisclaimerModal) {
    return { action: 'blocked-by-disclaimer' };
  }

  if (snapshot.hasLightboxOpen) {
    return { action: 'close-lightbox' };
  }

  if (snapshot.hasCompareModalOpen) {
    return { action: 'close-compare-modal' };
  }

  if (snapshot.hasLookalikeInfoModalOpen) {
    return { action: 'close-lookalike-info-modal' };
  }

  if (snapshot.showSOSModal) {
    return { action: 'close-sos-modal' };
  }

  if (snapshot.showAboutModal) {
    return { action: 'close-about-modal' };
  }

  if (snapshot.showAddSpeciesModal) {
    return { action: 'close-add-species-modal' };
  }

  if (snapshot.showIOSInstallModal) {
    return { action: 'close-ios-install-modal' };
  }

  if (snapshot.selectedMushroomId !== null) {
    if (snapshot.modalHistory.length > 1) {
      const nextHistory = snapshot.modalHistory.slice(0, -1);
      const previousMushroomId = nextHistory[nextHistory.length - 1];
      return {
        action: 'detail-history-back',
        previousMushroomId,
        nextHistory,
      };
    }
    return { action: 'close-detail' };
  }

  return null;
}

/**
 * Checks whether a DOM element (or any of its ancestors) is an input/editable field
 * where Escape or swipe gestures should not hijack user input.
 */
export function isEditableDomTarget(target: EventTarget | null): boolean {
  if (!target || typeof target !== 'object') return false;
  const el = target as HTMLElement;
  const tagName = typeof el.tagName === 'string' ? el.tagName.toUpperCase() : '';
  if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') {
    return true;
  }
  if (el.isContentEditable) {
    return true;
  }
  if (typeof el.closest === 'function') {
    const editableAncestor = el.closest(
      'input, textarea, select, [contenteditable="true"], [contenteditable=""]'
    );
    if (editableAncestor) return true;
  }
  return false;
}

/**
 * Checks whether a touch target is inside an interactive map, canvas, gallery, or horizontally scrollable container
 * where edge-swipe navigation must not interfere.
 */
export function isSwipeIgnoredDomTarget(target: EventTarget | null): boolean {
  if (isEditableDomTarget(target)) return true;
  if (!target || typeof target !== 'object') return false;
  const el = target as HTMLElement;
  if (typeof el.closest === 'function') {
    const interactiveAncestor = el.closest(
      '.leaflet-container, canvas, [data-no-swipe="true"], .overflow-x-auto, .overflow-x-scroll'
    );
    if (interactiveAncestor) return true;
  }
  return false;
}
