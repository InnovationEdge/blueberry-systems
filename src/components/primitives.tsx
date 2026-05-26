import { useState, useRef, useEffect, useMemo, type MouseEvent as RMouseEvent, type ReactNode } from 'react';
import { motion, useInView, useMotionValue, useSpring, useReducedMotion as fmReducedMotion } from 'motion/react';

/* ─── Motion guard ─── */
export function useReducedMotion(): boolean {
  return fmReducedMotion() ?? false;
}

/* ─── Mobile detection (perf-gates heavy effects) ─── */
export function useIsDesktop(min = 768): boolean {
  const [is, setIs] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia(`(min-width: ${min}px)`);
    const update = () => setIs(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [min]);
  return is;
}

/* ─── Scroll-reveal ─── */
export function Reveal({ children, className = '', delay = 0, y = 40 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();
  if (reduced) return <div ref={ref} className={className}>{children}</div>;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y, filter: 'blur(8px)' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({ children, className = '', delay = 0, direction = 'left' }: { children: ReactNode; className?: string; delay?: number; direction?: 'left' | 'right' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();
  if (reduced) return <div ref={ref} className={className}>{children}</div>;
  const x = direction === 'left' ? -60 : 60;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();
  if (reduced) return <div ref={ref} className={className}>{children}</div>;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Floating orb (decorative) ─── */
export function FloatingOrb({ className }: { className: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className} />;
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -22, 0], x: [0, 12, 0], scale: [1, 1.06, 1] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ─── Counter ─── */
export function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : '0');

  useEffect(() => {
    if (!isInView || reduced) return;
    const num = parseInt(value.replace(/[^0-9]/g, ''));
    if (isNaN(num)) { setDisplay(value); return; }
    const duration = 1800;
    const steps = 50;
    const inc = num / steps;
    let cur = 0;
    const timer = setInterval(() => {
      cur += inc;
      if (cur >= num) { setDisplay(value); clearInterval(timer); }
      else setDisplay(String(Math.floor(cur)));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value, reduced]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ─── Kinetic word swap (grid-stack so children keep their own background-clip) ─── */
export function KineticWords({ words, className = '' }: { words: string[]; className?: string }) {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || words.length === 0) return;
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [words.length, reduced]);

  if (reduced) return <span className={className}>{words[0]}</span>;

  return (
    <span className="inline-grid align-baseline">
      {words.map((w, idx) => (
        <motion.span
          key={w}
          aria-hidden={idx !== i}
          initial={false}
          animate={idx === i ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 18, filter: 'blur(8px)' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ gridArea: '1 / 1', pointerEvents: idx === i ? 'auto' : 'none' }}
          className={`whitespace-nowrap ${className}`}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Hero connection particles (desktop + motion-safe only) ─── */
export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const desktop = useIsDesktop();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!desktop || reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    type P = { x: number; y: number; vx: number; vy: number; size: number; opacity: number };
    const particles: P[] = [];
    const count = 50;
    let w = 0, h = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particles.length === 0) {
        for (let k = 0; k < count; k++) {
          particles.push({
            x: Math.random() * w, y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
            size: Math.random() * 1.4 + 0.4, opacity: Math.random() * 0.3 + 0.05,
          });
        }
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 168, 255, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(99, 168, 255, ${0.05 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, [desktop, reduced]);

  if (!desktop || reduced) return null;
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />;
}

/* ─── Magnetic button (subtle cursor pull) ─── */
export function MagneticButton({ children, className = '', href, onClick }: { children: ReactNode; className?: string; href?: string; onClick?: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 22 });
  const sy = useSpring(y, { stiffness: 280, damping: 22 });
  const reduced = useReducedMotion();

  const handleMove = (e: RMouseEvent<HTMLElement>) => {
    if (reduced) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.18);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.18);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  const style = reduced ? undefined : { x: sx, y: sy };

  if (href) {
    return (
      <motion.a href={href} style={style} onMouseMove={handleMove} onMouseLeave={handleLeave} className={className}>
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" onClick={onClick} style={style} onMouseMove={handleMove} onMouseLeave={handleLeave} className={className}>
      {children}
    </motion.button>
  );
}

/* ─── Cursor-following spotlight (Hero ambient) ─── */
export function CursorSpotlight({ color = 'rgba(59,130,246,0.15)' }: { color?: string }) {
  const desktop = useIsDesktop();
  const reduced = useReducedMotion();
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 70, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 70, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (!desktop || reduced) return;
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [desktop, reduced, x, y]);

  if (!desktop || reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] rounded-full -translate-x-1/2 -translate-y-1/2 z-[1]"
      style={{
        x: sx,
        y: sy,
        background: `radial-gradient(circle at center, ${color} 0%, transparent 60%)`,
        mixBlendMode: 'screen',
      }}
    />
  );
}

/* ─── Section eyebrow (reusable label with serial number) ─── */
export function SectionEyebrow({ num, label, center = false }: { num: string; label: string; center?: boolean }) {
  return (
    <p
      className={`text-blue-400 text-[11px] font-semibold uppercase tracking-[0.28em] mb-4 flex items-center gap-2.5 ${
        center ? 'justify-center' : ''
      }`}
    >
      <span className="font-mono text-zinc-600">/{num}</span>
      <span className="w-6 h-px bg-blue-400/50" />
      {label}
      {center && <span className="w-6 h-px bg-blue-400/50" />}
    </p>
  );
}

/* ─── Marquee (auto-scrolling horizontal strip) ─── */
export function Marquee({ children, speed = 32, reverse = false, className = '' }: { children: ReactNode; speed?: number; reverse?: boolean; className?: string }) {
  const reduced = useReducedMotion();
  const items = useMemo(() => [children, children, children], [children]);
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div
        className="flex w-max gap-12 will-change-transform"
        style={{
          animation: reduced ? undefined : `marquee ${speed}s linear infinite ${reverse ? 'reverse' : ''}`,
        }}
      >
        {items.map((c, i) => (
          <div key={i} className="flex items-center gap-12 shrink-0">{c}</div>
        ))}
      </div>
    </div>
  );
}
