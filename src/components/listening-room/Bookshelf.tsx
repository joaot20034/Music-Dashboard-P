import { memo } from 'react';
import { motion, MotionValue } from 'framer-motion';
import { useLayerOffset } from '../../hooks/useParallax';
import { DEPTH } from './tokens';
import {
  BooksIllustration,
  CameraIllustration,
  CassetteIllustration,
  PlantIllustration,
  VinylSleeveIllustration,
} from './illustrations';

interface BookshelfProps {
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  visible: boolean;
}

/**
 * Understated by design — a single plank, a curated handful of objects,
 * nothing symmetrical. The plant sits one depth layer ahead of the shelf
 * itself (per the brief's 3px / 4px split) for a touch of extra parallax.
 */
export const Bookshelf = memo(({ sx, sy, visible }: BookshelfProps) => {
  const shelf = useLayerOffset(sx, sy, DEPTH.bookshelf);
  const plant = useLayerOffset(sx, sy, DEPTH.plant);

  return (
    <motion.div
      style={{ x: shelf.x, y: shelf.y }}
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="hidden lg:block absolute bottom-[9vh] right-[4%] z-10 w-[220px]"
    >
      {/* the plank */}
      <div className="absolute -inset-x-6 bottom-[-14px] h-3 bg-[var(--walnut-lt)] rounded-sm shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />

      <div className="relative flex items-end gap-3">
        <div className="w-[92px] -rotate-1">
          <BooksIllustration />
        </div>
        <div className="w-[60px] translate-y-1">
          <CassetteIllustration />
        </div>
        <div className="w-[70px] -translate-y-1">
          <VinylSleeveIllustration />
        </div>
      </div>

      <div className="absolute -top-[86px] left-1 w-[54px]">
        <CameraIllustration />
      </div>

      <motion.div style={{ x: plant.x, y: plant.y }} className="absolute -top-[132px] right-0 w-[58px]">
        <PlantIllustration />
      </motion.div>
    </motion.div>
  );
});
Bookshelf.displayName = 'Bookshelf';
