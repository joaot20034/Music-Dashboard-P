import { memo } from 'react';

export const FilmGrain = memo(function FilmGrain() {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      
      {/* 
        OPTIMIZATION:
        We switched from 'steps(2)' (which creates a jumping/wobbling effect)
        to 'linear' (which creates a smooth, imperceptible drift).
        We increased the duration from 0.8s to 20s to make it 'breathe'.
      */}
      <style>{`
        @keyframes grain-drift {
          0% { background-position: 0 0; }
          100% { background-position: 200px 200px; }
        }
        .cinematic-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.02; /* Extremely subtle */
          animation: grain-drift 20s linear infinite;
          will-change: background-position;
        }
      `}</style>

      {/* The Grain Layer */}
      <div className="cinematic-noise absolute -inset-[100%] h-[300%] w-[300%]" />
      
      {/* Warm Analog Vignette (Static, no animation) */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ 
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(15, 10, 5, 0.3) 100%)' 
        }}
      />
    </div>
  );
});