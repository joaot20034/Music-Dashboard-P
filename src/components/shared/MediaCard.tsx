import { Play } from 'lucide-react';

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
      className="group relative flex cursor-pointer flex-col gap-4 rounded-2xl panel-wood p-5 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.9)]"
    >
      {/* Scaled down brass screws for the smaller cards */}
      <div className="brass-screw top-2.5 left-2.5 scale-75" />
      <div className="brass-screw top-2.5 right-2.5 scale-75" />
      <div className="brass-screw bottom-2.5 left-2.5 scale-75" />
      <div className="brass-screw bottom-2.5 right-2.5 scale-75" />

      {/* Recessed well for the album art */}
      <div className="recessed-wood relative aspect-square w-full overflow-hidden rounded-xl shadow-inner">
        <div className="absolute inset-0 z-10 rounded-xl border-[4px] border-[var(--surface-oak)] shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)] mix-blend-multiply opacity-50 pointer-events-none"></div>
        <img 
          src={imageUrl} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Soft frosted glass play overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#1a110b]/40 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-gold)] shadow-[0_6px_16px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:scale-110">
            <Play className="h-6 w-6 fill-[#1a110b] text-[#1a110b] ml-1" />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col px-2 pb-1">
        <h3 className="truncate font-serif text-lg font-semibold text-[var(--text-main)] drop-shadow-md">
          {title}
        </h3>
        <p className="truncate text-sm font-light text-[var(--text-muted)] drop-shadow-sm">
          {subtitle}
        </p>
      </div>
    </div>
  );
}