import playlistsData from '../data/playlists.json';
import albumsData from '../data/albums.json';
import songsData from '../data/songs.json';
import artistsData from '../data/artists.json';
import userData from '../data/users.json'; // NEW: Import artists data
import type { IPlaylist, IAlbum, ITrack, IArtist, IUser } from '../types';

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

  getPlaylistById: async (id: string): Promise<IPlaylist | undefined> => {
    await delay(400);
    return playlistsData.find(p => p.id === id) as IPlaylist | undefined;
  },

  // NEW: Fetch a single album by ID
  getAlbumById: async (id: string): Promise<IAlbum | undefined> => {
    await delay(400);
    return albumsData.find(a => a.id === id) as IAlbum | undefined;
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
  getTracksForMedia: async (_mediaId: string): Promise<ITrack[]> => {
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
  },

  getArtistById: async (id: string): Promise<IArtist | undefined> => {
    await delay(400);
    return artistsData.find(a => a.id === id) as IArtist | undefined;
  },

  getAlbumsByArtist: async (artistId: string): Promise<IAlbum[]> => {
    await delay(400);
    return albumsData.filter(a => a.artistId === artistId) as IAlbum[];
  },

  getTopTracksByArtist: async (artistId: string): Promise<ITrack[]> => {
    await delay(400);
    // In a real database, we would query tracks by artistId and sort by play count.
    // Here we just return tracks matching the artist.
    return songsData.filter(t => t.artistId === artistId) as ITrack[];
  },
  getUserProfile: async (): Promise<IUser> => {
    await delay(300);
    return userData as IUser;
  },
};