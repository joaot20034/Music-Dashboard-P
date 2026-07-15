import { memo } from 'react';
import { motion, MotionValue } from 'framer-motion';
import { CoffeeIllustration, HeadphonesIllustration, NotebookIllustration } from './illustrations';

interface DeskPropsLayerProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
  visible: boolean;
}

export const DeskPropsLayer = memo(({ x, y, visible }: DeskPropsLayerProps) => (
  <>
    <motion.div
      style={{ x, y }}
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
      className="hidden md:block absolute bottom-[4vh] right-[7%] z-40 w-[170px] rotate-[1deg]"
    >
      <NotebookIllustration />
      <div className="w-[64px] -mt-6 ml-24 rotate-6">
        <CoffeeIllustration />
      </div>
    </motion.div>

    <motion.div
      style={{ x, y }}
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      className="hidden md:block absolute bottom-[3vh] left-[6%] z-40 w-[150px] -rotate-2"
    >
      <HeadphonesIllustration />
    </motion.div>
  </>
));
DeskPropsLayer.displayName = 'DeskPropsLayer';
