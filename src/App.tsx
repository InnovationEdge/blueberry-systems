import { useState, useRef, type ReactNode } from 'react';
import { motion, useInView } from 'motion/react';
import {
  ArrowRight, Code2, Palette, BarChart3, Lightbulb,
  Zap, Shield, Smartphone, Award, Users,
  ChevronDown, ExternalLink, Menu, X, Mail, MapPin, Phone
} from 'lucide-react';

function Reveal({ children, className = '' , delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }} transition={{ duration: 0.5, delay }} className={className}>
      {children}
    </motion.div>
  );
}

const NAV = ['Services', 'Portfolio', 'Process', 'Pricing', 'FAQ', 'Contact'];

const SERVICES = [
  { icon: Code2, title: 'Custom Software Development', desc: 'Mobile apps, web platforms, CRM, ERP, and internal tools built for scale.', stat1: '2x Faster Time-to-Market', stat2: '99.99% Uptime' },
  { icon: BarChart3, title: 'Product Marketing', desc: 'Data-driven strategies to acquire users and grow your business.', stat1: '48% Lower CAC', stat2: '62% User Acquisition Boost' },
  { icon: Palette, title: 'Product Design', desc: 'User-centered design that converts visitors into customers.', stat1: '80% Net Promoter Score', stat2: '2x Faster Time-to-Launch' },
  { icon: Lightbulb, title: 'Business Consulting', desc: 'Strategic guidance to optimize operations and accelerate growth.', stat1: '25% Efficiency Gains', stat2: '40% Revenue Growth' },
];

const PROCESS = [
  { step: '01', title: 'Kickoff', items: ['Comprehensive Consultation', 'Project Roadmap', 'Requirements Analysis'] },
  { step: '02', title: 'Execution', items: ['Seamless Integration', 'Real Time Collaboration', 'Iterative Development'] },
  { step: '03', title: 'Handoff', items: ['Ongoing Support', 'Documentation', 'Team Training'] },
];

const FEATURES = [
  { icon: BarChart3, title: 'Boost Your Revenue', desc: 'Data-driven strategies for measurable growth' },
  { icon: Zap, title: 'Lightning Fast Delivery', desc: 'Quick turnaround without compromising quality' },
  { icon: Shield, title: 'Bug-Less Development', desc: 'Clean, optimized, production-ready code' },
  { icon: Award, title: 'Award-Winning Design', desc: 'Industry-recognized creative excellence' },
  { icon: Smartphone, title: 'Mobile Friendly', desc: 'Cross-device responsive experiences' },
  { icon: Users, title: 'Powerful Marketing', desc: 'Reach your target audience effectively' },
];

const PORTFOLIO = [
  { title: 'Mega Motors 2025', category: 'Retail', color: 'from-blue-600 to-purple-600' },
  { title: 'Minna', category: 'E-commerce', color: 'from-emerald-600 to-teal-600' },
  { title: 'MonksTrip', category: 'Travel Booking', color: 'from-orange-500 to-red-500' },
];

const PRICING = [
  { name: 'Full Website Sprint', price: '$2,500', unit: '/Project', timeline: '2-3 weeks', features: ['Design + Development', 'Interactive Elements', 'Responsive Design', 'SEO Basics'], popular: false },
  { name: 'Full Design Package', price: '$4,500', unit: '/Project', timeline: '3-4 weeks', features: ['Logo + Brand Guidelines', 'Web Design', 'Marketing Materials', 'Source Files + Assets'], popular: true },
  { name: 'Full Stack Development', price: '$7,500', unit: '/Project', timeline: '4-6 weeks', features: ['React + TypeScript', 'Database + Backend', 'API Integration', 'Deployment + CI/CD'], popular: false },
];

const FAQS = [
  { q: 'What services do you offer?', a: 'We offer custom software development, product design, performance marketing, and business consulting. From MVPs to enterprise systems.' },
  { q: 'How does the project process work?', a: 'We follow a 3-stage process: Kickoff (consultation + roadmap), Execution (development + collaboration), and Handoff (deployment + support).' },
  { q: 'What industries do you specialize in?', a: 'We work across fintech, e-commerce, healthcare, education, and SaaS. Our sister company Blueberry Academy specializes in edtech.' },
  { q: 'How do you ensure quality?', a: 'We use code reviews, automated testing, CI/CD pipelines, and 99.99% uptime monitoring. Every project includes a QA phase.' },
  { q: 'How much do your services cost?', a: 'Projects start from $2,500 for website sprints. Full stack development starts at $7,500. We also offer monthly retainer plans.' },
  { q: 'How do I get started?', a: 'Book a free consultation through our contact form. We will discuss your needs, timeline, and budget, then provide a detailed proposal.' },
];

const TESTIMONIALS = [
  { quote: 'They delivered exceptional website and strategic insights that improved our digital presence significantly.', name: 'John Smith', role: 'CEO, Innovate Solutions' },
  { quote: 'The team understood our complex requirements and delivered a user-friendly, high-performing platform.', name: 'Emily Davis', role: 'Product Manager, Nexus Digital' },
  { quote: 'Innovative solutions that streamlined our operations. The design is functional and visually stunning.', name: 'David Lee', role: 'Founder, GreenLeaf Enterprises' },
];

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 md:px-12 h-[72px] flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tight"><span className="text-blue-500">Blueberry</span> Systems</a>
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map(item => <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-zinc-400 hover:text-white transition-colors">{item}</a>)}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-all active:scale-[0.97]">Get In Touch</a>
            <button onClick={() => setMobileOpen(v => !v)} className="lg:hidden p-2 text-zinc-400 hover:text-white">{mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
          </div>
        </div>
        {mobileOpen && (
          <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden bg-black/95 border-t border-white/5 px-5 py-4">
            {NAV.map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="block py-3 text-sm text-zinc-400 hover:text-white border-b border-white/5">{item}</a>)}
          </motion.nav>
        )}
      </header>

      <div className="h-[72px]" />

      {/* HERO */}
      <section className="relative py-24 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-20%] left-[-15%] w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-5 md:px-12 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/20 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-8">
              <Zap className="w-3.5 h-3.5" /> No. 1 Leading Digital Service Provider
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
              Your way to<br /><span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Build. Launch. Grow.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">Custom software, performance marketing, and design built to transform businesses, products, and platforms.</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#contact" className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-sm hover:bg-blue-700 transition-all active:scale-[0.97] inline-flex items-center gap-2 shadow-lg shadow-blue-600/25">Connect With Us <ArrowRight className="w-4 h-4" /></a>
              <a href="#services" className="px-8 py-4 border border-white/10 text-white rounded-full font-semibold text-sm hover:bg-white/5 transition-all inline-flex items-center gap-2">Explore Our Services</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-white/5 py-12">
        <div className="max-w-[1200px] mx-auto px-5 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{ v: '2-Month', l: 'Average MVP Delivery' }, { v: '99.9%', l: 'System Uptime' }, { v: '200+', l: 'Happy Clients' }, { v: '50+', l: 'Projects Delivered' }].map((s, i) => (
            <div key={i}><Reveal delay={i * 0.1}><p className="text-2xl md:text-3xl font-bold text-white mb-1">{s.v}</p><p className="text-xs text-zinc-500 uppercase tracking-wider">{s.l}</p></Reveal></div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-5 md:px-12">
          <Reveal><p className="text-sm text-blue-500 font-semibold uppercase tracking-wider mb-3 text-center">What We Do</p><h2 className="text-3xl md:text-4xl font-bold text-center mb-14">Building Powerful Systems</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICES.map((s, i) => { const Icon = s.icon; return (
              <div key={i}><Reveal delay={i * 0.08}>
                <div className="bg-zinc-950 border border-white/5 rounded-2xl p-7 hover:border-white/10 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center mb-5 group-hover:bg-blue-600/20 transition-colors"><Icon className="w-6 h-6 text-blue-500" /></div>
                  <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-zinc-500 mb-5 leading-relaxed">{s.desc}</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1.5 bg-blue-600/10 text-blue-400 rounded-full text-xs font-medium">{s.stat1}</span>
                    <span className="px-3 py-1.5 bg-white/5 text-zinc-400 rounded-full text-xs font-medium">{s.stat2}</span>
                  </div>
                </div>
              </Reveal></div>
            ); })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-20 md:py-28 bg-zinc-950">
        <div className="max-w-[1200px] mx-auto px-5 md:px-12">
          <Reveal><p className="text-sm text-blue-500 font-semibold uppercase tracking-wider mb-3 text-center">How We Work</p><h2 className="text-3xl md:text-4xl font-bold text-center mb-14">From Design To Launch</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROCESS.map((p, i) => (
              <div key={i}><Reveal delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600/20 mb-4">{p.step}</div>
                  <h3 className="text-xl font-bold mb-4">{p.title}</h3>
                  <ul className="space-y-3">{p.items.map((item, j) => <li key={j} className="text-sm text-zinc-500 flex items-center gap-2 justify-center"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {item}</li>)}</ul>
                </div>
              </Reveal></div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-5 md:px-12">
          <Reveal><h2 className="text-3xl md:text-4xl font-bold text-center mb-14">Unlimited Features</h2></Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => { const Icon = f.icon; return (
              <div key={i}><Reveal delay={i * 0.06}>
                <div className="border border-white/5 rounded-2xl p-6 hover:border-blue-600/30 hover:bg-blue-600/5 transition-all">
                  <Icon className="w-8 h-8 text-blue-500 mb-4" /><h3 className="font-bold mb-2">{f.title}</h3><p className="text-sm text-zinc-500">{f.desc}</p>
                </div>
              </Reveal></div>
            ); })}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-20 md:py-28 bg-zinc-950">
        <div className="max-w-[1200px] mx-auto px-5 md:px-12">
          <Reveal><p className="text-sm text-blue-500 font-semibold uppercase tracking-wider mb-3 text-center">Our Work</p><h2 className="text-3xl md:text-4xl font-bold text-center mb-14">Selected Projects</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO.map((p, i) => (
              <div key={i}><Reveal delay={i * 0.1}>
                <div className="group cursor-pointer">
                  <div className={`bg-gradient-to-br ${p.color} rounded-2xl h-[280px] mb-4 flex items-end p-6 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <span className="relative px-3 py-1 bg-black/40 rounded-full text-xs font-medium backdrop-blur-sm">{p.category}</span>
                  </div>
                  <h3 className="font-bold group-hover:text-blue-400 transition-colors">{p.title}</h3>
                </div>
              </Reveal></div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-5 md:px-12">
          <Reveal><p className="text-sm text-blue-500 font-semibold uppercase tracking-wider mb-3 text-center">Pricing</p><h2 className="text-3xl md:text-4xl font-bold text-center mb-14">Clear Services, Fair Pricing</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map((p, i) => (
              <div key={i}><Reveal delay={i * 0.1}>
                <div className={`rounded-2xl p-7 border relative ${p.popular ? 'border-blue-600 bg-blue-600/5' : 'border-white/5 bg-zinc-950'}`}>
                  {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold">Recommended</div>}
                  <h3 className="text-lg font-bold mb-1">{p.name}</h3>
                  <p className="text-xs text-zinc-500 mb-4">{p.timeline}</p>
                  <div className="mb-6"><span className="text-3xl font-bold">{p.price}</span><span className="text-sm text-zinc-500">{p.unit}</span></div>
                  <ul className="space-y-3 mb-8">{p.features.map((f, j) => <li key={j} className="text-sm text-zinc-400 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {f}</li>)}</ul>
                  <a href="#contact" className={`block text-center py-3 rounded-full text-sm font-semibold transition-all ${p.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-white/10 text-white hover:bg-white/5'}`}>Get Started</a>
                </div>
              </Reveal></div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28 bg-zinc-950">
        <div className="max-w-[1200px] mx-auto px-5 md:px-12">
          <Reveal><h2 className="text-3xl md:text-4xl font-bold text-center mb-14">What Our Clients Say</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i}><Reveal delay={i * 0.1}>
                <div className="border border-white/5 rounded-2xl p-7">
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">"{t.quote}"</p>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.role}</p>
                </div>
              </Reveal></div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28">
        <div className="max-w-[800px] mx-auto px-5 md:px-12">
          <Reveal><h2 className="text-3xl md:text-4xl font-bold text-center mb-14">Frequently Asked Questions</h2></Reveal>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i}><Reveal delay={i * 0.05}>
                <div className="border border-white/5 rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                    <span className="text-sm font-medium pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-zinc-500 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.2 }}><p className="text-sm text-zinc-500 leading-relaxed px-5 pb-5">{faq.a}</p></motion.div>}
                </div>
              </Reveal></div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 md:py-28 bg-zinc-950">
        <div className="max-w-[800px] mx-auto px-5 md:px-12 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Each Project is a Unique Opportunity</h2>
            <p className="text-zinc-500 text-base mb-10 max-w-md mx-auto">Ready to take the next step? Let's discuss your vision.</p>
            <a href="mailto:info@blueberrysystems.io" className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-sm hover:bg-blue-700 transition-all inline-flex items-center gap-2 shadow-lg shadow-blue-600/25 mb-12"><Mail className="w-4 h-4" /> info@blueberrysystems.io</a>
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-500">
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Tbilisi, Georgia</span>
              <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> +995 XXX XXX XXX</span>
              <span className="flex items-center gap-2"><ExternalLink className="w-4 h-4" /> blueberrysystems.io</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-[1200px] mx-auto px-5 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">&copy; 2026 Blueberry Systems. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-zinc-600">
            <span>Sister company: <a href="https://blueberryedu.ge" className="text-blue-500 hover:text-blue-400">Blueberry Academy</a></span>
            <a href="#" className="hover:text-zinc-400">Terms</a>
            <a href="#" className="hover:text-zinc-400">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
