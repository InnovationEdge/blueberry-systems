import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

/** Read current theme from DOM. Source of truth = `dark` class on <html>. */
function readTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

/** Subscribe to theme changes (driven by Magic UI's AnimatedThemeToggler). */
export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>(readTheme);

  useEffect(() => {
    const update = () => setTheme(readTheme());
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  return theme;
}
