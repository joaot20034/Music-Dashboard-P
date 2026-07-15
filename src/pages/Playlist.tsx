import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Play } from 'lucide-react';
import { MusicService } from '../services/api';
import { TrackList } from '../components/shared/TrackList';
import { IconButton } from '../components/ui/IconButton';
import { usePlayer } from '../hooks/usePlayer';

export default function Playlist() {
  const { id } = useParams<{ id: string }>();
  const { playTrack, setQueue } = usePlayer();

  // Fetch Playlist Metadata
  const { data: playlist, isLoading: loadingPlaylist } = useQuery({
    queryKey: ['playlist', id],
    queryFn: () => MusicService.getPlaylistById(id!),
    enabled: !!id,
  });

  // Fetch Tracks for this playlist
  const { data: tracks, isLoading: loadingTracks } = useQuery({
    queryKey: ['playlist-tracks', id],
    queryFn: () => MusicService.getTracksForMedia(id!),
    enabled: !!id,
  });

  const handlePlayAll = () => {
    if (tracks && tracks.length > 0) {
      setQueue(tracks);
      playTrack(tracks[0]);
    }
  };

  if (loadingPlaylist || loadingTracks) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[hsl(var(--surface))] border-t-[hsl(var(--primary))]"></div>
      </div>
    );
  }

  if (!playlist) {
    return <div className="text-center text-[hsl(var(--text-muted))]">Playlist not found.</div>;
  }

  return (
    <div className="pb-8">
      {/* Hero Section */}
      <div className="mb-8 flex flex-col items-end gap-6 md:flex-row md:items-end">
        <div className="h-48 w-48 shrink-0 overflow-hidden rounded-lg shadow-2xl md:h-56 md:w-56">
          <img src={playlist.coverUrl} alt={playlist.title} className="h-full w-full object-cover" />
        </div>
        
        <div className="flex flex-col md:mb-2">
          <span className="mb-2 text-xs font-bold uppercase tracking-wider text-[hsl(var(--text-muted))]">
            Playlist
          </span>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
            {playlist.title}
          </h1>
          <p className="mb-2 text-sm text-[hsl(var(--text-muted))]">
            {playlist.description}
          </p>
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <span>{playlist.creator}</span>
            <span className="text-[hsl(var(--text-muted))]">• {playlist.trackCount} songs</span>
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
      </div>

      {/* Track List */}
      {tracks && tracks.length > 0 ? (
        <TrackList tracks={tracks} />
      ) : (
        <div className="text-[hsl(var(--text-muted))]">No tracks in this playlist yet.</div>
      )}
    </div>
  );
}