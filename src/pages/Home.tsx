import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { MusicService } from '../services/api';
import { MediaCard } from '../components/shared/MediaCard';
import { SectionHeader } from '../components/shared/SectionHeader';

export default function Home() {
  const navigate = useNavigate();

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
                onClick={() => navigate(`/playlist/${playlist.id}`)}
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
                onClick={() => navigate(`/album/${album.id}`)}
              />
            ))}
      </div>
    </div>
  );
}