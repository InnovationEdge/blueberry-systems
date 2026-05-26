import { useTheme } from '../lib/theme';

interface LogoProps {
  className?: string;
}

/** Theme-aware BL </> brand mark + wordmark. */
export function Logo({ className }: LogoProps) {
  const theme = useTheme();
  const mark = theme === 'dark' ? '/logo-mark-white.svg' : '/logo-mark-blue.svg';
  return (
    <span className={className ?? 'inline-flex items-center gap-2.5'}>
      <img src={mark} alt="" aria-hidden className="h-9 md:h-10 w-auto" />
      <span className="text-[17px] md:text-[18px] font-extrabold tracking-[-0.02em] text-black dark:text-white">
        Blueberry
      </span>
      <span className="sr-only">Blueberry Systems</span>
    </span>
  );
}
