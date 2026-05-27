import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  CursorSpotlight,
  FloatingOrb,
  HeroParticles,
  KineticWords,
  MagneticButton,
  Reveal,
} from './primitives';
import { AWARDS } from '../data';
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

  return (
    <section ref={heroRef} className="relative min-h-[100svh] flex items-center overflow-hidden">
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
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-black via-white/60 dark:via-black/60 to-transparent" />
      </div>

      {/* Side rails — editorial detail */}
      <div className="hidden lg:flex absolute top-[40%] -translate-y-1/2 left-6 xl:left-10 flex-col items-start gap-3 z-10 pointer-events-none">
        <span className="font-mono text-[10px] text-zinc-600 tracking-[0.3em] uppercase rotate-90 origin-top-left translate-y-12">
          BBS-2026 / TBI · 41.71°N 44.83°E
        </span>
      </div>
      <div className="hidden lg:flex absolute top-[40%] -translate-y-1/2 right-6 xl:right-10 flex-col items-end gap-3 z-10 pointer-events-none">
        <span className="font-mono text-[10px] text-zinc-600 tracking-[0.3em] uppercase -rotate-90 origin-top-right -translate-y-12">
          {t.onMarket} · {t.uptimeBadge}
        </span>
      </div>

      <div className="relative max-w-[2000px] mx-auto px-6 md:px-16 xl:px-24 pt-10 pb-12 md:pt-20 md:pb-16 w-full">
        <motion.div style={{ y: titleY, opacity: titleOpacity }}>
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="inline-flex items-center gap-2 sm:gap-3 bg-zinc-100 dark:bg-white/[0.04] backdrop-blur-xl border border-zinc-300 dark:border-white/[0.10] rounded-full pl-2 pr-3 sm:pr-5 py-1.5 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] sm:tracking-[0.22em] mb-6 sm:mb-8 max-w-full"
          >
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 px-2 sm:px-2.5 py-1 rounded-full text-[10px] font-semibold normal-case tracking-normal whitespace-nowrap">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              {t.bookingQ}
            </span>
            <span className="text-zinc-600 dark:text-zinc-500">·</span>
            <span className="text-zinc-700 dark:text-zinc-300 whitespace-nowrap">{t.since2020}</span>
          </motion.div>

          {/* Cinematic display headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-extrabold leading-[0.98] tracking-[-0.04em] mb-6 sm:mb-8 max-w-[1300px]"
            style={{ fontSize: 'clamp(2.8rem, 8.5vw, 9rem)' }}
          >
            <span className="block text-black dark:text-white pb-2">{t.heroPrefix}</span>
            <span className="block leading-[1.1] py-2">
              <KineticWords
                words={t.heroWords as unknown as string[]}
                className="bg-gradient-to-br from-blue-500 via-cyan-400 to-violet-500 dark:from-blue-300 dark:via-cyan-200 dark:to-violet-300 bg-clip-text text-transparent"
              />
            </span>
            <span
              className="block text-zinc-500 dark:text-zinc-400 font-light tracking-tight mt-4"
              style={{ fontSize: '0.65em', lineHeight: 1.1 }}
            >
              {t.digitalProducts}
            </span>
          </motion.h1>

          {/* Split row: subtitle (left) + meta + CTAs (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10 sm:mb-12">
            <div className="lg:col-span-7">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-zinc-700 dark:text-zinc-300 text-lg md:text-2xl max-w-[40ch] leading-[1.4] font-light"
              >
                {t.heroSubtitle}
              </motion.p>
            </div>

            <div className="lg:col-span-5 flex flex-col items-start gap-5">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-col sm:flex-row items-start gap-3"
              >
                <MagneticButton
                  href="#contact"
                  className="group px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full font-semibold text-[15px] inline-flex items-center gap-2.5 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-2xl shadow-blue-500/10 active:scale-[0.97]"
                >
                  {t.heroCta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </MagneticButton>
                <a
                  href="#portfolio"
                  className="group px-8 py-4 border border-zinc-400/80 dark:border-white/[0.14] text-black dark:text-white rounded-full text-[15px] font-medium hover:border-black/30 dark:hover:border-white/30 hover:bg-zinc-100 dark:hover:bg-white/[0.04] transition-all inline-flex items-center gap-2.5"
                >
                  {t.heroExplore}
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </motion.div>
            </div>
          </div>

          {/* Awards ribbon */}
          <Reveal delay={0.4}>
            <div className="border-t border-zinc-200 dark:border-white/[0.06] pt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.22em] font-medium">
              <span>{t.trustedBy}</span>
              {AWARDS.map((a, i) => {
                const label = [t.award1, t.award2, t.award3, t.award4][i] ?? a.label;
                return (
                  <span key={a.label} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-blue-500/60" />
                    {label}
                  </span>
                );
              })}
            </div>
          </Reveal>
        </motion.div>
      </div>

    </section>
  );
}
