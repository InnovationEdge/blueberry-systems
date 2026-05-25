import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import {
  CursorSpotlight,
  FloatingOrb,
  HeroParticles,
  KineticWords,
  MagneticButton,
  Marquee,
  Reveal,
} from './primitives';
import { AWARDS, TECH_GROUPS } from '../data';
import type { getT } from '../i18n';

export function Hero({ t }: { t: ReturnType<typeof getT> }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const previewY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const previewScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const allTech = TECH_GROUPS.flatMap((g) => g.items);

  return (
    <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden">
      <CursorSpotlight color="rgba(99,168,255,0.18)" />

      {/* Background layers */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-grid-fade" />
        <HeroParticles />
        <motion.div style={{ y: orbY }} className="absolute inset-0 pointer-events-none">
          <FloatingOrb className="absolute top-[6%] right-[6%] w-[680px] h-[680px] bg-blue-500/[0.13] rounded-full blur-[160px]" />
          <FloatingOrb className="absolute bottom-[8%] left-[2%] w-[560px] h-[560px] bg-violet-600/[0.10] rounded-full blur-[150px]" />
          <FloatingOrb className="absolute top-[45%] left-[35%] w-[360px] h-[360px] bg-cyan-500/[0.07] rounded-full blur-[120px]" />
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Side rails — editorial detail */}
      <div className="hidden lg:flex absolute top-[40%] -translate-y-1/2 left-6 xl:left-10 flex-col items-start gap-3 z-10 pointer-events-none">
        <span className="font-mono text-[10px] text-zinc-600 tracking-[0.3em] uppercase rotate-90 origin-top-left translate-y-12">
          BBS-2026 / TBI · 41.71°N 44.83°E
        </span>
      </div>
      <div className="hidden lg:flex absolute top-[40%] -translate-y-1/2 right-6 xl:right-10 flex-col items-end gap-3 z-10 pointer-events-none">
        <span className="font-mono text-[10px] text-zinc-600 tracking-[0.3em] uppercase -rotate-90 origin-top-right -translate-y-12">
          {t.onMarket} · 99.99% Uptime
        </span>
      </div>

      <div className="relative max-w-[2000px] mx-auto px-6 md:px-16 xl:px-24 pt-28 pb-28 md:pt-36 md:pb-32 w-full">
        <motion.div style={{ y: titleY, opacity: titleOpacity }}>
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-3 bg-white/[0.04] backdrop-blur-xl border border-white/[0.10] rounded-full pl-2 pr-5 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] mb-12"
          >
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/15 text-emerald-300 px-2.5 py-1 rounded-full text-[10px] font-semibold normal-case tracking-normal">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              Now booking Q3
            </span>
            <span className="text-zinc-500">·</span>
            <span className="text-zinc-300">{t.onMarket}</span>
          </motion.div>

          {/* Cinematic display headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-extrabold leading-[0.86] tracking-[-0.05em] mb-10 max-w-[1300px]"
            style={{ fontSize: 'clamp(3rem, 9vw, 9.5rem)' }}
          >
            <span className="block text-white">{t.heroPrefix}</span>
            <span className="block">
              <KineticWords
                words={t.heroWords as unknown as string[]}
                className="bg-gradient-to-br from-blue-300 via-cyan-200 to-violet-300 bg-clip-text text-transparent"
              />
            </span>
            <span
              className="block text-zinc-400 font-light tracking-tight"
              style={{ fontSize: '0.7em', lineHeight: 0.95 }}
            >
              {t.digitalProducts}
            </span>
          </motion.h1>

          {/* Split row: subtitle (left) + meta + CTAs (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-20">
            <div className="lg:col-span-7">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="text-zinc-300 text-lg md:text-2xl max-w-[40ch] leading-[1.4] font-light"
              >
                {t.heroSubtitle}
              </motion.p>
            </div>

            <div className="lg:col-span-5 flex flex-col items-start gap-5">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col sm:flex-row items-start gap-3"
              >
                <MagneticButton
                  href="#contact"
                  className="group px-8 py-4 bg-white text-black rounded-full font-semibold text-[15px] inline-flex items-center gap-2.5 hover:bg-zinc-200 transition-all shadow-2xl shadow-blue-500/10 active:scale-[0.97]"
                >
                  <Sparkles className="w-4 h-4 text-blue-600" /> {t.heroCta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </MagneticButton>
                <a
                  href="#portfolio"
                  className="group px-8 py-4 border border-white/[0.14] text-white rounded-full text-[15px] font-medium hover:border-white/30 hover:bg-white/[0.04] transition-all inline-flex items-center gap-2.5"
                >
                  {t.heroExplore}
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </motion.div>
            </div>
          </div>

          {/* Hero preview card — sneak peek of featured project */}
          <motion.div
            style={{ y: previewY, scale: previewScale }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 relative max-w-[1200px] mx-auto"
          >
            <div
              className="relative aspect-[16/8.5] rounded-3xl overflow-hidden border border-white/[0.10] shadow-2xl shadow-blue-500/10"
              style={{ background: 'linear-gradient(135deg, #0a1f3d 0%, #062052 35%, #1e3a8a 100%)' }}
            >
              {/* Grid + Faux UI */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                  maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
                }}
                aria-hidden
              />
              {/* Window chrome */}
              <div className="absolute top-4 left-4 right-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="ml-3 flex-1 max-w-[260px] h-2 mockup-bar" />
                <span className="font-mono text-[10px] text-white/60">blueberry.codes / case-studies</span>
              </div>

              {/* Center content */}
              <div className="absolute inset-x-12 top-16 bottom-12 grid grid-cols-12 gap-5">
                {/* Left rail */}
                <div className="col-span-3 space-y-3">
                  <div className="mockup-bar h-3 w-full" />
                  <div className="mockup-bar h-3 w-2/3 opacity-60" />
                  <div className="mockup-bar h-3 w-3/4 opacity-50" />
                  <div className="mockup-bar h-3 w-1/2 opacity-40" />
                </div>
                {/* Main panel */}
                <div className="col-span-9 grid grid-cols-3 gap-4">
                  <div className="col-span-3 grid grid-cols-3 gap-4">
                    {[
                      { v: '$418M', l: 'GMV / annualized' },
                      { v: '99.99%', l: 'SLA' },
                      { v: '120 ms', l: 'p99 latency' },
                    ].map((s) => (
                      <div
                        key={s.l}
                        className="rounded-xl border border-white/15 bg-white/[0.05] backdrop-blur-sm p-3 sm:p-4"
                      >
                        <p className="text-base sm:text-2xl font-bold text-white tracking-tight">
                          {s.v}
                        </p>
                        <p className="text-[9px] sm:text-[10px] text-white/60 uppercase tracking-[0.18em] mt-1">
                          {s.l}
                        </p>
                      </div>
                    ))}
                  </div>
                  {/* Chart row */}
                  <div className="col-span-3 rounded-xl border border-white/15 bg-white/[0.04] backdrop-blur-sm p-4 flex items-end">
                    <svg
                      viewBox="0 0 100 30"
                      preserveAspectRatio="none"
                      className="w-full h-16 sm:h-20"
                      aria-hidden
                    >
                      <defs>
                        <linearGradient id="hero-chart" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,24 L8,18 L16,21 L24,12 L32,15 L40,8 L48,12 L56,6 L64,9 L72,4 L80,6 L88,2 L100,4 L100,30 L0,30 Z"
                        fill="url(#hero-chart)"
                      />
                      <path
                        d="M0,24 L8,18 L16,21 L24,12 L32,15 L40,8 L48,12 L56,6 L64,9 L72,4 L80,6 L88,2 L100,4"
                        stroke="#fff"
                        strokeOpacity="0.9"
                        strokeWidth="0.7"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Floating live tag */}
              <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live ops · sample dashboard
              </div>

              {/* Bottom caption */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] text-white/60 uppercase tracking-[0.22em] font-semibold">
                    What we build · Fintech / SaaS / Mobile
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-white tracking-tight mt-1">
                    Operations dashboards your team will actually open
                  </p>
                </div>
                <a
                  href="#portfolio"
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors"
                >
                  {t.viewProject} <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Floating accent stickers */}
            <div className="hidden md:block absolute -top-6 -left-6 px-4 py-2 rounded-xl border border-white/[0.12] bg-zinc-950/80 backdrop-blur-xl shadow-xl rotate-[-4deg]">
              <p className="text-[10px] text-zinc-500 uppercase tracking-[0.22em] font-mono">
                /avg
              </p>
              <p className="text-sm text-white font-semibold mt-0.5">10-week launch</p>
            </div>
            <div className="hidden md:block absolute -bottom-5 -right-5 px-4 py-2 rounded-xl border border-blue-500/30 bg-blue-500/[0.08] backdrop-blur-xl shadow-xl rotate-[3deg]">
              <p className="text-[10px] text-blue-300 uppercase tracking-[0.22em] font-mono">
                /sla
              </p>
              <p className="text-sm text-white font-semibold mt-0.5">99.99% uptime</p>
            </div>
          </motion.div>

          {/* Awards ribbon */}
          <Reveal delay={0.4}>
            <div className="mt-20 border-t border-white/[0.06] pt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] text-zinc-500 uppercase tracking-[0.22em] font-medium">
              <span className="text-zinc-600">{t.trustedBy}</span>
              {AWARDS.map((a) => (
                <span key={a.label} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-500/60" />
                  {a.label}
                </span>
              ))}
            </div>
          </Reveal>
        </motion.div>
      </div>

      {/* Tech marquee fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 pb-5">
        <Marquee speed={45}>
          <>
            {allTech.map((tech) => (
              <span
                key={tech.name}
                className="inline-flex items-center gap-2 text-[13px] text-zinc-600 font-mono whitespace-nowrap"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: tech.color }}
                />
                {tech.name}
              </span>
            ))}
          </>
        </Marquee>
      </div>
    </section>
  );
}
