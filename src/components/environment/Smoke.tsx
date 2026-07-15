import { memo, useMemo } from 'react';

interface HazeRibbon {
  id: number;
  width: string;
  height: string;
  top: string;
  left: string;
  xEnd: string;
  yEnd: string;
  scaleEnd: number;
  rotateEnd: string;
  peakOpacity: number;
  duration: number;
  delay: number;
}

export const Smoke = memo(function Smoke() {
  const ribbons: HazeRibbon[] = useMemo(() => [
    {
      id: 1, width: '80vw', height: '25vh', top: '15vh', left: '-10vw',
      xEnd: '30vw', yEnd: '-5vh', scaleEnd: 1.05, rotateEnd: '2deg',
      peakOpacity: 0.08, duration: 140, delay: -40
    },
    {
      id: 2, width: '70vw', height: '20vh', top: '40vh', left: '40vw',
      xEnd: '-20vw', yEnd: '5vh', scaleEnd: 0.95, rotateEnd: '-2deg',
      peakOpacity: 0.06, duration: 160, delay: -90
    },
    {
      id: 3, width: '100vw', height: '35vh', top: '60vh', left: '-20vw',
      xEnd: '25vw', yEnd: '10vh', scaleEnd: 1.02, rotateEnd: '1deg',
      peakOpacity: 0.05, duration: 180, delay: -20
    },
    {
      id: 4, width: '60vw', height: '28vh', top: '25vh', left: '20vw',
      xEnd: '-30vw', yEnd: '-10vh', scaleEnd: 0.98, rotateEnd: '-1.5deg',
      peakOpacity: 0.07, duration: 150, delay: -110
    }
  ], []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" style={{ perspective: '1200px' }}>
      
      {/* The Universal GPU-Accelerated Keyframe */}
      <style>{`
        @keyframes atmospheric-haze {
          0% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); opacity: 0; }
          25% { opacity: var(--peak-opacity); }
          75% { opacity: var(--peak-opacity); }
          100% { transform: translate3d(var(--x-end), var(--y-end), 0) scale(var(--scale-end)) rotate(var(--rotate-end)); opacity: 0; }
        }
      `}</style>

      {ribbons.map((ribbon) => (
        <div
          key={`haze-${ribbon.id}`}
          className="absolute rounded-[100%]"
          style={{
            width: ribbon.width,
            height: ribbon.height,
            top: ribbon.top,
            left: ribbon.left,
            willChange: 'transform, opacity',
            background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(232, 224, 213, 0.6) 0%, rgba(232, 224, 213, 0.15) 50%, transparent 100%)',
            
            // Pass the variables strictly to CSS
            '--x-end': ribbon.xEnd,
            '--y-end': ribbon.yEnd,
            '--scale-end': ribbon.scaleEnd,
            '--rotate-end': ribbon.rotateEnd,
            '--peak-opacity': ribbon.peakOpacity,
            
            // Execute the animation natively
            animation: `atmospheric-haze ${ribbon.duration}s ease-in-out infinite alternate ${ribbon.delay}s`
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
});