import { motion } from "framer-motion";

interface CanopyWaveformProps {
  isPlaying: boolean;
}

const BAR_COUNT = 48;

const layers = [
  {
    id: 1,
    opacity: 0.15,
    duration: 6.0,
    height: "100%", 
  },
  {
    id: 2,
    opacity: 0.35,
    duration: 4.5,
    height: "75%",
  },
  {
    id: 3,
    opacity: 0.7,
    duration: 3.2,
    height: "50%",
  },
];

export function CanopyWaveform({ isPlaying }: CanopyWaveformProps) {
  return (
    <div className="relative h-12 w-full overflow-hidden pointer-events-none select-none px-2">
      <style>{`
        @keyframes tide-flow {
          0%, 100% { transform: scaleY(0.15); }
          50% { transform: scaleY(1); }
        }
      `}</style>

      <motion.div
        className="relative h-full w-full"
        style={{ transformOrigin: "bottom" }}
        animate={{
          scaleY: isPlaying ? 1 : 0.15,
          opacity: isPlaying ? 1 : 0.5,
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {layers.map((layer) => (
          <div
            key={layer.id}
            className="absolute bottom-0 left-0 flex w-full items-end gap-[1px]"
            style={{ height: layer.height, opacity: layer.opacity }}
          >
            {[...Array(BAR_COUNT)].map((_, i) => {
              const delay = -((BAR_COUNT - i) * (layer.duration / BAR_COUNT));

              return (
                <div
                  key={i}
                  // FIX: Added 'h-full' right here so the bars have a height to scale!
                  className="h-full flex-1 rounded-t-full bg-[var(--accent-gold)]"
                  style={{
                    transformOrigin: "bottom",
                    willChange: "transform",
                    animation: `tide-flow ${layer.duration}s ease-in-out infinite`,
                    animationDelay: `${delay}s`,
                  }}
                />
              );
            })}
          </div>
        ))}
      </motion.div>
    </div>
  );
}