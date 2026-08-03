import type { Project } from '../data';

/**
 * Real product imagery for a portfolio card.
 *
 * Each shot is presented in the device frame it actually ships in: a phone
 * body for the mobile apps, macOS-style browser chrome for the web products.
 * The frame is drawn in CSS rather than baked into the image so it stays
 * crisp at any density and re-themes with the rest of the site.
 *
 * The screenshot is deliberately allowed to run past the bottom edge of the
 * card. Cropping it there reads as a window onto a larger product, which is
 * what a case-study thumbnail should imply, and it keeps the device large
 * enough that the UI inside is legible at card size.
 */

type Props = Pick<Project, 'shot' | 'shotKind' | 'shotAlt' | 'hero'>;

/* Wraps the shot in a phone body: thick bezel, dynamic island, rounded corners. */
function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[11%] w-[38%] min-w-[124px] max-w-[190px]">
      <div className="relative rounded-[15%/7.5%] bg-[#0b0b0f] p-[3.2%] shadow-[0_28px_70px_-12px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.10)]">
        {/* Dynamic island */}
        <div
          className="absolute top-[2.4%] left-1/2 -translate-x-1/2 h-[1.35%] min-h-[7px] w-[30%] rounded-full bg-black z-10"
          aria-hidden
        />
        <picture>
          <source type="image/webp" srcSet={src.replace('.png', '.webp')} />
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            width="560"
            height="1217"
            className="block w-full rounded-[13%/6.4%] bg-black"
          />
        </picture>
      </div>
    </div>
  );
}

/* Wraps the shot in macOS-style browser chrome. */
function BrowserFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-x-[7%] top-[13%]">
      <div className="rounded-t-xl overflow-hidden shadow-[0_28px_70px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.10)]">
        {/* Chrome bar */}
        <div className="flex items-center gap-1.5 px-3 h-7 bg-[#1b1b20] border-b border-white/[0.07]">
          <span className="w-2 h-2 rounded-full bg-white/25" />
          <span className="w-2 h-2 rounded-full bg-white/[0.16]" />
          <span className="w-2 h-2 rounded-full bg-white/[0.11]" />
          <span className="ml-2 flex-1 h-2.5 max-w-[55%] rounded-full bg-white/[0.07]" />
        </div>
        <picture>
          <source type="image/webp" srcSet={src.replace('.png', '.webp')} />
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            width="1400"
            height="875"
            className="block w-full"
          />
        </picture>
      </div>
    </div>
  );
}

export function WorkShot({ shot, shotKind, shotAlt, hero }: Props) {
  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-t-3xl"
      style={{ background: hero }}
    >
      {/* Grid texture, faded toward the bottom so it never fights the device */}
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at top, black, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse at top, black, transparent 78%)',
        }}
        aria-hidden
      />

      {/* Soft light pooled behind the device, so it reads as lit rather than pasted on */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-[6%] w-[78%] h-[62%] rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.5), transparent 70%)' }}
        aria-hidden
      />

      {shotKind === 'phone' ? (
        <PhoneFrame src={shot} alt={shotAlt} />
      ) : (
        <BrowserFrame src={shot} alt={shotAlt} />
      )}

      {/* Bottom scrim, so the cropped device edge dissolves instead of cutting */}
      <div
        className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-black/45 to-transparent"
        aria-hidden
      />
    </div>
  );
}
