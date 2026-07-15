import { useQuery } from '@tanstack/react-query';
import { MusicService } from '../services/api';
import { MediaCard } from '../components/shared/MediaCard';
import { SectionHeader } from '../components/shared/SectionHeader';
import { usePlayer } from '../hooks/usePlayer';
import toast from 'react-hot-toast';

export default function Home() {
  const { playTrack, setQueue } = usePlayer();

  const { data: playlists, isLoading: loadingPlaylists } = useQuery({
    queryKey: ['featured-playlists'],
    queryFn: MusicService.getFeaturedPlaylists,
  });

  const { data: albums, isLoading: loadingAlbums } = useQuery({
    queryKey: ['trending-albums'],
    queryFn: MusicService.getTrendingAlbums,
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Handles clicking a media card to play its contents
  const handlePlayMedia = async (mediaId: string, mediaTitle: string) => {
    try {
      const loadingToast = toast.loading(`Loading ${mediaTitle}...`);
      const tracks = await MusicService.getTracksForMedia(mediaId);
      
      toast.dismiss(loadingToast);
      
      if (tracks.length > 0) {
        setQueue(tracks);
        playTrack(tracks[0]);
        toast.success(`Playing ${mediaTitle}`);
      } else {
        toast.error("No tracks found");
      }
    } catch (error) {
      toast.error("Failed to play media");
    }
  };

  return (
    <div className="pb-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-white">
        {getGreeting()}
      </h1>

      <SectionHeader title="Featured Playlists" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {loadingPlaylists
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] animate-pulse rounded-lg bg-[hsl(var(--surface))]" />
            ))
          : playlists?.map((playlist) => (
              <MediaCard
                key={playlist.id}
                title={playlist.title}
                subtitle={playlist.description}
                imageUrl={playlist.coverUrl}
                onClick={() => handlePlayMedia(playlist.id, playlist.title)}
              />
            ))}
      </div>

      <SectionHeader title="Trending Albums" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {loadingAlbums
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] animate-pulse rounded-lg bg-[hsl(var(--surface))]" />
            ))
          : albums?.map((album) => (
              <MediaCard
                key={album.id}
                title={album.title}
                subtitle={album.artistName}
                imageUrl={album.coverUrl}
                onClick={() => handlePlayMedia(album.id, album.title)}
              />
            ))}
      </div>
    </div>
  );
}