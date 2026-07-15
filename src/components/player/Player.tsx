import { useState, useEffect } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, 
  Volume2, VolumeX, Mic2, ListMusic, MonitorSpeaker, Heart 
} from 'lucide-react';
import { IconButton } from '../ui/IconButton';
import { Slider } from '../ui/Slider';
import { usePlayer } from '../../hooks/usePlayer';

export function Player() {
  const { currentTrack, isPlaying, togglePlay, volume, setVolume } = usePlayer();
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Simulate progress when playing
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

  const totalDuration = currentTrack?.duration || 0;

  // If no track is playing, render an empty state player
  if (!currentTrack) {
    return (
      <div className="flex h-full w-full items-center justify-center text-sm text-[hsl(var(--text-muted))]">
        Select a track to start listening
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-between px-4">
      {/* 1. Track Info (Left) */}
      <div className="flex w-[30%] min-w-[180px] items-center gap-4">
        <div className="group relative h-14 w-14 overflow-hidden rounded-md shadow-md">
          <img 
            src={currentTrack.coverUrl} 
            alt="Album Cover" 
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col truncate">
          <a href="#" className="truncate text-sm font-semibold text-white hover:underline">
            {currentTrack.title}
          </a>
          <a href="#" className="truncate text-xs text-[hsl(var(--text-muted))] hover:text-white hover:underline">
            {currentTrack.artistName}
          </a>
        </div>
        <IconButton size="sm" className="ml-2" onClick={() => setIsLiked(!isLiked)}>
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-[hsl(var(--primary))] text-[hsl(var(--primary))]' : ''}`} />
        </IconButton>
      </div>

      {/* 2. Playback Controls (Center) */}
      <div className="flex max-w-[45%] flex-1 flex-col items-center justify-center gap-1">
        <div className="flex items-center gap-4">
          <IconButton size="sm" className="text-[hsl(var(--text-muted))]"><Shuffle className="h-4 w-4" /></IconButton>
          <IconButton size="sm" className="text-[hsl(var(--text-muted))] hover:text-white"><SkipBack className="h-5 w-5 fill-current" /></IconButton>
          
          <IconButton 
            size="lg" 
            className="bg-white text-black hover:scale-105 hover:bg-white hover:brightness-90 shadow-lg"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-1" />}
          </IconButton>

          <IconButton size="sm" className="text-[hsl(var(--text-muted))] hover:text-white"><SkipForward className="h-5 w-5 fill-current" /></IconButton>
          <IconButton size="sm" className="text-[hsl(var(--text-muted))]"><Repeat className="h-4 w-4" /></IconButton>
        </div>

        {/* Progress Bar */}
        <div className="flex w-full items-center gap-2 text-xs text-[hsl(var(--text-muted))]">
          <span className="w-10 text-right">{formatTime((progress / 100) * totalDuration)}</span>
          <Slider value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="w-full max-w-md" />
          <span className="w-10 text-left">{formatTime(totalDuration)}</span>
        </div>
      </div>

      {/* 3. Secondary Controls (Right) */}
      <div className="flex w-[30%] min-w-[180px] items-center justify-end gap-2 text-[hsl(var(--text-muted))]">
        <IconButton size="sm"><Mic2 className="h-4 w-4" /></IconButton>
        <IconButton size="sm"><ListMusic className="h-4 w-4" /></IconButton>
        <IconButton size="sm"><MonitorSpeaker className="h-4 w-4" /></IconButton>
        <div className="flex w-24 items-center gap-2 ml-2">
          <IconButton size="sm" onClick={() => setVolume(volume === 0 ? 80 : 0)}>
            {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </IconButton>
          <Slider value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );
}