import { useState, type FormEvent, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, Mail, MapPin, Phone } from 'lucide-react';
import { Reveal, SlideIn, FloatingOrb, SectionEyebrow } from './primitives';
import type { getT } from '../i18n';

export function FAQ({ t }: { t: ReturnType<typeof getT> }) {
  const [open, setOpen] = useState<number | null>(0);

  const FAQS = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
    { q: t.faq4Q, a: t.faq4A },
    { q: t.faq5Q, a: t.faq5A },
    { q: t.faq6Q, a: t.faq6A },
  ];

  return (
    <section id="faq" className="py-24 md:py-36">
      <div className="max-w-[900px] mx-auto px-6 md:px-16">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-[-0.035em] text-center mb-16">
            {t.faqTitle}
          </h2>
        </Reveal>

        <div className="space-y-2.5">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  open === i
                    ? 'border-blue-500/30 bg-blue-600/[0.04]'
                    : 'border-zinc-200 dark:border-white/[0.06] hover:border-zinc-400 dark:hover:border-white/[0.12]'
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-base font-semibold pr-4 tracking-tight">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl text-zinc-600 dark:text-zinc-400 font-light shrink-0 leading-none"
                    aria-hidden
                  >
                    +
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed px-6 pb-6">{faq.a}</p>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact({ t }: { t: ReturnType<typeof getT> }) {
  return (
    <section id="contact" className="py-24 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.06] via-transparent to-violet-600/[0.06]" />
        <FloatingOrb className="absolute top-[10%] right-[12%] w-[520px] h-[520px] bg-blue-600/[0.10] rounded-full blur-[140px]" />
        <FloatingOrb className="absolute bottom-[10%] left-[8%] w-[320px] h-[320px] bg-violet-600/[0.06] rounded-full blur-[110px]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-2">
            <Reveal>
              <SectionEyebrow num="09" label={t.getInTouch} />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.035em] mb-6 whitespace-pre-line">
                {t.contactTitle}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-base mb-10 leading-relaxed max-w-md">
                {t.contactDesc}
              </p>
              <div className="space-y-4 text-sm">
                <a
                  href="mailto:info@blueberry.codes"
                  className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 hover:text-black dark:text-white transition-colors group"
                >
                  <span className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Mail className="w-4 h-4 text-blue-300" />
                  </span>
                  info@blueberry.codes
                </a>
                <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                  <span className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-blue-300" />
                  </span>
                  Tbilisi, Georgia
                </div>
                <a
                  href="tel:+995598449644"
                  className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 hover:text-black dark:text-white transition-colors group"
                >
                  <span className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Phone className="w-4 h-4 text-blue-300" />
                  </span>
                  +995 598 44 96 44
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <SlideIn direction="right" delay={0.15}>
              <ContactForm t={t} />
            </SlideIn>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactForm({ t }: { t: ReturnType<typeof getT> }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    budget: '',
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const res = await fetch('https://formsubmit.co/ajax/info@blueberry.codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: `Blueberry Systems · New Inquiry from ${form.name}`,
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
      setError(t.contactError);
      setTimeout(() => {
        const subject = encodeURIComponent(`Project Inquiry from ${form.name}`);
        const body = encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nBudget: ${form.budget}\n\nMessage:\n${form.message}`,
        );
        window.location.href = `mailto:info@blueberry.codes?subject=${subject}&body=${body}`;
        setSent(true);
        setError('');
      }, 1500);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-blue-500/20 bg-blue-600/[0.04] rounded-3xl p-12 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-blue-300" />
        </div>
        <h3 className="text-2xl font-bold mb-2 tracking-tight">{t.contactSent}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto">{t.contactSentDesc}</p>
        <button
          onClick={() => {
            setSent(false);
            setForm({ name: '', email: '', company: '', message: '', budget: '' });
          }}
          className="mt-7 text-sm text-blue-300 hover:text-blue-200 transition-colors font-medium"
        >
          {t.sendAnother}
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-zinc-300/70 dark:border-white/[0.08] bg-white dark:bg-zinc-950/70 backdrop-blur-xl rounded-3xl p-8 md:p-10 space-y-5"
    >
      {error && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-sm text-amber-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label={t.contactName}>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder={t.placeholderName}
            className="w-full px-4 py-3.5 bg-zinc-100 dark:bg-white/[0.04] border border-zinc-300/70 dark:border-white/[0.08] rounded-xl text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-blue-500/40 transition-all"
          />
        </FormField>

        <FormField label={t.contactEmail}>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder={t.placeholderEmail}
            className="w-full px-4 py-3.5 bg-zinc-100 dark:bg-white/[0.04] border border-zinc-300/70 dark:border-white/[0.08] rounded-xl text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-blue-500/40 transition-all"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label={t.contactCompany}>
          <input
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder={t.placeholderCompany}
            className="w-full px-4 py-3.5 bg-zinc-100 dark:bg-white/[0.04] border border-zinc-300/70 dark:border-white/[0.08] rounded-xl text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-blue-500/40 transition-all"
          />
        </FormField>

        <FormField label={t.contactBudget}>
          <select
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            className="w-full px-4 py-3.5 bg-zinc-100 dark:bg-white/[0.04] border border-zinc-300/70 dark:border-white/[0.08] rounded-xl text-sm text-black dark:text-white appearance-none focus:outline-none focus:border-blue-500/40 transition-all"
          >
            <option value="" className="bg-zinc-50 dark:bg-zinc-900">
              {t.contactSelectBudget}
            </option>
            <option value="$5,000 - $15,000" className="bg-zinc-50 dark:bg-zinc-900">$5,000 – $15,000</option>
            <option value="$15,000 - $40,000" className="bg-zinc-50 dark:bg-zinc-900">$15,000 – $40,000</option>
            <option value="$40,000 - $100,000" className="bg-zinc-50 dark:bg-zinc-900">$40,000 – $100,000</option>
            <option value="$100,000+" className="bg-zinc-50 dark:bg-zinc-900">$100,000+</option>
          </select>
        </FormField>
      </div>

      <FormField label={t.contactMessage}>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder={t.placeholderMessage}
          className="w-full px-4 py-3.5 bg-zinc-100 dark:bg-white/[0.04] border border-zinc-300/70 dark:border-white/[0.08] rounded-xl text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 resize-none focus:outline-none focus:border-blue-500/40 transition-all"
        />
      </FormField>

      <motion.button
        type="submit"
        disabled={sending}
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.985 }}
        className="w-full py-4 bg-black text-white dark:bg-white dark:text-black rounded-xl font-semibold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {sending ? (
          <>
            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            {t.contactSending}
          </>
        ) : (
          <>
            {t.contactSend} <ArrowRight className="w-4 h-4" />
          </>
        )}
      </motion.button>
    </form>
  );
}

function FormField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-zinc-600 dark:text-zinc-500 mb-2 uppercase tracking-[0.22em]">
        {label}
      </label>
      {children}
    </div>
  );
}
