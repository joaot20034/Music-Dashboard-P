import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Play, UserPlus } from 'lucide-react';
import { MusicService } from '../services/api';
import { TrackList } from '../components/shared/TrackList';
import { MediaCard } from '../components/shared/MediaCard';
import { Button } from '../components/ui/Button';
import { IconButton } from '../components/ui/IconButton';
import { usePlayer } from '../hooks/usePlayer';

export default function Artist() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playTrack, setQueue } = usePlayer();

  const { data: artist, isLoading: loadingArtist } = useQuery({
    queryKey: ['artist', id],
    queryFn: () => MusicService.getArtistById(id!),
    enabled: !!id,
  });

  const { data: tracks, isLoading: loadingTracks } = useQuery({
    queryKey: ['artist-top-tracks', id],
    queryFn: () => MusicService.getTopTracksByArtist(id!),
    enabled: !!id,
  });

  const { data: albums, isLoading: loadingAlbums } = useQuery({
    queryKey: ['artist-albums', id],
    queryFn: () => MusicService.getAlbumsByArtist(id!),
    enabled: !!id,
  });

  const handlePlayTopTracks = () => {
    if (tracks && tracks.length > 0) {
      setQueue(tracks);
      playTrack(tracks[0]);
    }
  };

  if (loadingArtist || loadingTracks || loadingAlbums) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[hsl(var(--surface))] border-t-[hsl(var(--primary))]"></div>
      </div>
    );
  }

  if (!artist) {
    return <div className="text-center text-[hsl(var(--text-muted))]">Artist not found.</div>;
  }

  return (
    <div className="pb-8">
      {/* Artist Hero Section */}
      <div className="mb-10 flex flex-col items-center gap-6 md:flex-row md:items-end">
        <div className="h-48 w-48 shrink-0 overflow-hidden rounded-full shadow-2xl md:h-56 md:w-56">
          <img src={artist.imageUrl} alt={artist.name} className="h-full w-full object-cover" />
        </div>
        
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[hsl(var(--primary))]">
            <UserPlus className="h-4 w-4" />
            Verified Artist
          </div>
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl">
            {artist.name}
          </h1>
          <p className="mb-4 max-w-2xl text-sm text-[hsl(var(--text-muted))] line-clamp-3">
            {artist.bio}
          </p>
          <div className="flex items-center gap-4 text-sm font-medium text-[hsl(var(--text-muted))]">
            <span>{artist.monthlyListeners.toLocaleString()} monthly listeners</span>
            <span>•</span>
            <span>{artist.followerCount.toLocaleString()} followers</span>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="mb-10 flex items-center gap-4">
        <IconButton 
          size="lg" 
          className="h-14 w-14 bg-[hsl(var(--primary))] text-white hover:scale-105 hover:bg-[hsl(var(--primary))] shadow-xl shadow-[hsl(var(--primary))]/30"
          onClick={handlePlayTopTracks}
        >
          <Play className="h-7 w-7 fill-white ml-1" />
        </IconButton>
        
        <Button variant="outline" className="rounded-full border-[hsl(var(--text-muted))] text-white hover:border-white">
          Follow
        </Button>
      </div>

      {/* Main Content Layout */}
      <div className="grid gap-10 xl:grid-cols-[2fr_1fr]">
        {/* Left Column: Top Tracks */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-white">Popular</h2>
          {tracks && tracks.length > 0 ? (
            <TrackList tracks={tracks} />
          ) : (
            <div className="text-[hsl(var(--text-muted))]">No tracks available.</div>
          )}
        </div>

        {/* Right Column: Discography (Albums) */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-white">Discography</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-2">
            {albums?.map((album) => (
              <MediaCard
                key={album.id}
                title={album.title}
                subtitle={album.releaseYear.toString()}
                imageUrl={album.coverUrl}
                onClick={() => navigate(`/album/${album.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}