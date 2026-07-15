import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, 
  Heart, Shuffle, Repeat, Mic2, ListMusic, MonitorSpeaker, Disc3, Maximize 
} from 'lucide-react';
import { Slider } from '../ui/Slider';
import { usePlayer } from '../../hooks/usePlayer';
import { useListeningRoom } from '../../context/ListeningRoomContext';
import { CanopyWaveform } from './CanopyWaveform';

export function Player() {
  const { currentTrack, isPlaying, togglePlay, volume, setVolume } = usePlayer();
  // Pulled toggleListeningMode out of our context!
  const { isListeningMode, toggleListeningMode } = useListeningRoom();
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
    <div className="flex h-full flex-col items-center pt-10 pb-12 px-6 overflow-y-auto custom-scrollbar relative">
      
      {/* 
        LISTENING MODE SPOTLIGHT 
        A warm, ethereal glow that illuminates the record when the room dims.
      */}
      <AnimatePresence>
        {isListeningMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full mix-blend-screen pointer-events-none"
            style={{ background: 'radial-gradient(circle at center, rgba(235, 190, 150, 0.15) 0%, transparent 70%)' }}
          />
        )}
      </AnimatePresence>

      <div className="flex w-full flex-col items-center z-10">
        <div className="mb-10 w-full text-center">
          <span className="text-xs font-bold tracking-[0.2em] text-[var(--accent-gold)] uppercase">
            {isListeningMode ? 'Listening Mode' : 'Now Playing'}
          </span>
        </div>

        {/* Vinyl slightly scales up in Listening Mode */}
        <motion.div 
          layout
          className="recessed-wood relative mb-12 flex items-center justify-center rounded-full"
          animate={{
            height: isListeningMode ? '320px' : '288px', // 80 -> 72
            width: isListeningMode ? '320px' : '288px'
          }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 rounded-full border-[12px] border-[var(--surface-oak)] shadow-[inset_0_10px_20px_rgba(0,0,0,0.8),_0_4px_10px_rgba(0,0,0,0.5)] mix-blend-multiply opacity-50 pointer-events-none"></div>
          <img 
            src={currentTrack.coverUrl} 
            alt="Album Cover" 
            className={`rounded-full object-cover transition-transform duration-700 ${isPlaying ? 'animate-spin-slow' : ''}`}
            style={{ width: '85%', height: '85%' }}
          />
          <div className="absolute h-4 w-4 rounded-full bg-[#1a1512] border border-gray-800 shadow-inner" />
        </motion.div>

        {/* Waveform (Brightens slightly in listening mode via wrapper opacity) */}
        <motion.div 
          className="mb-4 w-full px-4"
          animate={{ opacity: isListeningMode ? 1 : 0.8 }}
          transition={{ duration: 1 }}
        >
          <CanopyWaveform isPlaying={isPlaying} />
        </motion.div>
      </div>

      <div className="mt-auto flex w-full flex-col items-center z-10">
        
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

        <div className="mb-10 flex w-full items-center justify-between px-8">
          <button className="text-[var(--text-muted)] opacity-60 transition-all duration-300 hover:text-[var(--accent-gold)] hover:opacity-100 active:scale-95">
            <Shuffle className="h-4 w-4" strokeWidth={1.5} />
          </button>

          <div className="flex items-center gap-8">
            <button className="text-[var(--text-main)] opacity-50 transition-all duration-300 ease-out hover:scale-105 hover:text-[var(--accent-gold)] hover:opacity-100 active:scale-95">
              <SkipBack className="h-6 w-6 fill-current" strokeWidth={1} />
            </button>
            <button onClick={togglePlay} className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-gold)] shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),_0_6px_16px_-4px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),_0_10px_20px_-4px_rgba(0,0,0,0.7)] active:scale-95 active:shadow-inner">
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

        <div className="recessed-wood flex w-full items-center justify-between px-6 py-5 shadow-inner">
          {/* Hide utilities gracefully during listening mode */}
          <motion.div 
            className="flex items-center gap-5"
            animate={{ opacity: isListeningMode ? 0 : 1, pointerEvents: isListeningMode ? 'none' : 'auto' }}
            transition={{ duration: 0.5 }}
          >
            <button className="text-[var(--text-muted)] opacity-70 transition-all duration-300 hover:scale-105 hover:text-[var(--accent-gold)] hover:opacity-100 active:scale-95">
              <Mic2 className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button className="text-[var(--text-muted)] opacity-70 transition-all duration-300 hover:scale-105 hover:text-[var(--accent-gold)] hover:opacity-100 active:scale-95">
              <ListMusic className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button className="text-[var(--text-muted)] opacity-70 transition-all duration-300 hover:scale-105 hover:text-[var(--accent-gold)] hover:opacity-100 active:scale-95">
              <MonitorSpeaker className="h-4 w-4" strokeWidth={1.5} />
            </button>
            
            {/* NEW: Listening Mode UI Toggle Button */}
            <button 
              onClick={toggleListeningMode}
              title="Listening Room Mode (L)"
              className="text-[var(--text-muted)] opacity-70 transition-all duration-300 hover:scale-105 hover:text-[var(--accent-gold)] hover:opacity-100 active:scale-95"
            >
              <Maximize className="h-4 w-4" strokeWidth={1.5} />
            </button>

          </motion.div>

          {/* Volume pushes to the right smoothly if left side disappears */}
          <motion.div layout className="flex w-[120px] items-center gap-3 opacity-70 transition-opacity duration-300 ease-out hover:opacity-100 ml-auto">
            <button onClick={() => setVolume(volume === 0 ? 80 : 0)} className="text-[var(--text-main)] transition-colors duration-300 hover:text-[var(--accent-gold)] active:scale-95">
              {volume === 0 ? <VolumeX className="h-4 w-4" strokeWidth={1.5} /> : <Volume2 className="h-4 w-4" strokeWidth={1.5} />}
            </button>
            <div className="flex-1">
              <Slider value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
            </div>
          </motion.div>
        </div>
        
      </div>
    </div>
  );
}