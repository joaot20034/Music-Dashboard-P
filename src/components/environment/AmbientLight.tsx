import { memo } from 'react';
import type { Season } from './types';
import { seasonThemes } from './types';

interface AmbientLightProps {
  season: Season;
}

export const AmbientLight = memo(function AmbientLight({ season }: AmbientLightProps) {
  const theme = seasonThemes[season];

  return (
    <div className="absolute inset-0 overflow-hidden mix-blend-screen pointer-events-none">
      
      <style>{`
        @keyframes ambient-pulse-1 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          33% { transform: translate3d(5%, -5%, 0) scale(1.05); }
          66% { transform: translate3d(-5%, 5%, 0) scale(0.95); }
        }
        @keyframes ambient-pulse-2 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          33% { transform: translate3d(-5%, 5%, 0) scale(0.95); }
          66% { transform: translate3d(5%, -5%, 0) scale(1.05); }
        }
      `}</style>

      {/* Primary Light (No blurs, just soft gradients) */}
      <div
        className="absolute -top-[20%] -left-[10%] h-[150%] w-[150%] rounded-[100%] opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${theme.ambientPrimary} 0%, transparent 60%)`,
          willChange: 'transform',
          animation: 'ambient-pulse-1 180s linear infinite'
        }}
      />
      
      {/* Secondary Light */}
      <div
        className="absolute -bottom-[30%] -right-[20%] h-[150%] w-[150%] rounded-[100%] opacity-[0.15]"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${theme.ambientSecondary} 0%, transparent 60%)`,
          willChange: 'transform',
          animation: 'ambient-pulse-2 140s linear infinite'
        }}
      />
    </div>
  );
});