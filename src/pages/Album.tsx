import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { MusicService } from '../services/api';
import { TrackList } from '../components/shared/TrackList';
import { IconButton } from '../components/ui/IconButton';
import { usePlayer } from '../hooks/usePlayer';

export default function Album() {
  const { id } = useParams<{ id: string }>();
  const { playTrack, setQueue } = usePlayer();

  // Fetch Album Metadata
  const { data: album, isLoading: loadingAlbum } = useQuery({
    queryKey: ['album', id],
    queryFn: () => MusicService.getAlbumById(id!),
    enabled: !!id,
  });

  // Fetch Tracks for this album
  const { data: tracks, isLoading: loadingTracks } = useQuery({
    queryKey: ['album-tracks', id],
    queryFn: () => MusicService.getTracksForMedia(id!),
    enabled: !!id,
  });

  const handlePlayAll = () => {
    if (tracks && tracks.length > 0) {
      setQueue(tracks);
      playTrack(tracks[0]);
    }
  };

  if (loadingAlbum || loadingTracks) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[hsl(var(--surface))] border-t-[hsl(var(--primary))]"></div>
      </div>
    );
  }

  if (!album) {
    return <div className="text-center text-[hsl(var(--text-muted))]">Album not found.</div>;
  }

  return (
    <div className="pb-8">
      {/* Hero Section */}
      <div className="mb-8 flex flex-col items-end gap-6 md:flex-row md:items-end">
        <div className="h-48 w-48 shrink-0 overflow-hidden rounded-lg shadow-2xl md:h-56 md:w-56">
          <img src={album.coverUrl} alt={album.title} className="h-full w-full object-cover" />
        </div>
        
        <div className="flex flex-col md:mb-2">
          <span className="mb-2 text-xs font-bold uppercase tracking-wider text-[hsl(var(--text-muted))]">
            Album
          </span>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
            {album.title}
          </h1>
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <Link to={`/artist/${album.artistId}`} className="hover:underline">
              {album.artistName}
            </Link>
            <span className="text-[hsl(var(--text-muted))]">• {album.releaseYear}</span>
            <span className="text-[hsl(var(--text-muted))]">• {album.totalTracks} songs</span>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="mb-8 flex items-center gap-4">
        <IconButton 
          size="lg" 
          className="h-14 w-14 bg-[hsl(var(--primary))] text-white hover:scale-105 hover:bg-[hsl(var(--primary))] shadow-xl shadow-[hsl(var(--primary))]/30"
          onClick={handlePlayAll}
        >
          <Play className="h-7 w-7 fill-white ml-1" />
        </IconButton>
        
        <IconButton size="lg" className="text-[hsl(var(--text-muted))] hover:text-white">
          <Heart className="h-8 w-8" />
        </IconButton>

        <IconButton size="md" className="text-[hsl(var(--text-muted))] hover:text-white">
          <MoreHorizontal className="h-6 w-6" />
        </IconButton>
      </div>

      {/* Track List */}
      {tracks && tracks.length > 0 ? (
        <TrackList tracks={tracks} />
      ) : (
        <div className="text-[hsl(var(--text-muted))]">No tracks available for this album.</div>
      )}
    </div>
  );
}