import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { AnimatedThemeToggler } from './ui/animated-theme-toggler';
import { Logo } from './Logo';
import { LANGUAGES } from '../data';
import type { getT } from '../i18n';

export function Header({
  t,
  lang,
  setLang,
}: {
  t: ReturnType<typeof getT>;
  lang: string;
  setLang: (l: string) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const NAV = [
    { label: t.navServices, id: 'services' },
    { label: t.navPortfolio, id: 'portfolio' },
    { label: t.navProcess, id: 'process' },
    { label: t.navPricing, id: 'pricing' },
    { label: t.navCareers, id: 'careers' },
    { label: t.navFaq, id: 'faq' },
    { label: t.navContact, id: 'contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-black/80 backdrop-blur-2xl border-b border-zinc-200 dark:border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 md:px-10 h-[88px] flex items-center">
          <a href="/" className="shrink-0 mr-8 flex items-center gap-2.5" aria-label="Blueberry Systems">
            <Logo />
          </a>

          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="px-3.5 py-2 text-[13px] text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white rounded-md hover:bg-zinc-100 dark:hover:bg-white/[0.04] transition-all font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 ml-auto">
            <AnimatedThemeToggler
              variant="circle"
              duration={500}
              className="hidden md:inline-flex w-9 h-9 items-center justify-center rounded-md border border-zinc-300/70 dark:border-white/[0.08] hover:border-zinc-500/70 dark:hover:border-white/[0.18] text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all [&_svg]:w-4 [&_svg]:h-4"
            />
            <div className="relative hidden md:block">
              <button
                onClick={() => setShowLang((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={showLang}
                className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors font-medium px-3 py-1.5 border border-zinc-300/70 dark:border-white/[0.08] hover:border-zinc-500/70 dark:hover:border-white/[0.18] rounded-md flex items-center gap-1.5"
              >
                {lang} <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {showLang && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowLang(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-2 bg-white dark:bg-zinc-950 border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl shadow-black/50 min-w-[100px]"
                    >
                      {LANGUAGES.map((l) => (
                        <button
                          key={l}
                          onClick={() => { setLang(l); setShowLang(false); }}
                          className={`block w-full px-4 py-2.5 text-xs text-left transition-colors ${
                            lang === l ? 'bg-blue-600/15 text-blue-400' : 'text-zinc-600 dark:text-zinc-400 hover:bg-white/5 hover:text-black dark:text-white'
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-black text-black dark:text-white dark:bg-white dark:text-black rounded-lg text-[13px] font-semibold hover:opacity-90 transition-all"
            >
              {t.getInTouch}
            </a>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="lg:hidden p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
              />
              <motion.nav
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-zinc-950 border-l border-black/[0.06] dark:border-white/[0.08] z-50 lg:hidden px-6 pt-24 pb-8 overflow-y-auto"
              >
                {NAV.map((item, i) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className="block py-4 text-base text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white border-b border-zinc-200 dark:border-white/[0.06] transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}

                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="block mt-6 py-3.5 bg-black text-black dark:text-white dark:bg-white dark:text-black rounded-xl text-sm font-semibold text-center hover:opacity-90 transition-all"
                >
                  {t.getInTouch}
                </a>

                <div className="flex items-center gap-3 mt-6">
                  <AnimatedThemeToggler
                    variant="circle"
                    duration={500}
                    className="inline-flex w-9 h-9 items-center justify-center rounded-lg border border-zinc-300/70 dark:border-white/[0.08] text-zinc-600 dark:text-zinc-400 [&_svg]:w-4 [&_svg]:h-4"
                  />
                  <div className="flex items-center gap-2 flex-wrap flex-1">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l}
                        onClick={() => setLang(l)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          lang === l
                            ? 'bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                            : 'text-zinc-600 dark:text-zinc-500 border border-zinc-200 dark:border-white/[0.06] hover:text-black dark:hover:text-white'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </motion.header>
      <div className="h-[88px]" />
    </>
  );
}
