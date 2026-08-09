/**
 * Generate indexable Georgian and Russian home pages.
 *
 * The site is a client-rendered SPA, so `/?lang=ka` served byte-identical
 * English HTML: `<html lang="en">`, an English title and description, and a
 * canonical pointing back at `/`. hreflang and the sitemap both claimed those
 * URLs were the localized versions, but a crawler saw a duplicate of the
 * English page that explicitly asked to be ignored. The translation only
 * happened after JavaScript ran, which is too late for the snippet.
 *
 * This runs after `vite build` and stamps out `dist/ka/index.html` and
 * `dist/ru/index.html` from the built entry: same asset hashes, same schema,
 * but with the language-specific head and a self-referencing canonical. The
 * app boots into the right language off the path prefix (see getInitialLang
 * in App.tsx), so what renders matches what the crawler read.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const ORIGIN = 'https://blueberry.codes';

/** Kept in step with metaTitle / metaDescription in src/i18n.ts. */
const LOCALES = {
  ka: {
    htmlLang: 'ka',
    ogLocale: 'ka_GE',
    title: 'Blueberry Systems · პროგრამული უზრუნველყოფა თბილისში',
    desc:
      'პროგრამული უზრუნველყოფის კომპანია თბილისში. პატარა სენიორი გუნდი, რომელიც პროდაქშენ ' +
      'სისტემებს აშენებს, არა პროტოტიპებს. ექვსი პროექტი: ფინტექიდან იურიდიულ AI-მდე.',
    ogDesc:
      'პატარა სენიორი გუნდი თბილისში, რომელიც პროდაქშენ სისტემებს აშენებს, არა პროტოტიპებს. ' +
      'ექვსი პროექტი: ფინტექიდან იურიდიულ AI-მდე.',
    noscript: {
      lead: 'პროგრამული უზრუნველყოფის გუნდი თბილისში, საქართველო.',
      body:
        'პატარა სენიორი გუნდი. ვაშენებთ ვებ აპებს, მობილურ აპლიკაციებს, SaaS და AI პროდუქტებს ' +
        'ფინტექის, ჯანდაცვის, კომერციისა და განათლების სფეროებში.',
      services: [
        ['/ka/software-development/', 'პროგრამული უზრუნველყოფის შემუშავება'],
        ['/ka/product-design/', 'პროდუქტის დიზაინი'],
        ['/ka/product-marketing/', 'პროდუქტის მარკეტინგი'],
        ['/ka/business-consulting/', 'ბიზნეს კონსალტინგი'],
      ],
      contact: 'კონტაქტი:',
      jsNote: 'ამ გვერდს JavaScript სჭირდება. გთხოვთ, ჩართოთ ბრაუზერში.',
    },
  },
  ru: {
    htmlLang: 'ru',
    ogLocale: 'ru_RU',
    title: 'Blueberry Systems · Разработка ПО в Тбилиси',
    desc:
      'Компания по разработке ПО в Тбилиси. Небольшая сениорная команда, которая делает ' +
      'продакшен-системы, а не прототипы. Шесть проектов: от финтеха до юридического AI.',
    ogDesc:
      'Небольшая сениорная команда в Тбилиси, которая делает продакшен-системы, а не прототипы. ' +
      'Шесть проектов: от финтеха до юридического AI.',
    noscript: {
      lead: 'Команда разработки ПО в Тбилиси, Грузия.',
      body:
        'Небольшая сениорная команда. Создаём веб-приложения, мобильные приложения, SaaS и ' +
        'AI-продукты для финтеха, здравоохранения, коммерции и образования.',
      services: [
        ['/ru/software-development/', 'Разработка ПО'],
        ['/ru/product-design/', 'Продуктовый дизайн'],
        ['/ru/product-marketing/', 'Продуктовый маркетинг'],
        ['/ru/business-consulting/', 'Бизнес-консалтинг'],
      ],
      contact: 'Контакты:',
      jsNote: 'Для этой страницы нужен JavaScript. Включите его в браузере.',
    },
  },
};

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Replace the content="" of a meta tag matched by its name/property attribute. */
function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`meta ${attr}="${key}" not found`);
  return html.replace(re, `$1${esc(value)}$2`);
}

function buildNoscript(n) {
  const links = n.services
    .map(([href, label]) => `          <li><a href="${href}" style="color:#3b9eff">${esc(label)}</a></li>`)
    .join('\n');
  return `    <noscript>
      <div style="position:fixed;inset:0;background:#050507;color:#f5f5f5;font-family:Inter,sans-serif;padding:48px;line-height:1.6">
        <h1 style="font-size:32px;margin:0 0 16px">Blueberry Systems</h1>
        <p style="font-size:18px;margin:0 0 12px">${esc(n.lead)}</p>
        <p style="margin:0 0 24px">${esc(n.body)}</p>
        <ul style="margin:0 0 24px;padding-left:20px">
${links}
        </ul>
        <p>${esc(n.contact)} <a href="mailto:info@blueberry.codes" style="color:#3b9eff">info@blueberry.codes</a> · <a href="tel:+995598449644" style="color:#3b9eff">+995 598 449 644</a></p>
        <p style="margin-top:24px;font-size:13px;color:#a0a0a0">${esc(n.jsNote)}</p>
      </div>
    </noscript>`;
}

const entry = readFileSync(join(DIST, 'index.html'), 'utf8');

// Asset URLs are root-absolute in the Vite output, so a page one level deep
// resolves them fine. Guard rather than assume, since a relative base would
// silently break every stylesheet and script on these two pages.
const relativeAsset = /(?:src|href)="(?!https?:|\/|#|mailto:|tel:)[^"]+"/.exec(entry);
if (relativeAsset) {
  throw new Error(`entry has a relative asset URL, which breaks at /ka/: ${relativeAsset[0]}`);
}

for (const [code, L] of Object.entries(LOCALES)) {
  let html = entry;
  const self = `${ORIGIN}/${code}/`;

  html = html.replace('<html lang="en">', `<html lang="${L.htmlLang}">`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(L.title)}</title>`);

  html = setMeta(html, 'name', 'title', L.title);
  html = setMeta(html, 'name', 'description', L.desc);
  html = setMeta(html, 'property', 'og:title', L.title);
  html = setMeta(html, 'property', 'og:description', L.ogDesc);
  html = setMeta(html, 'name', 'twitter:title', L.title);
  html = setMeta(html, 'name', 'twitter:description', L.ogDesc);
  html = setMeta(html, 'property', 'og:url', self);
  html = setMeta(html, 'name', 'twitter:url', self);
  html = setMeta(html, 'property', 'og:locale', L.ogLocale);

  // Self-referencing canonical. The old behaviour pointed every locale at "/",
  // which asked Google to drop them from the index.
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${self}" />`,
  );

  // Locale-specific noscript body, so a crawler that does not run JS reads
  // this page's language rather than English.
  html = html.replace(/ {4}<noscript>[\s\S]*?<\/noscript>/, buildNoscript(L.noscript));

  mkdirSync(join(DIST, code), { recursive: true });
  writeFileSync(join(DIST, code, 'index.html'), html);
  console.log(`  dist/${code}/index.html  lang=${L.htmlLang}  canonical=${self}`);
}
console.log('prerendered locale home pages');
