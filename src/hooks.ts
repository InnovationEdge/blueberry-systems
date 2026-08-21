import { useEffect, useRef, useState } from 'react';
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

/** Anything a keyboard can reach, in document order. */
const FOCUSABLE = [
  'a[href]', 'button:not([disabled])', 'input:not([disabled])',
  'select:not([disabled])', 'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Keep Tab inside an open overlay, and put focus back where it came from on
 * close.
 *
 * Without this an overlay is only modal to the eye. Measured before it existed:
 * opening the mobile drawer left focus on the burger, and tabbing walked into
 * the page behind six times; the project modal leaked twenty times. That
 * content is under a scrim, so a sighted keyboard user is moving a focus ring
 * they cannot see, and a screen reader is reading a page it should not be on.
 *
 * Focus goes to the container rather than the first control. Both overlays lead
 * with a close button, and sending focus straight there announces "Close" as
 * the first thing a screen reader says about a panel the user just opened,
 * which says nothing about what opened. Focusing the container reads its
 * accessible name first, then the user tabs into the content.
 *
 * The listener is capturing so it sees Tab before anything inside can stop it.
 */
export function useFocusTrap<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!active || !container) return;

    // Where to send focus back to. Captured before we move it.
    const origin = document.activeElement as HTMLElement | null;

    const items = () =>
      [...container.querySelectorAll<HTMLElement>(FOCUSABLE)]
        .filter((el) => el.getBoundingClientRect().width > 0 && el.offsetParent !== null);

    if (!container.hasAttribute('tabindex')) container.setAttribute('tabindex', '-1');
    container.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const list = items();
      if (list.length === 0) { e.preventDefault(); return; }
      const first = list[0];
      const last = list[list.length - 1];
      const current = document.activeElement;

      if (!container.contains(current)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && current === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      // Only restore if focus is still somewhere in the overlay. If the user
      // clicked a link that navigated, whatever has focus now is more correct
      // than the control they opened it from.
      if (origin?.isConnected && (!document.activeElement || container.contains(document.activeElement) || document.activeElement === document.body)) {
        origin.focus({ preventScroll: true });
      }
    };
  }, [active]);

  return ref;
}

/**
 * True on devices that can actually hover (mouse or trackpad, not touch).
 * Gates hover-only ornaments at the React level, not with display:none,
 * because motion keeps animating properties on elements CSS has hidden: six
 * hidden BorderBeams still ran offsetDistance loops on every touch device.
 */
export function useHoverCapable(): boolean {
  const [can, setCan] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCan(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return can;
}
