import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import './index.css'
import App from './App.tsx'

/**
 * reducedMotion="user" makes every motion component honour the operating
 * system setting. Only primitives.tsx and ScrollProgress.tsx checked
 * useReducedMotion by hand, which left 23 motion elements across the hero,
 * header, modal, footer and contact form animating regardless. Someone who
 * turns on Reduce Motion, a prominent iOS accessibility setting, was still
 * getting all of it. Doing it here covers those and anything added later,
 * rather than asking each new component to remember.
 *
 * It suppresses transform and layout animation and keeps opacity, which is the
 * subset that causes trouble for vestibular disorders.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
)

/**
 * The first thing a technical founder does on an agency site is open devtools,
 * and until now the console said nothing. Dev-facing English on purpose: this
 * is not UI copy, it is a note to the one audience guaranteed to read it.
 */
if (typeof window !== 'undefined') {
  console.info(
    '%c</>%c Blueberry Systems %c Tbilisi · 41.71N 44.83E',
    'background: linear-gradient(120deg,#2563eb,#7c3aed); color:#fff; font-family:ui-monospace,Menlo,monospace; font-weight:700; padding:4px 8px; border-radius:6px 0 0 6px;',
    'background:#0a0a0d; color:#fff; font-family:ui-monospace,Menlo,monospace; padding:4px 8px; border-radius:0 6px 6px 0;',
    'color:#8a8a93; font-family:ui-monospace,Menlo,monospace; padding:4px 0;',
  );
  console.info(
    '%cReading console output? So do we, all day. info@blueberry.codes\n' +
    'Keys: w work · p pricing · c contact. The old code works too:\n' +
    'up up down down left right left right b a',
    'color:#8a8a93; font-family:ui-monospace,Menlo,monospace;',
  );
}
