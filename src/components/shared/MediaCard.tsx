import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { cn } from '../../utils/cn';

interface MediaCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  rounded?: 'md' | 'full'; // 'full' for artists, 'md' for albums/playlists
  onClick?: () => void;
}

export function MediaCard({ title, subtitle, imageUrl, rounded = 'md', onClick }: MediaCardProps) {
  return (
    <motion.div
      whileHover="hover"
      onClick={onClick}
      className="group cursor-pointer rounded-lg p-4 transition-colors hover:bg-[hsl(var(--surface-hover))]"
    >
      <div className="relative mb-4 aspect-square w-full overflow-hidden shadow-lg">
        <img
          src={imageUrl}
          alt={title}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
            rounded === 'full' ? "rounded-full" : "rounded-md"
          )}
          loading="lazy"
        />
        {/* Play Button Overlay */}
        <motion.div
          variants={{
            hover: { opacity: 1, y: 0, scale: 1 },
            initial: { opacity: 0, y: 10, scale: 0.9 }
          }}
          initial="initial"
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-white shadow-xl shadow-[hsl(var(--primary))]/30"
        >
          <Play className="h-6 w-6 fill-white" />
        </motion.div>
      </div>
      
      <h3 className="truncate text-base font-bold text-white">{title}</h3>
      <p className="mt-1 truncate text-sm text-[hsl(var(--text-muted))]">{subtitle}</p>
    </motion.div>
  );
}