import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';
import { Logo } from './Logo';
import type { getT } from '../i18n';

/* min-h-11 already gave these the 44px height. Width was the part still short,
   because it comes from the label: "GitHub" measured 40 and German "AGB" only
   24, right on the 24px WCAG minimum. px-2.5 with a matching -mx-2.5 buys every
   link 20px of hit area on each axis while leaving the row looking untouched,
   which is what a 24px label needs to clear 44.

   min-w-11 covers the remainder: padding alone left "AGB" at 43.6px, which
   rounds to 44 in any readout but is not 44. Every other label is already past
   55, so this only ever affects the shortest one. */
const footerLink =
  'inline-flex items-center justify-center min-h-11 min-w-11 px-2.5 -mx-2.5 transition-colors';
const footerLinkMuted =
  `${footerLink} hover:text-black dark:hover:text-white dark:text-zinc-300`;

export function Footer({ t }: { t: ReturnType<typeof getT> }) {
  return (
    <footer className="relative border-t border-zinc-200 dark:border-white/[0.06] py-16">
      <div className="max-w-[2000px] mx-auto px-6 md:px-16 xl:px-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <Logo className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity" />
          <div className="w-px h-5 bg-black/[0.10] dark:bg-white/[0.10]" />
          <span className="text-[11px] text-zinc-600 dark:text-zinc-500 tracking-wide">© {t.footerRights}</span>
          <span className="hidden sm:inline font-mono text-[10px] text-zinc-500 dark:text-zinc-600 tracking-wide" aria-hidden="true">{'/* est. 2020 · Tbilisi · view-source friendly */'}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-zinc-600 dark:text-zinc-500">
          <a
            href="https://blueberryedu.ge"
            target="_blank"
            rel="noopener noreferrer"
            className={`${footerLink} text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 font-medium`}
          >
            Blueberry Academy
          </a>
          <a
            href="https://github.com/InnovationEdge"
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinkMuted}
          >
            GitHub
          </a>
          <a href="/humans.txt" className={`${footerLinkMuted} font-mono text-[11px]`}>
            humans.txt
          </a>
          <a
            href="https://www.linkedin.com/company/blueberry-systems/"
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinkMuted}
          >
            LinkedIn
          </a>
          <a href="mailto:info@blueberry.codes?subject=Terms" className={footerLinkMuted}>
            {t.footerTerms}
          </a>
          <a href="mailto:info@blueberry.codes?subject=Privacy" className={footerLinkMuted}>
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
          style={{
            bottom: 'calc(env(safe-area-inset-bottom) + 1.5rem)',
            right: 'calc(env(safe-area-inset-right) + 1.5rem)',
          }}
          className="fixed z-40 w-11 h-11 bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center shadow-2xl shadow-black/30 hover:opacity-90 transition-opacity"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
