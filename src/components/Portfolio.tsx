import { ArrowUpRight } from 'lucide-react';
import { Reveal, SectionEyebrow } from './primitives';
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
  const featured = PORTFOLIO.find((p) => p.featured) ?? PORTFOLIO[0];
  const featuredIndex = PORTFOLIO.indexOf(featured);
  const rest = PORTFOLIO.filter((_, i) => i !== featuredIndex);

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
            </div>
            <a
              href="#contact"
              className="hidden md:inline-flex text-sm text-zinc-400 hover:text-white transition-colors items-center gap-2 self-end"
            >
              {t.bookCall} <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </Reveal>

        {/* Featured */}
        <Reveal>
          <button
            type="button"
            onClick={() => onOpen(featuredIndex)}
            className="group block w-full text-left lift rounded-3xl border border-white/[0.06] bg-white/[0.015] hover:border-white/[0.16] overflow-hidden mb-5"
          >
            <div className="grid md:grid-cols-2 gap-0 min-h-[440px]">
              <div className="relative aspect-[4/3] md:aspect-auto md:h-full">
                <ProductMockup accent={featured.accent} gradient={featured.hero} />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 text-[10px] font-semibold uppercase tracking-widest text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Featured case study
                </div>
              </div>

              <div className="p-8 md:p-12 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.22em] px-3 py-1 rounded-full border"
                    style={{
                      color: featured.accent,
                      borderColor: `${featured.accent}45`,
                      backgroundColor: `${featured.accent}10`,
                    }}
                  >
                    {featured.category}
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono">{featured.year}</span>
                </div>

                <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{featured.title}</h3>
                <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-md">{featured.desc}</p>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  {featured.metrics.map((m) => (
                    <div key={m.label} className="border-l border-white/[0.08] pl-4">
                      <p className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: featured.accent }}>
                        {m.value}
                      </p>
                      <p className="text-[11px] text-zinc-500 mt-1 uppercase tracking-[0.18em]">{m.label}</p>
                    </div>
                  ))}
                </div>

                <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                  {t.viewProject}
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </button>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((p) => {
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

