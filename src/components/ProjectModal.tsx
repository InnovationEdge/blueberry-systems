import { useEffect } from 'react';
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
  const open = index !== null;

  // While the dialog is up, freeze the page behind it and let Escape close it.
  // Without the scroll lock the background scrolls under the panel on touch,
  // which on a phone reads as the modal itself being broken.
  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    // Desktop scrollbars take width; compensate so the page does not jump.
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

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
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[80]"
              />
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.96 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                /* z-[90] puts the panel above the site header, which is
                   z-[60] and fixed. At z-50 the header rendered on top of the
                   dialog and covered the close button, so on a phone the
                   modal could be opened but not dismissed. */
                className="fixed inset-2 sm:inset-4 md:inset-10 lg:inset-x-24 lg:inset-y-12 bg-white dark:bg-zinc-950 border border-zinc-300/70 dark:border-white/[0.08] rounded-2xl sm:rounded-3xl z-[90] overflow-y-auto overscroll-contain shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-label={p.title}
              >
                {/* Fixed to the viewport, not the scrolling panel, so it stays
                   put while the content scrolls. 44px is the minimum
                   comfortable touch target. */}
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="fixed top-5 right-5 sm:top-7 sm:right-7 grid place-items-center w-11 h-11 rounded-full bg-black/55 backdrop-blur-md text-white hover:bg-black/75 transition-colors z-[95]"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative h-64 sm:h-56 md:h-72 overflow-hidden" style={{ background: p.hero }}>
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                    aria-hidden
                  />
                  {/* Screenshot bleeds in from the right so the title block on
                      the left keeps its contrast and stays readable. */}
                  {p.shot && (
                    <picture>
                      <source type="image/webp" srcSet={p.shot.replace('.png', '.webp')} />
                      <img
                        src={p.shot}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        decoding="async"
                        /* On a phone the shot is pushed most of the way off the
                           right edge so it reads as a hint and the title block
                           keeps the width it needs. It only sits inside the
                           band from sm up. */
                        className={
                          p.shotKind === 'phone'
                            ? 'absolute -right-[16%] -top-[4%] h-[128%] w-auto rounded-[1.6rem] opacity-70 sm:right-[6%] sm:-top-[6%] sm:h-[150%] sm:rounded-[2rem] sm:opacity-90 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]'
                            : 'absolute -right-[10%] top-[20%] w-[64%] rounded-l-lg opacity-60 sm:right-0 sm:top-[14%] sm:w-[52%] sm:rounded-tl-xl sm:rounded-bl-none sm:opacity-85 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]'
                        }
                      />
                    </picture>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  {p.shot && (
                    /* Heavier on mobile, where the shot sits closer to the text. */
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/70 to-zinc-950/20 sm:from-zinc-950/85 sm:via-zinc-950/35 sm:to-transparent"
                      aria-hidden
                    />
                  )}

                  <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 md:left-14 md:right-14">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 mb-2.5 sm:gap-3 sm:mb-3">
                      <span
                        className="text-[10px] font-semibold uppercase tracking-[0.22em] px-3 py-1 rounded-full border text-white"
                        style={{
                          borderColor: 'rgba(255,255,255,0.3)',
                          backgroundColor: 'rgba(255,255,255,0.12)',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        {localizedCategory}
                      </span>
                      <span className="text-[11px] text-white/70 font-mono">{p.year}</span>
                      {/* Long on several projects, and on a phone it pushed the
                          title down out of the band. Desktop only. */}
                      {p.client && (
                        <span className="hidden sm:inline text-[11px] text-white/70">· {p.client}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* One tile per mark, matching the card. */}
                      {(Array.isArray(p.logo) ? p.logo : p.logo ? [p.logo] : []).map((mark) => (
                        <span
                          key={mark}
                          className="shrink-0 w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-black/35 backdrop-blur-md border border-white/20 shadow-lg grid place-items-center p-1.5 sm:p-2"
                        >
                          <img
                            src={mark}
                            alt=""
                            aria-hidden
                            loading="lazy"
                            decoding="async"
                            width="64"
                            height="64"
                            className="w-full h-full object-contain"
                          />
                        </span>
                      ))}
                      {/* The hero band is always dark: a gradient, a dark
                          screenshot, and a zinc-950 scrim on top. So this text
                          is always light, never theme-dependent. It used to be
                          text-black dark:text-white, which rendered black on
                          black for every visitor in light mode. */}
                      <h2 className="text-[28px] leading-[1.05] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                        {p.title}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-8 md:p-14 max-w-5xl mx-auto">
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
