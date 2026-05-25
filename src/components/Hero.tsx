import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { CursorSpotlight, FloatingOrb, HeroParticles, KineticWords, MagneticButton, Marquee, Reveal } from './primitives';
import { AWARDS, TECH_GROUPS } from '../data';
import type { getT } from '../i18n';

export function Hero({ t }: { t: ReturnType<typeof getT> }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const allTech = TECH_GROUPS.flatMap((g) => g.items);

  return (
    <section ref={heroRef} className="relative min-h-[100svh] flex items-center overflow-hidden">
      <CursorSpotlight color="rgba(59,130,246,0.15)" />

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid bg-grid-fade" />
        <HeroParticles />
        <FloatingOrb className="absolute top-[8%] right-[8%] w-[640px] h-[640px] bg-blue-500/[0.10] rounded-full blur-[150px]" />
        <FloatingOrb className="absolute bottom-[12%] left-[4%] w-[520px] h-[520px] bg-violet-600/[0.08] rounded-full blur-[140px]" />
        <FloatingOrb className="absolute top-[42%] left-[38%] w-[320px] h-[320px] bg-cyan-500/[0.05] rounded-full blur-[110px]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent" />
      </div>

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative max-w-[2000px] mx-auto px-6 md:px-16 xl:px-24 pt-28 pb-20 md:pt-32 md:pb-0 w-full"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="inline-flex items-center gap-3 bg-white/[0.03] backdrop-blur-sm border border-white/[0.10] rounded-full pl-2 pr-5 py-1.5 text-[11px] font-medium text-zinc-300 uppercase tracking-[0.22em] mb-10"
        >
          <span className="inline-flex items-center gap-1.5 bg-emerald-500/15 text-emerald-300 px-2.5 py-1 rounded-full text-[10px] font-semibold normal-case tracking-normal">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            Now booking
          </span>
          <span className="text-zinc-500">·</span>
          <span>{t.onMarket}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-[3.2rem] sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7.5rem] font-extrabold leading-[0.9] tracking-[-0.045em] mb-8 max-w-[1100px]"
        >
          <span className="block text-white">{t.heroPrefix}</span>
          <KineticWords
            words={t.heroWords as unknown as string[]}
            className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent"
          />
          <span className="block font-serif italic text-zinc-400 font-normal text-[0.78em] mt-1 tracking-tight">
            {t.digitalProducts}
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-zinc-400 text-lg md:text-xl max-w-[42ch] mb-10 leading-relaxed"
        >
          {t.heroSubtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-start gap-3 mb-16"
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

        {/* Awards ribbon */}
        <Reveal delay={0.9}>
          <div className="border-t border-white/[0.06] pt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] text-zinc-500 uppercase tracking-[0.22em] font-medium">
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

      {/* Tech marquee at bottom */}
      <div className="absolute bottom-0 left-0 right-0 pb-6">
        <Marquee speed={45}>
          <>
            {allTech.map((tech) => (
              <span key={tech.name} className="inline-flex items-center gap-2 text-[13px] text-zinc-600 font-mono whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tech.color }} />
                {tech.name}
              </span>
            ))}
          </>
        </Marquee>
      </div>
    </section>
  );
}
