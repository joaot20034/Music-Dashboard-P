import { memo } from 'react';

export const Vignette = memo(function Vignette() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-40 mix-blend-multiply"
      style={{
        background: `
          radial-gradient(ellipse at center, transparent 40%, rgba(26, 17, 11, 0.4) 100%),
          radial-gradient(circle at center, transparent 70%, rgba(10, 7, 5, 0.6) 100%)
        `
      }}
    />
  );
});