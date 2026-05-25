import { Reveal, SectionEyebrow } from './primitives';
import { INDUSTRIES } from '../data';

/**
 * Industries-we-serve strip. Sits between Stats and Services.
 * Premium use: sets up the codename scheme used downstream in Portfolio.
 */
export function Industries() {
  return (
    <section className="py-16 md:py-20 relative">
      <div className="max-w-[2000px] mx-auto px-6 md:px-16 xl:px-24">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <SectionEyebrow num="·" label="Industries we ship into" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight max-w-xl text-zinc-300">
                Six sectors. One playbook:{' '}
                <span className="text-white">build the part that matters,</span>{' '}
                cut the rest.
              </h2>
            </div>
            <p className="text-xs text-zinc-600 font-mono uppercase tracking-[0.22em] max-w-xs">
              Active client work shown under NDA codenames. Hover for case study.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {INDUSTRIES.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.05}>
              <a
                href="#portfolio"
                className="group block rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.04] p-4 lift transition-all"
                style={{ ['--accent' as string]: s.accent }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-2 h-2 rounded-full transition-shadow duration-300 group-hover:shadow-[0_0_12px]"
                    style={{ backgroundColor: s.accent, ['--tw-shadow-color' as string]: s.accent }}
                  />
                  <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
                    {s.codename}
                  </span>
                </div>
                <p className="text-base font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                  {s.name}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
