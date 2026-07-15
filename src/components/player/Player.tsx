import { useState, useEffect } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Mic2, ListMusic 
} from 'lucide-react';
import { IconButton } from '../ui/IconButton';
import { Slider } from '../ui/Slider';
import { usePlayer } from '../../hooks/usePlayer';

export function Player() {
  const { currentTrack, isPlaying, togglePlay, volume, setVolume } = usePlayer();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) {
    return (
      <div className="flex h-full w-full items-center justify-center text-sm italic text-text-muted">
        Silence in the studio... select a track.
      </div>
    );
  }

  const totalDuration = currentTrack.duration || 0;

  return (
    <div className="flex h-full w-full items-center justify-between px-8 bg-surface/80 backdrop-blur-md border-t border-border shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
      
      {/* 1. Track Info & Vinyl Art */}
      <div className="flex w-[30%] min-w-[200px] items-center gap-6">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-black shadow-lg">
          {/* Vinyl Record */}
          <img 
            src={currentTrack.coverUrl} 
            alt="Album Cover" 
            className={`h-14 w-14 rounded-full object-cover border border-[#222] ${isPlaying ? 'animate-spin-slow' : ''}`}
          />
          {/* Center Hole */}
          <div className="absolute h-3 w-3 rounded-full bg-black border border-gray-700" />
        </div>
        
        <div className="flex flex-col truncate">
          <a href="#" className="truncate font-serif text-lg font-semibold text-text-main hover:text-accent-gold transition-colors">
            {currentTrack.title}
          </a>
          <a href="#" className="truncate font-sans text-sm font-light text-text-muted hover:text-text-main transition-colors">
            {currentTrack.artistName}
          </a>
        </div>
      </div>

      {/* 2. Playback Controls (Center) */}
      <div className="flex max-w-[45%] flex-1 flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-6">
          <IconButton size="sm" className="text-text-muted hover:text-accent-gold transition-colors"><SkipBack className="h-5 w-5 fill-current" /></IconButton>
          
          <button 
            onClick={togglePlay}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent-gold text-accent-gold transition-all duration-300 hover:bg-accent-gold hover:text-background hover:shadow-glow-green"
          >
            {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-1" />}
          </button>

          <IconButton size="sm" className="text-text-muted hover:text-accent-gold transition-colors"><SkipForward className="h-5 w-5 fill-current" /></IconButton>
        </div>

        {/* Warm Analog Progress Bar */}
        <div className="flex w-full max-w-2xl items-center gap-4 text-xs font-light text-text-muted">
          <span className="w-10 text-right">{formatTime((progress / 100) * totalDuration)}</span>
          <div className="flex-1">
            {/* You should update your Slider component to use 'accent-gold' instead of 'primary' if it has hardcoded colors */}
            <Slider value={progress} onChange={(e) => setProgress(Number(e.target.value))} />
          </div>
          <span className="w-10 text-left">{formatTime(totalDuration)}</span>
        </div>
      </div>

      {/* 3. Studio Controls (Right) */}
      <div className="flex w-[30%] min-w-[200px] items-center justify-end gap-4 text-text-muted">
        <Mic2 className="h-4 w-4 hover:text-accent-gold cursor-pointer transition-colors" />
        <ListMusic className="h-4 w-4 hover:text-accent-gold cursor-pointer transition-colors" />
        <div className="flex w-28 items-center gap-3 ml-4 border-l border-border pl-4">
          <button onClick={() => setVolume(volume === 0 ? 80 : 0)} className="hover:text-accent-gold transition-colors">
            {volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
          <Slider value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );
}