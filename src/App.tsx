import { lazy, Suspense, useState, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services, TechStrip, Process, StatsStrip } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Pricing, Testimonials, MiniCta } from './components/Pricing';
import { Blog, Team, Partners } from './components/Community';
import { Careers } from './components/Careers';
import { FAQ, Contact } from './components/Contact';
import { Footer, ScrollToTop } from './components/Footer';
import { ScrollProgress, NowBuilding } from './components/ScrollProgress';
import { FounderNote } from './components/FounderNote';
import { Industries } from './components/Industries';
import { getT } from './i18n';

const ProjectModal = lazy(() =>
  import('./components/ProjectModal').then((m) => ({ default: m.ProjectModal })),
);

export default function App() {
  const [lang, setLangState] = useState('EN');
  const [selected, setSelected] = useState<number | null>(null);
  const [shown, setShown] = useState(true);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = getT(lang);

  // Smooth fade when switching languages — no remount, no scroll loss
  const setLang = useCallback((newLang: string) => {
    if (newLang === lang) return;
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    setShown(false);
    transitionTimer.current = setTimeout(() => {
      setLangState(newLang);
      requestAnimationFrame(() => setShown(true));
    }, 180);
  }, [lang]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white overflow-x-hidden noise-overlay transition-colors duration-300">
      <ScrollProgress />
      <Header t={t} lang={lang} setLang={setLang} />

      <div
        className={`transition-[opacity,filter] duration-200 ease-out ${
          shown ? 'opacity-100 blur-0' : 'opacity-0 blur-[2px]'
        }`}
      >
        <Hero t={t} />
        <StatsStrip t={t} />
        <Industries t={t} />
        <Services t={t} />
        <TechStrip t={t} />
        <Process t={t} />
        <FounderNote t={t} />
        <Portfolio t={t} onOpen={setSelected} />
        <MiniCta t={t} />
        <Pricing t={t} />
        <Testimonials t={t} />
        <Blog t={t} />
        <Team t={t} />
        <Partners t={t} />
        <Careers t={t} />
        <FAQ t={t} />
        <Contact t={t} />
        <Footer t={t} />
      </div>

      <Suspense fallback={null}>
        <ProjectModal index={selected} onClose={() => setSelected(null)} t={t} />
      </Suspense>

      <ScrollToTop />
      <NowBuilding label={t.nowBuilding} projects={[t.nowBuildingItem1, t.nowBuildingItem2]} />
    </div>
  );
}
