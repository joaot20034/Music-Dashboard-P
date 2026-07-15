import { useQuery } from '@tanstack/react-query';
import { MusicService } from '../services/api';
import { MediaCard } from '../components/shared/MediaCard';
import { usePlayer } from '../hooks/usePlayer';
import toast from 'react-hot-toast';
import { Library as LibraryIcon } from 'lucide-react';

export default function Library() {
  const { playTrack, setQueue } = usePlayer();

  const { data, isLoading } = useQuery({
    queryKey: ['user-library'],
    queryFn: MusicService.getUserLibrary,
  });

  const handlePlayMedia = async (mediaId: string, mediaTitle: string) => {
    try {
      const tracks = await MusicService.getTracksForMedia(mediaId);
      if (tracks.length > 0) {
        setQueue(tracks);
        playTrack(tracks[0]);
        toast.success(`Playing ${mediaTitle}`);
      }
    } catch (error) {
      toast.error("Failed to play media");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[hsl(var(--surface))] border-t-[hsl(var(--primary))]"></div>
      </div>
    );
  }

  const hasContent = (data?.playlists?.length ?? 0) > 0 || (data?.albums?.length ?? 0) > 0;

  if (!hasContent) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center">
        <LibraryIcon className="mb-4 h-16 w-16 text-[hsl(var(--surface-hover))]" />
        <h2 className="text-2xl font-bold text-white">Your Library is empty</h2>
        <p className="mt-2 text-[hsl(var(--text-muted))]">Like some albums or playlists to see them here.</p>
      </div>
    );
  }

  return (
    <div className="pb-8">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--surface))]">
          <LibraryIcon className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Your Library</h1>
      </div>

      {/* Render Playlists Section */}
      {data?.playlists && data.playlists.length > 0 && (
        <div className="mb-10">
          <h2 className="mb-6 text-xl font-bold text-white">Saved Playlists</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data.playlists.map((playlist) => (
              <MediaCard
                key={playlist.id}
                title={playlist.title}
                subtitle={playlist.creator}
                imageUrl={playlist.coverUrl}
                onClick={() => handlePlayMedia(playlist.id, playlist.title)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Render Albums Section */}
      {data?.albums && data.albums.length > 0 && (
        <div>
          <h2 className="mb-6 text-xl font-bold text-white">Saved Albums</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data.albums.map((album) => (
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
      )}
    </div>
  );
}