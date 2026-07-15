import { memo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Heart, ListMusic, Mic2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Speaker, Volume2 } from 'lucide-react';
import { usePlayer } from '../../hooks/usePlayer';
import { Slider } from '../ui/Slider';
import { CanopyWaveform } from '../player/CanopyWaveform';
import { DISPLAY_FONT, UTILITY_FONT } from './tokens';

interface VinylConsoleProps {
  visible: boolean;
  onOpenQueue?: () => void;
  onOpenLyrics?: () => void;
  onOpenDevices?: () => void;
}

export const VinylConsole = memo(({ visible, onOpenQueue, onOpenLyrics, onOpenDevices }: VinylConsoleProps) => {
  const { currentTrack, isPlaying, togglePlay, volume, setVolume } = usePlayer();
  const prefersReducedMotion = useReducedMotion();
  const spinning = isPlaying && !prefersReducedMotion;

  const [favorited, setFavorited] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const cycleRepeat = () => setRepeatMode((m) => (m === 'off' ? 'all' : m === 'all' ? 'one' : 'off'));

  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30, scale: visible ? 1 : 0.98 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center w-full"
      style={{ maxWidth: 'clamp(320px, 70vw, 680px)', filter: 'drop-shadow(0 30px 24px rgba(0,0,0,0.55))' }}
    >
      <div className="relative w-full rounded-xl bg-[var(--walnut)] border-t border-l border-[var(--walnut-lt)]/60 border-r-2 border-b-4 border-[var(--ink)] p-[clamp(1.1rem,3.6vw,2.25rem)] flex flex-col items-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.22] mix-blend-multiply pointer-events-none" style={{ filter: 'url(#wood-grain)' }} />

        {/* 
          FIX 1: Added `flex-shrink-0` so Flexbox never squishes the turntable into an oval.
          Separated the Platter from the Wrapper so the tonearm stays anchored properly.
        */}
        <div
          className="relative flex-shrink-0 flex items-center justify-center mb-[clamp(1.25rem,3.6vw,2.25rem)] z-10"
          style={{ width: 'clamp(240px, 45vw, 320px)', height: 'clamp(240px, 45vw, 320px)' }}
        >
          {/* Black Platter */}
          <div className="absolute inset-0 rounded-full bg-[var(--ink)] shadow-[inset_0_10px_22px_rgba(0,0,0,0.75)] border-2 border-[#150e09] flex items-center justify-center">
            {/* Record Grooves */}
            <div className="absolute w-[88%] h-[88%] rounded-full bg-[#1c1c1c] border border-[#333]" />

            {/* 
              FIX 2: Replaced `inset-[8%]` with strict width/height percentages 
              so the image forces itself to remain a perfect circle.
            */}
            <motion.img
              src={currentTrack?.coverUrl}
              className="absolute w-[84%] h-[84%] rounded-full object-cover z-10"
              style={{ animation: spinning ? 'spin 3s linear infinite' : 'none' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.9 }}
              transition={{ duration: 0.6, delay: 0.34, ease: 'easeOut' }}
              alt={currentTrack ? `${currentTrack.title} cover art` : 'No track selected'}
            />

            {/* Spindle */}
            <div className="absolute z-20 h-3 w-3 rounded-full bg-[var(--brass-hi)] border-2 border-[#111]" />

            {/* Glow */}
            {isPlaying && (
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, transparent 55%, rgba(226,136,58,0.10) 100%)',
                  animation: prefersReducedMotion ? 'none' : 'glow-pulse 4s ease-in-out infinite',
                }}
              />
            )}
          </div>

          {/* 
            FIX 3: Repositioned the Tonearm to lock to the top-right of the container.
            Recalculated the exact geometry so the arm and headshell connect flawlessly.
          */}
          <motion.div
            className="absolute z-30 origin-[20px_20px]"
            style={{ top: '2%', right: '-4%' }}
            initial={{ rotate: -30, opacity: 0 }}
            animate={{ rotate: visible ? (isPlaying ? 85 : 10) : -30, opacity: visible ? 1 : 0 }}
            transition={{ duration: visible ? 0.9 : 0, delay: visible ? 0.46 : 0, ease: 'easeInOut' }}
          >
            {/* Pivot Base */}
            <div className="w-10 h-10 rounded-full bg-[var(--ink)] border-2 border-[var(--ash)] shadow-lg flex items-center justify-center relative z-20">
              <div className="w-4 h-4 rounded-full bg-[var(--brass)]" />
            </div>
            {/* Brass Arm Tube */}
            <div className="absolute top-[16px] left-[20px] w-36 h-[8px] rounded-full bg-gradient-to-b from-[var(--brass-hi)] to-[var(--ash)] origin-left rotate-[15deg] shadow-md z-10" />
            {/* Black Headshell (Needle) */}
            <div className="absolute top-[52px] left-[150px] w-5 h-10 rounded-sm bg-[var(--ink)] rotate-[25deg] border-t-2 border-[var(--brass)] shadow-xl z-10" />
          </motion.div>
        </div>

        {/* Amp Section */}
        <div className="w-full bg-[#160f0a] rounded-lg shadow-[inset_0_8px_16px_rgba(0,0,0,0.6)] border-t border-[var(--walnut-lt)]/40 p-[clamp(0.9rem,2.8vw,1.75rem)] flex flex-col items-center z-10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ filter: 'url(#film-grain)' }} />

          <div className="text-center w-full mb-4 z-10 max-w-full">
            <h2 className="text-[clamp(1.25rem,3.2vw,2.1rem)] font-semibold text-[var(--parchment)] tracking-wide truncate" style={{ fontFamily: DISPLAY_FONT }}>
              {currentTrack?.title || 'Studio Idle'}
            </h2>
            <p className="text-[clamp(0.85rem,1.7vw,1.05rem)] text-[var(--brass)] mt-1 truncate" style={{ fontFamily: UTILITY_FONT }}>
              {currentTrack?.artistName || 'Awaiting selection'}
            </p>
          </div>

          <motion.div
            className="w-full px-2 mb-7 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 0.9 : 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <CanopyWaveform isPlaying={isPlaying} />
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-4 w-full z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }}
            transition={{ duration: 0.5, delay: 0.68 }}
          >
            <div className="flex items-center justify-between w-full gap-4">
              <div className="hidden sm:flex gap-4">
                <button
                  aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
                  aria-pressed={favorited}
                  onClick={() => setFavorited((f) => !f)}
                  className="transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass-hi)] rounded-full"
                  style={{ color: favorited ? 'var(--ember)' : 'var(--ash)' }}
                >
                  <Heart size={18} fill={favorited ? 'currentColor' : 'none'} />
                </button>
                <button
                  aria-label="Shuffle"
                  aria-pressed={shuffled}
                  onClick={() => setShuffled((s) => !s)}
                  className="transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass-hi)] rounded-full"
                  style={{ color: shuffled ? 'var(--brass-hi)' : 'var(--ash)' }}
                >
                  <Shuffle size={18} />
                </button>
                <button
                  aria-label={`Repeat: ${repeatMode}`}
                  aria-pressed={repeatMode !== 'off'}
                  onClick={cycleRepeat}
                  className="relative transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass-hi)] rounded-full"
                  style={{ color: repeatMode !== 'off' ? 'var(--brass-hi)' : 'var(--ash)' }}
                >
                  <Repeat size={18} />
                  {repeatMode === 'one' && (
                    <span className="absolute -top-1.5 -right-1.5 text-[9px] font-medium" style={{ fontFamily: UTILITY_FONT }}>1</span>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-5 sm:gap-6 mx-auto sm:mx-0">
                <button aria-label="Previous track" className="text-[var(--brass)] hover:text-[var(--brass-hi)] transition-all hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass-hi)] rounded-full">
                  <SkipBack size={22} fill="currentColor" />
                </button>

                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="flex items-center justify-center h-14 w-14 rounded-full bg-[#1a1511] border-2 border-[var(--brass)] shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:bg-[#221c16] active:scale-95 transition-all text-[var(--brass-hi)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass-hi)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#160f0a]"
                >
                  {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play className="ml-1" size={22} fill="currentColor" />}
                </button>

                <button aria-label="Next track" className="text-[var(--brass)] hover:text-[var(--brass-hi)] transition-all hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass-hi)] rounded-full">
                  <SkipForward size={22} fill="currentColor" />
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2.5">
                <Volume2 size={16} className="text-[var(--ash)]" />
                <div className="w-20">
                  <Slider value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-1 border-t border-[var(--walnut-lt)]/30 w-full justify-center">
              <button
                onClick={onOpenQueue}
                aria-label="Open queue"
                className="flex items-center gap-1.5 text-[11px] tracking-wide text-[var(--ash)] hover:text-[var(--brass-hi)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass-hi)] rounded px-1"
                style={{ fontFamily: UTILITY_FONT }}
              >
                <ListMusic size={14} /> Queue
              </button>
              <button
                onClick={onOpenLyrics}
                aria-label="Open lyrics"
                className="flex items-center gap-1.5 text-[11px] tracking-wide text-[var(--ash)] hover:text-[var(--brass-hi)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass-hi)] rounded px-1"
                style={{ fontFamily: UTILITY_FONT }}
              >
                <Mic2 size={14} /> Lyrics
              </button>
              <button
                onClick={onOpenDevices}
                aria-label="Choose playback device"
                className="flex items-center gap-1.5 text-[11px] tracking-wide text-[var(--ash)] hover:text-[var(--brass-hi)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass-hi)] rounded px-1"
                style={{ fontFamily: UTILITY_FONT }}
              >
                <Speaker size={14} /> Devices
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});
VinylConsole.displayName = 'VinylConsole';