import { lazy, Suspense, useState } from 'react';
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
  const [lang, setLang] = useState('EN');
  const [selected, setSelected] = useState<number | null>(null);
  const t = getT(lang);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden noise-overlay">
      <ScrollProgress />
      <Header t={t} lang={lang} setLang={setLang} />

      <Hero t={t} />
      <StatsStrip t={t} />
      <Industries />
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

      <Suspense fallback={null}>
        <ProjectModal index={selected} onClose={() => setSelected(null)} t={t} />
      </Suspense>

      <ScrollToTop />
      <NowBuilding projects={['3 active engagements', 'Q3 2026 cohort']} />
    </div>
  );
}
