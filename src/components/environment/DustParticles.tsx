import { memo, useMemo } from 'react';
import { motion } from 'framer-motion'; // Removed useReducedMotion for debugging
import type { Season } from './types';

interface DustParticlesProps {
  season?: Season;
}

// ----------------------------------------------------------------------
// CONFIGURATION & TYPES
// ----------------------------------------------------------------------

type ParticleLayer = 'dust' | 'pollen' | 'light';

interface Particle {
  id: string;
  layer: ParticleLayer;
  size: number;
  color: string;
  baseBlur: number;
  yPath: string[];
  xDrift: string[];
  durationY: number;
  durationX: number;
  durationOp: number;
  delay: number;
  opacityFrames: number[];
}

const SEASONAL_PALETTES: Record<Season, string[]> = {
  spring: ['#F5F5DC', '#C1D7B4', '#FFFDD0', '#E8F5E9'],
  summer: ['#FDE047', '#FFFDD0', '#F5F5DC', '#FFFFFF'],
  autumn: ['#F5DEB3', '#FFE4B5', '#D2B48C', '#FFF8DC'],
  winter: ['#F0F8FF', '#FFFFFF', '#E6E6FA', '#F8F8FF'],
};

// ----------------------------------------------------------------------
// PARTICLE FACTORY ENGINE
// ----------------------------------------------------------------------

const generateParticles = (season: Season): Particle[] => {
  const palette = SEASONAL_PALETTES[season] || SEASONAL_PALETTES.summer;
  const particles: Particle[] = [];

  const LAYER_COUNTS = { dust: 25, pollen: 8, light: 6 };

  Object.entries(LAYER_COUNTS).forEach(([layerName, count]) => {
    const layer = layerName as ParticleLayer;

    for (let i = 0; i < count; i++) {
      const depth = Math.random();
      const isForeground = depth > 0.7;
      const isBackground = depth < 0.3;
      
      // DEBUG: Sped everything up by a factor of 3 so we can actually see movement
      const speedMod = (isForeground ? 0.6 : isBackground ? 1.5 : 1) * 0.33; 
      
      let baseSize = 0;
      let blur = 0;
      let maxOpacity = 0;

      // DEBUG: Massively increased sizes and opacities so they pop against the wood
      if (layer === 'dust') {
        baseSize = isForeground ? 4 : isBackground ? 1.5 : 2.5;
        blur = isForeground ? 0 : isBackground ? 1.5 : 0.5;
        maxOpacity = 0.4; // Was 0.08
      } else if (layer === 'pollen') {
        baseSize = isForeground ? 6 : isBackground ? 3 : 4.5;
        blur = isForeground ? 0.5 : isBackground ? 2 : 1;
        maxOpacity = 0.6; // Was 0.15
      } else if (layer === 'light') {
        baseSize = Math.random() * 8 + 8; 
        blur = Math.random() * 2 + 2; 
        maxOpacity = 0.2; // Was 0.05
      }

      const sunlightHitMod = Math.random() > 0.5 ? 1.5 : 1.2;
      const opacityFrames = [
        0, 
        maxOpacity * 0.4, 
        maxOpacity * sunlightHitMod, 
        maxOpacity * 0.3, 
        0
      ];

      const durationY = (Math.random() * 40 + 60) * speedMod;
      const durationX = (Math.random() * 30 + 50) * speedMod;
      const durationOp = (Math.random() * 20 + 40) * speedMod;
      const delay = Math.random() * -120;

      const startX = Math.random() * 100;
      const xDriftAmt = layer === 'pollen' ? 12 : 6; // Wider drift to notice movement
      
      const xPath = [
        `${startX}vw`,
        `${startX + xDriftAmt}vw`,
        `${startX - xDriftAmt * 0.5}vw`,
        `${startX + xDriftAmt * 0.8}vw`,
        `${startX}vw`
      ];

      const direction = Math.random() > 0.1 ? -1 : 1; 
      const startY = 100 + Math.random() * 20; 
      const endY = direction === -1 ? -(20 + Math.random() * 20) : startY + 20; 
      
      const yPath = [`${startY}vh`, `${endY}vh`];

      particles.push({
        id: `${layer}-${i}`,
        layer,
        size: Number(baseSize.toFixed(2)),
        color: palette[Math.floor(Math.random() * palette.length)],
        baseBlur: Number(blur.toFixed(2)),
        yPath,
        xDrift: xPath,
        durationY,
        durationX,
        durationOp,
        delay,
        opacityFrames,
      });
    }
  });

  return particles;
};

// ----------------------------------------------------------------------
// COMPONENT
// ----------------------------------------------------------------------

export const DustParticles = memo(function DustParticles({ season = 'summer' }: DustParticlesProps) {
  // DEBUG: Bypassing useReducedMotion temporarily!
  const particles = useMemo(() => generateParticles(season), [season]);

  return (
    <motion.div 
      // Removed mix-blend-screen so they render solid and are impossible to miss
      className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
      style={{ perspective: '1000px', willChange: 'opacity' }}
      animate={{ opacity: [0.85, 1, 0.9, 1, 0.85] }}
      transition={{ duration: 120, repeat: Infinity, ease: "easeInOut" }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            filter: `blur(${p.baseBlur}px)`,
            willChange: 'transform, opacity',
            top: 0, 
            left: 0,
          }}
          animate={{
            y: p.yPath,
            x: p.xDrift,
            opacity: p.opacityFrames,
          }}
          transition={{
            y: { duration: p.durationY, repeat: Infinity, ease: 'linear', delay: p.delay },
            x: { duration: p.durationX, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: p.delay },
            opacity: { duration: p.durationOp, repeat: Infinity, ease: 'easeInOut', delay: p.delay },
          }}
        />
      ))}
    </motion.div>
  );
});