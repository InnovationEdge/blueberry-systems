import { useReducedMotion as fmReducedMotion } from 'motion/react';

/**
 * Hooks live here rather than in components/primitives.tsx so that file can
 * export components and nothing else.
 *
 * Vite's Fast Refresh can only hot-swap a module when every export is a
 * component: a hook may hold state that other modules depend on, so Vite
 * cannot prove a swap is safe and falls back to a full page reload for that
 * file and everything importing it. Eleven files import primitives, which
 * made it the most expensive file in the project to edit.
 */

/**
 * motion's own hook returns null until it has read the media query. Callers
 * here want a plain boolean, and "not known yet" should behave as "no
 * preference expressed" rather than as "reduce".
 *
 * This is a stricter guard than the app-wide MotionConfig reducedMotion="user"
 * set in main.tsx, not a duplicate of it: MotionConfig suppresses transform
 * and layout animation while keeping opacity, whereas a component checking
 * this hook can skip its effect entirely.
 */
export function useReducedMotion(): boolean {
  return fmReducedMotion() ?? false;
}
