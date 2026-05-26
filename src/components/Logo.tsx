import { useTheme } from '../lib/theme';

interface LogoProps {
  className?: string;
}

/** Theme-aware Blueberry wordmark. Auto-swaps between white and blue variants. */
export function Logo({ className = 'h-20 md:h-24 w-auto -my-5' }: LogoProps) {
  const theme = useTheme();
  const src = theme === 'dark' ? '/logo-brand-white.svg' : '/logo-brand-blue.svg';
  return <img src={src} alt="Blueberry Systems" className={className} />;
}
