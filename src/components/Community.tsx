import { Reveal, Marquee, SectionEyebrow } from './primitives';
import type { getT } from '../i18n';

export function Blog({ t }: { t: ReturnType<typeof getT> }) {
  const posts = [
    { title: t.blog1, tag: t.blogTagEng, read: '5', date: 'Mar 2026' },
    { title: t.blog2, tag: t.blogTagBiz, read: '7', date: 'Feb 2026' },
    { title: t.blog3, tag: t.blogTagFront, read: '4', date: 'Jan 2026' },
  ];

  return (
    <section className="py-24 md:py-36">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 xl:px-24">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <SectionEyebrow num="06" label={t.insights} />
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-[-0.035em]">{t.blogTitle}</h2>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <article className="lift relative h-full flex flex-col border border-zinc-200 dark:border-white/[0.06] rounded-3xl p-8 hover:border-zinc-400 dark:hover:border-white/[0.14] transition-all duration-300 group bg-zinc-50/60 dark:bg-white/[0.01] overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden
                />
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-300 mb-5">
                  {post.tag}
                </span>
                <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-blue-300 transition-colors flex-1">
                  {post.title}
                </h3>
                <div className="flex items-center justify-between text-[11px] text-zinc-600 dark:text-zinc-500 pt-4 border-t border-zinc-200 dark:border-white/[0.06] font-mono">
                  <span>{post.date}</span>
                  <span>
                    {post.read} {t.minRead}
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

export function Team({ t }: { t: ReturnType<typeof getT> }) {
  const members = [
    { name: 'Irakli Kerdikoshvili', role: t.role1, img: '/team/founder.png', founder: true },
    { name: 'Tinatin Shakeladze', role: t.role2, img: '/team/tinatin.png' },
    { name: 'Luka Giorgadze', role: t.role3, img: '/team/luka.png' },
    { name: 'Datuna Bakradze', role: t.role4, img: '/team/datuna.png' },
    { name: 'Giorgi Menteshashvili', role: t.role5, img: '/team/giorgi.png' },
    { name: 'Irakli Lomidze', role: t.role6, img: '/team/irakli-l.png' },
  ];

  return (
    <section className="py-24 md:py-36">
      <div className="max-w-[2000px] mx-auto px-6 md:px-16 xl:px-24">
        <Reveal>
          <div className="grid md:grid-cols-2 gap-10 items-end mb-14">
            <div>
              <SectionEyebrow num="07" label={t.ourTeam} />
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-[-0.035em]">{t.teamTitle}</h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg max-w-xl">{t.teamDesc}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {members.map((m, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="group text-center">
                <div className={`relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-4 border transition-all duration-300 bg-zinc-50 dark:bg-zinc-900 ${
                  m.founder
                    ? 'border-blue-500/40 shadow-lg shadow-blue-500/20 group-hover:border-blue-400/60'
                    : 'border-zinc-200 dark:border-white/[0.06] group-hover:border-blue-500/30'
                }`}>
                  <img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-700"
                  />
                  {m.founder && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-blue-500/90 backdrop-blur-sm text-[9px] font-bold uppercase tracking-[0.2em] text-black dark:text-white">
                      Founder
                    </div>
                  )}
                </div>
                <div className="min-h-[3.25rem] flex flex-col items-center justify-start">
                  <h3 className="font-semibold text-sm tracking-tight mb-1 line-clamp-1 w-full px-1">
                    {m.name}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-500 line-clamp-1 w-full px-1">
                    {m.role}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Partners({ t }: { t: ReturnType<typeof getT> }) {
  // Real partner ecosystem (wordmarks rendered as type — no fake logos)
  const partners = [
    { name: 'AWS', tier: 'Cloud Partner' },
    { name: 'Vercel', tier: 'Pro Partner' },
    { name: 'Supabase', tier: 'Solutions' },
    { name: 'Stripe', tier: 'Verified Builder' },
    { name: 'OpenAI', tier: 'API Builder' },
    { name: 'Google Cloud', tier: 'Partner' },
    { name: 'Cloudflare', tier: 'Solutions' },
    { name: 'GitHub', tier: 'Verified Org' },
    { name: 'Linear', tier: 'Apps' },
    { name: 'Figma', tier: 'Plugin Author' },
    { name: 'Sentry', tier: 'Integrations' },
    { name: 'Datadog', tier: 'Partner' },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[2000px] mx-auto px-6 md:px-16 xl:px-24 mb-10">
        <Reveal>
          <p className="text-center text-zinc-600 dark:text-zinc-500 text-[11px] uppercase tracking-[0.32em] font-medium mb-3">
            {t.partners}
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-[-0.03em] text-center max-w-3xl mx-auto">
            {t.partnersTitle}
          </h2>
        </Reveal>
      </div>

      <Marquee speed={45}>
        <>
          {partners.map((p) => (
            <div
              key={p.name}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-white/[0.015] whitespace-nowrap hover:border-zinc-500/70 dark:hover:border-white/[0.18] hover:bg-zinc-100 dark:hover:bg-white/[0.04] transition-colors"
            >
              <span className="text-[15px] md:text-base font-bold tracking-tight text-black dark:text-white">
                {p.name}
              </span>
              <span className="w-px h-4 bg-black/[0.12] dark:bg-white/[0.12]" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-500 font-mono">
                {p.tier}
              </span>
            </div>
          ))}
        </>
      </Marquee>
    </section>
  );
}
