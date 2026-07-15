import { Play } from 'lucide-react';
import { cn } from '../../utils/cn';

interface MediaCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  onClick?: () => void;
}

export function MediaCard({ title, subtitle, imageUrl, onClick }: MediaCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group relative flex cursor-pointer flex-col gap-4 rounded-3xl bg-surface-oak p-4 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-warm"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-inner">
        <img 
          src={imageUrl} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Soft frosted glass play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-background/20 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-gold/90 shadow-lg transition-transform duration-300 hover:scale-110">
            <Play className="h-6 w-6 fill-background text-background ml-1" />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col px-1">
        <h3 className="truncate font-serif text-lg font-semibold text-text-main">
          {title}
        </h3>
        <p className="truncate text-sm font-light text-text-muted">
          {subtitle}
        </p>
      </div>
    </div>
  );
}