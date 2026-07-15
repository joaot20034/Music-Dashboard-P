import playlistsData from '../data/playlists.json';
import albumsData from '../data/albums.json';
import type { IPlaylist, IAlbum } from '../types';

// Simulate network latency (500ms) to ensure our loading states and skeletons work
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MusicService = {
  getFeaturedPlaylists: async (): Promise<IPlaylist[]> => {
    await delay(500);
    return playlistsData as IPlaylist[];
  },

  getTrendingAlbums: async (): Promise<IAlbum[]> => {
    await delay(600);
    return albumsData as IAlbum[];
  },
  
  searchAll: async (query: string): Promise<{ albums: IAlbum[], playlists: IPlaylist[] }> => {
    await delay(400); // Simulate network latency
    if (!query) return { albums: [], playlists: [] };
    
    const lowerQuery = query.toLowerCase();
    const filteredAlbums = albumsData.filter(a => a.title.toLowerCase().includes(lowerQuery) || a.artistName.toLowerCase().includes(lowerQuery));
    const filteredPlaylists = playlistsData.filter(p => p.title.toLowerCase().includes(lowerQuery));
    
    return {
      albums: filteredAlbums as IAlbum[],
      playlists: filteredPlaylists as IPlaylist[]
    };
  }
};