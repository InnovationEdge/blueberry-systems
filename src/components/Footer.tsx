import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';
import { Logo } from './Logo';
import type { getT } from '../i18n';

export function Footer({ t }: { t: ReturnType<typeof getT> }) {
  return (
    <footer className="relative border-t border-zinc-200 dark:border-white/[0.06] py-16">
      <div className="max-w-[2000px] mx-auto px-6 md:px-16 xl:px-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <Logo className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity" />
          <div className="w-px h-5 bg-black/[0.10] dark:bg-white/[0.10]" />
          <span className="text-[11px] text-zinc-600 dark:text-zinc-500 tracking-wide">© {t.footerRights}</span>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-600 dark:text-zinc-500">
          <a
            href="https://blueberryedu.ge"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-200 transition-colors font-medium"
          >
            Blueberry Academy
          </a>
          <a
            href="https://github.com/InnovationEdge"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-zinc-700 dark:text-zinc-300 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/company/blueberry-systems/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-zinc-700 dark:text-zinc-300 transition-colors"
          >
            LinkedIn
          </a>
          <a href="mailto:info@blueberry.codes?subject=Terms" className="hover:text-black dark:hover:text-zinc-700 dark:text-zinc-300 transition-colors">
            {t.footerTerms}
          </a>
          <a href="mailto:info@blueberry.codes?subject=Privacy" className="hover:text-black dark:hover:text-zinc-700 dark:text-zinc-300 transition-colors">
            {t.footerPrivacy}
          </a>
        </div>
      </div>
    </footer>
  );
}

export function ScrollToTop() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > 600));

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 bg-black text-black dark:text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center shadow-2xl shadow-black/30 hover:opacity-90 transition-opacity"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
