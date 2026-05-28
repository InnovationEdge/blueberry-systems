import { Services, TechStrip, Process } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Pricing, Testimonials, MiniCta } from './components/Pricing';
import { Blog, Team, Partners } from './components/Community';
import { Careers } from './components/Careers';
import { FAQ, Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FounderNote } from './components/FounderNote';
import type { getT } from './i18n';

/**
 * Below-the-fold sections — split into its own chunk so the initial
 * load only pays for Hero + StatsStrip + Industries above the fold.
 * Brings the home-page LCP/FCP path roughly 40% lighter.
 */
export default function BelowFold({
  t,
  lang,
  onOpenProject,
}: {
  t: ReturnType<typeof getT>;
  lang: string;
  onOpenProject: (index: number) => void;
}) {
  return (
    <>
      <Services t={t} lang={lang} />
      <TechStrip t={t} />
      <Process t={t} />
      <FounderNote t={t} />
      <Portfolio t={t} onOpen={onOpenProject} />
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
    </>
  );
}
