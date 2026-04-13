import { useState, useRef, useEffect, type ReactNode } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import {
  ArrowRight, Code2, Palette, BarChart3, Lightbulb,
  Zap, Shield, Smartphone, Award, Users,
  ChevronDown, ExternalLink, Menu, X, Mail, MapPin, Phone,
  ArrowUpRight, CheckCircle
} from 'lucide-react';
// Contact form uses Web3Forms API (free, no backend needed)

/* ─── Animated Components ─── */

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 40, filter: 'blur(10px)' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SlideIn({ children, className = '', delay = 0, direction = 'left' }: { children: ReactNode; className?: string; delay?: number; direction?: 'left' | 'right' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const x = direction === 'left' ? -60 : 60;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScaleIn({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FloatingOrb({ className }: { className: string }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -20, 0], x: [0, 10, 0], scale: [1, 1.05, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function AnimatedCounter({ value, suffix = '' }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(value.replace(/[^0-9]/g, ''));
    if (isNaN(num)) { setDisplay(value); return; }
    const duration = 2000;
    const steps = 60;
    const inc = num / steps;
    let cur = 0;
    const timer = setInterval(() => {
      cur += inc;
      if (cur >= num) { setDisplay(value); clearInterval(timer); }
      else setDisplay(String(Math.floor(cur)));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

function MagneticButton({ children, className = '', href }: { children: ReactNode; className?: string; href: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  return (
    <motion.a
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.15);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.15);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

/* ─── Data ─── */

const NAV = ['Services', 'Portfolio', 'Process', 'Pricing', 'FAQ', 'Contact'];

const SERVICES = [
  { num: '01', title: 'Custom Software Development', desc: 'Mobile apps, web platforms, CRM, ERP, and internal tools engineered for scale and performance.', stat1: '2x Faster Time-to-Market', stat2: '99.99% Uptime' },
  { num: '02', title: 'Product Marketing', desc: 'Data-driven acquisition strategies that lower costs and accelerate user growth.', stat1: '48% Lower CAC', stat2: '62% User Acquisition Boost' },
  { num: '03', title: 'Product Design', desc: 'Human-centered interfaces that convert visitors into loyal customers.', stat1: '80% Net Promoter Score', stat2: '2x Faster Time-to-Launch' },
  { num: '04', title: 'Business Consulting', desc: 'Strategic guidance to optimize operations and unlock new revenue streams.', stat1: '25% Efficiency Gains', stat2: '40% Revenue Growth' },
];

const PROCESS = [
  { step: '01', title: 'Kickoff', desc: 'Deep-dive consultation, requirements analysis, and a clear project roadmap.' },
  { step: '02', title: 'Execution', desc: 'Agile sprints with real-time collaboration and iterative development.' },
  { step: '03', title: 'Handoff', desc: 'Production deployment, documentation, training, and ongoing support.' },
];

const FEATURES = [
  { title: 'Revenue Growth', desc: 'Data-driven strategies for measurable business impact' },
  { title: 'Lightning Delivery', desc: 'Rapid turnaround without quality compromise' },
  { title: 'Bulletproof Code', desc: 'Clean, tested, production-grade engineering' },
  { title: 'Design Excellence', desc: 'Award-winning creative and UX standards' },
  { title: 'Cross-Platform', desc: 'Seamless experiences on every device' },
  { title: 'Growth Marketing', desc: 'Targeted campaigns that convert at scale' },
];

const PORTFOLIO = [
  { title: 'Mega Motors 2025', category: 'Automotive Retail', year: '2025', color: 'from-blue-600 via-blue-700 to-indigo-800' },
  { title: 'Minna', category: 'E-commerce Fashion', year: '2025', color: 'from-emerald-500 via-emerald-600 to-teal-700' },
  { title: 'MonksTrip', category: 'Travel Platform', year: '2025', color: 'from-orange-500 via-red-500 to-rose-600' },
];

const PRICING = [
  { name: 'Website Sprint', price: '$2,500', timeline: '2-3 weeks', features: ['Custom Design + Development', 'Interactive Animations', 'Responsive & SEO Ready', 'CMS Integration'], popular: false },
  { name: 'Full Design Package', price: '$4,500', timeline: '3-4 weeks', features: ['Logo + Brand Identity', 'Web & Mobile Design', 'Marketing Collateral', 'Source Files & Guidelines'], popular: true },
  { name: 'Full Stack Product', price: '$7,500', timeline: '4-6 weeks', features: ['React + TypeScript Frontend', 'Backend + Database', 'API & 3rd-Party Integration', 'CI/CD + Deployment'], popular: false },
];

const FAQS = [
  { q: 'What services do you offer?', a: 'Custom software development, product design, performance marketing, and business consulting. We handle everything from MVPs to enterprise-grade systems.' },
  { q: 'How does your process work?', a: 'Three stages: Kickoff (deep-dive consultation and roadmap), Execution (agile development with real-time collaboration), and Handoff (deployment, documentation, and support).' },
  { q: 'What industries do you work with?', a: 'Fintech, e-commerce, healthcare, education, SaaS, and more. Our sister company Blueberry Academy focuses on edtech products.' },
  { q: 'How do you ensure quality?', a: 'Code reviews, automated testing, CI/CD pipelines, and 99.99% uptime monitoring. Every deliverable goes through rigorous QA before handoff.' },
  { q: 'What does pricing look like?', a: 'Website sprints from $2,500, full design packages from $4,500, and full-stack products from $7,500. Custom enterprise quotes available.' },
  { q: 'How do we get started?', a: 'Book a free consultation. We discuss your vision, timeline, and budget, then deliver a detailed proposal within 48 hours.' },
];

const TESTIMONIALS = [
  { quote: 'Blueberry Systems delivered an exceptional platform that transformed our digital presence. Their technical expertise is world-class.', name: 'John Smith', role: 'CEO, Innovate Solutions', avatar: 'JS' },
  { quote: 'They understood our complex requirements from day one and delivered a high-performing product ahead of schedule.', name: 'Emily Davis', role: 'Product Manager, Nexus Digital', avatar: 'ED' },
  { quote: 'The combination of design and engineering excellence is rare. Blueberry Systems has both in abundance.', name: 'David Lee', role: 'Founder, GreenLeaf', avatar: 'DL' },
];

/* ─── Contact Form ─── */

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', budget: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const res = await fetch('https://formsubmit.co/ajax/ikerdikoshv@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: `Blueberry Systems - New Inquiry from ${form.name}`,
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim() || 'N/A',
          budget: form.budget || 'Not specified',
          message: form.message.trim(),
          _template: 'table',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        throw new Error('Failed');
      }
    } catch {
      const subject = encodeURIComponent(`Project Inquiry from ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nBudget: ${form.budget}\n\nMessage:\n${form.message}`);
      window.location.href = `mailto:ikerdikoshv@gmail.com?subject=${subject}&body=${body}`;
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="border border-blue-500/20 bg-blue-600/[0.03] rounded-3xl p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-blue-400" />
        </div>
        <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
        <p className="text-sm text-zinc-500">We will get back to you within 24 hours.</p>
        <button onClick={() => { setSent(false); setForm({ name: '', email: '', company: '', message: '', budget: '' }); }} className="mt-6 text-sm text-blue-400 hover:text-blue-300 transition-colors">
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-white/[0.06] bg-zinc-950/80 rounded-3xl p-8 md:p-10 space-y-5">
      {error && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">Name</label>
          <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Smith"
            className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.06] rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/10 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">Email</label>
          <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@company.com"
            className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.06] rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/10 transition-all" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">Company</label>
          <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Your Company"
            className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.06] rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/10 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">Budget</label>
          <select value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}
            className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.06] rounded-xl text-sm text-white appearance-none focus:outline-none focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/10 transition-all">
            <option value="" className="bg-zinc-900">Select budget</option>
            <option value="$2,500 - $5,000" className="bg-zinc-900">$2,500 - $5,000</option>
            <option value="$5,000 - $10,000" className="bg-zinc-900">$5,000 - $10,000</option>
            <option value="$10,000 - $25,000" className="bg-zinc-900">$10,000 - $25,000</option>
            <option value="$25,000+" className="bg-zinc-900">$25,000+</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">Message</label>
        <textarea required rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project..."
          className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.06] rounded-xl text-sm text-white placeholder-zinc-600 resize-none focus:outline-none focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/10 transition-all" />
      </div>
      <motion.button
        type="submit"
        disabled={sending}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 bg-white text-black rounded-xl font-semibold text-sm hover:bg-zinc-100 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {sending ? <><div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Sending...</> : <>Send Message <ArrowRight className="w-4 h-4" /></>}
      </motion.button>
    </form>
  );
}

/* ─── App ─── */

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* ═══ HEADER ═══ */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-2xl border-b border-white/[0.04]"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-[80px] flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tight group">
            <img src="/logo-white.svg" alt="Blueberry Systems" className="h-12 md:h-14 w-auto" />
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[13px] text-zinc-500 hover:text-white transition-colors uppercase tracking-widest font-medium">{item}</a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <MagneticButton href="#contact" className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-sm font-semibold hover:bg-zinc-100 transition-all active:scale-[0.95]">
              Get In Touch <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
            <button onClick={() => setMobileOpen(v => !v)} className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="fixed inset-0 bg-black/60 z-40 lg:hidden" />
              <motion.nav
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="fixed top-[80px] right-0 bottom-0 w-[80%] max-w-sm bg-zinc-950 z-50 lg:hidden px-6 py-8"
              >
                {NAV.map((item, i) => (
                  <motion.a
                    key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="block py-4 text-lg text-zinc-400 hover:text-white border-b border-white/5 transition-colors"
                  >{item}</motion.a>
                ))}
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      <div className="h-[80px]" />

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <FloatingOrb className="absolute top-[10%] right-[15%] w-[500px] h-[500px] bg-blue-600/[0.07] rounded-full blur-[120px]" />
          <FloatingOrb className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-purple-600/[0.05] rounded-full blur-[100px]" />
          <FloatingOrb className="absolute top-[50%] left-[50%] w-[300px] h-[300px] bg-cyan-500/[0.04] rounded-full blur-[80px]" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-full px-5 py-2 text-xs font-semibold text-blue-400 uppercase tracking-[0.2em] mb-10"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            On Market Since 2020
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-[-0.03em] mb-8 max-w-4xl"
          >
            Your way to<br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">Build. Launch.</span><br />
            <span className="text-zinc-500">Grow.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-zinc-500 text-lg md:text-xl max-w-xl mb-12 leading-relaxed"
          >
            Custom software, performance marketing, and design built to transform businesses, products, and platforms.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <MagneticButton href="#contact" className="px-8 py-4 bg-white text-black rounded-full font-semibold text-sm inline-flex items-center gap-2 shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:shadow-[0_0_60px_rgba(59,130,246,0.25)] transition-all active:scale-[0.95]">
              Start a Project <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <a href="#services" className="px-8 py-4 border border-white/10 text-white/70 rounded-full text-sm font-medium hover:text-white hover:border-white/20 transition-all inline-flex items-center gap-2">
              Explore Services
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-[1px] h-12 bg-gradient-to-b from-transparent via-zinc-600 to-transparent" />
        </motion.div>
      </section>

      {/* ═══ TRUSTED BY ═══ */}
      <section className="py-16 border-b border-white/[0.04] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <p className="text-center text-zinc-600 text-xs uppercase tracking-[0.25em] font-medium mb-10">Trusted by companies worldwide</p>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-[15%] bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-[15%] bg-gradient-to-l from-black to-transparent z-10" />
          <div className="flex items-center whitespace-nowrap animate-marquee">
            {[0, 1, 2].map(setIdx => (
              <div key={setIdx} className="flex items-center shrink-0 gap-16 md:gap-24 px-8 md:px-12" aria-hidden={setIdx > 0}>
                {['Google', 'Microsoft', 'Amazon', 'Meta', 'Spotify', 'Netflix', 'Apple', 'Stripe'].map(name => (
                  <span key={name} className="text-xl md:text-2xl font-bold text-zinc-700/40 shrink-0 select-none tracking-tight">{name}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <style>{`.animate-marquee { animation: marquee 25s linear infinite; } @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }`}</style>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="relative py-20 border-b border-white/[0.04]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '2', suffix: 'mo', label: 'Avg. MVP Delivery' },
              { value: '99.9', suffix: '%', label: 'System Uptime' },
              { value: '200', suffix: '+', label: 'Happy Clients' },
              { value: '50', suffix: '+', label: 'Projects Shipped' },
            ].map((s, i) => (
              <div key={i}>
                <ScaleIn delay={i * 0.1}>
                  <div className="text-center">
                    <p className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                      <AnimatedCounter value={s.value} /><span className="text-blue-500">{s.suffix}</span>
                    </p>
                    <p className="text-xs text-zinc-600 uppercase tracking-[0.2em] mt-3 font-medium">{s.label}</p>
                  </div>
                </ScaleIn>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="py-28 md:py-36">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <Reveal>
            <p className="text-blue-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">What We Do</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Engineering What's Next</h2>
            <p className="text-zinc-500 text-lg max-w-xl mb-16">We design and build high-performance software, from mobile apps to enterprise platforms.</p>
          </Reveal>

          <div className="space-y-0 border-t border-white/[0.06]">
            {SERVICES.map((s, i) => (
              <div key={i}>
                <Reveal delay={i * 0.08}>
                  <motion.div
                    whileHover={{ x: 12 }}
                    transition={{ duration: 0.3 }}
                    className="border-b border-white/[0.06] py-10 md:py-14 group cursor-default"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-16">
                      <span className="text-blue-500/30 text-5xl md:text-6xl font-bold tracking-tight shrink-0 w-20">{s.num}</span>
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight group-hover:text-blue-400 transition-colors">{s.title}</h3>
                        <p className="text-zinc-500 leading-relaxed max-w-xl mb-6">{s.desc}</p>
                        <div className="flex flex-wrap gap-3">
                          <span className="px-4 py-2 border border-blue-500/20 rounded-full text-xs font-semibold text-blue-400">{s.stat1}</span>
                          <span className="px-4 py-2 border border-white/[0.06] rounded-full text-xs font-medium text-zinc-500">{s.stat2}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section id="process" className="py-28 md:py-36 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-black" />
        <div className="relative max-w-[1440px] mx-auto px-6 md:px-12">
          <Reveal>
            <p className="text-blue-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4 text-center">How We Work</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-20">From Idea To Launch</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-[80px] left-[16%] right-[16%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            {PROCESS.map((p, i) => (
              <div key={i}>
                <ScaleIn delay={i * 0.15}>
                  <div className="text-center relative">
                    <div className="text-blue-500/20 text-7xl font-bold mb-6 select-none">{p.step}</div>
                    <h3 className="text-2xl font-bold mb-3 tracking-tight">{p.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed max-w-xs mx-auto">{p.desc}</p>
                  </div>
                </ScaleIn>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="py-28 md:py-36">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <Reveal>
            <div className="text-center mb-20">
              <p className="text-blue-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">Capabilities</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Built Different</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
            {FEATURES.map((f, i) => (
              <div key={i}>
                <Reveal delay={i * 0.08}>
                  <motion.div
                    whileHover={{ backgroundColor: 'rgba(59,130,246,0.03)' }}
                    className="bg-black p-8 md:p-10 h-full"
                  >
                    <span className="text-blue-500/40 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">0{i + 1}</span>
                    <h3 className="text-lg font-bold mb-2 tracking-tight">{f.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
                  </motion.div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PORTFOLIO ═══ */}
      <section id="portfolio" className="py-28 md:py-36 bg-zinc-950/50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <Reveal>
            <p className="text-blue-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">Selected Work</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16">Recent Projects</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO.map((p, i) => (
              <div key={i}>
                <Reveal delay={i * 0.12}>
                  <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="group cursor-pointer">
                    <div className={`bg-gradient-to-br ${p.color} rounded-3xl h-[340px] mb-5 flex flex-col justify-between p-8 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                      <div className="relative flex justify-between items-start">
                        <span className="px-3 py-1.5 bg-black/30 rounded-full text-xs font-medium backdrop-blur-sm">{p.category}</span>
                        <span className="text-xs text-white/50">{p.year}</span>
                      </div>
                      <div className="relative">
                        <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} className="mb-2">
                          <ArrowUpRight className="w-6 h-6 text-white/80" />
                        </motion.div>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors tracking-tight">{p.title}</h3>
                  </motion.div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="py-28 md:py-36">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-blue-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">Pricing</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Transparent Pricing</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map((p, i) => (
              <div key={i}>
                <Reveal delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className={`rounded-3xl p-8 border relative h-full flex flex-col ${
                      p.popular
                        ? 'border-blue-500/30 bg-gradient-to-b from-blue-600/10 to-transparent shadow-[0_0_40px_rgba(59,130,246,0.08)]'
                        : 'border-white/[0.04] bg-zinc-950/50'
                    }`}
                  >
                    {p.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-lg font-bold mb-1 tracking-tight">{p.name}</h3>
                    <p className="text-xs text-zinc-600 mb-6">{p.timeline}</p>
                    <div className="mb-8">
                      <span className="text-4xl font-bold tracking-tight">{p.price}</span>
                      <span className="text-sm text-zinc-600 ml-1">/project</span>
                    </div>
                    <ul className="space-y-4 mb-10 flex-1">
                      {p.features.map((f, j) => (
                        <li key={j} className="text-sm text-zinc-400 flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    <MagneticButton
                      href="#contact"
                      className={`block text-center py-3.5 rounded-full text-sm font-semibold transition-all ${
                        p.popular ? 'bg-white text-black hover:bg-zinc-100' : 'border border-white/10 text-white hover:bg-white/5'
                      }`}
                    >
                      Get Started
                    </MagneticButton>
                  </motion.div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-28 md:py-36 bg-zinc-950/50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <Reveal><h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-16">Client Testimonials</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i}>
                <Reveal delay={i * 0.1}>
                  <div className="border border-white/[0.04] rounded-3xl p-8 h-full flex flex-col">
                    <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-8">"{t.quote}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">{t.avatar}</div>
                      <div>
                        <p className="font-semibold text-sm">{t.name}</p>
                        <p className="text-xs text-zinc-600">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="py-28 md:py-36">
        <div className="max-w-[800px] mx-auto px-6 md:px-12">
          <Reveal><h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-16">Frequently Asked</h2></Reveal>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i}>
                <Reveal delay={i * 0.05}>
                  <motion.div
                    className={`border rounded-2xl overflow-hidden transition-colors ${openFaq === i ? 'border-blue-500/20 bg-blue-600/[0.03]' : 'border-white/[0.04]'}`}
                  >
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                      <span className="text-sm font-semibold pr-4">{faq.q}</span>
                      <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown className="w-5 h-5 text-zinc-500 shrink-0" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                          <p className="text-sm text-zinc-500 leading-relaxed px-6 pb-6">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5" />
          <FloatingOrb className="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-blue-600/[0.06] rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-[1100px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — text */}
            <Reveal>
              <p className="text-blue-500 text-xs font-semibold uppercase tracking-[0.25em] mb-6">Get In Touch</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Ready to Build<br />Something Great?</h2>
              <p className="text-zinc-500 text-base mb-10 leading-relaxed">Every project starts with a conversation. Fill out the form and we will get back to you within 24 hours.</p>
              <div className="space-y-4 text-sm text-zinc-500">
                <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-blue-500" /> info@blueberry.codes</div>
                <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-blue-500" /> Tbilisi, Georgia</div>
                <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-blue-500" /> +995 598 44 96 44</div>
              </div>
            </Reveal>

            {/* Right — form */}
            <SlideIn direction="right" delay={0.2}>
              <ContactForm />
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-white/[0.04] py-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo-white.svg" alt="Blueberry Systems" className="h-6 w-auto opacity-60" />
            <span className="text-zinc-800">|</span>
            <span className="text-xs text-zinc-600">&copy; 2026 All rights reserved</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-zinc-600">
            <span>Sister company: <a href="https://blueberryedu.ge" className="text-blue-500 hover:text-blue-400 transition-colors">Blueberry Academy</a></span>
            <a href="#" className="hover:text-zinc-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
