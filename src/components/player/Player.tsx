import { useState, useEffect } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, 
  Heart, Shuffle, Repeat, Mic2, ListMusic, MonitorSpeaker, Disc3
} from 'lucide-react';
import { Slider } from '../ui/Slider';
import { usePlayer } from '../../hooks/usePlayer';
import { CanopyWaveform } from './CanopyWaveform';


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

  const totalDuration = currentTrack?.duration || 0;

  if (!currentTrack) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center">
        <Disc3 className="mb-6 h-24 w-24 text-[var(--border)] opacity-50" />
        <h2 className="font-serif text-2xl font-semibold text-[var(--text-main)]">Studio Idle</h2>
        <p className="mt-2 text-sm italic text-[var(--text-muted)]">Awaiting your selection...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col items-center pt-10 pb-12 px-6 overflow-y-auto custom-scrollbar">
      
      {/* =========================================
          TOP GROUP (Vinyl, Waveform, Metadata) 
      ========================================= */}
      <div className="flex w-full flex-col items-center">
        {/* Top Header */}
        <div className="mb-10 w-full text-center">
          <span className="text-xs font-bold tracking-[0.2em] text-[var(--accent-gold)] uppercase">
            Now Playing
          </span>
        </div>

        {/* Massive Spinning Vinyl */}
        <div className="recessed-wood relative mb-12 flex h-72 w-72 items-center justify-center rounded-full">
          {/* Outer raised wood ring for realism */}
          <div className="absolute inset-0 rounded-full border-[12px] border-[var(--surface-oak)] shadow-[inset_0_10px_20px_rgba(0,0,0,0.8),_0_4px_10px_rgba(0,0,0,0.5)] mix-blend-multiply opacity-50 pointer-events-none"></div>
          <img 
            src={currentTrack.coverUrl} 
            alt="Album Cover" 
            className={`h-60 w-60 rounded-full object-cover transition-transform duration-700 ${isPlaying ? 'animate-spin-slow' : ''}`}
          />
          {/* Record Center Hole */}
          <div className="absolute h-4 w-4 rounded-full bg-[#1a1512] border border-gray-800 shadow-inner" />
        </div>

        {/* Organic Canopy Waveform */}
        <div className="mb-8 w-full px-4">
          <CanopyWaveform isPlaying={isPlaying} />
        </div>

        {/* Vintage Dotted Divider */}
        <div className="mb-6 w-[70%] border-t-[3px] border-dotted border-[var(--accent-gold)] opacity-30 shadow-[0_1px_0_rgba(255,255,255,0.1)]"></div>

        {/* Track Metadata */}
        <div className="w-full text-center">
          <h2 className="mb-2 truncate font-serif text-3xl font-bold text-[var(--text-main)] hover:text-[var(--accent-gold)] transition-colors cursor-pointer">
            {currentTrack.title}
          </h2>
          <p className="truncate text-lg font-light text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer">
            {currentTrack.artistName}
          </p>
        </div>
      </div>

      {/* =========================================
          BOTTOM GROUP (Progress, Controls, Utilities) 
      ========================================= */}
      <div className="mt-auto flex w-full flex-col items-center">
        
        {/* Track Metadata with Favorite Button */}
        <div className="mb-8 flex w-full items-center justify-between px-6">
          <div className="flex flex-col text-left flex-1 truncate pr-4">
            <h2 className="truncate font-serif text-3xl font-bold text-[var(--text-main)] drop-shadow-md cursor-pointer hover:text-[var(--accent-gold)] transition-colors duration-500">
              {currentTrack.title}
            </h2>
            <p className="truncate text-lg font-light text-[var(--text-muted)] drop-shadow-sm cursor-pointer hover:text-white transition-colors duration-500">
              {currentTrack.artistName}
            </p>
          </div>
          <button className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-transparent transition-all duration-300 hover:border-[#A88054]/30 hover:bg-[#A88054]/10 active:scale-95">
            <Heart className="h-5 w-5 text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--accent-gold)]" strokeWidth={1.5} />
          </button>
        </div>

        {/* Sleek Inline Progress Bar */}
        <div className="mb-10 w-full px-6">
          <div className="flex items-center gap-4">
            <span className="w-8 text-right text-[10px] font-medium tracking-wider text-[var(--text-muted)] opacity-60">
              {formatTime((progress / 100) * totalDuration)}
            </span>
            <div className="flex-1">
              <Slider value={progress} onChange={(e) => setProgress(Number(e.target.value))} />
            </div>
            <span className="w-8 text-left text-[10px] font-medium tracking-wider text-[var(--text-muted)] opacity-60">
              {formatTime(totalDuration)}
            </span>
          </div>
        </div>

        {/* Minimalist Master Controls */}
        <div className="mb-10 flex w-full items-center justify-between px-8">
          <button className="text-[var(--text-muted)] opacity-60 transition-all duration-300 hover:text-[var(--accent-gold)] hover:opacity-100 active:scale-95">
            <Shuffle className="h-4 w-4" strokeWidth={1.5} />
          </button>

          <div className="flex items-center gap-8">
            <button className="text-[var(--text-main)] opacity-50 transition-all duration-300 ease-out hover:scale-105 hover:text-[var(--accent-gold)] hover:opacity-100 active:scale-95">
              <SkipBack className="h-6 w-6 fill-current" strokeWidth={1} />
            </button>
            
            <button 
              onClick={togglePlay}
              className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-gold)] shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),_0_6px_16px_-4px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),_0_10px_20px_-4px_rgba(0,0,0,0.7)] active:scale-95 active:shadow-inner"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6 fill-[var(--background)] text-[var(--background)]" strokeWidth={1.5} />
              ) : (
                <Play className="ml-1 h-6 w-6 fill-[var(--background)] text-[var(--background)] transition-transform duration-300 ease-out group-hover:scale-105" strokeWidth={1.5} />
              )}
            </button>

            <button className="text-[var(--text-main)] opacity-50 transition-all duration-300 ease-out hover:scale-105 hover:text-[var(--accent-gold)] hover:opacity-100 active:scale-95">
              <SkipForward className="h-6 w-6 fill-current" strokeWidth={1} />
            </button>
          </div>

          <button className="text-[var(--text-muted)] opacity-60 transition-all duration-300 hover:text-[var(--accent-gold)] hover:opacity-100 active:scale-95">
            <Repeat className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Studio Utilities (Lyrics, Devices, Queue, Volume) */}
        <div className="recessed-wood flex w-full items-center justify-between px-6 py-5 shadow-inner">
          <div className="flex items-center gap-5">
            <button className="text-[var(--text-muted)] opacity-70 transition-all duration-300 hover:scale-105 hover:text-[var(--accent-gold)] hover:opacity-100 active:scale-95">
              <Mic2 className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button className="text-[var(--text-muted)] opacity-70 transition-all duration-300 hover:scale-105 hover:text-[var(--accent-gold)] hover:opacity-100 active:scale-95">
              <ListMusic className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button className="text-[var(--text-muted)] opacity-70 transition-all duration-300 hover:scale-105 hover:text-[var(--accent-gold)] hover:opacity-100 active:scale-95">
              <MonitorSpeaker className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* Compact Volume */}
          <div className="flex w-[120px] items-center gap-3 opacity-70 transition-opacity duration-300 ease-out hover:opacity-100">
            <button onClick={() => setVolume(volume === 0 ? 80 : 0)} className="text-[var(--text-main)] transition-colors duration-300 hover:text-[var(--accent-gold)] active:scale-95">
              {volume === 0 ? <VolumeX className="h-4 w-4" strokeWidth={1.5} /> : <Volume2 className="h-4 w-4" strokeWidth={1.5} />}
            </button>
            <div className="flex-1">
              <Slider value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
            </div>
          </div>
        </div>
        
      </div>

    </div>
  );
}