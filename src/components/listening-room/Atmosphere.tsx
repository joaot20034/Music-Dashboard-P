import { memo, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Mote {
  id: number;
  left: number; // %
  top: number; // %
  size: number; // px
  duration: number; // s
  delay: number; // s
  drift: number; // px, horizontal wander
}

function makeMotes(count: number, sizeRange: [number, number], durationRange: [number, number]): Mote[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: Math.random() * 100,
    top: 20 + Math.random() * 70,
    size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
    duration: durationRange[0] + Math.random() * (durationRange[1] - durationRange[0]),
    delay: Math.random() * 20,
    drift: (Math.random() - 0.5) * 40,
  }));
}

/** Dust suspended in the sunbeam — the slowest, most visible layer. */
const DustMotes = memo(() => {
  const motes = useMemo(() => makeMotes(14, [1.5, 3.5], [30, 90]), []);
  return (
    <>
      {motes.map((m) => (
        <motion.div
          key={m.id}
          className="absolute rounded-full bg-[var(--parchment)] pointer-events-none"
          style={{ left: `${m.left}%`, top: `${m.top}%`, width: m.size, height: m.size, opacity: 0.25 }}
          animate={{ y: [0, -18, 0], x: [0, m.drift, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: m.duration, delay: m.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </>
  );
});
DustMotes.displayName = 'DustMotes';

/** Fine pollen drifting through the window light — faster and fainter than dust. */
const Pollen = memo(() => {
  const motes = useMemo(() => makeMotes(10, [0.8, 1.6], [40, 130]), []);
  return (
    <>
      {motes.map((m) => (
        <motion.div
          key={m.id}
          className="absolute rounded-full bg-[var(--brass-hi)] pointer-events-none"
          style={{ left: `${m.left}%`, top: `${m.top}%`, width: m.size, height: m.size, opacity: 0.2 }}
          animate={{ y: [0, -10, 0], x: [0, m.drift * 0.6, 0], opacity: [0.05, 0.25, 0.05] }}
          transition={{ duration: m.duration, delay: m.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </>
  );
});
Pollen.displayName = 'Pollen';

/** Two independent curls of incense smoke rising near the desk. */
const IncenseSmoke = memo(() => {
  const curls = useMemo(
    () => [
      { left: '22%', duration: 55, delay: 4 },
      { left: '74%', duration: 72, delay: 18 },
    ],
    []
  );
  return (
    <>
      {curls.map((c, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[30%] w-16 h-40 rounded-full pointer-events-none"
          style={{
            left: c.left,
            background: 'radial-gradient(ellipse at center, rgba(237,227,206,0.10) 0%, transparent 70%)',
            filter: 'blur(6px)',
          }}
          animate={{ y: [0, -60, -120], opacity: [0, 0.35, 0] }}
          transition={{ duration: c.duration, delay: c.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </>
  );
});
IncenseSmoke.displayName = 'IncenseSmoke';

/**
 * Combines every ambient layer. Each layer has its own randomized cycle
 * (30–180s per the brief) so nothing ever reads as synchronized. Fully
 * inert under prefers-reduced-motion.
 */
export const Atmosphere = memo(() => {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-40" aria-hidden="true">
      <DustMotes />
      <Pollen />
      <IncenseSmoke />
    </div>
  );
});
Atmosphere.displayName = 'Atmosphere';
