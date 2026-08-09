/**
 * Generate one indexable home page per non-default locale.
 *
 * The site is a client-rendered SPA, so `/?lang=xx` served byte-identical
 * English HTML: `<html lang="en">`, an English title and description, and a
 * canonical pointing back at `/`, which explicitly asks Google to drop the URL.
 * hreflang and the sitemap both claimed those URLs were the localized versions.
 * The translation only happened after JavaScript ran, far too late for the
 * snippet.
 *
 * This runs after `vite build` and stamps out `dist/<code>/index.html` from the
 * built entry: same asset hashes, same structured data, but with the localized
 * head, a self-referencing canonical and a noscript block in that language.
 * The app boots into the right language off the path prefix (getInitialLang in
 * App.tsx), so what renders agrees with what the crawler read.
 *
 * Copy is read out of src/locales/<code>.ts rather than repeated here. One
 * source of truth: change a translation and this page follows automatically.
 *
 * Adding a locale: new file in src/locales, one line in the i18n registry, one
 * entry in LANGUAGES (src/data.ts), and one entry in LOCALES below.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const ORIGIN = 'https://blueberry.codes';
/** Bumped when the home pages materially change, so crawlers re-fetch. */
const LASTMOD = '2026-08-04';

/** Structural facts only. Everything readable comes from the locale file. */
const LOCALES = {
  ka: { htmlLang: 'ka', ogLocale: 'ka_GE', dir: 'ltr' },
  ru: { htmlLang: 'ru', ogLocale: 'ru_RU', dir: 'ltr' },
  de: { htmlLang: 'de', ogLocale: 'de_DE', dir: 'ltr' },
  fr: { htmlLang: 'fr', ogLocale: 'fr_FR', dir: 'ltr' },
  es: { htmlLang: 'es', ogLocale: 'es_ES', dir: 'ltr' },
};

/** Keys lifted out of the locale module to build the head and the noscript. */
const NEEDED = [
  'metaTitle', 'metaDescription', 'heroSubtitle', 'getInTouch',
  'svc1Title', 'svc2Title', 'svc3Title', 'svc4Title',
];

/** Service key -> URL slug, so the noscript links land on the localized page. */
const SLUGS = {
  svc1Title: 'software-development',
  svc2Title: 'product-marketing',
  svc3Title: 'product-design',
  svc4Title: 'business-consulting',
};

/**
 * Pull single-quoted string values out of a locale module.
 * Values may contain escaped apostrophes, so the pattern walks over `\'`.
 */
function readLocale(code) {
  const src = readFileSync(join(ROOT, 'src/locales', `${code}.ts`), 'utf8');
  const out = {};
  for (const key of NEEDED) {
    const m = new RegExp(`\\b${key}:\\s*'((?:[^'\\\\]|\\\\.)*)'`).exec(src);
    if (!m) throw new Error(`src/locales/${code}.ts is missing ${key}`);
    out[key] = m[1].replace(/\\'/g, "'").replace(/\\n/g, ' ');
  }
  return out;
}

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Swap the content="" of a meta tag matched on its name/property attribute. */
function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`meta ${attr}="${key}" not found in entry`);
  return html.replace(re, `$1${esc(value)}$2`);
}

function noscriptFor(code, L) {
  const links = Object.entries(SLUGS)
    .map(([key, slug]) =>
      `          <li><a href="/${code}/${slug}/" style="color:#3b9eff">${esc(L[key])}</a></li>`)
    .join('\n');
  return `    <noscript>
      <div style="position:fixed;inset:0;background:#050507;color:#f5f5f5;font-family:Inter,sans-serif;padding:48px;line-height:1.6">
        <h1 style="font-size:32px;margin:0 0 16px">Blueberry Systems</h1>
        <p style="font-size:18px;margin:0 0 12px">${esc(L.metaDescription)}</p>
        <p style="margin:0 0 24px">${esc(L.heroSubtitle)}</p>
        <ul style="margin:0 0 24px;padding-left:20px">
${links}
        </ul>
        <p>${esc(L.getInTouch)}: <a href="mailto:info@blueberry.codes" style="color:#3b9eff">info@blueberry.codes</a> · <a href="tel:+995598449644" style="color:#3b9eff">+995 598 449 644</a></p>
      </div>
    </noscript>`;
}

const entry = readFileSync(join(DIST, 'index.html'), 'utf8');

// Asset URLs must be root-absolute, otherwise they resolve one directory deep
// and every stylesheet and script on these pages breaks silently.
const relative = /(?:src|href)="(?!https?:|\/|#|mailto:|tel:|data:)[^"]+"/.exec(entry);
if (relative) throw new Error(`entry has a relative asset URL: ${relative[0]}`);

// hreflang set covering every locale plus x-default, identical on all pages.
const codes = Object.keys(LOCALES);
const hreflang = [
  `    <link rel="alternate" hreflang="en" href="${ORIGIN}/" />`,
  ...codes.map((c) => `    <link rel="alternate" hreflang="${LOCALES[c].htmlLang}" href="${ORIGIN}/${c}/" />`),
  `    <link rel="alternate" hreflang="x-default" href="${ORIGIN}/" />`,
].join('\n');
const HREFLANG_BLOCK = /^ {4}<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>(?:\n {4}<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>)*/m;
if (!HREFLANG_BLOCK.test(entry)) throw new Error('hreflang block not found in entry');

// Rewrite the English entry too, so its hreflang lists every locale.
writeFileSync(join(DIST, 'index.html'), entry.replace(HREFLANG_BLOCK, hreflang));
console.log(`  dist/index.html         hreflang updated (${codes.length + 2} annotations)`);

for (const [code, meta] of Object.entries(LOCALES)) {
  const L = readLocale(code);
  const self = `${ORIGIN}/${code}/`;
  let html = entry;

  html = html.replace(
    '<html lang="en">',
    `<html lang="${meta.htmlLang}"${meta.dir === 'rtl' ? ' dir="rtl"' : ''}>`,
  );
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(L.metaTitle)}</title>`);

  html = setMeta(html, 'name', 'title', L.metaTitle);
  html = setMeta(html, 'name', 'description', L.metaDescription);
  html = setMeta(html, 'property', 'og:title', L.metaTitle);
  html = setMeta(html, 'property', 'og:description', L.metaDescription);
  html = setMeta(html, 'name', 'twitter:title', L.metaTitle);
  html = setMeta(html, 'name', 'twitter:description', L.metaDescription);
  html = setMeta(html, 'property', 'og:url', self);
  html = setMeta(html, 'name', 'twitter:url', self);
  html = setMeta(html, 'property', 'og:locale', meta.ogLocale);

  // Self-referencing canonical. Pointing every locale at "/" is what told
  // Google to drop them from the index.
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${self}" />`);
  html = html.replace(HREFLANG_BLOCK, hreflang);
  html = html.replace(/ {4}<noscript>[\s\S]*?<\/noscript>/, noscriptFor(code, L));

  mkdirSync(join(DIST, code), { recursive: true });
  writeFileSync(join(DIST, code, 'index.html'), html);
  console.log(`  dist/${code}/index.html      lang=${meta.htmlLang}  ${L.metaTitle.slice(0, 44)}`);
}
// ---------------------------------------------------------------------------
// Sitemap: regenerate the home-page entries from the same LOCALES map.
//
// public/sitemap.xml is copied into dist untouched by Vite, so the locale rows
// were hand-maintained and drifted the moment a language was added. This
// rewrites only the root and /<code>/ entries and leaves the service landing
// pages alone, since those exist in en, ka and ru only and their hreflang is
// correct as written.
// ---------------------------------------------------------------------------
const SITEMAP = join(DIST, 'sitemap.xml');
let sitemap = readFileSync(SITEMAP, 'utf8');

const homeAlternates = [
  `      <xhtml:link rel="alternate" hreflang="en" href="${ORIGIN}/"/>`,
  ...codes.map((c) => `      <xhtml:link rel="alternate" hreflang="${LOCALES[c].htmlLang}" href="${ORIGIN}/${c}/"/>`),
  `      <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}/"/>`,
].join('\n');

// The English row carries the portfolio image entries; keep them.
const rootRow = /( {2}<url>\s*<loc>https:\/\/blueberry\.codes\/<\/loc>[\s\S]*?)( {4}<image:image>)/;
if (!rootRow.test(sitemap)) throw new Error('sitemap root entry not found');
sitemap = sitemap.replace(rootRow, (_m, head, tail) => {
  const kept = head.replace(/ {4}<xhtml:link[\s\S]*?\/>\n/g, '');
  return `${kept}${homeAlternates.replace(/^ {6}/gm, '    ')}\n${tail}`;
});

// Drop every existing locale home row, then re-emit one per locale.
sitemap = sitemap.replace(
  / {2}<url>\s*<loc>https:\/\/blueberry\.codes\/\w{2}\/<\/loc>[\s\S]*?<\/url>\n\n/g,
  '',
);
const localeRows = codes.map((c) => `  <url>
    <loc>${ORIGIN}/${c}/</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
${homeAlternates.replace(/^ {6}/gm, '    ')}
  </url>
`).join('\n');

const marker = '  <!-- English service landing pages. Separately indexable. -->';
if (!sitemap.includes(marker)) throw new Error('sitemap service marker not found');
sitemap = sitemap.replace(marker, `${localeRows}\n${marker}`);

writeFileSync(SITEMAP, sitemap);
const total = (sitemap.match(/<loc>/g) || []).length;
console.log(`  dist/sitemap.xml        ${codes.length} locale home rows, ${total} URLs total`);

console.log(`prerendered ${codes.length} locale home pages`);
