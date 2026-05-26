import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';
import { MagneticButton } from './primitives';
import { PORTFOLIO } from '../data';
import type { getT } from '../i18n';

export function ProjectModal({
  index,
  onClose,
  t,
}: {
  index: number | null;
  onClose: () => void;
  t: ReturnType<typeof getT>;
}) {
  return (
    <AnimatePresence>
      {index !== null &&
        (() => {
          const p = PORTFOLIO[index];
          const localizedCategory = [t.proj1Category, t.proj2Category, t.proj3Category, t.proj4Category, t.proj5Category, t.proj6Category][index] ?? p.category;
          const localizedChallenge = [t.proj1Challenge, t.proj2Challenge, t.proj3Challenge, t.proj4Challenge, t.proj5Challenge, t.proj6Challenge][index] ?? p.challenge;
          const localizedSolution = [t.proj1Solution, t.proj2Solution, t.proj3Solution, t.proj4Solution, t.proj5Solution, t.proj6Solution][index] ?? p.solution;
          return (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
              />
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.96 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-4 md:inset-10 lg:inset-x-24 lg:inset-y-12 bg-white dark:bg-zinc-950 border border-zinc-300/70 dark:border-white/[0.08] rounded-3xl z-50 overflow-y-auto shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-label={p.title}
              >
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute top-5 right-5 p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:text-white hover:bg-zinc-200/60 dark:hover:bg-white/[0.06] rounded-full transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative h-56 md:h-72" style={{ background: p.hero }}>
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                    aria-hidden
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                  <div className="absolute bottom-8 left-8 right-8 md:left-14 md:right-14">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className="text-[10px] font-semibold uppercase tracking-[0.22em] px-3 py-1 rounded-full border text-black dark:text-white"
                        style={{
                          borderColor: 'rgba(255,255,255,0.3)',
                          backgroundColor: 'rgba(255,255,255,0.12)',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        {localizedCategory}
                      </span>
                      <span className="text-[11px] text-white/70 font-mono">{p.year}</span>
                      {p.client && <span className="text-[11px] text-white/70">· {p.client}</span>}
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-black dark:text-white">
                      {p.title}
                    </h2>
                  </div>
                </div>

                <div className="p-8 md:p-14 max-w-5xl mx-auto">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="border border-zinc-200 dark:border-white/[0.06] rounded-2xl p-5 bg-zinc-50 dark:bg-white/[0.015]">
                        <p className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: p.accent }}>
                          {m.value}
                        </p>
                        <p className="text-[11px] text-zinc-600 dark:text-zinc-500 mt-2 uppercase tracking-[0.18em]">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-10 mb-12">
                    <div>
                      <h3 className="text-[11px] text-blue-400 font-semibold uppercase tracking-[0.28em] mb-3">
                        {t.challenge}
                      </h3>
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{localizedChallenge}</p>
                    </div>
                    <div>
                      <h3 className="text-[11px] text-blue-400 font-semibold uppercase tracking-[0.28em] mb-3">
                        {t.solution}
                      </h3>
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{localizedSolution}</p>
                    </div>
                  </div>

                  <div className="mb-12">
                    <h3 className="text-[11px] text-blue-400 font-semibold uppercase tracking-[0.28em] mb-4">
                      {t.techStack}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {p.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3.5 py-1.5 bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/[0.06] rounded-full text-xs text-zinc-700 dark:text-zinc-300 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-12">
                    <h3 className="text-[11px] text-blue-400 font-semibold uppercase tracking-[0.28em] mb-4">
                      {t.results}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {p.results.map((r) => (
                        <div key={r} className="bg-zinc-100/60 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06] rounded-xl p-4 text-center">
                          <p className="text-sm font-semibold text-black dark:text-white">{r}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 border-t border-zinc-200 dark:border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-sm text-zinc-600 dark:text-zinc-500">{t.interestedProject}</p>
                    <MagneticButton
                      href="#contact"
                      onClick={onClose}
                      className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all inline-flex items-center gap-2"
                    >
                      {t.startProject} <ArrowRight className="w-4 h-4" />
                    </MagneticButton>
                  </div>
                </div>
              </motion.div>
            </>
          );
        })()}
    </AnimatePresence>
  );
}
