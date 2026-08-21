/**
 * Mobile INTERACTION, not geometry. Static measurement of a page at rest
 * cannot see the class of bug users actually report ("you open a project and
 * you cannot cancel"). Drives each flow with real taps at 390pt and asserts
 * what a person would notice: did it open, can it be dismissed by every route
 * offered, does the page behind it stay put, is anything left behind.
 */
import { chromium } from 'playwright';
import { startServer } from './serve.mjs';

const server = await startServer();
const browser = await chromium.launch();
const out = [];
const ok = (n, pass, detail = '') => {
  out.push({ n, pass, detail });
  console.log(`  ${pass ? 'ok  ' : 'FAIL'}  ${n}${detail ? '  — ' + detail : ''}`);
};

async function fresh(path = '/') {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 2,
    isMobile: true, hasTouch: true,
  });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 120)));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 120)); });
  await page.goto(`http://localhost:4599${path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  return { page, errors };
}

const scrollState = (page) => page.evaluate(() => ({
  y: window.scrollY,
  bodyOverflow: getComputedStyle(document.body).overflow,
  bodyPos: getComputedStyle(document.body).position,
}));

// ---------------------------------------------------------------- nav drawer
console.log('\n== mobile nav drawer');
{
  const { page, errors } = await fresh();
  const burger = page.locator('header button:visible').last();
  await burger.tap();
  await page.waitForTimeout(600);

  const opened = await page.evaluate(() => {
    const nav = document.querySelector('nav.fixed');
    if (!nav) return null;
    const r = nav.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height),
      fullHeight: r.height >= innerHeight - 2,
      clipped: nav.scrollHeight > nav.clientHeight + 2 };
  });
  ok('drawer opens on tap', !!opened, opened ? `${opened.w}x${opened.h}` : '');
  ok('drawer is full viewport height', !!opened && opened.fullHeight,
    opened ? `${opened.h} vs 844` : '');
  ok('drawer content is not clipped', !!opened && !opened.clipped);

  const locked = await scrollState(page);
  ok('page behind is scroll-locked', locked.bodyOverflow === 'hidden' || locked.bodyPos === 'fixed',
    `body overflow=${locked.bodyOverflow} position=${locked.bodyPos}`);

  await page.mouse.wheel(0, 600);
  await page.waitForTimeout(400);
  const after = await scrollState(page);
  ok('background does not scroll while open', after.y === locked.y, `y ${locked.y} -> ${after.y}`);

  // Tap-outside-to-close: exactly what the header-sized scrim once broke.
  const scrim = await page.evaluate(() => {
    const e = [...document.querySelectorAll('div')].find((x) =>
      getComputedStyle(x).position === 'fixed' && getComputedStyle(x).zIndex === '65');
    if (!e) return null;
    const r = e.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height), coversViewport: r.height >= innerHeight - 2 };
  });
  ok('scrim covers the whole viewport', !!scrim && scrim.coversViewport,
    scrim ? `${scrim.w}x${scrim.h} vs viewport 390x844` : 'no scrim');

  await page.mouse.click(40, 500);
  await page.waitForTimeout(700);
  const tapClosed = await page.evaluate(() => !document.querySelector('nav.fixed'));
  ok('tapping outside closes the drawer', tapClosed);

  if (!tapClosed) { await page.keyboard.press('Escape'); await page.waitForTimeout(600); }
  await burger.tap();
  await page.waitForTimeout(700);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);
  const escClosed = await page.evaluate(() => !document.querySelector('nav.fixed'));
  ok('Escape closes the drawer', escClosed);

  const restored = await scrollState(page);
  ok('scroll lock released', restored.bodyOverflow !== 'hidden' && restored.bodyPos !== 'fixed',
    `body overflow=${restored.bodyOverflow}`);
  ok('no console errors', errors.length === 0, errors[0] || '');
  await page.close();
}

// -------------------------------------------------------------- project modal
console.log('\n== project modal');
{
  const { page, errors } = await fresh();
  await page.evaluate(() => document.querySelector('#portfolio')?.scrollIntoView());
  await page.waitForTimeout(1200);

  const cards = page.locator('#portfolio button, #portfolio [role="button"]');
  const n = await cards.count();
  ok('portfolio has tappable cards', n > 0, `${n} found`);

  const beforeY = (await scrollState(page)).y;
  await cards.first().tap();
  await page.waitForTimeout(900);

  const modal = await page.evaluate(() => {
    const m = document.querySelector('[role="dialog"][aria-modal="true"]');
    if (!m) return null;
    const b = m.getBoundingClientRect();
    return { w: Math.round(b.width), h: Math.round(b.height),
      top: Math.round(b.top), z: getComputedStyle(m).zIndex };
  });
  ok('modal opens', !!modal, modal ? `${modal.w}x${modal.h} @top ${modal.top} z=${modal.z}` : '');

  const close = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')].filter((b) => {
      const cs = getComputedStyle(b); const r = b.getBoundingClientRect();
      return cs.position === 'fixed' && r.width >= 36 && r.width <= 80 && r.height >= 36;
    });
    if (!btns.length) return null;
    const r = btns[0].getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height),
      top: Math.round(r.top), right: Math.round(r.right),
      inView: r.top >= 0 && r.left >= 0 && r.bottom <= innerHeight && r.right <= innerWidth };
  });
  ok('close button exists and is on screen', !!close && close.inView,
    close ? `${close.w}x${close.h} at top ${close.top}, right ${close.right}` : 'not found');
  ok('close button meets 44px', !!close && close.w >= 44 && close.h >= 44,
    close ? `${close.w}x${close.h}` : '');

  const lockedM = await scrollState(page);
  ok('background scroll-locked', lockedM.bodyOverflow === 'hidden' || lockedM.bodyPos === 'fixed',
    `overflow=${lockedM.bodyOverflow}`);

  const scrolled = await page.evaluate(() => {
    const m = document.querySelector('[role="dialog"][aria-modal="true"]');
    if (!m) return { found: false };
    const before = m.scrollTop;
    m.scrollTop = 300;
    return { found: true, before, after: m.scrollTop, canScroll: m.scrollHeight > m.clientHeight };
  });
  ok('modal content scrolls internally', scrolled.found && (!scrolled.canScroll || scrolled.after > scrolled.before),
    scrolled.found ? `scrollTop ${scrolled.before}->${scrolled.after}` : 'no scrollable panel');

  await page.keyboard.press('Escape');
  await page.waitForTimeout(800);
  const gone = await page.evaluate(() => !document.querySelector('[role="dialog"][aria-modal="true"]'));
  ok('Escape closes the modal', gone);

  const afterY = (await scrollState(page)).y;
  ok('scroll position preserved after close', Math.abs(afterY - beforeY) < 40, `${beforeY} -> ${afterY}`);
  const rel = await scrollState(page);
  ok('scroll lock released', rel.bodyOverflow !== 'hidden' && rel.bodyPos !== 'fixed');
  ok('no console errors', errors.length === 0, errors[0] || '');
  await page.close();
}

// ------------------------------------------------------------- language menu
console.log('\n== language switcher');
{
  const { page, errors } = await fresh();
  await page.locator('header button:visible').last().tap();
  await page.waitForTimeout(800);
  const opts = await page.locator('nav.fixed button:visible').count();
  ok('drawer exposes the language chips', opts >= 10, `${opts} buttons in drawer`);

  const small = await page.evaluate(() => [...document.querySelectorAll('header button, header a, nav.fixed button, nav.fixed a')]
    .filter((e) => { const cs = getComputedStyle(e); if (cs.display === 'none') return false;
      const r = e.getBoundingClientRect(); return r.width > 0 && (r.width < 44 || r.height < 44); })
    .map((e) => `${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}"${(e.textContent||'').trim().slice(0,8)}"`));
  ok('every drawer + header control is 44px', small.length === 0, small.join(' '));
  ok('no console errors', errors.length === 0, errors[0] || '');
  await page.close();
}

// --------------------------------------------------------------- contact form
console.log('\n== contact form');
{
  const { page, errors } = await fresh();
  await page.evaluate(() => document.querySelector('#contact')?.scrollIntoView());
  await page.waitForTimeout(900);

  const fields = await page.evaluate(() => [...document.querySelectorAll('#contact input, #contact textarea, #contact select')]
    .map((e) => {
      const r = e.getBoundingClientRect(); const cs = getComputedStyle(e);
      return { tag: e.tagName, name: e.name || e.id || '',
        fs: parseFloat(cs.fontSize), h: Math.round(r.height),
        label: !!(e.labels?.length) || !!e.getAttribute('aria-label') };
    }));
  ok('form fields found', fields.length > 0, `${fields.length}`);
  const zoomy = fields.filter((f) => f.fs < 16);
  ok('no field under 16px (iOS auto-zoom)', zoomy.length === 0,
    zoomy.map((f) => `${f.name || f.tag}@${f.fs}px`).join(' '));
  const shortF = fields.filter((f) => f.h < 44);
  ok('every field at least 44 tall', shortF.length === 0,
    shortF.map((f) => `${f.name || f.tag}=${f.h}`).join(' '));
  const unlabelled = fields.filter((f) => !f.label);
  ok('every field is labelled', unlabelled.length === 0,
    unlabelled.map((f) => f.name || f.tag).join(' '));

  // Painted pixels vs the DEVICE width, never innerWidth: a page that
  // overflows widens the layout viewport, so innerWidth and scrollWidth rise
  // together and the comparison reads clean at the exact moment it should not.
  const painted = await page.evaluate((DEVICE) => {
    const found = [];
    document.querySelectorAll('body *').forEach((e) => {
      const cs = getComputedStyle(e);
      if (cs.display === 'none' || cs.visibility === 'hidden') return;
      const r = e.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      let l = r.left, right = r.right, top = r.top, bot = r.bottom;
      for (let n2 = e.parentElement; n2 && n2 !== document.documentElement; n2 = n2.parentElement) {
        const c = getComputedStyle(n2);
        if (c.overflow !== 'visible' || c.overflowX !== 'visible' || c.overflowY !== 'visible') {
          const nr = n2.getBoundingClientRect();
          l = Math.max(l, nr.left); right = Math.min(right, nr.right);
          top = Math.max(top, nr.top); bot = Math.min(bot, nr.bottom);
        }
      }
      if (right <= l || bot <= top) return;
      if (right > DEVICE + 2 || l < -2)
        found.push(`${e.tagName}.${(e.className || '').toString().slice(0, 26)}`);
    });
    return [...new Set(found)];
  }, 390);
  ok('nothing paints outside the viewport', painted.length === 0, painted.slice(0, 4).join(' '));

  const docScroll = await page.evaluate(() => ({
    s: document.documentElement.scrollWidth, w: window.innerWidth }));
  ok('no horizontal page scroll', docScroll.s <= 390 + 1, `scrollWidth ${docScroll.s}, innerWidth ${docScroll.w}, device 390`);
  ok('no console errors', errors.length === 0, errors[0] || '');
  await page.close();
}

await browser.close();
server.close();

const failed = out.filter((o) => !o.pass);
console.log(`\n${out.length - failed.length}/${out.length} checks passed`);
if (failed.length) { console.log('\nfailures:'); failed.forEach((f) => console.log(`  ${f.n}  ${f.detail}`)); process.exit(1); }
