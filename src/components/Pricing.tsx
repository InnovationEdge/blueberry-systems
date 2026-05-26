import { CheckCircle, Quote } from 'lucide-react';
import { Reveal, MagneticButton, SectionEyebrow } from './primitives';
import { TESTIMONIALS, AVATAR_COLORS } from '../data';
import type { getT } from '../i18n';

export function MiniCta({ t }: { t: ReturnType<typeof getT> }) {
  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/[0.06] via-transparent to-violet-600/[0.06]" />
      </div>
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="border border-black/[0.06] dark:border-white/[0.06] rounded-3xl p-10 md:p-14 bg-black/[0.01] dark:bg-white/[0.01] backdrop-blur-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight">{t.projectInMind}</h3>
            <p className="text-zinc-400 text-base mt-3 max-w-md">{t.projectInMindDesc}</p>
          </div>
          <MagneticButton
            href="#contact"
            className="px-8 py-4 bg-white text-black rounded-full font-semibold text-[15px] inline-flex items-center gap-2.5 hover:bg-zinc-200 transition-all shrink-0"
          >
            {t.bookCall}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

export function Pricing({ t }: { t: ReturnType<typeof getT> }) {
  const PRICING = [
    {
      name: t.price1Name,
      desc: t.price1Desc,
      from: 'from $4.5k',
      timeline: '2–6 weeks',
      features: [t.pf1, t.pf2, t.pf3, t.pf4],
      popular: false,
    },
    {
      name: t.price2Name,
      desc: t.price2Desc,
      from: 'from $15k',
      timeline: '8–14 weeks',
      features: [t.pf5, t.pf6, t.pf7, t.pf8],
      popular: true,
    },
    {
      name: t.price3Name,
      desc: t.price3Desc,
      from: 'Custom',
      timeline: 'Ongoing',
      features: [t.pf9, t.pf10, t.pf11, t.pf12],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <Reveal>
          <div className="text-center mb-16">
            <SectionEyebrow num="04" label={t.pricing} center />
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-[-0.035em]">{t.pricingTitle}</h2>
            <p className="text-zinc-500 mt-5 max-w-lg mx-auto leading-relaxed">{t.pricingDesc}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PRICING.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <article
                className={`relative h-full flex flex-col p-8 md:p-10 rounded-3xl border transition-all duration-300 lift ${
                  p.popular
                    ? 'border-blue-500/40 bg-gradient-to-b from-blue-600/[0.10] via-blue-600/[0.04] to-transparent glow-blue-strong'
                    : 'border-black/[0.06] dark:border-white/[0.06] bg-black/[0.015] dark:bg-white/[0.015] hover:border-black/[0.14] dark:hover:border-white/[0.14]'
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-black dark:text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase">
                    {t.mostPopular}
                  </div>
                )}

                <div className="mb-7">
                  <h3 className="text-xl font-bold mb-2 tracking-tight">{p.name}</h3>
                  <p className="text-sm text-zinc-500">{p.desc}</p>
                </div>

                <div className="mb-7 pb-7 border-b border-black/[0.06] dark:border-white/[0.06]">
                  <p className={`text-4xl font-extrabold tracking-tight ${p.popular ? 'text-black dark:text-white' : 'text-zinc-800 dark:text-zinc-200'}`}>
                    {p.from}
                  </p>
                  <p className="text-xs text-zinc-500 mt-2 font-mono">{p.timeline}</p>
                </div>

                <ul className="space-y-3.5 mb-10 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="text-sm text-zinc-300 flex items-start gap-3">
                      <CheckCircle
                        className={`w-4 h-4 mt-0.5 shrink-0 ${p.popular ? 'text-blue-400' : 'text-zinc-500'}`}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <MagneticButton
                  href="#contact"
                  className={`block text-center py-3.5 rounded-full text-sm font-semibold transition-all ${
                    p.popular
                      ? 'bg-white text-black hover:bg-zinc-200'
                      : 'border border-white/15 text-black dark:text-white hover:bg-black/[0.06] dark:hover:bg-white/[0.06]'
                  }`}
                >
                  {t.getStarted}
                </MagneticButton>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials({ t }: { t: ReturnType<typeof getT> }) {
  return (
    <section className="py-24 md:py-36 bg-white dark:bg-black">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 xl:px-24">
        <Reveal>
          <SectionEyebrow num="05" label={t.testimonials} center />
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-[-0.035em] text-center mb-16">
            {t.testimonialsTitle}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TESTIMONIALS.map((r, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <article className="relative border border-black/[0.06] dark:border-white/[0.06] rounded-3xl p-8 md:p-10 h-full flex flex-col hover:border-black/[0.14] dark:hover:border-white/[0.14] transition-colors glow-border bg-black/[0.01] dark:bg-white/[0.01]">
                <Quote className="w-10 h-10 text-blue-500/30 mb-5" />
                <p className="text-lg md:text-xl text-zinc-800 dark:text-zinc-200 leading-relaxed flex-1 mb-8 font-light">
                  &ldquo;{r.quote}&rdquo;
                </p>

                <div className="flex items-center justify-between gap-4 pt-6 border-t border-black/[0.06] dark:border-white/[0.06]">
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className={`w-11 h-11 rounded-full bg-gradient-to-br ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center text-xs font-bold text-black dark:text-white shrink-0`}
                    >
                      {r.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate">{r.name}</p>
                      <p className="text-xs text-zinc-500 truncate">
                        {r.role} · {r.company}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-300 font-mono whitespace-nowrap">
                    {r.metric}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
