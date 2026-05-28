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

// Pick initial language on mount in priority order:
// 1. ?lang= URL param  (deep-link from hreflang or share)
// 2. localStorage 'lang'  (user's persisted choice from a previous visit)
// 3. navigator.language / navigator.languages  (browser preference)
// 4. EN fallback
function getInitialLang(): string {
  if (typeof window === 'undefined') return 'EN';

  // 1. URL param wins (explicit intent)
  const param = new URLSearchParams(window.location.search).get('lang');
  if (param === 'ka' || param === 'ქარ') return 'ქარ';
  if (param === 'ru' || param === 'RU') return 'RU';

  // 2. Persisted preference
  try {
    const stored = window.localStorage.getItem('lang');
    if (stored === 'ქარ' || stored === 'RU' || stored === 'EN') return stored;
  } catch { /* localStorage blocked — fall through */ }

  // 3. Browser language(s)
  const codes = (navigator.languages?.length ? navigator.languages : [navigator.language]) || [];
  for (const raw of codes) {
    const code = raw.toLowerCase().slice(0, 2);
    if (code === 'ka') return 'ქარ';
    if (code === 'ru') return 'RU';
    if (code === 'en') return 'EN';
  }

  return 'EN';
}

function langCode(lang: string): 'en' | 'ka' | 'ru' {
  if (lang === 'ქარ') return 'ka';
  if (lang === 'RU') return 'ru';
  return 'en';
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

    // URL param sync
    const url = new URL(window.location.href);
    if (code === 'en') {
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
    if (ogLocale) {
      const localeMap = { en: 'en_US', ka: 'ka_GE', ru: 'ru_RU' } as const;
      ogLocale.setAttribute('content', localeMap[code]);
    }
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
