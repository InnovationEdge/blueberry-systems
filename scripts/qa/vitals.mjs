/**
 * Core Web Vitals over the compressing server, Slow 4G + 4x CPU, cache
 * disabled, median of 3. Local numbers here track production within ~300ms;
 * against a non-compressing server they read more than 2x worse and must not
 * be quoted.
 */
import { chromium } from 'playwright';
import { startServer } from './serve.mjs';

const s = await startServer();
const browser = await chromium.launch();
const med = (a) => { const x = [...a].sort((p, q) => p - q); return x[Math.floor(x.length / 2)]; };

async function one(path, reduce) {
  const p = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3,
    isMobile: true, hasTouch: true, reducedMotion: reduce ? 'reduce' : 'no-preference' });
  const cdp = await p.context().newCDPSession(p);
  await cdp.send('Network.emulateNetworkConditions', { offline: false,
    downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8, latency: 150 });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await p.goto('http://localhost:4599' + path, { waitUntil: 'load', timeout: 120000 });
  await p.waitForTimeout(3200);
  const v = await p.evaluate(() => new Promise((res) => {
    const o = { lcp: 0, fcp: 0, cls: 0 };
    const f = performance.getEntriesByName('first-contentful-paint')[0]; if (f) o.fcp = Math.round(f.startTime);
    new PerformanceObserver((l) => { for (const e of l.getEntries()) o.lcp = Math.round(e.startTime); })
      .observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) o.cls += e.value; })
      .observe({ type: 'layout-shift', buffered: true });
    setTimeout(() => { o.cls = Math.round(o.cls * 1000) / 1000; res(o); }, 400);
  }));
  await p.close(); return v;
}

let worst = 0;
for (const [path, reduce, label] of [['/', false, 'home'], ['/ka/', false, 'home /ka/'], ['/software-development/', false, 'landing']]) {
  const lcp = [], fcp = [], cls = [];
  for (let i = 0; i < 3; i++) { const v = await one(path, reduce); lcp.push(v.lcp); fcp.push(v.fcp); cls.push(v.cls); }
  const m = med(lcp), band = m < 2500 ? 'GOOD' : m < 4000 ? 'needs improvement' : 'POOR';
  if (m > worst) worst = m;
  console.log(`${label.padEnd(12)} LCP ${String(m).padStart(5)}ms [${band}]  FCP ${String(med(fcp)).padStart(5)}ms  CLS ${med(cls)}   runs ${lcp.join(', ')}`);
}
await browser.close();
s.close();
// The budget is the good band with headroom for machine noise, not perfection.
if (worst >= 2500) { console.log(`\nLCP ${worst}ms is out of the good band`); process.exit(1); }
console.log('\nall within the good band');
