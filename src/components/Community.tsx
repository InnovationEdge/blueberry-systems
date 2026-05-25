import { Reveal, Marquee } from './primitives';
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
              <p className="text-blue-400 text-[11px] font-semibold uppercase tracking-[0.28em] mb-4 flex items-center gap-2.5">
                <span className="w-6 h-px bg-blue-400/50" /> {t.insights}
              </p>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-[-0.035em]">{t.blogTitle}</h2>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <article className="lift relative h-full flex flex-col border border-white/[0.06] rounded-3xl p-8 hover:border-white/[0.14] transition-all duration-300 group bg-white/[0.01] overflow-hidden">
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
                <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-4 border-t border-white/[0.06] font-mono">
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
    { name: 'Alex Mitchell', role: t.role1, img: '/team/member-8.png' },
    { name: 'Luka Kapanadze', role: t.role2, img: '/team/member-9.png' },
    { name: 'Nika Gelashvili', role: t.role3, img: '/team/member-10.png' },
    { name: 'Ana Javakhishvili', role: t.role4, img: '/team/member-11.png' },
    { name: 'David Bakradze', role: t.role5, img: '/team/member-12.png' },
    { name: 'James Chen', role: t.role6, img: '/team/member-13.png' },
  ];

  return (
    <section className="py-24 md:py-36">
      <div className="max-w-[2000px] mx-auto px-6 md:px-16 xl:px-24">
        <Reveal>
          <div className="grid md:grid-cols-2 gap-10 items-end mb-14">
            <div>
              <p className="text-blue-400 text-[11px] font-semibold uppercase tracking-[0.28em] mb-4 flex items-center gap-2.5">
                <span className="w-6 h-px bg-blue-400/50" /> {t.ourTeam}
              </p>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-[-0.035em]">{t.teamTitle}</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed text-lg max-w-xl">{t.teamDesc}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {members.map((m, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="group text-center">
                <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden mb-4 border border-white/[0.06] group-hover:border-blue-500/30 transition-all duration-300 bg-zinc-900">
                  <img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-700"
                  />
                </div>
                <h3 className="font-semibold text-sm tracking-tight mb-1">{m.name}</h3>
                <p className="text-xs text-zinc-500">{m.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Partners({ t }: { t: ReturnType<typeof getT> }) {
  const logos = [
    '/logos/partner-1.svg',
    '/logos/partner-2.svg',
    '/logos/partner-3.svg',
    '/logos/partner-4.svg',
    '/logos/showcase-2.svg',
    '/logos/showcase-3.svg',
    '/logos/showcase-4.svg',
    '/logos/showcase-5.svg',
    '/logos/showcase-6.svg',
    '/logos/showcase-7.svg',
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[2000px] mx-auto px-6 md:px-16 xl:px-24 mb-10">
        <Reveal>
          <p className="text-center text-zinc-500 text-[11px] uppercase tracking-[0.32em] font-medium mb-3">
            {t.partners}
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-[-0.03em] text-center max-w-3xl mx-auto">
            {t.partnersTitle}
          </h2>
        </Reveal>
      </div>

      <Marquee speed={40}>
        <>
          {logos.map((src, i) => (
            <div
              key={i}
              className="opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-12 md:h-16 w-auto max-w-[180px] object-contain invert brightness-200"
              />
            </div>
          ))}
        </>
      </Marquee>
    </section>
  );
}
