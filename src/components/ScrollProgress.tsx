import { motion, useScroll, useSpring } from 'motion/react';
import { useReducedMotion } from './primitives';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.4 });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500"
    />
  );
}

export function NowBuilding({ label, projects }: { label: string; projects: string[] }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6 }}
      className="hidden md:flex fixed bottom-6 left-6 z-40 items-center gap-3 px-3.5 py-2 rounded-full bg-white/90 dark:bg-zinc-950/85 backdrop-blur-xl border border-zinc-300/70 dark:border-white/[0.08] shadow-xl shadow-black/10 dark:shadow-black/30"
    >
      <span className="relative flex w-2 h-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
      </span>
      <span className="text-[11px] text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.18em]">{label}</span>
      <span className="text-[11px] text-zinc-700 dark:text-zinc-300 font-mono">{projects.join(' · ')}</span>
    </motion.div>
  );
}
