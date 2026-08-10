// Blueberry Systems i18n — 5 languages

interface T {
  heroSubtitle: string;
  heroCta: string;
  heroExplore: string;
  trustedBy: string;
  whatWeDo: string;
  servicesTitle: string;
  servicesDesc: string;
  techTitle: string;
  howWeWork: string;
  processTitle: string;
  selectedWork: string;
  portfolioTitle: string;
  viewProject: string;
  projectInMind: string;
  projectInMindDesc: string;
  bookCall: string;
  pricing: string;
  pricingTitle: string;
  pricingDesc: string;
  getStarted: string;
  partners: string;
  partnersTitle: string;
  joinUs: string;
  careersTitle: string;
  careersDesc: string;
  testimonials: string;
  testimonialsTitle: string;
  faqTitle: string;
  contactTitle: string;
  contactDesc: string;
  contactSend: string;
  contactSending: string;
  contactSent: string;
  contactSentDesc: string;
  contactName: string;
  contactEmail: string;
  contactCompany: string;
  contactBudget: string;
  contactMessage: string;
  contactSelectBudget: string;
  footer: string;
  onMarket: string;
  getInTouch: string;
  mostPopular: string;
  insights: string;
  blogTitle: string;
  ourTeam: string;
  teamTitle: string;
  challenge: string;
  solution: string;
  techStack: string;
  results: string;
  interestedProject: string;
  startProject: string;
  sendAnother: string;
  digitalProducts: string;
  heroPrefix: string;
  years: string;
  projects: string;
  uptime: string;
  clients: string;
  navServices: string;
  navPortfolio: string;
  navProcess: string;
  navPricing: string;
  navCareers: string;
  navFaq: string;
  navContact: string;
  placeholderName: string;
  placeholderEmail: string;
  placeholderCompany: string;
  placeholderMessage: string;
  // Pricing features
  pf1: string; pf2: string; pf3: string; pf4: string;
  pf5: string; pf6: string; pf7: string; pf8: string;
  pf9: string; pf10: string; pf11: string; pf12: string;
  // Blog
  blog1: string; blog2: string; blog3: string;
  // Team roles
  role1: string; role2: string; role3: string; role4: string; role5: string; role6: string;
  teamDesc: string;
  // Jobs
  job1: string; job2: string; job3: string; job4: string; job5: string;
  applyNow: string; applyName: string; applyEmail: string; applyPosition: string; applyResume: string; applySend: string; applySending: string; applySent: string; applySentDesc: string; applyDragDrop: string;
  heroWords: string[];
  blogTagEng: string; blogTagBiz: string; blogTagFront: string; minRead: string;
  deptEng: string; deptDesign: string; deptProduct: string; deptMarketing: string;
  typeRemote: string; typeHybrid: string; typeTbilisi: string;
  fileHint: string;
  footerRights: string; footerTerms: string; footerPrivacy: string;
  // Services
  svc1Title: string; svc1Desc: string;
  svc2Title: string; svc2Desc: string;
  svc3Title: string; svc3Desc: string;
  svc4Title: string; svc4Desc: string;
  // Process
  proc1: string; proc1Desc: string;
  proc2: string; proc2Desc: string;
  proc3: string; proc3Desc: string;
  // FAQ
  faq1Q: string; faq1A: string;
  faq2Q: string; faq2A: string;
  faq3Q: string; faq3A: string;
  faq4Q: string; faq4A: string;
  faq5Q: string; faq5A: string;
  faq6Q: string; faq6A: string;
  // Pricing
  price1Name: string; price1Desc: string;
  price2Name: string; price2Desc: string;
  price3Name: string; price3Desc: string;
  // Team role labels (real members)
  roleCEO: string;
  roleCMO: string;
  roleCFO: string;
  roleCOO: string;
  roleHeadEng: string;
  roleCLO: string;
  founderBadge: string;
  // Hero status badges
  bookingQ: string;
  since2020: string;
  uptimeBadge: string;
  // FounderNote section
  founderEyebrow: string;
  founderTitle1: string;
  founderTitleAccent1: string;
  founderTitle2: string;
  founderTitleAccent2: string;
  founderP1: string;
  founderP2: string;
  founderAvailable: string;
  founderRoleLine: string;
  founderSigLine: string;
  founderReachOut: string;
  // Industries section
  industriesEyebrow: string;
  industriesTitle1: string;
  industriesTitleAccent: string;
  industriesTitle2: string;
  industriesNote: string;
  // NowBuilding widget
  nowBuilding: string;
  nowBuildingItem1: string;
  nowBuildingItem2: string;
  // Industries sector names
  indSocial: string;
  indLegal: string;
  indInsurance: string;
  indMartech: string;
  indMessaging: string;
  indTelecom: string;
  // Pricing
  fromPrice1: string; timeline1: string;
  fromPrice2: string; timeline2: string;
  fromPrice3: string; timeline3: string;
  // Portfolio subtitle
  portfolioSubtitle: string;
  // Portfolio cards (visible in grid)
  proj1Category: string; proj1Desc: string; proj1Challenge: string; proj1Solution: string;
  proj2Category: string; proj2Desc: string; proj2Challenge: string; proj2Solution: string;
  proj3Category: string; proj3Desc: string; proj3Challenge: string; proj3Solution: string;
  proj4Category: string; proj4Desc: string; proj4Challenge: string; proj4Solution: string;
  proj5Category: string; proj5Desc: string; proj5Challenge: string; proj5Solution: string;
  proj6Category: string; proj6Desc: string; proj6Challenge: string; proj6Solution: string;
  // Testimonials
  test1Quote: string; test1Role: string;
  test2Quote: string; test2Role: string;
  test3Quote: string; test3Role: string;
  test4Quote: string; test4Role: string;
  // Contact form
  contactError: string;
  // Awards ribbon (Hero)
  award1: string;
  award2: string;
  award3: string;
  award4: string;
  // Stats strip
  gmvProcessed: string;
  // Document head (SEO — synced to <title> + meta description)
  metaTitle: string;
  metaDescription: string;
  // Service card CTA
  learnMore: string;
}

import { en } from './locales/en';

/**
 * English is bundled; the other nine are separate chunks.
 *
 * They were all imported statically, so every visitor downloaded all ten. That
 * was measured by building with the nine removed and diffing: 193kB gzip down
 * to 137kB, so the languages a given visitor will never see were 56kB, 29% of
 * the main bundle. Source size was a bad guide here, the ts files are 224kB
 * raw, because translations gzip unusually well against each other.
 *
 * English stays static on purpose. It is the fallback for an unknown label, so
 * it has to be available synchronously, and it is the only one that can be.
 */
const loaders: Record<string, () => Promise<{ default?: T } & Record<string, T>>> = {
  'ქარ': () => import('./locales/ka'),
  RU: () => import('./locales/ru'),
  DE: () => import('./locales/de'),
  ES: () => import('./locales/es'),
  FR: () => import('./locales/fr'),
  IT: () => import('./locales/it'),
  PL: () => import('./locales/pl'),
  TR: () => import('./locales/tr'),
  UK: () => import('./locales/uk'),
};

/** Chunks already resolved. A language switch back is then synchronous. */
const loaded: Record<string, T> = { EN: en };

/** True when getT(lang) can return the real translations rather than English. */
export function isLoaded(lang: string): boolean {
  return lang in loaded || !(lang in loaders);
}

/**
 * Synchronous, so components can keep calling it during render. Falls back to
 * English for a language whose chunk has not arrived yet; pair it with loadT
 * and re-render, or await loadT first. See the note in App.tsx on which of
 * those the initial load does.
 */
export function getT(lang: string): T {
  return loaded[lang] ?? en;
}

/** Fetch a language's chunk. Resolves immediately if it is already in hand. */
export async function loadT(lang: string): Promise<T> {
  if (loaded[lang]) return loaded[lang];
  const load = loaders[lang];
  if (!load) return en;
  try {
    const mod = await load();
    // Each locale file exports one named const matching its code.
    const value = (Object.values(mod).find((v) => v && typeof v === 'object') ?? en) as T;
    loaded[lang] = value;
    return value;
  } catch {
    // A failed chunk must not blank the site: English is always present.
    return en;
  }
}

export type { T };
