import { Reveal, SectionEyebrow } from './primitives';
import { INDUSTRIES } from '../data';
import type { getT } from '../i18n';

/**
 * Industries-we-serve strip. Sits between Stats and Services.
 * Each entry names the real project we shipped in that sector and links
 * down to its case study in Portfolio.
 */
export function Industries({ t, onOpenProject }: { t: ReturnType<typeof getT>; onOpenProject?: (i: number) => void }) {
  const labels: Record<string, string> = {
    Social: t.indSocial,
    'Legal Tech': t.indLegal,
    Insurance: t.indInsurance,
    MarTech: t.indMartech,
    Messaging: t.indMessaging,
    Telecom: t.indTelecom,
  };
  return (
    <section className="py-16 md:py-20 relative">
      <div className="max-w-[2000px] mx-auto px-6 md:px-16 xl:px-24">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <SectionEyebrow num="·" label={t.industriesEyebrow} />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight max-w-xl text-zinc-700 dark:text-zinc-300">
                {t.industriesTitle1}{' '}
                <span className="text-black dark:text-white">{t.industriesTitleAccent}</span>{' '}
                {t.industriesTitle2}
              </h2>
            </div>
            <p className="text-xs text-zinc-600 font-mono uppercase tracking-[0.22em] max-w-xs">
              {t.industriesNote}
            </p>
          </div>
        </Reveal>

        {/* h-full twice below: the grid stretches its own children, but its
            child is the Reveal wrapper, and the anchor inside it was sizing to
            its own content. Tiles in one row measured 103 and 87 whenever a
            codename wrapped to two lines ("Georgian Insurance" does so in every
            language), so the row did not line up along the bottom. */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {INDUSTRIES.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.05} className="h-full">
              <a
                href="#portfolio"
                onClick={(e) => {
                  // The section promises "tap one for the case study": open the
                  // exact case-study modal (INDUSTRIES and PORTFOLIO are
                  // index-aligned). The href stays as the no-JS fallback.
                  if (onOpenProject) {
                    e.preventDefault();
                    onOpenProject(i);
                  }
                }}
                className="group flex h-full flex-col rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50/60 dark:bg-white/[0.01] hover:bg-zinc-100 dark:hover:bg-white/[0.04] hover:border-[color-mix(in_srgb,var(--accent)_40%,transparent)] p-4 lift active:scale-[0.98] transition-all"
                style={{ ['--accent' as string]: s.accent }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-2 h-2 rounded-full transition-[box-shadow,transform] duration-300 group-hover:shadow-[0_0_12px] group-hover:scale-125"
                    style={{ backgroundColor: s.accent, ['--tw-shadow-color' as string]: s.accent }}
                  />
                  <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-[0.16em] sm:tracking-[0.2em]">
                    {s.codename}
                  </span>
                </div>
                {/* hyphens + break-words: the tile is 131px wide and the label
                    is one word in most languages. "Telecomunicaciones" needs
                    153, "Telekommunikation" 153, "Telecomunicazioni" 140, so
                    all three painted outside the tile. English "Telecom" fits,
                    which is why the layout looked fine when it was written. */}
                <p className="text-base font-bold tracking-tight text-black dark:text-white group-hover:text-zinc-800 dark:text-zinc-200 transition-colors hyphens-auto break-words">
                  {labels[s.name] ?? s.name}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
