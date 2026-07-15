import { memo, type ReactNode } from 'react';
import { motion, MotionValue } from 'framer-motion';

interface WalnutDeskProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
  visible: boolean;
  children?: ReactNode;
}

/**
 * Layered per the brief: grain → warm gradient → ambient occlusion →
 * edge vignette → a hairline of reflected window light along the back
 * edge. The rounded front edge and bevel are what sell "furniture"
 * rather than "panel."
 */
export const WalnutDesk = memo(({ x, y, visible, children }: WalnutDeskProps) => (
  <motion.div
    style={{ x, y }}
    initial={false}
    animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 24 }}
    transition={{ duration: 0.7, ease: 'easeOut' }}
    className="absolute bottom-0 left-0 w-[112%] -ml-[6%] h-[40vh] z-20"
  >
    {/* body */}
    <div className="absolute inset-0 rounded-t-[28px] bg-[#20150c] shadow-[0_-28px_60px_rgba(0,0,0,0.7)] overflow-hidden">
      <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{ filter: 'url(#wood-grain)' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--walnut-lt)]/25 via-transparent to-black/40" />
      {/* reflected window light along the back edge */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--brass)]/30 to-transparent" />
      {/* front bevel */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-b from-white/5 to-transparent" />
      {/* ambient occlusion where the desk meets the floor of the frame */}
      <div className="absolute inset-0 shadow-[inset_0_-40px_60px_rgba(0,0,0,0.55)]" />
    </div>

    <div className="absolute inset-0 flex items-end justify-center pb-[3vh] z-10">{children}</div>
  </motion.div>
));
WalnutDesk.displayName = 'WalnutDesk';
