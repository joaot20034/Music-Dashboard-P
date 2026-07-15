import { useEffect } from 'react';
import { MotionValue, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

/**
 * One shared pointer listener for the whole room. Individual layers derive
 * their own offset from this via useLayerOffset — we never attach a
 * mousemove listener per-layer.
 */
export function useParallaxPointer() {
  const prefersReducedMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 35, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 35, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my, prefersReducedMotion]);

  return { sx, sy, prefersReducedMotion };
}

/** Converts the shared pointer signal into a depth-scaled x/y offset. */
export function useLayerOffset(sx: MotionValue<number>, sy: MotionValue<number>, depthPx: number) {
  const x = useTransform(sx, [-1, 1], [-depthPx, depthPx]);
  const y = useTransform(sy, [-1, 1], [-depthPx * 0.5, depthPx * 0.5]);
  return { x, y };
}
