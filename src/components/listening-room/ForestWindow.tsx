import { memo } from 'react';
import { motion, MotionValue, useReducedMotion } from 'framer-motion';

interface ForestWindowProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
  brightness: number; // 0–1, driven by the entrance sequence
}

/**
 * The window is the room's only light source, so everything here reads
 * as "sun," not decoration: a soft gradient tree line, slow fog, and a
 * couple of leaves on their own independent drift.
 */
export const ForestWindow = memo(({ x, y, brightness }: ForestWindowProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      style={{ x, y, width: 'var(--win-w)', height: 'var(--win-h)', opacity: brightness }}
      className="absolute top-[6%] left-1/2 -translate-x-1/2 overflow-hidden transition-opacity duration-700 ease-out"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-near)] via-[var(--forest-far)] to-[#0d150e]" />

      {/* tree silhouettes, two depths */}
      <svg viewBox="0 0 900 520" className="absolute inset-0 w-full h-full opacity-70" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <g fill="var(--forest-far)" opacity="0.8">
          <path d="M0 520 L60 300 L120 520 Z" />
          <path d="M90 520 L170 260 L250 520 Z" />
          <path d="M700 520 L770 280 L840 520 Z" />
          <path d="M780 520 L860 320 L900 520 Z" />
        </g>
        <g fill="var(--forest-near)">
          <path d="M-20 520 L110 340 L260 520 Z" />
          <path d="M600 520 L740 320 L900 520 Z" />
          <path d="M330 520 L430 300 L560 520 Z" opacity="0.9" />
        </g>
      </svg>

      {/* soft morning fog, drifting on its own very slow cycle */}
      <motion.div
        className="absolute inset-0 mix-blend-screen"
        style={{ background: 'linear-gradient(120deg, rgba(237,230,214,0.28) 0%, transparent 45%)' }}
        animate={prefersReducedMotion ? undefined : { x: ['-4%', '4%', '-4%'] }}
        transition={{ duration: 70, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* warm sunlight wash */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-40"
        style={{ background: 'radial-gradient(circle at 38% 20%, var(--ember) 0%, transparent 55%)' }}
      />

      {/* two leaves, independent slow drifting cycles — never in sync */}
      {!prefersReducedMotion && (
        <>
          <motion.svg
            viewBox="0 0 20 20"
            className="absolute w-3 h-3 opacity-50"
            style={{ left: '30%', top: '35%' }}
            animate={{ x: [0, 30, 6, 0], y: [0, 14, 26, 40], rotate: [0, 30, -10, 0], opacity: [0, 0.5, 0.4, 0] }}
            transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          >
            <ellipse cx="10" cy="10" rx="8" ry="5" fill="var(--forest-near)" />
          </motion.svg>
          <motion.svg
            viewBox="0 0 20 20"
            className="absolute w-2.5 h-2.5 opacity-40"
            style={{ left: '62%', top: '20%' }}
            animate={{ x: [0, -24, -4, 0], y: [0, 18, 30, 46], rotate: [0, -40, 10, 0], opacity: [0, 0.4, 0.3, 0] }}
            transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut', delay: 11 }}
          >
            <ellipse cx="10" cy="10" rx="8" ry="5" fill="var(--forest-far)" />
          </motion.svg>
        </>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] to-transparent" />
    </motion.div>
  );
});
ForestWindow.displayName = 'ForestWindow';
