/**
 * Geometry of the 12 static landing pages at phone width. Guards the class of
 * fault that shipped when landing.css had no width breakpoint at all: nowrap
 * rows forcing iOS to widen the layout viewport and zoom the page out, and tap
 * targets under 44px. Overflow is judged against the DEVICE width, because a
 * widened viewport makes scrollWidth and innerWidth rise together.
 */
import { chromium } from 'playwright';
import { startServer } from './serve.mjs';

const s = await startServer();
const PAGES = [
  'software-development', 'product-marketing', 'product-design', 'business-consulting',
  'ka/software-development', 'ka/product-marketing', 'ka/product-design', 'ka/business-consulting',
  'ru/software-development', 'ru/product-marketing', 'ru/product-design', 'ru/business-consulting',
];
const DEVICE = 390;
const browser = await chromium.launch();
const rows = [];

for (const slug of PAGES) {
  const page = await browser.newPage({
    viewport: { width: DEVICE, height: 844 }, deviceScaleFactor: 2,
    isMobile: true, hasTouch: true,
  });
  await page.goto(`http://localhost:4599/${slug}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);

  const r = await page.evaluate((DEVICE) => {
    const vis = (e) => {
      const cs = getComputedStyle(e);
      if (cs.display === 'none' || cs.visibility === 'hidden') return false;
      const b = e.getBoundingClientRect();
      return b.width > 0 && b.height > 0;
    };
    const small = [];
    document.querySelectorAll('a, button, input, select, textarea').forEach((e) => {
      if (!vis(e)) return;
      const b = e.getBoundingClientRect();
      if (b.width < 43.999 || b.height < 43.999) small.push(`${Math.round(b.width)}x${Math.round(b.height)} "${(e.textContent||'').trim().slice(0,14)}"`);
    });
    const wordOver = [];
    document.querySelectorAll('body *').forEach((e) => {
      if (!vis(e)) return;
      const cs = getComputedStyle(e);
      if (cs.overflow !== 'visible') return;
      const own = [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (own && e.scrollWidth > e.clientWidth + 2) wordOver.push(`${e.scrollWidth}>${e.clientWidth} "${(e.textContent||'').trim().slice(0,18)}"`);
    });
    return {
      innerWidth: window.innerWidth,
      scrollW: document.documentElement.scrollWidth,
      small: [...new Set(small)], wordOver: [...new Set(wordOver)],
      viewport: (document.querySelector('meta[name="viewport"]') || {}).content || '',
    };
  }, DEVICE);
  rows.push([slug, r]);
  await page.close();
}
await browser.close();
s.close();

let bad = 0;
console.log(['page'.padEnd(28), 'scrollW'.padEnd(12), '<44'.padEnd(6), 'wordOver'].join(''));
console.log('-'.repeat(56));
for (const [slug, r] of rows) {
  // innerWidth over DEVICE means iOS shrink-to-fit fired: the layout viewport
  // widened around content that will not fit, and everything rendered smaller.
  const wide = r.scrollW > DEVICE + 1 || r.innerWidth > DEVICE + 1;
  if (wide || r.small.length || r.wordOver.length) bad++;
  console.log([
    slug.padEnd(28),
    `${r.scrollW}/${r.innerWidth}${wide ? ' !!' : ''}`.padEnd(12),
    String(r.small.length).padEnd(6),
    String(r.wordOver.length),
  ].join(''));
  r.small.slice(0, 3).forEach((x) => console.log('     <44:', x));
  r.wordOver.slice(0, 3).forEach((x) => console.log('     over:', x));
}
console.log('\nviewport meta:', rows[0][1].viewport);
console.log(bad ? `\n${bad} of ${rows.length} pages have issues` : '\nall clean');
if (bad) process.exit(1);
