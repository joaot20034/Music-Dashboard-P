import { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ROOM_TOKENS, FONT_IMPORT, DEPTH } from './tokens';
import { useParallaxPointer, useLayerOffset } from '../../hooks/useParallax';
import { ForestWindow } from './ForestWindow';
import { Bookshelf } from './Bookshelf';
import { WalnutDesk } from './WalnutDesk';
import { DeskPropsLayer } from './DeskProps';
import { VinylConsole } from './VinylConsole';
import { Atmosphere } from './Atmosphere';

interface ListeningRoomProps {
  /**
   * Whether Listening Room Mode is active. The parent is responsible for
   * hiding sidebar / nav / search / cards and for mounting this component
   * inside an <AnimatePresence> so the room itself can fade out on exit —
   * this component only owns what happens once it's on screen.
   */
  active?: boolean;
  onOpenQueue?: () => void;
  onOpenLyrics?: () => void;
  onOpenDevices?: () => void;
}

/**
 * Cinematic entrance, staged over roughly one second:
 * lights dim → desk appears → window brightens → dust becomes visible →
 * vinyl fades in → needle drops → waveform awakens → controls appear.
 *
 * The first few stages are timed here; the rest (vinyl, needle, waveform,
 * controls) live as internal delays inside VinylConsole so the console
 * stays a self-contained, reusable piece.
 */
function useRoomEntrance(active: boolean) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!active) {
      setEntered(false);
      return;
    }
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return entered;
}

export const ListeningRoomScene = memo(({ active = true, onOpenQueue, onOpenLyrics, onOpenDevices }: ListeningRoomProps) => {
  const entered = useRoomEntrance(active);
  const { sx, sy } = useParallaxPointer();

  const windowOffset = useLayerOffset(sx, sy, DEPTH.window);
  const deskOffset = useLayerOffset(sx, sy, DEPTH.desk);
  const foregroundOffset = useLayerOffset(sx, sy, DEPTH.foreground);

  return (
    <div
      className="absolute inset-0 z-50 overflow-hidden bg-[var(--ink)] font-sans select-none"
      style={{ ['--win-w' as string]: 'min(900px, 82vw)', ['--win-h' as string]: 'min(520px, 46vh)' }}
    >
      <style>{`
        ${ROOM_TOKENS}
        ${FONT_IMPORT}
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes glow-pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
      `}</style>

      {/* shared filters, referenced by url(#...) across every layer */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="wood-grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.09" numOctaves="4" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 0.8 0 0 0  0 0.55 0 0 0  0 0 0 0.08 0" in="noise" result="coloredNoise" />
            <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
          </filter>
          <filter id="film-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.03 0" />
          </filter>
        </defs>
      </svg>

      {/* Wall */}
      <motion.div style={{ x: windowOffset.x, y: windowOffset.y }} className="absolute -inset-10 pointer-events-none">
        <div className="absolute inset-0 bg-[var(--walnut)] opacity-95" style={{ filter: 'url(#wood-grain)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-transparent to-transparent opacity-70" />
        <div
          className="absolute top-[6%] left-1/2 -translate-x-1/2 border-[22px] border-[#150e09] shadow-[0_0_90px_rgba(0,0,0,0.7),inset_0_0_50px_rgba(0,0,0,0.6)]"
          style={{ width: 'var(--win-w)', height: 'var(--win-h)' }}
        />
        <div className="absolute inset-0 shadow-[inset_0_0_220px_rgba(0,0,0,0.75)]" />
      </motion.div>

      {/* Window — the light source; brightens as stage 2 of the entrance */}
      <ForestWindow x={windowOffset.x} y={windowOffset.y} brightness={entered ? 1 : 0} />

      {/* Bookshelf */}
      <Bookshelf sx={sx} sy={sy} visible={entered} />

      {/* Desk, with the console sitting on top of it */}
      <WalnutDesk x={deskOffset.x} y={deskOffset.y} visible={entered}>
        <VinylConsole visible={entered} onOpenQueue={onOpenQueue} onOpenLyrics={onOpenLyrics} onOpenDevices={onOpenDevices} />
      </WalnutDesk>

      {/* Foreground: notebook, coffee, headphones */}
      <DeskPropsLayer x={foregroundOffset.x} y={foregroundOffset.y} visible={entered} />

      {/* Dust, pollen, incense — stage 3 of the entrance */}
      <motion.div initial={false} animate={{ opacity: entered ? 1 : 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
        <Atmosphere />
      </motion.div>

      {/* lights dim — a black wash that clears almost immediately on entry */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none z-[90]"
        initial={{ opacity: 1 }}
        animate={{ opacity: entered ? 0 : 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[100] mix-blend-overlay" style={{ filter: 'url(#film-grain)' }} />
    </div>
  );
});
ListeningRoomScene.displayName = 'ListeningRoomScene';

export default ListeningRoomScene;
