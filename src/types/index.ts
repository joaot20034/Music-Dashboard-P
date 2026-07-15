export interface IUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  premium: boolean;
  listeningTimeHours: number;
}

export interface IArtist {
  id: string;
  name: string;
  bio: string;
  imageUrl: string;
  followerCount: number;
  monthlyListeners: number;
}

export interface IAlbum {
  id: string;
  title: string;
  artistId: string;
  artistName: string; 
  coverUrl: string;
  releaseYear: number;
  totalTracks: number;
}

export interface ITrack {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  albumId: string;
  albumName: string;
  coverUrl: string;
  duration: number; 
  audioUrl: string; 
  isLiked?: boolean;
}

export interface IPlaylist {
  id: string;
  title: string;
  description: string;
  creator: string;
  coverUrl: string;
  trackCount: number;
  tracks?: ITrack[];
}