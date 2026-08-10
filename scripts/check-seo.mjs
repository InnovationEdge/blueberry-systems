/**
 * Fail the build on the SEO defects that keep reaching production.
 *
 * Every rule here exists because the exact fault it catches shipped live and
 * was found by hand afterwards. Nothing in vite build, tsc or eslint looks at
 * the emitted HTML, and the twelve service landing pages under public/ are
 * copied verbatim, so the toolchain treats them as opaque bytes.
 *
 * Runs over dist/ after the prerender step, so it checks what visitors and
 * crawlers actually receive rather than what the source intends.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const ORIGIN = 'https://blueberry.codes';

/** What Google renders before cutting. Not hard limits, but past them the tail is wasted. */
const TITLE_MAX = 60;
const DESC_MAX = 160;
/** Bump alongside the ?v= in index.html so a stale page cannot pass. */
const FAVICON_VERSION = 6;

const problems = [];
const fail = (file, msg) => problems.push(`${file}: ${msg}`);

/** Rendered length: entities decode to one character, and &amp; is four bytes of noise. */
const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');

const attr = (html, re) => {
  const m = re.exec(html);
  return m ? m[1] : null;
};

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

const pages = walk(DIST).sort();
if (pages.length === 0) throw new Error('no HTML in dist, did the build run?');

for (const p of pages) {
  const file = relative(DIST, p);
  const html = readFileSync(p, 'utf8');

  // The 404 page is intentionally not indexable and has no canonical.
  const is404 = file === '404.html';

  // 1. A leaked shell escape put "From \$4,500" in the body and the snippet of
  //    four English pages. It survived for months because it reads as a price.
  if (/\\\$/.test(html)) fail(file, 'stray backslash before a dollar sign');

  // 2 + 3. Every one of the twelve landing pages was over the render limit and
  //    ending mid-sentence in results.
  const title = attr(html, /<title>([\s\S]*?)<\/title>/);
  if (!title) fail(file, 'no <title>');
  else if (decode(title).length > TITLE_MAX)
    fail(file, `title ${decode(title).length} chars, over ${TITLE_MAX}`);

  const desc = attr(html, /<meta name="description" content="([^"]*)"/);
  if (!desc) fail(file, 'no meta description');
  else if (decode(desc).length > DESC_MAX)
    fail(file, `description ${decode(desc).length} chars, over ${DESC_MAX}`);

  // 4. The social card is what gets pasted into Slack and LinkedIn. A missing
  //    tag falls back to whatever the scraper guesses, usually the raw URL.
  //    Deliberately shorter og copy is fine, cards have less room than a SERP,
  //    so this checks presence rather than an exact match with <title>.
  if (!is404) {
    for (const [label, re] of [
      ['og:title', /<meta property="og:title" content="([^"]+)"/],
      ['og:description', /<meta property="og:description" content="([^"]+)"/],
      ['og:image', /<meta property="og:image" content="([^"]+)"/],
      ['twitter:title', /<meta name="twitter:title" content="([^"]+)"/],
    ]) {
      if (!re.test(html)) fail(file, `missing or empty ${label}`);
    }
  }

  if (!is404) {
    // 5. Every localized page pointed its canonical at "/", which asks Google to
    //    drop the page. A canonical must name the page it sits on.
    const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
    if (!canonical) fail(file, 'no canonical');
    else {
      const expected = `${ORIGIN}/${file.replace(/index\.html$/, '')}`;
      if (canonical !== expected) fail(file, `canonical ${canonical}, expected ${expected}`);
    }

    // 6. hreflang pointed at ?lang= URLs that served English and were canonicalled
    //    away, so every annotation referenced a page Google was told to ignore.
    if (/hreflang="[^"]*"[^>]*href="[^"]*\?lang=/.test(html))
      fail(file, 'hreflang points at a ?lang= URL');
    if (canonical && canonical.includes('?lang='))
      fail(file, 'canonical points at a ?lang= URL');

    // 7. A page that declares alternates has to list itself, or the set is
    //    one-directional and Google discards it.
    const alts = [...html.matchAll(/<link rel="alternate" hreflang="[^"]*" href="([^"]*)"/g)]
      .map((m) => m[1]);
    if (alts.length && canonical && !alts.includes(canonical))
      fail(file, 'hreflang set does not include this page');
  }

  // 8. The landing pages sat three favicon versions behind and never referenced
  //    favicon.ico, which is the file the SERP crawler asks for.
  if (!is404) {
    if (!/favicon\.ico\?v=/.test(html)) fail(file, 'does not reference favicon.ico');
    else {
      const v = Number(attr(html, /favicon\.ico\?v=(\d+)/));
      if (v !== FAVICON_VERSION)
        fail(file, `favicon ?v=${v}, expected ${FAVICON_VERSION}`);
    }
  }

  // 9. JSON-LD that does not parse is invisible to Google and silent in review.
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  blocks.forEach((m, i) => {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      fail(file, `JSON-LD block ${i + 1} does not parse: ${e.message}`);
    }
  });

  // 10. /de/ served <html lang="de"> beside schema claiming the page was English.
  const htmlLang = attr(html, /<html lang="([\w-]+)"/);
  const dirLang = file.includes('/') ? file.split('/')[0] : 'en';
  const expectLang = /^[a-z]{2}$/.test(dirLang) ? dirLang : 'en';
  if (htmlLang && htmlLang !== expectLang)
    fail(file, `html lang="${htmlLang}" but the page lives under /${expectLang === 'en' ? '' : expectLang}`);

  for (const m of html.matchAll(/"@type": "WebPage",[\s\S]{0,600}?"inLanguage": "([\w-]+)"/g)) {
    if (m[1] !== expectLang)
      fail(file, `WebPage.inLanguage "${m[1]}" but html lang is "${expectLang}"`);
  }

  // 11. Without width=device-width a phone renders at ~980px and scales down,
  //     so every word arrives too small to read. Google treats it as not
  //     mobile-friendly, which is a ranking factor on mobile results.
  const viewport = attr(html, /<meta name="viewport" content="([^"]*)"/);
  if (!viewport) fail(file, 'no viewport meta');
  else {
    if (!/width=device-width/.test(viewport))
      fail(file, `viewport lacks width=device-width: "${viewport}"`);

    // Blocking pinch zoom fails WCAG 1.4.4 and strands anyone who needs to
    // magnify. Nothing here has ever needed to lock the scale.
    if (/user-scalable\s*=\s*(no|0)/.test(viewport))
      fail(file, 'viewport disables pinch zoom (user-scalable=no)');
    const maxScale = /maximum-scale\s*=\s*([\d.]+)/.exec(viewport);
    if (maxScale && Number(maxScale[1]) < 2)
      fail(file, `viewport caps zoom at ${maxScale[1]}x, under the 2x floor`);

    // env(safe-area-inset-*) evaluates to 0 without this, silently, so the
    // padding written against it does nothing at all. landing.css carries
    // safe-area rules, so a page that drops the flag disarms them.
    if (!is404 && !/viewport-fit=cover/.test(viewport))
      fail(file, 'viewport lacks viewport-fit=cover, so safe-area insets read 0');
  }

  // 12. Locale roots are real paths (/ka/, /ru/). ?lang= still resolves in the
  //     SPA, so these links worked and stayed broken-looking-fine for months:
  //     they need JS to boot before redirecting, and a crawler reads them as
  //     links to "/", the English canonical. The BreadcrumbList JSON-LD had the
  //     same URLs, which told Google the parent of a Georgian page was English.
  if (/\?lang=/.test(html)) {
    const n = (html.match(/\?lang=/g) || []).length;
    fail(file, `${n} ?lang= URL(s); locale roots are paths now (/ka/, /ru/)`);
  }
}

/**
 * vercel.json decides what every URL on the site resolves to, and it is not
 * part of the build, so nothing else here would notice it being wrong. This
 * repo has form: a malformed rewrite in it silently blocked every deploy for
 * twelve days, and the symptom was simply that changes stopped appearing.
 */
{
  const raw = readFileSync(join(ROOT, 'vercel.json'), 'utf8');
  let cfg;
  try {
    cfg = JSON.parse(raw);
  } catch (e) {
    fail('vercel.json', `is not valid JSON: ${e.message}`);
  }

  if (cfg) {
    /**
     * Vercel validates this file strictly and errors the whole deploy on an
     * unknown top-level key. Learned the hard way: a "_comment_rewrites" key
     * added to explain the config failed the build, and because a failed
     * deploy just leaves the previous one serving, the only symptom was that
     * production quietly stopped changing. JSON has no comments; the notes
     * live in this file instead.
     */
    const ALLOWED = new Set([
      '$schema', 'buildCommand', 'cleanUrls', 'crons', 'devCommand', 'framework',
      'functions', 'git', 'headers', 'ignoreCommand', 'images', 'installCommand',
      'outputDirectory', 'public', 'redirects', 'regions', 'rewrites', 'trailingSlash',
    ]);
    for (const key of Object.keys(cfg)) {
      if (!ALLOWED.has(key)) fail('vercel.json', `unknown top-level key "${key}"; Vercel rejects the whole file`);
    }

    const rewrites = cfg.rewrites ?? [];

    // A catch-all sending everything to index.html turns every typo into a
    // 200 that serves the home page, which is a soft 404 and exactly what
    // this project spent a round removing from the locale pages.
    const catchAll = rewrites.find(
      (r) => r.destination === '/index.html' && /^\/\(\(\?!/.test(r.source ?? ''),
    );
    if (catchAll) fail('vercel.json', 'has a catch-all rewrite to /index.html, which makes unknown URLs soft 404s');

    // Every rewrite must point at a file the build actually emitted, or the
    // route 404s while looking perfectly reasonable in the config.
    for (const r of rewrites) {
      if (typeof r.destination !== 'string' || !r.destination.startsWith('/')) continue;
      const target = join(DIST, r.destination);
      if (!existsSync(target)) fail('vercel.json', `rewrite ${r.source} -> ${r.destination}, which is not in the build`);
    }

    // Every prerendered locale root needs its rewrite, with and without the
    // trailing slash, since both forms get linked and shared.
    for (const code of readdirSync(DIST).filter((d) => /^[a-z]{2}$/.test(d))) {
      for (const form of [`/${code}`, `/${code}/`]) {
        if (!rewrites.some((r) => r.source === form)) fail('vercel.json', `no rewrite for ${form}`);
      }
    }
  }
}

console.log(`  checked ${pages.length} pages`);
if (problems.length) {
  console.error(`\nSEO check failed, ${problems.length} problem(s):\n`);
  for (const p of problems) console.error(`  ${p}`);
  console.error('');
  process.exit(1);
}
console.log('  SEO check passed');
