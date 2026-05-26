import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, SectionEyebrow } from './primitives';
import type { getT } from '../i18n';

export function FounderNote({ t: _t }: { t: ReturnType<typeof getT> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const sigOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <section ref={ref} className="py-28 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-blue-500/[0.04] blur-[180px]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Portrait — left, 5 cols, with parallax */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <Reveal>
            <div className="relative aspect-[4/5] max-w-[460px] mx-auto lg:mx-0 rounded-3xl overflow-hidden border border-black/[0.10] dark:border-white/[0.10] shadow-2xl shadow-blue-500/10">
              <motion.img
                src="/team/founder.png"
                alt="Irakli Kerdikoshvili — Founder & CEO of Blueberry Systems"
                style={{ y: imageY }}
                className="absolute inset-0 w-full h-[112%] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Floating identity card */}
              <div className="absolute bottom-5 left-5 right-5 backdrop-blur-xl bg-black/40 border border-black/[0.12] dark:border-white/[0.12] rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold tracking-tight text-white">Irakli Kerdikoshvili</p>
                  <p className="text-[11px] text-zinc-300 mt-0.5">Founder & CEO · Tbilisi</p>
                </div>
                <a
                  href="mailto:info@blueberry.codes"
                  className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-colors"
                  aria-label="Email Irakli"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Tag */}
              <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-black/[0.15] dark:border-white/[0.15]">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span className="text-[10px] text-black dark:text-white uppercase tracking-[0.22em] font-semibold">
                  Available for calls
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Note — right, 7 cols */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <Reveal delay={0.1}>
            <SectionEyebrow num="00" label="A note from the founder" />
          </Reveal>

          <Reveal delay={0.15}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.035em] mb-8 leading-[1.05]">
              We don't ship{' '}
              <span className="text-blue-300">features.</span>
              <br />
              We ship{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                outcomes.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="space-y-5 text-zinc-300 text-lg leading-relaxed max-w-[60ch] font-light">
              <p>
                Most agencies sell you hours. We sell you the thing your hours
                were supposed to produce — a product your users open every day,
                a payment rail that doesn't drop transactions, a launch that
                ships when the market needs it, not when the invoice clears.
              </p>
              <p className="text-zinc-400">
                We're a small, senior team. We pick the projects we believe in,
                push back where it matters, and stay long enough to see them
                work in the wild. If that sounds like the partner you've been
                looking for — let's talk.
              </p>
            </div>
          </Reveal>

          {/* Signature */}
          <motion.div
            style={{ opacity: sigOpacity }}
            className="mt-10 pt-8 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between gap-6 flex-wrap"
          >
            <div>
              <p className="text-3xl md:text-4xl text-black dark:text-white tracking-tight leading-none font-semibold">
                — Irakli
              </p>
              <p className="text-[11px] text-zinc-500 mt-2 uppercase tracking-[0.24em] font-mono">
                Founder · Blueberry Systems · 2020
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 text-sm text-black dark:text-white hover:text-blue-300 transition-colors font-medium"
            >
              Reach me directly
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
