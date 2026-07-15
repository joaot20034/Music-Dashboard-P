import { Play, Heart, Clock } from 'lucide-react';
import type { ITrack } from '../../types';
import { usePlayer } from '../../hooks/usePlayer';
import { cn } from '../../utils/cn';

interface TrackListProps {
  tracks: ITrack[];
}

export function TrackList({ tracks }: TrackListProps) {
  const { playTrack, currentTrack, isPlaying } = usePlayer();

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full text-left text-sm text-[hsl(var(--text-muted))]">
      {/* Table Header */}
      <div className="grid grid-cols-[40px_minmax(200px,1fr)_minmax(150px,1fr)_60px] gap-4 border-b border-[hsl(var(--border))] px-4 pb-2 font-medium">
        <div className="text-center">#</div>
        <div>Title</div>
        <div className="hidden md:block">Album</div>
        <div className="flex justify-end"><Clock className="h-4 w-4" /></div>
      </div>

      {/* Track Rows */}
      <div className="mt-2 flex flex-col gap-1">
        {tracks.map((track, index) => {
          const isActive = currentTrack?.id === track.id;

          return (
            <div
              key={track.id}
              onClick={() => playTrack(track)}
              className={cn(
                "group grid grid-cols-[40px_minmax(200px,1fr)_minmax(150px,1fr)_60px] items-center gap-4 rounded-md px-4 py-2 transition-colors hover:bg-[hsl(var(--surface-hover))] cursor-pointer",
                isActive && "bg-[hsl(var(--surface))]"
              )}
            >
              {/* Index / Play Button */}
              <div className="relative flex items-center justify-center">
                <span className={cn("absolute text-base", isActive ? "text-[hsl(var(--primary))] hidden" : "group-hover:hidden")}>
                  {index + 1}
                </span>
                <Play className={cn(
                  "absolute h-4 w-4 fill-white text-white",
                  isActive ? "block" : "hidden group-hover:block"
                )} />
              </div>

              {/* Title & Artist */}
              <div className="flex items-center gap-3 truncate">
                <img src={track.coverUrl} alt={track.title} className="h-10 w-10 rounded shadow-sm" />
                <div className="flex flex-col truncate">
                  <span className={cn("truncate text-base font-medium", isActive ? "text-[hsl(var(--primary))]" : "text-white")}>
                    {track.title}
                  </span>
                  <span className="truncate text-xs hover:underline">{track.artistName}</span>
                </div>
              </div>

              {/* Album (Hidden on mobile) */}
              <div className="hidden truncate hover:underline md:block">
                {track.albumName}
              </div>

              {/* Duration & Like Button */}
              <div className="flex items-center justify-end gap-3">
                <Heart className="h-4 w-4 opacity-0 transition-opacity hover:scale-110 hover:text-white group-hover:opacity-100" />
                <span>{formatTime(track.duration)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}