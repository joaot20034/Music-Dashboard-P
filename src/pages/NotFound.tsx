import { useNavigate } from 'react-router-dom';
import { Disc3, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex h-[80vh] flex-col items-center justify-center text-center">
      <div className="relative mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-[hsl(var(--surface))]">
        <Disc3 className="h-16 w-16 text-[hsl(var(--text-muted))] animate-[spin_3s_linear_infinite]" />
        {/* A "scratch" line across the record to show it's broken */}
        <div className="absolute h-1 w-24 rotate-45 bg-[hsl(var(--background))]" />
      </div>
      
      <h1 className="mb-2 text-6xl font-extrabold tracking-tight text-white">404</h1>
      <h2 className="mb-6 text-2xl font-semibold text-[hsl(var(--text-muted))]">Track Not Found</h2>
      <p className="mb-8 max-w-md text-sm text-[hsl(var(--text-muted))]">
        It looks like the page you are looking for has been skipped, deleted, or never existed in the first place.
      </p>
      
      <Button onClick={() => navigate('/')} className="gap-2">
        <Home className="h-4 w-4" />
        Return Home
      </Button>
    </div>
  );
}