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
