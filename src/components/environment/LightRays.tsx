import { memo } from 'react';
import type { Season } from './types';
import { seasonThemes } from './types';

interface LightRaysProps {
  season: Season;
}

export const LightRays = memo(function LightRays({ season }: LightRaysProps) {
  const theme = seasonThemes[season];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      
      <style>{`
        @keyframes ray-shift {
          0%, 100% { transform: rotate(-5deg); opacity: var(--ray-opacity); }
          50% { transform: rotate(-2deg); opacity: calc(var(--ray-opacity) * 1.3); }
        }
      `}</style>

      <div
        className="absolute -top-[20%] -left-[20%] h-[200%] w-[100%] origin-top-left"
        style={{
          // The gradient defines the softness, saving the GPU from filtering
          background: `linear-gradient(105deg, ${theme.rayColor} 0%, transparent 30%, transparent 100%)`,
          '--ray-opacity': theme.rayOpacity,
          willChange: 'transform, opacity',
          animation: 'ray-shift 45s ease-in-out infinite'
        } as React.CSSProperties}
      />
    </div>
  );
});