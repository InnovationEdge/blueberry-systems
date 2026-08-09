import { lazy, Suspense, useState, useRef, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StatsStrip } from './components/Services';
import { ScrollToTop } from './components/Footer';
import { ScrollProgress, NowBuilding } from './components/ScrollProgress';
import { Industries } from './components/Industries';
import { getT } from './i18n';

// Everything below-the-fold ships in its own chunk so the home-page
// initial load only pays for Hero + StatsStrip + Industries.
const BelowFold = lazy(() => import('./BelowFold'));

const ProjectModal = lazy(() =>
  import('./components/ProjectModal').then((m) => ({ default: m.ProjectModal })),
);

/**
 * Picker label -> BCP 47 code, and the reverse. Every place that needs to know
 * about a language reads one of these two, so adding a locale is one line here
 * plus the locale file and the i18n registry. No per-language branches.
 */
const LANG_CODES: Record<string, string> = {
  'ქარ': 'ka',
  RU: 'ru',
  DE: 'de',
};

/** BCP 47 code -> picker label. Resolves a /xx/ path prefix or a ?lang= value. */
const PATH_LANG: Record<string, string> = Object.fromEntries(
  Object.entries(LANG_CODES).map(([label, code]) => [code, label]),
);

/** og:locale value per language, for the social card. */
const OG_LOCALES: Record<string, string> = {
  en: 'en_US',
  ka: 'ka_GE',
  ru: 'ru_RU',
  de: 'de_DE',
};

function langCode(lang: string): string {
  return LANG_CODES[lang] ?? 'en';
}

// Pick initial language on mount in priority order:
// 1. /<code>/ path prefix  (the indexable localized home pages)
// 2. ?lang= URL param  (older deep-links and shares, still honoured)
// 3. localStorage 'lang'  (user's persisted choice from a previous visit)
// 4. navigator.language / navigator.languages  (browser preference)
// 5. EN fallback
function getInitialLang(): string {
  if (typeof window === 'undefined') return 'EN';

  // 1. Path prefix wins. Each /<code>/ is a prerendered page with its own
  //    title, description, <html lang> and self-referencing canonical, so the
  //    app has to boot in that language or the rendered page would contradict
  //    the markup a crawler just read.
  const prefix = window.location.pathname.split('/')[1];
  if (PATH_LANG[prefix]) return PATH_LANG[prefix];

  // 2. URL param (explicit intent)
  const param = new URLSearchParams(window.location.search).get('lang');
  if (param) {
    if (PATH_LANG[param]) return PATH_LANG[param];
    if (LANG_CODES[param] || param === 'EN') return param;
  }

  // 3. Persisted preference
  try {
    const stored = window.localStorage.getItem('lang');
    if (stored && (stored === 'EN' || LANG_CODES[stored])) return stored;
  } catch { /* localStorage blocked — fall through */ }

  // 4. Browser language(s)
  const codes = (navigator.languages?.length ? navigator.languages : [navigator.language]) || [];
  for (const raw of codes) {
    const code = raw.toLowerCase().slice(0, 2);
    if (PATH_LANG[code]) return PATH_LANG[code];
    if (code === 'en') return 'EN';
  }

  return 'EN';
}

export default function App() {
  const [lang, setLangState] = useState(getInitialLang);
  const [selected, setSelected] = useState<number | null>(null);
  const [shown, setShown] = useState(true);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = getT(lang);

  // Smooth fade when switching languages — no remount, no scroll loss.
  // Two-stage: 220ms fade-out + soft blur, then swap, then 280ms fade-in
  // with eased curve. Feels like a film cut, not a flash.
  const setLang = useCallback((newLang: string) => {
    if (newLang === lang) return;
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    setShown(false);
    transitionTimer.current = setTimeout(() => {
      setLangState(newLang);
      // Force layout calc before flipping shown back on, so the
      // browser renders the new text in the hidden state first —
      // eliminates any KA-font-loading flash.
      requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
    }, 220);
  }, [lang]);

  // Sync <html lang="..."> + ?lang= URL param + document.title + meta description
  // with active language — improves a11y (screen readers), SEO (hreflang +
  // localized title/description), and shareability.
  useEffect(() => {
    const code = langCode(lang);
    document.documentElement.lang = code;

    // URL sync. On a prerendered /<code>/ page the path already carries the
    // language, so adding ?lang= on top would produce a second URL for the
    // same content and split its ranking signals.
    const url = new URL(window.location.href);
    const pathCarriesLang = !!PATH_LANG[url.pathname.split('/')[1]];
    if (code === 'en' || pathCarriesLang) {
      url.searchParams.delete('lang');
    } else {
      url.searchParams.set('lang', code);
    }
    window.history.replaceState({}, '', url.toString());

    // Persist user's choice so subsequent visits respect it over browser locale
    try {
      window.localStorage.setItem('lang', lang);
    } catch { /* localStorage blocked — silent */ }

    // Document title + meta description (browser tab + bookmarks + share)
    document.title = t.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.metaDescription);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', t.metaTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', t.metaDescription);
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', OG_LOCALES[code] ?? 'en_US');
  }, [lang, t.metaTitle, t.metaDescription]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white overflow-x-hidden noise-overlay transition-colors duration-300">
      <ScrollProgress />
      <Header t={t} lang={lang} setLang={setLang} />

      <div
        className={`transition-[opacity,filter] duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          shown ? 'opacity-100 blur-0' : 'opacity-0 blur-[3px]'
        }`}
        style={{ willChange: shown ? 'auto' : 'opacity, filter' }}
      >
        <Hero t={t} />
        <StatsStrip t={t} />
        <Industries t={t} />
        <Suspense fallback={<div className="min-h-[400px]" />}>
          <BelowFold t={t} lang={lang} onOpenProject={setSelected} />
        </Suspense>
      </div>

      <Suspense fallback={null}>
        <ProjectModal index={selected} onClose={() => setSelected(null)} t={t} />
      </Suspense>

      <ScrollToTop />
      <NowBuilding label={t.nowBuilding} projects={[t.nowBuildingItem1, t.nowBuildingItem2]} />
    </div>
  );
}
