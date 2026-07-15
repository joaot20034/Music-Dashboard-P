import { memo, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { type Season} from './types';

interface SeasonalOverlayProps {
  season: Season;
}

export const SeasonalOverlay = memo(function SeasonalOverlay({ season }: SeasonalOverlayProps) {
  const prefersReducedMotion = useReducedMotion();

  // Generate organic pollen drift for Spring
  const pollen = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 30 + 40,
    delay: Math.random() * -30,
  })), []);

  if (prefersReducedMotion || season === 'summer') return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      
      {/* SPRING: Golden Pollen */}
      {season === 'spring' && pollen.map(p => (
        <motion.div
          key={`pollen-${p.id}`}
          className="absolute rounded-full bg-[#fef08a] opacity-30 blur-[2px]"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`, willChange: 'transform' }}
          animate={{
            y: ['0vh', '-15vh', '5vh', '0vh'],
            x: ['0vw', '10vw', '-10vw', '0vw'],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* AUTUMN: Very sparse falling leaves outside the "window" */}
      {season === 'autumn' && (
        <motion.div 
          className="absolute right-[5%] top-[-10%] w-3 h-3 bg-[#b45309] rounded-tr-full rounded-bl-full opacity-40 blur-[1px]"
          animate={{ y: ['0vh', '110vh'], x: ['0vw', '-20vw', '10vw', '-5vw'], rotate: [0, 360, 180] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear', delay: 5 }}
        />
      )}

      {/* WINTER: Gentle cold window frost (Static CSS gradient) */}
      {season === 'winter' && (
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(224,242,254,0.03)] mix-blend-overlay" />
      )}
    </div>
  );
});