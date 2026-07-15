import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '../hooks/useDebounce';
import { MusicService } from '../services/api';
import { MediaCard } from '../components/shared/MediaCard';
import { SectionHeader } from '../components/shared/SectionHeader';
import { Search as SearchIcon } from 'lucide-react';

export default function Search() {
  const [searchParams] = useSearchParams();
  const rawQuery = searchParams.get('q') || '';
  
  // Wait 500ms after the user stops typing before making the API request
  const debouncedQuery = useDebounce(rawQuery, 500);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => MusicService.searchAll(debouncedQuery),
    enabled: debouncedQuery.length > 0, // Only run query if there's text
  });

  if (!rawQuery) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center">
        <SearchIcon className="mb-4 h-16 w-16 text-[hsl(var(--surface-hover))]" />
        <h2 className="text-2xl font-bold text-white">Search for music</h2>
        <p className="mt-2 text-[hsl(var(--text-muted))]">Find your favorite albums and playlists.</p>
      </div>
    );
  }

  return (
    <div className="pb-8">
      {/* Show a subtle loading indicator while fetching debounced results */}
      {isFetching && <div className="mb-4 text-sm text-[hsl(var(--primary))] animate-pulse">Searching...</div>}

      {data?.albums.length === 0 && data?.playlists.length === 0 && !isLoading && (
        <div className="mt-12 text-center text-[hsl(var(--text-muted))]">
          No results found for "{debouncedQuery}"
        </div>
      )}

      {data?.albums && data.albums.length > 0 && (
        <>
          <SectionHeader title="Albums" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data.albums.map((album) => (
              <MediaCard
                key={album.id}
                title={album.title}
                subtitle={album.artistName}
                imageUrl={album.coverUrl}
              />
            ))}
          </div>
        </>
      )}

      {data?.playlists && data.playlists.length > 0 && (
        <>
          <SectionHeader title="Playlists" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data.playlists.map((playlist) => (
              <MediaCard
                key={playlist.id}
                title={playlist.title}
                subtitle={playlist.creator}
                imageUrl={playlist.coverUrl}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}