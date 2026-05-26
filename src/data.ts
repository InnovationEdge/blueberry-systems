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
};

export const PORTFOLIO: Project[] = [
  {
    title: 'Project Atlas',
    initials: 'AT',
    category: 'Fintech · Payments Infrastructure',
    year: '2025',
    desc: 'Cross-border payment rails processing $400M+ in annualized volume with real-time fraud scoring and 7-currency support.',
    accent: '#3b82f6',
    hero: 'linear-gradient(135deg, #0a1f3d 0%, #062052 35%, #1e3a8a 100%)',
    metrics: [
      { value: '$400M+', label: 'Annualized GMV' },
      { value: '99.99%', label: 'Uptime SLA' },
      { value: '0.01%', label: 'Fraud rate' },
      { value: '120ms', label: 'p99 latency' },
    ],
    challenge: 'Replace a brittle legacy gateway and process high-volume cross-border payments under strict regulatory constraints with zero-downtime cutover.',
    solution: 'Event-driven microservices on AWS with multi-region failover, ML-based fraud scoring, and a custom ledger with cryptographic audit trails. Migrated $90M of in-flight payments without a single failed transaction.',
    stack: ['Go', 'React', 'PostgreSQL', 'Kafka', 'AWS', 'Terraform', 'Stripe Connect'],
    results: ['$400M+ annualized GMV', '99.99% uptime', '0.01% fraud rate', '7-currency support'],
    client: 'Series B fintech · EU + MENA · Under NDA',
  },
  {
    title: 'Project Forum',
    initials: 'FM',
    category: 'Commerce · Multi-Vendor SaaS',
    year: '2024',
    desc: 'Enterprise marketplace platform powering 500+ sellers, 15K monthly orders, with real-time inventory sync across 6 fulfillment centers.',
    accent: '#10b981',
    hero: 'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #047857 100%)',
    metrics: [
      { value: '500+', label: 'Active sellers' },
      { value: '15K', label: 'Monthly orders' },
      { value: '40%', label: 'Faster fulfillment' },
      { value: '4.8★', label: 'Seller rating' },
    ],
    challenge: 'Unify three legacy commerce stacks under one multi-tenant platform with real-time inventory across distributed fulfillment.',
    solution: 'Next.js headless storefront, WebSocket inventory bus, automated 3PL routing, and AI-assisted SKU mapping. Cut catalog onboarding from 6 weeks to 3 days.',
    stack: ['Next.js 15', 'TypeScript', 'Supabase', 'Vercel', 'Stripe', 'Shippo'],
    results: ['500+ active sellers', '15K monthly orders', '40% lower fulfillment time', '4.8 app store rating'],
    client: 'D2C aggregator · US + UK · Under NDA',
  },
  {
    title: 'Project Meridian',
    initials: 'MD',
    category: 'Healthcare · Patient Platform',
    year: '2025',
    desc: 'HIPAA-grade telemedicine and patient management system serving 200+ daily consultations across 18 clinics.',
    accent: '#06b6d4',
    hero: 'linear-gradient(135deg, #042f3a 0%, #155e75 50%, #0891b2 100%)',
    metrics: [
      { value: '4.8★', label: 'Patient rating' },
      { value: '60%', label: 'Fewer no-shows' },
      { value: 'HIPAA', label: 'Compliant' },
      { value: '200+', label: 'Daily consults' },
    ],
    challenge: 'Digitize 18 clinics under one HIPAA-grade platform with telemedicine, automated scheduling, and audit-ready records.',
    solution: 'End-to-end encrypted video over WebRTC, role-based EHR, SMS/email reminder cadence, and an FHIR-compatible records vault. Rolled out across 18 clinics in 11 weeks.',
    stack: ['React', 'Python (FastAPI)', 'PostgreSQL', 'WebRTC', 'Docker', 'AWS GovCloud'],
    results: ['3.2 to 4.8 user rating', '60% fewer no-shows', 'HIPAA compliant', '200+ daily consultations'],
    client: 'Regional clinic network · EU · Under NDA',
  },
  {
    title: 'Project Compass',
    initials: 'CP',
    category: 'Logistics · Fleet Operations',
    year: '2024',
    desc: 'Real-time fleet management and route optimization across 200+ vehicles, 3 countries, with predictive ETA and 30% fuel savings.',
    accent: '#8b5cf6',
    hero: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #7c3aed 100%)',
    metrics: [
      { value: '30%', label: 'Fuel saved' },
      { value: '200+', label: 'Vehicles' },
      { value: '3', label: 'Countries' },
      { value: '25%', label: 'Faster deliveries' },
    ],
    challenge: 'Replace a paper-and-spreadsheet dispatch operation with a real-time fleet ops platform covering 200+ vehicles across 3 countries.',
    solution: 'Proprietary routing engine with traffic + weather inputs, real-time GPS ingestion at 1Hz, predictive ETAs from historical telemetry, and driver-facing PWA.',
    stack: ['React', 'Go', 'PostgreSQL', 'PostGIS', 'Google Maps API', 'Docker'],
    results: ['30% fuel savings', '200+ vehicles tracked', '3 countries', '25% faster deliveries'],
    client: 'Regional 3PL operator · Under NDA',
  },
  {
    title: 'Project Beacon',
    initials: 'BC',
    category: 'EdTech · Live Learning',
    year: '2025',
    desc: 'Interactive learning platform with live cohorts, AI tutoring, and gamified progression for 10K+ active learners.',
    accent: '#f59e0b',
    hero: 'linear-gradient(135deg, #451a03 0%, #92400e 50%, #d97706 100%)',
    metrics: [
      { value: '10K+', label: 'Active learners' },
      { value: '85%', label: 'Completion' },
      { value: '4.9★', label: 'CSAT' },
      { value: 'AI', label: 'Personalization' },
    ],
    challenge: 'Convert a slow legacy LMS into a live-first learning platform with personalized paths and measurable outcomes.',
    solution: 'Realtime classroom on WebRTC, an XP-based progression system, and Gemini-powered content recommender with content-safety filters.',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'OpenAI', 'Google Gemini', 'Vercel'],
    results: ['10K+ active learners', '85% completion rate', '4.9 satisfaction score', 'AI personalization'],
    client: 'Adult-learning EdTech · Under NDA',
  },
  {
    title: 'Project Vault',
    initials: 'VT',
    category: 'DeFi · Portfolio Analytics',
    year: '2024',
    desc: 'Multi-chain DeFi analytics suite tracking $50M+ in AUM across 20+ protocols with automated yield strategy execution.',
    accent: '#ec4899',
    hero: 'linear-gradient(135deg, #500724 0%, #831843 50%, #be185d 100%)',
    metrics: [
      { value: '$50M+', label: 'Assets tracked' },
      { value: '20+', label: 'Protocols' },
      { value: 'Live', label: 'Indexing' },
      { value: '+15%', label: 'Yield uplift' },
    ],
    challenge: 'Aggregate trustworthy real-time portfolio data across fragmented DeFi protocols and execute yield strategies safely.',
    solution: 'Multi-chain indexer with WebSocket price feeds, risk-scored strategy router, and a simulation sandbox for one-click execution. Audited by Trail of Bits.',
    stack: ['React', 'Node.js', 'Python', 'Redis', 'Web3.js', 'The Graph'],
    results: ['$50M+ tracked assets', '20+ DeFi protocols', 'Real-time analytics', '15% avg yield improvement'],
    client: 'DeFi power-users + funds · Under NDA',
  },
];

/* ─── Industries we serve (sector badges for hero/footer strip) ─── */
export const INDUSTRIES = [
  { name: 'Fintech', accent: '#3b82f6', codename: 'Atlas' },
  { name: 'Commerce', accent: '#10b981', codename: 'Forum' },
  { name: 'Healthcare', accent: '#06b6d4', codename: 'Meridian' },
  { name: 'Logistics', accent: '#8b5cf6', codename: 'Compass' },
  { name: 'EdTech', accent: '#f59e0b', codename: 'Beacon' },
  { name: 'DeFi', accent: '#ec4899', codename: 'Vault' },
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
export const LANGUAGES = ['EN', 'ქარ'] as const;

/* ─── Awards ribbon ─── */
export const AWARDS = [
  { label: 'Awwwards · Site of the Day', short: 'SOTD' },
  { label: 'CSS Design Awards · Best UI', short: 'CSSDA' },
  { label: 'Featured · Vercel Showcase', short: 'Vercel' },
  { label: 'Top 1% · Clutch Global', short: 'Clutch' },
];
