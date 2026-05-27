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

// Read ?lang= from URL once at mount — supports hreflang deep links
function getInitialLang(): string {
  if (typeof window === 'undefined') return 'EN';
  const param = new URLSearchParams(window.location.search).get('lang');
  if (param === 'ka' || param === 'ქარ') return 'ქარ';
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
    const code = lang === 'ქარ' ? 'ka' : 'en';
    document.documentElement.lang = code;

    // URL param sync
    const url = new URL(window.location.href);
    if (code === 'en') {
      url.searchParams.delete('lang');
    } else {
      url.searchParams.set('lang', code);
    }
    window.history.replaceState({}, '', url.toString());

    // Document title + meta description (browser tab + bookmarks + share)
    document.title = t.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.metaDescription);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', t.metaTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', t.metaDescription);
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', code === 'ka' ? 'ka_GE' : 'en_US');
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
          <BelowFold t={t} onOpenProject={setSelected} />
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
