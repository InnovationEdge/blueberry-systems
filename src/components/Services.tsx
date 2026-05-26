import { Code2, Megaphone, Palette, TrendingUp } from 'lucide-react';
import { Reveal, ScaleIn, Marquee, SectionEyebrow } from './primitives';
import { TECH_GROUPS } from '../data';
import type { getT } from '../i18n';

const STATS = {
  s1: ['2× Faster', '99.99% Uptime'],
  s2: ['−48% CAC', '+62% MAU'],
  s3: ['80 NPS', '2× faster launch'],
  s4: ['+25% efficiency', '+40% ARR'],
} as const;

const ICONS = [Code2, Megaphone, Palette, TrendingUp] as const;
const ACCENTS = ['#3b82f6', '#06b6d4', '#8b5cf6', '#f59e0b'] as const;

export function Services({ t }: { t: ReturnType<typeof getT> }) {
  const SERVICES = [
    { num: '01', title: t.svc1Title, desc: t.svc1Desc, stats: STATS.s1 },
    { num: '02', title: t.svc2Title, desc: t.svc2Desc, stats: STATS.s2 },
    { num: '03', title: t.svc3Title, desc: t.svc3Desc, stats: STATS.s3 },
    { num: '04', title: t.svc4Title, desc: t.svc4Desc, stats: STATS.s4 },
  ];

  return (
    <section id="services" className="py-24 md:py-36 relative">
      <div className="max-w-[2000px] mx-auto px-6 md:px-16 xl:px-24">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <SectionEyebrow num="01" label={t.whatWeDo} />
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.035em] max-w-3xl">
                {t.servicesTitle}
              </h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-500 text-base md:text-lg max-w-md leading-relaxed">{t.servicesDesc}</p>
          </div>
        </Reveal>

        {/* Clean equal-cards grid — 1col mobile, 2col tablet, 4col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[i];
            const accent = ACCENTS[i];
            return (
              <ScaleIn key={i} delay={i * 0.05}>
                <article
                  className="group relative h-full flex flex-col rounded-2xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] hover:border-zinc-400 dark:hover:border-white/[0.18] hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-black/40 p-7 sm:p-8 transition-all duration-300"
                >
                  {/* Icon — large, bold, accent-colored */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: `${accent}14`,
                      color: accent,
                    }}
                  >
                    <Icon className="w-7 h-7" strokeWidth={1.75} />
                  </div>

                  {/* Step number — small caps eyebrow */}
                  <p
                    className="font-mono text-[10px] tracking-[0.22em] uppercase mb-3"
                    style={{ color: accent }}
                  >
                    /{s.num}
                  </p>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3 text-black dark:text-white">
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                    {s.desc}
                  </p>

                  {/* Stats — compact, theme-aware */}
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-4 border-t border-zinc-100 dark:border-white/[0.06]">
                    {s.stats.map((stat) => (
                      <span
                        key={stat}
                        className="px-2.5 py-1 text-[10px] font-mono rounded-full bg-zinc-100 dark:bg-white/[0.04] text-zinc-700 dark:text-zinc-300"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>

                  {/* Accent line on hover (top) */}
                  <span
                    className="absolute top-0 left-7 right-7 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: accent }}
                    aria-hidden
                  />
                </article>
              </ScaleIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Tech stack: marquee strip ─── */
export function TechStrip({ t }: { t: ReturnType<typeof getT> }) {
  const allTech = TECH_GROUPS.flatMap((g) => g.items);
  return (
    <section className="py-16 md:py-20 border-y border-zinc-200/60 dark:border-white/[0.04]">
      <div className="max-w-[2000px] mx-auto px-6 md:px-16 xl:px-24 mb-8">
        <Reveal>
          <p className="text-center text-zinc-600 dark:text-zinc-500 text-[11px] uppercase tracking-[0.32em] font-medium">
            {t.techTitle}
          </p>
        </Reveal>
      </div>
      <Marquee speed={40}>
        <>
          {allTech.map((tech) => (
            <div
              key={tech.name}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-zinc-200/70 dark:border-white/[0.05] bg-zinc-50 dark:bg-white/[0.015] whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tech.color, boxShadow: `0 0 10px ${tech.color}55` }} />
              <span className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">{tech.name}</span>
            </div>
          ))}
        </>
      </Marquee>
      <div className="h-3" />
      <Marquee speed={50} reverse>
        <>
          {[...allTech].reverse().map((tech) => (
            <div
              key={`r-${tech.name}`}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-zinc-200/70 dark:border-white/[0.05] bg-zinc-50 dark:bg-white/[0.015] whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tech.color }} />
              <span className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">{tech.name}</span>
            </div>
          ))}
        </>
      </Marquee>
    </section>
  );
}

/* ─── Process: numbered timeline ─── */
export function Process({ t }: { t: ReturnType<typeof getT> }) {
  const steps = [
    { step: '01', title: t.proc1, desc: t.proc1Desc },
    { step: '02', title: t.proc2, desc: t.proc2Desc },
    { step: '03', title: t.proc3, desc: t.proc3Desc },
  ];

  return (
    <section id="process" className="py-24 md:py-36 relative">
      <div className="max-w-[2000px] mx-auto px-6 md:px-16 xl:px-24">
        <Reveal>
          <SectionEyebrow num="02" label={t.howWeWork} center />
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-[-0.035em] text-center mb-20 max-w-3xl mx-auto">
            {t.processTitle}
          </h2>
        </Reveal>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <div className="hidden md:block absolute top-[68px] left-[16%] right-[16%] h-px">
            <div className="h-full w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
          </div>

          {steps.map((p, i) => (
            <ScaleIn key={i} delay={i * 0.12}>
              <div className="relative group text-center">
                <div className="relative inline-block mb-6">
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl scale-90 group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="relative inline-flex items-center justify-center w-20 h-20 rounded-full border border-blue-500/30 bg-blue-500/5 font-mono text-blue-300 text-xl font-bold">
                    {p.step}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight">{p.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-500 leading-relaxed max-w-xs mx-auto">{p.desc}</p>
              </div>
            </ScaleIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Stats strip — editorial magazine-style, no card, massive numbers ─── */
export function StatsStrip({ t }: { t: ReturnType<typeof getT> }) {
  const stats = [
    { v: '$400M+', l: 'GMV processed' },
    { v: '50+', l: t.projects },
    { v: '99.99%', l: t.uptime },
    { v: '15+', l: t.clients },
  ];
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[2000px] mx-auto px-6 md:px-16 xl:px-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0 gap-x-8 md:gap-x-12 lg:gap-x-16">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="flex flex-col items-start min-w-0">
                <p
                  className="font-extrabold text-black dark:text-white whitespace-nowrap"
                  style={{
                    fontSize: 'clamp(2rem, 4.2vw, 3.75rem)',
                    letterSpacing: '-0.035em',
                    lineHeight: 1,
                  }}
                >
                  {s.v}
                </p>
                <span
                  className="mt-3 md:mt-4 w-8 h-px"
                  style={{ background: '#004aad' }}
                  aria-hidden
                />
                <p className="text-[10px] md:text-[11px] text-zinc-600 dark:text-zinc-400 mt-3 md:mt-4 uppercase tracking-[0.22em] font-medium">
                  {s.l}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
