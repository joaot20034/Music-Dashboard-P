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
  }
};