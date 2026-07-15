import { createContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { ITrack } from '../types';

interface PlayerContextType {
  currentTrack: ITrack | null;
  isPlaying: boolean;
  volume: number;
  queue: ITrack[];
  playTrack: (track: ITrack) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  setQueue: (queue: ITrack[]) => void;
}

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [queue, setQueue] = useState<ITrack[]>([]);

  const playTrack = useCallback((track: ITrack) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    if (currentTrack) {
      setIsPlaying((prev) => !prev);
    }
  }, [currentTrack]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        volume,
        queue,
        playTrack,
        togglePlay,
        setVolume,
        setQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}