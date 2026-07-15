import playlistsData from '../data/playlists.json';
import albumsData from '../data/albums.json';
import songsData from '../data/songs.json';
import type { IPlaylist, IAlbum, ITrack } from '../types';

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
    await delay(400);
    if (!query) return { albums: [], playlists: [] };
    
    const lowerQuery = query.toLowerCase();
    const filteredAlbums = albumsData.filter(a => a.title.toLowerCase().includes(lowerQuery) || a.artistName.toLowerCase().includes(lowerQuery));
    const filteredPlaylists = playlistsData.filter(p => p.title.toLowerCase().includes(lowerQuery));
    
    return {
      albums: filteredAlbums as IAlbum[],
      playlists: filteredPlaylists as IPlaylist[]
    };
  },

  // NEW: Fetch tracks for a specific album or playlist (Mocking by returning our songs dataset)
  getTracksForMedia: async (mediaId: string): Promise<ITrack[]> => {
    await delay(300);
    // In a real app, we'd filter songs by albumId/playlistId. Here we return the mock list.
    return songsData as ITrack[];
  },

  // NEW: Fetch user's saved library content
  getUserLibrary: async (): Promise<{ playlists: IPlaylist[], albums: IAlbum[] }> => {
    await delay(500);
    return {
      // Mocking favorites by returning a subset of our data
      playlists: playlistsData.slice(0, 2) as IPlaylist[],
      albums: albumsData.slice(1, 3) as IAlbum[]
    };
  }
};