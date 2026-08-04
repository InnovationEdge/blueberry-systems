/* ─── Portfolio (weighty, premium-positioned) ─── */
export type Project = {
  title: string;
  initials: string;
  category: string;
  year: string;
  desc: string;
  accent: string;
  hero: string;
  metrics: { value: string; label: string }[];
  challenge: string;
  solution: string;
  stack: string[];
  results: string[];
  client?: string;
  featured?: boolean;
  /**
   * Real product screenshot, served from /work. Omit it and the card falls
   * back to the abstract CSS mockup, so a project without a usable capture
   * still renders. `shotKind` picks the device frame drawn around it.
   */
  shot?: string;
  shotKind?: 'phone' | 'browser';
  shotAlt?: string;
  /**
   * Marks shown on the card, served from /work/logos. A single string is the
   * product's own mark; an array renders one tile per entry, left to right,
   * for engagements where the client and the platform both belong on the card.
   * Omitted where we have no rights-cleared asset.
   */
  logo?: string | string[];
};

export const PORTFOLIO: Project[] = [
  {
    title: 'Vybe',
    initials: 'VB',
    category: 'Social · Short-Form Video',
    year: '2026',
    desc: 'A short-form video network built from scratch: vertical feed, live streaming with gifting, direct messaging, stories and a coin wallet. iOS, Android and four web dashboards on one API.',
    accent: '#3b82f6',
    hero: 'linear-gradient(135deg, #0a1f3d 0%, #062052 35%, #1e3a8a 100%)',
    metrics: [
      { value: '431', label: 'API endpoints' },
      { value: '133', label: 'Mobile screens' },
      { value: '113', label: 'Database models' },
      { value: '5.5K', label: 'Tests written' },
    ],
    challenge: 'Match what a billion-user video app does, with a team that fits in one room. Vertical feed, live streaming, messaging, payments and moderation all have to feel instant, and all of them have to run off a single backend that four separate web dashboards also read from.',
    solution: 'One NestJS API with 48 modules and four WebSocket gateways: live streaming, messaging, notifications and presence. Redis and BullMQ absorb the write bursts so gift animations and message delivery stay under a frame. The mobile app is Expo Router with 133 routes; the web viewer, ads manager, creator studio and admin console are separate Next.js apps against the same endpoints, so a rule fixed once is fixed everywhere.',
    stack: ['React Native', 'Expo SDK 54', 'NestJS 11', 'PostgreSQL', 'Prisma', 'Redis + BullMQ', 'Socket.IO'],
    results: [
      '48 backend modules, 431 endpoints',
      'Live streaming with gifts, polls and co-hosts',
      'Four languages: English, Georgian, Russian, Spanish',
      '5,582 tests across mobile, backend and web',
    ],
    client: 'iOS and Android via EAS · four Next.js dashboards',
    shot: '/work/vybe.png',
    shotKind: 'phone',
    shotAlt: 'Vybe For You feed running on iPhone, with the live tab, engagement rail and bottom navigation',
    logo: '/work/logos/vybe.png',
  },
  {
    title: 'KnowHow AI',
    initials: 'KH',
    category: 'Legal Tech · Retrieval AI',
    year: '2026',
    desc: 'A legal assistant that answers from Georgian legislation and Supreme Court case law, then drafts the document. Web plus native iOS and Android.',
    accent: '#8b5cf6',
    hero: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #7c3aed 100%)',
    metrics: [
      { value: '50+', label: 'RAG modules' },
      { value: '3', label: 'Jurisdictions' },
      { value: '26', label: 'Data models' },
      { value: '541', label: 'Backend tests' },
    ],
    challenge: 'A general chatbot will confidently invent a statute that does not exist, which is worse than no answer at all when a lawyer is relying on it. The system had to ground every claim in a real source, in Georgian, across a corpus nobody had indexed before.',
    solution: 'Custom scrapers for matsne.gov.ge and the Supreme Court feed a pgvector index. Retrieval is hybrid BM25 plus vectors with a cross-encoder reranker, Georgian-aware query expansion, precedent linking and a validation pass that checks the answer against what was actually retrieved. EUR-Lex and US Congress fetchers extend the same pipeline past Georgian law. Documents are generated and edited in-app, with comments and share-by-token.',
    stack: ['Django', 'React 18', 'PostgreSQL + pgvector', 'LangChain', 'Gemini', 'OpenAI', 'Capacitor 8'],
    results: [
      'Hybrid retrieval with reranking and answer validation',
      'Contract generator and court-form filler',
      'Google Drive and Gmail connectors, credentials encrypted',
      'Cloud Run in europe-west3, native iOS and Android',
    ],
    client: 'Live at knowhow.ge · web, iOS and Android',
    shot: '/work/knowhow.png',
    shotKind: 'browser',
    shotAlt: 'KnowHow AI landing page, Legal Explained, with Google sign-in',
    logo: '/work/logos/knowhow.svg',
  },
  {
    title: 'Georgian Insurance',
    initials: 'GI',
    category: 'Insurance · Online Sales',
    year: '2026',
    desc: 'Travel and student medical insurance sold end to end online. Quote, pay by card, and the policy PDF lands in the inbox before the tab closes.',
    accent: '#10b981',
    hero: 'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #047857 100%)',
    metrics: [
      { value: '13', label: 'Languages' },
      { value: '2', label: 'Insurer APIs' },
      { value: '28', label: 'Migrations' },
      { value: '142', label: 'Tests' },
    ],
    challenge: 'Insurance in Georgia is still sold over the phone. Moving it online means the payment, the insurer registration and the policy document all have to succeed together, and a customer who was charged but never registered is the one failure the system cannot have.',
    solution: 'Card payment runs through Flitt with callback and return handlers on separate paths, so a lost browser tab never loses a paid order. Student medical registers against the Unison health API through a job queue with atomic claiming and a nightly retry cron, which turns a flaky third-party call into a job that finishes rather than an order that silently dies. Policy PDFs are generated in-process and emailed via Resend. Thirteen locales, three of them right-to-left.',
    stack: ['Next.js 16', 'React 19', 'Supabase', 'next-intl', 'Tailwind 4', 'pdf-lib', 'Resend'],
    results: [
      'Flitt card payments, callback and return separated',
      'Unison health API with atomic job claiming and retry',
      '13 locales including Arabic, Farsi and Hebrew',
      'Admin panel with resend, retry and order detail',
    ],
    client: 'Live at georgianinsurance.ge',
    shot: '/work/insurance.png',
    shotKind: 'browser',
    shotAlt: 'Georgian Insurance quote form with departure and return dates and traveller count',
    logo: '/work/logos/insurance.png',
  },
  {
    title: 'Reach',
    initials: 'RC',
    category: 'MarTech · Messaging and Ads',
    year: '2026',
    desc: 'One place to run SMS, Viber, WhatsApp and email campaigns and buy ads on Meta, Google and TikTok, with a prepaid wallet and per-campaign cost tracking.',
    accent: '#f59e0b',
    hero: 'linear-gradient(135deg, #451a03 0%, #92400e 50%, #d97706 100%)',
    metrics: [
      { value: '4', label: 'Message channels' },
      { value: '3', label: 'Ad platforms' },
      { value: '53', label: 'API routes' },
      { value: '939', label: 'Tests' },
    ],
    challenge: 'Marketing teams run four messaging tools and three ad dashboards, then rebuild the same spend report by hand every month. Consolidating them means every channel has its own rate limit, its own delivery webhook and its own idea of what a failure is.',
    solution: 'Per-channel rate buckets with retry and opt-out handling, and delivery-status webhooks from Infobip and Meta reconciled into one message ledger. Ads connect over OAuth per platform, with draft, publish, pause and budget changes plus insight sync jobs. A prepaid wallet with Flitt top-up and a transaction ledger means spend is knowable before a campaign runs, not after. Multi-tenant from the first migration: organizations, memberships, invites and role guards.',
    stack: ['Next.js 16', 'React 19', 'Supabase', 'Infobip', 'Meta API', 'Recharts', 'Flitt'],
    results: [
      'SMS, Viber, WhatsApp and email in one dispatcher',
      'Meta, Google and TikTok ads with insight sync',
      'Prepaid wallet with ledger and top-up',
      '30 tables, 939 tests including a container-backed suite',
    ],
    client: 'B2B SaaS · Georgian, English and Russian',
    logo: '/work/logos/reach.svg',
    shot: '/work/reach.png',
    shotKind: 'browser',
    shotAlt: 'Reach landing page in Georgian, showing SMS, WhatsApp and Viber campaign messaging with Meta, Google and TikTok ad accounts',
  },
  {
    title: 'Direct',
    initials: 'DR',
    category: 'Messaging · End-to-End Encryption',
    year: '2026',
    desc: 'A private messenger whose encryption core is a Rust MLS implementation of RFC 9420, with voice and video calls, disappearing messages and biometric app lock.',
    accent: '#06b6d4',
    hero: 'linear-gradient(135deg, #042f3a 0%, #155e75 50%, #0891b2 100%)',
    metrics: [
      { value: 'RFC 9420', label: 'MLS encryption' },
      { value: '111', label: 'API endpoints' },
      { value: '50+', label: 'App screens' },
      { value: '1.8K', label: 'Tests' },
    ],
    challenge: 'End-to-end encryption is easy to claim and hard to earn. Rolling your own protocol is how messengers get broken, so the requirement was a real standard, implemented in a language where a memory bug cannot leak a key, and reachable from a Flutter UI without hand-written FFI on every call.',
    solution: 'The crypto core is a Rust crate on OpenMLS, the reference implementation of RFC 9420, bridged into Dart with flutter_rust_bridge so the key schedule never touches garbage-collected memory. Prekeys, identity and device management are separate backend modules. Calls run on LiveKit, real-time messaging on Socket.IO with a Redis adapter and NATS. Disappearing messages, chat lock and biometric app lock ship as first-class modules, not settings toggles.',
    stack: ['Flutter 3.27', 'Rust + OpenMLS', 'NestJS 11', 'Fastify', 'PostgreSQL', 'LiveKit', 'NATS'],
    results: [
      'RFC 9420 MLS via OpenMLS, bridged to Dart',
      'LiveKit voice and video, voice messages with waveforms',
      'Disappearing messages, chat lock, biometric app lock',
      '1,825 tests including golden visual regression',
    ],
    client: 'Flutter app · Android bundle and iOS build in CI',
    logo: '/work/logos/direct.png',
    shot: '/work/direct.png',
    shotKind: 'phone',
    shotAlt: 'Direct chat list on mobile, with pinned conversations, unread badges and status ring',
  },
  {
    title: 'Telecom Observability',
    initials: 'TO',
    category: 'Telecom · Observability',
    year: '2026',
    desc: 'Datadog buildout for a telecom operator: one dashboard covering a mobile app and a website, with SLA burn-rate alerting and a product-analytics pipeline out of GA4.',
    accent: '#ec4899',
    hero: 'linear-gradient(135deg, #500724 0%, #831843 50%, #be185d 100%)',
    metrics: [
      { value: '9', label: 'SLA SLOs' },
      { value: '6', label: 'Synthetic checks' },
      { value: '3', label: 'GA4 properties' },
      { value: '2', label: 'Platforms tracked' },
    ],
    challenge: 'Engineering and the business were reading different numbers. Infrastructure dashboards said the platform was healthy while nobody could answer whether payments were actually completing, and monthly active users lived in GA4 where no alert could ever reach them.',
    solution: 'A single dashboard with two lenses, IT operations and digital performance, over two separate platforms: the mobile app and the website. Nine SLOs with burn-rate alerting, a composite outage monitor, six synthetics covering uptime, TLS expiry and app-store availability, and per-flow success tiles for payments and billing. A dependency-free Python pipeline pushes three GA4 properties into Datadog so product KPIs alert alongside infrastructure. The whole buildout is reproducible from a script with no secrets in the repo.',
    stack: ['Datadog', 'Python', 'GA4 Data API', 'Firebase', 'Synthetics', 'SLOs', 'Terraform-style scripts'],
    results: [
      'Nine SLA SLOs with burn-rate alerting',
      'Composite outage monitor across both platforms',
      'GA4 to Datadog pipeline for three properties',
      'Reproducible from one script, no secrets committed',
    ],
    client: 'Silknet · Datadog buildout',
    logo: ['/work/logos/silknet.png', '/work/logos/datadog.png'],
  },
];

/* ─── Industries we serve (sector badges for hero/footer strip) ─── */
// One entry per PORTFOLIO project, in the same order, so the accent colour
// and the name under each sector match the case study the card links to.
export const INDUSTRIES = [
  { name: 'Social', accent: '#3b82f6', codename: 'Vybe' },
  { name: 'Legal Tech', accent: '#8b5cf6', codename: 'KnowHow AI' },
  { name: 'Insurance', accent: '#10b981', codename: 'Georgian Insurance' },
  { name: 'MarTech', accent: '#f59e0b', codename: 'Reach' },
  { name: 'Messaging', accent: '#06b6d4', codename: 'Direct' },
  { name: 'Telecom', accent: '#ec4899', codename: 'Observability' },
] as const;

/* ─── Testimonials ─── */
export const AVATAR_COLORS = [
  'from-blue-500 to-cyan-400',
  'from-violet-500 to-pink-400',
  'from-emerald-500 to-teal-400',
  'from-amber-500 to-orange-400',
];

export const TESTIMONIALS = [
  {
    quote: 'They shipped our entire fintech rail in 14 weeks. We were the first cohort on the new platform and we have not had a single production incident since launch. The closest thing I have to in-house senior engineers.',
    name: 'M. Chen',
    role: 'CTO at a Series B fintech',
    company: 'Under NDA',
    metric: '14-week launch',
  },
  {
    quote: 'Working with Blueberry felt like hiring a senior product team. They pushed back where it mattered, simplified scope where they could, and the MVP just worked on day one.',
    name: 'S. Bergman',
    role: 'Founder, commerce SaaS',
    company: 'YC alum',
    metric: '6-week MVP',
  },
  {
    quote: 'They redesigned our entire patient portal and rolled it out across 18 clinics in three months. Patient satisfaction jumped from 3.2 to 4.8 stars. The ROI conversation was over before it started.',
    name: 'Dr. J. Park',
    role: 'Director of Digital, healthcare network',
    company: 'EU · 18 clinics',
    metric: '4.8★ CSAT',
  },
  {
    quote: 'Professional, fast, zero theatrics. They understand startup constraints and ship enterprise quality within budgets that other agencies wouldn\'t even take meetings on.',
    name: 'A. Kowalski',
    role: 'CEO, regional 3PL',
    company: 'Logistics',
    metric: '30% fuel saved',
  },
];

/* ─── Tech stack with category grouping ─── */
export const TECH_GROUPS = [
  {
    label: 'Frontend',
    items: [
      { name: 'React', color: '#61DAFB' },
      { name: 'Next.js', color: '#ffffff' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'Tailwind', color: '#06b6d4' },
      { name: 'Vue', color: '#4FC08D' },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'Node.js', color: '#339933' },
      { name: 'NestJS', color: '#E0234E' },
      { name: 'Python', color: '#3776AB' },
      { name: 'Go', color: '#00ADD8' },
      { name: 'Rust', color: '#dea584' },
    ],
  },
  {
    label: 'Data',
    items: [
      { name: 'PostgreSQL', color: '#4169E1' },
      { name: 'Redis', color: '#DC382D' },
      { name: 'Supabase', color: '#3ECF8E' },
      { name: 'Prisma', color: '#5A67D8' },
      { name: 'ClickHouse', color: '#FFCC01' },
    ],
  },
  {
    label: 'Mobile',
    items: [
      { name: 'React Native', color: '#61DAFB' },
      { name: 'Expo', color: '#ffffff' },
      { name: 'Swift', color: '#F05138' },
      { name: 'Kotlin', color: '#7F52FF' },
      { name: 'Flutter', color: '#02569B' },
    ],
  },
  {
    label: 'Cloud',
    items: [
      { name: 'AWS', color: '#FF9900' },
      { name: 'Vercel', color: '#ffffff' },
      { name: 'GCP', color: '#4285F4' },
      { name: 'Docker', color: '#2496ED' },
      { name: 'Kubernetes', color: '#326CE5' },
    ],
  },
  {
    label: 'AI / ML',
    items: [
      { name: 'OpenAI', color: '#10A37F' },
      { name: 'Gemini', color: '#4285F4' },
      { name: 'LangChain', color: '#1c3c3c' },
      { name: 'pgvector', color: '#4169E1' },
      { name: 'Modal', color: '#7c3aed' },
    ],
  },
];

/* ─── Languages ─── */
export const LANGUAGES = ['EN', 'ქარ', 'RU'] as const;

/* ─── Awards ribbon ─── */
export const AWARDS = [
  { label: 'Awwwards · Site of the Day', short: 'SOTD' },
  { label: 'CSS Design Awards · Best UI', short: 'CSSDA' },
  { label: 'Featured · Vercel Showcase', short: 'Vercel' },
  { label: 'Top 1% · Clutch Global', short: 'Clutch' },
];
