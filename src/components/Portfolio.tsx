import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { MagneticButton, Reveal, SectionEyebrow } from './primitives';
import { PORTFOLIO } from '../data';
import type { getT } from '../i18n';

/* ─── Abstract product mockup (CSS-only, no images) ─── */
function ProductMockup({ accent, gradient }: { accent: string; gradient: string }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-t-3xl"
      style={{ background: gradient }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at top right, black, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at top right, black, transparent 70%)',
        }}
        aria-hidden
      />

      {/* Mock window chrome */}
      <div className="absolute top-3 left-3 right-3 flex items-center gap-1.5">
        <span className="mockup-dot" style={{ background: '#fff', opacity: 0.4 }} />
        <span className="mockup-dot" style={{ background: '#fff', opacity: 0.25 }} />
        <span className="mockup-dot" style={{ background: '#fff', opacity: 0.18 }} />
        <span className="flex-1 mockup-bar h-1.5 ml-2 max-w-[60%]" />
      </div>

      {/* Mock content rows */}
      <div className="absolute inset-x-5 top-10 space-y-2">
        <div className="mockup-bar h-2" style={{ width: '70%' }} />
        <div className="mockup-bar h-2" style={{ width: '40%' }} />
      </div>

      {/* Mock chart */}
      <svg
        className="absolute bottom-3 left-3 right-3 h-16 w-[calc(100%-1.5rem)]"
        viewBox="0 0 100 30"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id={`grad-${accent.replace('#', '')}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,22 L10,18 L20,20 L30,12 L40,15 L50,9 L60,11 L70,6 L80,8 L90,3 L100,5 L100,30 L0,30 Z"
          fill={`url(#grad-${accent.replace('#', '')})`}
        />
        <path
          d="M0,22 L10,18 L20,20 L30,12 L40,15 L50,9 L60,11 L70,6 L80,8 L90,3 L100,5"
          stroke="#ffffff"
          strokeOpacity="0.85"
          strokeWidth="0.6"
          fill="none"
        />
      </svg>

      {/* Floating metric badge */}
      <div
        className="absolute top-12 right-5 px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/25 text-[10px] font-mono text-white"
      >
        ↑ Live
      </div>
    </div>
  );
}

export function Portfolio({ t, onOpen }: { t: ReturnType<typeof getT>; onOpen: (i: number) => void }) {
  return (
    <section id="portfolio" className="py-24 md:py-36 bg-black">
      <div className="max-w-[2000px] mx-auto px-6 md:px-16 xl:px-24">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <SectionEyebrow num="03" label={t.selectedWork} />
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.035em] max-w-3xl">
                {t.portfolioTitle}
              </h2>
              <p className="text-zinc-500 mt-4 max-w-md text-base">
                A representative slice of the kind of work we ship — anonymized where required by NDA.
              </p>
            </div>
            <a
              href="#contact"
              className="hidden md:inline-flex text-sm text-zinc-400 hover:text-white transition-colors items-center gap-2 self-end"
            >
              {t.bookCall} <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </Reveal>

        {/* Equal grid (no featured pedestal) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PORTFOLIO.map((p) => {
            const originalIdx = PORTFOLIO.indexOf(p);
            return (
              <Reveal key={p.title} delay={originalIdx * 0.05}>
                <button
                  type="button"
                  onClick={() => onOpen(originalIdx)}
                  className="group w-full text-left lift rounded-3xl border border-white/[0.06] bg-white/[0.015] hover:border-white/[0.14] overflow-hidden h-full flex flex-col"
                >
                  <div className="relative aspect-[16/10]">
                    <ProductMockup accent={p.accent} gradient={p.hero} />
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                        style={{ color: p.accent }}
                      >
                        {p.category}
                      </span>
                      <span className="text-[10px] text-zinc-600 font-mono">{p.year}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 tracking-tight">{p.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-5 flex-1">{p.desc}</p>
                    <div className="flex items-center justify-between text-[12px] text-zinc-500 pt-4 border-t border-white/[0.06] group-hover:text-blue-300 transition-colors">
                      <span>{t.viewProject}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
                className="fixed inset-4 md:inset-10 lg:inset-x-24 lg:inset-y-12 bg-zinc-950 border border-white/[0.08] rounded-3xl z-50 overflow-y-auto shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-label={p.title}
              >
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded-full transition-colors z-10"
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
                        className="text-[10px] font-semibold uppercase tracking-[0.22em] px-3 py-1 rounded-full border"
                        style={{
                          color: '#fff',
                          borderColor: 'rgba(255,255,255,0.3)',
                          backgroundColor: 'rgba(255,255,255,0.12)',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        {p.category}
                      </span>
                      <span className="text-[11px] text-white/70 font-mono">{p.year}</span>
                      {p.client && <span className="text-[11px] text-white/70">· {p.client}</span>}
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                      {p.title}
                    </h2>
                  </div>
                </div>

                <div className="p-8 md:p-14 max-w-5xl mx-auto">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {p.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="border border-white/[0.06] rounded-2xl p-5 bg-white/[0.015]"
                      >
                        <p className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: p.accent }}>
                          {m.value}
                        </p>
                        <p className="text-[11px] text-zinc-500 mt-2 uppercase tracking-[0.18em]">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-10 mb-12">
                    <div>
                      <h3 className="text-[11px] text-blue-400 font-semibold uppercase tracking-[0.28em] mb-3">
                        {t.challenge}
                      </h3>
                      <p className="text-zinc-300 leading-relaxed">{p.challenge}</p>
                    </div>
                    <div>
                      <h3 className="text-[11px] text-blue-400 font-semibold uppercase tracking-[0.28em] mb-3">
                        {t.solution}
                      </h3>
                      <p className="text-zinc-300 leading-relaxed">{p.solution}</p>
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
                          className="px-3.5 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded-full text-xs text-zinc-300 font-mono"
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
                        <div
                          key={r}
                          className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 text-center"
                        >
                          <p className="text-sm font-semibold text-white">{r}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-sm text-zinc-500">{t.interestedProject}</p>
                    <MagneticButton
                      href="#contact"
                      onClick={onClose}
                      className="px-6 py-3 bg-white text-black rounded-full text-sm font-semibold hover:bg-zinc-200 transition-all inline-flex items-center gap-2"
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

