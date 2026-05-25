import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Check, Upload, X } from 'lucide-react';
import { Reveal } from './primitives';
import type { getT } from '../i18n';

export function Careers({ t }: { t: ReturnType<typeof getT> }) {
  const [applyJob, setApplyJob] = useState<string | null>(null);

  const jobs = [
    { title: t.job1, type: t.typeRemote, dept: t.deptEng },
    { title: t.job2, type: t.typeRemote, dept: t.deptDesign },
    { title: t.job3, type: t.typeHybrid, dept: t.deptEng },
    { title: t.job4, type: t.typeTbilisi, dept: t.deptProduct },
    { title: t.job5, type: t.typeRemote, dept: t.deptMarketing },
  ];

  return (
    <>
      <section id="careers" className="py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <Reveal>
            <p className="text-blue-400 text-[11px] font-semibold uppercase tracking-[0.28em] mb-4 flex items-center gap-2.5">
              <span className="w-6 h-px bg-blue-400/50" /> {t.joinUs}
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-[-0.035em] mb-4">
              {t.careersTitle}
            </h2>
            <p className="text-zinc-400 mb-12 text-lg max-w-2xl">{t.careersDesc}</p>
          </Reveal>

          <div className="space-y-2.5">
            {jobs.map((j, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <button
                  onClick={() => setApplyJob(j.title)}
                  className="w-full flex items-center justify-between p-6 border border-white/[0.06] rounded-2xl hover:border-blue-500/30 hover:bg-blue-600/[0.04] transition-all group text-left"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 min-w-0">
                    <h3 className="font-semibold text-base group-hover:text-blue-300 transition-colors">
                      {j.title}
                    </h3>
                    <span className="text-[11px] text-zinc-500 bg-white/[0.04] border border-white/[0.06] px-3 py-1 rounded-full font-mono uppercase tracking-wider">
                      {j.dept}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-xs text-zinc-500">{j.type}</span>
                    <span className="text-xs text-blue-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">
                      {t.applyNow}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-300 transition-colors" />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} t={t} />
    </>
  );
}

function ApplyModal({
  job,
  onClose,
  t,
}: {
  job: string | null;
  onClose: () => void;
  t: ReturnType<typeof getT>;
}) {
  const [form, setForm] = useState<{ name: string; email: string; resume: File | null }>({
    name: '',
    email: '',
    resume: null,
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const reset = () => {
    setForm({ name: '', email: '', resume: null });
    setSent(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {job && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-zinc-950 border border-white/[0.08] rounded-3xl z-50 p-8 overflow-y-auto max-h-[92vh]"
            role="dialog"
            aria-modal="true"
            aria-label={t.applyNow}
          >
            <div className="flex items-start justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold tracking-tight">{t.applyNow}</h3>
                <p className="text-sm text-blue-300 mt-1">{job}</p>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close"
                className="p-2 text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {sent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
                  <Check className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t.applySent}</h3>
                <p className="text-sm text-zinc-500 max-w-xs mx-auto">{t.applySentDesc}</p>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSending(true);
                  const formData = new FormData();
                  formData.append('name', form.name);
                  formData.append('email', form.email);
                  formData.append('_subject', `Job Application: ${job}`);
                  formData.append('position', job || '');
                  if (form.resume) formData.append('attachment', form.resume);
                  try {
                    await fetch('https://formsubmit.co/ajax/info@blueberry.codes', {
                      method: 'POST',
                      body: formData,
                    });
                    setSent(true);
                  } catch {
                    /* fallback handled via mailto if needed */
                  }
                  setSending(false);
                }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-2">
                    {t.applyName}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-blue-500/40 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-2">
                    {t.applyEmail}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-blue-500/40 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-2">
                    {t.applyPosition}
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={job || ''}
                    className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-zinc-400 cursor-default"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-2">
                    {t.applyResume}
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/[0.08] rounded-xl cursor-pointer hover:border-blue-500/30 transition-colors bg-white/[0.02]">
                    <Upload className="w-6 h-6 text-zinc-500 mb-2" />
                    <span className="text-xs text-zinc-400">
                      {form.resume ? form.resume.name : t.applyDragDrop}
                    </span>
                    <span className="text-[10px] text-zinc-600 mt-1">{t.fileHint}</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) setForm({ ...form, resume: e.target.files[0] });
                      }}
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 bg-white text-black rounded-xl text-sm font-semibold hover:bg-zinc-200 disabled:opacity-50 transition-all"
                >
                  {sending ? t.applySending : t.applySend}
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
