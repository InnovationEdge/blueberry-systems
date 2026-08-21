/**
 * Keyboard and screen-reader audit. Overlays are exactly where focus handling
 * goes wrong: if focus stays on the page behind, tabbing walks invisible
 * content; if it never returns on close, the user is dumped at the top of the
 * document. Panels are identified by the role they DECLARE, never by box
 * geometry: a "first big fixed div" heuristic resolved to the scrim once and
 * reported the modal broken when the check was what was broken.
 */
import { chromium } from 'playwright';
import { startServer } from './serve.mjs';

const s = await startServer();
const browser = await chromium.launch();
const out = [];
const ok = (n, pass, detail = '') => {
  out.push({ n, pass, detail });
  console.log(`  ${pass ? 'ok  ' : 'FAIL'}  ${n}${detail ? '  — ' + detail : ''}`);
};

async function fresh(path = '/', width = 390) {
  const page = await browser.newPage({
    viewport: { width, height: 844 }, deviceScaleFactor: 2,
    isMobile: width < 900, hasTouch: width < 900,
  });
  await page.goto(`http://localhost:4599${path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2200);
  return page;
}

const active = (page) => page.evaluate(() => {
  const a = document.activeElement;
  if (!a || a === document.body) return { tag: 'BODY', label: '(none)' };
  return {
    tag: a.tagName,
    label: (a.getAttribute('aria-label') || a.textContent || '').trim().slice(0, 26),
    inNav: !!a.closest('nav.fixed'),
  };
});

console.log('\n== mobile drawer, keyboard');
{
  const page = await fresh();
  const burger = page.locator('header button:visible').last();
  await burger.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(700);

  ok('drawer opens from the keyboard', await page.evaluate(() => !!document.querySelector('nav.fixed')));

  const onOpen = await active(page);
  ok('focus moves into the drawer on open', onOpen.inNav === true,
    `focus is on ${onOpen.tag} "${onOpen.label}"`);

  const escaped = [];
  for (let i = 0; i < 26; i++) {
    await page.keyboard.press('Tab');
    const a = await active(page);
    if (!a.inNav && a.tag !== 'BODY') escaped.push(`${a.tag} "${a.label}"`);
  }
  ok('focus stays inside the drawer while open', escaped.length === 0,
    escaped.length ? `${escaped.length} escapes, e.g. ${escaped[0]}` : '');

  await page.keyboard.press('Escape');
  await page.waitForTimeout(700);
  const after = await active(page);
  ok('focus returns to the toggle on close',
    after.tag === 'BUTTON' && /menu/i.test(after.label),
    `focus is on ${after.tag} "${after.label}"`);
  await page.close();
}

console.log('\n== project modal, keyboard');
{
  const page = await fresh();
  await page.evaluate(() => document.querySelector('#portfolio')?.scrollIntoView());
  await page.waitForTimeout(1000);
  const card = page.locator('#portfolio button').first();
  await card.focus();
  // Tag the opener so "focus returned" is checked by IDENTITY. A version that
  // asserted only that some visible BUTTON had focus passed while focus had
  // never moved at all, on a different card than the one opened.
  await page.evaluate(() => document.activeElement?.setAttribute('data-opener', '1'));
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1000);

  const dialog = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"][aria-modal="true"]');
    return {
      hasRole: !!d,
      labelled: d ? !!(d.getAttribute('aria-label') || d.getAttribute('aria-labelledby')) : false,
    };
  });
  ok('modal opens with role=dialog aria-modal', dialog.hasRole);
  ok('modal has an accessible name', dialog.labelled);

  const inPanel = () => page.evaluate(() => {
    const a = document.activeElement;
    const panel = document.querySelector('[role="dialog"][aria-modal="true"]');
    return { inside: !!(panel && a && panel.contains(a)),
      tag: a ? a.tagName : 'none',
      label: a ? (a.getAttribute('aria-label') || a.textContent || '').trim().slice(0, 22) : '' };
  });
  const first = await inPanel();
  ok('focus moves into the modal on open', first.inside,
    `focus is on ${first.tag} "${first.label}"`);

  const out2 = [];
  for (let i = 0; i < 20; i++) {
    await page.keyboard.press('Tab');
    const a = await inPanel();
    if (!a.inside && a.tag !== 'BODY') out2.push(`${a.tag} "${a.label}"`);
  }
  ok('focus stays inside the modal', out2.length === 0,
    out2.length ? `${out2.length} escapes, e.g. ${out2[0]}` : '');

  await page.keyboard.press('Escape');
  await page.waitForTimeout(800);
  const back = await page.evaluate(() => ({
    isOpener: document.activeElement?.getAttribute('data-opener') === '1',
    tag: document.activeElement?.tagName ?? 'none',
  }));
  ok('focus returns to the exact card that opened it', back.isOpener, `focus is on ${back.tag}`);
  await page.close();
}

console.log('\n== document');
{
  const page = await fresh('/', 1280);
  const doc = await page.evaluate(() => {
    const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')]
      .filter((h) => h.getBoundingClientRect().width > 0)
      .map((h) => Number(h.tagName[1]));
    let jumps = 0;
    for (let i = 1; i < hs.length; i++) if (hs[i] - hs[i - 1] > 1) jumps++;
    const imgs = [...document.querySelectorAll('img')];
    return {
      h1: document.querySelectorAll('h1').length,
      headingJumps: jumps,
      firstHeading: hs[0] ?? null,
      imgsNoAlt: imgs.filter((i) => !i.hasAttribute('alt')).length,
      main: document.querySelectorAll('main').length,
      skipLink: !!document.querySelector('a[href^="#main"]'),
      lang: document.documentElement.lang,
      buttonsNoName: [...document.querySelectorAll('button')].filter((b) => {
        if (b.getBoundingClientRect().width === 0) return false;
        return !(b.textContent || '').trim() && !b.getAttribute('aria-label') && !b.getAttribute('title');
      }).length,
      linksNoName: [...document.querySelectorAll('a')].filter((a) => {
        if (a.getBoundingClientRect().width === 0) return false;
        return !(a.textContent || '').trim() && !a.getAttribute('aria-label');
      }).length,
    };
  });
  ok('exactly one h1', doc.h1 === 1, `${doc.h1} found`);
  ok('first visible heading is h1', doc.firstHeading === 1, `h${doc.firstHeading}`);
  ok('no heading level skipped', doc.headingJumps === 0, `${doc.headingJumps} jumps`);
  ok('every img has an alt attribute', doc.imgsNoAlt === 0, `${doc.imgsNoAlt} missing`);
  ok('every visible button has an accessible name', doc.buttonsNoName === 0, `${doc.buttonsNoName} unnamed`);
  ok('every visible link has an accessible name', doc.linksNoName === 0, `${doc.linksNoName} unnamed`);
  ok('has a <main> landmark', doc.main > 0);
  ok('has a skip-to-content link', doc.skipLink);
  ok('html lang is set', !!doc.lang, doc.lang);

  const ring = await page.evaluate(() => {
    const results = [];
    const els = [...document.querySelectorAll('a,button')].filter((e) => e.getBoundingClientRect().width > 0).slice(0, 6);
    for (const e of els) {
      e.focus();
      const cs = getComputedStyle(e);
      const has = (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== 'none';
      results.push({ label: (e.getAttribute('aria-label') || e.textContent || '').trim().slice(0, 18), has });
      e.blur();
    }
    return results;
  });
  const noRing = ring.filter((r) => !r.has);
  ok('focused controls show a visible ring', noRing.length === 0,
    noRing.length ? `${noRing.length}/${ring.length} without, e.g. "${noRing[0].label}"` : '');
  await page.close();
}

await browser.close();
s.close();

const failed = out.filter((o) => !o.pass);
console.log(`\n${out.length - failed.length}/${out.length} passed`);
if (failed.length) { console.log('\nfailures:'); failed.forEach((f) => console.log(`  ${f.n}${f.detail ? '  — ' + f.detail : ''}`)); process.exit(1); }
