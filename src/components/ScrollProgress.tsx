import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { useReducedMotion } from '../hooks';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.4 });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-[var(--bb-berry)]"
    />
  );
}

export function NowBuilding({ label, projects }: { label: string; projects: string[] }) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  // Only after the hero: at 1440 the pill sat on top of the hero's bottom row
  // at the fold, and a status pill has nothing to add before any content has
  // been scrolled anyway.
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > 500));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4 }}
          style={{
            bottom: 'calc(env(safe-area-inset-bottom) + 1.5rem)',
            left: 'calc(env(safe-area-inset-left) + 1.5rem)',
          }}
          className="hidden md:flex fixed z-40 items-center gap-3 px-3.5 py-2 rounded-full bg-white/90 dark:bg-zinc-950/85 backdrop-blur-xl border border-zinc-300/70 dark:border-white/[0.08] shadow-xl shadow-black/10 dark:shadow-black/30"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-[11px] text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.18em]">{label}</span>
          <span className="text-[11px] text-zinc-700 dark:text-zinc-300 font-mono">
            <span className="text-blue-600 dark:text-blue-400">$ </span>
            {projects.join(' · ')}
            <span aria-hidden className="text-blue-600 dark:text-blue-400 animate-[blink_1.2s_steps(1)_infinite]">▍</span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
