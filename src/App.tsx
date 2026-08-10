import { lazy, Suspense, useState, useRef, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StatsStrip } from './components/Services';
import { ScrollToTop } from './components/Footer';
import { ScrollProgress, NowBuilding } from './components/ScrollProgress';
import { Industries } from './components/Industries';
import { getT, loadT, isLoaded } from './i18n';

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
  UK: 'uk',
  TR: 'tr',
  PL: 'pl',
  IT: 'it',
  FR: 'fr',
  ES: 'es',
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
  uk: 'uk_UA',
  tr: 'tr_TR',
  pl: 'pl_PL',
  it: 'it_IT',
  fr: 'fr_FR',
  es: 'es_ES',
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

/**
 * True when this page shipped a modulepreload for the language it is about to
 * render, which is the case on the prerendered /ka/, /de/ and friends: the
 * build knows their language and starts the chunk in the head. It is false
 * when the language came from localStorage or navigator.language on "/",
 * because the server could not have known it.
 *
 * The distinction matters because it is the difference between waiting on a
 * cached module and waiting on a network round trip.
 */
function localeChunkPreloaded(lang: string): boolean {
  if (typeof document === 'undefined') return false;
  const code = LANG_CODES[lang];
  if (!code) return true; // English is in the main bundle
  return !!document.querySelector(`link[rel="modulepreload"][href*="/${code}-"]`);
}

/**
 * Decide what a visitor sees while their language chunk is in flight.
 *
 * The nine non-English locales are separate chunks, so the very first render
 * for one of them has no strings yet and getT falls back to English. Measured
 * on Slow 4G with 4x CPU:
 *
 *   /ka/   English painted at 1486ms, Georgian replaced it at 1600ms   114ms
 *   /de/   English painted at 1135ms, German   replaced it at 1243ms   108ms
 *
 * Returning false renders English for that window and swaps. Returning true
 * holds the first paint until the strings are in hand, so nothing wrong is
 * ever shown, at the cost of delaying the paint.
 *
 * That cost is not the same in both cases. `preloaded` is true on /ka/ and the
 * other prerendered locale pages, where the chunk is already in cache and the
 * wait is a promise resolving, roughly a frame. It is false on "/" when the
 * language came from a stored preference or the browser locale, where the wait
 * is a real round trip: 150ms of latency plus transfer, and it lands on LCP.
 *
 * @param lang       resolved picker label, e.g. 'ქარ' or 'DE'
 * @param preloaded  whether this page preloaded that language's chunk
 * @returns true to hold the first paint, false to paint English and swap
 */
function shouldHoldForLocale(lang: string, preloaded: boolean): boolean {
  // Hold exactly where holding is nearly free, and nowhere else.
  //
  // Preloaded means the chunk is already in cache because this page asked for
  // it in the head, so waiting is a promise resolving rather than a request.
  // That buys away both the wrong-language paint and the reflow it causes:
  // measured on production, the swap moved CLS from 0 to 0.0132 on /de/ and
  // 0.0418 on /ka/, and those are the pages people actually land on from
  // search, since they are the ones with hreflang pointing at them.
  //
  // Not preloaded means the language came from localStorage or the browser on
  // "/", where the server had no way to know it. Holding there is a real round
  // trip on the critical path, 150ms of latency before transfer even starts,
  // and it would land on LCP. A returning visitor with a stored preference is
  // also the person least surprised by a moment of English, having already
  // chosen their language here once.
  void lang;
  return preloaded;
}

export default function App() {
  const [lang, setLangState] = useState(getInitialLang);
  const [selected, setSelected] = useState<number | null>(null);
  const [shown, setShown] = useState(true);
  // Bumped when a locale chunk lands, to re-render with the real strings.
  const [, setLocaleReady] = useState(0);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = getT(lang);

  // Whether to withhold the first paint until this language's strings arrive.
  // The policy lives in shouldHoldForLocale above; this only applies it.
  const holdingForLocale = !isLoaded(lang) && shouldHoldForLocale(lang, localeChunkPreloaded(lang));

  // Smooth fade when switching languages — no remount, no scroll loss.
  // Two-stage: 220ms fade-out + soft blur, then swap, then 280ms fade-in
  // with eased curve. Feels like a film cut, not a flash.
  //
  // The nine non-English locales are separate chunks now, so the new language
  // has to arrive before the swap. That is free here: the fade already hides
  // the content for 220ms, and the fetch runs inside it. Await both, so a slow
  // network holds the fade a little longer rather than swapping to English.
  const setLang = useCallback((newLang: string) => {
    if (newLang === lang) return;
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    setShown(false);
    const faded = new Promise<void>((r) => {
      transitionTimer.current = setTimeout(r, 220);
    });
    void Promise.all([faded, loadT(newLang)]).then(() => {
      setLangState(newLang);
      // Force layout calc before flipping shown back on, so the
      // browser renders the new text in the hidden state first —
      // eliminates any KA-font-loading flash.
      requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
    });
  }, [lang]);

  // Initial load in a non-English language: the chunk is not in the bundle, so
  // the first render falls back to English until it arrives. Someone landing on
  // /ka/ therefore sees English for one network round trip.
  //
  // TODO(decide): implement handleInitialLocale below to choose what that
  // moment looks like. See the note above the function.
  useEffect(() => {
    if (isLoaded(lang)) return;
    let cancelled = false;
    void loadT(lang).then(() => {
      if (!cancelled) setLocaleReady((n) => n + 1);
    });
    return () => { cancelled = true; };
    // Runs for the initial language only; setLang awaits its own load.
  }, [lang]);

  // Sync <html lang="..."> + ?lang= URL param + document.title + meta description
  // with active language — improves a11y (screen readers), SEO (hreflang +
  // localized title/description), and shareability.
  useEffect(() => {
    const code = langCode(lang);
    document.documentElement.lang = code;

    // URL sync. The path is the canonical form of a language now, so switching
    // language moves the URL to that language's path rather than tacking on a
    // query param. Without this, picking French on /de/ left the URL saying
    // /de/ while the page rendered French, so sharing the link handed someone
    // else the German page; and picking German on / produced /?lang=de, the
    // duplicate of /de/ that the prerendered pages exist to replace.
    //
    // Only the locale root is rewritten. Deeper paths are the static service
    // pages, which have their own per-language URLs and are not this app.
    const url = new URL(window.location.href);
    const prefix = url.pathname.split('/')[1];
    const onLocaleRoot = url.pathname === '/' || (!!PATH_LANG[prefix] && /^\/\w{2}\/?$/.test(url.pathname));
    if (onLocaleRoot) {
      url.pathname = code === 'en' ? '/' : `/${code}/`;
    }
    url.searchParams.delete('lang');
    window.history.replaceState({}, '', url.toString());

    // Keep the canonical and og:url in step with the URL the visitor is on.
    const canonical = `${url.origin}${url.pathname}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical);
    document.querySelector('meta[name="twitter:url"]')?.setAttribute('content', canonical);

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

  // Holding the paint keeps the page background, so the visitor sees the site's
  // own colour rather than a white flash, and no layout is committed that would
  // shift when the strings land.
  if (holdingForLocale) {
    return (
      <div
        className="min-h-screen bg-white dark:bg-black"
        aria-busy="true"
        aria-live="polite"
        aria-label={`Loading ${langCode(lang)}`}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white overflow-x-hidden noise-overlay transition-colors duration-300">
      <ScrollProgress />

      {/* First tab stop on the page. Without it a keyboard user tabs the whole
          header, and on the localized pages the language chips too, before
          reaching any content, on every single page. Hidden until focused,
          then it has to clear the z-[60] header to be visible at all. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:inline-flex focus:items-center focus:min-h-11 focus:px-5 focus:rounded-xl focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black focus:text-sm focus:font-semibold focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {t.skipToContent}
      </a>

      <Header t={t} lang={lang} setLang={setLang} />

      {/* <main> so assistive tech can jump straight here, which is also what
          the skip link targets. This element was already the content wrapper;
          it was just a div. */}
      <main
        id="main-content"
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
      </main>

      <Suspense fallback={null}>
        <ProjectModal index={selected} onClose={() => setSelected(null)} t={t} />
      </Suspense>

      <ScrollToTop />
      <NowBuilding label={t.nowBuilding} projects={[t.nowBuildingItem1, t.nowBuildingItem2]} />
    </div>
  );
}
